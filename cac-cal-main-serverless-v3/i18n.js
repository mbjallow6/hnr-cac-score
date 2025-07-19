// i18n.js
// const defaultLanguage = 'en';
// const availableLocales = ['en', 'de'];
// let pageLanguage = defaultLanguage;
// let pageLanguage = 'en'; // Default language
// let currentTranslations = translations['en'];
const translations = {
  en:{
    "app.title": "CAC Score Prediction",
    "app.disclaimer": "Not for clinical use.",
    "tabs.details": "Enter Details",
    "tabs.predict_cac": "Predict CAC Score",
    "tabs.predict_age": "Predict Age",
    "tabs.predict_ascvd": "Predict ASCVD",
    "tabs.predict_framingham": "Predict Framingham",
    "tabs.summary": "Summary",
    "tabs.about": "About",

    "tooltip.age_t0": "Enter initial age between: 45-80",
    "tooltip.initial_cac": "Enter initial CAC score between: 0-1000",
    "tooltip.age_t1": "Enter age for CAC Score prediction (up to 10 years from initial age)",
    "tooltip.cac_t2": "Enter second CAC score between: 0-1000",
    "tooltip.age_t2": "Enter age for Second CAC score measurement (up to 10 years from initial cac score measurement)",
    "tooltip.age_t2_future": "Enter age for CAC Score prediction (up to 10 years from second measurement)",
  
    "instruction.initial_age": "Enter initial age between: 45-80",
    "instruction.initial_cac": "Enter initial CAC score between: 0-1000",
    "instruction.age_t1": "<span>Enter age for initial prediction: {min}-{max}</span>",
    "instruction.age_t2": "<span>Enter age at second CAC score: {min}-{max}</span>",
    "instruction.cac_t2": "Enter second CAC score between: 0-1000",
    "instruction.age_t2_prediction": "<span>Enter age for second prediction: {min}-{max}</span>",
    "instruction.use_framingham": "Check this if you want to calculate Framingham 10-Year Risk",
    "instruction.use_ascvd": "Check this if you want to calculate ASCVD 10-Year Risk with CAC",
    // "instruction.total_chol": "Enter the patient's total cholesterol (mg/dL)",
    // "instruction.hdl_chol": "Enter the patient's HDL cholesterol (mg/dL)",
    "instruction.total_chol": "<span>Enter a number: {min}–{max} {unit}</span>",
    "instruction.hdl_chol": "<span>Enter a number: {min}–{max} {unit}</span>",
    "instruction.systolic_bp": "Enter the patient's systolic blood pressure (mmHg)",
  
   
    
    "form.initial_measurement": "Initial Assessment",
    "form.gender": "Gender:",
    "form.male": "Male",
    "form.female": "Female",
    "form.patient_id": "Patient ID:",
    "form.initial_age": "Age at Initial Assessment [Years]:",
    "form.initial_cac": "Age Initial Assessment [Agatston units]:",
    "form.age_t1": "Age at Initial Prediction [Years]:",
    "form.second_measurement_available": "There is a second assessment",
    
    "form.second_measurement": "Second Assessment",
    "form.age_t2": "Age at Second Assessment [Years]:",
    "form.cac_t2": "CAC at Second Assessment [Agatston units]:",
    "form.age_t2_future": "Age at Second Prediction [Years]:",
    
    "form.use_risk_calculators": "Use other risk calculators:",
    "form.risk_calculation": "Framingham/ASCVD Risk Calculation",
    "form.use_framingham": "Use Framingham 10-Year Risk?",
    "form.use_ascvd": "Use ASCVD 10-Year Risk with CAC?",
    "form.race_ethnicity": "Race/Ethnicity:",
    "form.race.white": "Caucasian",
    "form.race.aa": "African American",
    "form.race.chinese": "Chinese American",
    "form.race.hispanic": "Hispanic",
    // "form.total_cholesterol": "Total Cholesterol (130-320):",
    "form.total_cholesterol_label": "Total Cholesterol:",
    // "form.hdl_cholesterol": "HDL Cholesterol (20-100):",
    "form.hdl_cholesterol_label": "HDL Cholesterol:",   
    "form.systolic_bp": "Systolic BP (90-200):",
    "form.unit.mgdl": "mg/dL",
    "form.unit.mmolL": "mmol/L",


    
    "form.medication_history": "Medication History & Other Risk Factors",
    "form.bp_meds": "On BP meds?",
    "form.yes": "Yes",
    "form.no": "No",
    "form.lipid_meds": "On Lipid Medications?",
    "form.diabetes": "Diabetes:",
    "form.smoker": "Smoker?",
    "form.family_heartattack": "Family History of Heart Attack:",
    
    "form.calculate_button": "Calculate",
    "form.reset_button": "Reset Form",
    
    "cac_chart.title_male": "CAC Score Prediction for Male",
    "cac_chart.title_female": "CAC Score Prediction for Female",
    "cac_chart.axis_age": "Age (Years)",
    "cac_chart.axis_cac": "CAC (Agatston units)",
    "cac_chart.legend_initial_cac": "Initial CAC",
    "cac_chart.legend_predicted_cac": "Initial Prediction CAC",
    "cac_chart.legend_observed_cac": "Observed CAC",
    "cac_chart.legend_second_prediction_cac": "Second Prediction CAC",
    "cac_chart.legend_progression_cac": "Initial Progression CAC",
    "cac_chart.legend_second_progression_cac": "Second Progression CAC",
    
    "age_chart.title_male": "Predicted Age for CAC Levels in Male",
    "age_chart.title_female": "Predicted Age for CAC Levels in Female",
    "age_chart.axis_percentile": "Percentile",
    "age_chart.axis_age_at_cac": "Age at Given CAC",
    "age_chart.out_of_domain": "Predicted age is out of domain:",
    
    "framingham_chart.title": "Framingham 10-Year Risk Prediction",
    "framingham_chart.axis_age": "Age (Years)",
    "framingham_chart.axis_risk": "Risk (%)",
    "framingham_chart.legend_average_risk": "Average Risk",
    "framingham_chart.legend_low_risk": "Low (Ideal) Risk",
    "framingham_chart.legend_your_risk": "Your Risk",
    "framingham_chart.legend_you": "You",
    
    "summary.title": "Patient CAC Score Risk Report",
    "summary.initial_measurement": "Initial Measurement",
    "summary.patient_id": "Patient ID:",
    "summary.gender": "Gender:",
    "summary.initial_age": "Initial Age (yr):",
    "summary.initial_cac": "Initial CAC Score (Agatston):",
    "summary.followup_measurement": "Patient Follow-Up Measurement",
    "summary.age_at_followup": "Age at Follow-up (yr):",
    "summary.cac_score_at_followup": "CAC Score at Follow-up (Agatston):",
    "summary.cac_score_prediction": "CAC Score Prediction",
    "summary.age_at_initial_prediction": "Age at Initial Prediction (yr):",
    "summary.cac_score": "CAC Score (Agatston):",
    "summary.age_at_followup_prediction": "Age at Follow-up Prediction (yr):",
    "summary.risk_factors": "Risk Factors",
    // "summary.total_cholesterol": "Total Cholesterol (mg/dL):",
    "summary.total_cholesterol_label": "Total Cholesterol:",
    "summary.smoker": "Smoker:",
    "summary.diabetic": "Diabetic:",
    // "summary.hdl_cholesterol": "HDL Cholesterol (mg/dL):",
    "summary.hdl_cholesterol_label": "HDL Cholesterol:",
    "summary.on_bp_medication": "On BP Medication:",
    "summary.history_of_heart_attack": "History of Heart Attack:",
    "summary.systolic_bp": "Systolic BP (mmHg):",
    "summary.on_lipid_medication": "On Lipid Medication:",
    "summary.race": "Race:",
    "summary.risk": "Risk",
    "summary.cac_progression": "CAC Progression",
    "summary.age_at_cac_400": "Age at CAC > 400",
    "summary.ascvd_10_year_risk": "ASCVD 10 Year Risk",
    "summary.framingham_10_year_risk": "Framingham 10 Year Risk",
    "summary.implication": "Implication",
    "summary.recommendation": "Recommendation",
    "summary.no_implications": "No implications available.",
    "summary.high_risk_implication": "The patient is at high risk for cardiovascular events due to a CAC score of 400 or greater.",
    "summary.rapid_implication": "The patient’s CAC progression is faster than expected, indicating increased cardiovascular risk.",
    "summary.expected_implication": "The patient’s CAC progression is within the expected range, aligning with typical risk stratification.",
    "summary.slow_implication": "The patient’s CAC progression is slower than expected. Predicted CAC ≥ 400 at age",
    "summary.no_recommendations": "No recommendations available.",
    "summary.very_low_risk_recommendation": "Very low cardiovascular risk. Further scans not required for a long time.",
    "summary.followup_recommendation_5yrs": "Consider a follow-up CAC scan in 5 years.",
    "summary.followup_and_lifestyle_recommendation": "Follow-up CAC scan within 5 years and lifestyle modifications recommended.",
    "summary.high_risk_recommendation": "High cardiovascular risk. Lifestyle changes and medical therapy strongly recommended.",
    "summary.lifestyle_recommendation": "Prioritize smoking cessation, regular exercise, a heart-healthy diet, and adherence to prescribed medications.",
   
  
  
    
    "ascvd_risk.title": "ASCVD 10-Year Risk Prediction",
    "ascvd_risk.risk_of_chd_event": "10-Year Risk of CHD Event (%)",
    "ascvd_risk.coronary_age": "Coronary Age",
    "ascvd_risk.difference_from_chronologic_age": "Difference from Chronologic Age",
    
    "message.validation.gender": "Gender must be 'male' or 'female'.",
    "message.validation.current_age": "Current age must be between 45 and 80.",
    "message.validation.current_cac": "Current CAC must be between 0 and 1000.",
    "message.validation.future_age": "Future age must be between {min} and {max}.",
    "message.validation.patient_name": "Patient name is required and must be a valid string.",
    "message.validation.age_t2": "Age t2 must be between {min} and 80.",
    "message.validation.cac_t2": "CAC t2 must be between 0 and 1000.",
    "message.validation.age_t2_future": "Age t2 future must be between {min} and {max}.",
    // "message.validation.total_cholesterol": "Total Cholesterol must be between 130 and 320.",
    "message.validation.total_cholesterol": "Total Cholesterol must be between {min} and {max} {unit}.",
    // "message.validation.hdl_cholesterol": "HDL Cholesterol must be between 20 and 100.",
    "message.validation.hdl_cholesterol": "HDL Cholesterol must be between {min} and {max} {unit}.",
    "message.validation.systolic_bp": "Systolic BP must be between 90 and 200.",
    "message.validation.smoker": "Smoker must be true or false.",
    "message.validation.bp_meds": "BP Medications must be true or false.",
    "message.validation.race": "Race must be one of the following: white, aa, chinese, hispanic.",
    "message.validation.diabetes": "Diabetes must be true or false.",
    "message.validation.family_heart_attack": "Family History of Heart Attack must be true or false.",
    "message.validation.lipid_meds": "Lipid Medications must be true or false.",


    "about.developer_info": "This web application was developed by Momodou B. Jallow under the supervision of Prof. Dr.-Ing. Christoph M. Friedrich,<br>Fachhochschule Dortmund | University of Applied Sciences and Arts,<br>Fachbereich Informatik | Department of Computer Science.",
    "about.about_title": "About CAC Score Calculator",
    "about.citation": "CIRCULATION AHA/2016/027034",
    "about.study_title": "Value of Progression of Coronary Artery Calcification for Risk Prediction of Coronary and Cardiovascular Events - Result of the Heinz Nixdorf Recall (HNR) study",
    "about.authors": "Nils Lehmann, Raimund Erbel, Amir A. Mahabadi, Michael Rauwolf, Stefan Möhlenkamp, Susanne Moebus, Hagen Kälsch, Thomas Budde, Axel Schmermund, Andreas Stang, Dagmar Führer, Christian Weimar, Ulla Roggenbuck, Nico Dragano, and Karl-Heinz Jöckel <br><i>on behalf of the Heinz Nixdorf Recall Study Investigators</i><br><span>CIRCULATION AHA/2016/027034</span>",
    "about.description1": "This CAC calculator application may help clinicians interpret their patients' CAC scores and determine those that will in the future reach CAC thresholds associated with unfavourable risk, such as a CAC score of 400.",
    "about.description2": "It therefore may help patient communication, when the physician and the patient can evaluate together the patient's individual course of CAC-progression, which may improve patient adherence to risk factor modifications via lifestyle changes.",
    "about.description3": "It may also be used to plan the time schedule for a second CAC measurement, which can disclose whether patient adherence to risk factor modification and medication have slowed down CAC progression, or whether progression of coronary artery calcification is faster than expected from the natural course.",
    "about.description4": "It must be noted that the tool so far is based on data from a Caucasian, urban population in Germany. Other populations may follow different percentiles and therefore the application should be used with adequate caution.",
    "about.description5": "The present prediction tool is based on an underlying exponential relation between CAC and age. Accuracy of predictions decreases with increasing time between measurement and prediction, and absolute deviations between predicted and measured CAC tend to increase with predicted CAC.",
    "about.disclaimer": "Predictions made using this application cannot replace clinical judgment based on patient examination and clinical guidelines.",
    "about.freeware": "This application is freeware. <br>© 2017 Rauwolf 1, Lehmann 2, Mahabadi 3, Erbel 2 <br>1 Central IT, 2 Institute for Medical Informatics, Biometry and Epidemiology <br>3 West-German Heart Center Essen <br>University Duisburg-Essen, Germany",
  
    
   
    "cac_chart.Interactive_CAC_Score_prediction": "Interactive CAC Score prediction",
    
    "interactive.age_t0": "Age t0 [Years]:",
    "interactive.initial_cac": "Initial CAC Score:",
    "interactive.gender": "Gender:",
    "interactive.second_measurement": "Second Measurement",
    "interactive.age_t2": "Age t2 [Years]:",
    "interactive.second_cac": "Second CAC Score:",
    
    "export.cac_png": "Export CAC Score Chart as PNG",
    "export.cac_svg": "Export CAC Score Chart as SVG",
  
    
    "cac_chart.legend_percentile": "Perc.",
    "cac_chart.label_initial_prediction": "Initial Prediction",
    "cac_chart.label_second_prediction": "Second Prediction",
    "cac_chart.tooltip_age": "Age",
    "cac_chart.tooltip_cac": "CAC",
    "cac_chart.tooltip_predicted_cac": "Predicted CAC",
    "cac_chart.tooltip_observed_cac": "Observed CAC",
  
    
    "age_chart.legend_cac": "CAC =",
    "age_chart.legend_predicted_age_at_cac": "Predicted Age at CAC=400",
    "age_chart.tooltip_percentile": "Percentile",
    "age_chart.tooltip_age": "Age",
    "age_chart.outside_range": "is outside",
    "age_chart.tooltip_predicted_age": "Predicted Age at CAC=400",
    "age_chart.years": "years",
  
    "export.age_png": "Export Age Prediction Chart as PNG",
    "export.age_svg": "Export Age Prediction Chart as SVG",
  
  
    "framingham_chart.risk_interpretation": "Risk Interpretation",
    "message.framingham.Unable_to_interpret_risk": "Unable to interpret risk.",
    "message.framingham.Low_Risk": "Low Risk",
    "message.framingham.Moderate_Risk": "Moderate Risk",
    "message.framingham.High_Risk": "High Risk"
  },
  de:{"app.title": "CAC-Score-Vorhersage",
    "app.disclaimer": "Nicht für den klinischen Gebrauch.",
    "tabs.details": "Details eingeben",
    "tabs.predict_cac": "CAC-Score vorhersagen",
    "tabs.predict_age": "Alter vorhersagen",
    "tabs.predict_ascvd": "ASCVD vorhersagen",
    "tabs.predict_framingham": "Framingham vorhersagen",
    "tabs.summary": "Zusammenfassung",
    "tabs.about": "Über",


    "tooltip.age_t0": "Geben Sie das Anfangsalter ein zwischen: 45-80",
    "tooltip.initial_cac": "Geben Sie den anfänglichen CAC-Score ein zwischen: 0-1000",
    "tooltip.age_t1": "Geben Sie das Alter für die CAC-Score-Vorhersage ein (bis zu 10 Jahre ab dem Anfangsalter)",
    "tooltip.cac_t2": "Geben Sie den zweiten CAC-Score ein zwischen: 0-1000",
    "tooltip.age_t2": "Geben Sie das Alter für die zweite CAC-Score-Messung ein (bis zu 10 Jahre ab der ersten CAC-Score-Messung)",
    "tooltip.age_t2_future": "Geben Sie das Alter für die CAC-Score-Vorhersage ein (bis zu 10 Jahre ab der zweiten Messung)",
  
    "placeholder.age_range": "Geben Sie eine Zahl ein: {min}-{max}",
    "placeholder.age_0_1000": "Geben Sie eine Zahl ein: 0-1000",
    "placeholder.min_max": "Geben Sie eine Zahl ein: Min - Max",
  
    "instruction.initial_age": "Geben Sie das Anfangsalter ein zwischen: 45-80",
    "instruction.initial_cac": "Geben Sie den anfänglichen CAC-Score ein zwischen: 0-1000",
    "instruction.age_t1": "<span>Geben Sie das Alter für die erste Vorhersage ein: {min}-{max}</span>", 
    "instruction.age_t2": "<span>Geben Sie das Alter für den zweiten CAC-Score ein: {min}-{max}</span>",
    "instruction.cac_t2": "Geben Sie den zweiten CAC-Score ein zwischen: 0-1000",
    "instruction.age_t2_prediction": "<span>Geben Sie das Alter für die zweite Vorhersage ein: {min}-{max}</span>",
    "instruction.use_framingham": "Kreuzen Sie dies an, wenn Sie das Framingham 10-Jahres-Risiko berechnen möchten",
    "instruction.use_ascvd": "Kreuzen Sie dies an, wenn Sie das ASCVD 10-Jahres-Risiko mit CAC berechnen möchten",
    // "instruction.total_chol": "Geben Sie das Gesamtcholesterin des Patienten ein (mg/dL)",
    // "instruction.hdl_chol": "Geben Sie das HDL-Cholesterin des Patienten ein (mg/dL)",
    "instruction.total_chol": "<span>Geben Sie eine Zahl ein: {min}–{max} {unit}</span>",
    "instruction.hdl_chol": "<span>Geben Sie eine Zahl ein: {min}–{max} {unit}</span>",
    "instruction.systolic_bp": "Geben Sie den systolischen Blutdruck des Patienten ein (mmHg)",
  
  
   
    
    "form.initial_measurement": "Erste Beurteilung",
    "form.gender": "Geschlecht:",
    "form.male": "Männlich",
    "form.female": "Weiblich",
    "form.patient_id": "ID:",
    "form.initial_age": "Alter bei Erstbeurteilung [Jahre]:",
    "form.initial_cac": "CAC bei Erstbeurteilung [Agatston-Einheiten]:",
    "form.age_t1": "Alter bei Erstvorhersage [Jahre]:",
    "form.second_measurement_available": "Es liegt eine zweite Messung vor",
    
    "form.second_measurement": "Zweite Beurteilung",
    "form.age_t2": "Alter bei Zweitbeurteilung [Jahre]:",
    "form.cac_t2": "CAC bei Zweitbeurteilung [Agatston-Einheiten]:",
    "form.age_t2_future": "Alter bei Zweitvorhersage [Jahre]:",
    
    "form.use_risk_calculators": "Andere Risikorechner verwenden:",
    "form.risk_calculation": "Framingham/ASCVD-Risikoberechnung",
    "form.use_framingham": "Framingham 10-Jahres-Risiko verwenden?",
    "form.use_ascvd": "ASCVD 10-Jahres-Risiko mit CAC verwenden?",
    "form.race_ethnicity": "Ethnizität:",
    "form.race.white": "Kaukasisch",
    "form.race.aa": "Afroamerikaner",
    "form.race.chinese": "Chinesisch-Amerikaner",
    "form.race.hispanic": "Hispanisch",
    // "form.total_cholesterol": "Gesamtcholesterin (130-320):",
    "form.total_cholesterol_label": "Gesamtcholesterin:",
    // "form.hdl_cholesterol": "HDL-Cholesterin (20-100):",
    "form.hdl_cholesterol_label": "HDL-Cholesterin:",
    "form.systolic_bp": "Systolischer Blutdruck (90-200):",
    "form.unit.mgdl": "mg/dL",
    "form.unit.mmolL": "mmol/L",


    
    "form.medication_history": "Medikationsgeschichte & andere Risikofaktoren",
    "form.bp_meds": "Blutdrucksenker?",
    "form.yes": "Ja",
    "form.no": "Nein",
    "form.lipid_meds": "Lipidsenker?",
    "form.diabetes": "Diabetes:",
    "form.smoker": "Raucher?",
    "form.family_heartattack": "Familiengeschichte von Herzinfarkt:",
    
    "form.calculate_button": "Berechnen",
    "form.reset_button": "Formular zurücksetzen",
    
    "cac_chart.title_male": "CAC Score Vorhersage für Männer",
    "cac_chart.title_female": "CAC Score Vorhersage für Frauen",
    "cac_chart.axis_age": "Alter (Jahre)",
    "cac_chart.axis_cac": "CAC (Agatston-Einheiten)",
    "cac_chart.legend_initial_cac": "Anfänglicher CAC",
    "cac_chart.legend_predicted_cac": "Erste CAC-Prädiktion",
    "cac_chart.legend_observed_cac": "Beobachteter CAC",
    "cac_chart.legend_second_prediction_cac": "Zweite CAC-Prädiktion",
    "cac_chart.legend_progression_cac": "Erste CAC-Progression",
    "cac_chart.legend_second_progression_cac": "Zweite CAC-Progression",
    
    "age_chart.title_male": "Vorhergesagtes Alter für CAC Werte bei Männern",
    "age_chart.title_female": "Vorhergesagtes Alter für CAC Werte bei Frauen",
    "age_chart.axis_percentile": "Perzentil",
    "age_chart.axis_age_at_cac": "Alter bei gegebenem CAC",
    "age_chart.out_of_domain": "Vorhergesagtes Alter liegt außerhalb des Bereichs:",
    
    "framingham_chart.title": "Framingham 10 Jahres Risikovorhersage",
    "framingham_chart.axis_age": "Alter (Jahre)",
    "framingham_chart.axis_risk": "Risiko (%)",
    "framingham_chart.legend_average_risk": "Durchschnittliches Risiko",
    "framingham_chart.legend_low_risk": "Niedriges (ideales) Risiko",
    "framingham_chart.legend_your_risk": "Ihr Risiko",
    "framingham_chart.legend_you": "Sie",
    
    "summary.title": "Patienten CAC Score Risikobericht",
    "summary.initial_measurement": "Erste Messung",
    "summary.patient_id": "ID:",
    "summary.gender": "Geschlecht:",
    "summary.initial_age": "Anfangsalter (Jahre):",
    "summary.initial_cac": "Anfänglicher CAC-Score (Agatston):",
    "summary.followup_measurement": "Patienten-Follow-up-Messung",
    "summary.age_at_followup": "Alter beim Follow-up (Jahre):",
    "summary.cac_score_at_followup": "CAC-Score beim Follow-up (Agatston):",
    "summary.cac_score_prediction": "CAC-Score-Vorhersage",
    "summary.age_at_initial_prediction": "Alter bei Erstvorhersage (Jahre):",
    "summary.cac_score": "CAC-Score (Agatston):",
    "summary.age_at_followup_prediction": "Alter bei Follow-up-Vorhersage (Jahre):",
    "summary.risk_factors": "Risikofaktoren",
    // "summary.total_cholesterol": "Gesamtcholesterin (mg/dL):",
    "summary.total_cholesterol_label": "Gesamtcholesterin:",
    "summary.smoker": "Raucher:",
    "summary.diabetic": "Diabetiker:",
    // "summary.hdl_cholesterol": "HDL-Cholesterin (mg/dL):",
    "summary.hdl_cholesterol_label": "HDL-Cholesterin:",
    "summary.on_bp_medication": "Blutdrucksenker:",
    "summary.history_of_heart_attack": "Herzinfarkt in der Familie:",
    "summary.systolic_bp": "Systolischer Blutdruck (mmHg):",
    "summary.on_lipid_medication": "Lipidsenker:",
    "summary.race": "Ethnizität:",
    "summary.risk": "Risiko",
    "summary.cac_progression": "CAC-Progression",
    "summary.age_at_cac_400": "Alter bei CAC > 400",
    "summary.ascvd_10_year_risk": "ASCVD 10-Jahres-Risiko",
    "summary.framingham_10_year_risk": "Framingham 10-Jahres-Risiko",
    "summary.implication": "Implikation",
    "summary.recommendation": "Empfehlung",
    "summary.no_implications": "Keine Implikationen verfügbar.",
    "summary.high_risk_implication": "Der Patient hat ein hohes Risiko für kardiale Ereignisse aufgrund eines CAC-Scores von 400 oder mehr.",
    "summary.rapid_implication": "Die CAC-Progression des Patienten ist schneller als erwartet, was auf ein erhöhtes kardiovaskuläres Risiko hinweist.",
    "summary.expected_implication": "Die CAC-Progression des Patienten liegt im erwarteten Bereich und entspricht der typischen Risikostratifizierung.",
    "summary.slow_implication": "Die CAC-Progression des Patienten ist langsamer als erwartet. Vorhergesagter CAC ≥ 400 im Alter von",
    "summary.no_recommendations": "Keine Empfehlungen verfügbar.",
    "summary.very_low_risk_recommendation": "Sehr geringes kardiales Risiko. Weitere Scans sind lange nicht erforderlich.",
    "summary.followup_recommendation_5yrs": "Erwägen Sie einen Follow-up-CAC-Scan in 5 Jahren.",
    "summary.followup_and_lifestyle_recommendation": "Follow-up-CAC-Scan innerhalb von 5 Jahren und Lifestyle-Modifikationen empfohlen.",
    "summary.high_risk_recommendation": "Hohes kardiales Risiko. Lebensstiländerungen und eine medizinische Therapie werden dringend empfohlen.",
    "summary.lifestyle_recommendation": "Priorisieren Sie den Rauchstopp, regelmäßige Bewegung, eine herzgesunde Ernährung und die Einhaltung der verschriebenen Medikamente.",
  
  
  
  
  
    
    "ascvd_risk.title": "ASCVD 10-Jahres-Risikovorhersage",
    "ascvd_risk.risk_of_chd_event": "10-Jahres-Risiko für ein KHK-Ereignis (%)",
    "ascvd_risk.coronary_age": "Koronaralter",
    "ascvd_risk.difference_from_chronologic_age": "Differenz zum chronologischen Alter",
    
    "message.validation.gender": "Das Geschlecht muss 'männlich' oder 'weiblich' sein.",
    "message.validation.current_age": "Das aktuelle Alter muss zwischen 45 und 80 liegen.",
    "message.validation.current_cac": "Der aktuelle CAC muss zwischen 0 und 1000 liegen.",
    "message.validation.future_age": "Das zukünftige Alter muss zwischen {min} und {max} liegen.",
    "message.validation.patient_name": "Der Patientenname ist erforderlich und muss eine gültige Zeichenkette sein.",
    "message.validation.age_t2": "Alter t2 muss zwischen {min} und 80 liegen.",
    "message.validation.cac_t2": "CAC t2 muss zwischen 0 und 1000 liegen.",
    "message.validation.age_t2_future": "Alter t2 in der Zukunft muss zwischen {min} und {max} liegen.",
    // "message.validation.total_cholesterol": "Das Gesamtcholesterin muss zwischen 130 und 320 liegen.",
    "message.validation.total_cholesterol": "Gesamtcholesterin muss zwischen {min} und {max} {unit} liegen.",
    // "message.validation.hdl_cholesterol": "Das HDL-Cholesterin muss zwischen 20 und 100 liegen.",
    "message.validation.hdl_cholesterol": "HDL-Cholesterin muss zwischen {min} und {max} {unit} liegen.",
    "message.validation.systolic_bp": "Der systolische Blutdruck muss zwischen 90 und 200 liegen.",
    "message.validation.smoker": "Raucher muss wahr oder falsch sein.",
    "message.validation.bp_meds": "Blutdruckmedikamente müssen wahr oder falsch sein.",
    "message.validation.race": "Die Ethnizität muss eine der folgenden sein: weiß, aa, chinesisch, hispanisch.",
    "message.validation.diabetes": "Diabetes muss wahr oder falsch sein.",
    "message.validation.family_heart_attack": "Familiengeschichte mit Herzinfarkt muss wahr oder falsch sein.",
    "message.validation.lipid_meds": "Lipidsenker müssen wahr oder falsch sein.",

    "about.developer_info": "Diese Webanwendung wurde von Momodou B. Jallow unter der Aufsicht von Prof. Dr.-Ing. Christoph M. Friedrich,<br>Fachhochschule Dortmund | University of Applied Sciences and Arts,<br>Fachbereich Informatik | Department of Computer Science entwickelt.",
    "about.about_title": "Über den CAC-Score-Rechner",
    "about.citation": "CIRCULATION AHA/2016/027034",
    "about.study_title": "Wert der Progression der Koronararterienverkalkung für die Risikoprognose von koronaren und kardiovaskulären Ereignissen - Ergebnis der Heinz Nixdorf Recall Studie",
    "about.authors": "Nils Lehmann, Raimund Erbel, Amir A. Mahabadi, Michael Rauwolf, Stefan Möhlenkamp, Susanne Moebus, Hagen Kälsch, Thomas Budde, Axel Schmermund, Andreas Stang, Dagmar Führer, Christian Weimar, Ulla Roggenbuck, Nico Dragano, und Karl-Heinz Jöckel <br><i>im Auftrag der Heinz Nixdorf Recall Studieninstitute</i><br><span>CIRCULATION AHA/2016/027034</span>",
    "about.description1": "Dieser CAC-Rechner kann Kliniker dabei unterstützen, die CAC-Scores ihrer Patienten zu interpretieren und zu ermitteln, welche Patienten in Zukunft CAC-Schwellen erreichen, die mit einem ungünstigen Risiko assoziiert sind, wie z. B. ein CAC-Score von 400.",
    "about.description2": "Er kann auch die Kommunikation mit den Patienten fördern, indem Arzt und Patient gemeinsam den individuellen Verlauf der CAC-Progression bewerten und so die Adhärenz an Risikofaktor-Modifikationen, etwa durch Lifestyle-Änderungen, verbessern.",
    "about.description3": "Zudem kann er zur Planung des Zeitplans für eine zweite CAC-Messung herangezogen werden, um zu prüfen, ob die Adhärenz an Risikofaktor-Modifikationen und Medikation zu einer verlangsamten CAC-Progression führt oder ob die Progression schneller als erwartet verläuft.",
    "about.description4": "Es ist zu beachten, dass dieses Tool bislang auf Daten einer kaukasischen, urbanen Population in Deutschland basiert. Andere Populationen können andere Perzentile aufweisen, weshalb das Tool mit entsprechender Vorsicht eingesetzt werden sollte.",
    "about.description5": "Das vorliegende Vorhersagetool basiert auf einer zugrundeliegenden exponentiellen Beziehung zwischen CAC und Alter. Es ist daher zu erwarten, dass die Genauigkeit der Vorhersagen mit zunehmender Zeit zwischen Messung und Vorhersage abnimmt und die absoluten Abweichungen zwischen dem vorhergesagten und dem bei einer zweiten CT-Messung ermittelten CAC tendenziell mit dem vorhergesagten CAC zunehmen.",
    "about.disclaimer": "Vorhersagen, die mit dieser Anwendung gemacht werden, ersetzen nicht die klinische Beurteilung anhand einer Patientenuntersuchung und unter Berücksichtigung klinischer Leitlinien.",
    "about.freeware": "Diese Anwendung ist Freeware. <br>© 2017 Rauwolf 1, Lehmann 2, Mahabadi 3, Erbel 2 <br>1 Central IT, 2 Institut für Medizinische Informatik, Biometrie und Epidemiologie <br>3 West-German Heart Center Essen <br>Universität Duisburg-Essen",
  
    
   
    "interactive.age_t0": "Anfangsalter t0 [Jahre]:",
    "interactive.initial_cac": "Anfänglicher CAC-Score:",
    "interactive.gender": "Geschlecht:",
    "interactive.second_measurement": "Zweite Messung",
    "interactive.age_t2": "Alter t2 [Jahre]:",
    "interactive.second_cac": "Zweiter CAC-Score:",
    
    "export.cac_png": "Exportiere CAC-Score-Diagramm als PNG",
    "export.cac_svg": "Exportiere CAC-Score-Diagramm als SVG",
  
  
    "cac_chart.legend_percentile": "Perz.",
    "cac_chart.label_initial_prediction": "Erste Vorhersage",
    "cac_chart.label_second_prediction": "Zweite Vorhersage",
    "cac_chart.tooltip_age": "Alter",
    "cac_chart.tooltip_cac": "CAC",
    "cac_chart.tooltip_predicted_cac": "Vorhergesagter CAC",
    "cac_chart.tooltip_observed_cac": "Beobachteter CAC",
  
    "age_chart.legend_cac": "CAC =",
    "age_chart.legend_predicted_age_at_cac": "Vorhergesagtes Alter bei CAC=400",
    "age_chart.tooltip_percentile": "Perzentil",
    "age_chart.tooltip_age": "Alter",
    "age_chart.outside_range": "liegt außerhalb",
    "age_chart.tooltip_predicted_age": "Vorhergesagtes Alter bei CAC=400",
    "age_chart.years": "Jahre",
  
    "export.age_png": "Exportiere Altersvorhersage-Diagramm als PNG",
    "export.age_svg": "Exportiere Altersvorhersage-Diagramm als SVG",
  
  
    "framingham_chart.risk_interpretation": "Risikointerpretation",
    "message.framingham.Low_Risk": "Geringes Risiko",
    "message.framingham.Moderate_Risk": "Mittleres Risiko",
    "message.framingham.High_Risk": "Hohes Risiko",
    "message.framingham.Unable_to_interpret_risk": "Risiko kann nicht interpretiert werden."
  }
    
}; // Global variable to store translations

