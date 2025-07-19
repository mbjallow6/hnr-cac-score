/***************************************************
  ascvdCalculator.js
  - Contains the MESA ASCVD 10-year CHD risk (with CAC).
  - You can add more calculations if needed.
***************************************************/


function calculateMesaRisk(opts) {
    // console.log("calculateMesaRisk called with options:", opts);
    const validRaces = ["white", "aa", "chinese", "hispanic"];
    if (!validRaces.includes(opts.race)) {
      throw new Error("Invalid race: " + opts.race);
    }
    if (!["male", "female"].includes(opts.gender)) {
      throw new Error("Invalid gender: " + opts.gender);
    }
  
    // Coeff from your tribble
    const modelCoef = {
      age: 0.017203,
      gender_male: 0.407936,
      race_chinese: -0.347514,
      race_aa: 0.035314,
      race_hispanic: -0.022204,
      diabetes: 0.389201,
      smoker: 0.37172,
      totchol: 0.004273,
      hdl: -0.011382,
      hld_med: 0.120612,
      sbp: 0.006566,
      bp_med: 0.227787,
      fh_heartattack: 0.323877,
      log1p_cac: 0.274315,
      baseline_survival: 0.9983309999999999
    };
  
    function log1p(x) {
      return Math.log(1 + x);
    }
  
    const race_chinese   = (opts.race === "chinese") ? 1 : 0;
    const race_aa        = (opts.race === "aa")      ? 1 : 0;
    const race_hispanic  = (opts.race === "hispanic")? 1 : 0;
    const gender_male    = (opts.gender === "male")  ? 1 : 0;
  
    const indv_sum =
      (opts.age             * modelCoef.age) +
      (gender_male          * modelCoef.gender_male) +
      (race_chinese         * modelCoef.race_chinese) +
      (race_aa              * modelCoef.race_aa) +
      (race_hispanic        * modelCoef.race_hispanic) +
      (opts.diabetes        * modelCoef.diabetes) +
      (opts.smoker          * modelCoef.smoker) +
      (opts.totchol         * modelCoef.totchol) +
      (opts.hdl             * modelCoef.hdl) +
      (opts.lipid_med       * modelCoef.hld_med) +
      (opts.sbp             * modelCoef.sbp) +
      (opts.bp_med          * modelCoef.bp_med) +
      (opts.fh_heartattack  * modelCoef.fh_heartattack) +
      (log1p(opts.cac)      * modelCoef.log1p_cac);
  
    const exponent   = Math.exp(indv_sum);
    const survTerm   = Math.pow(modelCoef.baseline_survival, exponent);
    let riskPct      = (1 - survTerm) * 100;
  
    // Round to 2 decimals, clamp 1% to 30%
    riskPct = Math.round(riskPct * 100) / 100;
    if (riskPct < 1)  riskPct = 1;
    if (riskPct > 30) riskPct = 30;
  
    return riskPct;
  }
  
  // Expose it globally so script.js can call it
  window.calculateMesaRisk = calculateMesaRisk;
  