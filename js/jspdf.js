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
            pdf.setTextColor(90, 148, 242);    

            pdf.text(
                0.55,
                2,
                "Incident:\n" +
                "Incident Name:\n" +
                "Incident Type:\n" +
                "Incident Locations:\n",
                { align: "left", baseline: "bottom", lineHeightFactor: 1.25 }
            );
            pdf.text(
                4.30,
                2,
                "Report:\n" +
                "Report DTG:\n" +
                "Incident Start DTG:\n",
                { align: "left", baseline: "bottom", lineHeightFactor: 1.5 }
            );

            pdf.setTextColor(0, 0, 0); 

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