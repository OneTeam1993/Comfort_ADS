

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

                var url = 'https://track-asia.com/comfortwebapi/api/assetinfo';
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
                    url: "https://track-asia.com/adswebapi/api/messageinfo",
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
                    permissions: ["https://track-asia.com"],
                    success: function (emailAssets) {
                        // console.log(emailAssets);
                    }
                });


                var GetAssetID = $('#assetID').val();

                if (assets.AssetID == 'undefined' || assets.AssetID == null || assets.AssetID == 0 || assets.AssetID != GetAssetID) {


                    $.ajax({
                        url: "https://track-asia.com/comfortwebapi/api/assetinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (assets) {
                            // console.log(assets);
                            window.location.reload(true);
                        }
                    });

                }

                else {

                    var updateAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?id=' + assets.AssetID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/assetinfo';
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
                        url: "https://track-asia.com/adswebapi/api/messageinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (emailAssets) {
                            // console.log(emailAssets);       
                            window.location.reload(true);
                        }
                    });

                }

                if (assets.AssetID == 'undefined' || assets.AssetID == null || assets.AssetID == 0 || assets.AssetID != GetAssetID) {


                    $.ajax({
                        url: "https://track-asia.com/comfortwebapi/api/assetinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (assets) {
                            //console.log(assets);
                            window.location.reload(true);
                        }
                    });

                    // window.location.reload(true);

                }

                else {

                    var updateAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?id=' + assets.AssetID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/assetinfo/' + row.AssetID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/assetinfo/' + row.AssetID;

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
                        permissions: ["https://track-asia.com"],
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

                    var url = 'https://track-asia.com/comfortwebapi/api/zoneinfo';
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
                            url: "https://track-asia.com/comfortwebapi/api/zoneinfo",
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
                            permissions: ["https://track-asia.com"],
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


                        var updateZone = 'https://track-asia.com/comfortwebapi/api/zoneinfo?id=' + zones.ZoneID;

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
                            permissions: ["https://track-asia.com"],
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

                    var url = 'https://track-asia.com/comfortwebapi/api/zoneinfo';
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
                            url: "https://track-asia.com/comfortwebapi/api/zoneinfo",
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
                            permissions: ["https://track-asia.com"],
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


                        var updateZone = 'https://track-asia.com/comfortwebapi/api/zoneinfo?id=' + zones.ZoneID;

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
                            permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/zoneinfo/' + row.ZoneID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/zoneinfo/' + row.ZoneID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/companyinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/companyinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (company) {
                            console.log(company);
                        }
                    });
                }

                else {


                    var updateCompany = 'https://track-asia.com/comfortwebapi/api/companyinfo?id=' + company.CompanyID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/companyinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/companyinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (company) {
                            console.log(company);
                        }
                    });
                }

                else {


                    var updateCompany = 'https://track-asia.com/comfortwebapi/api/companyinfo?id=' + company.CompanyID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/companyinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/companyinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (company) {
                            window.location.reload(true);
                            console.log(company);
                        }
                    });
                }

                else {


                    var updateCompany = 'https://track-asia.com/comfortwebapi/api/companyinfo?id=' + company.CompanyID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/companyinfo/' + row.CompanyID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/companyinfo/' + row.CompanyID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/userinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/userinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (user) {
                            console.log(user);
                        }
                    });

                }

                else {

                    var updateUser = 'https://track-asia.com/comfortwebapi/api/userinfo?id=' + user.UserID;

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
                        permissions: ["https://track-asia.com"],
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

                    var url = 'https://track-asia.com/comfortwebapi/api/userinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/fileupload/uploadfileuser",
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
                    var varAsset;
                    if (parseObjAssets == "null") {
                        varAsset = '';
                    } else {
                        varAsset = parseObjAssets;
                    }
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
                        Assets: varAsset,
                        LoginRetry: valLoginRetry,
                        ResellerID: getResellerID
                    };


                    if (user.UserID == 'undefined' || user.UserID == null || user.UserID == 0 || user.UserID != GetUserID) {



                        $.ajax({
                            url: "https://track-asia.com/comfortwebapi/api/userinfo",
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
                            permissions: ["https://track-asia.com"],
                            success: function (user) {
                                console.log(user);
                                window.location.reload(true);
                            }
                        });

                    }

                    else {

                        var updateUser = 'https://track-asia.com/comfortwebapi/api/userinfo?id=' + user.UserID;

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
                            permissions: ["https://track-asia.com"],
                            success: function (user) {
                                console.log(user);
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

                    var url = 'https://track-asia.com/comfortwebapi/api/userinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/fileupload/uploadfileuser",
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
                            url: "https://track-asia.com/comfortwebapi/api/userinfo",
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
                            permissions: ["https://track-asia.com"],
                            success: function (user) {
                                window.location.reload(true);
                                console.log(user);
                                // window.location.reload(true);
                            }
                        });

                    }

                    else {

                        var updateUser = 'https://track-asia.com/comfortwebapi/api/userinfo?id=' + user.UserID;

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
                            permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/userinfo/' + row.UserID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/userinfo/' + row.UserID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/deviceinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/deviceinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (device) {
                            console.log(device);
                        }
                    });

                }

                else {


                    var updateDevice = 'https://track-asia.com/comfortwebapi/api/deviceinfo?id=' + device.DeviceID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/deviceinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/deviceinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (device) {
                            console.log(device);
                        }
                    });

                }

                else {


                    var updateDevice = 'https://track-asia.com/comfortwebapi/api/deviceinfo?id=' + device.DeviceID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/deviceinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/deviceinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (device) {
                            window.location.reload(true);
                            console.log(device);
                        }
                    });

                }

                else {


                    var updateDevice = 'https://track-asia.com/comfortwebapi/api/deviceinfo?id=' + device.DeviceID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/deviceinfo/' + row.DeviceID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/deviceinfo/' + row.DeviceID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/resellerinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/resellerinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (reseller) {
                            console.log(reseller);
                            window.location.reload(true);
                        }

                    });
                }

                else {


                    var updateReseller = 'https://track-asia.com/comfortwebapi/api/resellerinfo?id=' + reseller.ResellerID;

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
                        permissions: ["https://track-asia.com"],
                        success: function (reseller) {
                            console.log(reseller);
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

                var url = 'https://track-asia.com/comfortwebapi/api/resellerinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/resellerinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (reseller) {
                            console.log(reseller);
                        }
                    });
                }

                else {


                    var updateReseller = 'https://track-asia.com/comfortwebapi/api/resellerinfo?id=' + reseller.ResellerID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/resellerinfo';
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
                        url: "https://track-asia.com/comfortwebapi/api/resellerinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (reseller) {
                            window.location.reload(true);
                            console.log(reseller);
                        }
                    });
                }

                else {


                    var updateReseller = 'https://track-asia.com/comfortwebapi/api/resellerinfo?id=' + reseller.ResellerID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/resellerinfo/' + row.ResellerID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/resellerinfo/' + row.ResellerID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/driverinfo';
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
                    url: "https://track-asia.com/comfortwebapi/api/fileupload/uploadfile",
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
                        url: "https://track-asia.com/comfortwebapi/api/driverinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (driver) {
                            console.log(driver);
                        }
                    });
                }

                else {


                    var updateDriver = 'https://track-asia.com/comfortwebapi/api/driverinfo?id=' + driver.DriverID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/driverinfo';
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
                    url: "https://track-asia.com/comfortwebapi/api/fileupload/uploadfile",
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
                        url: "https://track-asia.com/comfortwebapi/api/driverinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (driver) {
                            console.log(driver);
                            window.location.reload(true);
                        }
                    });
                }

                else {


                    var updateDriver = 'https://track-asia.com/comfortwebapi/api/driverinfo?id=' + driver.DriverID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/driverinfo';
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
                    url: "https://track-asia.com/comfortwebapi/api/fileupload/uploadfile",
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
                        url: "https://track-asia.com/comfortwebapi/api/driverinfo",
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
                        permissions: ["https://track-asia.com"],
                        success: function (driver) {
                            window.location.reload(true);
                            console.log(driver);
                        }
                    });
                }

                else {


                    var updateDriver = 'https://track-asia.com/comfortwebapi/api/driverinfo?id=' + driver.DriverID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/driverinfo/' + row.DriverID;

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
                        permissions: ["https://track-asia.com"],
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
                    var WebAPI = 'https://track-asia.com/comfortwebapi/api/driverinfo/' + row.DriverID;

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
                        permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/userinfo';
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


                var updateUser = 'https://track-asia.com/comfortwebapi/api/userinfo?id=' + user.UserID;

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
                    permissions: ["https://track-asia.com"],
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

                var url = 'https://track-asia.com/comfortwebapi/api/userinfo';
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


                var updateProfile = 'https://track-asia.com/comfortwebapi/api/userinfo?id=' + profile.UserID;

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
                    permissions: ["https://track-asia.com"],
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
        var getAmount = $("#amount").val();
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

                if (getAmount == "" || getAmount.length > 3) {
                    if (getAmount == "") alert('Amount must not be empty!');
                    if (getAmount.length > 3) alert('Amount is not allowed!');
                }
                else
                {
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

                                    var url = 'https://track-asia.com/comfortwebapi/api/jobinfo';
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


                                    //Get Asset
                                    $.ajax({
                                        url: "https://track-asia.com/comfortwebapi/api/checkdriver",
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
                                        permissions: ["https://track-asia.com"],
                                        success: function (driver) {
                                            console.log(driver);

                                            if (row.JobStatus == "In Progress" || row.JobStatus == "Job Edited") {
                                                var jobEdit = {
                                                    JobID: $('#jobid').val(),
                                                    Timestamp: timestamp,
                                                    RxTime: $('#date').val(),
                                                    Amount: finalAmount,
                                                    Caller: $('#caller').val(),
                                                    Phone: $('#phone').val(),
                                                    Unit: $('#unit').val(),
                                                    Bed: $('#bed').val(),
                                                    Origin: $('#origin').val(),
                                                    Destination: $('#destination').val(),
                                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                    Remarks: $('#remarks').val(),
                                                    Remarks2: $('#patientRemarks').val(),
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

                                                var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + jobEdit.JobID;

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
                                                    permissions: ["https://track-asia.com"],
                                                    success: function (jobEdit) {
                                                        console.log(jobEdit);
                                                        sendAlert();
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
                                                    Unit: $('#unit').val(),
                                                    Bed: $('#bed').val(),
                                                    Origin: $('#origin').val(),
                                                    Destination: $('#destination').val(),
                                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                    Remarks: $('#remarks').val(),
                                                    Remarks2: $('#patientRemarks').val(),
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

                                                var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + jobEdit.JobID;

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
                                                    permissions: ["https://track-asia.com"],
                                                    success: function (jobEdit) {
                                                        console.log(jobEdit);
                                                        sendAlert();
                                                        clearJobForms();
                                                        $('#TableFormNew').modal('hide');
                                                        $('#jobs-editable').bootstrapTable('refresh');
                                                        //window.location.reload(true);
                                                    }
                                                });
                                            }

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
                        }
                        else {
                            alert('Job cannot be edited!');
                        }


                    });
                }
            }
            else {
                alert('Invalid Date');
            }

        }


    });

    $('#submit-rtnjob').on('click', function () {

        var getTimestamp = $("#date").val();
        var dateFormat = "DD-MMM-YYYY"; //DD-MMM-YYYY
        var convertTimestamp = moment(getTimestamp, dateFormat);
        var getAmount = $("#amount").val();
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

                if (getAmount == "" || getAmount.length > 3) {
                    if (getAmount == "") alert('Amount must not be empty!');
                    if (getAmount.length > 3) alert('Amount is not allowed!');
                }
                else
                {
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

                                    var url = 'https://track-asia.com/comfortwebapi/api/jobinfo';
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

                                    var getTOC = $("#toc").val();
                                    var convertTOC = moment(getTOC, dateFormat);
                                    var toc = moment(convertTOC).subtract('hours', 8).format(dateFormat);

                                    var driver = {
                                        Name: $('#driver').val(),
                                    }


                                    //Get Asset
                                    $.ajax({
                                        url: "https://track-asia.com/comfortwebapi/api/checkdriver",
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
                                        permissions: ["https://track-asia.com"],
                                        success: function (driver) {
                                            console.log(driver);

                                            if (row.JobStatus == "In Progress" || row.JobStatus == "Job Edited") {
                                                var jobEdit = {
                                                    JobID: $('#jobid').val(),
                                                    Timestamp: timestamp,
                                                    RxTime: $('#date').val(),
                                                    TOC: toc,
                                                    Amount: finalAmount,
                                                    Caller: $('#caller').val(),
                                                    Phone: $('#phone').val(),
                                                    Unit: $('#unit').val(),
                                                    Bed: $('#bed').val(),
                                                    Origin: $('#origin').val(),
                                                    Destination: $('#destination').val(),
                                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                    Remarks: $('#remarks').val(),
                                                    Remarks2: $('#patientRemarks').val(),
                                                    Patient: $('#patient').val(),
                                                    Payment: $('#payment').val(),
                                                    Trip: $('#trip').val(),
                                                    Receipt: "",
                                                    Flag: 1,
                                                    JobNumber: $('#case').val(),
                                                    JobStatus: "Scheduled Edited",
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

                                                var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + jobEdit.JobID;

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
                                                    permissions: ["https://track-asia.com"],
                                                    success: function (jobEdit) {
                                                        console.log(jobEdit);
                                                        sendAlert();
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
                                                    jobStatus = "Scheduled Edited";
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
                                                    TOC: toc,
                                                    Amount: finalAmount,
                                                    Caller: $('#caller').val(),
                                                    Phone: $('#phone').val(),
                                                    Unit: $('#unit').val(),
                                                    Bed: $('#bed').val(),
                                                    Origin: $('#origin').val(),
                                                    Destination: $('#destination').val(),
                                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                    Remarks: $('#remarks').val(),
                                                    Remarks2: $('#patientRemarks').val(),
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
                                                    JobType: "Normal",
                                                    AssetID: asset_id
                                                };

                                                var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + jobEdit.JobID;

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
                                                    permissions: ["https://track-asia.com"],
                                                    success: function (jobEdit) {
                                                        console.log(jobEdit);
                                                        sendAlert();
                                                        clearJobForms();
                                                        $('#TableFormNew').modal('hide');
                                                        $('#jobs-editable').bootstrapTable('refresh');
                                                        //window.location.reload(true);
                                                    }
                                                });
                                            }

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
                        }
                        else {
                            alert('Job cannot be edited!');
                        }


                    });
                }

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
        var getAmount = $("#amount").val();

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
                    if (getAmount == "" || getAmount.length > 3) {
                        if (getAmount == "") alert('Amount must not be empty!');
                        if (getAmount.length > 3) alert('Amount is not allowed!');
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

                                var url = 'https://track-asia.com/comfortwebapi/api/jobinfo';
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
                                var timestamp2 = moment(convertTimestamp).add('minutes', 120).format(dateFormat);

                                //Reverse Geocode
                                var origin;
                                var destination;
                                var geocoder = null;

                                var from = $('#origin').val();
                                var to = $('#destination').val();

                                if (from.length == 6 && isNaN(from) == false || from.length == 16 && isNaN(from) == false) {
                                    origin = sessionStorage.getItem('setSessionstorageValueScheduledJobLocationFrom');
                                }
                                else {
                                    origin = from;
                                }


                                if (to.length == 6 && isNaN(to) == false || to.length == 16 && isNaN(to) == false) {
                                    destination = sessionStorage.getItem('setSessionstorageValueScheduledJobLocationTo');
                                }
                                else {
                                    destination = to;
                                }


                                var searchAsset = 'https://track-asia.com/comfortwebapi/api/searchasset?AssetID=' + $('#assets').val();

                                if ($('#assets').val() == 0) {

                                    var job = {
                                        JobID: $('#jobid').val(),
                                        TOC: "",
                                        Timestamp: timestamp,
                                        RxTime: moment().format(),
                                        Amount: finalAmount,
                                        Caller: $('#caller').val(),
                                        Phone: $('#phone').val(),
                                        Unit: $('#unit').val(),
                                        Bed: $('#bed').val(),
                                        Origin: origin,
                                        Destination: destination,
                                        Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                        Remarks: $('#remarks').val(),
                                        Remarks2: $('#patientRemarks').val(),
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
                                        AssetID: $('#assets').val(),
                                        isReturn: 1
                                    };

                                    if ($('#trip').val() == 2) {

                                        $.ajax({
                                            url: 'https://track-asia.com/comfortwebapi/api/generatejobid',
                                            type: 'GET',
                                            dataType: 'json',
                                            success: function (data, textStatus, xhr) {
                                                console.log(data);

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


                                                function NewJobID() {
                                                    for (var i = 0; i < data.length; ++i) {
                                                        //Get New Job ID
                                                        return data[i].NewJobID;
                                                    }
                                                }

                                                var jobNumber2 = "JN-" + z + y + q + "-" + NewJobID();

                                                var job2 = {
                                                    JobID: $('#jobid').val(),
                                                    TOC: "",
                                                    Timestamp: timestamp2,
                                                    RxTime: moment().format(),
                                                    Amount: 0,
                                                    Caller: $('#caller').val(),
                                                    Phone: $('#phone').val(),
                                                    Unit: $('#unit').val(),
                                                    Bed: $('#bed').val(),
                                                    Origin: destination,
                                                    Destination: origin,
                                                    Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                    Remarks: $('#remarks').val(),
                                                    Remarks2: $('#patientRemarks').val(),
                                                    Patient: $('#patient').val(),
                                                    Payment: $('#payment').val(),
                                                    Trip: $('#trip').val(),
                                                    Receipt: "",
                                                    Flag: 1,
                                                    JobNumber: jobNumber2,
                                                    JobStatus: "Scheduled",
                                                    Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                                    Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                                    AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                                    AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                                    JobDriver: "",
                                                    JobType: "Scheduled",
                                                    //AssetID: asset_id
                                                    AssetID: $('#assets').val(),
                                                    isReturn: 2
                                                };

                                                if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                                    var apiJobNumber = 'https://track-asia.com/comfortwebapi/api/searchjob?JobNumber=' + job.JobNumber;

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
                                                                    url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                    permissions: ["https://track-asia.com"],
                                                                    success: function (job) {
                                                                        console.log(job);
                                                                        //sendAlert();
                                                                        clearJobForms();
                                                                        generateJobNumber();
                                                                        $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                                        sessionStorage.removeItem("setSessionstorageValueAccessories");
                                                                    }
                                                                });
                                                            }
                                                            else if (getTrip == 2) //Two Way Trip
                                                            {
                                                                $.ajax({
                                                                    url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                    permissions: ["https://track-asia.com"],
                                                                    success: function (job) {
                                                                        console.log(job);
                                                                    }
                                                                });

                                                                $.ajax({
                                                                    url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                    permissions: ["https://track-asia.com"],
                                                                    success: function (job2) {
                                                                        console.log(job2);
                                                                        clearJobForms();
                                                                        generateJobNumber();
                                                                        $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                                        sessionStorage.removeItem("setSessionstorageValueAccessories");
                                                                    }
                                                                });
                                                            }



                                                        }

                                                    });
                                                }

                                                else {

                                                    var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + job.JobID;

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
                                                        permissions: ["https://track-asia.com"],
                                                        success: function (job) {
                                                            console.log(job);
                                                            clearJobForms();
                                                            //window.location.reload(true);
                                                        }
                                                    });

                                                }

                                            },
                                            error: function (xhr, textStatus, errorThrown) {
                                                console.log('Error in Operation');
                                            }
                                        });

                                    }
                                    else {
                                        if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                            var apiJobNumber = 'https://track-asia.com/comfortwebapi/api/searchjob?JobNumber=' + job.JobNumber;

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
                                                            url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                            permissions: ["https://track-asia.com"],
                                                            success: function (job) {
                                                                console.log(job);
                                                                //sendAlert();
                                                                clearJobForms();
                                                                generateJobNumber();
                                                                $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                                sessionStorage.removeItem("setSessionstorageValueAccessories");
                                                            }
                                                        });
                                                    }
                                                    else if (getTrip == 2) //Two Way Trip
                                                    {
                                                        $.ajax({
                                                            url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                            permissions: ["https://track-asia.com"],
                                                            success: function (job) {
                                                                console.log(job);
                                                            }
                                                        });

                                                        $.ajax({
                                                            url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                            permissions: ["https://track-asia.com"],
                                                            success: function (job2) {
                                                                console.log(job2);
                                                                clearJobForms();
                                                                generateJobNumber();
                                                                $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                                sessionStorage.removeItem("setSessionstorageValueAccessories");
                                                            }
                                                        });
                                                    }



                                                }

                                            });
                                        }

                                        else {

                                            var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + job.JobID;

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
                                                permissions: ["https://track-asia.com"],
                                                success: function (job) {
                                                    console.log(job);
                                                    clearJobForms();
                                                    //window.location.reload(true);
                                                }
                                            });

                                        }
                                    }

                                }
                                else {
                                    $.getJSON(searchAsset, function (data) {

                                        $.each(data, function (index, item) {

                                            var trip;
                                            if ($('#trip').val() == 1) {
                                                trip = "One Way Trip: ";
                                            } else if ($('#trip').val() == 2) {
                                                trip = "First Trip: ";
                                            }

                                            var getRemarks = $('#patientRemarks').val();

                                            var job = {
                                                JobID: $('#jobid').val(),
                                                TOC: "",
                                                Timestamp: timestamp,
                                                RxTime: moment().format(),
                                                Amount: finalAmount,
                                                Caller: $('#caller').val(),
                                                Phone: $('#phone').val(),
                                                Unit: $('#unit').val(),
                                                Bed: $('#bed').val(),
                                                Origin: origin,
                                                Destination: destination,
                                                Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                Remarks: $('#remarks').val(),
                                                Remarks2: trip + getRemarks,
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
                                                AssetID: $('#assets').val(),
                                                isReturn: 1
                                            };

                                            if ($('#trip').val() == 2) {

                                                $.ajax({
                                                    url: 'https://track-asia.com/comfortwebapi/api/generatejobid',
                                                    type: 'GET',
                                                    dataType: 'json',
                                                    success: function (data, textStatus, xhr) {
                                                        console.log(data);

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


                                                        function NewJobID() {
                                                            for (var i = 0; i < data.length; ++i) {
                                                                //Get New Job ID
                                                                return data[i].NewJobID;
                                                            }
                                                        }

                                                        var jobNumber2 = "JN-" + z + y + q + "-" + NewJobID();

                                                        var job2 = {
                                                            JobID: $('#jobid').val(),
                                                            TOC: "",
                                                            Timestamp: timestamp2,
                                                            RxTime: moment().format(),
                                                            Amount: 0,
                                                            Caller: $('#caller').val(),
                                                            Phone: $('#phone').val(),
                                                            Unit: $('#unit').val(),
                                                            Bed: $('#bed').val(),
                                                            Origin: destination,
                                                            Destination: origin,
                                                            Accessories: sessionStorage.getItem('setSessionstorageValueAccessories'),
                                                            Remarks: $('#remarks').val(),
                                                            Remarks2: "Return Trip: " + $('#patientRemarks').val(),
                                                            Patient: $('#patient').val(),
                                                            Payment: $('#payment').val(),
                                                            Trip: $('#trip').val(),
                                                            Receipt: "",
                                                            Flag: 1,
                                                            JobNumber: jobNumber2,
                                                            JobStatus: "Scheduled",
                                                            Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                                            Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                                            AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                                            AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                                            JobDriver: item.DriverName,
                                                            JobType: "Scheduled",
                                                            AssetID: $('#assets').val(),
                                                            isReturn: 2
                                                        };

                                                        sessionStorage.setItem("setSessionstorageValueDriverPhone", item.Phone);
                                                        //alert(job.AssetID);

                                                        //Save/Edit Jobs
                                                        if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                                            var apiJobNumber = 'https://track-asia.com/comfortwebapi/api/searchjob?JobNumber=' + job.JobNumber;

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
                                                                            url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                            permissions: ["https://track-asia.com"],
                                                                            success: function (job) {
                                                                                console.log(job);
                                                                                sendAlert();
                                                                                clearJobForms();
                                                                                generateJobNumber();
                                                                                $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                                                sessionStorage.removeItem("setSessionstorageValueAccessories");
                                                                            }
                                                                        });
                                                                    }
                                                                    else if (getTrip == 2) //Two Way Trip
                                                                    {
                                                                        $.ajax({
                                                                            url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                            permissions: ["https://track-asia.com"],
                                                                            success: function (job) {
                                                                                console.log(job);
                                                                                sendAlert();
                                                                            }
                                                                        });

                                                                        $.ajax({
                                                                            url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                            permissions: ["https://track-asia.com"],
                                                                            success: function (job2) {
                                                                                console.log(job2);
                                                                                sendAlertRtn();
                                                                                clearJobForms();
                                                                                generateJobNumber();
                                                                                $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                                sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                                                sessionStorage.removeItem("setSessionstorageValueAccessories");
                                                                            }
                                                                        });
                                                                    }



                                                                }

                                                            });
                                                        }
                                                        else {

                                                            var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + job.JobID;

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
                                                                permissions: ["https://track-asia.com"],
                                                                success: function (job) {
                                                                    console.log(job);
                                                                    clearJobForms();
                                                                    //window.location.reload(true);
                                                                }
                                                            });

                                                        }//end

                                                    },
                                                    error: function (xhr, textStatus, errorThrown) {
                                                        console.log('Error in Operation');
                                                    }
                                                });

                                            }
                                            else {
                                                sessionStorage.setItem("setSessionstorageValueDriverPhone", item.Phone);
                                                //alert(job.AssetID);

                                                //Save/Edit Jobs
                                                if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                                    var apiJobNumber = 'https://track-asia.com/comfortwebapi/api/searchjob?JobNumber=' + job.JobNumber;

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
                                                                    url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                    permissions: ["https://track-asia.com"],
                                                                    success: function (job) {
                                                                        console.log(job);
                                                                        sendAlert();
                                                                        clearJobForms();
                                                                        generateJobNumber();
                                                                        $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                                        sessionStorage.removeItem("setSessionstorageValueAccessories");
                                                                    }
                                                                });
                                                            }
                                                            else if (getTrip == 2) //Two Way Trip
                                                            {
                                                                $.ajax({
                                                                    url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                    permissions: ["https://track-asia.com"],
                                                                    success: function (job) {
                                                                        console.log(job);
                                                                        sendAlert();
                                                                    }
                                                                });

                                                                $.ajax({
                                                                    url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                    permissions: ["https://track-asia.com"],
                                                                    success: function (job2) {
                                                                        console.log(job2);
                                                                        sendAlertRtn();
                                                                        clearJobForms();
                                                                        generateJobNumber();
                                                                        $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationFrom");
                                                                        sessionStorage.removeItem("setSessionstorageValueScheduledJobLocationTo");
                                                                        sessionStorage.removeItem("setSessionstorageValueAccessories");
                                                                    }
                                                                });
                                                            }



                                                        }

                                                    });
                                                }
                                                else {

                                                    var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + job.JobID;

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
                                                        permissions: ["https://track-asia.com"],
                                                        success: function (job) {
                                                            console.log(job);
                                                            clearJobForms();
                                                            //window.location.reload(true);
                                                        }
                                                    });

                                                }//end
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
                            var WebAPI = 'https://track-asia.com/comfortwebapi/api/jobinfo/' + row.JobID;

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
                                permissions: ["https://track-asia.com"],
                                success: function (job) {
                                    console.log(job);

                                    if (row.Flag == 1 || row.Flag == 2)
                                    {
                                        //Get Asset
                                        $.ajax({
                                            url: "https://track-asia.com/comfortwebapi/api/checkdriver",
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
                                            permissions: ["https://track-asia.com"],
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

                                                //sendCancelAlert(row.Patient, row.Origin, row.Destination, timestamp, row.AssetID, row.CompanyID, row.JobNumber, getDriverPhone);
                                                sendCancelAlert(row.Origin, row.Destination, timestamp);
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
        $removeEN.prop('disabled', true);


    });

 $('#jobsCreated-deleteEN').on('click', function () {

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
         if (row.Flag == 1 || row.Flag == 2) {
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
                     var WebAPI = 'https://track-asia.com/comfortwebapi/api/jobinfo/' + row.JobID;

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
                         permissions: ["https://track-asia.com"],
                         success: function (job) {
                             console.log(job);

                             if (row.Flag == 1 || row.Flag == 2) {
                                 //Get Asset
                                 $.ajax({
                                     url: "https://track-asia.com/comfortwebapi/api/checkdriver",
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
                                     permissions: ["https://track-asia.com"],
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

                                         //sendCancelAlert(row.Patient, row.Origin, row.Destination, timestamp, row.AssetID, row.CompanyID, row.JobNumber, getDriverPhone);
                                         sendCancelAlert(row.Origin, row.Destination, timestamp);
                                     }
                                 });


                             }

                             $('#jobsCreated').bootstrapTable('refresh');
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
         else {
             alert('Job cannot be deleted!');
         }
     });

     $table.bootstrapTable('remove', {
         field: 'JobID',
         values: ids
     });
     $removeEN.prop('disabled', true);


 });


    // =================================================================

    //Submit Jobs Call center

 $('#submit-call').on('click', function () {

     $.ajax({
         url: 'https://track-asia.com/comfortwebapi/api/generatejobid',
         type: 'GET',
         dataType: 'json',
         success: function (data, textStatus, xhr) {
             //console.log(data);

             var checkJobID = $('#jobid').val();
             var checkJobNumber = $('#reference').val();
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
             var getPayment = $('#payment').val();


             var searchAsset = 'https://track-asia.com/comfortwebapi/api/searchasset?AssetID=' + sessionStorage.getItem('setSessionstorageValueAvailableAmbulance');

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

             function NewJobID() {
                 for (var i = 0; i < data.length; ++i) {
                     //Get New Job ID
                     return data[i].NewJobID;
                 }
             }

             jobNumber = "JN-" + z + y + q + "-" + NewJobID();

             if (checkJobNumber == jobNumber || checkJobID > 0)
             {
                 if (sessionStorage.getItem('setSessionstorageValueAvailableAmbulance') > 0)
                 {
                     $.getJSON(searchAsset, function (data) {

                         $.each(data, function (index, item) {

                             if (item.DriverID == 0) {
                                 alert('Selected Ambulance has no driver! Pls. try again');
                             }
                             else
                             {
                                 saveJob();                               
                             }

                         });


                     });
                 }
                 else //add without vehicle
                 {
                     saveJob();
                 }

                 function saveJob() {
                     if (getReference == "") {
                         alert('Job Number must not be empty!');
                     }
                     else {

                         if (validateTimestamp == true) {
                             if (getAmount == "" || getAmount.length > 3) {
                                 if (getAmount == "") alert('Amount must not be empty!');
                                 if (getAmount.length > 3) alert('Amount is not allowed!');
                             }
                             else {

                                 if (getTrip == "" || getTrip === null) {
                                     alert('Trip must not be empty!');
                                 }
                                 else {
                                     if (getPayment == "" || getPayment === null) {
                                         alert('Payment must not be empty!');
                                     }
                                     else {
                                         if (sessionStorage.getItem('setSessionstorageValueAvailableAmbulance') == null || sessionStorage.getItem('setSessionstorageValueAvailableAmbulance') == "") {
                                             sessionStorage.setItem("setSessionstorageValueAvailableAmbulance", 0);
                                             //alert('Pls. assign a vehicle');
                                         }
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

                                                 var url = 'https://track-asia.com/comfortwebapi/api/jobinfo';
                                                 var xhr = createCORSRequest('GET', url);
                                                 xhr.send();
                                                 if (!xhr) {
                                                     throw new Error('CORS not supported');
                                                 }


                                                 $.ajax({
                                                     url: 'https://track-asia.com/comfortwebapi/api/hospitalinfo',
                                                     type: 'GET',
                                                     dataType: 'json',
                                                     success: function (data, textStatus, xhr) {
                                                         //console.log(data);

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

                                                             for (var i = 0; i < data.length; ++i) {

                                                                 //Get Address from hospital
                                                                 if (getFinalAddress == data[i].Address) {
                                                                     getAddress = data[i].Name;
                                                                     sessionStorage.setItem("setSessionstorageValueGetAddress", data[i].ShortName);
                                                                 }

                                                             }

                                                         }
                                                         else {

                                                             //Reverse Geocode
                                                             if (address.length == 6 && isNaN(address) == false || address.length == 16 && isNaN(address) == false) {
                                                                 getAddress = sessionStorage.getItem('setSessionstorageValueNewJobLocationFrom');
                                                                 sessionStorage.setItem("setSessionstorageValueGetAddress", getAddress);
                                                             }
                                                             else {
                                                                 getAddress = $('#address').val();
                                                                 sessionStorage.setItem("setSessionstorageValueGetAddress", getAddress);
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

                                                                 for (var i = 0; i < data.length; ++i) {

                                                                     //Get Address to hospital
                                                                     if (getFinalDestination == data[i].Address) {
                                                                         getDestination = data[i].Name;
                                                                         sessionStorage.setItem("setSessionstorageValueGetDestination", data[i].ShortName);
                                                                     }
                                                                 }
                                                             }
                                                             else if (nursingTo == "") {
                                                                 getDestination = destination;

                                                                 for (var i = 0; i < data.length; ++i) {

                                                                     //Get Address to hospital
                                                                     if (getDestination == data[i].Name) {
                                                                         sessionStorage.setItem("setSessionstorageValueGetDestination", data[i].ShortName);
                                                                     }

                                                                 }
                                                             }

                                                         }
                                                         else {

                                                             if (toDestination.length == 6 && isNaN(toDestination) == false || toDestination.length == 16 && isNaN(toDestination) == false) {
                                                                 getDestination = sessionStorage.getItem('setSessionstorageValueNewJobLocationTo');
                                                                 sessionStorage.setItem("setSessionstorageValueGetDestination", getDestination);
                                                             }
                                                             else {
                                                                 getDestination = $('#to-destination').val();
                                                                 sessionStorage.setItem("setSessionstorageValueGetDestination", getDestination);
                                                             }

                                                         }

                                                         var dateFormat = "D-MMM-YYYY, hh:mm:ss A";
                                                         var getTimestamp = $("#date").val();
                                                         var convertTimestamp = moment(getTimestamp, dateFormat);
                                                         //var timestamp = moment(convertTimestamp).subtract('hours', 8).format(dateFormat);
                                                         var timestamp = moment(convertTimestamp).subtract('minutes', 495).format(dateFormat);
                                                         //var timestamp2 = moment(convertTimestamp).subtract('minutes', 195).format(dateFormat);
                                                         var timestamp2 = moment(convertTimestamp).add('minutes', 120).format(dateFormat);

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

                                                             $.ajax({
                                                                 url: 'https://track-asia.com/comfortwebapi/api/generatejobid',
                                                                 type: 'GET',
                                                                 dataType: 'json',
                                                                 success: function (data, textStatus, xhr) {
                                                                     console.log(data);

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

                                                                     function NewJobID() {
                                                                         for (var i = 0; i < data.length; ++i) {
                                                                             //Get New Job ID
                                                                             return data[i].NewJobID;
                                                                         }
                                                                     }

                                                                     jobNumber = "JN-" + z + y + q + "-" + NewJobID();


                                                                 },
                                                                 error: function (xhr, textStatus, errorThrown) {
                                                                     console.log('Error in Operation');
                                                                 }
                                                             });

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
                                                             JobNumber: jobNumber.replace(/\s/g, ''),
                                                             Receipt: "",
                                                             Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                                             Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                                             AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                                             AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                                             AssetID: sessionStorage.getItem('setSessionstorageValueAvailableAmbulance'),
                                                             JobStatus: jobStatus,
                                                             JobDriver: sessionStorage.getItem('setSessionstorageValueDriverName'),
                                                             JobType: "Normal",
                                                             isReturn: 1
                                                         };

                                                         if ($('#trip').val() == 2) {

                                                             $.ajax({
                                                                 url: 'https://track-asia.com/comfortwebapi/api/generatejobid',
                                                                 type: 'GET',
                                                                 dataType: 'json',
                                                                 success: function (data, textStatus, xhr) {
                                                                     console.log(data);

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

                                                                     //function NewJobID() {
                                                                     //    for (var i = 0; i < data.length; ++i) {
                                                                     //        //Get New Job ID
                                                                     //        return data[i].NewJobID + 1;
                                                                     //    }
                                                                     //}

                                                                     function NewJobID() {
                                                                         for (var i = 0; i < data.length; ++i) {
                                                                             //Get New Job ID
                                                                             return data[i].NewJobID;
                                                                         }
                                                                     }

                                                                     var jobNumber2 = "JN-" + z + y + q + "-" + NewJobID();


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
                                                                         JobNumber: jobNumber2.replace(/\s/g, ''),
                                                                         Receipt: "",
                                                                         Agent: sessionStorage.getItem('setSessionstorageValueUser'),
                                                                         Company: sessionStorage.getItem('setSessionstorageValueCompany'),
                                                                         AssetCompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
                                                                         AssetResellerID: sessionStorage.getItem('setSessionstorageValueUserResellerID'),
                                                                         AssetID: sessionStorage.getItem('setSessionstorageValueAvailableAmbulance'),
                                                                         JobStatus: "Scheduled",
                                                                         JobDriver: sessionStorage.getItem('setSessionstorageValueDriverName'),
                                                                         JobType: "Scheduled",
                                                                         isReturn: 2
                                                                     };

                                                                     sessionStorage.setItem("setSessionstorageValueJobNumber", job.JobNumber);

                                                                     //alert(JSON.stringify(job));
                                                                     if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                                                         var apiJobNumber = 'https://track-asia.com/comfortwebapi/api/searchjob?JobNumber=' + job.JobNumber;

                                                                         //Check Duplicate Job Number
                                                                         $.getJSON(apiJobNumber, function (data) {

                                                                             if (data.length == 1) {
                                                                                 alert('Job Number had been used! ADS will generate new job number');
                                                                                 generateJobNumber();

                                                                             }
                                                                             else {

                                                                                 if (getTrip == 1) //One way Trip
                                                                                 {
                                                                                     $.ajax({
                                                                                         url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                                         permissions: ["https://track-asia.com"],
                                                                                         success: function (job) {
                                                                                             console.log(job);
                                                                                             sendNewJobAlert(job.Bed, job.Unit, sessionStorage.getItem('setSessionstorageValueGetAddress'), sessionStorage.getItem('setSessionstorageValueGetDestination'));
                                                                                             clearJobForms();
                                                                                             generateJobNumber();
                                                                                             reloadJobsCreated();
                                                                                             sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                                                             sessionStorage.removeItem('setSessionstorageValueDriverName');
																							 //sessionStorage.removeItem('setSessionstorageValuePhone');
																							 sessionStorage.removeItem('setSessionstorageValueDriverPhone');

                                                                                             $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                                             $('#toc').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                                             //window.location.reload(true);
                                                                                         }
                                                                                     });
                                                                                 }
                                                                                 else if (getTrip == 2) //Two Way Trip
                                                                                 {
                                                                                     $.ajax({
                                                                                         url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                                         permissions: ["https://track-asia.com"],
                                                                                         success: function (job) {
                                                                                             console.log(job);
                                                                                             sendNewJobAlert(job.Bed, job.Unit, sessionStorage.getItem('setSessionstorageValueGetAddress'), sessionStorage.getItem('setSessionstorageValueGetDestination'));
                                                                                         }
                                                                                     });

                                                                                     $.ajax({
                                                                                         url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                                         permissions: ["https://track-asia.com"],
                                                                                         success: function (job2) {
                                                                                             console.log(job2);
                                                                                             sendNewJobAlertTwoWay(sessionStorage.getItem('setSessionstorageValueGetDestination'), sessionStorage.getItem('setSessionstorageValueGetAddress'));
                                                                                             clearJobForms();
                                                                                             generateJobNumber();
                                                                                             reloadJobsCreated();
                                                                                             sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                                                             sessionStorage.removeItem('setSessionstorageValueDriverName');
																							 sessionStorage.removeItem('setSessionstorageValueDriverPhone');
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

                                                                         var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + job.JobID;

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
                                                                             permissions: ["https://track-asia.com"],
                                                                             success: function (job) {
                                                                                 console.log(job);
                                                                                 sendCancelAlert(sessionStorage.getItem('setSessionstorageValueGetAddress'), sessionStorage.getItem('setSessionstorageValueGetDestination'));
                                                                                 clearJobForms();
                                                                                 reloadJobsCreated();
                                                                                 generateJobNumber();
                                                                                 sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                                                 sessionStorage.removeItem('setSessionstorageValueDriverName');
																				 sessionStorage.removeItem('setSessionstorageValueDriverPhone');
                                                                                 $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                                 $('#toc').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                                 //window.location.reload(true);
                                                                             }
                                                                         });


                                                                     } //end

                                                                 },
                                                                 error: function (xhr, textStatus, errorThrown) {
                                                                     console.log('Error in Operation');
                                                                 }
                                                             });
                                                         }
                                                         else // One way Trip
                                                         {
                                                             sessionStorage.setItem("setSessionstorageValueJobNumber", job.JobNumber);

                                                             //alert(JSON.stringify(job));
                                                             if (job.JobID == 'undefined' || job.JobID == null || job.JobID == 0 || job.JobID != getJobID) {

                                                                 var apiJobNumber = 'https://track-asia.com/comfortwebapi/api/searchjob?JobNumber=' + job.JobNumber;

                                                                 //Check Duplicate Job Number
                                                                 $.getJSON(apiJobNumber, function (data) {

                                                                     if (data.length == 1) {
                                                                         alert('Job Number had been used! ADS will generate new job number');
                                                                         generateJobNumber();

                                                                     }
                                                                     else {

                                                                         if (getTrip == 1) //One way Trip
                                                                         {
                                                                             $.ajax({
                                                                                 url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                                 permissions: ["https://track-asia.com"],
                                                                                 success: function (job) {
                                                                                     console.log(job);
                                                                                     sendNewJobAlert(job.Bed, job.Unit, sessionStorage.getItem('setSessionstorageValueGetAddress'), sessionStorage.getItem('setSessionstorageValueGetDestination'));
                                                                                     clearJobForms();
                                                                                     generateJobNumber();
                                                                                     reloadJobsCreated();
                                                                                     sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                                                     sessionStorage.removeItem('setSessionstorageValueDriverName');
																					 sessionStorage.removeItem('setSessionstorageValueDriverPhone');
                                                                                     $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                                     $('#toc').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                                     //window.location.reload(true);
                                                                                 }
                                                                             });
                                                                         }
                                                                         else if (getTrip == 2) //Two Way Trip
                                                                         {
                                                                             $.ajax({
                                                                                 url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                                 permissions: ["https://track-asia.com"],
                                                                                 success: function (job) {
                                                                                     console.log(job);
                                                                                     sendNewJobAlert(job.Bed, job.Unit, sessionStorage.getItem('setSessionstorageValueGetAddress'), sessionStorage.getItem('setSessionstorageValueGetDestination'));
                                                                                 }
                                                                             });

                                                                             $.ajax({
                                                                                 url: "https://track-asia.com/comfortwebapi/api/jobinfo",
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
                                                                                 permissions: ["https://track-asia.com"],
                                                                                 success: function (job2) {
                                                                                     console.log(job2);
                                                                                     sendNewJobAlertTwoWay(sessionStorage.getItem('setSessionstorageValueGetDestination'), sessionStorage.getItem('setSessionstorageValueGetAddress'));
                                                                                     clearJobForms();
                                                                                     generateJobNumber();
                                                                                     reloadJobsCreated();
                                                                                     sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                                                     sessionStorage.removeItem('setSessionstorageValueDriverName');
																					 sessionStorage.removeItem('setSessionstorageValueDriverPhone');
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

                                                                 var updateJob = 'https://track-asia.com/comfortwebapi/api/jobinfo?id=' + job.JobID;

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
                                                                     permissions: ["https://track-asia.com"],
                                                                     success: function (job) {
                                                                         console.log(job);
                                                                         sendCancelAlert(sessionStorage.getItem('setSessionstorageValueGetAddress'), sessionStorage.getItem('setSessionstorageValueGetDestination'));
                                                                         clearJobForms();
                                                                         reloadJobsCreated();
                                                                         generateJobNumber();
                                                                         sessionStorage.removeItem('setSessionstorageValueAvailableAmbulance');
                                                                         sessionStorage.removeItem('setSessionstorageValueDriverName');
																		 sessionStorage.removeItem('setSessionstorageValueDriverPhone');
                                                                         $('#date').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                         $('#toc').val(moment().format('D-MMM-YYYY, HH:mm'));
                                                                         //window.location.reload(true);
                                                                     }
                                                                 });


                                                             } //end
                                                         }

                                                     },
                                                     error: function (xhr, textStatus, errorThrown) {
                                                         console.log('Error in Operation');
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
                                     }
                                 }
                             }
                         }
                         else {
                             alert('Invalid Date');
                         }
                     }
                 }
                 
             }
             else
             {
                 //alert('Job Number cannot be use');
				generateJobNumber();
                 $("#submit-call").click();
             }


         },
         error: function (xhr, textStatus, errorThrown) {
             console.log('Error in Operation');
         }
     });


 });


    // =================================================================

    //Submit Hospital

 $('#submit-hospital').on('click', function () {

     var getName = $('#hospitalName').val();
     var getAddress = $('#hospitalAddress').val();
     var getSN = $('#hospitalSN').val();

     if (getName == "" || getAddress == "" || getSN == "") {

         alert('Some fields are empty');
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

                 var url = 'https://track-asia.com/comfortwebapi/api/hospitalinfo';
                 var xhr = createCORSRequest('GET', url);
                 xhr.send();
                 if (!xhr) {
                     throw new Error('CORS not supported');
                 }


                 var hospital = {
                     HospitalID: $('#hospitalID').val(),
                     Name: $('#hospitalName').val(),
                     Address: $('#hospitalAddress').val(),
                     ShortName: $('#hospitalSN').val(),
                     CodeID: $('#category').val()
                 };

                 var GetHospitalID = $('#hospitalID').val();

                 if (hospital.HospitalID == 'undefined' || hospital.HospitalID == null || hospital.HospitalID == 0 || hospital.HospitalID != GetHospitalID) {

                     $.ajax({
                         url: "https://track-asia.com/comfortwebapi/api/hospitalinfo",
                         type: "POST",
                         data: JSON.stringify(hospital),
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
                         permissions: ["https://track-asia.com"],
                         success: function (hospital) {
                             console.log(hospital);
                         }
                     });
                 }

                 else {


                     var updateHospital = 'https://track-asia.com/comfortwebapi/api/hospitalinfo?id=' + hospital.HospitalID;

                     $.ajax({
                         url: updateHospital,
                         type: "PUT",
                         data: JSON.stringify(hospital),
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
                         permissions: ["https://track-asia.com"],
                         success: function (hospital) {
                             console.log(hospital);
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

 $('#hospital-confirm-deleteEN').on('click', function () {

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

                 var hospital = JSON.stringify({ 'HospitalID': row.HospitalID });
                 var WebAPI = 'https://track-asia.com/comfortwebapi/api/hospitalinfo/' + row.HospitalID;

                 $.ajax({
                     url: WebAPI,
                     type: "Delete",
                     data: JSON.stringify(hospital),
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
                     permissions: ["https://track-asia.com"],
                     success: function (hospital) {
                         console.log(hospital);
                     }
                 });
                 return row.ResellerID
             });
             $table.bootstrapTable('remove', {
                 field: 'HospitalID',
                 values: ids
             });
             $removeEN.prop('disabled', true);


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

})
