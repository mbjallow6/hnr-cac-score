# The CAC Score Calculator

This is a web-based application designed to help clinicians interpret Coronary Artery Calcification (CAC) scores and predict their progression over time. It provides interactive charts and a comprehensive summary report, supporting both initial and follow-up measurements.

**Disclaimer: This application is for educational and research purposes only and is NOT intended for clinical use or to replace professional medical advice.**

## Table of Contents

- [The CAC Score Calculator](#the-cac-score-calculator)
  - [Table of Contents](#table-of-contents)
  - [About the Application](#about-the-application)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Installation](#installation)
  - [Usage](#usage)
    - [About Tab](#about-tab)
    - [Enter Details Tab](#enter-details-tab)
    - [CAC-Score Calculation Tab](#cac-score-calculation-tab)
    - [Age- and Sex-Related CAC-Score Prediction Tab](#age--and-sex-related-cac-score-prediction-tab)
    - [CAC Score Report Tab](#cac-score-report-tab)
    - [Language Selection](#language-selection)
    - [Keyboard Navigation](#keyboard-navigation)
  - [Data Source and Important Notes](#data-source-and-important-notes)
  - [Credits and Acknowledgements](#credits-and-acknowledgements)
  - [License](#license)

## About the Application

The CAC Score Calculator aims to assist healthcare professionals in understanding a patient's individual CAC progression. It can help predict when a patient might reach critical CAC thresholds (e.g., CAC 400), facilitate patient communication regarding risk factor modifications, and aid in planning the timing of subsequent CAC measurements.

The tool is based on an underlying exponential relationship between CAC and age, derived from the Heinz Nixdorf Recall (HNR) study.

## Features

*   **CAC Score Prediction:** Predicts future CAC scores based on initial measurements and an optional second follow-up measurement.
*   **Age Prediction:** Visualizes the predicted age at which a patient might reach specific CAC levels (e.g., CAC 400), relative to population percentiles.
*   **Interactive Charts:** Utilizes D3.js to generate dynamic and interactive charts for both CAC score and age predictions.
*   **Support for Multiple Measurements:** Allows input for an initial CAC measurement and an optional second follow-up measurement for more refined progression analysis.
*   **Comprehensive Summary Report:** Generates a detailed report summarizing patient data, predictions, progression category, implications, and recommendations.
*   **Multilingual Support:** Available in English and German.
*   **Data Export:**
    *   Export charts as PNG images.
    *   Export the full patient report as a PDF document.
*   **Input Validation:** Provides immediate feedback for out-of-range or invalid inputs.
*   **Keyboard Navigation:** Enhanced usability with keyboard navigation (e.g., using Enter key to move between fields).

## Technology Stack

The application is built using standard web technologies:

*   **HTML5:** Structure of the web application.
*   **CSS3:** Styling and layout.
*   **JavaScript (ES6+):** Core logic, interactivity, and data processing.
    *   **D3.js (v7):** Powerful JavaScript library for data visualization (charts).
    *   **jsPDF:** JavaScript library for generating PDF documents client-side.
    *   **html2canvas:** Library to take screenshots of HTML elements and render them on a canvas, used for image and PDF exports.
*   **Custom Modules:**
    *   `calcFunctions.js`: Contains the mathematical models and algorithms for CAC and percentile calculations.
    *   `i18n.js`: Handles internationalization (translation) of the user interface.
    *   `pdfExport.js`: Manages the generation and export of the PDF report.

## Installation

This is a static web application and does not require any special installation or server setup.

1.  **Download Project:**
    
    You can download the project files or clone it using Git when project the repository is available:
    ```bash
    git clone
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd cac-score-calculator
    ```
3.  **Open `index.html`:** Simply open the `index.html` file in your preferred web browser.

## Usage

The application features a tabbed interface for easy navigation:

### About Tab

This is the landing page providing information about the calculator, its purpose, the underlying study, and disclaimers. Click the "Go to Calculator" button to proceed to the input form.

### Enter Details Tab

This tab is where you input patient information and measurement data.

*   **Gender:** Select Male or Female.
*   **Patient ID:** Enter a patient identifier (default is "NN").
*   **Age at initial cardiac CT [Years]:** Enter the patient's age at the time of the first CAC measurement (between 45-80 years).
*   **CAC at initial cardiac CT [Agatston units]:** Enter the CAC score from the first measurement (between 0-1000 Agatston units).
*   **Desired prediction age [Years]:** Enter the future age for which you want a CAC score prediction (must be greater than the initial age, up to 80 years).

**Second Assessment (Optional):**
Check the "A second cardiac CT is available" box if you have a follow-up measurement. This will reveal additional fields:
*   **Age at second cardiac CT [Years]:** Enter the patient's age at the second measurement (must be greater than the initial age, up to 80 years).
*   **CAC at second cardiac CT [Agatston units]:** Enter the CAC score from the second measurement (between 0-1000 Agatston units).
*   **Desired prediction age [Years]:** Enter the future age for a prediction based on the second measurement (must be greater than the second measurement age, up to 80 years).

Click the **"Calculate"** button to process the input and enable the prediction and summary tabs.

### CAC-Score Calculation Tab

After calculation, this tab displays an interactive chart visualizing the predicted CAC score progression curves based on population percentiles. Your patient's initial CAC score and predicted future CAC scores are plotted on this graph. Hover over the lines or points to see specific values.

*   **Export Chart as PNG:** Click this button to download the displayed chart as a PNG image.

### Age- and Sex-Related CAC-Score Prediction Tab

This tab presents another interactive chart showing the predicted age at which different CAC levels are typically reached for the specified gender, based on percentile. Your patient's predicted age for reaching CAC 400 (if applicable) will be highlighted.

*   **Export Chart as PNG:** Click this button to download the displayed chart as a PNG image.

### CAC Score Report Tab

This tab provides a comprehensive textual summary of the patient's data, calculated predictions, progression category (Slow, Normal, Rapid), age at which CAC 400 is predicted, and general implications/recommendations.

*   **Export Report as PDF:** Click this button to generate and download a multi-page PDF report containing the summary and both charts.

### Language Selection

Use the "Select Language" dropdown in the header to switch between English and German. The entire application interface and report content will be updated accordingly.

### Keyboard Navigation

The input form supports keyboard navigation. Press `Enter` while focused on an input field to move to the next logical input field.

## Data Source and Important Notes

The predictive models used in this application are derived from the **Heinz Nixdorf Recall (HNR) Study**.
*   **Citation:** Nils Lehmann, Raimund Erbel, Amir A. Mahabadi, Michael Rauwolf, Stefan Möhlenkamp, Susanne Moebus, Hagen Kälsch, Thomas Budde, Axel Schmermund, Andreas Stang, Dagmar Führer, Christian Weimar, Ulla Roggenbuck, Nico Dragano, and Karl-Heinz Jöckel, on behalf of the Heinz Nixdorf Recall Study Investigators. **"Value of Progression of Coronary Artery Calcification for Risk Prediction of Coronary and Cardiovascular Events – Result of the Heinz Nixdorf Recall (HNR) study."** CIRCULATION AHA/2016/027034.
*   **Population:** It is crucial to note that the tool is based on data from a Caucasian, urban population in Germany. Its applicability to other populations may vary, and therefore, it should be used with adequate caution.
*   **Accuracy:** The prediction tool relies on an underlying exponential relationship between CAC and age. The accuracy of predictions tends to decrease with increasing time between measurements and predictions, and absolute deviations between predicted and measured CAC may increase with higher predicted CAC values.
*   **Clinical Judgment:** Predictions made using this application cannot replace clinical judgment based on patient examination and established clinical guidelines.

## Credits and Acknowledgements

*   **Study Investigators:** Nils Lehmann, Raimund Erbel, Amir A. Mahabadi, Michael Rauwolf, Stefan Möhlenkamp, Susanne Moebus, Hagen Kälsch, Thomas Budde, Axel Schmermund, Andreas Stang, Dagmar Führer, Christian Weimar, Ulla Roggenbuck, Nico Dragano, and Karl-Heinz Jöckel, on behalf of the Heinz Nixdorf Recall Study Investigators.
*   **Original Application Development (Delphi):** © Rauwolf, Lehmann, Mahabadi, Erbel (Central IT, Institute for Medical Informatics, Biometry and Epidemiology, West-German Heart Center Essen, University Duisburg-Essen, Germany).
*   **Web Application Development:** Momodou B. Jallow, under the supervision of Christoph M. Friedrich, Fachhochschule Dortmund | University of Applied Sciences and Arts, Fachbereich Informatik | Department of Computer Science.

## License

This application is freeware. You are free to use, distribute, and modify it under the terms of the freeware license.