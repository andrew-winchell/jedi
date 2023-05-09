$("#refresh-iwl").on("click", () => {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter"
        });
        
        let refreshText = $("#refresh-text");
        console.log(refreshText)
        pdf.text("", 20, 20);
        pdf.addPage();
        pdf.text(20, 20, "The second page");
        
        let base64string = doc.output("bloburl");
        debugBase64(base64string);

        function debugBase64 (base64string) {
            console.log($("#pdf-viewer"))
        }
        
        //pdf.save("jsPDF_2pages.pdf");
});
