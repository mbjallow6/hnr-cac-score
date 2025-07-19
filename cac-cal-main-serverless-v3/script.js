// Main application module
(function () {
    "use strict";

    // =====================================================================
    // 1. ADD NEW CONSTANTS AND CONVERSION FUNCTION HERE (AT THE TOP)
    //    These need to be accessible by multiple functions within the IIFE.
    // =====================================================================

    const CHOLESTEROL_CONVERSION_FACTOR = 38.67; // 1 mmol/L = 38.67 mg/dL

    // Define accepted ranges for cholesterol in both units (mg/dL based on your existing code)
    const CHOLESTEROL_RANGES_MGDL = {
        total_chol: { min: 130, max: 320 },
        hdl_chol: { min: 20, max: 100 }
    };

    // Calculate mmol/L ranges based on mg/dL ranges
    const CHOLESTEROL_RANGES_MMOLL = {
        total_chol: {
            min: CHOLESTEROL_RANGES_MGDL.total_chol.min / CHOLESTEROL_CONVERSION_FACTOR,
            max: CHOLESTEROL_RANGES_MGDL.total_chol.max / CHOLESTEROL_CONVERSION_FACTOR
        },
        hdl_chol: {
            min: CHOLESTEROL_RANGES_MGDL.hdl_chol.min / CHOLESTEROL_CONVERSION_FACTOR,
            max: CHOLESTEROL_RANGES_MGDL.hdl_chol.max / CHOLESTEROL_CONVERSION_FACTOR
        }
    };

    /**
     * Converts a cholesterol value to mg/dL if it's currently in mmol/L.
     * @param {number} value 
     * @param {string} unit 
     * @returns {number} 
     */
    function convertToMgDl(value, unit) {
        if (unit === 'mmolL') {
            return value * CHOLESTEROL_CONVERSION_FACTOR;
        }
        return value; 
    }


   

    // Initialize the app
    document.addEventListener("DOMContentLoaded", initializeApp);

    // Application state
    const state = {
        secondMeasurement: false,
        useFramingham: false,
        useAscvd: false,
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
            console.log(`Set language dropdown value to: ${languageSelect.value}`); 
        } else {
            console.error("Could not find the language select dropdown element!");
        }

        // --- Translate Page Content ---
        try {
            await translatePage(initialLanguage); 
            console.log(`translatePage completed for: ${initialLanguage}`); 
        } catch (error) {
             console.error(`Error during initial translatePage(${initialLanguage}):`, error);
        }

        // --- Setup Event Listeners and Other Initializations ---
        setupEventListeners();
        setupLanguageSwitching(); 
        resetForm();
        hideSections();
        setupKeyboardNavigation();
        updateCholesterolRangeInstructions();
      }

    function setupEventListeners() {
        setupTabSwitching();
        setupFormInteractions();
        setupValidation();
        setupResetButton();
        setupModal();
        setupChartExport();
        setupRealTimeChartListeners();
    
        // Add listener for the Calculate button
        document.getElementById("calculateButton").addEventListener("click", () => {
            const inputData = collectInputData();
            console.log("DEBUGGING INPUT DATA:", inputData);
            const validationResult = validateInputData(inputData);
    
            if (!validationResult.isValid) {
                showModal(validationResult.message);
                return;
            }

            
    
            // Calculate results
            const cacResults = updateCACPrediction(inputData);
            const riskResults = calculateRisks(inputData);
    
            // Enable tabs dynamically
            togglePredictionTabs(inputData);
    
            // Update content
            updateCACPrediction(inputData);
            updateAgePrediction(inputData);
            updateSummaryTab(inputData, cacResults, riskResults);
            updateASCVDTab(riskResults);
            updateFraminghamTab(riskResults);
    
            // Switch to Summary tab
            document.querySelector('.tab-btn[data-tab="summary"]').click();
        });
        // =====================================================================
        // OPTIONAL: ADD LISTENERS FOR UNIT CHANGE EVENTS HERE
        // (This makes the validation feedback more immediate, but not critical for core functionality)
        // =====================================================================
        document.getElementById("total_chol_unit").addEventListener("change", function() {
            
            updateCholesterolRangeInstructions();
        });
        document.getElementById("hdl_chol_unit").addEventListener("change", function() {
            updateCholesterolRangeInstructions();
        
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


    function calculateRisks(inputData) {
        const results = {};
    
        // ASCVD Risk Calculation
        if (inputData.useAscvd) {
            try {
                const ascvdAge = inputData.second_measurement ? inputData.age_t2 : inputData.current_age;
                const ascvdCAC = inputData.second_measurement ? inputData.cac_t2 : inputData.current_CAC;
    
                results.ascvdRisk = calculateMesaRisk({
                    gender: inputData.gender,
                    age: ascvdAge,
                    cac: ascvdCAC,
                    race: inputData.race,
                    diabetes: inputData.diabetes ? 1 : 0,
                    smoker: inputData.smoker ? 1 : 0,
                    fh_heartattack: inputData.family_heart_attack ? 1 : 0,
                    totchol: inputData.total_chol,
                    hdl: inputData.hdl_chol,
                    sbp: inputData.systolic_bp,
                    lipid_med: inputData.lipid_meds ? 1 : 0,
                    bp_med: inputData.bp_meds ? 1 : 0,
                });
            } catch (error) {
                console.error("Error calculating ASCVD Risk:", error);
                results.ascvdRisk = null; 
            }
        }
    
    
        // Framingham Risk Calculation
        if (inputData.useFramingham) {
            try {
                const framinghamAge = inputData.second_measurement ? inputData.age_t2 : inputData.current_age;
    
                results.framinghamRisk = framinghamRiskHardCHD(
                    framinghamAge,
                    inputData.gender,
                    inputData.total_chol,
                    inputData.hdl_chol,
                    inputData.systolic_bp,
                    inputData.bp_meds,
                    inputData.smoker
                ) ; 
            } catch (error) {
                console.error("Error calculating Framingham Risk:", error);
                results.framinghamRisk = null;
            }
        }
    
        return results;
    }

    function setupRealTimeChartListeners() {
        const interactiveAgeT1 = document.getElementById("interactive_age_t1");
        const interactiveCacT0 = document.getElementById("interactive_cac_t0");
        const interactiveGender = document.getElementById("interactive_gender");
        const interactiveSecondMeasurement = document.getElementById("interactive_second_measurement");
        const interactiveSecondMeasurementSection = document.getElementById("interactive_second_measurement_section");
        const interactiveAgeT2 = document.getElementById("interactive_age_t2");
        const interactiveCacT2 = document.getElementById("interactive_cac_t2");
    
        //Add event listeners
        interactiveAgeT1.addEventListener("input", () => updateChartRealTime({
            interactiveAgeT1, interactiveCacT0, interactiveGender, interactiveSecondMeasurement, interactiveAgeT2, interactiveCacT2
        }));
        interactiveCacT0.addEventListener("input", () => updateChartRealTime({
            interactiveAgeT1, interactiveCacT0, interactiveGender, interactiveSecondMeasurement, interactiveAgeT2, interactiveCacT2
        }));
        interactiveGender.addEventListener("change", () => updateChartRealTime({
            interactiveAgeT1, interactiveCacT0, interactiveGender, interactiveSecondMeasurement, interactiveAgeT2, interactiveCacT2
        }));

        interactiveSecondMeasurement.addEventListener("change", function () {
            interactiveSecondMeasurementSection.style.display = this.checked ? "flex" : "none";
            updateChartRealTime({ interactiveAgeT1, interactiveCacT0, interactiveGender, interactiveSecondMeasurement, interactiveAgeT2, interactiveCacT2 });
        });

        interactiveAgeT2.addEventListener("input", () => updateChartRealTime({
            interactiveAgeT1, interactiveCacT0, interactiveGender, interactiveSecondMeasurement, interactiveAgeT2, interactiveCacT2
        }));
        interactiveCacT2.addEventListener("input", () => updateChartRealTime({
            interactiveAgeT1, interactiveCacT0, interactiveGender, interactiveSecondMeasurement, interactiveAgeT2, interactiveCacT2
        }));

        interactiveAgeT1.addEventListener("input", updateAgeChartInRealTime);
        interactiveCacT0.addEventListener("input", updateAgeChartInRealTime);
        interactiveGender.addEventListener("change", updateAgeChartInRealTime);
    }

    function updateChartRealTime({ interactiveAgeT1, interactiveCacT0, interactiveGender, interactiveSecondMeasurement, interactiveAgeT2, interactiveCacT2 }) {
        const ageT1Future = parseFloat(interactiveAgeT1.value);
        const cacT0 = parseFloat(interactiveCacT0.value);
        const gender = interactiveGender.value;
        const secondMeasurement = interactiveSecondMeasurement.checked;
        const ageT2 = parseFloat(interactiveAgeT2.value);
        const cacT2 = parseFloat(interactiveCacT2.value);
    
        // Validate inputs
        if (isNaN(ageT1Future) || isNaN(cacT0) || !gender) {
            return;
        }
    
        const inputData = {
            current_age: ageT1Future,
            current_CAC: cacT0,
            future_age: ageT1Future + 5,
            gender: gender,
            second_measurement: secondMeasurement,
            age_t2: secondMeasurement && !isNaN(ageT2) ? ageT2 : undefined,
            cac_t2: secondMeasurement && !isNaN(cacT2) ? cacT2 : undefined,
        };
    
        updateCACPrediction(inputData);
        updateAgePrediction(inputData);
    }

   
    
    

    function updateAgeChartInRealTime() {
        const gender = document.getElementById("interactive_gender").value;
        const current_age = parseFloat(document.getElementById("interactive_age_t1").value);
        const current_CAC = parseFloat(document.getElementById("interactive_cac_t0").value);
    
        if (isNaN(current_age) || isNaN(current_CAC) || !gender) {
            return; 
        }
    
        const inputData = {
            gender: gender,
            current_age: current_age,
            current_CAC: current_CAC,
        };
    
        updateAgePrediction(inputData);
    }

    function updateASCVDTab(riskResults) {
        const riskElement = document.getElementById("ascvd-risk");
    
        if (riskResults.ascvdRisk !== null && !isNaN(riskResults.ascvdRisk)) {
            riskElement.textContent = `${riskResults.ascvdRisk.toFixed(1)}%`;
        } else {
            riskElement.textContent = "Unable to calculate risk.";
        }
    }
    

    function updateFraminghamTab(riskResults) {
        const riskElement = document.getElementById("framingham-risk");
        const interpretationElement = document.getElementById("framingham-interpretation");
    
        if (riskResults.framinghamRisk !== null && !isNaN(riskResults.framinghamRisk)) {
            riskElement.textContent = `${riskResults.framinghamRisk}%`;
    
            let interpretation = translateText("message.framingham.Unable_to_interpret_risk");
            const riskValue = parseFloat(riskResults.framinghamRisk);
            if (riskValue < 5) {
                interpretation = translateText("message.framingham.Low_Risk");
              } else if (riskValue < 10) {
                interpretation = translateText("message.framingham.Moderate_Risk");
              } else {
                interpretation = translateText("message.framingham.High_Risk");
              }
            interpretationElement.textContent = interpretation;
        } else {
            riskElement.textContent = "--";
            interpretationElement.textContent = "--";
        }
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
      
      function translateRace(raceValue) {
        if (raceValue === "white") {
          return translateText("form.race.white");
        }
        if (raceValue === "aa") {
          return translateText("form.race.aa");
        }
        if (raceValue === "chinese") {
          return translateText("form.race.chinese");
        }
        if (raceValue === "hispanic") {
          return translateText("form.race.hispanic");
        }
        return "N/A";
      }
    
    


    function collectInputData() {
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const current_age = parseFloat(document.getElementById("age_t0").value);
        const current_CAC = parseFloat(document.getElementById("cac_t0").value);
        const future_age = parseFloat(document.getElementById("age_t1_future").value);
        const patient_name = document.getElementById("patient_name").value;
        const useFramingham = document.getElementById("use_framingham").checked;
        const useAscvd = document.getElementById("use_ascvd").checked;
        const total_chol_raw = useFramingham || useAscvd ? parseFloat(document.getElementById("total_chol").value) : undefined;
        const total_chol_unit = document.getElementById("total_chol_unit")?.value || 'mgdl';
        const hdl_chol_raw = useFramingham || useAscvd ? parseFloat(document.getElementById("hdl_chol").value) : undefined;
        const hdl_chol_unit = document.getElementById("hdl_chol_unit")?.value || 'mgdl';
        
        const total_chol_converted = total_chol_raw !== undefined && !isNaN(total_chol_raw) ? convertToMgDl(total_chol_raw, total_chol_unit) : undefined;
        const hdl_chol_converted = hdl_chol_raw !== undefined && !isNaN(hdl_chol_raw) ? convertToMgDl(hdl_chol_raw, hdl_chol_unit) : undefined;
        const systolic_bp = useFramingham || useAscvd ? parseFloat(document.getElementById("systolic_bp").value) : undefined;
        const smoker = document.querySelector('input[name="smoker"]:checked')?.value === "1";
        const bp_meds = document.querySelector('input[name="bp_meds"]:checked')?.value === "1";
        const lipid_meds = document.querySelector('input[name="lipid_meds"]:checked')?.value === "1";
        const diabetes = document.querySelector('input[name="diabetes"]:checked')?.value === "1";
        const family_heart_attack = document.querySelector('input[name="fh_heartattack"]:checked')?.value === "1";
        const race = document.getElementById("race").value;


       
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
            age_t2_future,
            total_chol_raw,
            total_chol_unit,
            hdl_chol_raw,
            hdl_chol_unit,
            total_chol: total_chol_converted,
            hdl_chol: hdl_chol_converted,
            systolic_bp, 
            smoker,
            bp_meds,
            diabetes,
            family_heart_attack,
            lipid_meds,
            race,
            useFramingham,
            useAscvd
        };
        console.log(inputData);
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

        
    
        // Validate current_CAC
        if (isNaN(data.current_CAC) || data.current_CAC < 0 || data.current_CAC > 1000) {
            return { isValid: false, message: translateText("message.validation.current_cac")}; 
        }
    
        // Validate future_age
        const minFutureAge = data.current_age + 5;
        const maxFutureAge = data.current_age + 10;
        if (isNaN(data.future_age) || data.future_age < minFutureAge || data.future_age > maxFutureAge) {
            return { isValid: false, 
                message:translateText("message.validation.future_age", 
                    { min: minFutureAge, max: maxFutureAge })}; 
        }
    
        // Validate patient_name
        if (typeof data.patient_name !== "string" || !data.patient_name.trim()) {
            return { isValid: false, message: "Patient name is required and must be a valid string." };
        }
    
        // Validate second measurement fields if second_measurement is checked
        if (data.second_measurement) {
            const minAgeT2 = data.current_age + 5;
            if (isNaN(data.age_t2) || data.age_t2 < minAgeT2 || data.age_t2 > 80) {
                return { isValid: false, message: `Age t2 must be between ${minAgeT2} and 80.` };
            }
    
            if (isNaN(data.cac_t2) || data.cac_t2 < 0 || data.cac_t2 > 1000) {
                return { isValid: false, message: "CAC t2 must be between 0 and 1000." };
            }
    
            const minAgeT2Future = data.age_t2 + 5;
            const maxAgeT2Future = data.age_t2 + 10;
            if (isNaN(data.age_t2_future) || data.age_t2_future < minAgeT2Future || data.age_t2_future > maxAgeT2Future) {
                return { isValid: false, message: `Age t2 future must be between ${minAgeT2Future} and ${maxAgeT2Future}.` };
            }
        }
        if (data.useFramingham || data.useAscvd) {
            // Validate Race (ASCVD only)
            if (data.useAscvd && (!data.race || !["white", "aa", "chinese", "hispanic"].includes(data.race))) {
                return { isValid: false, message: translateText("message.validation.race") };
            }
            
            // Validate Total Cholesterol
            const currentTotalCholUnit = data.total_chol_unit;
            const tcRanges = currentTotalCholUnit === 'mmolL' ? CHOLESTEROL_RANGES_MMOLL.total_chol : CHOLESTEROL_RANGES_MGDL.total_chol;
            if (isNaN(data.total_chol_raw) || data.total_chol_raw < tcRanges.min || data.total_chol_raw > tcRanges.max) {
                const unitLabel = translateText(`form.unit.${currentTotalCholUnit}`);
                return {
                    isValid: false,
                    message: translateText("message.validation.total_cholesterol", {
                        min: tcRanges.min.toFixed(currentTotalCholUnit === 'mmolL' ? 1 : 0),
                        max: tcRanges.max.toFixed(currentTotalCholUnit === 'mmolL' ? 1 : 0),
                        unit: unitLabel
                    })
                };
            }

            // Validate HDL Cholesterol
            const currentHdlCholUnit = data.hdl_chol_unit;
            const hdlRanges = currentHdlCholUnit === 'mmolL' ? CHOLESTEROL_RANGES_MMOLL.hdl_chol : CHOLESTEROL_RANGES_MGDL.hdl_chol;
            if (isNaN(data.hdl_chol_raw) || data.hdl_chol_raw < hdlRanges.min || data.hdl_chol_raw > hdlRanges.max) {
                const unitLabel = translateText(`form.unit.${currentHdlCholUnit}`);
                return {
                    isValid: false,
                    message: translateText("message.validation.hdl_cholesterol", {
                        min: hdlRanges.min.toFixed(currentHdlCholUnit === 'mmolL' ? 1 : 0),
                        max: hdlRanges.max.toFixed(currentHdlCholUnit === 'mmolL' ? 1 : 0),
                        unit: unitLabel
                    })
                };
            }
            if (isNaN(data.systolic_bp) || data.systolic_bp < 90 || data.systolic_bp > 200) {
                return { isValid: false, message: translateText("message.validation.systolic_bp") };
            }
            if (typeof data.smoker !== "boolean") { return { isValid: false, message: translateText("message.validation.smoker") }; }
            if (typeof data.bp_meds !== "boolean") { return { isValid: false, message: translateText("message.validation.bp_meds") }; }
            if (typeof data.diabetes !== "boolean") { return { isValid: false, message: translateText("message.validation.diabetes") }; }
            if (typeof data.family_heart_attack !== "boolean") { return { isValid: false, message: translateText("message.validation.family_heart_attack") }; }
            if (typeof data.lipid_meds !== "boolean") { return { isValid: false, message: translateText("message.validation.lipid_meds") }; }
        }      
    
        // If all validations pass
        return { isValid: true };
    }

    function togglePredictionTabs(inputData) {
        const tabs = {
            predictCac: document.querySelector('.tab-btn[data-tab="predict-cac"]'),
            predictAge: document.querySelector('.tab-btn[data-tab="predict-age"]'),
            predictAscvd: document.querySelector('.tab-btn[data-tab="predict-ascvd"]'),
            predictFramingham: document.querySelector('.tab-btn[data-tab="predict-framingham"]'),
            summary: document.querySelector('.tab-btn[data-tab="summary"]'),
        };
    
        tabs.predictCac.disabled = false;
        tabs.predictAge.disabled = false;
        tabs.summary.disabled = false;
    
        if (inputData.useAscvd) {
            tabs.predictAscvd.disabled = false;
        } else {
            tabs.predictAscvd.disabled = true;
        }
    
        if (inputData.useFramingham) {
            tabs.predictFramingham.disabled = false;
        } else {
            tabs.predictFramingham.disabled = true;
        }
    }

    function updateSummaryTab(inputData, cacResults = {}, riskResults = {}) {
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
        
        const ascvdRisk = (riskResults.ascvdRisk !== undefined && riskResults.ascvdRisk !== null && !isNaN(riskResults.ascvdRisk))
            ? `${riskResults.ascvdRisk}%`
            : "N/A";
        
        const framinghamRisk = (riskResults.framinghamRisk !== undefined && riskResults.framinghamRisk !== null && !isNaN(riskResults.framinghamRisk))
            ? `${riskResults.framinghamRisk}%`
            : "N/A";
        
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
        const riskFactorsSection = `
            <div class="section">
                <h2>${translateText("summary.risk_factors")}</h2>
                <div class="row">
                    <p>${translateText("summary.total_cholesterol_label")} <span>${inputData.total_chol_raw !== undefined && inputData.total_chol_raw !== null ? inputData.total_chol_raw.toFixed(inputData.total_chol_unit === 'mmolL' ? 1 : 0) : "N/A"} ${inputData.total_chol_unit ? translateText(`form.unit.${inputData.total_chol_unit}`) : ""}</span></p>
                    <p>${translateText("summary.smoker")} <span>${inputData.smoker ? translateText("form.yes") : translateText("form.no")}</span></p>
                    <p>${translateText("summary.diabetic")} <span>${inputData.diabetes ? translateText("form.yes") : translateText("form.no")}</span></p>
                </div>
                <div class="row">
                    <p>${translateText("summary.hdl_cholesterol_label")} <span>${inputData.hdl_chol_raw !== undefined && inputData.hdl_chol_raw !== null ? inputData.hdl_chol_raw.toFixed(inputData.hdl_chol_unit === 'mmolL' ? 1 : 0) : "N/A"} ${inputData.hdl_chol_unit ? translateText(`form.unit.${inputData.hdl_chol_unit}`) : ""}</span></p>
                    <p>${translateText("summary.on_bp_medication")} <span>${inputData.bp_meds ? translateText("form.yes") : translateText("form.no")}</span></p>
                    <p>${translateText("summary.history_of_heart_attack")} <span>${inputData.family_heart_attack ? translateText("form.yes") : translateText("form.no")}</span></p>
                </div>
                <div class="row">
                    <p>${translateText("summary.systolic_bp")} <span>${inputData.systolic_bp || "N/A"} mmHg</span></p>
                    <p>${translateText("summary.on_lipid_medication")} <span>${inputData.lipid_meds ? translateText("form.yes") : translateText("form.no")}</span></p>
                    <p>${translateText("summary.race")} <span>${translateRace(inputData.race)}</span></p>
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
        
                <!-- Risk Factors Section -->
                ${riskFactorsSection}
        
                <!-- Risk Section -->
                <div class="section">
                    <h2>${translateText("summary.risk")}</h2>
                    <table>
                        <tr>
                            <th>${translateText("summary.cac_progression")}</th>
                            <th>${translateText("summary.age_at_cac_400")}</th>
                            <th>${translateText("summary.ascvd_10_year_risk")}</th>
                            <th>${translateText("summary.framingham_10_year_risk")}</th>
                        </tr>
                        <tr>
                            <td>${cacProgression}</td>
                            <td>${ageAtCAC400}</td>
                            <td>${ascvdRisk}</td>
                            <td>${framinghamRisk}</td>
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

        // Show or hide the box three and four
        document.getElementById("show_risk_calculators").addEventListener("change", (e) => {
        const box3 = document.getElementById("box3");
        const box4 = document.getElementById("box4");
        const checked = e.target.checked;

        // Toggle visibility of boxes 3 and 4
        box3.style.display = checked ? "block" : "none";
        box4.style.display = checked ? "block" : "none";
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
    if (!isNaN(ageT0)) {
        const minFuture = ageT0 + 5;
        const maxForFirstPredictionAndSecondMeasurement = Math.min(ageT0 + 10, 80);

        updateInputRange(ageT1Future, minFuture, maxForFirstPredictionAndSecondMeasurement, "age_t1_range");

        updateInputRange(ageT2Input, minFuture, maxForFirstPredictionAndSecondMeasurement, "age_t2_range");
    }
}

function updateFutureAgeRanges(ageT2Input, ageT2Future) {
    const ageT2 = parseInt(ageT2Input.value);
    if (!isNaN(ageT2)) {
        const minFuture = ageT2 + 5; 
        
        const maxForSecondPrediction = Math.min(ageT2 + 10, 80);

        updateInputRange(ageT2Future, minFuture, maxForSecondPrediction, "age_t2_future_range");
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


function updateCholesterolRangeInstructions() {
    // Total Cholesterol
    const totalCholInput = document.getElementById("total_chol");
    const totalCholUnitSelect = document.getElementById("total_chol_unit");
    const totalCholUnit = totalCholUnitSelect?.value || 'mgdl';

    const tcRanges = totalCholUnit === 'mmolL' ? CHOLESTEROL_RANGES_MMOLL.total_chol : CHOLESTEROL_RANGES_MGDL.total_chol;

    let totalCholInstructionElement = document.getElementById("total_chol_instruction");
    if (!totalCholInstructionElement) {
         console.warn("Instruction element for total_chol not found. Please ensure it has an ID like 'total_chol_instruction' in index.html.");
         // Fallback: Attempt to create it if it doesn't exist, but it's better to add in HTML.
         totalCholInstructionElement = document.createElement('span');
         totalCholInstructionElement.id = 'total_chol_instruction';
         totalCholInput.parentNode.insertBefore(totalCholInstructionElement, totalCholInput.nextSibling);
    }

    const unitLabelTC = translateText(`form.unit.${totalCholUnit}`);
    const formattedMinTC = tcRanges.min.toFixed(totalCholUnit === 'mmolL' ? 1 : 0);
    const formattedMaxTC = tcRanges.max.toFixed(totalCholUnit === 'mmolL' ? 1 : 0);

    // FIX: Replace placeholders in the translated string manually
    let baseTranslationTC = translateText("instruction.total_chol");
    totalCholInstructionElement.innerHTML = baseTranslationTC
        .replace('{min}', formattedMinTC)
        .replace('{max}', formattedMaxTC)
        .replace('{unit}', unitLabelTC);

    // HDL Cholesterol (similar logic)
    const hdlCholInput = document.getElementById("hdl_chol");
    const hdlCholUnitSelect = document.getElementById("hdl_chol_unit");
    const hdlCholUnit = hdlCholUnitSelect?.value || 'mgdl';

    const hdlRanges = hdlCholUnit === 'mmolL' ? CHOLESTEROL_RANGES_MMOLL.hdl_chol : CHOLESTEROL_RANGES_MGDL.hdl_chol;

    let hdlCholInstructionElement = document.getElementById("hdl_chol_instruction");
    if (!hdlCholInstructionElement) {
        console.warn("Instruction element for hdl_chol not found. Please ensure it has an ID like 'hdl_chol_instruction' in index.html.");
        hdlCholInstructionElement = document.createElement('span');
        hdlCholInstructionElement.id = 'hdl_chol_instruction';
        hdlCholInput.parentNode.insertBefore(hdlCholInstructionElement, hdlCholInput.nextSibling);
    }

    const unitLabelHDL = translateText(`form.unit.${hdlCholUnit}`);
    const formattedMinHDL = hdlRanges.min.toFixed(hdlCholUnit === 'mmolL' ? 1 : 0);
    const formattedMaxHDL = hdlRanges.max.toFixed(hdlCholUnit === 'mmolL' ? 1 : 0);

    // FIX: Replace placeholders in the translated string manually
    let baseTranslationHDL = translateText("instruction.hdl_chol");
    hdlCholInstructionElement.innerHTML = baseTranslationHDL
        .replace('{min}', formattedMinHDL)
        .replace('{max}', formattedMaxHDL)
        .replace('{unit}', unitLabelHDL);
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

    function resetForm() {
        const form = document.getElementById("cacForm");
        form.reset();
        hideSections();
        disablePredictionTabs();
    }

    function hideSections() {
        toggleSection("second_measurement_section", false);
        document.getElementById("box3").style.display = "none";
        document.getElementById("box4").style.display = "none";
    }

    function disablePredictionTabs() {
        document.querySelector('.tab-btn[data-tab="predict-cac"]').disabled = true;
        document.querySelector('.tab-btn[data-tab="predict-age"]').disabled = true;
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
        canvas.width = svgElement.width.baseVal.value;
        canvas.height = svgElement.height.baseVal.value;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = filename;
            link.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgString);
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
