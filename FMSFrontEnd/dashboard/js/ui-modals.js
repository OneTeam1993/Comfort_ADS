

$(document).ready(function () {


    // Vehicle Submit
    $('#submit-vehicle').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });


        //bootbox.confirm("Are you sure you wish to submit?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการ จะส่ง ?</div>", function (result) {
            if (result) {

                //setTimeout(function () { $('#vehicles-editable').bootstrapTable('refresh'); }, '5000');
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Successful',
                    message: 'ที่ประสบความสำเร็จ',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/assetinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }

                var getZones = $('#assetZone').val();
                var ObjZones = JSON.stringify(getZones);
                var parseObjAssets = ObjZones.replace(/\[|\"|\]/g, "");

                var assets = {
                    AssetID: $('#assetID').val(),
                    Name: $('#assetName').val(),
                    Category: $('#assetCategory').val(),
                    Tag: $('#assetDevice').val(),
                    CompanyID: $('#assetCompany').val(),
                    DriverID: $('#assetDriver').val(),
                    Phone: $('#assetPhone').val(),
                    Email: $('#assetEmail').val(),
                    Image: $('#assetImage').val(),
                    AlertZones: parseObjAssets,
                    Mileage: $('#assetMileage').val(),
                    DistanceAlert: $('#assetDistanceAlert').val(),
                    DateAlert: $('#assetDateAlert').val(),
                    IdlingLimit: $('#assetIdlingLimit').val(),
                    SpeedLimit: $('#assetSpeedLimit').val(),
                    Notifications: $('#assetNotifications').val(),
                    //CurfewStart: $('#assetInstallDate').val()
                    InstallDate: $('#assetInstallDate').val()
                };

                var getUser = sessionStorage.getItem('setSessionstorageValueUser');
                var getCompany = sessionStorage.getItem('setSessionstorageValueCompany');

                var emailAssets = {
                    Sender: "ADs",
                    Recipients: "support@asiacom.co.th",
                    Message: "[ADS - " + assets.Company + "]Vehicle Added: " + getUser + " - " + assets.Name + " (" + assets.InstallDate + ")",
                    Timestamp: moment().format(),
                    RxTime: moment().format(),
                    Flag: 1,
                    CompanyID: getCompany,
                    AssetID: assets.AssetID
                };


                $.ajax({
                    url: "http://track.asiacom.co.th/adswebapi/api/messageinfo",
                    type: "POST",
                    data: JSON.stringify(emailAssets),
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
                    success: function (emailAssets) {
                        // console.log(emailAssets);
                    }
                });


                var GetAssetID = $('#assetID').val();

                if (assets.AssetID == 'undefined' || assets.AssetID == null || assets.AssetID == 0 || assets.AssetID != GetAssetID) {


                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/assetinfo",
                        type: "POST",
                        data: JSON.stringify(assets),
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
                        success: function (assets) {
                            // console.log(assets);
                            window.location.reload(true);
                        }
                    });

                }

                else {

                    var updateAsset = 'http://track.asiacom.co.th/adswebapi/api/assetinfo?id=' + assets.AssetID;

                    $.ajax({
                        url: updateAsset,
                        type: "PUT",
                        data: JSON.stringify(assets),
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
                        success: function (assets) {
                            // console.log(assets);
                            window.location.reload(true);
                        }
                    });

                }

            }

            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Canceled',
                    message: 'ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });

    });
    $('#submit-vehicleEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });


        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {
            if (result) {

                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/assetinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }

                var getZones = $('#assetZoneEN').val();
                var ObjZones = JSON.stringify(getZones);
                var parseObjAssets = ObjZones.replace(/\[|\"|\]/g, "");

                var assets = {
                    AssetID: $('#assetID').val(),
                    Name: $('#assetNameEN').val(),
                    Category: $('#assetCategory').val(),
                    Tag: $('#assetDevice').val(),
                    //CompanyID: $('#assetCompany').val(),
                    CompanyID: $('#assetCompany').val(),
                    DriverID: $('#assetDriver').val(),
                    Phone: $('#assetPhoneEN').val(),
                    Email: $('#assetEmailEN').val(),
                    Image: $('#assetImage').val(),
                    AlertZones: parseObjAssets,
                    Mileage: $('#assetMileageEN').val(),
                    DistanceAlert: $('#assetDistanceAlertEN').val(),
                    DateAlert: $('#assetDateAlertEN').val(),
                    IdlingLimit: $('#assetIdlingLimitEN').val(),
                    SpeedLimit: $('#assetSpeedLimitEN').val(),
                    //Notifications: $('#assetNotifications').val(),
                    //CurfewStart: $('#assetInstallDate').val()
                    InstallDate: $('#assetInstallDate').val()
                };

                var GetAssetID = $('#assetID').val();
                var getUser = sessionStorage.getItem('setSessionstorageValueUser');
                var getCompany = sessionStorage.getItem('setSessionstorageValueCompanyID');

                var emailAssets = {
                    Sender: "ADS",
                    Recipients: "support@asiacom.co.th",
                    Message: "[ADS - " + assets.Company + "]Vehicle Added: " + getUser + " - " + assets.Name + " (" + assets.InstallDate + ")",
                    Timestamp: moment().format(),
                    RxTime: moment().format(),
                    Flag: 1,
                    CompanyID: getCompany,
                    AssetID: assets.AssetID
                };

                if (assets.AssetID == 'undefined' || assets.AssetID == null || assets.AssetID == 0 || assets.AssetID != GetAssetID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/messageinfo",
                        type: "POST",
                        data: JSON.stringify(emailAssets),
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
                        success: function (emailAssets) {
                            // console.log(emailAssets);       
                            window.location.reload(true);
                        }
                    });

                }

                if (assets.AssetID == 'undefined' || assets.AssetID == null || assets.AssetID == 0 || assets.AssetID != GetAssetID) {


                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/assetinfo",
                        type: "POST",
                        data: JSON.stringify(assets),
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
                        success: function (assets) {
                            //console.log(assets);
                            window.location.reload(true);
                        }
                    });

                    // window.location.reload(true);

                }

                else {

                    var updateAsset = 'http://track.asiacom.co.th/adswebapi/api/assetinfo?id=' + assets.AssetID;

                    $.ajax({
                        url: updateAsset,
                        type: "PUT",
                        data: JSON.stringify(assets),
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
                        success: function (assets) {
                            //  console.log(assets);
                            window.location.reload(true);
                        }
                    });

                }

            }

            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });

    });

    //Confirm Delete Row Vehicles
    $('#vehicle-confirm-delete').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to delete?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจว่า คุณต้องการลบ ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    //message: 'ประสบความสำเร็จ ที่ถูกลบ',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var assets = JSON.stringify({ 'AssetId': row.AssetID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/assetinfo/' + row.AssetID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(assets),
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
                        success: function (assets) {
                            console.log(assets);
                        }
                    });

                    return row.AssetID
                });


                $table.bootstrapTable('remove', {
                    field: 'AssetID',
                    values: ids
                });


                $remove.prop('disabled', true);

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'ลบ ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });



    });
    $('#vehicle-confirm-deleteEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        //bootbox.confirm("Are you sure you wish to delete?", function (result) {

        bootbox.confirm("<div style='color:black'>Are you sure you want to delete ?</div>", function (result) {

            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'Deleted Successfully',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var assets = JSON.stringify({ 'AssetId': row.AssetID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/assetinfo/' + row.AssetID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(assets),
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
                        success: function (assets) {
                            console.log(assets);
                        }
                    });

                    return row.AssetID
                });


                $table.bootstrapTable('remove', {
                    field: 'AssetID',
                    values: ids
                });


                $remove.prop('disabled', true);




            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'Delete Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });



    });

    // =================================================================

    //Submit Zones
    $('#submit-zones').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
        var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
        var getSessionstorageValueUser = sessionStorage.getItem('setSessionstorageValueUser');

        var zoneName = $('#zoneNameEN').val();

        var perimeter = $('.validationPerimeter').val();


        if (perimeter == "" | perimeter == null | perimeter == "undefined" | zoneName == "" | zoneName == null | zoneName == "undefined") {

            alert('กรุณากรอกข้อมูล ที่ว่างเปล่า');

        }

        else {

            bootbox.setDefaults({
                /**
                 * @optional String
                 * @default: en
                 * which locale settings to use to translate the three
                 * standard button labels: OK, CONFIRM, CANCEL
                 */
                locale: "th",


            });


            //bootbox.confirm("Are you sure you wish to submit?", function (result) {
            bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการ จะส่ง ?</div>", function (result) {
                if (result) {
                    // window.location.reload(true);
                    $.niftyNoty({
                        type: 'success',
                        icon: 'fa fa-check',
                        //message: 'Successful',
                        message: 'ที่ประสบความสำเร็จ',
                        container: 'floating',
                        timer: 3000
                    });

                    jQuery.support.cors = true;

                    function createCORSRequest(method, url) {
                        var xhr = new XMLHttpRequest();
                        if ("withCredentials" in xhr) {

                            // Check if the XMLHttpRequest object has a "withCredentials" property.
                            // "withCredentials" only exists on XMLHTTPRequest2 objects.
                            xhr.open(method, url, true);

                        } else if (typeof XDomainRequest != "undefined") {

                            // Otherwise, check if XDomainRequest.
                            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                            xhr = new XDomainRequest();
                            xhr.open(method, url);

                        } else {

                            // Otherwise, CORS is not supported by the browser.
                            xhr = null;

                        }
                        return xhr;
                    }

                    var url = 'http://track.asiacom.co.th/adswebapi/api/zoneinfo';
                    var xhr = createCORSRequest('GET', url);
                    xhr.send();
                    if (!xhr) {
                        throw new Error('CORS not supported');
                    }

                    var getCreatedDate = "";

                    if (getCreatedDate != "") {
                        getCreatedDate = $('#zoneDateCreated').val();
                    } else {
                        getCreatedDate = moment().format('D-MMM-YYYY, hh:mm:ss A');
                    }

                    var zones = {
                        ZoneID: $('#zoneID').val(),
                        Name: $('#zoneName').val(),
                        //Type: $('#zoneType').val(),
                        TypeID: $('#zoneTypeID').val(),
                        CompanyID: $('#zoneCompany').val(),
                        Perimeter: $('#Perimeter').val(),
                        CreatedDate: getCreatedDate,
                        //MCC: $('#zoneMCC').val(),
                        //MNC: $('#zoneMNC').val(),
                        //LAC: $('#zoneLAC').val(),
                        CellIds: $('#zoneCellID').val(),
                        Created_UserID: getSessionstorageValueUserID,
                        Modified_UserID: getSessionstorageValueUserID,
                        Created_User: getSessionstorageValueUser,
                        Modified_User: getSessionstorageValueUser,
                        Color: $('#zoneColor').val()
                    };

                    var GetZoneID = $('#zoneID').val();

                    if (zones.ZoneID == 'undefined' || zones.ZoneID == null || zones.ZoneID == 0 || zones.ZoneID != GetZoneID) {

                        $.ajax({
                            url: "http://track.asiacom.co.th/adswebapi/api/zoneinfo",
                            type: "POST",
                            data: JSON.stringify(zones),
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
                            success: function (zones) {
                                //console.log(zones);

                                //var getZoneID = $('#zoneID').val();
                                //var getZoneName = $('#zoneName').val();
                                //var getZoneTypeID = $('#zoneTypeID').val();
                                //var getZoneTypeDesc = getZoneTypeIDDescText;
                                //var getCompanyID = $('#zoneCompany').val();
                                //var getCompany = getZoneCompanyText;
                                //var getDateCreated = $('#zoneDateCreated').val();
                                sessionStorage.removeItem("setSessionstorageValuePerimeterLength");
                                sessionStorage.removeItem("setSessionstorageValueZoneID");
                                sessionStorage.removeItem("setSessionstorageValueZoneName");
                                sessionStorage.removeItem("setSessionstorageValueZoneTypeID");
                                sessionStorage.removeItem("setSessionstorageValueZoneTypeDesc");
                                sessionStorage.removeItem("setSessionstorageValueZoneCompany");
                                sessionStorage.removeItem("setSessionstorageValueZoneCompanyID");
                                sessionStorage.removeItem("setSessionstorageValueZoneDateCreated");

                                window.location.reload(true);
                                //window.location = "/Dashboard/zones.html"

                            }
                        });
                    }

                    else {


                        var updateZone = 'http://track.asiacom.co.th/adswebapi/api/zoneinfo?id=' + zones.ZoneID;

                        $.ajax({
                            url: updateZone,
                            type: "PUT",
                            data: JSON.stringify(zones),
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
                            success: function (zones) {
                                console.log(zones);
                                sessionStorage.removeItem("setSessionstorageValuePerimeterLength");
                                sessionStorage.removeItem("setSessionstorageValueZoneID");
                                sessionStorage.removeItem("setSessionstorageValueZoneName");
                                sessionStorage.removeItem("setSessionstorageValueZoneTypeID");
                                sessionStorage.removeItem("setSessionstorageValueZoneTypeDesc");
                                sessionStorage.removeItem("setSessionstorageValueZoneCompany");
                                sessionStorage.removeItem("setSessionstorageValueZoneCompanyID");
                                sessionStorage.removeItem("setSessionstorageValueZoneDateCreated");

                                window.location.reload(true);
                                //window.location = "/th/Dashboard/zones.html"
                            }
                        });


                    }

                }


                else {
                    $.niftyNoty({
                        type: 'danger',
                        icon: 'fa fa-minus',
                        //message: 'Canceled',
                        message: 'ยกเลิก',
                        container: 'floating',
                        timer: 3000
                    });
                };

            });

        }

    });
    $('#submit-zonesEN').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
        var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
        var getSessionstorageValueUser = sessionStorage.getItem('setSessionstorageValueUser');

        var zoneName = $('#zoneNameEN').val();

        var perimeter = $('.validationPerimeter').val();


        if (perimeter == "" | perimeter == null | perimeter == "undefined" | zoneName == "" | zoneName == null | zoneName == "undefined") {

            alert('Please fill out empty fields');

        }

        else {
            bootbox.setDefaults({
                /**
                 * @optional String
                 * @default: en
                 * which locale settings to use to translate the three
                 * standard button labels: OK, CONFIRM, CANCEL
                 */
                locale: "en",


            });


            bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {
                if (result) {
                    $.niftyNoty({
                        type: 'success',
                        icon: 'fa fa-check',
                        message: 'Successful',
                        container: 'floating',
                        timer: 3000
                    });

                    jQuery.support.cors = true;

                    function createCORSRequest(method, url) {
                        var xhr = new XMLHttpRequest();
                        if ("withCredentials" in xhr) {

                            // Check if the XMLHttpRequest object has a "withCredentials" property.
                            // "withCredentials" only exists on XMLHTTPRequest2 objects.
                            xhr.open(method, url, true);

                        } else if (typeof XDomainRequest != "undefined") {

                            // Otherwise, check if XDomainRequest.
                            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                            xhr = new XDomainRequest();
                            xhr.open(method, url);

                        } else {

                            // Otherwise, CORS is not supported by the browser.
                            xhr = null;

                        }
                        return xhr;
                    }

                    var url = 'http://track.asiacom.co.th/adswebapi/api/zoneinfo';
                    var xhr = createCORSRequest('GET', url);
                    xhr.send();
                    if (!xhr) {
                        throw new Error('CORS not supported');
                    }

                    var getCreatedDate = "";

                    if (getCreatedDate != "") {
                        getCreatedDate = $('#zoneDateCreated').val();
                    } else {
                        getCreatedDate = moment().format('D-MMM-YYYY, hh:mm:ss A');
                    }


                    var zones = {
                        ZoneID: $('#zoneID').val(),
                        Name: $('#zoneNameEN').val(),
                        //Type: $('#zoneType').val(),
                        TypeID: $('#zoneTypeIDEN').val(),
                        CompanyID: $('#zoneCompany').val(),
                        Perimeter: $('#Perimeter').val(),
                        CreatedDate: getCreatedDate,
                        //MCC: $('#zoneMCC').val(),
                        //MNC: $('#zoneMNC').val(),
                        //LAC: $('#zoneLAC').val(),
                        CellIds: $('#zoneCellID').val(),
                        Created_UserID: getSessionstorageValueUserID,
                        Modified_UserID: getSessionstorageValueUserID,
                        Created_User: getSessionstorageValueUser,
                        Modified_User: getSessionstorageValueUser,
                        Color: $('#zoneColor').val()

                    };

                    var GetZoneID = $('#zoneID').val();

                    if (zones.ZoneID == 'undefined' || zones.ZoneID == null || zones.ZoneID == 0 || zones.ZoneID != GetZoneID) {

                        $.ajax({
                            url: "http://track.asiacom.co.th/adswebapi/api/zoneinfo",
                            type: "POST",
                            data: JSON.stringify(zones),
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
                            success: function (zones) {
                                //console.log(zones);

                                //var getZoneID = $('#zoneID').val();
                                //var getZoneNameEN = $('#zoneNameEN').val();
                                //var getZoneTypeIDEN = $('#zoneTypeIDEN').val();                           
                                //var getZoneTypeDescEN = getZoneTypeIDDescTextEN;
                                //var getCompanyID = $('#zoneCompany').val();
                                //var getCompany = getZoneCompanyText;
                                //var getDateCreated = $('#zoneDateCreated').val();
                                sessionStorage.removeItem("setSessionstorageValuePerimeterLength");
                                sessionStorage.removeItem("setSessionstorageValueZoneID");
                                sessionStorage.removeItem("setSessionstorageValueZoneNameEN");
                                sessionStorage.removeItem("setSessionstorageValueZoneTypeIDEN");
                                sessionStorage.removeItem("setSessionstorageValueZoneTypeDescEN");
                                sessionStorage.removeItem("setSessionstorageValueZoneCompany");
                                sessionStorage.removeItem("setSessionstorageValueZoneCompanyID");
                                sessionStorage.removeItem("setSessionstorageValueZoneDateCreated");
                                sessionStorage.removeItem("setSessionstorageValueZoneColor");

                                //window.location = "th/Dashboard/zones.html"
                                window.location.reload(true);
                            }
                        });
                    }

                    else {


                        var updateZone = 'http://track.asiacom.co.th/adswebapi/api/zoneinfo?id=' + zones.ZoneID;

                        $.ajax({
                            url: updateZone,
                            type: "PUT",
                            data: JSON.stringify(zones),
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
                            success: function (zones) {
                                console.log(zones);
                                sessionStorage.removeItem("setSessionstorageValueZoneID");
                                sessionStorage.removeItem("setSessionstorageValueZoneNameEN");
                                sessionStorage.removeItem("setSessionstorageValueZoneTypeIDEN");
                                sessionStorage.removeItem("setSessionstorageValueZoneTypeDescEN");
                                sessionStorage.removeItem("setSessionstorageValueZoneCompany");
                                sessionStorage.removeItem("setSessionstorageValueZoneCompanyID");
                                sessionStorage.removeItem("setSessionstorageValueZoneDateCreated");
                                sessionStorage.removeItem("setSessionstorageValueZoneColor");

                                window.location.reload(true);
                                //window.location = "/th/Dashboard/zones.html"
                                // window.location.reload(true);
                            }
                        });


                    }

                }


                else {
                    $.niftyNoty({
                        type: 'danger',
                        icon: 'fa fa-minus',
                        message: 'Canceled',
                        container: 'floating',
                        timer: 3000
                    });
                };

            });
        }
    });

    //Confirm Delete Row Zones
    $('#zone-confirm-delete').on('click', function () {


        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to delete zone/s?", function(result) {
        bootbox.confirm("<div style='color:black'>คคุณแน่ใจหรือว่า ต้องการลบ โซน ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message : 'Deleted Successfully',
                    message: 'ประสบความสำเร็จ ที่ถูกลบ',
                    container: 'floating',
                    timer: 3000
                });

                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var zones = JSON.stringify({ 'ZoneId': row.ZoneID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/zoneinfo/' + row.ZoneID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(zones),
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
                        success: function (zones) {
                            console.log(zones);
                        }
                    });

                    return row.ZoneID
                });
                $table.bootstrapTable('remove', {
                    field: 'ZoneID',
                    values: ids
                });
                $remove.prop('disabled', true);



            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message : 'Delete Canceled',
                    message: 'ลบ ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });
    $('#zone-confirm-deleteEN').on('click', function () {


        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        //bootbox.confirm("Are you sure you wish to delete zone/s?", function(result) {
        bootbox.confirm("<div style='color:black'>Are you sure you want to delete ?</div>", function (result) {
            if (result) {

                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message : 'Deleted Successfully',
                    message: 'Deleted Successfully',
                    container: 'floating',
                    timer: 3000
                });

                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var zones = JSON.stringify({ 'ZoneId': row.ZoneID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/zoneinfo/' + row.ZoneID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(zones),
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
                        success: function (zones) {
                            console.log(zones);
                            sessionStorage.removeItem("setSessionstorageValuePerimeterLength");
                            window.location.reload(true);
                        }
                    });

                    return row.ZoneID
                });
                $table.bootstrapTable('remove', {
                    field: 'ZoneID',
                    values: ids
                });
                $remove.prop('disabled', true);



            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message : 'Delete Canceled',
                    message: 'Delete Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });

    // =================================================================

    //Submit Company
    $('#submit-company').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to submit?", function (result) {
        bootbox.confirm("ค<div style='color:black'>คุณแน่ใจหรือว่า ต้องการ จะส่ง ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Successful',
                    message: 'ที่ประสบความสำเร็จ',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/companyinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }

                var getResellerID;
                if (getSessionstorageValueRoleID == 1) {

                    getResellerID = $('#companyReseller').val();
                }
                else {

                    getResellerID = getSessionstorageValueUserResellerID
                }

                var getReports = $('#companyReport').val();
                var ObjReports = JSON.stringify(getReports);
                var parseObjReports = ObjReports.replace(/\[|\"|\]/g, "");

                var company = {
                    CompanyID: $('#companyID').val(),
                    //Flag: $('#companyStatus').val(),
                    Flag: 1,
                    Name: $('#companyName').val(),
                    Address: $('#companyAddress').val(),
                    Email: $('#companyEmail').val(),
                    Phone: $('#companyPhone').val(),
                    //UserLimit: $('#companyUserLimit').val(),
                    //ZoneLimit: $('#companyZoneLimit').val(),
                    //AssetLimit: $('#companyVehicleLimit').val(),
                    //SmsLimit: $('#companySmsLimit').val(),
                    Categories: $('#companyCategory').val(),
                    Image: $('#companyImage').val(),
                    Reports: getReports

                };

                var GetCompanyID = $('#companyID').val();

                if (company.CompanyID == 'undefined' || company.CompanyID == null || company.CompanyID == 0 || company.CompanyID != GetCompanyID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/companyinfo",
                        type: "POST",
                        data: JSON.stringify(company),
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
                        success: function (company) {
                            console.log(company);
                        }
                    });
                }

                else {


                    var updateCompany = 'http://track.asiacom.co.th/adswebapi/api/companyinfo?id=' + company.CompanyID;

                    $.ajax({
                        url: updateCompany,
                        type: "PUT",
                        data: JSON.stringify(company),
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
                        success: function (company) {
                            console.log(company);
                        }
                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Canceled',
                    message: 'ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });
    $('#submit-companyEN').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {

            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/companyinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var getResellerID;
                if (getSessionstorageValueRoleID == 1) {

                    getResellerID = $('#companyReseller').val();
                }
                else {

                    getResellerID = getSessionstorageValueUserResellerID
                }


                var getReports = $('#companyReportEN').val();
                var ObjReports = JSON.stringify(getReports);
                var parseObjReports = ObjReports.replace(/\[|\"|\]/g, "");

                var company = {
                    CompanyID: $('#companyID').val(),
                    //Flag: $('#companyStatus').val(),
                    Flag: 1,
                    Name: $('#companyNameEN').val(),
                    Address: $('#companyAddressEN').val(),
                    Email: $('#companyEmailEN').val(),
                    Phone: $('#companyPhoneEN').val(),
                    //UserLimit: $('#companyUserLimitEN').val(),
                    //ZoneLimit: $('#companyZoneLimitEN').val(),
                    //AssetLimit: $('#companyVehicleLimitEN').val(),
                    //SmsLimit: $('#companySmsLimitEN').val(),
                    Categories: $('#companyCategoryEN').val(),
                    Image: $('#companyImage').val(),
                    Reports: parseObjReports,
                    ResellerID: getResellerID

                };

                var GetCompanyID = $('#companyID').val();

                if (company.CompanyID == 'undefined' || company.CompanyID == null || company.CompanyID == 0 || company.CompanyID != GetCompanyID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/companyinfo",
                        type: "POST",
                        data: JSON.stringify(company),
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
                        success: function (company) {
                            console.log(company);
                        }
                    });
                }

                else {


                    var updateCompany = 'http://track.asiacom.co.th/adswebapi/api/companyinfo?id=' + company.CompanyID;

                    $.ajax({
                        url: updateCompany,
                        type: "PUT",
                        data: JSON.stringify(company),
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
                        success: function (company) {
                            console.log(company);
                        }
                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });

    });
    $('#submit-company-mobileEN').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {

            if (result) {
               
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/companyinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var getResellerID;
                if (getSessionstorageValueRoleID == 1) {

                    getResellerID = $('#mobile-companyResellerEN').val();
                }
                else {

                    getResellerID = getSessionstorageValueUserResellerID
                }


                var getReports = $('#mobile-companyReportEN').val();
                var ObjReports = JSON.stringify(getReports);
                var parseObjReports = ObjReports.replace(/\[|\"|\]/g, "");

                var company = {
                    CompanyID: $('#companyID').val(),
                    //Flag: $('#companyStatus').val(),
                    Flag: 1,
                    Name: $('#mobile-companyNameEN').val(),
                    Address: $('#mobile-companyAddressEN').val(),
                    Email: $('#mobile-companyEmailEN').val(),
                    Phone: $('#mobile-companyPhoneEN').val(),
                    Image: $('#companyImage').val(),
                    Reports: parseObjReports,
                    ResellerID: getResellerID

                };

                var GetCompanyID = $('#companyID').val();

                if (company.CompanyID == 'undefined' || company.CompanyID == null || company.CompanyID == 0 || company.CompanyID != GetCompanyID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/companyinfo",
                        type: "POST",
                        data: JSON.stringify(company),
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
                        success: function (company) {
                            window.location.reload(true);
                            console.log(company);
                        }
                    });
                }

                else {


                    var updateCompany = 'http://track.asiacom.co.th/adswebapi/api/companyinfo?id=' + company.CompanyID;

                    $.ajax({
                        url: updateCompany,
                        type: "PUT",
                        data: JSON.stringify(company),
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
                        success: function (company) {
                            window.location.reload(true);
                            console.log(company);
                        }
                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });

    });

    //Confirm Delete Row Companies
    $('#company-confirm-delete').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to delete company?", function (result) {
        bootbox.confirm("<div style='color:black'>คคุณแน่ใจหรือว่า ต้องการลบ บริษัท ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'ประสบความสำเร็จ ที่ถูกลบ',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var company = JSON.stringify({ 'CompanyID': row.CompanyID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/companyinfo/' + row.CompanyID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(company),
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
                        success: function (company) {
                            console.log(company);
                        }
                    });
                    return row.CompanyID
                });
                $table.bootstrapTable('remove', {
                    field: 'CompanyID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'ลบ ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });
    $('#company-confirm-deleteEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        //bootbox.confirm("Are you sure you wish to delete company?", function (result) {
        bootbox.confirm("<div style='color:black'>Are you sure you wish to delete ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'Deleted Successfully',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var company = JSON.stringify({ 'CompanyID': row.CompanyID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/companyinfo/' + row.CompanyID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(company),
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
                        success: function (company) {
                            console.log(company);
                        }
                    });
                    return row.CompanyID
                });
                $table.bootstrapTable('remove', {
                    field: 'CompanyID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'Delete Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });

    // =================================================================

    //Submit User
    $('#submit-user').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
        var getAlertType = $('#userNotificationsType').val();
        var getAlerts = $('#userNotifications').val();

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });


        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการส่ง?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Successful',
                    message: 'ที่ประสบความสำเร็จ',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/userinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var valLoginRetry;

                if (changeCheckbox.checked == true) {

                    valLoginRetry = 10;
                }

                else if (changeCheckbox.checked == false) {
                    valLoginRetry = 0;
                }

                var parseObjAlerts;


                if (getAlertType != null) {

                    var i = 0;
                    var ConcateC = "";
                    for (i = 0; i < getAlertType.length; i++) {
                        ConcateC += getAlertType[i];

                    }

                    var MergeAlert = [];
                    for (i = 0; i < getAlerts.length; i++) {
                        MergeAlert[i] = getAlerts[i] + ":" + ConcateC;
                        //alert(c[i]);
                    }

                    var ObjAlerts = JSON.stringify(MergeAlert);
                    parseObjAlerts = ObjAlerts.replace(/\[|\"|\]|\E|S|U/g, "");
                }


                var getAssets = $('#userAssets').val();
                var ObjAssets = JSON.stringify(getAssets);
                var parseObjAssets = ObjAssets.replace(/\[|\"|\]/g, "");

                var getResellerID;
                if (getSessionstorageValueRoleID == 1) {

                    getResellerID = $('#userReseller').val();
                }
                else {

                    getResellerID = getSessionstorageValueUserResellerID
                }

                var hashPassword = "";

                try {
                    if (GetUserID == null | GetUserID == "" | GetUserID == "undefined") {
                        var getPassword = $('#userPassword').val();
                        var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                        hashPassword = hash;

                    }
                    else
                    {
                        var getPassword = $('#userPassword').val();

                        if (getPassword.length == 64) {
                            hashPassword = getPassword;
                        }
                        else {
                            var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                            hashPassword = hash;
                        }

                    }
                }
                catch (e) {

                    console.log('You got this error: ' + e);
                }


                //var getPassword = $('#userPasswordEN').val();
                //var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);

                var user = {
                    UserID: $('#userID').val(),
                    CompanyID: $('#userCompany').val(),
                    RoleDesc: $('#userRoleDesc').val(),
                    RoleDesc: $('#userRoleDescReseller').val(),
                    RoleDesc: $('#userRoleDescMaster').val(),
                    RoleDesc: $('#userRoleDescAdmin').val(),
                    Name: $('#userFullName').val(),
                    User: $('#UserName').val(),
                    Password: hash,
                    //Password: $('#confirmPassword').val(),
                    Email: $('#userEmail').val(),
                    Phone: $('#userPhone').val(),
                    Image: $('#userImage').val(),
                    Notifications: parseObjAlerts,
                    Language: $('#load-language').val(),
                    Assets: parseObjAssets,
                    LoginRetry: valLoginRetry,
                    ResellerID: getResellerID
                };




                if (user.UserID == 'undefined' || user.UserID == null || user.UserID == 0 || user.UserID != GetUserID) {



                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/userinfo",
                        type: "POST",
                        data: JSON.stringify(user),
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
                        success: function (user) {
                            console.log(user);
                        }
                    });

                }

                else {

                    var updateUser = 'http://track.asiacom.co.th/adswebapi/api/userinfo?id=' + user.UserID;

                    $.ajax({
                        url: updateUser,
                        type: "PUT",
                        data: JSON.stringify(user),
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
                        success: function (user) {
                            console.log(user);
                        }
                    });

                }

            }

            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Canceled',
                    message: 'ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });
    $('#submit-userEN').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
        var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
        var getAlertType = $('#userNotificationsType').val();
        var getAlerts = $('#userNotifications').val();

        var getUserCompany = $('#userCompany').val();

        if (getUserCompany != "0" || getUserCompany == "") {

            bootbox.setDefaults({
                /**
                 * @optional String
                 * @default: en
                 * which locale settings to use to translate the three
                 * standard button labels: OK, CONFIRM, CANCEL
                 */
                locale: "en",


            });


            bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {
                if (result) {
                    window.location.reload(true);
                    $.niftyNoty({
                        type: 'success',
                        icon: 'fa fa-check',

                        message: 'Successful',
                        container: 'floating',
                        timer: 3000
                    });

                    jQuery.support.cors = true;

                    function createCORSRequest(method, url) {
                        var xhr = new XMLHttpRequest();
                        if ("withCredentials" in xhr) {

                            // Check if the XMLHttpRequest object has a "withCredentials" property.
                            // "withCredentials" only exists on XMLHTTPRequest2 objects.
                            xhr.open(method, url, true);

                        } else if (typeof XDomainRequest != "undefined") {

                            // Otherwise, check if XDomainRequest.
                            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                            xhr = new XDomainRequest();
                            xhr.open(method, url);

                        } else {

                            // Otherwise, CORS is not supported by the browser.
                            xhr = null;

                        }
                        return xhr;
                    }

                    var url = 'http://track.asiacom.co.th/adswebapi/api/userinfo';
                    var xhr = createCORSRequest('GET', url);
                    xhr.send();
                    if (!xhr) {
                        throw new Error('CORS not supported');
                    }

                    var GetUserID = $('#userID').val();

                    var data = new FormData();
                    var files = $("#uploadUser").get(0).files;


                    // Add the uploaded image content to the form data collection
                    if (files.length > 0) {
                        data.append("UploadedImage", files[0], GetUserID + ".png");
                    }

                    // Make Ajax request with the contentType = false, and procesDate = false
                    var ajaxRequest = $.ajax({
                        type: "POST",
                        url: "http://track.asiacom.co.th/adswebapi/api/fileupload/uploadfileuser",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (data) {
                            console.log('success');
                        }
                    });

                    ajaxRequest.done(function (responseData, textStatus) {
                        if (textStatus == 'success') {
                            if (responseData != null) {
                                if (responseData.Key) {
                                    alert(responseData.Value);
                                    $("#uploadUser").val('');
                                } else {
                                    alert(responseData.Value);
                                }
                            }
                        } else {
                            alert(responseData.Value);
                        }
                    });


                    var valLoginRetry;

                    if (changeCheckbox.checked == true) {

                        valLoginRetry = 10;
                    }

                    else if (changeCheckbox.checked == false) {
                        valLoginRetry = 0;
                    }

                    var parseObjAlerts;


                    if (getAlertType != null) {

                        var i = 0;
                        var ConcateC = "";
                        for (i = 0; i < getAlertType.length; i++) {
                            ConcateC += getAlertType[i];

                        }

                        var MergeAlert = [];
                        for (i = 0; i < getAlerts.length; i++) {
                            MergeAlert[i] = getAlerts[i] + ":" + ConcateC;
                            //alert(c[i]);
                        }

                        var ObjAlerts = JSON.stringify(MergeAlert);
                        parseObjAlerts = ObjAlerts.replace(/\[|\"|\]|\E|S|U/g, "");
                    }


                    var getAssets = $('#userAssets').val();
                    var ObjAssets = JSON.stringify(getAssets);
                    var parseObjAssets = ObjAssets.replace(/\[|\"|\]/g, "");

                    var getResellerID;
                    if (getSessionstorageValueRoleID == 1) {

                        getResellerID = $('#userReseller').val();
                    }
                    else {

                        getResellerID = getSessionstorageValueUserResellerID
                    }



                    var hashPassword = "";
                    var getPassword = $('#userPasswordEN').val();

                    try {
                        if (GetUserID == null | GetUserID == "" | GetUserID == "undefined") {

                            var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                            hashPassword = hash;

                        }
                        else if (GetUserID != null && getPassword.length == 256)
                        {
                            hashPassword = getPassword;
                        }
                        else
                        {
                            
                            if (getPassword.length == 64) {
                                hashPassword = getPassword;
                            }
                            else {
                                var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                                hashPassword = hash;
                            }

                        }
                    }
                    catch (e) {

                        console.log('You got this error: ' + e);
                    }

                    //var getPassword = $('#userPasswordEN').val();
                    //var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);


                    var user = {
                        UserID: $('#userID').val(),
                        CompanyID: $('#userCompany').val(),
                        RoleID: $('#userRoleDesc').val(),
                        Name: $('#userFullNameEN').val(),
                        User: $('#UserNameEN').val(),
                        Password: hashPassword,
                        //Password: $('#confirmPassword').val(),
                        Email: $('#userEmailEN').val(),
                        Phone: $('#userPhoneEN').val(),
                        Image: $('#userImage').val(),
                        Notifications: parseObjAlerts,
                        Language: $('#load-language').val(),
                        Assets: parseObjAssets,
                        LoginRetry: valLoginRetry,
                        ResellerID: getResellerID
                    };


                    if (user.UserID == 'undefined' || user.UserID == null || user.UserID == 0 || user.UserID != GetUserID) {



                        $.ajax({
                            url: "http://track.asiacom.co.th/adswebapi/api/userinfo",
                            type: "POST",
                            data: JSON.stringify(user),
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
                            success: function (user) {
                                console.log(user);
                                // window.location.reload(true);
                            }
                        });

                    }

                    else {

                        var updateUser = 'http://track.asiacom.co.th/adswebapi/api/userinfo?id=' + user.UserID;

                        $.ajax({
                            url: updateUser,
                            type: "PUT",
                            data: JSON.stringify(user),
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
                            success: function (user) {
                                console.log(user);
                                //window.location.reload(true);
                            }
                        });

                    }

                }

                else {
                    $.niftyNoty({
                        type: 'danger',
                        icon: 'fa fa-minus',
                        message: 'Canceled',

                        container: 'floating',
                        timer: 3000
                    });
                };

            });
        } else {

            alert('You Must Select Company');
        }

    });
    $('#submit-user-mobileEN').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
        var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
        var getAlertType = $('#mobile-userNotificationsType').val();
        var getAlerts = $('#mobile-userNotifications').val();

        var getUserCompany = $('#mobile-load-company').val();

        if (getUserCompany != "0" || getUserCompany == "") {

            bootbox.setDefaults({
                /**
                 * @optional String
                 * @default: en
                 * which locale settings to use to translate the three
                 * standard button labels: OK, CONFIRM, CANCEL
                 */
                locale: "en",


            });


            bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {
                if (result) {

                    $.niftyNoty({
                        type: 'success',
                        icon: 'fa fa-check',

                        message: 'Successful',
                        container: 'floating',
                        timer: 3000
                    });

                    jQuery.support.cors = true;

                    function createCORSRequest(method, url) {
                        var xhr = new XMLHttpRequest();
                        if ("withCredentials" in xhr) {

                            // Check if the XMLHttpRequest object has a "withCredentials" property.
                            // "withCredentials" only exists on XMLHTTPRequest2 objects.
                            xhr.open(method, url, true);

                        } else if (typeof XDomainRequest != "undefined") {

                            // Otherwise, check if XDomainRequest.
                            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                            xhr = new XDomainRequest();
                            xhr.open(method, url);

                        } else {

                            // Otherwise, CORS is not supported by the browser.
                            xhr = null;

                        }
                        return xhr;
                    }

                    var url = 'http://track.asiacom.co.th/adswebapi/api/userinfo';
                    var xhr = createCORSRequest('GET', url);
                    xhr.send();
                    if (!xhr) {
                        throw new Error('CORS not supported');
                    }

                    var GetUserID = $('#userID').val();

                    var data = new FormData();
                    var files = $("#uploadUser").get(0).files;


                    // Add the uploaded image content to the form data collection
                    if (files.length > 0) {
                        data.append("UploadedImage", files[0], GetUserID + ".png");
                    }

                    // Make Ajax request with the contentType = false, and procesDate = false
                    var ajaxRequest = $.ajax({
                        type: "POST",
                        url: "http://track.asiacom.co.th/adswebapi/api/fileupload/uploadfileuser",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (data) {
                            console.log('success');
                        }
                    });

                    ajaxRequest.done(function (responseData, textStatus) {
                        if (textStatus == 'success') {
                            if (responseData != null) {
                                if (responseData.Key) {
                                    alert(responseData.Value);
                                    $("#uploadUser").val('');
                                } else {
                                    alert(responseData.Value);
                                }
                            }
                        } else {
                            alert(responseData.Value);
                        }
                    });


                    var valLoginRetry;

                    if (changeCheckbox.checked == true) {

                        valLoginRetry = 10;
                    }

                    else if (changeCheckbox.checked == false) {
                        valLoginRetry = 0;
                    }

                    var parseObjAlerts;


                    if (getAlertType != null) {

                        var i = 0;
                        var ConcateC = "";
                        for (i = 0; i < getAlertType.length; i++) {
                            ConcateC += getAlertType[i];

                        }

                        var MergeAlert = [];
                        for (i = 0; i < getAlerts.length; i++) {
                            MergeAlert[i] = getAlerts[i] + ":" + ConcateC;
                            //alert(c[i]);
                        }

                        var ObjAlerts = JSON.stringify(MergeAlert);
                        parseObjAlerts = ObjAlerts.replace(/\[|\"|\]|\E|S|U/g, "");
                    }


                    var getAssets = $('#mobile-userAssets').val();
                    var ObjAssets = JSON.stringify(getAssets);
                    var parseObjAssets = ObjAssets.replace(/\[|\"|\]/g, "");

                    var getResellerID;
                    if (getSessionstorageValueRoleID == 1) {

                        getResellerID = $('#mobile-load-reseller').val();
                    }
                    else {

                        getResellerID = getSessionstorageValueUserResellerID
                    }



                    var hashPassword = "";
                    var getPassword = $('#mobile-userPasswordEN').val();

                    try {
                        if (GetUserID == null | GetUserID == "" | GetUserID == "undefined") {

                            var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                            hashPassword = hash;

                        }
                        else if (GetUserID != null && getPassword.length == 256) {
                            hashPassword = getPassword;
                        }
                        else {

                            var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                            hashPassword = hash;

                        }
                    }
                    catch (e) {

                        console.log('You got this error: ' + e);
                    }

                    //var getPassword = $('#userPasswordEN').val();
                    //var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);


                    var user = {
                        UserID: $('#userID').val(),
                        CompanyID: $('#mobile-load-company').val(),
                        RoleID: $('#mobile-userRoleDesc').val(),
                        Name: $('#mobile-userFullNameEN').val(),
                        User: $('#mobile-UserNameEN').val(),
                        Password: hashPassword,
                        //Password: $('#confirmPassword').val(),
                        Email: $('#mobile-userEmailEN').val(),
                        Phone: $('#mobile-userPhoneEN').val(),
                        Image: $('#userImage').val(),
                        Notifications: parseObjAlerts,
                        Language: $('#load-language').val(),
                        Assets: parseObjAssets,
                        LoginRetry: valLoginRetry,
                        ResellerID: getResellerID
                    };


                    if (user.UserID == 'undefined' || user.UserID == null || user.UserID == 0 || user.UserID != GetUserID) {



                        $.ajax({
                            url: "http://track.asiacom.co.th/adswebapi/api/userinfo",
                            type: "POST",
                            data: JSON.stringify(user),
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
                            success: function (user) {
                                window.location.reload(true);
                                console.log(user);
                                // window.location.reload(true);
                            }
                        });

                    }

                    else {

                        var updateUser = 'http://track.asiacom.co.th/adswebapi/api/userinfo?id=' + user.UserID;

                        $.ajax({
                            url: updateUser,
                            type: "PUT",
                            data: JSON.stringify(user),
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
                            success: function (user) {
                                window.location.reload(true);
                                console.log(user);
                                //window.location.reload(true);
                            }
                        });

                    }

                }

                else {
                    $.niftyNoty({
                        type: 'danger',
                        icon: 'fa fa-minus',
                        message: 'Canceled',

                        container: 'floating',
                        timer: 3000
                    });
                };

            });
        } else {

            alert('You Must Select Company');
        }

    });

    //Confirm Delete Row Users
    $('#users-confirm-delete').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to delete user?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการลบ ผู้ใช้?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'ประสบความสำเร็จ ที่ถูกลบ',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var user = JSON.stringify({ 'UserID': row.UserID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/userinfo/' + row.UserID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(user),
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
                        success: function (user) {
                            console.log(user);
                        }
                    });

                    return row.UserID
                });
                $table.bootstrapTable('remove', {
                    field: 'UserID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'ลบ ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });
    $('#users-confirm-deleteEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        //bootbox.confirm("Are you sure you wish to delete user?", function (result) {
        bootbox.confirm("<div style='color:black'>Are you sure you wish to delete ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'Deleted Successfully',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var user = JSON.stringify({ 'UserID': row.UserID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/userinfo/' + row.UserID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(user),
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
                        success: function (user) {
                            console.log(user);
                        }
                    });

                    return row.UserID
                });
                $table.bootstrapTable('remove', {
                    field: 'UserID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'Delete Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });

    // =================================================================

    //Submit Device
    $('#submit-device').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to submit?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการ จะส่ง ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Successful',
                    message: 'ที่ประสบความสำเร็จ',
                    container: 'floating',
                    timer: 3000
                });


                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }

                var device = {
                    DeviceID: $('#deviceID').val(),
                    Name: $('#deviceName').val(),
                    Imei: $('#deviceIMEI').val(),
                    Phone: $('#devicePhone').val(),
                    Interval: $('#devicePollingInterval').val(),
                    Port: $('#devicePort').val(),
                    APN: $('#deviceAPN').val(),
                    InstallDate: $('#deviceInstallDate').val(),
                    //ModifiedTimestamp: $('#userImage').val(),
                    Remarks: $('#deviceRemarks').val(),
                    //isSentOut: $('#userDepartment').val(),
                    //Image: $('#userAssets').val(),
                    //ImageFill: $('#userAssets').val()
                };


                var GetDeviceID = $('#deviceID').val();

                if (device.DeviceID == 'undefined' || device.DeviceID == null || device.DeviceID == 0 || device.DeviceID != GetDeviceID) {


                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/deviceinfo",
                        type: "POST",
                        data: JSON.stringify(device),
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
                        success: function (device) {
                            console.log(device);
                        }
                    });

                }

                else {


                    var updateDevice = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo?id=' + device.DeviceID;

                    $.ajax({
                        url: updateDevice,
                        type: "PUT",
                        data: JSON.stringify(device),
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
                        success: function (device) {
                            console.log(device);
                        }
                    });


                }


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Canceled',
                    message: 'ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });
    $('#submit-deviceEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });


                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }

                var device = {
                    DeviceID: $('#deviceID').val(),
                    Name: $('#deviceNameEN').val(),
                    Imei: $('#deviceIMEIEN').val(),
                    Phone: $('#devicePhoneEN').val(),
                    Interval: $('#devicePollingIntervalEN').val(),
                    Port: $('#devicePortEN').val(),
                    APN: $('#deviceAPNEN').val(),
                    InstallDate: $('#deviceInstallDate').val(),
                    //ModifiedTimestamp: $('#userImage').val(),
                    Remarks: $('#deviceRemarksEN').val(),
                    isSentOut: $('#isSentOutEN').val(),
                    //Image: $('#userAssets').val(),
                    //ImageFill: $('#userAssets').val()
                };


                var GetDeviceID = $('#deviceID').val();

                if (device.DeviceID == 'undefined' || device.DeviceID == null || device.DeviceID == 0 || device.DeviceID != GetDeviceID) {


                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/deviceinfo",
                        type: "POST",
                        data: JSON.stringify(device),
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
                        success: function (device) {
                            console.log(device);
                        }
                    });

                }

                else {


                    var updateDevice = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo?id=' + device.DeviceID;

                    $.ajax({
                        url: updateDevice,
                        type: "PUT",
                        data: JSON.stringify(device),
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
                        success: function (device) {
                            console.log(device);
                        }
                    });


                }


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });
    $('#submit-device-mobileEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {
            if (result) {
                
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });


                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }

                var device = {
                    DeviceID: $('#deviceID').val(),
                    Name: $('#mobile-deviceNameEN').val(),
                    Imei: $('#mobile-deviceIMEIEN').val(),
                    Phone: $('#mobile-devicePhoneEN').val(),
                    Interval: $('#mobile-devicePollingIntervalEN').val(),
                    Port: $('#mobile-devicePortEN').val(),
                    APN: $('#mobile-deviceAPNEN').val(),
                    InstallDate: $('#mobile-deviceInstallDateEN').val(),
                    //ModifiedTimestamp: $('#userImage').val(),
                    Remarks: $('#mobile-deviceRemarksEN').val(),
                    isSentOut: $('#isSentOutEN').val(),
                    //Image: $('#userAssets').val(),
                    //ImageFill: $('#userAssets').val()
                };


                var GetDeviceID = $('#deviceID').val();

                if (device.DeviceID == 'undefined' || device.DeviceID == null || device.DeviceID == 0 || device.DeviceID != GetDeviceID) {


                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/deviceinfo",
                        type: "POST",
                        data: JSON.stringify(device),
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
                        success: function (device) {
                            window.location.reload(true);
                            console.log(device);
                        }
                    });

                }

                else {


                    var updateDevice = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo?id=' + device.DeviceID;

                    $.ajax({
                        url: updateDevice,
                        type: "PUT",
                        data: JSON.stringify(device),
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
                        success: function (device) {
                            window.location.reload(true);
                            console.log(device);
                        }
                    });


                }


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });

    //Confirm Delete Row Device
    $('#device-confirm-delete').on('click', function () {


        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to delete user?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการลบ ผู้ใช้?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'ประสบความสำเร็จ ที่ถูกลบ',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var device = JSON.stringify({ 'DeviceID': row.DeviceID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo/' + row.DeviceID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(device),
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
                        success: function (device) {
                            console.log(device);
                        }
                    });

                    return row.DeviceID
                });
                $table.bootstrapTable('remove', {
                    field: 'DeviceID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'ลบ ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });
    $('#device-confirm-deleteEN').on('click', function () {


        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        //bootbox.confirm("Are you sure you wish to delete user?", function (result) {
        bootbox.confirm("<div style='color:black'>Are you sure you wish to delete ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'Deleted Successfully',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var device = JSON.stringify({ 'DeviceID': row.DeviceID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo/' + row.DeviceID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(device),
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
                        success: function (device) {
                            console.log(device);
                        }
                    });

                    return row.DeviceID
                });
                $table.bootstrapTable('remove', {
                    field: 'DeviceID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'Delete Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });


    // =================================================================

    //Submit Reseller
    $('#submit-reseller').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to submit?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการ จะส่ง ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Successful',
                    message: 'ที่ประสบความสำเร็จ',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/resellerinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var reseller = {
                    ResellerID: $('#resellerID').val(),
                    Flag: 1,
                    Name: $('#resellerName').val(),
                    Address: $('#resellerAddress').val(),
                    Email: $('#resellerEmail').val(),
                    Phone: $('#resellerPhone').val()
                };

                var GetResellerID = $('#resellerID').val();

                if (reseller.ResellerID == 'undefined' || reseller.ResellerID == null || reseller.ResellerID == 0 || reseller.ResellerID != GetResellerID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/resellerinfo",
                        type: "POST",
                        data: JSON.stringify(reseller),
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
                        success: function (reseller) {
                            console.log(reseller);
                        }

                    });
                }

                else {


                    var updateReseller = 'http://track.asiacom.co.th/adswebapi/api/resellerinfo?id=' + reseller.ResellerID;

                    $.ajax({
                        url: updateReseller,
                        type: "PUT",
                        data: JSON.stringify(reseller),
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
                        success: function (reseller) {
                            console.log(reseller);
                        }

                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Canceled',
                    message: 'ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });
    $('#submit-resellerEN').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {

            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/resellerinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var reseller = {
                    ResellerID: $('#resellerID').val(),
                    Flag: 1,
                    Name: $('#resellerNameEN').val(),
                    Address: $('#resellerAddressEN').val(),
                    Email: $('#resellerEmailEN').val(),
                    Phone: $('#resellerPhoneEN').val()
                };

                var GetResellerID = $('#resellerID').val();

                if (reseller.ResellerID == 'undefined' || reseller.ResellerID == null || reseller.ResellerID == 0 || reseller.ResellerID != GetResellerID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/resellerinfo",
                        type: "POST",
                        data: JSON.stringify(reseller),
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
                        success: function (reseller) {
                            console.log(reseller);
                        }
                    });
                }

                else {


                    var updateReseller = 'http://track.asiacom.co.th/adswebapi/api/resellerinfo?id=' + reseller.ResellerID;

                    $.ajax({
                        url: updateReseller,
                        type: "PUT",
                        data: JSON.stringify(reseller),
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
                        success: function (reseller) {
                            console.log(reseller);
                        }

                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });
    $('#submit-reseller-mobileEN').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {

            if (result) {             
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/resellerinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var reseller = {
                    ResellerID: $('#resellerID').val(),
                    Flag: 1,
                    Name: $('#mobile-resellerNameEN').val(),
                    Address: $('#mobile-resellerAddressEN').val(),
                    Email: $('#mobile-resellerEmailEN').val(),
                    Phone: $('#mobile-resellerPhoneEN').val()
                };

                var GetResellerID = $('#resellerID').val();

                if (reseller.ResellerID == 'undefined' || reseller.ResellerID == null || reseller.ResellerID == 0 || reseller.ResellerID != GetResellerID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/resellerinfo",
                        type: "POST",
                        data: JSON.stringify(reseller),
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
                        success: function (reseller) {
                            window.location.reload(true);
                            console.log(reseller);
                        }
                    });
                }

                else {


                    var updateReseller = 'http://track.asiacom.co.th/adswebapi/api/resellerinfo?id=' + reseller.ResellerID;

                    $.ajax({
                        url: updateReseller,
                        type: "PUT",
                        data: JSON.stringify(reseller),
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
                        success: function (reseller) {
                            window.location.reload(true);
                            console.log(reseller);
                        }
                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });

    //Confirm Delete Row Reseller
    $('#reseller-confirm-delete').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to delete reseller?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการลบ บริษัท ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'ประสบความสำเร็จ ที่ถูกลบ',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var reseller = JSON.stringify({ 'ResellerID': row.ResellerID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/resellerinfo/' + row.ResellerID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(reseller),
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
                        success: function (reseller) {
                            console.log(reseller);
                        }
                    });
                    return row.ResellerID
                });
                $table.bootstrapTable('remove', {
                    field: 'ResellerID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'ลบ ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });
    $('#reseller-confirm-deleteEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        //bootbox.confirm("Are you sure you wish to delete reseller?", function (result) {
        bootbox.confirm("<div style='color:black'>Are you sure you wish to delete ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'Deleted Successfully',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var reseller = JSON.stringify({ 'ResellerID': row.ResellerID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/resellerinfo/' + row.ResellerID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(reseller),
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
                        success: function (reseller) {
                            console.log(reseller);
                        }
                    });
                    return row.ResellerID
                });
                $table.bootstrapTable('remove', {
                    field: 'ResellerID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'Delete Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });



    // =================================================================

    //Submit Driver
    $('#submit-driver').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to submit?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการ จะส่ง ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'ที่ประสบความสำเร็จ',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/driverinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var getDriverID = $('#driverID').val();

                var data = new FormData();
                var files = $("#uploadDriver").get(0).files;


                // Add the uploaded image content to the form data collection
                if (files.length > 0) {
                    data.append("UploadedImage", files[0], getDriverID + ".png");
                }

                // Make Ajax request with the contentType = false, and procesDate = false
                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "http://track.asiacom.co.th/adswebapi/api/fileupload/uploadfile",
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (data) {
                        console.log('success');
                    }
                });

                ajaxRequest.done(function (responseData, textStatus) {
                    if (textStatus == 'success') {
                        if (responseData != null) {
                            if (responseData.Key) {
                                alert(responseData.Value);
                                $("#uploadDriver").val('');
                            } else {
                                alert(responseData.Value);
                            }
                        }
                    } else {
                        alert(responseData.Value);
                    }
                });


                var birthday = "";

                if (birthday == null || birthday == 'undefined' || birthday == "") {

                    birthday = $('#driverDateOfBirth').val();
                } else {

                    birthday = moment.utc().add('hours', 7).format('D-MMM-YYYY, hh:mm:ss A');
                }


                var driver = {
                    DriverID: $('#driverID').val(),
                    CompanyID: $('#driverCompany').val(),
                    Name: $('#driverName').val(),
                    Email: $('#driverEmail').val(),
                    Address: $('#driverAddress').val(),
                    Phone: $('#driverPhone').val(),
                    DateOfBirth: birthday,
                    Remarks: $('#driverRemarks').val()
                };



                if (driver.DriverID == 'undefined' || driver.DriverID == null || driver.DriverID == 0 || driver.DriverID != getDriverID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/driverinfo",
                        type: "POST",
                        data: JSON.stringify(driver),
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
                        success: function (driver) {
                            console.log(driver);
                        }
                    });
                }

                else {


                    var updateDriver = 'http://track.asiacom.co.th/adswebapi/api/driverinfo?id=' + driver.DriverID;

                    $.ajax({
                        url: updateDriver,
                        type: "PUT",
                        data: JSON.stringify(driver),
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
                        success: function (driver) {
                            console.log(driver);
                        }
                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });


            };

        });


    });
    $('#submit-driverEN').on('click', function () {


        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {

            if (result) {
                
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/driverinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var getDriverID = $('#driverID').val();

                var data = new FormData();
                var files = $("#uploadDriver").get(0).files;


                // Add the uploaded image content to the form data collection
                if (files.length > 0) {
                    data.append("UploadedImage", files[0], getDriverID + ".png");
                }

                // Make Ajax request with the contentType = false, and procesDate = false
                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "http://track.asiacom.co.th/adswebapi/api/fileupload/uploadfile",
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (data) {
                        console.log('success');
                    }
                });

                ajaxRequest.done(function (responseData, textStatus) {
                    if (textStatus == 'success') {
                        if (responseData != null) {
                            if (responseData.Key) {
                                alert(responseData.Value);
                                $("#uploadDriver").val('');
                            } else {
                                alert(responseData.Value);
                            }
                        }
                    } else {
                        alert(responseData.Value);
                    }
                });


                var birthday = "";

                if (birthday != null || birthday != 'undefined' || birthday != "") {

                    birthday = $('#driverDateOfBirth').val();
                } else {

                    birthday = moment.utc().add('hours', 8).format('D-MMM-YYYY, hh:mm:ss A');
                }


                var hashPassword = "";
                var getPassword = $('#driverPasswordEN').val();

                try {
                    if (getDriverID == null | getDriverID == "" | getDriverID == "undefined") {

                        var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                        hashPassword = hash;

                    }
                    else if (getDriverID != null && getPassword.length == 256) {
                        hashPassword = getPassword;
                    }
                    else {

                        if (getPassword.length == 64) {
                            hashPassword = getPassword;
                        }
                        else {
                            var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                            hashPassword = hash;
                        }

                    }
                }
                catch (e) {

                    console.log('You got this error: ' + e);
                }


                var driver = {
                    DriverID: $('#driverID').val(),
                    CompanyID: $('#driverCompany').val(),
                    Name: $('#driverNameEN').val(),
                    Password: hashPassword,
                    Email: $('#driverEmailEN').val(),        
                    Address: $('#driverAddressEN').val(),
                    Phone: $('#driverPhoneEN').val(),
                    DateOfBirth: birthday,
                    Remarks: $('#driverRemarksEN').val()
                };



                if (driver.DriverID == 'undefined' || driver.DriverID == null || driver.DriverID == 0 || driver.DriverID != getDriverID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/driverinfo",
                        type: "POST",
                        data: JSON.stringify(driver),
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
                        success: function (driver) {
                            console.log(driver);
                            window.location.reload(true);
                        }
                    });
                }

                else {


                    var updateDriver = 'http://track.asiacom.co.th/adswebapi/api/driverinfo?id=' + driver.DriverID;

                    $.ajax({
                        url: updateDriver,
                        type: "PUT",
                        data: JSON.stringify(driver),
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
                        success: function (driver) {
                            console.log(driver);
                            window.location.reload(true);
                        }
                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });
    $('#submit-driver-mobileEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {

            if (result) {
               
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/driverinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var getDriverID = $('#driverID').val();

                var data = new FormData();
                var files = $("#uploadDriver").get(0).files;


                // Add the uploaded image content to the form data collection
                if (files.length > 0) {
                    data.append("UploadedImage", files[0], getDriverID + ".png");
                }

                // Make Ajax request with the contentType = false, and procesDate = false
                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "http://track.asiacom.co.th/adswebapi/api/fileupload/uploadfile",
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (data) {
                        console.log('success');
                    }
                });

                ajaxRequest.done(function (responseData, textStatus) {
                    if (textStatus == 'success') {
                        if (responseData != null) {
                            if (responseData.Key) {
                                alert(responseData.Value);
                                $("#uploadDriver").val('');
                            } else {
                                alert(responseData.Value);
                            }
                        }
                    } else {
                        alert(responseData.Value);
                    }
                });


                var birthday = "";

                if (birthday != null || birthday != 'undefined' || birthday != "") {

                    birthday = $('#mobile-driverDateOfBirth').val();
                } else {

                    birthday = moment.utc().add('hours', 8).format('D-MMM-YYYY, hh:mm:ss A');
                }


                var driver = {
                    DriverID: $('#driverID').val(),
                    CompanyID: $('#mobile-driverCompanyEN').val(),
                    Name: $('#mobile-driverNameEN').val(),
                    Email: $('#mobile-driverEmailEN').val(),
                    Address: $('#mobile-driverAddressEN').val(),
                    Phone: $('#mobile-driverPhoneEN').val(),
                    DateOfBirth: birthday,
                    Remarks: $('#mobile-driverRemarksEN').val()
                };



                if (driver.DriverID == 'undefined' || driver.DriverID == null || driver.DriverID == 0 || driver.DriverID != getDriverID) {

                    $.ajax({
                        url: "http://track.asiacom.co.th/adswebapi/api/driverinfo",
                        type: "POST",
                        data: JSON.stringify(driver),
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
                        success: function (driver) {
                            window.location.reload(true);
                            console.log(driver);
                        }
                    });
                }

                else {


                    var updateDriver = 'http://track.asiacom.co.th/adswebapi/api/driverinfo?id=' + driver.DriverID;

                    $.ajax({
                        url: updateDriver,
                        type: "PUT",
                        data: JSON.stringify(driver),
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
                        success: function (driver) {
                            window.location.reload(true);
                            console.log(driver);
                        }
                    });


                }

            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });


    });

    //Confirm Delete Row Reseller
    $('#driver-confirm-delete').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });

        //bootbox.confirm("Are you sure you wish to delete reseller?", function (result) {
        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการลบ บริษัท ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'ประสบความสำเร็จ ที่ถูกลบ',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var driver = JSON.stringify({ 'DriverID': row.DriverID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/driverinfo/' + row.DriverID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(driver),
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
                        success: function (driver) {
                            console.log(driver);
                        }
                    });
                    return row.DriverID
                });
                $table.bootstrapTable('remove', {
                    field: 'DriverID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'ลบ ยกเลิก',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });
    $('#driver-confirm-deleteEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        //bootbox.confirm("Are you sure you wish to delete reseller?", function (result) {
        bootbox.confirm("<div style='color:black'>Are you sure you wish to delete ?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',
                    //message: 'Deleted Successfully',
                    message: 'Deleted Successfully',
                    container: 'floating',
                    timer: 3000
                });


                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    var driver = JSON.stringify({ 'DriverID': row.DriverID });
                    var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/driverinfo/' + row.DriverID;

                    $.ajax({
                        url: WebAPI,
                        type: "Delete",
                        data: JSON.stringify(driver),
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
                        success: function (driver) {
                            console.log(driver);
                        }
                    });
                    return row.DriverID
                });
                $table.bootstrapTable('remove', {
                    field: 'DriverID',
                    values: ids
                });
                $remove.prop('disabled', true);


            }


            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    //message: 'Delete Canceled',
                    message: 'Delete Canceled',
                    container: 'floating',
                    timer: 3000
                });
            };

        });
    });


    // =================================================================
    // Pause
    $('#pauseAnimate').on('click', function () {

        $.niftyNoty({
            type: 'warning',
            icon: 'fa fa-pause',
            message: 'หยุด',
            container: 'floating',
            timer: 3000
        });

    });
    $('#pauseAnimateEN').on('click', function () {

        $.niftyNoty({
            type: 'warning',
            icon: 'fa fa-pause',
            message: 'Pause',
            container: 'floating',
            timer: 3000
        });

    });


    // =================================================================


    //Submit User
    $('#submit-userProfile').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
        var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
        var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
        var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');


        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "th",


        });


        bootbox.confirm("<div style='color:black'>คุณแน่ใจหรือว่า ต้องการส่ง?</div>", function (result) {
            if (result) {
                window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',

                    message: 'ที่ประสบความสำเร็จ',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/userinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var hashPassword = "";

                try {

                    var getPassword = $('#profilePassword').val();
                    var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                    hashPassword = hash;


                }
                catch (e) {

                    console.log('You got this error: ' + e);
                }

                //var getPassword = $('#userPasswordEN').val();
                //var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);


                var user = {
                    UserID: getSessionstorageValueUserID,
                    CompanyID: getSessionstorageValueCompanyID,
                    RoleID: getSessionstorageValueRoleID,
                    Name: $('#profileNameEN').val(),
                    User: $('#profileUsernameEN').val(),
                    Password: hashPassword,
                    //Password: $('#confirmPassword').val(),
                    Email: $('#profileEmailEN').val(),
                    Phone: $('#profilePhoneNumberEN').val(),
                    //Image: $('#userImage').val(),
                    //Notifications: parseObjAlerts,
                    //Language: $('#load-language').val(),
                    //Assets: parseObjAssets,
                    //LoginRetry: valLoginRetry,
                    ResellerID: getSessionstorageValueUserResellerID
                };


                var updateUser = 'http://track.asiacom.co.th/adswebapi/api/userinfo?id=' + user.UserID;

                $.ajax({
                    url: updateUser,
                    type: "PUT",
                    data: JSON.stringify(user),
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
                    success: function (user) {
                        console.log(user);
                        //window.location.reload(true);
                    }
                });




            }

            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'ยกเลิก',

                    container: 'floating',
                    timer: 3000
                });
            };

        });




    });
    $('#submit-userProfileEN').on('click', function () {

        var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
        var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
        var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
        var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
        var getSessionstorageValueUserNotifications = sessionStorage.getItem('setSessionstorageValueUserNotifications');
        var getSessionstorageValueUserAssets = sessionStorage.getItem('setSessionstorageValueUserAssets');

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });


        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {
            if (result) {
                // window.location.reload(true);
                $.niftyNoty({
                    type: 'success',
                    icon: 'fa fa-check',

                    message: 'Successful',
                    container: 'floating',
                    timer: 3000
                });

                jQuery.support.cors = true;

                function createCORSRequest(method, url) {
                    var xhr = new XMLHttpRequest();
                    if ("withCredentials" in xhr) {

                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                        xhr.open(method, url, true);

                    } else if (typeof XDomainRequest != "undefined") {

                        // Otherwise, check if XDomainRequest.
                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                        xhr = new XDomainRequest();
                        xhr.open(method, url);

                    } else {

                        // Otherwise, CORS is not supported by the browser.
                        xhr = null;

                    }
                    return xhr;
                }

                var url = 'http://track.asiacom.co.th/adswebapi/api/userinfo';
                var xhr = createCORSRequest('GET', url);
                xhr.send();
                if (!xhr) {
                    throw new Error('CORS not supported');
                }


                var hashPassword = "";

                try {

                    var getPassword = $('#profilePasswordEN').val();
                    var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                    hashPassword = hash;


                }
                catch (e) {

                    console.log('You got this error: ' + e);
                }

                //var getPassword = $('#userPasswordEN').val();
                //var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);


                var profile = {
                    UserID: getSessionstorageValueUserID,
                    Name: $('#profileNameEN').val(),
                    User: $('#profileUsername').val(),
                    Password: hashPassword,
                    RoleID: getSessionstorageValueRoleID,
                    Phone: $('#profilePhoneNumberEN').val(),
                    Email: $('#profileEmailEN').val(),
                    CompanyID: getSessionstorageValueCompanyID,
                    Assets: getSessionstorageValueUserAssets,
                    Notifications: getSessionstorageValueUserNotifications,
                    LoginRetry: 10,
                    //Password: $('#confirmPassword').val(),
                    Image: $('#userImage').val(),
                    Language: 1,
                    ResellerID: getSessionstorageValueUserResellerID
                };


                var updateProfile = 'http://track.asiacom.co.th/adswebapi/api/userinfo?id=' + profile.UserID;

                $.ajax({
                    url: updateProfile,
                    type: "PUT",
                    data: JSON.stringify(profile),
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
                    success: function (profile) {
                        console.log(profile);
                        //window.location.reload(true);
                    }
                });




            }

            else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'fa fa-minus',
                    message: 'Canceled',

                    container: 'floating',
                    timer: 3000
                });
            };

        });

    });


    // =================================================================
    
    //Submit Scheduled Jobs
    $('#submit-job').on('click', function () {

        var getTimestamp = $("#date").val();
        var dateFormat = "DD-MMM-YYYY"; //DD-MMM-YYYY
        var convertTimestamp = moment(getTimestamp, dateFormat);

        var validateTimestamp = moment(getTimestamp, dateFormat).isValid();
        var timestamp = moment(convertTimestamp).format(dateFormat);
        var checkCase = $('#case').val();
        // Get today's date
        var todaysDate = moment().format('DD-MMM-YYYY');

        if (todaysDate > timestamp) {
            alert('Invalid Date Selected');
        }
        else {
            if (validateTimestamp == true) {
                var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

                    bootbox.setDefaults({
                        /**
                         * @optional String
                         * @default: en
                         * which locale settings to use to translate the three
                         * standard button labels: OK, CONFIRM, CANCEL
                         */
                        locale: "en",


                    });

                    if (row.Flag == 1 || row.Flag == 2) {
                        bootbox.confirm("<div style='color:black'>Are you sure you wish to edit a job?</div>", function (result) {

                            if (result) {

                                $.niftyNoty({
                                    type: 'success',
                                    icon: 'fa fa-check',
                                    message: 'Successful',
                                    container: 'floating',
                                    timer: 3000
                                });

                                jQuery.support.cors = true;

                                function createCORSRequest(method, url) {
                                    var xhr = new XMLHttpRequest();
                                    if ("withCredentials" in xhr) {

                                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                                        xhr.open(method, url, true);

                                    } else if (typeof XDomainRequest != "undefined") {

                                        // Otherwise, check if XDomainRequest.
                                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                                        xhr = new XDomainRequest();
                                        xhr.open(method, url);

                                    } else {

                                        // Otherwise, CORS is not supported by the browser.
                                        xhr = null;

                                    }
                                    return xhr;
                                }

                                var url = 'http://track.asiacom.co.th/adswebapi/api/jobinfo';
                                var xhr = createCORSRequest('GET', url);
                                xhr.send();
                                if (!xhr) {
                                    throw new Error('CORS not supported');
                                }


                                var getJobID = $('#jobid').val();
                                var getAmount = $('#amount').val();
                                var finalAmount = getAmount.replace(/\D/g, '');

                                var dateFormat = "D-MMM-YYYY, hh:mm:ss A";
                                var getTimestamp = $("#date").val();
                                var convertTimestamp = moment(getTimestamp, dateFormat);
                                var timestamp = moment(convertTimestamp).subtract('hours', 8).format(dateFormat);


                                var driver = {
                                    Name: $('#driver').val(),
                                }


                                if (row.JobStatus == "In Progress" || row.JobStatus == "Job Edited") {
                                    var jobEdit = {
                                        JobID: $('#jobid').val(),
                                        Timestamp: timestamp,
                                        RxTime: $('#date').val(),
                                        Amount: finalAmount,
                                        Caller: $('#caller').val(),
                                        Phone: $('#phone').val(),
                                        Unit: 0,
                                        Bed: 0,
                                        Origin: $('#origin').val(),
                                        Destination: $('#destination').val(),
                                        Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                        Remarks: $('#remarks').val(),
                                        Patient: $('#patient').val(),
                                        Payment: $('#payment').val(),
                                        Trip: $('#trip').val(),
                                        Receipt: "",
                                        Flag: 1,
                                        JobNumber: $('#case').val(),
                                        JobStatus: "Job Edited",
                                        Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                        Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                        AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                        AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                        JobDriver: $('#driver').val(),
                                        JobType: "Normal",
                                        AssetID: $('#jobAssets').val()
                                    };

                                    var patient = {
                                        PatientID: $('#patientid').val(),
                                        Name: $('#patient').val(),
                                        Remarks: $('#remarks').val(),
                                        Remarks2: $('#patientRemarks').val(),
                                        CallerName: $('#caller').val(),
                                        CallerPhone: $('#phone').val(),
                                        Unit: $('#unit').val(),
                                        Address: $('#origin').val(),
                                        DialysisCentre: $('#destination').val(),
                                        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                        ResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                        TreatmentDay1: $('#treatmentDay1').val(),
                                        TreatmentDay2: $('#treatmentDay2').val(),
                                        TreatmentDay3: $('#treatmentDay3').val(),
                                    }

                                    var updateJob = 'http://track.asiacom.co.th/adswebapi/api/jobinfo?id=' + jobEdit.JobID;

                                    $.ajax({
                                        url: updateJob,
                                        type: "PUT",
                                        data: JSON.stringify(jobEdit),
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
                                        success: function (jobEdit) {
                                            console.log(jobEdit);
                                            clearJobForms();
                                            $('#TableFormNew').modal('hide');
                                            $('#jobs-editable').bootstrapTable('refresh');
                                            //window.location.reload(true);
                                        }
                                    });

                                }
                                else if (row.JobStatus == "Scheduled" || row.JobStatus == "Scheduled In Progress" || row.JobStatus == "Scheduled Edited") {

                                    var asset_id = $('#jobAssets').val();
                                    var jobStatus;
                                    if (asset_id > 0) {
                                        jobStatus = "Scheduled Edited";
                                    }
                                    else if (asset_id == 0) {
                                        jobStatus = "Scheduled";
                                    }

                                    var getDriverPhone = driver.Phone;
                                    if (getDriverPhone != "") {
                                        sessionStorage.setItem("setSessionstorageValueDriverPhone", getDriverPhone);
                                    }
                                    else {
                                        sessionStorage.setItem("setSessionstorageValueDriverPhone", 0);
                                    }

                                    var jobEdit = {
                                        JobID: $('#jobid').val(),
                                        Timestamp: timestamp,
                                        RxTime: $('#date').val(),
                                        Amount: finalAmount,
                                        Caller: $('#caller').val(),
                                        Phone: $('#phone').val(),
                                        Unit: 0,
                                        Bed: 0,
                                        Origin: $('#origin').val(),
                                        Destination: $('#destination').val(),
                                        Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                        Remarks: $('#remarks').val(),
                                        Patient: $('#patient').val(),
                                        Payment: $('#payment').val(),
                                        Trip: $('#trip').val(),
                                        Receipt: "",
                                        Flag: 1,
                                        JobNumber: $('#case').val(),
                                        JobStatus: jobStatus,
                                        Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                        Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                        AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                        AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                        JobDriver: $('#driver').val(),
                                        JobType: "Scheduled",
                                        AssetID: asset_id
                                    };

                                    var updateJob = 'http://track.asiacom.co.th/adswebapi/api/jobinfo?id=' + jobEdit.JobID;

                                    $.ajax({
                                        url: updateJob,
                                        type: "PUT",
                                        data: JSON.stringify(jobEdit),
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
                                        success: function (jobEdit) {
                                            console.log(jobEdit);
                                            clearJobForms();
                                            $('#TableFormNew').modal('hide');
                                            $('#jobs-editable').bootstrapTable('refresh');
                                            //window.location.reload(true);
                                        }
                                    });
                                }

                            }


                            else {
                                $.niftyNoty({
                                    type: 'danger',
                                    icon: 'fa fa-minus',
                                    message: 'Canceled',
                                    container: 'floating',
                                    timer: 3000
                                });
                            };

                        });
                    }
                    else {
                        alert('Job cannot be edited!');
                    }


                });
            }
            else {
                alert('Invalid Date');
            }

        }


    });

    $('#submit-jobEN').on('click', function () {

        var getTrip = $('#trip').val();
        var getTimestamp = $("#date").val();
        var dateFormat = "DD-MMM-YYYY"; //DD-MMM-YYYY
        var convertTimestamp = moment(getTimestamp, dateFormat);

        var validateTimestamp = moment(getTimestamp, dateFormat).isValid();
        var timestamp = moment(convertTimestamp).format(dateFormat);
        var checkCase = $('#case').val();
        // Get today's date
        var todaysDate = moment().format('DD-MMM-YYYY');

        if (todaysDate > timestamp) {
            alert('Invalid Date Selected');
        }
        else {
            if (validateTimestamp == true)
            {
                if (checkCase.substring(3, 15) == "Invalid date")
                {
                    alert('Invalid Case Number');
                }
                else
                {
                    //action
                    bootbox.setDefaults({
                        /**
                         * @optional String
                         * @default: en
                         * which locale settings to use to translate the three
                         * standard button labels: OK, CONFIRM, CANCEL
                         */
                        locale: "en",


                    });

                    bootbox.confirm("<div style='color:black'>Are you sure you wish to add a job?</div>", function (result) {

                        if (result) {

                            $.niftyNoty({
                                type: 'success',
                                icon: 'fa fa-check',
                                message: 'Successful',
                                container: 'floating',
                                timer: 3000
                            });

                            jQuery.support.cors = true;

                            function createCORSRequest(method, url) {
                                var xhr = new XMLHttpRequest();
                                if ("withCredentials" in xhr) {

                                    // Check if the XMLHttpRequest object has a "withCredentials" property.
                                    // "withCredentials" only exists on XMLHTTPRequest2 objects.
                                    xhr.open(method, url, true);

                                } else if (typeof XDomainRequest != "undefined") {

                                    // Otherwise, check if XDomainRequest.
                                    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                                    xhr = new XDomainRequest();
                                    xhr.open(method, url);

                                } else {

                                    // Otherwise, CORS is not supported by the browser.
                                    xhr = null;

                                }
                                return xhr;
                            }

                            var url = 'http://track.asiacom.co.th/adswebapi/api/jobinfo';
                            var xhr = createCORSRequest('GET', url);
                            xhr.send();
                            if (!xhr) {
                                throw new Error('CORS not supported');
                            }


                            var getJobID = $('#jobid').val();
                            var getAmount = $('#amount').val();
                            var finalAmount = getAmount.replace(/\D/g, '');

                            var dateFormat = "D-MMM-YYYY, hh:mm:ss A";
                            var getTimestamp = $("#date").val();
                            var convertTimestamp = moment(getTimestamp, dateFormat);
                            //var timestamp = moment(convertTimestamp).subtract('hours', 8).format(dateFormat);
                            var timestamp = moment(convertTimestamp).subtract('minutes', 495).format(dateFormat);
                            var timestamp2 = moment(convertTimestamp).subtract('minutes', 195).format(dateFormat);

                            //Reverse Geocode
                            var origin;
                            var destination;
                            var geocoder = null;

                            var from = $('#origin').val();
                            var to = $('#destination').val();

                            if (from.length == 6)
                            {
                                origin = sessionStorage.getItem('setSessionstorageValueScheduledJobLocationFrom');
                            }
                            else 
                            {
                                origin = from;
                            }


                            if (to.length == 6)
                            {
                                destination = sessionStorage.getItem('setSessionstorageValueScheduledJobLocationTo');
                            }
                            else 
                            {
                                destination = to;
                            }


                            var searchAsset = 'http://track.asiacom.co.th/adswebapi/api/searchasset?AssetID=' + $('#assets').val();

                            if ($('#assets').val() == 0)
                            {

                                var job = {
                                    JobID: $('#jobid').val(),
                                    TOC: "",
                                    Timestamp: timestamp,
                                    RxTime: moment().format(),
                                    Amount: finalAmount,
                                    Caller: $('#caller').val(),
                                    Phone: $('#phone').val(),
                                    Unit: 0,
                                    Bed: 0,
                                    Origin: origin,
                                    Destination: destination,
                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                    Remarks: $('#remarks').val(),
                                    Patient: $('#patient').val(),
                                    Payment: $('#payment').val(),
                                    Trip: $('#trip').val(),
                                    Receipt: "",
                                    Flag: 1,
                                    JobNumber: $('#case').val(),
                                    JobStatus: "Scheduled",
                                    Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                    Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                    AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                    AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                    JobDriver: "",
                                    JobType: "Scheduled",
                                    //AssetID: asset_id
                                    AssetID: $('#assets').val()
                                };

                                if ($('#trip').val() == 2) {

                                    var date = new Date();
                                    var todaydate = date.getDate();
                                    var todaymon = date.getMonth() + 1;
                                    var todayyear = date.getFullYear();
                                    //pull the last two digits of the year
                                    todayyear = todayyear.toString().substr(2, 2);

                                    var q = todayyear;
                                    if (todaymon <= 9) {
                                        var y = "0" + todaymon;
                                    }
                                    else
                                        var y = todaymon;

                                    if (todaydate <= 9) {
                                        var z = "0" + todaydate;
                                    }
                                    else
                                        var z = todaydate;


                                    function randomString() {
                                        var chars = "0123456789";
                                        var string_length = 3;
                                        var randomstring = '';
                                        for (var i = 0; i < string_length; i++) {
                                            var rnum = Math.floor(Math.random() * chars.length);
                                            randomstring += chars.substring(rnum, rnum + 1);
                                        }

                                        return randomstring;
                                    }

                                    jobNumber = "JN-" + z + y + q + "-" + randomString();
                                }


                                var job2 = {
                                    JobID: $('#jobid').val(),
                                    TOC: "",
                                    Timestamp: timestamp2,
                                    RxTime: moment().format(),
                                    Amount: 0,
                                    Caller: $('#caller').val(),
                                    Phone: $('#phone').val(),
                                    Unit: 0,
                                    Bed: 0,
                                    Origin: destination,
                                    Destination: origin,
                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                    Remarks: $('#remarks').val(),
                                    Patient: $('#patient').val(),
                                    Payment: $('#payment').val(),
                                    Trip: $('#trip').val(),
                                    Receipt: "",
                                    Flag: 1,
                                    JobNumber: jobNumber,
                                    JobStatus: "Scheduled",
                                    Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                    Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                    AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                    AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                    JobDriver: "",
                                    JobType: "Scheduled",
                                    //AssetID: asset_id
                                    AssetID: $('#assets').val()
                                };

                                if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                    var apiJobNumber = 'http://track.asiacom.co.th/adswebapi/api/searchjob?JobNumber=' + job.JobNumber;

                                    //Check Duplicate Job Number
                                    $.getJSON(apiJobNumber, function (data) {

                                        if (data.length == 1) {
                                            alert('Job Number had been used!');

                                        }
                                        else {
                                            //Add Scheduled Job
                                            if (getTrip == 1) //One way Trip
                                            {
                                                $.ajax({
                                                    url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                    type: "POST",
                                                    data: JSON.stringify(job),
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
                                                    success: function (job) {
                                                        console.log(job);
                                                        //sendAlert();
                                                        clearJobForms();
                                                        generateJobNumber();
                                                        $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                    }
                                                });
                                            }
                                            else if (getTrip == 2) //Two Way Trip
                                            {
                                                $.ajax({
                                                    url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                    type: "POST",
                                                    data: JSON.stringify(job),
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
                                                    success: function (job) {
                                                        console.log(job);
                                                    }
                                                });

                                                $.ajax({
                                                    url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                    type: "POST",
                                                    data: JSON.stringify(job2),
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
                                                    success: function (job2) {
                                                        console.log(job2);
                                                        clearJobForms();
                                                        generateJobNumber();
                                                        $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                    }
                                                });
                                            }



                                        }

                                    });
                                }

                                else {

                                    var updateJob = 'http://track.asiacom.co.th/adswebapi/api/jobinfo?id=' + job.JobID;

                                    $.ajax({
                                        url: updateJob,
                                        type: "PUT",
                                        data: JSON.stringify(job),
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
                                        success: function (job) {
                                            console.log(job);
                                            clearJobForms();
                                            //window.location.reload(true);
                                        }
                                    });

                                }


                            }
                            else
                            {
                                $.getJSON(searchAsset, function (data) {

                                    $.each(data, function (index, item) {

                                        var trip;
                                        if ($('#trip').val() == 1) {
                                            trip = "One Way Trip ";
                                        } else if ($('#trip').val() == 2) {
                                            trip = "First Trip ";
                                        }

                                        var job = {
                                            JobID: $('#jobid').val(),
                                            TOC: "",
                                            Timestamp: timestamp,
                                            RxTime: moment().format(),
                                            Amount: finalAmount,
                                            Caller: $('#caller').val(),
                                            Phone: $('#phone').val(),
                                            Unit: 0,
                                            Bed: 0,
                                            Origin: origin,
                                            Destination: destination,
                                            Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                            Remarks: $('#remarks').val(),
                                            Remarks2: trip,
                                            Patient: $('#patient').val(),
                                            Payment: $('#payment').val(),
                                            Trip: $('#trip').val(),
                                            Receipt: "",
                                            Flag: 1,
                                            JobNumber: $('#case').val(),
                                            JobStatus: "Scheduled",
                                            Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                            Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                            AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                            AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                            JobDriver: item.DriverName,
                                            JobType: "Scheduled",
                                            AssetID: $('#assets').val()
                                        };

                                        if ($('#trip').val() == 2) {

                                            var date = new Date();
                                            var todaydate = date.getDate();
                                            var todaymon = date.getMonth() + 1;
                                            var todayyear = date.getFullYear();
                                            //pull the last two digits of the year
                                            todayyear = todayyear.toString().substr(2, 2);

                                            var q = todayyear;
                                            if (todaymon <= 9) {
                                                var y = "0" + todaymon;
                                            }
                                            else
                                                var y = todaymon;

                                            if (todaydate <= 9) {
                                                var z = "0" + todaydate;
                                            }
                                            else
                                                var z = todaydate;


                                            function randomString() {
                                                var chars = "0123456789";
                                                var string_length = 3;
                                                var randomstring = '';
                                                for (var i = 0; i < string_length; i++) {
                                                    var rnum = Math.floor(Math.random() * chars.length);
                                                    randomstring += chars.substring(rnum, rnum + 1);
                                                }

                                                return randomstring;
                                            }

                                            jobNumber = "JN-" + z + y + q + "-" + randomString();
                                        }

                                        var job2 = {
                                            JobID: $('#jobid').val(),
                                            TOC: "",
                                            Timestamp: timestamp2,
                                            RxTime: moment().format(),
                                            Amount: 0,
                                            Caller: $('#caller').val(),
                                            Phone: $('#phone').val(),
                                            Unit: 0,
                                            Bed: 0,
                                            Origin: destination,
                                            Destination: origin,
                                            Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                            Remarks: $('#remarks').val(),
                                            Remarks2: "Return Trip",
                                            Patient: $('#patient').val(),
                                            Payment: $('#payment').val(),
                                            Trip: $('#trip').val(),
                                            Receipt: "",
                                            Flag: 1,
                                            JobNumber: jobNumber,
                                            JobStatus: "Scheduled",
                                            Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                            Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                            AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                            AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                            JobDriver: item.DriverName,
                                            JobType: "Scheduled",
                                            AssetID: $('#assets').val()
                                        };

                                        sessionStorage.setItem("setSessionstorageValueDriverPhone", item.Phone);
                                        //alert(job.AssetID);

                                        //Save/Edit Jobs
                                        if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                            var apiJobNumber = 'http://track.asiacom.co.th/adswebapi/api/searchjob?JobNumber=' + job.JobNumber;

                                            //Check Duplicate Job Number
                                            $.getJSON(apiJobNumber, function (data) {

                                                if (data.length == 1) {
                                                    alert('Job Number had been used!');

                                                }
                                                else {
                                                    //Add Scheduled Job
                                                    if (getTrip == 1) //One way Trip
                                                    {
                                                        $.ajax({
                                                            url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                            type: "POST",
                                                            data: JSON.stringify(job),
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
                                                            success: function (job) {
                                                                console.log(job);
                                                                sendAlert();
                                                                clearJobForms();
                                                                generateJobNumber();
                                                                $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                            }
                                                        });
                                                    }
                                                    else if (getTrip == 2) //Two Way Trip
                                                    {
                                                        $.ajax({
                                                            url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                            type: "POST",
                                                            data: JSON.stringify(job),
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
                                                            success: function (job) {
                                                                console.log(job);
                                                                sendAlert();
                                                            }
                                                        });

                                                        $.ajax({
                                                            url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                            type: "POST",
                                                            data: JSON.stringify(job2),
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
                                                            success: function (job2) {
                                                                console.log(job2);
                                                                sendAlertRtn();
                                                                clearJobForms();
                                                                generateJobNumber();
                                                                $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                            }
                                                        });
                                                    }



                                                }

                                            });
                                        }

                                        else {

                                            var updateJob = 'http://track.asiacom.co.th/adswebapi/api/jobinfo?id=' + job.JobID;

                                            $.ajax({
                                                url: updateJob,
                                                type: "PUT",
                                                data: JSON.stringify(job),
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
                                                success: function (job) {
                                                    console.log(job);
                                                    clearJobForms();
                                                    //window.location.reload(true);
                                                }
                                            });

                                        }

                                    });
                                });
                            }

                            




                        }
                        else {
                            $.niftyNoty({
                                type: 'danger',
                                icon: 'fa fa-minus',
                                message: 'Canceled',
                                container: 'floating',
                                timer: 3000
                            });
                        };

                    });
                }
            }
            else {
                alert('Invalid Date');
            }
        }
    });

 $('#job-confirm-deleteEN').on('click', function () {

        bootbox.setDefaults({
            /**
             * @optional String
             * @default: en
             * which locale settings to use to translate the three
             * standard button labels: OK, CONFIRM, CANCEL
             */
            locale: "en",


        });

        var ids = $.map($table.bootstrapTable('getSelections'), function (row) {

            var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');
            var Singapore = moment.tz(row.Timestamp, Asia);
            var timestamp = moment.utc(Singapore.format()).add('hours', 8).format('D-MMM-YYYY, HH:mm:ss');

            var driver = {
                Name: row.JobDriver,
            }

            //Filter delete job
            if (row.Flag == 0 ||row.Flag == 1 || row.Flag == 2)
            {               
                bootbox.confirm("<div style='color:black'>Are you sure you wish to delete ?</div>", function (result) {
                    if (result) {

                        $.niftyNoty({
                            type: 'success',
                            icon: 'fa fa-check',
                            //message: 'Deleted Successfully',
                            message: 'Deleted Successfully',
                            container: 'floating',
                            timer: 3000
                        });


                            var job = JSON.stringify({ 'JobID': row.JobID });
                            var WebAPI = 'http://track.asiacom.co.th/adswebapi/api/jobinfo/' + row.JobID;

                            $.ajax({
                                url: WebAPI,
                                type: "Delete",
                                data: JSON.stringify(job),
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
                                success: function (job) {
                                    console.log(job);

                                    if (row.Flag == 1 || row.Flag == 2)
                                    {
                                        //Get Asset
                                        $.ajax({
                                            url: "http://track.asiacom.co.th/adswebapi/api/checkdriver",
                                            type: "POST",
                                            data: JSON.stringify(driver),
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
                                            success: function (driver) {
                                                console.log(driver);
                                                var asset_id = driver.AssetID;
                                                var getDriverPhone;

                                                if (getDriverPhone != "") {
                                                    getDriverPhone = driver.Phone;
                                                }
                                                else {
                                                    getDriverPhone = 0;
                                                }
                                                sendCancelAlert(row.Patient, row.Origin, row.Destination, timestamp, row.AssetID, row.CompanyID, row.JobNumber, getDriverPhone);

                                            }
                                        });


                                    }

                                    $('#jobs-editable').bootstrapTable('refresh');
                                }
                            });
                            return row.JobID
   
                    }


                    else {
                        $.niftyNoty({
                            type: 'danger',
                            icon: 'fa fa-minus',
                            message: 'Delete Canceled',
                            container: 'floating',
                            timer: 3000
                        });
                    };

                });

            }
            else
            {
                alert('Job cannot be deleted!');
            }
        });

        $table.bootstrapTable('remove', {
            field: 'JobID',
            values: ids
        });
        $remove.prop('disabled', true);


    });




    // =================================================================

    //Submit Jobs Call center

    $('#submit-call').on('click', function () {

        var getTimestamp = $("#date").val();
        var dateFormat = "DD-MMM-YYYY"; //DD-MMM-YYYY
        var convertTimestamp = moment(getTimestamp, dateFormat);

        var validateTimestamp = moment(getTimestamp, dateFormat).isValid();
        var timestamp = moment(convertTimestamp).format(dateFormat);
        // Get today's date
        var todaysDate = moment().format('DD-MMM-YYYY');
        var getReference = $("#reference").val();
        var getAmount = $("#amount").val();
        var getTrip = $('#trip').val();

        var searchAsset = 'http://track.asiacom.co.th/adswebapi/api/searchasset?AssetID=' + sessionStorage.getItem('setSessionstorageValueAvailableAmbulance');

        $.getJSON(searchAsset, function (data) {

            $.each(data, function (index, item) {

                if (item.DriverID == 0)
                {
                    alert('Selected Ambulance has no driver! Pls. try again');
                }
                else
                {
                    if (getReference == "") {
                        alert('Job Number must not be empty!');
                    }
                    else {
                        if (todaysDate > timestamp || todaysDate < timestamp || getTimestamp == "") {
                            alert('Invalid Date Selected');
                        }
                        else {
                            if (validateTimestamp == true) {
                                if (getAmount == "") {
                                    alert('Amount must not be empty!');
                                }
                                else {
                                    if (sessionStorage.getItem('setSessionstorageValueAvailableAmbulance') == null || sessionStorage.getItem('setSessionstorageValueAvailableAmbulance') == "") {
                                        alert('Pls. assign a vehicle');
                                    }
                                    else {
                                        //action
                                        bootbox.setDefaults({
                                            /**
                                             * @optional String
                                             * @default: en
                                             * which locale settings to use to translate the three
                                             * standard button labels: OK, CONFIRM, CANCEL
                                             */
                                            locale: "en",


                                        });

                                        bootbox.confirm("<div style='color:black'>Are you sure you wish to submit?</div>", function (result) {

                                            if (result) {

                                                $.niftyNoty({
                                                    type: 'success',
                                                    icon: 'fa fa-check',
                                                    message: 'Successful',
                                                    container: 'floating',
                                                    timer: 3000
                                                });

                                                jQuery.support.cors = true;

                                                function createCORSRequest(method, url) {
                                                    var xhr = new XMLHttpRequest();
                                                    if ("withCredentials" in xhr) {

                                                        // Check if the XMLHttpRequest object has a "withCredentials" property.
                                                        // "withCredentials" only exists on XMLHTTPRequest2 objects.
                                                        xhr.open(method, url, true);

                                                    } else if (typeof XDomainRequest != "undefined") {

                                                        // Otherwise, check if XDomainRequest.
                                                        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                                                        xhr = new XDomainRequest();
                                                        xhr.open(method, url);

                                                    } else {

                                                        // Otherwise, CORS is not supported by the browser.
                                                        xhr = null;

                                                    }
                                                    return xhr;
                                                }

                                                var url = 'http://track.asiacom.co.th/adswebapi/api/jobinfo';
                                                var xhr = createCORSRequest('GET', url);
                                                xhr.send();
                                                if (!xhr) {
                                                    throw new Error('CORS not supported');
                                                }


                                                var getJobID = $('#jobid').val();
                                                var getAddress;
                                                var address = $('#address').val();
                                                var origin = $('#origin').val();
                                                var nursingFrom = $('#nursingFrom').val();
                                                var getFinalAddress;

                                                if (address == "") {

                                                    if (origin == "") {
                                                        getFinalAddress = nursingFrom;
                                                    }
                                                    else if (nursingFrom == "") {
                                                        getFinalAddress = origin;
                                                    }


                                                    switch (getFinalAddress) {
                                                        case "1.3407,103.9495":
                                                            getAddress = "Changi General Hospital (CGH)";
                                                            break;
                                                        case "1.3074,103.8200":
                                                            getAddress = "Gleneagles Hospital";
                                                            break;
                                                        case "1.4238,103.8387":
                                                            getAddress = "Khoo Teck Puat Hospital";
                                                            break;
                                                        case "1.3106,103.8469":
                                                            getAddress = "KK Women's And Children's Hospital (KKH)";
                                                            break;
                                                        case "1.3418,103.8379":
                                                            getAddress = "Mount Alvernia Hospital";
                                                            break;
                                                        case "1.3054,103.8356":
                                                            getAddress = "Mount Elizabeth Hospital";
                                                            break;
                                                        case "1.2944,103.7829":
                                                            getAddress = "National University Hospital (NUH)";
                                                            break;
                                                        case "1.3349,103.7447":
                                                            getAddress = "Ng Teng Fong General Hospital & Jurong Community Hospital";
                                                            break;
                                                        case "1.3151,103.9091":
                                                            getAddress = "Parkway East Hospital (former East Shore Hospital)";
                                                            break;
                                                        case "1.3011,103.8575":
                                                            getAddress = "Raffles Hospital";
                                                            break;
                                                        case "1.2795,103.8348":
                                                            getAddress = "Singapore General Hospital (SGH)";
                                                            break;
                                                        case "1.3214,103.8459":
                                                            getAddress = "Tan Tock Seng Hospital (TTSH)";
                                                            break;
                                                        case "1.325707,103.841496":
                                                            getAddress = "Thomson Medical Centre (TMC)";
                                                            break;
                                                        case "1.3825,103.8843":
                                                            getAddress = "Institute of Mental Health";
                                                            break;
                                                            //Nursing Home
                                                        case "452 Upper East Coast Rd, Singapore 466500":
                                                            getAddress = "Econ Medicare Centre (Upper East Coast Rd)";
                                                            break;
                                                        case "52 Biggin Hill Rd, Singapore 509945":
                                                            getAddress = "Orange Valley Nursing Home (Changi)";
                                                            break;
                                                        case "148A Silat Avenue 168871":
                                                            getAddress = "Orange Valley Nursing Home (Bukit Merah)";
                                                            break;
                                                        case "221 Clementi Ave 4 129881":
                                                            getAddress = "Orange Valley Nursing Home (Clementi)";
                                                            break;
                                                        case "11 Woodland Avenue 1 739068":
                                                            getAddress = "Orange Valley Nursing Home (Marsiling)";
                                                            break;
                                                        case "6 Simei Street 3 529898":
                                                            getAddress = "Orange Valley Nursing Home (Simei)";
                                                            break;
                                                        case "461A Sims Avenue 387541":
                                                            getAddress = "Orange Valley Nursing Home (Sims Avenue)";
                                                            break;
                                                        case "11 Tampines Street 44, Singapore 529123":
                                                            getAddress = "All Saints Home (Tampines Street)";
                                                            break;
                                                        case "31 Joo Chiat Ln, Singapore 428101":
                                                            getAddress = "Serene Nursing Home Pte Ltd";
                                                            break;
                                                        case "106 Braddell Rd, Singapore 359912":
                                                            getAddress = "Nightingale";
                                                            break;
                                                        case "134 Lor J Telok Kurau, Singapore 425962":
                                                            getAddress = "Paean Nursing Home Pte Ltd";
                                                            break;
                                                        case "205 Jln Kayu, Singapore 799436":
                                                            getAddress = "Ju Eng Home For Senior Citizens";
                                                            break;
                                                        case "11 Jln Ampas, Singapore 329514":
                                                            getAddress = "Irene Nursing Home Pte. Ltd";
                                                            break;
                                                        case "20 Woodlands Street 82, Singapore 738507":
                                                            getAddress = "The Man Fut Tong Nursing Home";
                                                            break;
                                                        case "31 Bukit Batok Street 52, Singapore 650540":
                                                            getAddress = "Ren Ci @ Bukit Batok St. 52";
                                                            break;
                                                        case "9 Upper Changi Rd N, 507706":
                                                            getAddress = "Peacehaven Nursing Home";
                                                            break;
                                                        case "1 Thomson Ln, Singapore 297728":
                                                            getAddress = "Lee Ah Mooi";
                                                            break;
                                                        case "130 West Coast Drive Singapore 127444":
                                                            getAddress = "Jamiyah Nursing Home";
                                                            break;
                                                        case "1 Tampines Ave 3, Singapore 529707":
                                                            getAddress = "Jamiyah Home for the Aged";
                                                            break;
                                                        case "9 Choa Chu Kang Ave 4, Singapore 689815":
                                                            getAddress = "Bethany Methodist Welfare Services";
                                                            break;
                                                        case "9 Mandai Estate, 729906":
                                                            getAddress = "St. Joseph's Home";
                                                            break;
                                                        case "12 Yishun Ave 5, Singapore 768990":
                                                            getAddress = "Sree Narayana Mission";
                                                            break;
                                                        case "100 Punggol Field, 828811":
                                                            getAddress = "Bright Hill Evergreen Home";
                                                            break;
                                                        case "60 Buangkok View, 534191":
                                                            getAddress = "St. Andrew's Nursing Home";
                                                            break;
                                                        case "130 Hougang Ave 1, Singapore 538900":
                                                            getAddress = "Society For The Aged Sick";
                                                            break;
                                                        case "6 Lengkok Bahru, 159051":
                                                            getAddress = "Pacific Healthcare Nursing Home (Lengkok Bahru)";
                                                            break;
                                                        case "10 Pasir Ris Walk, 518240":
                                                            getAddress = "Apex Harmony Lodge";
                                                            break;
                                                        case "369 Pasir Panjang Rd, Singapore 118706":
                                                            getAddress = "Windsor Convalescent Home Pte Ltd";
                                                            break;
                                                        case "20 Sembawang Cres, Singapore 757092":
                                                            getAddress = "Singapore Christian Home";
                                                            break;
                                                        case "19 Toh Drive, 507871":
                                                            getAddress = "Our Lady Of Lourdes Nursing Home Pte.Ltd";
                                                            break;
                                                        case "1 Lor 23 Geylang, 388352":
                                                            getAddress = "Green Avenue Home for the Elderly";
                                                            break;
                                                        case "156 Serangoon Garden Way, Singapore 556055":
                                                            getAddress = "Ling Kwang Home";
                                                            break;
                                                        case "2 Jln Ulu Siglap, Singapore 457121":
                                                            getAddress = "LC Nursing Home";
                                                            break;
                                                        case "50 Jln Tan Tock Seng, 308438":
                                                            getAddress = "Ren Ci Nursing Home (moulmein)";
                                                            break;
                                                        case "159 Serangoon Garden Way, Singapore 556056":
                                                            getAddress = "Cheshire Home";
                                                            break;
                                                        case "21 Senja Rd, 677736":
                                                            getAddress = "Pacific Healthcare Nursing Home II (Senja Rd)";
                                                            break;
                                                        case "91 Yishun Central, 768829":
                                                            getAddress = "Villa Francis Home";
                                                            break;
                                                        case "49 Upper Thomson Rd, 574325":
                                                            getAddress = "St. Theresa's Home";
                                                            break;
                                                        case "69 Wan Tho Avenue, 347601":
                                                            getAddress = "St John's Home";
                                                            break;
                                                        case "487 Bedok South Ave 2, Singapore 469316":
                                                            getAddress = "Lions Home For The Elders (Bedok South)";
                                                            break;
                                                        case "451 Yio Chu Kang Rd, 805947":
                                                            getAddress = "Econ Medicare Centres & Nursing Homes";
                                                            break;
                                                        case "25 Recreation Road, 546522":
                                                            getAddress = "Econ Medicare Centre Pte Ltd (Recreation Road)";
                                                            break;
                                                        case "6 Bishan Street 13, Singapore 579798":
                                                            getAddress = "Bishan Home For The Intellectually Disabled";
                                                            break;
                                                        case "9 Bishan Street 13, 579804":
                                                            getAddress = "Lions Home For The Elders (Bishan)";
                                                            break;
                                                        case "170 Lor 6 Toa Payoh, Singapore 319400":
                                                            getAddress = "United Medicare Centre (Toa Payoh)";
                                                            break;
                                                        case "72 Elizabeth Drive, 669745":
                                                            getAddress = "United Medicare Centre (Elizabeth Drive)";
                                                            break;
                                                        case "10 Buangkok View, 539747":
                                                            getAddress = "Econ Medicare Centre (Buangkok View)";
                                                            break;
                                                        case "5 Poh Huat Rd, Singapore 546703":
                                                            getAddress = "All Saints Home (Hougang)";
                                                            break;
                                                        case "551 Yishun Ring Road Singapore 768681":
                                                            getAddress = "All Saints Home (Yishun)";
                                                            break;
                                                        case "20 Jurong East Avenue 1":
                                                            getAddress = "All Saints Home (Jurong)";
                                                            break;
                                                        case "10 Jalan Tan Tock Seng, 308436":
                                                            getAddress = "Dover Park Hospice";
                                                            break;
                                                        case "820 Thomson Rd, 574623":
                                                            getAddress = "Assisi Hospice";
                                                            break;
                                                        case "10 Simei Street 3":
                                                            getAddress = "Simei Care Centre";
                                                            break;
                                                        case "71 Irrawaddy Rd, 329562":
                                                            getAddress = "Ren Ci Community Hospital";
                                                            break;
                                                        case "1 Jurong East Street 21, 609606":
                                                            getAddress = "Jurong Community Hospital";
                                                            break;
                                                        case "17 Ang Mo Kio Ave 9, 569766":
                                                            getAddress = "Thye Hua Kwan Hospital";
                                                            break;
                                                        case "8 Simei Street 3, 529895":
                                                            getAddress = "Saint Andrew's Community Hospital";
                                                            break;
                                                        case "705 Serangoon Road, 328127":
                                                            getAddress = "Kwong Wai Shiu Hospital";
                                                            break;
                                                        case "378 Alexandra Road, Singapore 159964":
                                                            getAddress = "Alexandra Hospital";
                                                            break;
                                                        case "5 Lor Napiri, Singapore 547530":
                                                            getAddress = "Bright Vision Hospital";
                                                            break;
                                                        case "5 Pearl's Hill Road 168996":
                                                            getAddress = "Pearl's Hill Care Home";
                                                            break;
                                                        case "10 Kaki Bukit Avenue 5 417902":
                                                            getAddress = "Acacia Welfare Home";
                                                            break;
                                                        case "195 Kim Keat Ave #01-294 310195":
                                                            getAddress = "Adventist Home For The Elders";
                                                            break;
                                                        case "14 Buangkok Green 539755":
                                                            getAddress = "Angsana Home @ Pelangi Village";
                                                            break;
                                                        case "12 Buangkok Green 539754":
                                                            getAddress = "Banyan Home @ Pelangi Village";
                                                            break;
                                                        case "201 Jurong East Avenue 1 609791":
                                                            getAddress = "Blue Cross Thong Kheng Home";
                                                            break;
                                                        case "6 Fourth Chin Bee Rd 619708":
                                                            getAddress = "Bo Tien Home For The Aged";
                                                            break;
                                                        case "11 Bukit Batok West Ave 2 659205":
                                                            getAddress = "Bukit Batok Home For The Aged";
                                                            break;
                                                        case "51 Marsiling Drive 739297":
                                                            getAddress = "Christalite Methodist Home";
                                                            break;
                                                        case "53 Choa Chu Kang Road 689385":
                                                            getAddress = "Econ Medicare Centre (Choa Chu Kang Rd)";
                                                            break;
                                                        case "351 Chai Chee Street 468982":
                                                            getAddress = "Econ Medicare Centre (Chai Chee Street)";
                                                            break;
                                                        case "58 Braddell Road 359905":
                                                            getAddress = "Econ Medicare Centre (Braddell Road)";
                                                            break;
                                                        case "255A Bukit Timah Road 259691":
                                                            getAddress = "Good Shepherd Loft";
                                                            break;
                                                        case "19 Compassvale Walk 544644":
                                                            getAddress = "Grace Lodge";
                                                            break;
                                                        case "10 Buangkok Green 539753":
                                                            getAddress = "Jenaris Home @ Pelangi Village";
                                                            break;
                                                        case "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681":
                                                            getAddress = "Kheng Chiu Loke Tin Kee Home";
                                                            break;
                                                        case "6 Buangkok Green 539751":
                                                            getAddress = "Meranti Home @ Pelangi Village";
                                                            break;
                                                        case "39 Sims Avenue 387412":
                                                            getAddress = "Min Chong Comfort Home Pte Ltd";
                                                            break;
                                                        case "7 Lorong Napiri 547533":
                                                            getAddress = "Mindsville @ Napiri - Home";
                                                            break;
                                                        case "1 Jalan Bilal, 468854":
                                                            getAddress = "Moral Home For The Aged Sick (Jalan Bilal)";
                                                            break;
                                                        case "301 Henderson Road 108931":
                                                            getAddress = "Moral Welfare Home (Henderson Road)";
                                                            break;
                                                        case "50 Jurong West Street 93 648967":
                                                            getAddress = "NTUC Health Nursing Home (Jurong West)";
                                                            break;
                                                        case "45 Sixth Avenue 276487":
                                                            getAddress = "Soo's Nursing Home Pte Ltd";
                                                            break;
                                                        case "263 Waterloo Street #05-01 180263":
                                                            getAddress = "St Vincent Home";
                                                            break;
                                                        case "70 Buangkok View 534190":
                                                            getAddress = "Sunlove Home";
                                                            break;
                                                        case "10 Ama Keng Road 709828":
                                                            getAddress = "Sunnyville Home";
                                                            break;
                                                        case "5 Sembawang Walk 757717":
                                                            getAddress = "Swami Home";
                                                            break;
                                                        case "10 Jalan Ampas 329510":
                                                            getAddress = "Tai Pei Old People's Home";
                                                            break;
                                                        case "10 Buangkok View 539747":
                                                            getAddress = "Tai Pei Social Service (TPSS)";
                                                            break;
                                                        case "51 Lentor Avenue 786876":
                                                            getAddress = "The Lentor Residence";
                                                            break;
                                                        case "115 Lorong G Telok Kurau 426317":
                                                            getAddress = "Thian Leng Old Folks Home";
                                                            break;
                                                        case "91 Geylang East Avenue 2 389759":
                                                            getAddress = "Thong Teck Home For Senior Citizens";
                                                            break;
                                                        case "4 Buangkok Green 539750":
                                                            getAddress = "Thuja Home @ Pelangi Village";
                                                            break;
                                                        case "55 Queensway 149058":
                                                            getAddress = "United Medicare Centre (Queensway)";
                                                            break;
                                                        case "2 Buangkok Green 539749":
                                                            getAddress = "Tembusu Home @ Pelangi Village";
                                                            break;
                                                        default:
                                                            getAddress = "Singapore";
                                                    }
                                                }
                                                else {

                                                    //Reverse Geocode
                                                    if (address.length == 6)
                                                    {                                                       
                                                        getAddress = sessionStorage.getItem('setSessionstorageValueNewJobLocationFrom');                                                                                                        
                                                    }
                                                    else
                                                    {
                                                        getAddress = $('#address').val();
                                                    }

                                                    
                                                }

                                                var getDestination;
                                                var toDestination = $('#to-destination').val();
                                                var destination = $('#destination').val();
                                                var nursingTo = $('#nursingTo').val();
                                                var getFinalDestination;

                                                if (toDestination == "") {
                                               
                                                    if (destination == "") {
                                                        getFinalDestination = nursingTo;

                                                        switch (getFinalDestination) {
                                                            //Nursing Home
                                                            case "452 Upper East Coast Rd, Singapore 466500":
                                                                getDestination = "Econ Medicare Centre (Upper East Coast Rd)";
                                                                break;
                                                            case "52 Biggin Hill Rd, Singapore 509945":
                                                                getDestination = "Orange Valley Nursing Home (Changi)";
                                                                break;
                                                            case "148A Silat Avenue 168871":
                                                                getDestination = "Orange Valley Nursing Home (Bukit Merah)";
                                                                break;
                                                            case "221 Clementi Ave 4 129881":
                                                                getDestination = "Orange Valley Nursing Home (Clementi)";
                                                                break;
                                                            case "11 Woodland Avenue 1 739068":
                                                                getDestination = "Orange Valley Nursing Home (Marsiling)";
                                                                break;
                                                            case "6 Simei Street 3 529898":
                                                                getDestination = "Orange Valley Nursing Home (Simei)";
                                                                break;
                                                            case "461A Sims Avenue 387541":
                                                                getDestination = "Orange Valley Nursing Home (Sims Avenue)";
                                                                break;
                                                            case "11 Tampines Street 44, Singapore 529123":
                                                                getDestination = "All Saints Home (Tampines Street)";
                                                                break;
                                                            case "31 Joo Chiat Ln, Singapore 428101":
                                                                getDestination = "Serene Nursing Home Pte Ltd";
                                                                break;
                                                            case "106 Braddell Rd, Singapore 359912":
                                                                getDestination = "Nightingale";
                                                                break;
                                                            case "134 Lor J Telok Kurau, Singapore 425962":
                                                                getDestination = "Paean Nursing Home Pte Ltd";
                                                                break;
                                                            case "205 Jln Kayu, Singapore 799436":
                                                                getDestination = "Ju Eng Home For Senior Citizens";
                                                                break;
                                                            case "11 Jln Ampas, Singapore 329514":
                                                                getDestination = "Irene Nursing Home Pte. Ltd";
                                                                break;
                                                            case "20 Woodlands Street 82, Singapore 738507":
                                                                getDestination = "The Man Fut Tong Nursing Home";
                                                                break;
                                                            case "31 Bukit Batok Street 52, Singapore 650540":
                                                                getDestination = "Ren Ci @ Bukit Batok St. 52";
                                                                break;
                                                            case "9 Upper Changi Rd N, 507706":
                                                                getDestination = "Peacehaven Nursing Home";
                                                                break;
                                                            case "1 Thomson Ln, Singapore 297728":
                                                                getDestination = "Lee Ah Mooi";
                                                                break;
                                                            case "130 West Coast Drive Singapore 127444":
                                                                getDestination = "Jamiyah Nursing Home";
                                                                break;
                                                            case "1 Tampines Ave 3, Singapore 529707":
                                                                getDestination = "Jamiyah Home for the Aged";
                                                                break;
                                                            case "9 Choa Chu Kang Ave 4, Singapore 689815":
                                                                getDestination = "Bethany Methodist Welfare Services";
                                                                break;
                                                            case "9 Mandai Estate, 729906":
                                                                getDestination = "St. Joseph's Home";
                                                                break;
                                                            case "12 Yishun Ave 5, Singapore 768990":
                                                                getDestination = "Sree Narayana Mission";
                                                                break;
                                                            case "100 Punggol Field, 828811":
                                                                getDestination = "Bright Hill Evergreen Home";
                                                                break;
                                                            case "60 Buangkok View, 534191":
                                                                getDestination = "St. Andrew's Nursing Home";
                                                                break;
                                                            case "130 Hougang Ave 1, Singapore 538900":
                                                                getDestination = "Society For The Aged Sick";
                                                                break;
                                                            case "6 Lengkok Bahru, 159051":
                                                                getDestination = "Pacific Healthcare Nursing Home (Lengkok Bahru)";
                                                                break;
                                                            case "10 Pasir Ris Walk, 518240":
                                                                getDestination = "Apex Harmony Lodge";
                                                                break;
                                                            case "369 Pasir Panjang Rd, Singapore 118706":
                                                                getDestination = "Windsor Convalescent Home Pte Ltd";
                                                                break;
                                                            case "20 Sembawang Cres, Singapore 757092":
                                                                getDestination = "Singapore Christian Home";
                                                                break;
                                                            case "19 Toh Drive, 507871":
                                                                getDestination = "Our Lady Of Lourdes Nursing Home Pte.Ltd";
                                                                break;
                                                            case "1 Lor 23 Geylang, 388352":
                                                                getDestination = "Green Avenue Home for the Elderly";
                                                                break;
                                                            case "156 Serangoon Garden Way, Singapore 556055":
                                                                getDestination = "Ling Kwang Home";
                                                                break;
                                                            case "2 Jln Ulu Siglap, Singapore 457121":
                                                                getDestination = "LC Nursing Home";
                                                                break;
                                                            case "50 Jln Tan Tock Seng, 308438":
                                                                getDestination = "Ren Ci Nursing Home (moulmein)";
                                                                break;
                                                            case "159 Serangoon Garden Way, Singapore 556056":
                                                                getDestination = "Cheshire Home";
                                                                break;
                                                            case "21 Senja Rd, 677736":
                                                                getDestination = "Pacific Healthcare Nursing Home II (Senja Rd)";
                                                                break;
                                                            case "91 Yishun Central, 768829":
                                                                getDestination = "Villa Francis Home";
                                                                break;
                                                            case "49 Upper Thomson Rd, 574325":
                                                                getDestination = "St. Theresa's Home";
                                                                break;
                                                            case "69 Wan Tho Avenue, 347601":
                                                                getDestination = "St John's Home";
                                                                break;
                                                            case "487 Bedok South Ave 2, Singapore 469316":
                                                                getDestination = "Lions Home For The Elders (Bedok South)";
                                                                break;
                                                            case "451 Yio Chu Kang Rd, 805947":
                                                                getDestination = "Econ Medicare Centres & Nursing Homes";
                                                                break;
                                                            case "25 Recreation Road, 546522":
                                                                getDestination = "Econ Medicare Centre Pte Ltd (Recreation Road)";
                                                                break;
                                                            case "6 Bishan Street 13, Singapore 579798":
                                                                getDestination = "Bishan Home For The Intellectually Disabled";
                                                                break;
                                                            case "9 Bishan Street 13, 579804":
                                                                getDestination = "Lions Home For The Elders (Bishan)";
                                                                break;
                                                            case "170 Lor 6 Toa Payoh, Singapore 319400":
                                                                getDestination = "United Medicare Centre (Toa Payoh)";
                                                                break;
                                                            case "72 Elizabeth Drive, 669745":
                                                                getDestination = "United Medicare Centre (Elizabeth Drive)";
                                                                break;
                                                            case "10 Buangkok View, 539747":
                                                                getDestination = "Econ Medicare Centre (Buangkok View)";
                                                                break;
                                                            case "5 Poh Huat Rd, Singapore 546703":
                                                                getDestination = "All Saints Home (Hougang)";
                                                                break;
                                                            case "551 Yishun Ring Road Singapore 768681":
                                                                getDestination = "All Saints Home (Yishun)";
                                                                break;
                                                            case "20 Jurong East Avenue 1":
                                                                getDestination = "All Saints Home (Jurong)";
                                                                break;
                                                            case "10 Jalan Tan Tock Seng, 308436":
                                                                getDestination = "Dover Park Hospice";
                                                                break;
                                                            case "820 Thomson Rd, 574623":
                                                                getDestination = "Assisi Hospice";
                                                                break;
                                                            case "10 Simei Street 3":
                                                                getDestination = "Simei Care Centre";
                                                                break;
                                                            case "71 Irrawaddy Rd, 329562":
                                                                getDestination = "Ren Ci Community Hospital";
                                                                break;
                                                            case "1 Jurong East Street 21, 609606":
                                                                getDestination = "Jurong Community Hospital";
                                                                break;
                                                            case "17 Ang Mo Kio Ave 9, 569766":
                                                                getDestination = "Thye Hua Kwan Hospital";
                                                                break;
                                                            case "8 Simei Street 3, 529895":
                                                                getDestination = "Saint Andrew's Community Hospital";
                                                                break;
                                                            case "705 Serangoon Road, 328127":
                                                                getDestination = "Kwong Wai Shiu Hospital";
                                                                break;
                                                            case "378 Alexandra Road, Singapore 159964":
                                                                getDestination = "Alexandra Hospital";
                                                                break;
                                                            case "5 Lor Napiri, Singapore 547530":
                                                                getDestination = "Bright Vision Hospital";
                                                                break;
                                                            case "5 Pearl's Hill Road 168996":
                                                                getDestination = "Pearl's Hill Care Home";
                                                                break;
                                                            case "10 Kaki Bukit Avenue 5 417902":
                                                                getDestination = "Acacia Welfare Home";
                                                                break;
                                                            case "195 Kim Keat Ave #01-294 310195":
                                                                getDestination = "Adventist Home For The Elders";
                                                                break;
                                                            case "14 Buangkok Green 539755":
                                                                getDestination = "Angsana Home @ Pelangi Village";
                                                                break;
                                                            case "12 Buangkok Green 539754":
                                                                getDestination = "Banyan Home @ Pelangi Village";
                                                                break;
                                                            case "201 Jurong East Avenue 1 609791":
                                                                getDestination = "Blue Cross Thong Kheng Home";
                                                                break;
                                                            case "6 Fourth Chin Bee Rd 619708":
                                                                getDestination = "Bo Tien Home For The Aged";
                                                                break;
                                                            case "11 Bukit Batok West Ave 2 659205":
                                                                getDestination = "Bukit Batok Home For The Aged";
                                                                break;
                                                            case "51 Marsiling Drive 739297":
                                                                getDestination = "Christalite Methodist Home";
                                                                break;
                                                            case "53 Choa Chu Kang Road 689385":
                                                                getDestination = "Econ Medicare Centre (Choa Chu Kang Rd)";
                                                                break;
                                                            case "351 Chai Chee Street 468982":
                                                                getDestination = "Econ Medicare Centre (Chai Chee Street)";
                                                                break;
                                                            case "58 Braddell Road 359905":
                                                                getDestination = "Econ Medicare Centre (Braddell Road)";
                                                                break;
                                                            case "255A Bukit Timah Road 259691":
                                                                getDestination = "Good Shepherd Loft";
                                                                break;
                                                            case "19 Compassvale Walk 544644":
                                                                getDestination = "Grace Lodge";
                                                                break;
                                                            case "10 Buangkok Green 539753":
                                                                getDestination = "Jenaris Home @ Pelangi Village";
                                                                break;
                                                            case "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681":
                                                                getDestination = "Kheng Chiu Loke Tin Kee Home";
                                                                break;
                                                            case "6 Buangkok Green 539751":
                                                                getDestination = "Meranti Home @ Pelangi Village";
                                                                break;
                                                            case "39 Sims Avenue 387412":
                                                                getDestination = "Min Chong Comfort Home Pte Ltd";
                                                                break;
                                                            case "7 Lorong Napiri 547533":
                                                                getDestination = "Mindsville @ Napiri - Home";
                                                                break;
                                                            case "1 Jalan Bilal, 468854":
                                                                getDestination = "Moral Home For The Aged Sick (Jalan Bilal)";
                                                                break;
                                                            case "301 Henderson Road 108931":
                                                                getDestination = "Moral Welfare Home (Henderson Road)";
                                                                break;
                                                            case "50 Jurong West Street 93 648967":
                                                                getDestination = "NTUC Health Nursing Home (Jurong West)";
                                                                break;
                                                            case "45 Sixth Avenue 276487":
                                                                getDestination = "Soo's Nursing Home Pte Ltd";
                                                                break;
                                                            case "263 Waterloo Street #05-01 180263":
                                                                getDestination = ">St Vincent Home";
                                                                break;
                                                            case "70 Buangkok View 534190":
                                                                getDestination = "Sunlove Home";
                                                                break;
                                                            case "10 Ama Keng Road 709828":
                                                                getDestination = "Sunnyville Home";
                                                                break;
                                                            case "5 Sembawang Walk 757717":
                                                                getDestination = "Swami Home";
                                                                break;
                                                            case "10 Jalan Ampas 329510":
                                                                getDestination = "Tai Pei Old People's Home";
                                                                break;
                                                            case "10 Buangkok View 539747":
                                                                getDestination = "Tai Pei Social Service (TPSS)";
                                                                break;
                                                            case "51 Lentor Avenue 786876":
                                                                getDestination = "The Lentor Residence";
                                                                break;
                                                            case "115 Lorong G Telok Kurau 426317":
                                                                getDestination = "Thian Leng Old Folks Home";
                                                                break;
                                                            case "91 Geylang East Avenue 2 389759":
                                                                getDestination = "Thong Teck Home For Senior Citizens";
                                                                break;
                                                            case "4 Buangkok Green 539750":
                                                                getDestination = "Thuja Home @ Pelangi Village";
                                                                break;
                                                            case "55 Queensway 149058":
                                                                getDestination = "United Medicare Centre (Queensway)";
                                                                break;
                                                            case "2 Buangkok Green 539749":
                                                                getDestination = "Tembusu Home @ Pelangi Village";
                                                                break;
                                                            default:
                                                                getDestination = "Singapore";
                                                        }
                                                    }
                                                    else if (nursingTo == "")
                                                    {
                                                        getDestination = destination;
                                                    }

                                                }
                                                else
                                                {
                                                    if (toDestination.length == 6)
                                                    {
                                                        getDestination = sessionStorage.getItem('setSessionstorageValueNewJobLocationTo');
                                                    }
                                                    else
                                                    {
                                                        getDestination = $('#to-destination').val();
                                                    }
                                                   
                                                }

                                                var dateFormat = "D-MMM-YYYY, hh:mm:ss A";
                                                var getTimestamp = $("#date").val();
                                                var convertTimestamp = moment(getTimestamp, dateFormat);
                                                //var timestamp = moment(convertTimestamp).subtract('hours', 8).format(dateFormat);
                                                var timestamp = moment(convertTimestamp).subtract('minutes', 495).format(dateFormat);
                                                var timestamp2 = moment(convertTimestamp).subtract('minutes', 195).format(dateFormat);
     
                                                var getTOC = $("#toc").val();
                                                var convertTOC = moment(getTOC, dateFormat);
                                                var toc = moment(convertTOC).subtract('hours', 8).format(dateFormat);

                                                var jobStatus;
                                                if (getJobID > 0 || getJobID != "") {
                                                    jobStatus = "Transferred";
                                                } else {
                                                    jobStatus = "New";
                                                }

                                                var jobNumber;
                                                var getJobNumber = $('#reference').val();
                                                if (getJobNumber == "" || getJobNumber == null || getJobNumber == "undefined") {
                                                    //populate Job Number
                                                    var date = new Date();
                                                    var todaydate = date.getDate();
                                                    var todaymon = date.getMonth() + 1;
                                                    var todayyear = date.getFullYear();
                                                    //pull the last two digits of the year
                                                    todayyear = todayyear.toString().substr(2, 2);

                                                    var q = todayyear;
                                                    if (todaymon <= 9) {
                                                        var y = "0" + todaymon;
                                                    }
                                                    else
                                                        var y = todaymon;

                                                    if (todaydate <= 9) {
                                                        var z = "0" + todaydate;
                                                    }
                                                    else
                                                        var z = todaydate;


                                                    function randomString() {
                                                        var chars = "0123456789";
                                                        var string_length = 3;
                                                        var randomstring = '';
                                                        for (var i = 0; i < string_length; i++) {
                                                            var rnum = Math.floor(Math.random() * chars.length);
                                                            randomstring += chars.substring(rnum, rnum + 1);
                                                        }

                                                        return randomstring;
                                                    }

                                                    jobNumber = "JN-" + z + y + q + "-" + randomString();
                                                }
                                                else {
                                                    jobNumber = getJobNumber;
                                                }

                                                var trip;
                                                if ($('#trip').val() == 1) {
                                                    if ($('#jobid').val() > 0) {
                                                        trip = "";
                                                    } else {
                                                        trip = "One Way Trip: ";
                                                    }                                                   
                                                } else if ($('#trip').val() == 2) {
                                                    if ($('#jobid').val() > 0) {
                                                        trip = "";
                                                    } else {
                                                        trip = "First Trip: ";
                                                    }
                                                }

                                                var job = {
                                                    JobID: $('#jobid').val(),
                                                    TOC: toc,
                                                    Timestamp: timestamp,
                                                    RxTime: moment().format(),
                                                    Amount: $('#amount').val(),
                                                    Caller: $('#caller').val(),
                                                    Phone: $('#phone').val(),
                                                    Unit: $('#unit').val(),
                                                    Bed: $('#bed').val(),
                                                    Origin: getAddress,
                                                    Destination: getDestination,
                                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                    Remarks: $('#remarks').val(),
                                                    Remarks2: trip + $('#patientRemarks').val(),
                                                    Patient: $('#patient').val(),
                                                    Payment: $('#payment').val(),
                                                    Trip: $('#trip').val(),
                                                    Flag: 1,
                                                    JobNumber: jobNumber,
                                                    Receipt: "",
                                                    Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                                    Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                                    AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                                    AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                                    AssetID: sessionStorage.getItem('setSessionstorageValueAvailableAmbulance'),
                                                    JobStatus: jobStatus,
                                                    JobDriver: sessionStorage.getItem('setSessionstorageValueDriverName'),
                                                    JobType: "Normal"
                                                };


                                                if ($('#trip').val() == 2) {
                                                    
                                                    var date = new Date();
                                                    var todaydate = date.getDate();
                                                    var todaymon = date.getMonth() + 1;
                                                    var todayyear = date.getFullYear();
                                                    //pull the last two digits of the year
                                                    todayyear = todayyear.toString().substr(2, 2);

                                                    var q = todayyear;
                                                    if (todaymon <= 9) {
                                                        var y = "0" + todaymon;
                                                    }
                                                    else
                                                        var y = todaymon;

                                                    if (todaydate <= 9) {
                                                        var z = "0" + todaydate;
                                                    }
                                                    else
                                                        var z = todaydate;


                                                    function randomString() {
                                                        var chars = "0123456789";
                                                        var string_length = 3;
                                                        var randomstring = '';
                                                        for (var i = 0; i < string_length; i++) {
                                                            var rnum = Math.floor(Math.random() * chars.length);
                                                            randomstring += chars.substring(rnum, rnum + 1);
                                                        }

                                                        return randomstring;
                                                    }

                                                    jobNumber = "JN-" + z + y + q + "-" + randomString();
                                                }


                                                var job2 = {
                                                    JobID: $('#jobid').val(),
                                                    TOC: toc,
                                                    Timestamp: timestamp2,
                                                    RxTime: moment().format(),
                                                    Amount: 0,
                                                    Caller: $('#caller').val(),
                                                    Phone: $('#phone').val(),
                                                    Unit: $('#unit').val(),
                                                    Bed: $('#bed').val(),
                                                    Origin: getDestination,
                                                    Destination: getAddress,
                                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                    Remarks: $('#remarks').val(),
                                                    Remarks2: "Return Trip: " + $('#patientRemarks').val(),
                                                    Patient: $('#patient').val(),
                                                    Payment: $('#payment').val(),
                                                    Trip: $('#trip').val(),
                                                    Flag: 1,
                                                    JobNumber: jobNumber,
                                                    Receipt: "",
                                                    Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                                    Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                                    AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                                    AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                                    AssetID: sessionStorage.getItem('setSessionstorageValueAvailableAmbulance'),
                                                    JobStatus: jobStatus,
                                                    JobDriver: sessionStorage.getItem('setSessionstorageValueDriverName'),
                                                    JobType: "Normal"
                                                };

                                                sessionStorage.setItem("setSessionstorageValueJobNumber", job.JobNumber);

                                                //alert(JSON.stringify(job));
                                                if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                                    var apiJobNumber = 'http://track.asiacom.co.th/adswebapi/api/searchjob?JobNumber=' + job.JobNumber;

                                                    //Check Duplicate Job Number
                                                    $.getJSON(apiJobNumber, function (data) {

                                                        if (data.length == 1) {
                                                            alert('Job Number had been used!');
                                                        }
                                                        else {

                                                            if (getTrip == 1) //One way Trip
                                                            {
                                                                $.ajax({
                                                                    url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                                    type: "POST",
                                                                    data: JSON.stringify(job),
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
                                                                    success: function (job) {
                                                                        console.log(job);
                                                                        sendNewJobAlert();
                                                                        clearJobForms();
                                                                        generateJobNumber();
                                                                        reloadJobsCreated();
                                                                        sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                                        $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                        $('#toc').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                        //window.location.reload(true);
                                                                    }
                                                                });
                                                            }
                                                            else if (getTrip == 2) //Two Way Trip
                                                            {
                                                                $.ajax({
                                                                    url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                                    type: "POST",
                                                                    data: JSON.stringify(job),
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
                                                                    success: function (job) {
                                                                        console.log(job);
                                                                        sendNewJobAlert();
                                                                    }
                                                                });

                                                                $.ajax({
                                                                    url: "http://track.asiacom.co.th/adswebapi/api/jobinfo",
                                                                    type: "POST",
                                                                    data: JSON.stringify(job2),
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
                                                                    success: function (job2) {
                                                                        console.log(job2);
                                                                        sendNewJobAlertTwoWay();
                                                                        clearJobForms();
                                                                        generateJobNumber();
                                                                        reloadJobsCreated();
                                                                        sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                                        $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                        $('#toc').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                        //window.location.reload(true);
                                                                    }
                                                                });
                                                            }


                                                        }

                                                    });


                                                }

                                                else {

                                                    var updateJob = 'http://track.asiacom.co.th/adswebapi/api/jobinfo?id=' + job.JobID;

                                                    $.ajax({
                                                        url: updateJob,
                                                        type: "PUT",
                                                        data: JSON.stringify(job),
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
                                                        success: function (job) {
                                                            console.log(job);
                                                            sendCancelAlert();
                                                            clearJobForms();
                                                            reloadJobsCreated();
                                                            generateJobNumber();
                                                            sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                            $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                            $('#toc').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                            //window.location.reload(true);
                                                        }
                                                    });


                                                }

                                            }


                                            else {
                                                $.niftyNoty({
                                                    type: 'danger',
                                                    icon: 'fa fa-minus',
                                                    message: 'Canceled',
                                                    container: 'floating',
                                                    timer: 3000
                                                });
                                            };

                                        });

                                    }
                                }
                            }
                            else {
                                alert('Invalid Date');
                            }

                        }
                    }
                }

            });


        });


    });




})
