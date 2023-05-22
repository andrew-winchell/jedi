export { pdfContent }

// Disable default form submit
let inputs = [];
for(const cal_in of $("calcite-input")) {
    inputs.push(cal_in);
};
for (const cal_combo of $("calcite-combobox")) {
    inputs.push(cal_combo);
};
for (const box of inputs) {
    $(box).keypress((evt) => {
        if (evt.which == "13") {
            evt.preventDefault();
        }
    })
};


function pdfContent() {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter"
        });

        let refreshText = "";
        let incident_id, incident_name;
        delay(1000).then(() => { 
            incident_id = $("#incident-id")[0].value;
            incident_name = $("#incident-name")[0].value;
            pdf.text(incident_id + "\n" + incident_name, 20, 20);

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