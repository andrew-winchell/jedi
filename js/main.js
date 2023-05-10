require([
    "esri/portal/Portal",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "esri/portal/PortalQueryParams",
    "esri/layers/FeatureLayer"
], function(Portal, OAuthInfo, esriId, PortalQueryParams, FeatureLayer){
    
    // esri agol authorization
    const info = new OAuthInfo({
        appId: "JAou9EbthRUw4TIJ",
        portalURL: "https://faasysops.maps.arcgis.com",
        authNamespace: "portal_oauth_inline",
        flowType: "auto",
        popup: false
    });
    esriId.registerOAuthInfos([info]);
    esriId.getCredential(info.portalUrl + "/sharing");
    esriId.checkSignInStatus(info.portalURL + "/sharing")
        .then(() => {
            console.log("Sign in successful.")
        }).catch(() => {
            console.log("User not signed in")
        });

    // IWA/IWL Layer
    const JCATMasterLayer = new FeatureLayer({
        portalItem: { id: "f7023ca104044f9ea07b8f9bff525189" }
    });
    
    // load incident list
    JCATMasterLayer.queryFeatures().then((results) => {
        for (const feature of results.features) {
            if (feature.attributes.incident_name != null) {
                $("#incident-list").append(
                    "<calcite-list-item label='" + feature.attributes.incident_name + "'></calcite-list-item>"
                )
            }
        };
        
        // update refresh time
        let currentDate = new Date();
        let dateTime = "Last Refreshed: <br>" + (currentDate.getMonth()+1) + "/"
                    + currentDate.getDate() + "/"
                    + currentDate.getFullYear() + " "
                    + currentDate.toLocaleTimeString()
        $("#refresh-text").html(dateTime);
    });

    // Refresh IWLs
    $("#refresh-iwl").on("click", () => {
        let currentDate = new Date();
        let dateTime = "Last Refreshed: <br>" + (currentDate.getMonth()+1) + "/"
                    + currentDate.getDate() + "/"
                    + currentDate.getFullYear() + " "
                    + currentDate.toLocaleTimeString();
        $("#refresh-text").html(dateTime);
    });

    // filter incident list
    $("#incident-filter").on("calciteFilterChange", (e) => {
        let incidentItems = $("#incident-list")[0].children;
        let filterText = e.target.value.toUpperCase();
        for (const item of incidentItems) {
            let name = item.label.toUpperCase();
            if (!name.includes(filterText)) {
                item.hidden = true;
            } else {
                item.hidden = false;
            }
        };
    });

    // select an incident and populate relevent data
    $("#incident-list").on("click", (e) => {
        let incidentName = e.target.label;
        let query = JCATMasterLayer.createQuery();
        query.where = "incident_name = '" + incidentName + "'";
        JCATMasterLayer.queryFeatures(query)
            .then((results) => {
                let feature = results.features[0];
                $("#kt-incident-name").text(feature.attributes.incident_name);
                $("#kt-incident-id")[0].text(feature.attributes.incident);
                $("#kt-report-id")[0].text(feature.attributes.report);
            })
    });
})