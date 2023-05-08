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
        console.log(results)
        for (const feature of results.features) {
            if (feature.attributes.incident_name != null) {
                $("#incident-list").append(
                    "<calcite-list-item label='" + feature.attributes.incident_name + "'></calcite-list-item>"
                )
            }
        };
        console.log(Date());
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
})