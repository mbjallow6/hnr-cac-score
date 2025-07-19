/************************************************************
  framinghamChart.js

  - Defines reference data arrays for men and women
  - Exports a function `updateFraminghamChart(age, sex, riskPct)`
    which draws a line chart (via D3) showing:
      1) "Average" risk line
      2) "Low (ideal)" risk line
      3) A marker for the patient's risk at their age

  Usage in script.js:
      updateFraminghamChart(
        patientAge,       // e.g. 48
        patientSex,       // "male" or "female"
        patientRiskPct    // e.g. 6.2
      );
************************************************************/

// 1) REFERENCE DATA FOR “AVERAGE” AND “LOW” RISK BY AGE, SEX (PERCENTAGES).
//    Based on the MDCalc or Framingham table. Only partial range shown (45–70).
//    You can expand or refine as needed.
const menData = [
    { age: 45, avg: 8,  low: 4 },
    { age: 50, avg: 10, low: 6 },
    { age: 55, avg: 13, low: 7 },
    { age: 60, avg: 20, low: 9 },
    { age: 65, avg: 22, low: 11 },
    { age: 70, avg: 25, low: 14 }
  ];
  
  const womenData = [
    { age: 45, avg: 2,  low: 3 },
    { age: 50, avg: 3,  low: 5 },
    { age: 55, avg: 7,  low: 7 },
    { age: 60, avg: 8,  low: 8 },
    { age: 65, avg: 8, low: 8 },
    { age: 70, avg: 11, low: 8 }
  ];

  /**
 * Updates the D3 line chart within #chart-container,
 * showing average/low lines plus a patient marker.
 *
 * @param {number} patientAge
 * @param {string} patientSex
 * @param {number} patientRiskPct
 */
  
  // 2) MAIN FUNCTION: draws or updates the chart inside #chart-container.
  function updateFraminghamChart(patientAge, patientSex, patientRiskPct) {
    // Chart dimensions
    const margin = { top: 30, right: 100, bottom: 50, left: 60 };
    const width  = 900 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    // Select the container and clear any previous chart
    const container = d3.select("#framingham-chart-container");
    container.selectAll("*").remove();
  
    // Create SVG
    const svg = container.append("svg")
      .attr("width",  width  + margin.left + margin.right)
      .attr("height", height + margin.top  + margin.bottom);
  
    // Inner group for the actual plotted area
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Choose reference data based on sex
    const refData = (patientSex.toLowerCase() === "male") ? menData : womenData;
  
    // X scale (age)
    const ages = refData.map(d => d.age);
    let xMin = d3.min(ages);
    let xMax = d3.max(ages);
  
    // Extend domain if patientAge is outside the given data
    if (patientAge < xMin) xMin = patientAge;
    if (patientAge > xMax) xMax = patientAge;
  
    const xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, width]);
  
    // Y scale (risk %)
    const yMaxRef = d3.max(refData, d => Math.max(d.avg, d.low));
    const yMax    = Math.max(yMaxRef, patientRiskPct);
    const yScale  = d3.scaleLinear()
      .domain([0, yMax + 5])  // some headroom
      .range([height, 0]);
  
    // Axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(refData.length)
      .tickFormat(d3.format("d"));
  
    const yAxis = d3.axisLeft(yScale)
      .ticks(6)
      .tickFormat(d => d + "%");
  
    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    g.append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height + 40)  // a bit below the x-axis
      .attr("text-anchor", "middle")
      .text("Age (Years)");
  
    g.append("g").call(yAxis);

    // Y-axis label
    g.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${-40}, ${height / 2}) rotate(-90)`)
      .text("Risk (%)");
    
    // Line generators for "average" and "low" curves
    const lineAvg = d3.line()
      .x(d => xScale(d.age))
      .y(d => yScale(d.avg))
      .curve(d3.curveMonotoneX);
  
    const lineLow = d3.line()
      .x(d => xScale(d.age))
      .y(d => yScale(d.low))
      .curve(d3.curveMonotoneX);
  
    // Plot "average" line
    g.append("path")
      .datum(refData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", lineAvg);
  
    // Plot "low (ideal)" line
    g.append("path")
      .datum(refData)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", lineLow);
  
    // Optional: small markers on each data point
    g.selectAll(".dot-avg")
      .data(refData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.age))
      .attr("cy", d => yScale(d.avg))
      .attr("r", 3)
      .attr("fill", "blue");
  
    g.selectAll(".dot-low")
      .data(refData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.age))
      .attr("cy", d => yScale(d.low))
      .attr("r", 3)
      .attr("fill", "green");
  
    // Patient's marker
    g.append("circle")
      .attr("cx", xScale(patientAge))
      .attr("cy", yScale(patientRiskPct))
      .attr("r", 5)
      .attr("fill", "red")
      .attr("stroke", "black")
      .attr("stroke-width", 1);
  
    // Label for patient's dot
    g.append("text")
      .attr("x", xScale(patientAge) + 10)
      .attr("y", yScale(patientRiskPct))
      .attr("dominant-baseline", "middle")
      .attr("fill", "red")
      .style("font-size", "12px")
      .text(`You: ${patientRiskPct.toFixed(1)}%`);
  
    // Legend
    const legendData = [
      { label: "Average Risk", color: "blue" },
      { label: "Low (Ideal) Risk", color: "green" },
      { label: "Your Risk", color: "red" }
    ];

    // Create a legend group in the top-right corner inside the chart area
    // Shift left a bit from the right edge, e.g. x = width - 100
    // Shift down from the top, e.g. y = 10
    const legendGroup = g.append("g")
       .attr("transform", `translate(${width+30}, 10)`);

    legendGroup.selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("g")
         .attr("class", "legend-item")
         .attr("transform", (_, i) => `translate(0, ${i * 20})`)
      .each(function(d) {
         // For each item, add a colored box or circle
         d3.select(this).append("rect")
           .attr("width", 12)
           .attr("height", 12)
           .attr("fill", d.color)
           .attr("stroke", "black")
           .attr("stroke-width", 0.5);

        // The text label
        d3.select(this).append("text")
          .attr("x", 18)  // a bit to the right of the box
          .attr("y", 6)   // halfway down the rect
          .attr("dominant-baseline", "middle")
          .style("font-size", "12px")
          .text(d.label);
    });
}

  
  // 3) Expose the function so script.js can call it
  window.updateFraminghamChart = updateFraminghamChart;
  