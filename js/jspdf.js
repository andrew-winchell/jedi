export { pdfContent }
import autoTable from "../lib/jspdf.plugin.autotable.mjs";

function pdfContent() {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter",
            unit: "in"
        });

        let incident_id, incident_name, incident_type, incident_locs, report_id, report_dtg, incident_dtg;

        delay(1000).then(() => { 

            incident_id = $("#incident-id")[0].value;
            incident_name = $("#incident-name")[0].value;
            incident_type = $("#incident-type")[0].value;
            incident_locs = $("#incident-locations")[0].value;
            let incident_time_arr = $("#incident-starttime")[0].value.split("T");
            incident_dtg = incident_time_arr[0] + " " + incident_time_arr[1] + ":00Z";
            report_id = $("#report-id")[0].value;
            let report_time_arr = $("#report-starttime")[0].value.split("T");
            report_dtg = report_time_arr[0] + " " + report_time_arr[1] + ":00Z";
            
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
                    ["Incident Locations:", incident_locs]
                ],
                bodyStyles: {cellPadding: {top: 0.125, right: 0.125, bottom: 0.125, left: 0.125}, cellWidth: 'wrap'},
                foot: [["Last Updated:"]],
                footStyles: { textColor:[170, 170, 170], fontStyle: "normal", fontSize: 10 },
                columnStyles: { 0: { textColor:[90, 148, 242] }, 2: { textColor:[90, 148, 242] } },
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
                headStyles: { textColor:[90, 148, 242], fontStyle: "normal" },
                body: keyTakeaways(incident_id),
                bodyStyles: { cellPadding: {top: 0.125, right: 0.25, bottom: 0.125, left: 0.50}, cellWidth: 'wrap' },
                foot: [["Last Updated:"]],
                footStyles: { textColor:[170, 170, 170], fontStyle: "normal", fontSize: 10 },
                theme: "plain",
                tableLineWidth: 0.01,
                tableLineColor: 0,
                margin: {top:0.75, right:0.5, bottom:0.75, left:0.5},
                tableWidth: 7.5
            });

            // Threats and Hazards Overview Table
            let th_table = autoTable(pdf, {
                head: [["2. Threat/Hazard Overview"]],
                headStyles: { textColor:[90, 148, 242], fontStyle: "normal" },
                body: [[]],
                bodyStyles: { cellPadding: {top: 0.125, right: 0.25, bottom: 0.125, left: 0.50}, cellWidth: 'wrap' },
                foot: [["Last Updated:"]],
                footStyles: { textColor:[170, 170, 170], fontStyle: "normal", fontSize: 10 },
                theme: "plain",
                tableLineWidth: 0.01,
                tableLineColor: 0,
                margin: {top:0.75, right:0.5, bottom:0.75, left:0.5},
                tableWidth: 7.5
            });

            // TFM Impacts and Outlook Table
            let tfm_table = autoTable(pdf, {
                head: [["4. TFM Impacts and Outlook"]],
                headStyles: { textColor:[90, 148, 242], fontStyle: "normal" },
                body: [[]],
                bodyStyles: { cellPadding: {top: 0.125, right: 0.25, bottom: 0.125, left: 0.50}, cellWidth: 'wrap' },
                foot: [["Last Updated:"]],
                footStyles: { textColor:[170, 170, 170], fontStyle: "normal", fontSize: 10 },
                theme: "plain",
                tableLineWidth: 0.01,
                tableLineColor: 0,
                margin: {top:1.75, right:0.5, bottom:0.75, left:0.5},
                tableWidth: 7.5
            });

            // Operational Response Table
            let orm_table = autoTable(pdf, {
                head: [["5. Operational Response Measures"]],
                headStyles: { textColor:[90, 148, 242], fontStyle: "normal" },
                body: [[]],
                bodyStyles: { cellPadding: {top: 0.125, right: 0.25, bottom: 0.125, left: 0.50}, cellWidth: 'wrap' },
                foot: [["Last Updated:"]],
                footStyles: { textColor:[170, 170, 170], fontStyle: "normal", fontSize: 10 },
                theme: "plain",
                tableLineWidth: 0.01,
                tableLineColor: 0,
                margin: {top:1.75, right:0.5, bottom:0.75, left:0.5},
                tableWidth: 7.5
            });

            // Response and Recovery Focus Table
            let rrf_table = autoTable(pdf, {
                head: [["6. Response and Recovery Focus"]],
                headStyles: { textColor:[90, 148, 242], fontStyle: "normal" },
                body: [[]],
                bodyStyles: { cellPadding: {top: 0.125, right: 0.25, bottom: 0.125, left: 0.50}, cellWidth: 'wrap' },
                foot: [["Last Updated:"]],
                footStyles: { textColor:[170, 170, 170], fontStyle: "normal", fontSize: 10 },
                theme: "plain",
                tableLineWidth: 0.01,
                tableLineColor: 0,
                margin: {top:1.75, right:0.5, bottom:0.75, left:0.5},
                tableWidth: 7.5
            });

            let pages = pdf.internal.getNumberOfPages();
            headerFooter(pdf, pages);
            
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
    let bullets = [];

    let takeaways = $("#key-takeaways")[0].children;

    for (const takeaway of takeaways) {
        console.log(takeaway)
        if (takeaway.hasClass("ui-resizable-handle")) {
            console.log("Skip Handle");
        } else {
            let bullet = ["\u2022 " + takeaway.children[0].value];
            bullets.push(bullet);
        }
    }

    return bullets;
}

function headerFooter (pdf, pages) {
    for (let i=0; i<pages; i++) {
        pdf.setPage(i);

        // Header
        var header = new Image();
        header.src = "media/pdf_header.png";
        pdf.addImage(header, "png", 0.5, 0.75, 7.5, 0.75, "header");

        pdf.setFontSize(20);
        pdf.setTextColor(255, 255, 255);
        pdf.text(
            "ATO Significant Incident SITREP",
            0.75,
            1.125,
            { align: "left", baseline: "middle" }
        );

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
    
}

$("#incident-name").on("calciteInputInput", (input) => {
    incident_id = input.target.value;
    console.log(incident_id);
});