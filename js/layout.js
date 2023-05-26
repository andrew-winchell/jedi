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
    $("#incident-filter")[0].hidden = visibility;

    // height
    let height = actionBarExpanded ? "80%" : "75%";
    $("#list-container").css("height", height);
    
    // width
    let width = actionBarExpanded ? "48px" : "173.3px";
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
    $(".module-container").hide();
    $("#mode-container").hide();
    $("#mode-expander").hide();
    let header = $("#survey-header")
    switch(e.target.value) {
        case "incident-details":
            header.html("JCAT Incident Details");
            $("#incident-details-container").show();
            $("#mode-container").show();
            $("#mode-expander").show();
            break;
        case "1":
            header.html("JCAT Key Takeaways");
            $("#module1-container").show();
            break;
        case "2":
            header.html("JCAT Threats & Hazards Overview");
            $("#module2-container").show();
            break;
        case "3":
            header.html("JCAT IWA/IWL Stats");
            $("#module3-container").show();
            break;
        case "4":
            header.html("JCAT TFM Impacts and Outlook");
            $("#module4-container").show();
            break;
        case "5":
            header.html("JCAT Operational Response Measures");
            $("#module5-container").show();
            break;
        case "6":
            header.html("JCAT Response and Recovery Focus");
            $("#module6-container").show();
            break;
        case "7":
            header.html("JCAT Key Response Nodes");
            $("#module7-container").show();
            break;
        case "8":
            header.html("JCAT Approval");
            $("#module8-container").show();
            break;
    }
});

// Survey mode panel slide toggle
$("#mode-expander").on("click", (e) => {
    $("#mode-container").slideToggle("slow");
    let icon = $("#mode-expander")[0].iconStart;
    console.log(icon)
    if (icon == "chevron-up") {
        $("#mode-expander")[0].iconStart = "chevron-down";
    } else {
        $("#mode-expander")[0].iconStart = "chevron-up";
    }
});

// Add new key takeaway bullets
$("#key-takeaways-btn").on("click", (e) => {
    $("#key-takeaways").append("<div draggable='true' class='listItemClass keyTakeawayContainer'><calcite-button icon-start='handle-vertical' class='handle' slot='action' scale='s' appearance='transparent' kind='neutral'></calcite-button><calcite-input placeholder='Enter takeaway' max-length='250' type='textarea' class='takeaways'><calcite-button icon-start='trash' slot='action' scale='l' appearance='transparent' kind='neutral'></calcite-button></calcite-input></div>")
    delay(100)
        .then(() => {
            let takeaways = $(".takeaways");
            for (const ta of takeaways) {
                $($(ta)[0].shadowRoot.children[0].children[0].children[0]).css("height", "150px");
            }
        });
});

// Drag key takeaway bullets
$(() => {
    let width = $(window).width;
    $("#key-takeaways").resizable();
});

$(() => {
    $("#key-takeaways").sortable({ handle: ".handle" });
});

delay(1000).then(() => {
    $($("#th-overview")[0].shadowRoot.children[0].children[0].children[0]).css("height", "250px")
})

$(".form-container").css("height", "calc(100% - " + $("#tab-container").css("height") + ")")
    
function delay (time) {
    return new Promise(resolve => setTimeout(resolve, time));
}