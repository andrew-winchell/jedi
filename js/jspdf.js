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
            console.log($("#incident-starttime"))
            incident_locs = $("#incident-locations")[0].value;
            let incident_time_arr = $("#incident-starttime")[0].value.split("T");
            incident_dtg = incident_time_arr[0] + " " + incident_time_arr[1] + ":00Z";
            report_id = $("#report-id")[0].value;
            let report_time_arr = $("#report-starttime")[0].value.split("T");
            report_dtg = report_time_arr[0] + " " + report_time_arr[1] + ":00Z";

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

            /*pdf.setFontSize(14);
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
            */

            // Incident Details Table
            autoTable(pdf, {
                body: [
                    ["Incident:", incident_id, "Report:", report_id],
                    ["Incident Name:", incident_name, "Report DTG:", report_dtg],
                    ["Incident Type:", incident_type, "Incident Start DTG:", incident_dtg],
                    ["Incident Locations:", incident_locs]
                ],
                startY: 1.75,
                theme: "plain",
                tableLineWidth: 0.01,
                tableLineColor: 0,
                margin: {top:0.75, right:0.5, bottom:0.75, left:0.5},
                tableWidth: 7.5
            });

            // Key Takeaways Table
            autoTable(pdf, {
                head: [["1. Key Takeaways"]],
                headStyles: {textColor:[90, 148, 242], fontStyle: "normal"},
                body: keyTakeaways(incident_id),
                bodyStyles: {cellPadding: {top: 0, right: 0.25, bottom: 0, left: 0.50}, cellWidth: 'wrap'},
                theme: "plain",
                tableLineWidth: 0.01,
                tableLineColor: 0,
                margin: {top:0.75, right:0.5, bottom:0.75, left:0.5},
                tableWidth: 7.5
            });

            incident_id = $("#incident-id")[0].value;
            incident_name = $("#incident-name")[0].value;
            //pdf.text(incident_id + "\n" + incident_name, 20, 20);
            
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

function keyTakeaways (inc_id) {
    let bullets = [
        ["\u2022 Takeaway 1. This is a test to see if the text in a cell will automatically wrap to the next line in a table or if there needs to be a manual background process to force the cell to wrap text."], 
        ["\u2022 Takeaway 2"]
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