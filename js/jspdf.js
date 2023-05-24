export { pdfContent }
import autoTable from "../lib/jspdf.plugin.autotable.mjs";

function pdfContent() {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter",
            unit: "in"
        });

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

            // Incident Details Table
            let id_table = autoTable(pdf, {
                body: [
                    ["Incident:", incident_id, "Report:", report_id],
                    ["Incident Name:", incident_name, "Report DTG:", report_dtg],
                    ["Incident Type:", incident_type, "Incident Start DTG:", incident_dtg],
                    ["Incident Locations:", incident_locs],
                    ["Last Updated:"]
                ],
                bodyStyles: {cellPadding: {top: 0.125, right: 0.125, bottom: 0.125, left: 0.125}, cellWidth: 'wrap'},
                columnStyles: { 0: { textColor:[90, 148, 242] }, 2: { textColor:[90, 148, 242] } },
                willDrawCell: (data) => {
                    let rows = data.table.body;
                    if (data.row.index === rows.length -1) {
                        pdf.setTextColor(190, 190, 190);
                    }
                },
                startY: 1.75,
                theme: "plain",
                tableLineWidth: 0.01,
                tableLineColor: 0,
                margin: {top:0.75, right:0.5, bottom:0.75, left:0.5},
                tableWidth: 7.5
            });

            // Key Takeaways Table
            let kt_table = autoTable(pdf, {
                head: [["1. Key Takeaways"]],
                headStyles: {textColor:[90, 148, 242], fontStyle: "normal"},
                body: keyTakeaways(incident_id),
                bodyStyles: {cellPadding: {top: 0.125, right: 0.25, bottom: 0.125, left: 0.50}, cellWidth: 'wrap'},
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

function keyTakeaways () {
    console.log($("#key-takeaways"));
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