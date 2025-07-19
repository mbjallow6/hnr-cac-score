// calcFunctions.js
// Calculation Functions Module
// Include this script in your HTML after the main script

// a helper to normalize the gender input
function normalizeGender(gender) {
    if (!gender) {
        // Instead of throwing an error, you could default to "male"
        return "male";
      }
  // Convert to lower-case for comparison.
  const lower = gender.toLowerCase();
  // Accept both raw values and their translated equivalents.
  if (lower === "male" || lower === "männlich") {
    return "male";
  }
  if (lower === "female" || lower === "weiblich") {
    return "female";
  }
  throw new Error("Gender must be 'male' or 'female'.");
}

// Function to calculate CAC score
function calculateCACScore(age, percentile, gender) {
    const normGender = normalizeGender(gender);
    let P = Math.max(0.0, Math.min(percentile, 1.0));
    let estLnCAC1;

    if (normGender === 'male') {
        // Coefficients for males
        let a = 152.9879400;
        let b = -235.7564940;
        let c = 86.3033953;
        let f = -1.97467373;
        let g = 3.27868572;
        let h = -1.25272424;

        // Adjusted coefficients incorporating age
        let a0 = a + f * age;
        let a1 = b + g * age;
        let a2 = c + h * age;

        // Calculate estimated ln(CAC + 1)
        estLnCAC1 = a0 + a1 / Math.pow(P, 0.25) + a2 / Math.pow(P, 0.5);
    } else if (normGender === 'female' ) {
        // Coefficients for females
        let a = 32.1097384;
        let d = -118.6890870;
        let e = 87.7010079;
        let f = -0.55171148;
        let j = 1.99858374;
        let k = -1.36557266;

        // Adjusted coefficients incorporating age
        let a0 = a + f * age;
        let a1 = d + j * age;
        let a2 = e + k * age;

        // Calculate estimated ln(CAC + 1)
        estLnCAC1 = a0 + a1 * P + a2 * Math.pow(P, 2);
    } else {
        throw new Error("Gender must be 'male' or 'female'.");
    }

    estLnCAC1 = Math.max(0.0, estLnCAC1); // Ensure est_ln_CAC1 is not negative
    return Math.exp(estLnCAC1) - 1;
}

// Calculate current percentile based on CAC score
function calculatePercentile(age, CAC, gender, percentileGuess = 0.6) {

    const normGender = normalizeGender(gender);
    const lnCAC1 = Math.log(CAC + 1);

    function equation(P) {
        P = Math.max(0.0001, Math.min(P, 1));

        if (normGender === 'male') {
            let a = 152.9879400;
            let b = -235.7564940;
            let c = 86.3033953;
            let f = -1.97467373;
            let g = 3.27868572;
            let h = -1.25272424;

            let a0 = a + f * age;
            let a1 = b + g * age;
            let a2 = c + h * age;

            const estLnCAC1 = a0 + a1 / Math.pow(P, 0.25) + a2 / Math.pow(P, 0.5);
            return estLnCAC1 - lnCAC1;
        } else if (normGender === 'female') {
            let a = 32.1097384;
            let d = -118.6890870;
            let e = 87.7010079;
            let f = -0.55171148;
            let j = 1.99858374;
            let k = -1.36557266;

            let a0 = a + f * age;
            let a1 = d + j * age;
            let a2 = e + k * age;

            const estLnCAC1 = a0 + a1 * P + a2 * Math.pow(P, 2);
            return estLnCAC1 - lnCAC1;
        } else {
            throw new Error("Gender must be 'male' or 'female'.");
        }
    }

    const solution = fsolve(equation, percentileGuess);
    return Math.max(0.0, Math.min(solution, 1.0));
}

// Function to determine progression category
function determineProgressionCategory(currentPercentile, observedFuturePercentile, delta = 0.2) {
    const lowerLimit = (1 - delta) * currentPercentile;
    const upperLimit = currentPercentile + delta * (1 - currentPercentile);

    if (observedFuturePercentile < lowerLimit) {
        return 'Slow';
    } else if (observedFuturePercentile > upperLimit) {
        return 'Rapid';
    } else {
        return 'Expected';
    }
}

