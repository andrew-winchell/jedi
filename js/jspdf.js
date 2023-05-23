export { pdfContent }

function pdfContent() {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter",
            unit: "in"
        });

        let refreshText = "";
        let incident_id, incident_name, report_id;

        var header = new Image();
        header.src = "media/pdf_header.png";

        delay(1000).then(() => { 

            headerFooter(pdf);
            
            pdf.addImage(header, "png", 0.5, 0.75, 7.5, 0.75, "header");
            pdf.setFontSize(20);
            pdf.setTextColor(255, 255, 255);
            pdf.text(
                "ATO Significant Incident SITREP",
                0.75,
                1.125,
                { align: "left", baseline: "middle" }
            );

            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);

            pdf.setLineWidth(0.01);
            pdf.rect(0.5, 1.75, 7.5, 3);

            pdf.setFontSize(12);
            
            // Cell 1:1
            pdf.cell(0.5, 1.75, 1.875, 0.5, "Incident:", 1, "left");
            // Cell 1:2
            pdf.cell(1, 1.75, 1.875, 0.5, "test", 1, "left");
            // Cell 1:3
            pdf.cell(1.5, 1.75, 1.875, 0.5, "Report:", 1, "left");
            // Cell 1:4
            pdf.cell(2, 1.75, 1.875, 0.5, "test", 1, "left");
            // Cell 2:1
            pdf.cell(0.5, 2.25, 1.875, 0.5, "Incident:", 1, "left");
            // Cell 2:2
            pdf.cell(1, 2.25, 1.875, 0.5, "test", 1, "left");
            // Cell 2:3
            pdf.cell(1.5, 2.25, 1.875, 0.5, "Report:", 1, "left");
            // Cell 2:4
            pdf.cell(2, 2.25, 1.875, 0.5, "test", 1, "left");
            // Cell 3:1
            pdf.cell(0.5, 2.75, 1.875, 0.5, "Incident:", 1, "left");
            // Cell 3:2
            pdf.cell(1, 2.75, 1.875, 0.5, "test", 1, "left");
            // Cell 3:3
            pdf.cell(1.5, 2.75, 1.875, 0.5, "Report:", 1, "left");
            // Cell 3:4
            pdf.cell(2, 2.75, 1.875, 0.5, "test", 1, "left");
            // Cell 4:1
            pdf.cell(0.5, 3.25, 1.875, 0.5, "Incident:", 1, "left");
            // Cell 4:2
            pdf.cell(1, 3.25, 1.875, 0.5, "test", 1, "left");
            

            /*pdf.text(
                0.5,
                2,
                "Incident: " + incident_id + "      Report: " + report_id + "\n"
                + "Incident Name: " + incident_name
            )*/

            incident_id = $("#incident-id")[0].value;
            incident_name = $("#incident-name")[0].value;
            //pdf.text(incident_id + "\n" + incident_name, 20, 20);

            //refreshText = $("#refresh-text")[0].textContent
            //pdf.text(refreshText, 12, 12);
            pdf.addPage();
            headerFooter(pdf);
            pdf.text(20, 20, "The second page");
            
            let base64string = pdf.output("bloburl");
            debugBase64(base64string);
        });
}

function debugBase64 (base64string) {
    $("#pdf-viewer")[0].src = base64string
}

function delay (time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function headerFooter (pdf) {
    // Header
    pdf.setFontSize(12);
    pdf.setTextColor(255, 0, 0);
    pdf.text(
        "FOR OFFICIAL USE ONLY",
        4.25,
        0.375,
        { align: "center", baseline: "middle" }
    );
    // Footer
    pdf.text(
        "FOR OFFICIAL USE ONLY",
        4.25,
        10.625,
        { align: "center", baseline: "middle" }
    );
    
}

$("#incident-name").on("calciteInputInput", (input) => {
    incident_id = input.target.value;
    console.log(incident_id);
});