// cacChart.js

// Configuration Object for Chart Parameters (assuming this is at the top of your file)
const chartConfig = {
    minAge: 44,
    maxAge: 80,
    ageStep: 1,
    yMax: 2000,
    malePercentiles: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
    femalePercentiles: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
    colors: ['green', 'limegreen', 'yellow', 'gold', 'orange', 'orangered', 'red', 'darkred'],
    margin: { top: 50, right: 150, bottom: 50, left: 70 },
    width: 700,
    height: 500
};

function updateCACPrediction(inputData) {
    const { margin, width, height, minAge, maxAge, yMax, malePercentiles, femalePercentiles, colors } = chartConfig;

    const svg = initializeSVG(margin, width, height);
    initializeTooltip();
    const { x, y } = initializeScales(minAge, maxAge, yMax, width, height);

    addAxes(svg, x, y, height);
    addGridlines(svg, x, y, width, height);

    const percentiles = inputData.gender === "male" ? malePercentiles : femalePercentiles;
    addPercentileCurves(svg, percentiles, x, y, inputData.gender, colors);

    addLabels(svg, width, height, inputData.gender);
    addLegend(svg, percentiles, colors, width);
    addAdditionalLegend(svg, width, percentiles.length, inputData);

    const individualCACData = individualData(inputData);

    plotIndividualDataPoints(svg, individualCACData, x, y);

    // Plot the first prediction point (blue dot at future_age), based on initial percentile
    if (individualCACData.future_age && individualCACData.predicted_future_CAC !== null) {
        plotPredictionPoint(svg, individualCACData.future_age, individualCACData.predicted_future_CAC, "blue", translateText("cac_chart.legend_predicted_cac"), x, y);

        plotExpectedCACProgression(
            svg,
            individualCACData.current_age,
            individualCACData.future_age,
            x, y,
            inputData.gender,
            "gray",
            individualCACData.initialPercentile
        );
    }


    // Handle second measurement and its prediction
    if (inputData.second_measurement && inputData.age_t2 != null && inputData.cac_t2 != null) {
        addSecondMeasurement(svg, inputData, x, y);

        // Plot the second prediction point (purple dot at age_t2_future), if provided and valid
        if (individualCACData.age_t2_future && individualCACData.predicted_future_CAC_t2 !== null) {
            plotPredictionPoint(svg, individualCACData.age_t2_future, individualCACData.predicted_future_CAC_t2, "purple", translateText("cac_chart.legend_second_prediction_cac"), x, y);

            if (individualCACData.secondMeasurementPercentile !== null) {
                plotExpectedCACProgression(
                    svg,
                    inputData.age_t2,
                    individualCACData.age_t2_future,
                    x, y,
                    inputData.gender,
                    "darkgrey",
                    individualCACData.secondMeasurementPercentile
                );
            }
        }
    }

    // CHANGED: Return the individual data object which includes calculated percentiles
    // This makes the data available for the summary tab.
    return {
        predicted_future_CAC: individualCACData.predicted_future_CAC,
        predicted_future_CAC_t2: individualCACData.predicted_future_CAC_t2,
        initialPercentile: individualCACData.initialPercentile,
        secondMeasurementPercentile: individualCACData.secondMeasurementPercentile
    };
}


