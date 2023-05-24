import jsPDF from 'jspdf';
import { pdfContent } from './jspdf.js'

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
                console.log(results);
                // Incident Details inputs
                $("#incident-id")[0].value = feature.attributes.incident;
                $("#incident-name")[0].value = feature.attributes.incident_name;
                $("#incident-type")[0].value = feature.attributes.incident_type;
                //$("#iwl-names")[0].value = feature.attributes.;
                $("#report-id")[0].value = feature.attributes.report;
                $("#incident-locations")[0].value = feature.attributes.incident_locations;
                $("#incident-starttime")[0].valueAsNumber = feature.attributes.incident_start_dtg;
                $("#report-starttime")[0].valueAsNumber = feature.attributes.report_dtg;
                //$("#threat-name")[0].value = 
                $("#incident-status")[0].value = feature.attributes.inc_status.slice(4);

                const kt_query = {
                    outFields: ["*"],
                    relationshipId: 0,
                    objectIds: feature.attributes.objectid
                };

                JCATMasterLayer.queryRelatedFeatures(kt_query)
                    .then((kt_results) => {
                        console.log(kt_results)
                });

                // Key Takeaways inputs
                $("#kt-incident-name").text(feature.attributes.incident_name);
                $("#kt-incident-id").text(feature.attributes.incident);
                $("#kt-report-id").text(feature.attributes.report);
            });
        pdfContent();
    });

    $("#sub-incident-form").on("click", (e) => {
        let formValues = [];
        formValues.push($("#incident-type")[0].value);
        console.log(formValues);
    });

    $("#incident-form").on("submit", (self) => {
        formValidation(self);
    });
})