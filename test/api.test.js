const axios = require('axios');

// Test the health endpoint
async function testHealthEndpoint() {
  try {
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('Health API Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Health API Test Failed:', error.message);
    return null;
  }
}

// Test the OCR endpoint with mock data
async function testOCREndpoint() {
  try {
    // Create a simple base64 representation of text for testing
    const mockImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    
    const response = await axios.post('http://localhost:5000/api/ocr', {
      image: mockImageData
    });
    
    console.log('OCR API Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('OCR API Test Failed:', error.message);
    return null;
  }
}

// Test the dosage calculation endpoint
async function testDosageEndpoint() {
  try {
    const testData = {
      cropType: 'wheat',
      fieldSize: '5.5',
      recommendedDosage: '1.5 L/hectare'
    };
    
    const response = await axios.post('http://localhost:5000/api/dosage', testData);
    
    console.log('Dosage API Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Dosage API Test Failed:', error.message);
    return null;
  }
}

// Test the weather endpoint
async function testWeatherEndpoint() {
  try {
    const response = await axios.get('http://localhost:5000/api/weather', {
      params: { location: 'Farmville' }
    });
    
    console.log('Weather API Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Weather API Test Failed:', error.message);
    return null;
  }
}

// Run all tests
async function runAllTests() {
  console.log('Running AgriScan API Tests...\n');
  
  await testHealthEndpoint();
  console.log('');
  
  await testOCREndpoint();
  console.log('');
  
  await testDosageEndpoint();
  console.log('');
  
  await testWeatherEndpoint();
  console.log('');
  
  console.log('API Tests Completed!');
}

// Execute tests
runAllTests();