const defaultLanguage = 'de';
const availableLocales = ['en', 'de'];
let pageLanguage = defaultLanguage;
let currentTranslations = translations[defaultLanguage];

/**
 * Returns the translation for a given key from the current language.
 * If the key is missing, it falls back to the key itself.
 */
function translateText(key) {
  return currentTranslations[key] || key;
}


/**
 * Translates all page content using elements with data-i18n (for text)
 * and data-i18n-html (for innerHTML). Also sets the html element's lang attribute.
 */
async function translatePage(lang) {
  if (!availableLocales.includes(lang)) {
    lang = defaultLanguage;
  }
  pageLanguage = lang;
  currentTranslations = translations[lang];

  // Update text content for elements marked with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = currentTranslations[key];
    if (translation) {
      element.textContent = translation;
    } else {
      console.warn(`Missing translation for key: ${key}`);
      element.textContent = key;
    }
  });

  // Update inner HTML for elements marked with data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const key = element.getAttribute('data-i18n-html');
    const translation = currentTranslations[key];
    if (translation) {
      element.innerHTML = translation;
    } else {
      console.warn(`Missing translation for key: ${key}`);
      element.innerHTML = key;
    }
  });

  // Update data-tooltip attribute for elements marked with data-i18n-tooltip
  document.querySelectorAll('[data-i18n-tooltip]').forEach(element => {
    const key = element.getAttribute('data-i18n-tooltip');
    const translation = currentTranslations[key];
    if (translation) {
      element.setAttribute('data-tooltip', translation); 
    } else {
      console.warn(`Missing translation for tooltip key: ${key}`);
      element.setAttribute('data-tooltip', key); 
    }
  });

  // Update the language attribute of the html element
  document.documentElement.lang = pageLanguage;
}