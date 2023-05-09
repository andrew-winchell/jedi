$("#refresh-iwl").on("click", () => {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter"
        });
        
        let refreshText = $("#refresh-text")[0].textContent;
        pdf.text(refreshText, 20, 20);
        pdf.addPage();
        pdf.text(20, 20, "The second page");
        
        let base64string = pdf.output("bloburl");
        debugBase64(base64string);

        function debugBase64 (base64string) {
            console.log($("#pdf-viewer"))
            console.log(base64string)
        }
        
        // pdf.save("jsPDF_2pages.pdf");
});
