// ageChart.js
// Age Prediction Chart Module
function updateAgePrediction(inputData) {
    // Constants and Parameters
    const CAC_LEVELS = [10, 20, 50, 100, 200, 400];
    const COLORS = ['green', 'yellowgreen', 'gold', 'orange', 'orangered', 'red'];
    const MIN_PERCENTILE = 40;
    const MAX_PERCENTILE = 100;
    const PERCENTILE_STEP = 5;
    const gender = inputData.gender;

    // --- Tooltip Handling ---
    // Remove any pre-existing tooltips from previous renders
    d3.select("body").selectAll("div.tooltip").remove();
    // Create the new tooltip element for this render (but don't rely on this variable in handlers)
    // Store it temporarily just to set initial styles if needed, though it's immediately selected in handlers
    const initialTooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0) // Start hidden
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "8px")
        .style("border-radius", "4px")
        .style("pointer-events", "none");
    // --- End Tooltip Handling ---


    // Remove any existing SVG
    d3.select("#age-chart").select("svg").remove();

    // Set dimensions of the graph
    const margin = { top: 50, right: 150, bottom: 50, left: 70 };
    const width = 700;
    const height = 600;

    // Append SVG for chart rendering
    const svg = d3.select("#age-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right + 200)
        .attr("height", height + margin.top + margin.bottom + 100)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    // Define clipping path
    svg.append("defs")
        .append("clipPath")
        .attr("id", "clip-age")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height);

    // Append group element with clip-path applied
    const chartGroup = svg.append("g")
        .attr("clip-path", "url(#clip-age)");

    // Define x and y scales
    const xScale = d3.scaleLinear()
        .domain([MIN_PERCENTILE, MAX_PERCENTILE])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([40, 85])
        .range([height, 0]);

    // Add gridlines
    function makeXGridlines() {
        return d3.axisBottom(xScale).ticks(10);
    }
    function makeYGridlines() {
        return d3.axisLeft(yScale).ticks(10);
    }
    chartGroup.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`)
        .call(makeXGridlines().tickSize(-height).tickFormat(""));
    chartGroup.append("g")
        .attr("class", "grid")
        .call(makeYGridlines().tickSize(-width).tickFormat(""));

    // Append x and y axes
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(10))
        .attr("font-size", "12px");
    svg.append("g")
        .call(d3.axisLeft(yScale).ticks(10))
        .attr("font-size", "12px");

    // Generate percentile range data
    const xValues = d3.range(MIN_PERCENTILE, MAX_PERCENTILE + 1, PERCENTILE_STEP);

    // Get polynomials for the specified gender
    const { polynomials, polynomials_high, polynomials_low } = getPolynomialCoefficients(gender);

    // Plotting CAC level curves for each polynomial
    CAC_LEVELS.forEach((cac_level, index) => {
        const coefficients = polynomials[cac_level];
        if (!coefficients) return; 

        const data = xValues.map(xVal => {
            const yVal = evaluatePolynomial(coefficients, xVal);
            // Filter out points significantly outside the y-axis domain to avoid extreme path values
            if (yVal < yScale.domain()[0] - 10 || yVal > yScale.domain()[1] + 10) { 
                return null;
            }
            return { x: xVal, y: yVal };
        }).filter(d => d !== null); 

        if (data.length < 2) return; 

        // Line generator function
        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
            .curve(d3.curveCatmullRom.alpha(0.5));

        // Plot the line for the given CAC level
        const path = chartGroup.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("stroke", COLORS[index])
            .attr("fill", "none")
            .attr("d", line);

        // Add mouseover functionality for the lines
        path.on("mouseover", (event) => { // Changed from mousemove to mouseover for appearance
            // Re-select tooltip inside the event handler
            const currentTooltip = d3.select("body").select("div.tooltip");
            const mouse = d3.pointer(event, path.node()); 
            const mouseX = mouse[0];
            const percentile = xScale.invert(mouseX);

            // Find closest point in *this specific line's data*
            const closestDataPoint = data.reduce((prev, curr) => (
                Math.abs(curr.x - percentile) < Math.abs(prev.x - percentile) ? curr : prev
            ));

            currentTooltip.transition().duration(200).style("opacity", 1);
            currentTooltip.html(`${translateText("age_chart.axis_percentile")}: ${closestDataPoint.x.toFixed(1)}<br>${translateText("age_chart.axis_age_at_cac")}: ${closestDataPoint.y.toFixed(1)}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mousemove", (event) => {
             // Re-select tooltip inside the event handler for positioning
             const currentTooltip = d3.select("body").select("div.tooltip");
             currentTooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", () => {
            // Re-select tooltip inside the event handler
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.transition().duration(200).style("opacity", 0);
        });

        // Add markers and labels for each point on the line
        data.forEach((point) => {
             // Check if point is within the visible y-scale range before drawing
             if (point.y >= yScale.domain()[0] && point.y <= yScale.domain()[1]) {
                chartGroup.append("circle")
                    .attr("cx", xScale(point.x))
                    .attr("cy", yScale(point.y))
                    .attr("r", 3)
                    .attr("fill", COLORS[index]);
                // Optional: Add text label - consider if it gets too crowded
                // chartGroup.append("text")
                //     .attr("x", xScale(point.x))
                //     .attr("y", yScale(point.y) - 5)
                //     .attr("text-anchor", "middle")
                //     .style("font-size", "10px")
                //     .style("fill", COLORS[index])
                //     .text(point.y.toFixed(1));
             }
        });
    });

    // Plotting the CAC=400 confidence intervals (upper and lower)
    if (polynomials_low[400] && polynomials_high[400]) {
        const dataConfidence = xValues.map(xVal => ({
            x: xVal,
            yLow: evaluatePolynomial(polynomials_low[400], xVal),
            yHigh: evaluatePolynomial(polynomials_high[400], xVal)
        })).filter(d => 
             d.yLow >= yScale.domain()[0] - 10 && d.yLow <= yScale.domain()[1] + 10 &&
             d.yHigh >= yScale.domain()[0] - 10 && d.yHigh <= yScale.domain()[1] + 10
        );

        if (dataConfidence.length > 1) {
            const area = d3.area()
                .x(d => xScale(d.x))
                .y0(d => yScale(Math.max(yScale.domain()[0], d.yLow))) 
                .y1(d => yScale(Math.min(yScale.domain()[1], d.yHigh))) 
                .curve(d3.curveCatmullRom.alpha(0.5));
            chartGroup.append("path")
                .datum(dataConfidence)
                .attr("class", "confidence-interval")
                .attr("fill", "red")
                .attr("opacity", 0.2)
                .attr("d", area);
        }
    }

    // Plotting the CAC=400 lower, central, and upper lines
    ['polynomials_low', 'polynomials', 'polynomials_high'].forEach((type, idx) => {
        // Use a direct reference instead of eval
        const polySet = (type === 'polynomials_low') ? polynomials_low :
                       (type === 'polynomials') ? polynomials : polynomials_high;

        if (polySet && polySet[400]) {
            const coefficients = polySet[400];
            const data = xValues.map(xVal => {
                 const yVal = evaluatePolynomial(coefficients, xVal);
                 if (yVal < yScale.domain()[0] -10 || yVal > yScale.domain()[1] + 10) return null; 
                 return { x: xVal, y: yVal };
            }).filter(d => d !== null);

            if (data.length > 1) {
                const line = d3.line()
                    .x(d => xScale(d.x))
                    .y(d => yScale(d.y))
                    .curve(d3.curveCatmullRom.alpha(0.5));
                chartGroup.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("stroke", "red")
                    .attr("fill", "none")
                    .attr("stroke-dasharray", idx === 1 ? "none" : "4,4") 
                    .attr("d", line);
            }
        }
    });

    // Add axis labels and chart title using translated strings
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text(translateText(gender === "male" ? "age_chart.title_male" : "age_chart.title_female"));

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(translateText("age_chart.axis_percentile"));

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${-50}, ${height / 2}) rotate(-90)`)
        .style("font-size", "16px")
        .text(translateText("age_chart.axis_age_at_cac"));

    // Add legend for CAC levels
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + 20}, ${20})`);

    CAC_LEVELS.forEach((cac_level, i) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 20)
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", COLORS[i]);
        legend.append("text")
            .attr("x", 20)
            .attr("y", i * 20 + 10) 
            .style("font-size", "12px")
            .attr("alignment-baseline", "middle")
            .text(`${translateText("age_chart.legend_cac")} ${cac_level}`);
    });

    // Add legend for user data point (Predicted Age at CAC=400)
    legend.append("circle")
        .attr("cx", 5) 
        .attr("cy", (CAC_LEVELS.length) * 20 + 5)
        .attr("r", 5)
        .attr("fill", "blue");
    legend.append("text")
        .attr("x", 20)
        .attr("y", (CAC_LEVELS.length) * 20 + 10) 
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle")
        .text(translateText("age_chart.legend_predicted_age_at_cac"));

    // Plot user's data point on the CAC=400 curve
    const userPercentile = calculatePercentile(inputData.current_age, inputData.current_CAC, gender) * 100;
    let userAgeAtCAC400 = NaN; 
    const coefficients400 = polynomials[400];
    if(coefficients400) {
       userAgeAtCAC400 = evaluatePolynomial(coefficients400, userPercentile);
    }


    // Check if the predicted age at CAC=400 is within the study population range
    let outOfRangeMsg = "";
    const [xMin, xMax] = xScale.domain();
    const [yMin, yMax] = yScale.domain();

    // Check percentile validity first
    if (isNaN(userPercentile) || userPercentile < xMin || userPercentile > xMax) {
        outOfRangeMsg += ` ${translateText("age_chart.tooltip_percentile")}: ${isNaN(userPercentile) ? 'N/A' : userPercentile.toFixed(1)} ${translateText("age_chart.outside_range")} [${xMin}–${xMax}].`;
    }
    // Check calculated age validity
    if (isNaN(userAgeAtCAC400) || userAgeAtCAC400 < yMin || userAgeAtCAC400 > yMax) {
         // Only add age message if percentile was valid OR age calculation failed
         if(outOfRangeMsg === "" || isNaN(userAgeAtCAC400)) {
             outOfRangeMsg += ` ${translateText("age_chart.tooltip_age")}: ${isNaN(userAgeAtCAC400) ? 'N/A' : userAgeAtCAC400.toFixed(1)} ${translateText("age_chart.outside_range")} [${yMin}–${yMax}].`;
         }
    }


    if (outOfRangeMsg !== "") {
        svg.append("text")
          .attr("x", 0) // Position message below x-axis
          .attr("y", height + margin.bottom - 5) 
          .attr("fill", "blue")
          .style("font-size", "14px")
          .text(`${translateText("age_chart.out_of_domain")} ${outOfRangeMsg}`);
    } else {
        // Only plot the point if it's within range
        svg.append("circle")
            .attr("cx", xScale(userPercentile))
            .attr("cy", yScale(userAgeAtCAC400))
            .attr("r", 5)
            .attr("fill", "blue")
            .on("mouseover", (event) => {
                // Re-select tooltip inside the event handler
                const currentTooltip = d3.select("body").select("div.tooltip");
                currentTooltip.transition().duration(200).style("opacity", 1);
                currentTooltip.html(`${translateText("age_chart.tooltip_predicted_age")}: ${userAgeAtCAC400.toFixed(1)} ${translateText("age_chart.years")}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mousemove", (event) => {
                // Re-select tooltip inside the event handler
                const currentTooltip = d3.select("body").select("div.tooltip");
                currentTooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", () => {
                // Re-select tooltip inside the event handler
                const currentTooltip = d3.select("body").select("div.tooltip");
                currentTooltip.transition().duration(200).style("opacity", 0);
            });

        // Add dotted lines from predicted point to axes
        svg.append("line")
            .attr("x1", xScale(userPercentile))
            .attr("y1", yScale(userAgeAtCAC400))
            .attr("x2", 0) 
            .attr("y2", yScale(userAgeAtCAC400))
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4,4");

        svg.append("line")
            .attr("x1", xScale(userPercentile))
            .attr("y1", yScale(userAgeAtCAC400))
            .attr("x2", xScale(userPercentile))
            .attr("y2", height) 
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4,4");
    }
}