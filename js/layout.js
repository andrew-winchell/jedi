// On Action Bar Expansion, toggle layout
let actionBarExpanded = false;
$("#incident-bar").on("calciteActionBarToggle", () => {
    actionBarExpanded = !actionBarExpanded;
    // visibility
    let visibility = actionBarExpanded ? true : false;
    $("#list-label")[0].hidden = visibility;
    $("#list-container")[0].hidden = visibility;
    $("#new-incident-btn")[0].hidden = visibility;
    $("#refresh-iwl")[0].hidden = visibility;
    $("#refresh-container")[0].hidden = visibility;

    // height
    let height = actionBarExpanded ? "80%" : "75%";
    $("#list-container").css("height", height);
    
    // width
    let width = actionBarExpanded ? "64px" : "173.3px";
    $(".survey").css("left", width);
    $(".survey").css("width", "calc(50% - " + width + ")");
});

// On viewer selection, toggle visibility and disable active button
$("#doc-view-btn").on("click", (e) => {
    e.target.active = true;
    $("#form-view-btn")[0].active = false;
    $("#form-viewer")[0].hidden = true;
    $("#doc-viewer")[0].hidden = false;
});
$("#form-view-btn").on("click", (e) => {
    e.target.active = true;
    $("#doc-view-btn")[0].active = false;
    $("#doc-viewer")[0].hidden = true;
    $("#form-viewer")[0].hidden = false;
});

// Survey section header
$("#module-tabs").on("calciteSegmentedControlChange", (e) => {
    let header = $("#survey-header")
    switch(e.target.value) {
        case "incident-details":
            header.html("JCAT Incident Details");
            break;
        case "1":
            header.html("JCAT Key Takeaways");
            break;
        case "2":
            header.html("JCAT Threats & Hazards Overview");
            break;
        case "3":
            header.html("JCAT IWA/IWL Stats");
            break;
        case "4":
            header.html("JCAT TFM Impacts and Outlook");
            break;
        case "5":
            header.html("JCAT Operational Response Measures");
            break;
        case "6":
            header.html("JCAT Response and Recovery Focus");
            break;
        case "7":
            header.html("JCAT Key Response Nodes");
            break;
        case "8":
            header.html("JCAT Approval");
            break;
    }
});