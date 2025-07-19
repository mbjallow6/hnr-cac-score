// pdfExport.js

// This function will be called to generate the entire PDF report.
async function exportReportToPDF(inputData) {
    // Guard clause: Ensure we have data to generate a report from.
    if (!inputData) {
        alert("Error: No data available to generate PDF. Please calculate a report first.");
        return;
    }

    // Extract patient name from the input data object
    const patientName = inputData.patient_name || 'N/A';

    // Ensure the required libraries are loaded
    if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
        console.error("jsPDF or html2canvas library is not loaded.");
        alert("Error: PDF generation libraries are missing.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'p', // Portrait for the first page
        unit: 'mm',
        format: 'a4'
    });

    // --- Prepare for rendering by making all content temporarily visible ---
    const summaryTab = document.getElementById('summary');
    const cacChartTab = document.getElementById('predict-cac');
    const ageChartTab = document.getElementById('predict-age');
    const elementsToRender = [summaryTab, cacChartTab, ageChartTab];

    // Add a temporary class to make hidden elements visible for rendering
    // This positions them off-screen so the user's view doesn't flicker.
    elementsToRender.forEach(el => el.classList.add('pdf-render-visible'));

    // --- Show a loading state on the button ---
    const pdfButton = document.getElementById('export-pdf-btn');
    const originalButtonText = pdfButton.textContent;
    pdfButton.textContent = 'Generating PDF...';
    pdfButton.disabled = true;

    try {
        // --- Page 1: Summary (Portrait) ---
        const summaryCanvas = await html2canvas(document.getElementById('summary-content'), { scale: 2, backgroundColor: '#ffffff' });
        const summaryImgData = summaryCanvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const summaryImgProps = pdf.getImageProperties(summaryImgData);
        const summaryAspectRatio = summaryImgProps.height / summaryImgProps.width;
        let summaryPdfHeight = pdfWidth * summaryAspectRatio;
        // If the content is too tall, cap it at the page height
        if (summaryPdfHeight > pdf.internal.pageSize.getHeight() - 20) {
            summaryPdfHeight = pdf.internal.pageSize.getHeight() - 20;
        }
        pdf.addImage(summaryImgData, 'PNG', 10, 10, pdfWidth - 20, summaryPdfHeight);
        addFooter(pdf, 1, patientName);

        // --- Page 2: CAC Score Chart (Landscape) ---
        // CHANGED: Use 'l' for landscape mode.
        pdf.addPage('a4', 'l'); 
        const cacCanvas = await html2canvas(document.getElementById('cac-chart'), { scale: 2, backgroundColor: '#ffffff' });
        const cacImgData = cacCanvas.toDataURL('image/png');
        addChartToPage(pdf, cacImgData);
        addFooter(pdf, 2, patientName);

        // --- Page 3: Age Prediction Chart (Landscape) ---
        // CHANGED: Use 'l' for landscape mode.
        pdf.addPage('a4', 'l');
        const ageCanvas = await html2canvas(document.getElementById('age-chart'), { scale: 2, backgroundColor: '#ffffff' });
        const ageImgData = ageCanvas.toDataURL('image/png');
        addChartToPage(pdf, ageImgData);
        addFooter(pdf, 3, patientName);

        // --- Save the final PDF ---
        pdf.save(`CAC-Report-${patientName}.pdf`);

    } catch (error) {
        console.error("Failed to generate PDF:", error);
        alert("Sorry, there was an error creating the PDF.");
    } finally {
        // --- Cleanup: Restore UI to its original state ---
        elementsToRender.forEach(el => el.classList.remove('pdf-render-visible'));
        pdfButton.textContent = originalButtonText;
        pdfButton.disabled = false;
    }
}

// Helper function to add a chart image to a PDF page, centered and scaled.
function addChartToPage(pdf, imageData) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15; // 15mm margin
    const imgProps = pdf.getImageProperties(imageData);
    const aspectRatio = imgProps.width / imgProps.height;

    let imgWidth = pageWidth - (2 * margin);
    let imgHeight = imgWidth / aspectRatio;

    // If the scaled height is too big for the page, scale based on height instead
    if (imgHeight > pageHeight - (2 * margin)) {
        imgHeight = pageHeight - (2 * margin);
        imgWidth = imgHeight * aspectRatio;
    }

    // Center the image
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imageData, 'PNG', x, y, imgWidth, imgHeight);
}


// Helper function to add a footer with Patient ID and Page Number to each page
function addFooter(pdf, pageNum, patientName) {
    // FIXED: The total number of pages is static (3). Using getNumberOfPages() during
    // page creation causes an incorrect "Page X of X" display on each page.
    const pageCount = 3; 
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFontSize(9);
    pdf.setTextColor(150); // Gray color

    // Set footer text for Patient ID
    const patientText = `Patient ID: ${patientName}`;
    pdf.text(patientText, 10, pageHeight - 10);

    // Set footer text for Page Number
    const pageNumText = `Page ${pageNum} of ${pageCount}`;
    const textWidth = pdf.getStringUnitWidth(pageNumText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    pdf.text(pageNumText, pageWidth - textWidth - 10, pageHeight - 10);
}