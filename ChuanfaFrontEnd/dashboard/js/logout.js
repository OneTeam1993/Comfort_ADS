$(document).ready(function () {

    //var logoutURL = 'http://66.96.208.81/tracking/';
    var logoutURL = '/';
    var getSessionstorageValueUser = sessionStorage.getItem('setSessionstorageValueUser');
    var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
    var getSessionstorageValueCompany = sessionStorage.getItem('setSessionstorageValueCompany');
    var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');

    //Click Logout
    document.getElementById("clickLogout").onclick = Logout;

    document.getElementById("clickLogoutEN").onclick = LogoutEN;


    function Logout() {

        var UpdateUser = {
            UserID: getSessionstorageValueUserID,
            LoginRetry: 10,
        };

        var updateUserApi = 'http://66.96.208.81/adswebapi/api/updateuserinfo?id=' + getSessionstorageValueUserID;

        $.ajax({
            url: updateUserApi,
            type: "PUT",
            data: JSON.stringify(UpdateUser),
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: false
            },
            permissions: ["http://*.asiacom.co.th"],
            success: function (UpdateUser) {
                console.log(UpdateUser);

                var getLocalstorageValueIP = sessionStorage.getItem('setSessionstorageValueIP');
                var getLocalstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
                var md = new MobileDetect(window.navigator.userAgent);
                var GetComputer = md.ua;

                var getUserLogout = {
                    AssetID: 0,
                    TagID: 0,
                    Timestamp: moment().format(),
                    RxTime: moment().format(),
                    StatusID: 12,
                    Remarks: getLocalstorageValueIP + " " + GetComputer,
                    AlertLevel: 0,
                    AlertLevelEx: 0,
                    Flag: 1,
                    AckUserID: getLocalstorageValueRoleID,
                    CompanyID: getSessionstorageValueCompanyID
                };


                $.ajax({
                    url: "http://66.96.208.81/adswebapi/api/eventinfo",
                    type: "POST",
                    data: JSON.stringify(getUserLogout),
                    crossDomain: true,
                    contentType: 'application/json; charset=utf-8',
                    xhrFields: {
                        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                        // This can be used to set the 'withCredentials' property.
                        // Set the value to 'true' if you'd like to pass cookies to the server.
                        // If this is enabled, your server must respond with the header
                        // 'Access-Control-Allow-Credentials: true'.
                        withCredentials: false
                    },
                    permissions: ["http://*.asiacom.co.th"],
                    success: function (getUserLogout) {
                        console.log(getUserLogout);
                        document.location = logoutURL;


                        //sessionStorage.removeItem("setSessionstorageValueUser");
                        //sessionStorage.clear();
                        sessionStorage.removeItem("setSessionstorageValuePerimeterLength");
                        sessionStorage.removeItem("setSessionstorageValueIgnition");
                        sessionStorage.removeItem("setSessionstorageValueEngine");
                        sessionStorage.removeItem("setSessionstorageValueCompany");
                        sessionStorage.removeItem("setSessionstorageValueCompanyID");
                        sessionStorage.removeItem("setSessionstorageValueEmail");
                        sessionStorage.removeItem("setSessionstorageValueName");
                        sessionStorage.removeItem("setSessionstorageValueRoleDesc");
                        sessionStorage.removeItem("setSessionstorageValueUser");
                        localStorage.clear();
                        //window.location.reload(true);
                        window.location.href = 'http://66.96.208.81/tracking/';
                        //window.location.href = '/';

                    }


                });



                return false;
            }
        });

     
    }

    function LogoutEN() {

        var UpdateUser = {
            UserID: getSessionstorageValueUserID,
            LoginRetry: 10,
        };

        var updateUserApi = 'http://66.96.208.81/adswebapi/api/updateuserinfo?id=' + getSessionstorageValueUserID;

        $.ajax({
            url: updateUserApi,
            type: "PUT",
            data: JSON.stringify(UpdateUser),
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: false
            },
            permissions: ["http://*.asiacom.co.th"],
            success: function (UpdateUser) {
                console.log(UpdateUser);

                var getLocalstorageValueIP = sessionStorage.getItem('setSessionstorageValueIP');
                var getLocalstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
                var md = new MobileDetect(window.navigator.userAgent);
                var GetComputer = md.ua;

                var getUserLogout = {
                    AssetID: 0,
                    TagID: 0,
                    Timestamp: moment().format(),
                    RxTime: moment().format(),
                    StatusID: 12,
                    Remarks: getLocalstorageValueIP + " " + GetComputer,
                    AlertLevel: 0,
                    AlertLevelEx: 0,
                    Flag: 1,
                    AckUserID: getLocalstorageValueRoleID,
                    CompanyID: getSessionstorageValueCompanyID
                };


                $.ajax({
                    url: "http://66.96.208.81/adswebapi/api/eventinfo",
                    type: "POST",
                    data: JSON.stringify(getUserLogout),
                    crossDomain: true,
                    contentType: 'application/json; charset=utf-8',
                    xhrFields: {
                        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                        // This can be used to set the 'withCredentials' property.
                        // Set the value to 'true' if you'd like to pass cookies to the server.
                        // If this is enabled, your server must respond with the header
                        // 'Access-Control-Allow-Credentials: true'.
                        withCredentials: false
                    },
                    permissions: ["http://*.asiacom.co.th"],
                    success: function (getUserLogout) {
                        console.log(getUserLogout);
                        document.location = logoutURL;


                        //sessionStorage.removeItem("setSessionstorageValueUser");
                        //sessionStorage.clear();
                        sessionStorage.removeItem("setSessionstorageValuePerimeterLength");
                        sessionStorage.removeItem("setSessionstorageValueIgnition");
                        sessionStorage.removeItem("setSessionstorageValueEngine");
                        sessionStorage.removeItem("setSessionstorageValueCompany");
                        sessionStorage.removeItem("setSessionstorageValueCompanyID");
                        sessionStorage.removeItem("setSessionstorageValueEmail");
                        sessionStorage.removeItem("setSessionstorageValueName");
                        sessionStorage.removeItem("setSessionstorageValueRoleDesc");
                        sessionStorage.removeItem("setSessionstorageValueUser");
                        localStorage.clear();
                        //window.location.reload(true);
                        window.location.href = 'http://66.96.208.81/tracking/';
                        //window.location.href = '/';

                    }


                });



                return false;
            }
        });


    }


    

});