// Mocked version of fsolve using Newton-Raphson method
function fsolve(equation, guess) {
    let P = guess;
    const tolerance = 1e-6;
    const maxIterations = 100;
    const delta = 1e-6;
    for (let i = 0; i < maxIterations; i++) {
        let value = equation(P);

        if (Math.abs(value) < tolerance) {
            break;
        }

        // Central difference for better derivative estimation
        let derivative = (equation(P + delta) - equation(P - delta)) / (2 * delta);

        if (derivative === 0) {
            console.warn("Derivative is zero. Stopping iteration.");
            break;
        }

        P -= value / derivative;

        // Clamp P between 0.0001 and 1
        P = Math.max(0.0001, Math.min(P, 1));
    }

    return P;
}


// Function to get polynomial coefficients based on gender
function getPolynomialCoefficients(gender) {
    const normGender = normalizeGender(gender);
    if (normGender === 'female') {
        return {
            polynomials: {
                10: [-1.2280779661766e-9, 6.1618984880999e-7, -1.3203742640412e-4, 1.5660011501905e-2, -1.1105560845235, 47.123559869853, -1109.4781895963, 11275.163173926],
                20: [-1.1361329221697e-9, 5.7452537301519e-7, -1.2418180450837e-4, 1.4871589986917e-2, -1.0661583483116, 45.797890517853, -1093.4722189011, 11297.3688187],
                50: [-1.0681473822997e-9, 5.4781415591959e-7, -1.2017339990891e-4, 1.4617884479645e-2, -1.0654137697798, 46.576170414904, -1133.1569332136, 11948.517448856],
                100: [-1.1279207761282e-9, 5.8956424719982e-7, -1.3184088436276e-4, 1.6350976412923e-2, -1.2151045431023, 54.15423012155, -1342.5642311931, 14400.739808884],
                200: [-8.8828820890975e-10, 4.6740388250629e-7, -1.0530071747994e-4, 1.316909721266e-2, -0.98802743973011, 44.523605036639, -1118.3959574315, 12204.867700289],
                400: [-1.075729459321e-9, 5.8754778383566e-7, -1.3740837026947e-4, 1.7836840017308e-2, -1.3883555886628, 64.838178421154, -1684.441078781, 18902.714486976],
            },
            polynomials_high: {
                400: [-1.4627559459822e-7, 6.9945413860852e-5, -1.3558785136037e-2, 1.3349087720633, -67.230252472209, 1474.3066712894],
            },
            polynomials_low: {
                400: [-2.1534516295982e-10, 1.0902820989767e-7, -2.362090516803e-5, 2.8387850980772e-3, -0.20459955677821, 8.8635874988645, -214.92287952127, 2352.7585724946],
            },
        };
    } else if (normGender === 'male') {
        return {
            polynomials: {
                10: [-1.3342369231727e-7, 3.9859749390063e-5, -4.8755300523067e-3, 0.2953059597212, -9.3121137634312, 179.90191258174],
                20: [-1.1843961097325e-7, 3.5529721718997e-5, -4.368946205577e-3, 0.26675285346807, -8.5115775819205, 174.54901582868],
                50: [-9.7878422442765e-8, 2.9588048496928e-5, -3.6738107724151e-3, 0.22757222056722, -7.4130801479797, 167.20375999093],
                100: [-8.2044651799036e-8, 2.5012481708661e-5, -3.1385005169969e-3, 0.19739997833157, -6.5671486682381, 161.54732136255],
                200: [-6.6097579826754e-8, 2.0404173722395e-5, -2.5993597709669e-3, 0.16701183472056, -5.7151640293856, 155.85040818775],
                400: [-5.0093220691025e-8, 1.5779311105671e-5, -2.0582822392813e-3, 0.13651452562444, -4.8601187336527, 150.13302885523],
            },
            polynomials_high: {
                400: [-1.9164517548078e-8, 7.2891561751953e-6, -1.1447911508775e-3, 0.091676182690312, -3.9582209469838, 149.9209686097],
            },
            polynomials_low: {
                400: [-2.44301599719e-8, 7.2180472725584e-6, -8.9442536743257e-4, 0.055680454596545, -1.9593502488708, 104.01887228478],
            },
        };
    } else {
        throw new Error("Gender must be 'male' or 'female'.");
    }
}

// Function to evaluate polynomial value
function evaluatePolynomial(coefficients, x) {
    return coefficients.reduce((acc, coeff, index) => acc + coeff * Math.pow(x, coefficients.length - index - 1), 0);
}
