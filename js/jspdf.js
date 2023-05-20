// Form Variables
let incident_id;
let incident_name;
let incident_type;
let iwl_names;
let report_id;
let incident_locs;
let incident_start;
let report_date;
let threat_name;
let incident_status;

$("#refresh-iwl").on("click", () => {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter"
        });

        let refreshText = "";
        delay(100).then(() => { 
            refreshText = $("#refresh-text")[0].textContent
            pdf.text(refreshText, 20, 20);
            pdf.addPage();
            pdf.text(20, 20, "The second page");
            
            let base64string = pdf.output("bloburl");
            debugBase64(base64string);
        });
});

function debugBase64 (base64string) {
    $("#pdf-viewer")[0].src = base64string
}

function delay (time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

$("#incident-name").on("calciteInputChange", (input) => {
    incident_id = input;
    console.log(incident_id);
});

function createPDF () {
    const pdf = new jsPDF({
        orientation: "portrait",
        format: "letter"
    });

    delay(100).then(() => {




        
        let base64string = pdf.output("bloburl");
        debugBase64(base64string);
    });
}