// Main application module
(function () {
    "use strict";


    // Initialize the app
    document.addEventListener("DOMContentLoaded", initializeApp);

    // Application state
    const state = {
        secondMeasurement: false,
    };

    // Initialize the application
    async function initializeApp() {

        // --- Determine Initial Language (from URL or Default) ---
        let initialLanguage = defaultLanguage;
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const langFromUrl = urlParams.get('lang');

            if (langFromUrl && availableLocales.includes(langFromUrl)) {
                initialLanguage = langFromUrl;
            } else if (langFromUrl) {
                console.warn(`Invalid language parameter '${langFromUrl}' provided in URL. Using default language '${defaultLanguage}'.`);
            }
        } catch (error) {
            console.error("Error processing URL parameters:", error);
        }

        // --- Update Dropdown ---
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = initialLanguage;
            // console.log(`Set language dropdown value to: ${languageSelect.value}`); 
        } else {
            console.error("Could not find the language select dropdown element!");
        }

        // --- Translate Page Content ---
        try {
            await translatePage(initialLanguage); 
            // console.log(`translatePage completed for: ${initialLanguage}`); 
        } catch (error) {
             console.error(`Error during initial translatePage(${initialLanguage}):`, error);
        }

        // --- Setup Event Listeners and Other Initializations ---
        setupEventListeners();
        setupLanguageSwitching();
        disablePredictionTabs(); 
        // resetForm();
        hideSections();
        setupKeyboardNavigation();
      }

    function setupEventListeners() {
        setupTabSwitching();
        setupFormInteractions();
        setupValidation();
        setupResetButton();
        setupModal();
        setupChartExport();
    
        // Add listener for the Calculate button
        document.getElementById("calculateButton").addEventListener("click", () => {
            const inputData = collectInputData();
            // console.log("DEBUGGING INPUT DATA:", inputData);
            const validationResult = validateInputData(inputData);
    
            if (!validationResult.isValid) {
                showModal(validationResult.message);
                return;
            }

           
            const cacResults = updateCACPrediction(inputData);
            togglePredictionTabs(inputData);
            updateCACPrediction(inputData);
            updateAgePrediction(inputData);
            updateSummaryTab(inputData, cacResults, {});

    
            // Switch to Summary tab
            document.querySelector('.tab-btn[data-tab="predict-cac"]').click();
        });

        document.getElementById('goToDetailsBtn').addEventListener('click', () => {
        document.querySelector('.tab-btn[data-tab="details"]').click();
    });

    }

     function setupLanguageSwitching() {
        const languageSelect = document.getElementById('language-select');

        languageSelect.addEventListener('change', async (event) => {
            const selectedLanguage = event.target.value;
            await translatePage(selectedLanguage); 
            const ageT0Input = document.getElementById("age_t0");
            const ageT1Future = document.getElementById("age_t1_future");
            const ageT2Input = document.getElementById("age_t2");
            const ageT2Future = document.getElementById("age_t2_future");
            updateAgeRanges(ageT0Input, ageT1Future, ageT2Input);
            updateFutureAgeRanges(ageT2Input, ageT2Future);

            const inputData = collectInputData(); 
            updateCACPrediction(inputData);
            updateAgePrediction(inputData);
            const riskResults = calculateRisks(inputData); 
            updateFraminghamTab(riskResults);
            const cacResults = updateCACPrediction(inputData); 
            updateSummaryTab(inputData, cacResults, riskResults); 
        });
    }



    
    function setupKeyboardNavigation() {
        const form = document.getElementById("cacForm");
    
        form.addEventListener("keydown", function(event) {
            if (event.key === "Enter") { 
                event.preventDefault(); 
    
                const currentElement = document.activeElement; 
    
                // Get all focusable elements in the form
                const focusableElements = Array.from(form.querySelectorAll('input:not([type=radio]), select, textarea, button'))
                    .filter(element => element.offsetWidth > 0 || element.offsetHeight > 0);  
    
                // Find the index of the current element
                const currentIndex = focusableElements.indexOf(currentElement);
    
                // Calculate the index of the next element
                const nextIndex = (currentIndex + 1) % focusableElements.length;
    
                // Focus the next element if one exists
                if (focusableElements.length > 0) {
                    focusableElements[nextIndex].focus();
                }
            }
        });
    }


    function translateGender(genderValue) {
        if (genderValue === "male") {
          return translateText("form.male"); 
        }
        if (genderValue === "female") {
          return translateText("form.female"); 
        }
        return "N/A";
      }
      
    //   
    
    


    function collectInputData() {
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const current_age = parseFloat(document.getElementById("age_t0").value);
        const current_CAC = parseFloat(document.getElementById("cac_t0").value);
        const future_age = parseFloat(document.getElementById("age_t1_future").value);
        const patient_name = document.getElementById("patient_name").value;
        
        const second_measurement = document.getElementById("second_measurement").checked;
        const age_t2 = second_measurement
            ? parseFloat(document.getElementById("age_t2").value)
            : undefined;
        const cac_t2 = second_measurement
            ? parseFloat(document.getElementById("cac_t2").value)
            : undefined;
        const age_t2_future = second_measurement
            ? parseFloat(document.getElementById("age_t2_future").value)
            : undefined;
    
        // Consolidated data object
        const inputData = {
            gender,
            current_age,
            current_CAC,
            future_age,
            patient_name,
            second_measurement,
            age_t2,
            cac_t2,
            age_t2_future
        };
        // console.log(inputData);
        return inputData;
    }

    function validateInputData(data) {
        // Validate gender
        if (!["male", "female"].includes(data.gender)) {
            return { isValid: false, message: translateText("message.validation.gender")};
        }

        
        // Validate current_age
        if (isNaN(data.current_age) || data.current_age < 45 || data.current_age > 80) {
            return { isValid: false, message:translateText("message.validation.current_age")};
        }
        //  EDGE CASE CHECK
        if (data.current_age >= 80) {
            return { isValid: false, message: translateText("message.validation.age_too_high") };
        }  

        
    
        // Validate current_CAC
        if (isNaN(data.current_CAC) || data.current_CAC < 0 || data.current_CAC > 1000) {
            return { isValid: false, message: translateText("message.validation.current_cac")}; 
        }
    
        // Validate future_age
        // const minFutureAge = data.current_age + 5;
        // const maxFutureAge = data.current_age + 10;
        // if (isNaN(data.future_age) || data.future_age < minFutureAge || data.future_age > maxFutureAge) {
        //     return { isValid: false, 
        //         message:translateText("message.validation.future_age", 
        //             { min: minFutureAge, max: maxFutureAge })}; 
        // }
        if (isNaN(data.future_age) || data.future_age <= data.current_age || data.future_age > 80) {
        return { isValid: false, 
            message: translateText("message.validation.future_age", 
                { min: data.current_age + 1, max: 80 })}; 
        }
    
        // Validate patient_name
        if (typeof data.patient_name !== "string" || !data.patient_name.trim()) {
            return { isValid: false, message: "Patient name is required and must be a valid string." };
        }
    
        // Validate second measurement fields if second_measurement is checked
        if (data.second_measurement) {
            // const minAgeT2 = data.current_age + 5;
            // if (isNaN(data.age_t2) || data.age_t2 < minAgeT2 || data.age_t2 > 80) {
            //     return { isValid: false, message: `Age t2 must be between ${minAgeT2} and 80.` };
            // }
            if (isNaN(data.age_t2) || data.age_t2 <= data.current_age || data.age_t2 > 80) {
            return { isValid: false, message: translateText("message.validation.age_t2", { min: data.current_age + 1 }) };
            }
    
            if (isNaN(data.cac_t2) || data.cac_t2 < 0 || data.cac_t2 > 1000) {
                return { isValid: false, message: "CAC t2 must be between 0 and 1000." };
            }
    
            // const minAgeT2Future = data.age_t2 + 5;
            // const maxAgeT2Future = data.age_t2 + 10;
            // if (isNaN(data.age_t2_future) || data.age_t2_future < minAgeT2Future || data.age_t2_future > maxAgeT2Future) {
            //     return { isValid: false, message: `Age t2 future must be between ${minAgeT2Future} and ${maxAgeT2Future}.` };
            // }
            if (isNaN(data.age_t2_future) || data.age_t2_future <= data.age_t2 || data.age_t2_future > 80) {
            return { isValid: false, message: translateText("message.validation.age_t2_future", { min: data.age_t2 + 1, max: 80 }) };
            }
        } 
    
        // If all validations pass
        return { isValid: true };
    }

    function togglePredictionTabs(inputData) {
        const tabs = {
            predictCac: document.querySelector('.tab-btn[data-tab="predict-cac"]'),
            predictAge: document.querySelector('.tab-btn[data-tab="predict-age"]'),
            summary: document.querySelector('.tab-btn[data-tab="summary"]'),
        };
    
        tabs.predictCac.disabled = false;
        tabs.predictAge.disabled = false;
        tabs.summary.disabled = false;
    
        
    
        
    }

    function updateSummaryTab(inputData, cacResults = {}) {
        const summaryContent = document.getElementById("summary-content");

        const userPercentile = inputData.current_age && inputData.current_CAC
            ? calculatePercentile(inputData.current_age, inputData.current_CAC, inputData.gender)
            : null;
        const coefficients400 = inputData.gender ? getPolynomialCoefficients(inputData.gender).polynomials[400] : null;
        const ageAtCAC400 = coefficients400 && userPercentile !== null
            ? evaluatePolynomial(coefficients400, userPercentile * 100).toFixed(1)
            : "N/A";
        
        let cacProgression = "N/A";
        if (inputData.second_measurement && inputData.current_CAC !== undefined && inputData.cac_t2 !== undefined) {
            const currentPercentile = calculatePercentile(inputData.current_age, inputData.current_CAC, inputData.gender);
            const observedFuturePercentile = calculatePercentile(inputData.age_t2, inputData.cac_t2, inputData.gender);
            cacProgression = determineProgressionCategory(currentPercentile, observedFuturePercentile);
        }
        
        let implication = translateText("summary.no_implications"); 
        if (inputData.current_CAC >= 400) {
            implication = translateText("summary.high_risk_implication");
        } else if (cacProgression === "Rapid") {
            implication = translateText("summary.rapid_implication");
        } else if (cacProgression === "Expected") {
            implication = translateText("summary.expected_implication");
        } else if (cacProgression === "Slow" && ageAtCAC400 !== "N/A") {
            implication = translateText("summary.slow_implication") + ` ${ageAtCAC400}.`;
        }
        
        let recommendation = translateText("summary.no_recommendations"); 
        if (inputData.current_CAC === 0 && inputData.second_measurement && inputData.cac_t2 === 0) {
            recommendation = translateText("summary.very_low_risk_recommendation");
        } else if (inputData.current_CAC > 0 && inputData.current_CAC < 100) {
            recommendation = translateText("summary.followup_recommendation_5yrs");
        } else if (inputData.current_CAC >= 100 && inputData.current_CAC < 400) {
            recommendation = translateText("summary.followup_and_lifestyle_recommendation");
        } else if (inputData.current_CAC >= 400) {
            recommendation = translateText("summary.high_risk_recommendation");
        }
        recommendation += " " + translateText("summary.lifestyle_recommendation");
        
        const followUpSection = inputData.second_measurement
            ? `
                <div class="section">
                    <h2>${translateText("summary.followup_measurement")}</h2>
                    <div class="row">
                        <p>${translateText("summary.age_at_followup")} <span>${inputData.age_t2 || "N/A"}</span></p>
                        <p>${translateText("summary.cac_score_at_followup")} <span>${inputData.cac_t2 || "N/A"}</span></p>
                    </div>
                </div>
            `
            : "";
        
        const cacPredictionSection = `
            <div class="section">
                <h2>${translateText("summary.cac_score_prediction")}</h2>
                <div class="row">
                    <p>${translateText("summary.age_at_initial_prediction")}  <span>${inputData.future_age || "N/A"}</span></p>
                    <p>${translateText("summary.cac_score")}  <span>${cacResults.predicted_future_CAC?.toFixed(1) || "N/A"}</span></p>
                </div>
                <div class="row">
                    <p>${translateText("summary.age_at_followup_prediction")}  <span>${inputData.age_t2_future || "N/A"}</span></p>
                    <p>${translateText("summary.cac_score")}  <span>${cacResults.predicted_future_CAC_t2?.toFixed(1) || "N/A"}</span></p>
                </div>
            </div>
        `;
        
        // Populate the summary content with all translated static text
        summaryContent.innerHTML = `
            <div class="report-container">
                <h1>${translateText("summary.title")}</h1>
        
                <!-- Initial Measurement Section -->
                <div class="section">
                    <h2>${translateText("summary.initial_measurement")}</h2>
                    <div class="row">
                        <p>${translateText("summary.patient_id")} <span>${inputData.patient_name || "N/A"}</span></p>
                        <p>${translateText("summary.gender")} <span>${translateGender(inputData.gender)}</span></p>
                    </div>
                    <div class="row">
                        <p>${translateText("summary.initial_age")}  <span>${inputData.current_age || "N/A"}</span></p>
                        <p>${translateText("summary.initial_cac")}  <span>${inputData.current_CAC || "N/A"}</span></p>
                    </div>
                </div>
        
                <!-- Follow-Up Measurement Section -->
                ${followUpSection}
        
                <!-- CAC Score Prediction Section -->
                ${cacPredictionSection}
        
                
        
                <!-- Risk Section -->
                <div class="section">
                    <h2>${translateText("summary.risk")}</h2>
                    <table>
                        <tr>
                            <th>${translateText("summary.cac_progression")}</th>
                            <th>${translateText("summary.age_at_cac_400")}</th>
                        </tr>
                        <tr>
                            <td>${cacProgression}</td>
                            <td>${ageAtCAC400}</td>
                        </tr>
                    </table>
                </div>
        
                <!-- Implication Section -->
                <div class="section implication">
                    <h2>${translateText("summary.implication")}</h2>
                    <p>${implication}</p>
                </div>
        
                <!-- Recommendation Section -->
                <div class="section recommendation">
                    <h2>${translateText("summary.recommendation")}</h2>
                    <p>${recommendation}</p>
                </div>
            </div>
        `;
    }


    // Tab switching functionality
    function setupTabSwitching() {
        const tabBtns = document.querySelectorAll(".tab-btn");
        tabBtns.forEach((btn) =>
            btn.addEventListener("click", () => {
                if (btn.disabled) return;
                activateTab(btn, tabBtns);
            })
        );
    }

    function activateTab(activeBtn, allBtns) {
        allBtns.forEach((btn) => btn.classList.remove("active"));
        activeBtn.classList.add("active");

        const tabId = activeBtn.getAttribute("data-tab");
        document.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active");
        });
        document.getElementById(tabId).classList.add("active");
    }

    // Form interactions: toggle sections and validate input ranges
    function setupFormInteractions() {
        document.getElementById("second_measurement").addEventListener("change", (e) => {
            toggleSection("second_measurement_section", e.target.checked);
            state.secondMeasurement = e.target.checked;
        });
 
    }

    

    function toggleSection(sectionId, condition) {
        document.getElementById(sectionId).style.display = condition ? "block" : "none";
    }

    // Validation for age ranges
    function setupValidation() {
        const ageT0Input = document.getElementById("age_t0");
        const ageT2Input = document.getElementById("age_t2");
        const ageT1Future = document.getElementById("age_t1_future");
        const ageT2Future = document.getElementById("age_t2_future");

        ageT0Input.addEventListener("input", () => updateAgeRanges(ageT0Input, ageT1Future, ageT2Input));
        ageT2Input.addEventListener("input", () => updateFutureAgeRanges(ageT2Input, ageT2Future));
    }

    function updateAgeRanges(ageT0Input, ageT1Future, ageT2Input) {
    const ageT0 = parseInt(ageT0Input.value);
    if (!isNaN(ageT0)&& ageT0 < 80) {
        const minFuture = ageT0 + 1;
        const maxFuture = 80;
        // const maxForFirstPredictionAndSecondMeasurement = Math.min(ageT0 + 10, 80);
        // maxForFirstPredictionAndSecondMeasurement
        // maxForFirstPredictionAndSecondMeasurement

        updateInputRange(ageT1Future, minFuture, maxFuture, "age_t1_range");

        updateInputRange(ageT2Input, minFuture, maxFuture, "age_t2_range");
    }else {
        // Clear the ranges if initial age is invalid or 80
        updateInputRange(ageT1Future, null, null, "age_t1_range");
        updateInputRange(ageT2Input, null, null, "age_t2_range");
    }
}

