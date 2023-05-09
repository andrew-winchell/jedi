$("#refresh-iwl").on("click", () => {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter"
        });
        
        let refreshText = $("#refresh-text")[0].value;
        pdf.text(refreshText, 20, 20);
        pdf.addPage();
        pdf.text(20, 20, "The second page");
        pdf.output("datauri", "generated.pdf")
        
        //pdf.save("jsPDF_2pages.pdf");
});
