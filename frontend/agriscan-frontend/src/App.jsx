import React, { useState } from 'react';
import { ocrApi, dosageApi, weatherApi } from './api';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      <Header setActiveSection={setActiveSection} activeSection={activeSection} />
      
      <main>
        {activeSection === 'home' && <LandingPage setActiveSection={setActiveSection} />}
        {activeSection === 'scanner' && <LabelScanner />}
        {activeSection === 'calculator' && <DosageCalculator />}
        {activeSection === 'weather' && <WeatherAlert />}
        {activeSection === 'waitlist' && <WaitlistForm />}
      </main>
      
      <Footer />
    </div>
  );
}

function Header({ setActiveSection, activeSection }) {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">AgriScan</h1>
        <nav className="nav">
          <ul>
            <li>
              <button 
                className={activeSection === 'home' ? 'active' : ''} 
                onClick={() => setActiveSection('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'scanner' ? 'active' : ''} 
                onClick={() => setActiveSection('scanner')}
              >
                Label Scanner
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'calculator' ? 'active' : ''} 
                onClick={() => setActiveSection('calculator')}
              >
                Dosage Calculator
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'weather' ? 'active' : ''} 
                onClick={() => setActiveSection('weather')}
              >
                Weather Alert
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'waitlist' ? 'active' : ''} 
                onClick={() => setActiveSection('waitlist')}
              >
                Join Waitlist
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function LandingPage({ setActiveSection }) {
  return (
    <section className="landing-page">
      <div className="hero">
        <div className="container">
          <h1>AgriScan — Scan, Calculate & Spray Safely 🌱</h1>
          <p>Your smart farming assistant for pesticide safety</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => setActiveSection('scanner')}>
              Try Demo
            </button>
            <button className="btn-secondary" onClick={() => setActiveSection('waitlist')}>
              Join Waitlist
            </button>
          </div>
        </div>
      </div>

      <div className="problem-section">
        <div className="container">
          <h2>The Problem</h2>
          <div className="problem-content">
            <div className="problem-item">
              <h3>Unsafe Pesticide Use</h3>
              <p>Farmers often misapply pesticides due to unclear label instructions, leading to crop damage, health risks, and environmental harm.</p>
            </div>
            <div className="problem-item">
              <h3>Weather Risks</h3>
              <p>Spraying during windy or rainy conditions causes drift and runoff, contaminating water sources and neighboring crops.</p>
            </div>
            <div className="problem-item">
              <h3>Dosage Errors</h3>
              <p>Incorrect dosage calculations result in ineffective pest control or chemical overuse, increasing costs and resistance.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="solution-section">
        <div className="container">
          <h2>Our Solution</h2>
          <div className="solution-content">
            <div className="solution-item">
              <h3>Label Scanning</h3>
              <p>Upload or photograph pesticide labels for instant OCR text extraction and key information parsing.</p>
            </div>
            <div className="solution-item">
              <h3>Dosage Calculation</h3>
              <p>Enter your crop type and field size to get precise dosage recommendations tailored to your needs.</p>
            </div>
            <div className="solution-item">
              <h3>Weather Safety</h3>
              <p>Real-time weather data to determine optimal spraying conditions and prevent environmental damage.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Scan Label</h3>
              <p>Upload or take a photo of the pesticide label</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Info</h3>
              <p>Extract active ingredients and recommended dosage</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Calculate</h3>
              <p>Enter crop type and field size for exact dosage</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Check Weather</h3>
              <p>Verify safe spraying conditions for your location</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabelScanner() {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setImageData(event.target.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleScan = async () => {
    if (!imageData) {
      setError('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await ocrApi.processImage(imageData);
      setOcrResult(result);
      setIsProcessing(false);
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  return (
    <section className="label-scanner">
      <div className="container">
        <h2>Pesticide Label Scanner</h2>
        <p>Upload or take a photo of a pesticide label to extract key information</p>
        
        <div className="scanner-content">
          <div className="upload-section">
            <div className="upload-box">
              {image ? (
                <img src={image} alt="Uploaded label" className="uploaded-image" />
              ) : (
                <div className="upload-placeholder">
                  <p>Upload or drag an image of a pesticide label</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                id="image-upload"
                className="hidden-input"
              />
              <label htmlFor="image-upload" className="btn-secondary">
                Choose Image
              </label>
            </div>
            
            <button 
              className="btn-primary" 
              onClick={handleScan}
              disabled={isProcessing}
            >
              {isProcessing ? 'Scanning...' : 'Scan Label'}
            </button>
            
            {error && <div className="error-message">{error}</div>}
          </div>
          
          {ocrResult && (
            <div className="ocr-results">
              <h3>Extracted Information</h3>
              <div className="result-item">
                <span className="result-label">Active Ingredient:</span>
                <span className="result-value">{ocrResult.activeIngredient}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Concentration:</span>
                <span className="result-value">{ocrResult.concentration}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Recommended Dosage:</span>
                <span className="result-value">{ocrResult.recommendedDosage}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Safety Period:</span>
                <span className="result-value">{ocrResult.safetyPeriod}</span>
              </div>
              <button 
                className="btn-primary"
                onClick={() => {
                  // Pass data to dosage calculator
                  // In a real app, we would navigate to the calculator with this data
                }}
              >
                Calculate Dosage
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DosageCalculator() {
  const [formData, setFormData] = useState({
    cropType: '',
    fieldSize: '',
    recommendedDosage: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.cropType || !formData.fieldSize || !formData.recommendedDosage) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsCalculating(true);
    
    try {
      const result = await dosageApi.calculateDosage(formData);
      setResult(result);
      setIsCalculating(false);
    } catch (err) {
      setError(err.message);
      setIsCalculating(false);
    }
  };

  return (
    <section className="dosage-calculator">
      <div className="container">
        <h2>Dosage Calculator</h2>
        <p>Calculate the exact amount of pesticide needed for your field</p>
        
        <div className="calculator-content">
          <form onSubmit={handleSubmit} className="calculator-form">
            <div className="form-group">
              <label htmlFor="cropType">Crop Type</label>
              <select 
                id="cropType" 
                name="cropType" 
                value={formData.cropType} 
                onChange={handleChange}
                required
              >
                <option value="">Select a crop</option>
                <option value="wheat">Wheat</option>
                <option value="corn">Corn</option>
                <option value="soybeans">Soybeans</option>
                <option value="cotton">Cotton</option>
                <option value="rice">Rice</option>
                <option value="potatoes">Potatoes</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="fieldSize">Field Size (hectares)</label>
              <input 
                type="number" 
                id="fieldSize" 
                name="fieldSize" 
                value={formData.fieldSize} 
                onChange={handleChange}
                min="0.1"
                step="0.1"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="recommendedDosage">Recommended Dosage</label>
              <input 
                type="text" 
                id="recommendedDosage" 
                name="recommendedDosage" 
                value={formData.recommendedDosage} 
                onChange={handleChange}
                placeholder="e.g., 1.5 L/hectare"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isCalculating}
            >
              {isCalculating ? 'Calculating...' : 'Calculate Dosage'}
            </button>
            
            {error && <div className="error-message">{error}</div>}
          </form>
          
          {result && (
            <div className="calculation-results">
              <h3>Your Dosage Recommendation</h3>
              <div className="result-item">
                <span className="result-label">Crop Type:</span>
                <span className="result-value">{result.cropType}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Field Size:</span>
                <span className="result-value">{result.fieldSize} hectares</span>
              </div>
              <div className="result-item">
                <span className="result-label">Recommended Dosage:</span>
                <span className="result-value">{result.recommendedDosage}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Dose Needed:</span>
                <span className="result-value">{result.totalDose} {result.unit}</span>
              </div>
              <div className="instructions">
                <h4>Application Instructions</h4>
                <p>{result.instructions}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WeatherAlert() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckWeather = async () => {
    if (!location) {
      setError('Please enter a location');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await weatherApi.getWeather(location);
      setWeatherData(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="weather-alert">
      <div className="container">
        <h2>Weather Safety Alerts</h2>
        <p>Check if current weather conditions are safe for pesticide application</p>
        
        <div className="weather-content">
          <div className="location-input">
            <input 
              type="text" 
              placeholder="Enter your location (city or coordinates)" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button 
              className="btn-primary" 
              onClick={handleCheckWeather}
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Weather'}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          {weatherData && (
            <div className="weather-results">
              <h3>Weather Conditions for {weatherData.location}</h3>
              <div className="weather-info">
                <div className="weather-item">
                  <span className="weather-label">Temperature:</span>
                  <span className="weather-value">{weatherData.temperature}°C</span>
                </div>
                <div className="weather-item">
                  <span className="weather-label">Wind Speed:</span>
                  <span className="weather-value">{weatherData.windSpeed.toFixed(1)} m/s</span>
                </div>
                <div className="weather-item">
                  <span className="weather-label">Precipitation:</span>
                  <span className="weather-value">{weatherData.precipitation.toFixed(1)} mm</span>
                </div>
                <div className="weather-item">
                  <span className="weather-label">Condition:</span>
                  <span className="weather-value">{weatherData.condition}</span>
                </div>
              </div>
              
              <div className={`spray-status ${weatherData.safeToSpray ? 'safe' : 'unsafe'}`}>
                <h4>
                  {weatherData.safeToSpray ? '✅ Safe to Spray' : '⚠️ Not Safe to Spray'}
                </h4>
                {weatherData.warning && (
                  <p className="warning-message">{weatherData.warning}</p>
                )}
                {weatherData.safeToSpray && (
                  <p className="safe-message">
                    Current conditions are suitable for pesticide application.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WaitlistForm() {
  return (
    <section className="waitlist-form">
      <div className="container">
        <h2>Join Our Waitlist</h2>
        <p>Be the first to access AgriScan when we launch</p>
        
        <div className="form-content">
          <iframe 
            src="https://forms.gle/BWehyPQBuRVDHxwg7" 
            title="AgriScan Waitlist Form"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AgriScan</h3>
            <p>Helping farmers spray safely and efficiently</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@agriscan.com</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <p>Social media links</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AgriScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default App;