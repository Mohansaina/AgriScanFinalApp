import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// OCR API
export const ocrApi = {
  processImage: async (imageData) => {
    try {
      const response = await api.post('/ocr', { image: imageData });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to process image');
    }
  }
};

// Dosage Calculator API
export const dosageApi = {
  calculateDosage: async (data) => {
    try {
      const response = await api.post('/dosage', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to calculate dosage');
    }
  }
};

// Weather API
export const weatherApi = {
  getWeather: async (location) => {
    try {
      const response = await api.get('/weather', { params: { location } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch weather data');
    }
  }
};