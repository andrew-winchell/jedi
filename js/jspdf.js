export { pdfContent }

function pdfContent() {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter",
            unit: "in"
        });

        let refreshText = "";
        let incident_id, incident_name;

        var header = new Image();
        header.src = "media/pdf_header.png";

        delay(1000).then(() => { 

            pdf.setFontSize(12);
            pdf.setTextColor(255, 0, 0);
            pdf.text(
                "FOR OFFICIAL USE ONLY",
                4.25,
                0.50,
                { align: "center" }
            )
            
            pdf.addImage(header, "png", 0.5, 0.75, 7.5, 0.75, "header")
            pdf.setFontSize(18);
            pdf.setTextColor(255, 255, 255);
            pdf.text(
                "ATO Significant Incident SITREP",
                0.75,
                1.125,
                { align: "left", baseline: "middle"}
            )

            pdf.cell(
                0.5,
                1.75,
                2,
                0.5,
                "Incident:",
                "left"
            )
            pdf.cell(
                0.5,
                2.25,
                2,
                0.5,
                "Incident Name:",
                "left"
            )

            incident_id = $("#incident-id")[0].value;
            incident_name = $("#incident-name")[0].value;
            //pdf.text(incident_id + "\n" + incident_name, 20, 20);

            //refreshText = $("#refresh-text")[0].textContent
            //pdf.text(refreshText, 12, 12);
            pdf.addPage();
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

$("#incident-name").on("calciteInputInput", (input) => {
    incident_id = input.target.value;
    console.log(incident_id);
});