export { pdfContent }
import autoTable from "../lib/jspdf.plugin.autotable.mjs";

function pdfContent() {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter",
            unit: "in"
        });

        let refreshText = "";
        let incident_id, incident_name, incident_type, incident_locs, report_id, report_dtg, incident_dtg;

        var header = new Image();
        header.src = "media/pdf_header.png";

        delay(1000).then(() => { 

            incident_id = $("#incident-id")[0].value;
            incident_name = $("#incident-name")[0].value;
            incident_type = $("#incident-type")[0].value;
            incident_locs = $("#incident-locations")[0].value;
            incident_dtg = $("#incident-starttime")[0].value;
            report_id = $("#report-id")[0].value;
            report_dtg = $("#report-starttime")[0].value;

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
            pdf.rect(0.5, 1.75, 7.5, 1.50);

            pdf.setFontSize(10);
            pdf.setTextColor(90, 148, 242);
            pdf.text(
                0.55,
                2,
                "Incident:\n" +
                "Incident Name:\n" +
                "Incident Type:\n" +
                "Incident Locations:\n",
                { align: "left", baseline: "bottom", lineHeightFactor: 1.75 }
            );
            pdf.text(
                4.65,
                2,
                "Report:\n" +
                "Report DTG:\n" +
                "Incident Start DTG:\n",
                { align: "left", baseline: "bottom", lineHeightFactor: 2 }
            );

            pdf.setTextColor(0, 0, 0);     
            pdf.text(
                1.75,
                2,
                incident_id + "\n" +
                incident_name + "\n" +
                incident_type + "\n" +
                incident_locs + "\n",
                { align: "left", baseline: "bottom", lineHeightFactor: 1.75 }
            );
            pdf.text(
                5.95,
                2,
                report_id + "\n" +
                report_dtg + "\n" +
                incident_dtg + "\n",
                { align: "left", baseline: "bottom", lineHeightFactor: 2 }
            );

            pdf.setTextColor(150, 150, 150);     
            pdf.text(
                0.55,
                3.20,
                "Last Updated: ",
                { align: "left", baseline: "bottom"}
            );

            pdf.setTextColor(90, 148, 242);

            autoTable(pdf, {
                head: [["1. Key Takeaways"]],
                body: keyTakeaways(),
                startY: 3.50,
                theme: "plain"
            });

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
    $("#pdf-viewer")[0].src = base64string;
}

function delay (time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function keyTakeaways () {
    let bullets = [
        ["Takeaway 1"], 
        ["Takeaway 2"]
    ];
    return bullets;
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