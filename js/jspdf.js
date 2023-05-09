$("#refresh-iwl").on("click", () => {
        const pdf = new jsPDF({
            orientation: "portrait",
            format: "letter"
        });
        
        pdf.text("Generate a PDF with JavaScript", 20, 20);
        pdf.addPage();
        pdf.text(20, 20, "The second page");
        pdf.save("jsPDF_2pages.pdf");
});
