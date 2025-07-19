# HNR CAC Score Versions
- cac-cal-main-serverless-v3/: Version 3 files
- cac-cal-main-serverless-v4/: Version 4 files
- cac-cal-main-serverless-v5/: Version 5 files

## CAC Score Calculator

A web-based **Coronary Artery Calcification (CAC) Score Calculator** for predicting CAC progression and age-related cardiovascular risk assessment. This serverless application runs entirely in the browser without requiring any backend server or installation.

## Quick Start

1. Navigate to the `version-5` folder
2. Open `index.html` in your web browser
3. The application will load automatically

## Features

- **CAC Score Prediction**: Calculate future CAC scores based on current measurements
- **Age Prediction**: Estimate age when CAC score reaches specific thresholds (e.g., CAC=400)
- **Dual Measurement Support**: Compare initial and follow-up measurements
- **Interactive Charts**: Visualize CAC progression with D3.js-powered charts
- **Multi-language Support**: Available in multiple languages with real-time switching
- **PDF Export**: Generate comprehensive reports for clinical use
- **Risk Assessment**: Categorize CAC progression as slow, normal, or rapid

## File Structure

```
version-5/
├── index.html          # Main application interface
├── script.js           # Core application logic and event handling
├── calcFunctions.js    # CAC calculation algorithms and mathematical functions
├── cacChart.js         # CAC progression chart visualization
├── ageChart.js         # Age prediction chart visualization
├── i18n.js            # Internationalization and language support
├── d3.v7.js           # D3.js library for data visualization
└── style.css          # Application styling
```

## Usage

1. **Patient Information**: Enter patient name and select gender
2. **Initial Measurement**: Input current age and CAC score
3. **Future Prediction**: Specify target age for CAC prediction
4. **Optional Second Measurement**: Enable checkbox for follow-up data comparison
5. **Calculate**: Click "Calculate" to generate predictions and visualizations
6. **Review Results**: Navigate through tabs to view:
   - CAC progression charts
   - Age prediction charts
   - Summary report with clinical implications

## Browser Requirements

- Modern web browser with JavaScript enabled
- SVG support for chart rendering
- No internet connection required (fully offline capable)

## Technical Details

- **Framework**: Vanilla JavaScript (ES6+)
- **Visualization**: D3.js v7
- **Styling**: CSS3
- **Architecture**: Client-side only, no server dependencies
- **Data Processing**: Real-time calculations using polynomial regression models