// i18n.js
// const defaultLanguage = 'en';
// const availableLocales = ['en', 'de'];
// let pageLanguage = defaultLanguage;
// let pageLanguage = 'en'; // Default language
// let currentTranslations = translations['en'];
const translations = {
  en:{
    "app.title": "The CAC Score Calculator",
    "app.disclaimer": "Not for clinical use.",
    "tabs.details": "Enter Details",
    "tabs.predict_cac": "CAC-Score Calculation",
    "tabs.predict_age": "Age at Critical CAC-Score",
    "tabs.summary": "CAC Score Report",
    "tabs.about": "About",

    "language-selector.language-select": "Select Language",

    "tooltip.age_t0": "Enter initial age between: [45-80]",
    "tooltip.initial_cac": "Enter initial CAC score between: 0-1000",
    "tooltip.age_t1": "Enter age for CAC Score prediction (up to 10 years from initial age)",
    "tooltip.cac_t2": "Enter second CAC score between: 0-1000",
    "tooltip.age_t2": "Enter age for Second CAC score measurement (up to 10 years from initial cac score measurement)",
    "tooltip.age_t2_future": "Enter age for CAC Score prediction (up to 10 years from second measurement)",
  
    "instruction.initial_age": "Enter initial age between: [45-80]",
    "instruction.initial_cac": "Enter initial CAC score between: [0-1000]",
    "instruction.age_t1": "<span>Enter age for initial prediction: [{min}-{max}]</span>",
    "instruction.age_t2": "<span>Enter age at second cardiac CT: [{min}-{max}]</span>",
    "instruction.cac_t2": "Enter second CAC score between: [0-1000]",
    "instruction.age_t2_prediction": "<span>Enter age for second prediction: [{min}-{max}]</span>",
    "instruction.total_chol": "<span>Enter a number: [{min}–{max} {unit}]</span>",
    "instruction.hdl_chol": "<span>Enter a number: [{min}–{max} {unit}]</span>",
  
   
    
    "form.initial_measurement": "Initial Assessment",
    "form.gender": "Gender:",
    "form.male": "Male",
    "form.female": "Female",
    "form.patient_id": "Patient ID:",
    "form.initial_age": "Age at initial cardiac CT [Years]:",
    "form.initial_cac": "CAC at initial cardiac CT [Agatston units]:",
    "form.age_t1": "Desired prediction age [Years]:",
    "form.second_measurement_available": "A second cardiac CT is available",
    
    "form.second_measurement": "Second Assessment",
    "form.age_t2": "Age at second cardiac CT [Years]:",
    "form.cac_t2": "CAC at second cardiac CT [Agatston units]:",
    "form.age_t2_future": "Desired prediction age [Years]:",
    
    


    
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
    
    "summary.cac_progression": "CAC Progression",
    "summary.age_at_cac_400": "Age at CAC > 400",
    
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
   

    
    "message.validation.gender": "Gender must be 'male' or 'female'.",
    "message.validation.current_age": "Current age must be between 45 and 80.",
    "message.validation.current_cac": "Current CAC must be between 0 and 1000.",
    "message.validation.future_age": "Future age must be between {min} and {max}.",
    "message.validation.patient_name": "Patient name is required and must be a valid string.",
    "message.validation.age_t2": "Age t2 must be between {min} and 80.",
    "message.validation.cac_t2": "CAC t2 must be between 0 and 1000.",
    "message.validation.age_t2_future": "Age t2 future must be between {min} and {max}.",
    "message.validation.age_too_high": "The patient's age is 80. Prediction beyond this age is not supported.",


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
  
  },
  de:{"app.title": "Der CAC-Score-Rechner",
    "app.disclaimer": "Nicht für den klinischen Gebrauch.",
    "tabs.details": "Details eingeben",
    "tabs.predict_cac": "Berechnung des CAC-Score",
    "tabs.predict_age": "Alter-und Geschlechtsbezogene Vorhersage des CAC-Score",
    "tabs.summary": "CAC-Score Bericht",
    "tabs.about": "Über",

    "language-selector.language-select": "Sprache auswählen",

    "tooltip.age_t0": "Geben Sie das Anfangsalter ein zwischen: [45-80]",
    "tooltip.initial_cac": "Geben Sie den anfänglichen CAC-Score ein zwischen: [0-1000]",
    "tooltip.age_t1": "Geben Sie das Alter für die CAC-Score-Vorhersage ein (bis zu 10 Jahre ab dem Anfangsalter)",
    "tooltip.cac_t2": "Geben Sie den zweiten CAC-Score ein zwischen: [0-1000]",
    "tooltip.age_t2": "Geben Sie das Alter für die zweite CAC-Score-Messung ein (bis zu 10 Jahre ab der ersten CAC-Score-Messung)",
    "tooltip.age_t2_future": "Geben Sie das Alter für die CAC-Score-Vorhersage ein (bis zu 10 Jahre ab der zweiten Messung)",
  
    "placeholder.age_range": "Geben Sie eine Zahl ein: [{min}-{max}]",
    "placeholder.age_0_1000": "Geben Sie eine Zahl ein: 0-1000",
    "placeholder.min_max": "Geben Sie eine Zahl ein: Min - Max",
  
    "instruction.initial_age": "Geben Sie das Anfangsalter ein zwischen: [45-80]",
    "instruction.initial_cac": "Geben Sie den anfänglichen CAC-Score ein zwischen: [0-1000]",
    "instruction.age_t1": "<span>Geben Sie das Alter für die erste Vorhersage ein: [{min}-{max}]</span>", 
    "instruction.age_t2": "<span>Geben Sie das Alter für den zweiten CAC-Score ein: [{min}-{max}]</span>",
    "instruction.cac_t2": "Geben Sie den zweiten CAC-Score ein zwischen: [0-1000]",
    "instruction.age_t2_prediction": "<span>Geben Sie das Alter für die zweite Vorhersage ein: [{min}-{max}]</span>",
  
  
   
    
    "form.initial_measurement": "Erste Beurteilung",
    "form.gender": "Geschlecht:",
    "form.male": "Männlich",
    "form.female": "Weiblich",
    "form.patient_id": "ID:",
    "form.initial_age": "Alter beim ersten Herz-CT [Jahre]:",
    "form.initial_cac": "CAC beim ersten Herz-CT [Agatston-Einheiten]:",
    "form.age_t1": "Gewünschtes Vorhersagealter [Jahre]:",
    "form.second_measurement_available": "Es liegt ein zweites Herz-CT vor",
    
    "form.second_measurement": "Zweite Beurteilung",
    "form.age_t2": "Alter beim zweiten Herz-CT [Jahre]:",
    "form.cac_t2": "CAC beim zweiten Herz-CT [Agatston-Einheiten]:",
    "form.age_t2_future": "Gewünschtes Vorhersagealter [Jahre]:",
    


    
    
    "form.calculate_button": "Berechnen",
    "form.reset_button": "Formular zurücksetzen",
    
    "cac_chart.title_male": "CAC-Score-Berechnung für Männer",
    "cac_chart.title_female": "CAC-Score-Berechnung für Frauen",
    "cac_chart.axis_age": "Alter (Jahre)",
    "cac_chart.axis_cac": "CAC (Agatston-Einheiten)",
    "cac_chart.legend_initial_cac": "Anfänglicher CAC",
    "cac_chart.legend_predicted_cac": "Erste CAC-Berechnung",
    "cac_chart.legend_observed_cac": "Beobachteter CAC",
    "cac_chart.legend_second_prediction_cac": "Zweite CAC-Berechnung",
    "cac_chart.legend_progression_cac": "Erste CAC-Progression",
    "cac_chart.legend_second_progression_cac": "Zweite CAC-Progression",
    
    "age_chart.title_male": "Änderung des CAC-Score in Abhängigkeit von der initialen Berechnung (Männer)",
    "age_chart.title_female": "Änderung des CAC-Score in Abhängigkeit von der initialen Berechnung  (Frauen)",
    "age_chart.axis_percentile": "Perzentil",
    "age_chart.axis_age_at_cac": "Alter bei gegebenem CAC",
    "age_chart.out_of_domain": "Berechnetes Alter liegt außerhalb des Bereichs:",
    
    
    
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
    
    "summary.cac_progression": "CAC-Progression",
    "summary.age_at_cac_400": "Alter bei CAC > 400",
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
  
  
    
    "message.validation.gender": "Das Geschlecht muss 'männlich' oder 'weiblich' sein.",
    "message.validation.current_age": "Das aktuelle Alter muss zwischen 45 und 80 liegen.",
    "message.validation.current_cac": "Der aktuelle CAC muss zwischen 0 und 1000 liegen.",
    "message.validation.future_age": "Das zukünftige Alter muss zwischen {min} und {max} liegen.",
    "message.validation.patient_name": "Der Patientenname ist erforderlich und muss eine gültige Zeichenkette sein.",
    "message.validation.age_t2": "Alter t2 muss zwischen {min} und 80 liegen.",
    "message.validation.cac_t2": "CAC t2 muss zwischen 0 und 1000 liegen.",
    "message.validation.age_t2_future": "Alter t2 in der Zukunft muss zwischen {min} und {max} liegen.",
    "message.validation.age_too_high": "Das Alter des Patienten beträgt 80. Eine Vorhersage über dieses Alter hinaus wird nicht unterstützt.",

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
  
  }
    
}; // Global variable to store translations

const defaultLanguage = 'de';
const availableLocales = ['en', 'de'];
let pageLanguage = defaultLanguage;
let currentTranslations = translations[defaultLanguage];


/**
 * @param {string} key 
 * @param {object} [options] 
 */
function translateText(key, options = {}) {
  let translation = currentTranslations[key] || key;

  for (const placeholder in options) {
    if (Object.hasOwnProperty.call(options, placeholder)) {
      const value = options[placeholder];
      const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
      translation = translation.replace(regex, value);
    }
  }

  return translation;
}



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