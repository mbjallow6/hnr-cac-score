/****************************************************
  framinghamRisk.js
  Contains the core Framingham “Hard CHD” 10-year 
  risk formula as a simple exportable function.

  Usage:
    import or load in HTML, then call:
      const riskDecimal = framinghamRiskHardCHD(
        age, sex, totalChol, hdlChol, systolicBP,
        bpTreated, isSmoker
      );
****************************************************/

/**
 * Calculate 10-year "Hard CHD" Framingham risk (decimal form).
 * 
 * @param {number} age - (45–80 in your use-case)
 * @param {string} sex - "male" or "female"
 * @param {number} totalChol
 * @param {number} hdlChol
 * @param {number} systolicBP
 * @param {boolean} bpTreated
 * @param {boolean} isSmoker
 * @returns {number} risk (0–1 range, e.g. 0.039 => 3.9%)
 */
function framinghamRiskHardCHD(age, sex, totalChol, hdlChol, systolicBP, bpTreated, isSmoker) {
    
  
  // Coefficients and formula: same as before
    const treatVal   = bpTreated ? 1 : 0;
    const smokerVal  = isSmoker  ? 1 : 0;
  
    // For safety, ensure we are at least in some workable range:
    if (age < 30 || age > 79) {
      console.warn("Framingham formula validated for ages 30–79, but your input is " + age);
    }
  
    const lnAge = Math.log(age);
    const lnTC  = Math.log(totalChol);
    const lnHDL = Math.log(hdlChol);
    const lnSBP = Math.log(systolicBP);
  
    if (sex.toLowerCase() === "male") {
      const lnAgeForSmokerTerm = age > 70 ? Math.log(70) : lnAge;
      const LMen =
        52.00961 * lnAge +
        20.014077 * lnTC +
        -0.905964 * lnHDL +
        1.305784 * lnSBP +
        0.241549 * treatVal +
        12.096316 * smokerVal +
        -4.605038 * lnAge * lnTC +
        -2.84367 * lnAgeForSmokerTerm * smokerVal +
        -2.93323 * lnAge * lnAge +
        -172.300168;
      const PMen = 1 - Math.pow(0.9402, Math.exp(LMen));
      return (PMen * 100).toFixed(1);
    }
    else if (sex.toLowerCase() === "female") {
      const lnAgeForSmokerTerm = age > 78 ? Math.log(78) : lnAge;
      const LWomen =
        31.764001 * lnAge +
        22.465206 * lnTC +
        -1.187731 * lnHDL +
        2.552905 * lnSBP +
        0.420251 * treatVal +
        13.07543 * smokerVal +
        -5.060998 * lnAge * lnTC +
        -2.996945 * lnAgeForSmokerTerm * smokerVal +
        -146.5933061;
      const PWomen = 1 - Math.pow(0.98767, Math.exp(LWomen));
      return (PWomen * 100).toFixed(1);
    }
    else {
      throw new Error('Check your input.');
    }

     
  }
  
  // Export in case we want to import from a bundler:
  window.framinghamRiskHardCHD = framinghamRiskHardCHD;
  