// Helper function to plot prediction points with specific color and tooltip
function plotPredictionPoint(svg, age, cacScore, color, label, x, y) {
    if (cacScore === null || isNaN(cacScore) || age === null || isNaN(age)) {
        return;
    }
    svg.append("circle")
        .attr("cx", x(age))
        .attr("cy", y(cacScore))
        .attr("r", 7.5)
        .attr("fill", color)
        .attr("class", "dot")
        .on("mouseover", (event) => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.transition().duration(200).style("opacity", 1);
            currentTooltip.html(`${label}<br>${translateText("cac_chart.axis_age")}:
${age}<br>${translateText("cac_chart.axis_cac")}:
${cacScore.toFixed(0)}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mousemove", (event) => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", () => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.transition().duration(200).style("opacity", 0);
        });
}

function initializeSVG(margin, width, height) {
    d3.select("#cac-chart").select("svg").remove();
    return d3.select("#cac-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right + 200)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
}

function initializeTooltip() {
    d3.select("body").selectAll("div.tooltip").remove();
    return d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "8px")
        .style("border-radius", "4px")
        .style("pointer-events", "none");
}

function initializeScales(minAge, maxAge, yMax, width, height) {
    const x = d3.scaleLinear()
        .domain([minAge, maxAge])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, yMax])
        .range([height, 0]);

    return { x, y };
}

function addAxes(svg, x, y, height) {
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .attr("font-size", "12px");

    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("font-size", "12px");
}

function addGridlines(svg, x, y, width, height) {
    const makeXGridlines = () => d3.axisBottom(x).ticks(10);
    const makeYGridlines = () => d3.axisLeft(y).ticks(10);

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`)
        .call(makeXGridlines().tickSize(-height).tickFormat(""));

    svg.append("g")
        .attr("class", "grid")
        .call(makeYGridlines().tickSize(-width).tickFormat(""));
}

function addPercentileCurves(svg, percentiles, x, y, gender, colors) {
    percentiles.forEach((percentile, index) => {
        const data = d3.range(chartConfig.minAge, chartConfig.maxAge + 1, chartConfig.ageStep).map(age => ({
            age: age,
            value: calculateCACScore(age, percentile, gender)
        }));

        const line = d3.line()
            .x(d => x(d.age))
            .y(d => y(d.value))
            .curve(d3.curveCatmullRom.alpha(0.5));

        const path = svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("stroke", colors[index])
            .attr("fill", "none")
            .attr("d", line);

        addMouseInteraction(path, data, x);

        data.forEach(d => {
            if (d.age % 5 === 0) {
                svg.append("circle")
                    .attr("cx", x(d.age))
                    .attr("cy", y(d.value))
                    .attr("r", 3)
                    .attr("fill", colors[index]);

                svg.append("text")
                    .attr("x", x(d.age))
                    .attr("y", y(d.value) - 5)
                    .attr("text-anchor", "middle")
                    .style("font-size", "10px")
                    .style("fill", colors[index])
                    .text(d.value.toFixed(0));
            }
        });
    });
}

function addMouseInteraction(path, data, x) {
    path.on("mouseover", (event) => {
        const currentTooltip = d3.select("body").select("div.tooltip");
        const mouse = d3.pointer(event);
        const mouseX = mouse[0];
        const age = x.invert(mouseX);

        const closestDataPoint = data.reduce((prev, curr) => (
            Math.abs(curr.age - age) < Math.abs(prev.age - age) ? curr : prev
        ));

        currentTooltip.transition().duration(200).style("opacity", 1);
        currentTooltip.html(`${translateText("cac_chart.axis_age")}:
${closestDataPoint.age.toFixed(0)}<br>${translateText("cac_chart.axis_cac")}:
${closestDataPoint.value.toFixed(0)}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
        .on("mousemove", (event) => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", () => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.transition().duration(200).style("opacity", 0);
        });
}

function addLabels(svg, width, height, gender) {
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text(translateText(gender === "male" ? "cac_chart.title_male" : "cac_chart.title_female"));

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(translateText("cac_chart.axis_age"));

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${-50}, ${height / 2}) rotate(-90)`)
        .style("font-size", "16px")
        .text(translateText("cac_chart.axis_cac"));
}

function addLegend(svg, percentiles, colors, width) {
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + 20}, 20)`);

    percentiles.forEach((percentile, index) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", index * 20)
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colors[index]);

        legend.append("text")
            .attr("x", 20)
            .attr("y", index * 20 + 9)
            .text(translateText("cac_chart.legend_percentile") + " " + Math.round(percentile * 100));
    });
}

function addAdditionalLegend(svg, width, numPercentiles, inputData) {
    const additionalLegendItems = [
        { label: translateText("cac_chart.legend_initial_cac"), color: 'green', type: 'circle', condition: true },
        { label: translateText("cac_chart.legend_predicted_cac"), color: 'blue', type: 'circle', condition: true },
        { label: translateText("cac_chart.legend_progression_cac"), color: 'gray', type: 'line', condition: true },
        { label: translateText("cac_chart.legend_observed_cac"), color: 'red', type: 'circle', condition: inputData.second_measurement },
        {
            label: translateText("cac_chart.legend_second_prediction_cac"), color: 'purple', type: 'circle',
            condition: inputData.second_measurement && inputData.age_t2_future
        },
        {
            label: translateText("cac_chart.legend_second_progression_cac"), color: 'darkgrey', type: 'line',
            condition: inputData.second_measurement && inputData.age_t2_future
        }
    ];


    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + 20}, ${20 + numPercentiles * 20})`);

    let legendItemYOffset = 0;
    additionalLegendItems.forEach((item) => {
        if (item.condition) {
            const currentY = legendItemYOffset * 20;
            if (item.type === 'circle') {
                legend.append("circle")
                    .attr("cx", 5)
                    .attr("cy", currentY + 5)
                    .attr("r", 5)
                    .attr("fill", item.color);
            } else if (item.type === 'line') {
                legend.append("line")
                    .attr("x1", 0)
                    .attr("y1", currentY + 5)
                    .attr("x2", 10)
                    .attr("y2", currentY + 5)
                    .attr("stroke", item.color)
                    .attr("stroke-width", 2)
                    .attr("stroke-dasharray", "4,4");
            }
            legend.append("text")
                .attr("x", 20)
                .attr("y", currentY + 9)
                .text(item.label);
            legendItemYOffset++;
        }
    });
}


