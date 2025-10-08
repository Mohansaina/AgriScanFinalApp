# AgriScan - Smart Farming Assistant

AgriScan is a complete web application designed to help farmers safely use pesticides by scanning labels, calculating doses, and checking weather safety conditions.

## Features

1. **Pesticide Label Scanner**: Upload or take a photo of a pesticide label for OCR text extraction
2. **Dosage Calculator**: Calculate the exact amount of pesticide needed based on crop type and field size
3. **Weather Safety Alerts**: Check current weather conditions to determine if it's safe to spray
4. **Waitlist Form**: Join our waitlist for early access to the full application

## Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express
- **OCR**: Tesseract.js
- **Weather API**: OpenWeatherMap API
- **Deployment**: Vercel (Frontend) / Render (Backend)

## Project Structure

```
AgriScantotal/
├── frontend/
│   └── agriscan-frontend/     # React frontend application
│       ├── src/
│       │   ├── App.jsx         # Main application component
│       │   ├── App.css         # Application styles
│       │   └── index.css       # Global styles
│       └── package.json
├── backend/
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AgriScantotal
   ```

2. **Set up the frontend**
   ```bash
   cd frontend/agriscan-frontend
   npm install
   ```

3. **Set up the backend**
   ```bash
   cd ../../backend
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on http://localhost:5000

2. **Start the frontend development server**
   ```bash
   cd frontend/agriscan-frontend
   npm run dev
   ```
   The frontend will start on http://localhost:5173

### Building for Production

1. **Build the frontend**
   ```bash
   cd frontend/agriscan-frontend
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd backend
   npm start
   ```

## API Endpoints

- `GET /api/health` - Check if the backend is running
- `POST /api/ocr` - Process pesticide label image (OCR)
- `POST /api/dosage` - Calculate pesticide dosage
- `GET /api/weather` - Get weather data for a location

## Deployment

### Automated Deployment (Recommended)

For Windows users, simply run:
```bash
deploy.bat
```

For Mac/Linux users, run:
```bash
chmod +x deploy.sh
./deploy.sh
```

This will automatically deploy the frontend to Vercel. For the backend, you'll need to manually set up deployment through the Render dashboard using the provided `render.yaml` file.

### Manual Deployment

#### Frontend (Vercel)
1. Push the code to a GitHub repository
2. Connect the repository to Vercel
3. Set the build command to `npm run build`
4. Set the output directory to `dist`

#### Backend (Render)
1. Push the code to a GitHub repository
2. Create a new Web Service on Render
3. Connect your repository
4. Set the build command to `npm install`
5. Set the start command to `npm start`
6. Add environment variables in the Render dashboard

## Sample Data

### OCR Testing
Sample pesticide labels can be found in the `samples/` directory (to be added).

### Dosage Calculation
Example crop types and field sizes:
- Wheat, 5 hectares
- Corn, 10 hectares
- Soybeans, 7.5 hectares

### Weather API
The weather API returns sample warnings when:
- Wind speed exceeds 10 m/s
- Precipitation is greater than 0 mm

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact:
- Email: info@agriscan.com