function updateFutureAgeRanges(ageT2Input, ageT2Future) {
    const ageT2 = parseInt(ageT2Input.value);
    if (!isNaN(ageT2)&& ageT2 < 80) {
        const minFuture = ageT2 + 1; 
        const maxFuture = 80;
        
        // const maxForSecondPrediction = Math.min(ageT2 + 10, 80);

        updateInputRange(ageT2Future, minFuture, maxFuture, "age_t2_future_range");
    } else {
        // Clear the range if t2 age is invalid or 80
        updateInputRange(ageT2Future, null, null, "age_t2_future_range");
    }
}


    function updateInputRange(input, min, max, rangeId) {
    if (input) { 
        input.min = min != null ? min : ''; 
        input.max = max != null ? max : ''; 
    }
    const instructionElement = document.getElementById(rangeId);
    if (!instructionElement) {
        console.warn(`Instruction element not found for rangeId: ${rangeId}. Cannot update range text.`);
        return;
    }
    let i18nKey;
    switch (rangeId) {
        case "age_t0_instruction":
            i18nKey = "instruction.initial_age";
            break;
        case "cac_t0_instruction":
            i18nKey = "instruction.initial_cac";
            break;
        case "age_t1_range": 
            i18nKey = "instruction.age_t1";
            break;
        case "age_t2_range": 
            i18nKey = "instruction.age_t2";
            break;
        case "cac_t2_instruction":
            i18nKey = "instruction.cac_t2";
            break;
        case "age_t2_future_range": 
            i18nKey = "instruction.age_t2_prediction";
            break;
        default:
            console.warn(`No specific i18n key mapping for rangeId: ${rangeId}. Defaulting to range display.`);
            instructionElement.textContent = `Enter a number: ${min}-${max}`; 
            return;
    }

    let baseTranslation = translateText(i18nKey);
    let finalHtml = baseTranslation
        .replace('{min}', min != null ? min : 'Min')
        .replace('{max}', max != null ? max : 'Max');

    instructionElement.innerHTML = finalHtml;
}





    // Reset form functionality
    function setupResetButton() {
        const resetButton = createResetButton();
        document.getElementById("calculateButton").after(resetButton);

        resetButton.addEventListener("click", resetForm);
    }

    function createResetButton() {
        const button = document.createElement("button");
        button.textContent = "Reset Form";
        button.className = "reset-button";
        return button;
    }

    

    function hideSections() {
        toggleSection("second_measurement_section", false);
    }

    function disablePredictionTabs() {
        document.querySelector('.tab-btn[data-tab="predict-cac"]').disabled = true;
        document.querySelector('.tab-btn[data-tab="predict-age"]').disabled = true;
        document.querySelector('.tab-btn[data-tab="summary"]').disabled = true;
        // document.querySelector('.tab-btn[data-tab="details"]').click();
    }
    function resetForm() {
        const form = document.getElementById("cacForm");
        form.reset();
        hideSections();
        disablePredictionTabs();
        document.querySelector('.tab-btn[data-tab="details"]').click();
    }

    // Modal functionality
    function setupModal() {
        document.getElementById("closeModal").addEventListener("click", hideModal);
    }

    function showModal(message) {
        document.getElementById("modalMessage").textContent = message;
        document.getElementById("myModal").style.display = "block";
    }

    function hideModal() {
        document.getElementById("myModal").style.display = "none";
    }

    // Chart export functionality
    function setupChartExport() {
        setupExportButton("export-cac-png", "CAC_Chart.png", "#cac-chart svg");
        setupExportButton("export-cac-svg", "CAC_Chart.svg", "#cac-chart svg", true);
        setupExportButton("export-age-png", "Age_Chart.png", "#age-chart svg");
        setupExportButton("export-age-svg", "Age_Chart.svg", "#age-chart svg", true);
    }

    function setupExportButton(buttonId, filename, svgSelector, isSVG = false) {
        document.getElementById(buttonId).addEventListener("click", () => {
            const svgElement = document.querySelector(svgSelector);
            if (isSVG) {
                downloadSVG(svgElement, filename);
            } else {
                svgToCanvasAndDownload(svgElement, filename);
            }
        });
    }

    function svgToCanvasAndDownload(svgElement, filename) {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const canvas = document.createElement("canvas");
    // Use getBoundingClientRect for more accurate dimensions of the rendered SVG
    const rect = svgElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    // Set a white background, otherwise it will be transparent
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();

    // Create a Blob from the SVG string
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Create download link
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = filename;
        link.click();

        // Clean up the blob URL
        URL.revokeObjectURL(url);
    };

    // Handle potential errors if the image fails to load
    img.onerror = (err) => {
        console.error("Failed to load SVG image for canvas conversion.", err);
        URL.revokeObjectURL(url); // Clean up even on error
        alert("Sorry, the PNG could not be exported. Please try exporting as SVG.");
    };

    img.src = url;
    }

    function downloadSVG(svgElement, filename) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);

        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }   

})();