function individualData(inputData) {
    const { current_age, current_CAC, future_age, age_t2, cac_t2, age_t2_future, second_measurement } = inputData;
    const gender = inputData.gender;

    // Percentile from the INITIAL measurement
    const initialPercentile = calculatePercentile(current_age, current_CAC, gender);

    // First prediction - REMAINS BASED ON INITIAL PERCENTILE
    const predicted_future_CAC = calculateCACScore(future_age, initialPercentile, gender);

    let predicted_future_CAC_t2 = null;
    let secondMeasurementPercentile = null;

    // If a second measurement exists AND its inputs are valid, calculate its percentile
    if (second_measurement && age_t2 != null && !isNaN(age_t2) && cac_t2 != null && !isNaN(cac_t2)) {
        secondMeasurementPercentile = calculatePercentile(age_t2, cac_t2, gender);
        if (age_t2_future && !isNaN(age_t2_future)) {
            predicted_future_CAC_t2 = calculateCACScore(age_t2_future, secondMeasurementPercentile, gender);
        }
    }

    return {
        current_age,
        current_CAC,
        future_age,
        predicted_future_CAC,
        age_t2_future,
        predicted_future_CAC_t2,
        initialPercentile,
        secondMeasurementPercentile
    };
}

function plotIndividualDataPoints(svg, individualData, x, y) {
    // --- Green circle (initial point) ---
    svg.append("circle")
        .attr("cx", x(individualData.current_age))
        .attr("cy", y(individualData.current_CAC))
        .attr("r", 5)
        .attr("fill", "green")
        .attr("class", "dot")
        .on("mouseover", (event) => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.transition().duration(200).style("opacity", 1);
            currentTooltip.html(`${translateText("cac_chart.axis_age")}: ${individualData.current_age}<br>${translateText("cac_chart.axis_cac")}: ${individualData.current_CAC}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mousemove", (event) => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", () => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.transition().duration(200).style("opacity", 0);
        });

}


function addSecondMeasurement(svg, inputData, x, y) {
    if (inputData.age_t2 === null || isNaN(inputData.age_t2) || inputData.cac_t2 === null || isNaN(inputData.cac_t2)) {
        return;
    }

    svg.append("circle")
        .attr("cx", x(inputData.age_t2))
        .attr("cy", y(inputData.cac_t2))
        .attr("r", 5)
        .attr("fill", "red")
        .attr("class", "dot")
        .on("mouseover", (event) => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.transition().duration(200).style("opacity", 1);
            currentTooltip.html(`${translateText("cac_chart.axis_age")}: ${inputData.age_t2}<br>${translateText("cac_chart.legend_observed_cac")}: ${inputData.cac_t2}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mousemove", (event) => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", () => {
            const currentTooltip = d3.select("body").select("div.tooltip");
            currentTooltip.transition().duration(200).style("opacity", 0);
        });

    const currentPercentile = calculatePercentile(inputData.current_age, inputData.current_CAC, inputData.gender);
    const observedFuturePercentile = calculatePercentile(inputData.age_t2, inputData.cac_t2, inputData.gender);
    const progressionCategoryKey = determineProgressionCategory(currentPercentile, observedFuturePercentile);

    let textColor;
    switch (progressionCategoryKey) {
        case 'summary.progression.rapid':
            textColor = 'red';
            break;
        case 'summary.progression.slow':
            textColor = 'green';
            break;
        default: // 'summary.progression.normal'
            textColor = 'blue';
            break;
    }

    // 2. Determine the position dynamically
    const pointX = x(inputData.age_t2);
    let textAnchor = "start";
    let xOffset = 10;

    // If the point is in the last 25% of the chart's width, flip the text
    if (pointX > chartConfig.width * 0.75) {
        textAnchor = "end";
        xOffset = -10;
    }

    svg.append("text")
        .attr("x", pointX + xOffset)
        .attr("y", y(inputData.cac_t2) - 10)
        .attr("text-anchor", textAnchor)
        .style("font-size", "12px")
        .style("fill", textColor)
        .style("font-weight", "bold")
        .text(`${translateText(progressionCategoryKey)} ${translateText("cac_chart.legend_progression_cac")}`);



}

function plotExpectedCACProgression(svg, startAge, endAge, x, y, gender, lineColor = "gray", percentileToUse) {

    if (percentileToUse === null || percentileToUse === undefined || isNaN(percentileToUse)) {
        return;
    }

    if (startAge === null || isNaN(startAge) || endAge === null || isNaN(endAge) || endAge <= startAge) {
        return;
    }

    const ageInterval = d3.range(startAge, endAge + 1, 1);
    const expectedCACData = ageInterval.map(age => ({
        age: age,
        value: calculateCACScore(age, percentileToUse, gender)
    }));

    if (expectedCACData.length < 2) {
        return;
    }

    const expectedLine = d3.line()
        .x(d => x(d.age))
        .y(d => y(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5));

    const pathExpected = svg.append("path")
        .datum(expectedCACData)
        .attr("class", "line")
        .attr("stroke", lineColor)
        .attr("stroke-dasharray", "4,4")
        .attr("fill", "none")
        .attr("d", expectedLine);

    addMouseInteraction(pathExpected, expectedCACData, x);
}