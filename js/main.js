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

    const JCATMasterLayer = new FeatureLayer({
        portalItem: { id: "f7023ca104044f9ea07b8f9bff525189" }
    });
    
    JCATMasterLayer.queryFeatures().then((results) => {
        console.log(results)
        for (const feature of results.features) {
            if (feature.attributes.incident_name != null) {
                $("#incident-list").append(
                    "<calcite-list-item label='" + feature.attributes.incident_name + "'></calcite-list-item>"
                )
                console.log("<calcite-list-item label='" + feature.attributes.incident_name + "'></calcite-list-item>")
            }
        }
    });

    $("#incident-filter").on("calciteFilterChange", (e) => {
        let incidentItems = $("#incident-list")[0].children
        console.log($("#incident-list")[0])
        for (const item of incidentItems) {
            if (!item.label.includes(e.target.value)) {
                item.hidden = true;
            } else {
                item.hidden = false;
            }
        }
        
    })
})