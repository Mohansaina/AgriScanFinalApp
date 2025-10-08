const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createWorker } = require('tesseract.js');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, '../frontend/agriscan-frontend/dist')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'AgriScan Backend is running!' });
});

// OCR endpoint
app.post('/api/ocr', async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }
    
    // Convert base64 image to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // Create Tesseract worker
    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    // Process image with Tesseract
    const { data: { text } } = await worker.recognize(imageBuffer);
    await worker.terminate();
    
    // Parse OCR text to extract pesticide information
    const parsedData = parsePesticideLabel(text);
    
    res.json(parsedData);
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Function to parse pesticide label text
function parsePesticideLabel(text) {
  // This is a simplified parser - in a real application, you would need more sophisticated parsing
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  let activeIngredient = 'Unknown';
  let concentration = 'Unknown';
  let recommendedDosage = 'Unknown';
  let safetyPeriod = 'Unknown';
  
  // Look for common patterns in pesticide labels
  for (const line of lines) {
    // Look for active ingredient
    if (line.toLowerCase().includes('glyphosate') || line.toLowerCase().includes('active ingredient')) {
      activeIngredient = line.replace(/active ingredient:/i, '').trim();
    }
    
    // Look for concentration
    if (line.includes('%') && (line.toLowerCase().includes('sl') || line.toLowerCase().includes('ec'))) {
      concentration = line;
    }
    
    // Look for dosage information
    if (line.toLowerCase().includes('dosage') || line.toLowerCase().includes('rate')) {
      const dosageMatch = line.match(/(\d+\.?\d*)\s*(l|ml|g|kg)\s*\/\s*(hectare|acre|ha|ac)/i);
      if (dosageMatch) {
        recommendedDosage = dosageMatch[0];
      }
    }
    
    // Look for safety period
    if (line.toLowerCase().includes('safety') || line.toLowerCase().includes('harvest')) {
      const safetyMatch = line.match(/(\d+)\s*days?/i);
      if (safetyMatch) {
        safetyPeriod = safetyMatch[0];
      }
    }
  }
  
  // If we couldn't parse specific values, use defaults for demo
  if (recommendedDosage === 'Unknown') {
    recommendedDosage = '1.5 L/hectare';
  }
  
  if (activeIngredient === 'Unknown') {
    activeIngredient = 'Glyphosate';
  }
  
  if (concentration === 'Unknown') {
    concentration = '41% SL';
  }
  
  if (safetyPeriod === 'Unknown') {
    safetyPeriod = '7 days';
  }
  
  return {
    activeIngredient,
    concentration,
    recommendedDosage,
    safetyPeriod
  };
}

// Dosage calculation endpoint
app.post('/api/dosage', (req, res) => {
  try {
    const { cropType, fieldSize, recommendedDosage } = req.body;
    
    // Validate inputs
    if (!cropType || !fieldSize || !recommendedDosage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Simple calculation: dose_total = recommended_rate_per_hectare * field_size
    // Extract numeric value from recommendedDosage (e.g., "1.5 L/hectare")
    const dosageMatch = recommendedDosage.match(/(\d+\.?\d*)/);
    if (!dosageMatch) {
      return res.status(400).json({ error: 'Invalid dosage format' });
    }
    
    const numericDosage = parseFloat(dosageMatch[1]);
    const numericFieldSize = parseFloat(fieldSize);
    
    if (isNaN(numericDosage) || isNaN(numericFieldSize)) {
      return res.status(400).json({ error: 'Invalid dosage or field size values' });
    }
    
    const totalDose = numericDosage * numericFieldSize;
    
    // Determine unit from recommendedDosage
    let unit = 'Liters';
    if (recommendedDosage.toLowerCase().includes('ml')) {
      unit = 'Milliliters';
    } else if (recommendedDosage.toLowerCase().includes('g')) {
      unit = 'Grams';
    } else if (recommendedDosage.toLowerCase().includes('kg')) {
      unit = 'Kilograms';
    }
    
    res.json({
      cropType,
      fieldSize,
      recommendedDosage,
      totalDose: totalDose.toFixed(2),
      unit,
      instructions: `Apply ${totalDose.toFixed(2)} ${unit.toLowerCase()} of pesticide to your ${fieldSize} hectare ${cropType} field.`
    });
  } catch (error) {
    console.error('Dosage Calculation Error:', error);
    res.status(500).json({ error: 'Failed to calculate dosage' });
  }
});

// Weather endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }
    
    // Mock weather data for demonstration
    // In a real implementation, we would call the OpenWeatherMap API
    const mockWeather = {
      location: location,
      temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35°C
      windSpeed: Math.random() * 15, // Random wind speed 0-15 m/s
      precipitation: Math.random() * 10, // Random precipitation 0-10 mm
      condition: ['Clear', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)],
      safeToSpray: true,
      warning: null
    };
    
    // Check if conditions are safe for spraying
    if (mockWeather.windSpeed > 10) {
      mockWeather.safeToSpray = false;
      mockWeather.warning = 'High wind speeds detected. Not safe to spray.';
    } else if (mockWeather.precipitation > 2) {
      mockWeather.safeToSpray = false;
      mockWeather.warning = 'Rain expected. Not safe to spray.';
    }
    
    res.json(mockWeather);
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Serve React app for any non-API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/agriscan-frontend/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`AgriScan Backend Server is running on port ${PORT}`);
});