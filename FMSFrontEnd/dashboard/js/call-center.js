var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
var getSessionstorageValueUser = sessionStorage.getItem('setSessionstorageValueUser');
var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');

var MarkerAPI = "";
var geocoder = null;
var map = null;
var customerMarker = null;
var markers = [];
var closest = [];
var assets = [];
var marker, i;
var url;
var infowindow;
var bounds;

var pulse;
var pulses = new Array();

var circle = {};
var circle1 = {};
var polygon1 = {};
var zones = [];
var polygon;
var pathCoordinates = new google.maps.MVCArray();
var polygonCoordinates = new Array();
var circleCoordinates1 = new Array();
var circleCoordinates = new Array();

var geocodeCircle;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var styleMakers = [];
var styleMaker;
var infoBoxList = [];
var infoBubble;
var icon = "";
var iconURL = "img/markers/";
var iconURLOnClick = "img/no-bg/";
var markerCategory = "";
var barlight = "";
var pictureLabelURL = "img/categories/marker/";
var infoboxCloseURL = "img/close.gif";
var tipboxURL = "img/tipbox.gif";
var shape = {
    //coords: [1, 1, 1, 20, 18, 20, 18, 1],
    coord: [16, 0, 18, 1, 21, 2, 24, 3, 26, 4, 27, 5, 28, 6, 29, 7, 29, 8, 29, 9, 29, 10, 29, 11, 29, 12, 29, 13, 29, 14, 29, 15, 29, 16, 29, 17, 29, 18, 29, 19, 29, 20, 29, 21, 29, 22, 29, 23, 29, 24, 29, 25, 29, 26, 29, 27, 29, 28, 28, 29, 3, 29, 2, 28, 2, 27, 1, 26, 1, 25, 1, 24, 0, 23, 0, 22, 0, 21, 0, 20, 0, 19, 0, 18, 0, 17, 0, 16, 0, 15, 0, 14, 0, 13, 0, 12, 0, 11, 0, 10, 0, 9, 0, 8, 0, 7, 1, 6, 2, 5, 2, 4, 3, 3, 5, 2, 6, 1, 8, 0, 16, 0],
    type: 'poly'
}

var mySound;
//Sounds Checkbox
var changeCheckbox = document.querySelector('.js-check-change-sounds');

var assetMarkerInterval;
var assetMarkerIntervalFilter;

var WebAPIReseller = "";

if (getSessionstorageValueRoleID == 1) {

    WebAPIReseller = 'http://103.237.168.119/adswebapi/api/resellerinfo';

    $.getJSON(WebAPIReseller, function (data) {
        $.each(data, function (index, item) {

            if (item.ResellerID == "1") {
                $('#load-reseller').append(
                     $('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name)

                 );
            } else {

                $('#load-reseller').append(
                    $('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name)

                );
            }
        });
        var getReseller = $("#load-reseller").val();
        sessionStorage.setItem("setSessionstorageValueAssetReseller", getReseller);
        $('#load-reseller').selectpicker('refresh');

    });

} else if (getSessionstorageValueRoleID == 2) {

    WebAPIReseller = 'http://103.237.168.119/adswebapi/api/resellerinfo?ResellerID=' + getSessionstorageValueUserResellerID;

    $.getJSON(WebAPIReseller, function (data) {
        $.each(data, function (index, item) {
            $('#load-reseller').append(
                 $('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name)
             );
        });
        var getReseller = $("#load-reseller").val();
        sessionStorage.setItem("setSessionstorageValueAssetReseller", getReseller);
        $('#load-reseller').selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID >= 3) {
    $('#load-reseller').remove();
}


//Company Desktop
if (getSessionstorageValueRoleID == 1) {

    $.getJSON("http://103.237.168.119/adswebapi/api/companyinfo?&ResellerID=" + "1", function (data) {

        $.each(data, function (index, item) {

            if (item.Name == "DEMO Company" || item.Name == "Comfort Ambulance")
            $('#load-company').append(
                 $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
             );

        });
        var getCompany = $("#load-company").val();
        sessionStorage.setItem("setSessionstorageValueAssetCompany", getCompany);
        $('#load-company').selectpicker('refresh');
    });

}

else if (getSessionstorageValueRoleID == 2) {

    $.getJSON("http://track.asiacom.co.th/adswebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

        $.each(data, function (index, item) {

            if (item.CompanyID == getSessionstorageValueCompanyID) {

                $('#load-company').append(
                     $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                 );
            } else {
                $('#load-company').append(
                    $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                );
            }

        });
        var getCompany = $("#load-company").val();
        sessionStorage.setItem("setSessionstorageValueAssetCompany", getCompany);
        $('#load-company').selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID >= 3) {

    $('#load-company').remove();
}


var selectedReseller = "";

/*** Function to filter reseller and companies*/
$(function () {

    $('.SelectResellerFilter').on('change', function () {
        selectedReseller = $(this).find("option:selected").val();


        $('#load-company').empty();

        $(".SelectCompanyFilter").selectpicker('refresh');

        $.getJSON("http://103.237.168.119/adswebapi/api/companyinfo?&ResellerID=" + selectedReseller, function (data) {

            $('#load-company').append(
                $('<option></option>').val(0).html("-------")
            );

            $.each(data, function (index, item) {

                if (item.Name == "DEMO Company" || item.Name == "Comfort Ambulance")
                $('#load-company').append(
                     $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                 );
            });

            $(".SelectCompanyFilter").selectpicker('refresh');
        });

    });

});


//Dashboard Company
var selectedCompany = "";

/*** Function to filter tables, markers and zones*/
$(function () {

    $('.SelectCompanyFilter').on('change', function () {
        selectedCompany = $(this).find("option:selected").val();
        var getReseller = $('#load-reseller').val();
        var getCompany = $('#load-company').val();

        if (selectedCompany != 0) {
            clearInterval(assetMarkerInterval);
            //assetMarkerIntervalFilter = setInterval(function () { AutoRefreshCompanyFilter(); }, '30000');

            AutoRefreshCompanyFilter();

            $('#getAssets').empty();
            $(".SelectAssetFilter").selectpicker('refresh');

            $.getJSON('http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + '&ResellerID=' + getReseller + '&CompanyID=' + selectedCompany, function (data) {

                $('#getAssets').append(
                    $('<option></option>').val(0).html("ALL")
                );

                $.each(data, function (index, item) {
                    $('#getAssets').append(
                         $('<option></option>').val(item.Name).html(item.Name)
                     );
                });
                $(".SelectAssetFilter").selectpicker('refresh');
            });

        }

    });

});

function initialize() {

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 11,
        center: new google.maps.LatLng(1.3000, 103.8000),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var input = document.getElementById('panel');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    setZones(map, zones, handleZones);
    //setMarkers(map, assets, handleAssets);
    setMarkers(map, assets, updateAssets);
    assetMarkerInterval = setInterval(function () {
        //AutoRefresh();
        setMarkers(map, assets, updateAssets);
        $('#jobsCreated').bootstrapTable('refresh');
    }, '10000');

    SearchPlacesFrom();
    SearchPlacesTo();
}

function setMarkers(map, assets, callback) {


    if (getSessionstorageValueRoleID == 1) {

        MarkerAPI = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + '&ResellerID=' + '1' + '&CompanyID=' + '1';

    } else if (getSessionstorageValueRoleID == 2) {

        MarkerAPI = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    } else if (getSessionstorageValueRoleID >= 3) {


        MarkerAPI = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    }

  
    $.getJSON(MarkerAPI, function (assets) {

        callback(assets);

    });


}

function setMarkersFilter(map, assets, callback) {

    var getReseller = $('#load-reseller').val();
    var getCompany = $('#load-company').val();

    if (getSessionstorageValueRoleID == 1) {

        if (selectedReseller != "") {
            url = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + '&ResellerID=' + selectedReseller + '&CompanyID=' + selectedCompany;
        } else {
            url = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + '&ResellerID=' + getReseller + '&CompanyID=' + selectedCompany;
        }

    } else if (getSessionstorageValueRoleID == 2) {

        url = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + selectedCompany;

    } else if (getSessionstorageValueRoleID >= 3) {

        url = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    }

    //alert(url);

    $.getJSON(url, function (assets) {

        callback(assets);


    });
}

var paramtitle;

function updateAssets(assets) {

    var imagePulse = new google.maps.MarkerImage(
    'img/alert.png',
    null, // size
    null, // origin
    new google.maps.Point(8, 8), // anchor (move to center of marker)
    new google.maps.Size(17, 17) // scaled size (required for Retina display icon)
    );

    document.getElementById('info').innerHTML = assets.length;
    infowindow = new google.maps.InfoWindow({
        disableAutoPan: false
    });
    //bounds = new google.maps.LatLngBounds();
    var available = 0;
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < assets.length; i++) {
        var asset = assets[i];
        var vechs = asset.Name;
        var assetTimestamp = asset.LastPos.Timestamp;
        var speed = asset.LastPos.Speed;
        var engine = asset.LastPos.Engine;
        //if (assets.indexOf(i) !== -1) continue;
        //if (asset.LastPos.PosY == 0 && asset.LastPos.PosX == 0) continue;
	    // Check if marker is no Logout
        var timestamp1 = moment.utc(assetTimestamp).local().format("DD MMM YYYY");
        var d = new Date();
        var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
        timestamp2 = Date.parse(timestamp2);
        timestamp1 = Date.parse(timestamp1);
        if (assets[i].Jobs.Flag == 0 && assets[i].Flag == 1 && timestamp1 == timestamp2) {
            available++;
        }
        document.getElementById('available').innerHTML = available;

        var pt = new google.maps.LatLng(parseFloat(asset.LastPos.PosY), parseFloat(asset.LastPos.PosX));
        //bounds.extend(pt);

        //Convert Timezone
        var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');
        var Singapore = moment.tz(assetTimestamp, Asia);
        var timestamp = moment.utc(Singapore.format()).add('hours', 8).format('D-MMM-YYYY, hh:mm:ss A');

        if (assets[i].LastPos == null | assets[i].LastPos.Engine == null) {
            continue;
        }

        else {

            // Category image
            switch (asset.Category) {
                case "Ambulance":
                    markerCategory = "ambulance";
                    break;
            }

            //Background 
            if (asset.Flag == 2) {
                icon = iconURL + markerCategory + "-break.png"; //break
            }
            else if (timestamp2 > timestamp1) {
                icon = iconURL + markerCategory + "-logout.png"; //no logout
            }
            else if (asset.Jobs.Flag == 0 && asset.Flag == 1 || asset.Jobs.Flag == 1 && asset.Jobs.JobStatus == "Scheduled") {
                icon = iconURL + markerCategory + "-available.png"; //Offload or Available
            }
            else if (asset.Jobs.Flag == 1 && asset.Flag == 1 && asset.Jobs.JobStatus != "Scheduled") {
                icon = iconURL + markerCategory + "-pending.png"; //pending
            }
            else if (asset.Jobs.Flag == 2 && asset.Flag == 1) {
                icon = iconURL + markerCategory + "-ack.png"; //ack
            }
            else if (asset.Jobs.Flag == 3 && asset.Flag == 1) {
                icon = iconURL + markerCategory + "-onboard.png"; //onboard
            }
            else if (asset.Jobs.Flag >= 0 && asset.Flag == 0) {
                icon = iconURL + markerCategory + "-logout.png"; //logout
            }

            var image = {
                url: icon, // url
                scaledSize: new google.maps.Size(28, 28), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(14, 14) // anchor
            };

            var infowindowcontent = "<div style='color:black;' id='infoWindow'><h6 style='color:#E31466;'>" + asset.Name + "</h6><br><span class='text-bold'>Address: </span>" + asset.LastPos.Location + "<br><span class='text-bold'>Date: </span>" + timestamp +
                                    "<br><span class='text-bold'>Speed: </span>" + speedFormatter(speed) +
                                    "<br><span class='text-bold'>Engine: </span>" + engine +
                                    "<br><a style='color:#0000EE;' href='javascript:getDirections(customerMarker.getPosition(),&quot;" + asset.LastPos.Location + "&quot;);'>Get Directions</a>" + "</div>";

            if (asset.Phone != null && asset.Phone != "") {

                var assetDriverContent = "<div class='form-group' style='margin-bottom:5px;'>" +
                          "<br />" +
                          "<span data-l11n class='text-bold'>" + "SMS Driver" + "</span>" +
                          "<textarea data-l11n rows='2' class='form-control' placeholder='Your message here ..' name='smsMsgDriverEN' id='smsMsgDriverEN' data-by-field='smsMsgDriverEN'></textarea>" +
                          "<br />" +
                          "<button data-l11n onclick='sendSMSEN(\"" + asset.Phone + "\",\"" + asset.CompanyID + "\",\"" + asset.AssetID + "\")' class='btn-dark btn btn-md pull-right'>Send</button>" +
                          "</div>";
            } else {

                var assetDriverContent = "<div class='form-group'>" +
                      "<br />" +
                      "<span class='text-bold'>" + "No Registered Driver Number" + "</span>" +
                      "</div>";
            }

            marker = new setInfoWindow({
                position: pt,
                map: map,
                icon: image,
                shape: shape,
                title: vechs,
                flag: asset.Jobs.Flag,
                assetflag: asset.Flag,
                jobStatus: asset.Jobs.JobStatus,
                address: asset.LastPos.Location,
                id: asset.AssetID,
                timestamp: asset.LastPos.Timestamp,
                html: infowindowcontent,
                assetDriverContent: assetDriverContent
            });


            if (asset.LastPos.BarLight == 1) {
                if (changeCheckbox.checked) {
                    UIAlert();
                }
                else {
                    soundManager.stop('UIAlertStop');
                }
            }

            // infoBoxList.push(infoBubble);
            var barlight = "";
            if (asset.LastPos.BarLight == 1) barlight = "Barlight is on";
            if (asset.LastPos.BarLight == 0) barlight = "Barlight is off";

            //then create the new marker
            pulse = new google.maps.Marker({
                flat: true,
                icon: imagePulse,
                map: map,
                optimized: false,
                position: pt,
                visible: true,
                title: barlight,
                html: infowindowcontent
            });

            //Open Barlight
             if (asset.LastPos.BarLight == 1)
             {
                 pulse.setVisible(true);
             }
             else if (asset.LastPos.BarLight == 0)
             {
                 pulse.setVisible(false);
             }

            /*** Function to Assets*/
            $(function () {

                $('.SelectAssetFilter').on('change', function () {

                    var selected = $(this).find("option:selected").val();

                    for (k = 0; k < markers.length; k++) {
                        marker = markers[k];

                        // If is same assets or assets not picked
                        if (marker.title == selected) {

                            marker.setVisible(true);
                            var position = marker.getPosition();
                            map.setCenter(position);
                            map.setZoom(16);

                            //Open Infowindow
                            //infowindow.setContent(marker.html);
                            //infowindow.open(this, marker);

                        }
                    }

                }); // end of on change

            }); //end of function


            if (markers[i] && markers[i].setPosition) {

                // To remove the marker from the map
                //marker.setVisible(false);
                marker.setMap(null);
                pulse.setMap(null);

                markers[i].setPosition(pt);
                pulses[i].setPosition(pt);

                //Open Barlight
                if (asset.LastPos.BarLight == 1)
                {
                    pulses[i].setVisible(true);
                }
                else if (asset.LastPos.BarLight == 0)
                {
                    pulses[i].setVisible(false);
                }

                //markers[i].setIcon(icon);

                markers[i].setIcon(/** @type {google.maps.Icon} */({
                    url: icon,
                    scaledSize: new google.maps.Size(28, 28), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(14, 14) // anchor
                }));

                if (paramtitle == vechs) {
                    markers[i].html = infowindowcontent;
                    markers[i].flag = asset.Jobs.Flag;
                    markers[i].assetflag = asset.Flag;
                    markers[i].jobStatus = asset.Jobs.JobStatus,
                    markers[i].address = asset.LastPos.Location,
                    markers[i].id = asset.AssetID,
                    markers[i].timestamp = asset.LastPos.Timestamp,
                    document.getElementById('infoWindow').innerHTML = infowindowcontent;
                    //map.panTo(marker.getPosition());
                }

              
            } else {

                bounds.extend(pt);
                var getHeight;

                // please note, 
                // that IE11 now returns undefined again for window.chrome
                // and new Opera 30 outputs true for window.chrome
                // and new IE Edge outputs to true now for window.chrome
                // so use the below updated condition
                var isChromium = window.chrome,
                    vendorName = window.navigator.vendor,
                    isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
                    isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;
                if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
                    // is Google chrome 
                    getHeight = 180;
                } else {
                    // not Google chrome 
                    getHeight = 150;
                }


                markers[i] = marker;
                pulses[i] = pulse;

            }//end of else

        } //end of else continue



    }

}

function setInfoWindow(param) {

    var getWidth;
    var getHeight;
    var getHeightChart;

    // please note, 
    // that IE11 now returns undefined again for window.chrome
    // and new Opera 30 outputs true for window.chrome
    // and new IE Edge outputs to true now for window.chrome
    // so use the below updated condition
    var isChromium = window.chrome,
        vendorName = window.navigator.vendor,
        isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
        isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;
    if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
        // is Google chrome 
        getWidth = 220;
        getHeight = 160;
        getHeightChart = 220;
    } else {
        // not Google chrome 
        getWidth = 220;
        getHeight = 180;
        getHeightChart = 220;
    }

    var newMarker = new google.maps.Marker({
        map: param.map,
        position: param.position,
        title: param.title,
        flag: param.flag,
        assetflag: param.assetflag,
        jobStatus: param.jobStatus,
        address: param.address,
        id: param.id,
        timestamp: param.timestamp,
        html: param.html,
        icon: param.icon,
        shape: param.shape
    });


    if (param.html) {
        google.maps.event.addListener(newMarker, 'click', function () {

            for (var i = 0; i < infoBoxList.length; i++) {

                infoBoxList[i].close();
            }

            // Reset the markers array
            infoBoxList = [];

            var newInfoWindow;
            // this -> the marker on which the onclick event is being attached
            if (!this.getMap().newMarker) {
                //newInfoWindow = this.getMap().newMarker = new google.maps.InfoWindow({
                //    disableAutoPan: false
                //});

                newInfoWindow = this.getMap().newMarker = new InfoBubble({
                    minWidth: getWidth,
                    minHeight: getHeight,
                    shadowStyle: 1,
                    borderRadius: 4,
                    arrowSize: 15,
                    borderWidth: 1,
                    disableAutoPan: false,
                    hideCloseButton: false,
                    arrowPosition: 30,
                    backgroundClassName: 'phoney',
                    arrowStyle: 2
                });

                infoBoxList.push(newInfoWindow);

            }

            this.getMap().newMarker.close();
            if (newMarker.title == param.title) this.getMap().newMarker.setContent(this.html);
            this.getMap().newMarker.open(this.getMap(), this);
            this.getMap().newMarker.removeTab(1);
            this.getMap().newMarker.removeTab(0);
            this.getMap().newMarker.addTab('Details', this.html);
            this.getMap().newMarker.addTab('SMS', param.assetDriverContent);
            this.getMap().setCenter(this.position);
            paramtitle = param.title;


        });

    }



    return newMarker;
}

function sendSMSEN(phone, companyID, assetID) {
    var getMsgEN = document.getElementById('smsMsgDriverEN').value;
    var Message = getMsgEN;
    var msgDriver = {
        Sender: "ADS",
        Recipients: phone,
        Message: Message,
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: companyID,
        AssetID: assetID
    };


    $.ajax({
        url: "http://103.237.168.119/adswebapi/api/messageinfo",
        type: "POST",
        data: JSON.stringify(msgDriver),
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
        success: function (msgDriver) {
            //console.log(msgDriver);
            alert("Message Sent");
        }
    });


}

function speedFormatter(value) {

    //Speed Formula
    if (value < 20) {
        var convertKmPerHour = value * 3.6;
    }
    else {
        var convertKmPerHour = value * 3.6 / 2;
    }

    var roundoff = Math.round(convertKmPerHour * 100) / 100;

    return roundoff + ' Km/h';
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function () {


    var accessories = [];

    $.each($("input[name='accessories']:checked"), function () {

        accessories.push($(this).val());

    });

    //Set
    sessionStorage.setItem("setSessionstorageValueAccessories", accessories.join(","));

});

$(document).ready(function () {


    var accessoriesOnChange = [];

    $("#accessoriesTable").change(function () {

        accessoriesOnChange = [];

        $.each($("input[name='accessories']:checked"), function () {

            accessoriesOnChange.push($(this).val());

        });

        //Set
        sessionStorage.setItem("setSessionstorageValueAccessories", accessoriesOnChange.join(","));

    });


});

//Search Places
function SearchPlacesFrom() {

    var defaultBounds = new google.maps.LatLngBounds(
       new google.maps.LatLng(1.3000, 103.8000),
       new google.maps.LatLng(1.3000, 103.5710));


    var input = document.getElementById('address');

    var options = {
        bounds: defaultBounds,
        types: ['establishment'],
        componentRestrictions: {
            country: 'SG'
        }
    };


    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);


    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        for (var i = 0; i < circleCoordinates.length; i++) {
            circleCoordinates[i].setMap(null);
        }

        for (var i = 0; i < infoBoxList.length; i++) {
            infoBoxList[i].close(null);
        }

        marker.setVisible(false);
        var place = autocomplete.getPlace();   

        if (!place.geometry) {
            console.log("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            map.setZoom(12);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(12);  // Why 17? Because it looks good.
        }

        if (customerMarker) customerMarker.setMap(null);
        customerMarker = new google.maps.Marker({
            map: map,
            icon: {
                //'url': 'https://google-maps-utility-library-v3.googlecode.com/svn/trunk/geolocationmarker/images/gpsloc.png',
                'size': new google.maps.Size(34, 34),
                'scaledSize': new google.maps.Size(17, 17),
                'origin': new google.maps.Point(0, 0),
                'anchor': new google.maps.Point(8, 8)
            },
            position: place.geometry.location
        });

        var radiusOptions = ({
            clickable: false,
            strokeColor: '#1bb6ff',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#61a0bf',
            fillOpacity: 0.4,
            map: map,
            center: place.geometry.location,
            radius: 5 * 1000
        });

        // Add the circle for this city to the map.
        geocodeCircle = new google.maps.Circle(radiusOptions);

        circleCoordinates.push(geocodeCircle);

        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

        //var numResults = parseInt(document.getElementById('numberResults').value);
        var numResults = markers.length


        // get driving distance
        closest = findClosestN(place.geometry.location, numResults);
        calculateDistances(place.geometry.location, closest, numResults);

        for (var i = 0; i < closest.length; i++) {
            closest[i].setMap(map);
        }


        var address = '';
        if (place.address_components) {

            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }


    });

    autocomplete.setTypes();


}

function SearchPlacesTo() {

    var defaultBounds = new google.maps.LatLngBounds(
       new google.maps.LatLng(1.3000, 103.8000),
       new google.maps.LatLng(1.3000, 103.5710));


    var input = document.getElementById('to-destination');

    var options = {
        bounds: defaultBounds,
        types: ['establishment'],
        componentRestrictions: {
            country: 'SG'
        }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);


    autocomplete.setTypes();


}

function codeAddress() {

    for (var i = 0; i < circleCoordinates.length; i++) {
        circleCoordinates[i].setMap(null);
    }

    for (var i = 0; i < infoBoxList.length; i++) {
        infoBoxList[i].close(null);
    }

    //var address = document.getElementById('address').value;

    var getAddress;
    var address = $('#address').val();
    var origin = $('#origin').val();
    var nursingFrom = $('#nursingFrom').val();
    var toDestination = $('#to-destination').val();

    if (address == "") {

        if (nursingFrom == "" && origin == "") {
            alert('You must select Hospital');
            return;
        }
        else if (origin == "")
        {
            if (nursingFrom != "" || nursingFrom != null)
            {
                getAddress = $('#nursingFrom').val();
            }           
        }
        else if (nursingFrom == "")
        {
            if (origin != "" || origin != null) {
                getAddress = $('#origin').val();
            }          
        }
        
    }
    else {
        getAddress = $('#address').val();
    }


    geocoder.geocode({
        'address': getAddress

    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            console.log(results[0].geometry.location);

            var coords = results[0].geometry.location;

            if (address.length == 6)
            {
                sessionStorage.setItem("setSessionstorageValueNewJobCoordinatesFrom", coords);
                var input = sessionStorage.getItem('setSessionstorageValueNewJobCoordinatesFrom');
                var latlngStr = input.split(',', 2);
                var lat = parseFloat(latlngStr[0].replace(/\(/g, ""));
                var lng = parseFloat(latlngStr[1].replace(/\)/g, ""));

                //Reverse Geocode
                var getAPI = "http://track.asiacom.co.th/adswebapi/api/reversegeocode?PosY=" + lat + "&PosX=" + lng;
                console.log(getAPI);

                $.getJSON(getAPI, function (data) {

                    $.each(data, function (index, item) {
                        sessionStorage.setItem("setSessionstorageValueNewJobLocationFrom", item.Location);
                    });

                });
            }


            if (customerMarker) customerMarker.setMap(null);
            customerMarker = new google.maps.Marker({
                map: map,
                icon: {
                    //'url': 'https://google-maps-utility-library-v3.googlecode.com/svn/trunk/geolocationmarker/images/gpsloc.png',
                    'size': new google.maps.Size(34, 34),
                    'scaledSize': new google.maps.Size(17, 17),
                    'origin': new google.maps.Point(0, 0),
                    'anchor': new google.maps.Point(8, 8)
                },
                position: results[0].geometry.location
            });


            var radiusOptions = ({
                clickable: false,
                strokeColor: '#1bb6ff',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#61a0bf',
                fillOpacity: 0.4,
                map: map,
                center: results[0].geometry.location,
                radius: 5 * 1000
            });

            // Add the circle for this city to the map.
            geocodeCircle = new google.maps.Circle(radiusOptions);

            circleCoordinates.push(geocodeCircle);


            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            //var numResults = parseInt(document.getElementById('numberResults').value);
            var numResults = markers.length


            // get driving distance
            closest = findClosestN(results[0].geometry.location, numResults);
            calculateDistances(results[0].geometry.location, closest, numResults);

            for (var i = 0; i < closest.length; i++) {
                closest[i].setMap(map);
            }

        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

    
    //Reverse Geocode Destination
    if (toDestination.length == 6) {

        geocoder.geocode({
            'address': toDestination

        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                console.log(results[0].geometry.location);

                var coords = results[0].geometry.location;

                sessionStorage.setItem("setSessionstorageValueNewJobCoordinatesTo", coords);
                var input = sessionStorage.getItem('setSessionstorageValueNewJobCoordinatesTo');
                var latlngStr = input.split(',', 2);
                var lat = parseFloat(latlngStr[0].replace(/\(/g, ""));
                var lng = parseFloat(latlngStr[1].replace(/\)/g, ""));

                //Reverse Geocode
                var getAPI = "http://track.asiacom.co.th/adswebapi/api/reversegeocode?PosY=" + lat + "&PosX=" + lng;
                console.log(getAPI);

                $.getJSON(getAPI, function (data) {

                    $.each(data, function (index, item) {
                        sessionStorage.setItem("setSessionstorageValueNewJobLocationTo", item.Location);
                    });

                });


            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

    }
    else
    {
        //Remove session storage
        sessionStorage.removeItem("setSessionstorageValueNewJobLocationTo");
    }




}

function findClosestN(pt, numberOfResults) {
    var closest = [];
    for (var i = 0; i < markers.length; i++) {
        markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, markers[i].getPosition());
        markers[i].setMap(null);
        closest.push(markers[i]);
    }
    closest.sort(sortByDist);

    return closest.splice(0, numberOfResults);
}

function sortByDist(a, b) {
    return (a.distance - b.distance)
}

function calculateDistances(pt, closest, numberOfResults) {
    var service = new google.maps.DistanceMatrixService();

    var request = {
        origins: [pt],
        destinations: [],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    };
    for (var i = 0; i < closest.length; i++) request.destinations.push(closest[i].getPosition());

    service.getDistanceMatrix(request, function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            var outputDiv = document.getElementById('side_bar');
            outputDiv.innerHTML = '';

            var results = response.rows[0].elements;
            
            for (var i = 0; i < numberOfResults; i++) {
                closest[i].setMap(map);

    
                if (closest[i].assetflag == 1)
                if (closest[i].flag == 0 || closest[i].flag == 1 && closest[i].jobStatus == "Scheduled")
		        var timestamp1 = moment.utc(closest[i].timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);
                if (timestamp1 == timestamp2)


                outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                    + "<table id='availAmbulance' border='0'>"
                    + "<tbody>"
                    + "<tr>"
                    + "<td>"
                    + "<strong><a href='javascript:google.maps.event.trigger(closest[" + i + "],\"click\");' style='color:#458FD2;'>" + closest[i].title + '</a></strong><br>' + closest[i].address + "<br>"
                    + results[i].distance.text + ' appoximately '
                    + results[i].duration.text + '<br>'
                    + "</td>"
                    + "<td class='col-md-1'>"
                    + "<div class='pad-ver'><label class='form-primary'><input id='getAddress' value='" + closest[i].address + "'  type='checkbox' onClick='getAvailableAmbulance(this,&quot;" + closest[i].title + "&quot;,&quot;" + closest[i].address + "&quot;,&quot;" + closest[i].id + "&quot;);'></label><div>"
                    + "</td>"
                    + "</tr>"
                    + "</tbody>"
                    + "</table>"
                    + "</div>"
                    + "<hr>";

            }
        }
    });

}

function getAvailableAmbulance(cb, title, address, id) {

    

    var $inputs = $('input:checkbox')

    if (cb.checked == true)
    {
        //alert('Asset ID: ' + id);
        sessionStorage.setItem("setSessionstorageValueAvailableAmbulance", id);
        searchDriver(id);
        searchDevice(id);
        alert('You have selected: ' + title);
        $inputs.not(cb).prop('disabled', true);
    }
    else if (cb.checked == false)
    {
        $inputs.prop('disabled', false); // <-- enable all checkboxes
        //alert('This will reset you have selected');
        //window.location.reload(true);
    }
   
}

function getDirections(origin, destination) {
    var request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
            directionsDisplay.setPanel(document.getElementById('ambulanceStatus'));
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

}

function AutoRefreshBarlight() {

    // Loop through markers and set map to null for each
    for (var i = 0; i < infoBoxList.length; i++) {

        infoBoxList[i].close();
    }

    // Reset the markers array
    infoBoxList = [];

}

function AutoRefresh() {

    // Loop through markers and set map to null for each
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

    // Reset the markers array
    markers = [];


    for (var i = 0; i < infoBoxList.length; i++) {

        infoBoxList[i].close();
    }

    // Reset the markers array
    infoBoxList = [];


    // Call set markers to re-add markers
    //setMarkers(map, assets, handleAssets);
    //setMarkers(map, assets, updateAssets);

}

function AutoRefreshCompanyFilter() {

    // Loop through markers and set map to null for each
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

    // Reset the markers array
    markers = [];


    for (var i = 0; i < infoBoxList.length; i++) {

        infoBoxList[i].close();
    }

    // Reset the markers array
    infoBoxList = [];

    //setMarkersFilter(map, assets, handleAssets);
    setMarkersFilter(map, assets, updateAssets);

}

function searchDriver(id) {

    var getReseller = sessionStorage.getItem('setSessionstorageValueUserResellerID');
    var getCompany = sessionStorage.getItem('setSessionstorageValueCompanyID');
    var apiDriver = 'http://track.asiacom.co.th/adswebapi/api/driverinfo?ResellerID=' + getReseller + '&CompanyID=' + getCompany + '&AssetID=' + id;
    var apiDevice = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo?ResellerID=' + getReseller + '&CompanyID=' + getCompany + '&AssetID=' + id;
    //alert(apiDriver);

    $.getJSON(apiDriver, function (data) {

        if (data.length == 1) {
            $.each(data, function (index, item) {

                var getDriverPhone = item.Phone;
                sessionStorage.setItem("setSessionstorageValueDriverPhone", getDriverPhone);

                var getDriverName = item.Name;
                sessionStorage.setItem("setSessionstorageValueDriverName", getDriverName);
            });
        }
        else {
            sessionStorage.setItem("setSessionstorageValueDriverPhone", 0);
        }

    });

}

function searchDevice(id) {

    var getReseller = sessionStorage.getItem('setSessionstorageValueUserResellerID');
    var getCompany = sessionStorage.getItem('setSessionstorageValueCompanyID');
    var apiDevice = 'http://track.asiacom.co.th/adswebapi/api/deviceinfo?ResellerID=' + getReseller + '&CompanyID=' + getCompany + '&AssetID=' + id;
    //alert(apiDevice);

    $.getJSON(apiDevice, function (data) {

        if (data.length == 1) {
            $.each(data, function (index, item) {

                var getDevicePhone = item.Phone;
                sessionStorage.setItem("setSessionstorageValueDevicePhone", getDevicePhone);

            });
        }
        else {
            sessionStorage.setItem("setSessionstorageValueDevicePhone", 0);
        }

    });

}

function searchJob() {

    var getJobNumber = $('#reference').val();
    var apiJobNumber = 'http://track.asiacom.co.th/adswebapi/api/searchjob?JobNumber=' + getJobNumber;
    //alert(apiJobNumber);

    $.getJSON(apiJobNumber, function (data) {

        if (data.length == 1) {

            $.each(data, function (index, item) {

                if (item.JobType == "Scheduled") {
                    alert('Cannot edit Scheduled Job here');
                }
                else {

                    if (item.JobStatus == "Completed") {
                        alert('Job is completed & cannot be loaded here!');
                    }
                    else {
                        var getDriverPhone = item.DriverInfo.Phone;
                        sessionStorage.setItem("setSessionstorageValueDriverPhone", getDriverPhone);

                        //alert(getDriverPhone);

                        var getAssetID = item.AssetID;

                        sessionStorage.setItem("setSessionstorageValuePreviousAsset", getAssetID);


                        //Convert Timezone
                        var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');
                        var Singapore = moment.tz(item.Timestamp, Asia);
                        //Format UTC
                        var timestamp = moment.utc(Singapore.format()).add('hours', 8).format('DD-MMM-YYYY, hh:mm:ss A');
                        var jobDateTime = $('#date').val(timestamp);

                        var jobID = $('#jobid').val(item.JobID);
                        var jobAmount = $('#amount').val(item.Amount);
                        var jobCaller = $('#caller').val(item.Caller);
                        var jobPhone = $('#phone').val(item.Phone);
                        var jobUnit = $('#unit').val(item.Unit);
                        var jobBed = $('#bed').val(item.Bed);
                        var jobPatient = $('#patient').val(item.Patient);
                        var jobRemarks = $('#remarks').val(item.Remarks);

                        var getAddress;

                        if (item.Origin == "Changi General Hospital (CGH)") {
                            getAddress = "1.3407,103.9495";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#nursingFrom').attr('disabled', true);
                        }
                        else if (item.Origin == "Gleneagles Hospital") {
                            getAddress = "1.3074,103.8200";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Khoo Teck Puat Hospital") {
                            getAddress = "1.4238,103.8387";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "KK Women's And Children's Hospital (KKH)") {
                            getAddress = "1.3106,103.8469";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Mount Alvernia Hospital") {
                            getAddress = "1.3418,103.8379";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Mount Elizabeth Hospital") {
                            getAddress = "1.3054,103.8356";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "National University Hospital (NUH)") {
                            getAddress = "1.2944,103.7829";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Ng Teng Fong General Hospital & Jurong Community Hospital") {
                            getAddress = "1.3349,103.7447";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Parkway East Hospital (former East Shore Hospital)") {
                            getAddress = "1.3151,103.9091";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Raffles Hospital") {
                            getAddress = "1.3011,103.8575";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Singapore General Hospital (SGH)") {
                            getAddress = "1.2795,103.8348";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Tan Tock Seng Hospital (TTSH)") {
                            getAddress = "1.3214,103.8459";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Thomson Medical Centre (TMC)") {
                            getAddress = "1.325707,103.841496";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                        else if (item.Origin == "Institute of Mental Health") {
                            getAddress = "1.3825,103.8843";
                            $('#origin').val(getAddress);
                            $('#address').attr('disabled', true);
                        }
                            //Nursing
                        else if (item.Origin == "Econ Medicare Centre (Upper East Coast Rd)") {
                            getAddress = "452 Upper East Coast Rd, Singapore 466500";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Orange Valley Nursing Home (Changi)") {
                            getAddress = "52 Biggin Hill Rd, Singapore 509945";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Orange Valley Nursing Home (Bukit Merah)") {
                            getAddress = "148A Silat Avenue 168871";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Orange Valley Nursing Home (Clementi)") {
                            getAddress = "221 Clementi Ave 4 129881";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Orange Valley Nursing Home (Marsiling)") {
                            getAddress = "11 Woodland Avenue 1 739068";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Orange Valley Nursing Home (Simei)") {
                            getAddress = "6 Simei Street 3 529898";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Orange Valley Nursing Home (Sims Avenue)") {
                            getAddress = " 461A Sims Avenue 387541";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "All Saints Home (Tampines Street)") {
                            getAddress = "11 Tampines Street 44, Singapore 529123";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Serene Nursing Home Pte Ltd") {
                            getAddress = "31 Joo Chiat Ln, Singapore 428101";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Nightingale") {
                            getAddress = "106 Braddell Rd, Singapore 359912";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Paean Nursing Home Pte Ltd") {
                            getAddress = "134 Lor J Telok Kurau, Singapore 425962";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Ju Eng Home For Senior Citizens") {
                            getAddress = "205 Jln Kayu, Singapore 799436";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Irene Nursing Home Pte. Ltd") {
                            getAddress = "1 Jln Ampas, Singapore 329514";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "The Man Fut Tong Nursing Home") {
                            getAddress = "20 Woodlands Street 82, Singapore 738507e";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Ren Ci @ Bukit Batok St. 52") {
                            getAddress = "31 Bukit Batok Street 52, Singapore 650540";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Peacehaven Nursing Home") {
                            getAddress = "9 Upper Changi Rd N, 507706";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Lee Ah Mooi") {
                            getAddress = "1 Thomson Ln, Singapore 297728";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Jamiyah Nursing Home") {
                            getAddress = "130 West Coast Drive Singapore 127444";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Jamiyah Home for the Aged") {
                            getAddress = "1 Tampines Ave 3, Singapore 529707";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Bethany Methodist Welfare Services") {
                            getAddress = "9 Choa Chu Kang Ave 4, Singapore 689815";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "St. Joseph's Home") {
                            getAddress = "9 Mandai Estate, 729906";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Sree Narayana Mission") {
                            getAddress = "12 Yishun Ave 5, Singapore 768990";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Bright Hill Evergreen Home") {
                            getAddress = "100 Punggol Field, 828811";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "St. Andrew's Nursing Home") {
                            getAddress = "60 Buangkok View, 534191";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Society For The Aged Sick") {
                            getAddress = "130 Hougang Ave 1, Singapore 538900";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Pacific Healthcare Nursing Home (Lengkok Bahru)") {
                            getAddress = "6 Lengkok Bahru, 159051";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Apex Harmony Lodge") {
                            getAddress = "10 Pasir Ris Walk, 518240";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Windsor Convalescent Home Pte Ltd") {
                            getAddress = "369 Pasir Panjang Rd, Singapore 118706";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Singapore Christian Home") {
                            getAddress = "20 Sembawang Cres, Singapore 757092";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Our Lady Of Lourdes Nursing Home Pte Ltd") {
                            getAddress = "19 Toh Drive, 507871";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Green Avenue Home for the Elderly") {
                            getAddress = "1 Lor 23 Geylang, 388352";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Ling Kwang Home") {
                            getAddress = "156 Serangoon Garden Way, Singapore 556055";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "LC Nursing Home") {
                            getAddress = "2 Jln Ulu Siglap, Singapore 457121";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Ren Ci Nursing Home (moulmein)") {
                            getAddress = "50 Jln Tan Tock Seng, 308438";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Cheshire Home") {
                            getAddress = "159 Serangoon Garden Way, Singapore 556056";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Pacific Healthcare Nursing Home II (Senja Rd)") {
                            getAddress = "21 Senja Rd, 677736";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Villa Francis Home") {
                            getAddress = "91 Yishun Central, 768829";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "St. Theresa's Home") {
                            getAddress = "49 Upper Thomson Rd, 574325";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "St John's Home") {
                            getAddress = "69 Wan Tho Avenue, 347601";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Lions Home For The Elders (Bedok South)") {
                            getAddress = "487 Bedok South Ave 2, Singapore 469316";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Econ Medicare Centres & Nursing Homes") {
                            getAddress = "451 Yio Chu Kang Rd, 805947";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Econ Medicare Centre Pte Ltd (Recreation Road)") {
                            getAddress = "25 Recreation Road, 546522";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Bishan Home For The Intellectually Disabled") {
                            getAddress = "6 Bishan Street 13, Singapore 579798";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Lions Home For The Elders (Bishan)") {
                            getAddress = "9 Bishan Street 13, 579804";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "United Medicare Centre (Toa Payoh)") {
                            getAddress = "170 Lor 6 Toa Payoh, Singapore 319400";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "United Medicare Centre (Elizabeth Drive)") {
                            getAddress = "72 Elizabeth Drive, 669745";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Econ Medicare Centre (Buangkok View)") {
                            getAddress = "10 Buangkok View, 539747";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "All Saints Home (Hougang)") {
                            getAddress = "5 Poh Huat Rd, Singapore 546703";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "All Saints Home (Yishun)") {
                            getAddress = "551 Yishun Ring Road Singapore 768681";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "All Saints Home (Jurong)") {
                            getAddress = "20 Jurong East Avenue 1";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Dover Park Hospice") {
                            getAddress = "10 Jalan Tan Tock Seng, 308436";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Assisi Hospice") {
                            getAddress = "820 Thomson Rd, 574623";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Simei Care Centre") {
                            getAddress = "10 Simei Street 3";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Ren Ci Community Hospital") {
                            getAddress = "71 Irrawaddy Rd, 329562";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Jurong Community Hospital") {
                            getAddress = "1 Jurong East Street 21, 609606";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Thye Hua Kwan Hospital") {
                            getAddress = "17 Ang Mo Kio Ave 9, 569766";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Saint Andrew's Community Hospital") {
                            getAddress = "8 Simei Street 3, 529895";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Kwong Wai Shiu Hospital") {
                            getAddress = "705 Serangoon Road, 328127";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Alexandra Hospital") {
                            getAddress = "378 Alexandra Road, Singapore 159964";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Bright Vision Hospital") {
                            getAddress = "5 Lor Napiri, Singapore 547530";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Pearl's Hill Care Home") {
                            getAddress = "5 Pearl's Hill Road 168996";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Acacia Welfare Home") {
                            getAddress = "10 Kaki Bukit Avenue 5 417902";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Adventist Home For The Elders") {
                            getAddress = "195 Kim Keat Ave #01-294 310195";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Angsana Home @ Pelangi Village") {
                            getAddress = "14 Buangkok Green 539755";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Banyan Home @ Pelangi Village") {
                            getAddress = "12 Buangkok Green 539754";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Blue Cross Thong Kheng Home") {
                            getAddress = "201 Jurong East Avenue 1 609791";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Bo Tien Home For The Aged") {
                            getAddress = "6 Fourth Chin Bee Rd 619708";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Bukit Batok Home For The Aged") {
                            getAddress = "11 Bukit Batok West Ave 2 659205";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Christalite Methodist Home") {
                            getAddress = "51 Marsiling Drive 739297";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Econ Medicare Centre (Choa Chu Kang Rd)") {
                            getAddress = "53 Choa Chu Kang Road 689385";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Econ Medicare Centre (Chai Chee Street)") {
                            getAddress = "351 Chai Chee Street 468982";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Econ Medicare Centre (Braddell Road)") {
                            getAddress = "58 Braddell Road 359905";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Good Shepherd Loft") {
                            getAddress = "255A Bukit Timah Road 259691";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Grace Lodge") {
                            getAddress = "19 Compassvale Walk 544644";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Jenaris Home @ Pelangi Village") {
                            getAddress = "10 Buangkok Green 539753";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Kheng Chiu Loke Tin Kee Home") {
                            getAddress = "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Meranti Home @ Pelangi Village") {
                            getAddress = "6 Buangkok Green 539751";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Min Chong Comfort Home Pte Ltd") {
                            getAddress = "39 Sims Avenue 387412";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Mindsville @ Napiri - Home") {
                            getAddress = "7 Lorong Napiri 547533";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Moral Home For The Aged Sick (Jalan Bilal)") {
                            getAddress = "1 Jalan Bilal, 468854";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Moral Welfare Home (Henderson Road)") {
                            getAddress = "301 Henderson Road 108931";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "NTUC Health Nursing Home (Jurong West)") {
                            getAddress = "50 Jurong West Street 93 648967";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Soo's Nursing Home Pte Ltd") {
                            getAddress = "45 Sixth Avenue 276487";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "St Vincent Home") {
                            getAddress = "263 Waterloo Street #05-01 180263";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Sunlove Home") {
                            getAddress = "70 Buangkok View 534190";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Sunnyville Home") {
                            getAddress = "10 Ama Keng Road 709828";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Swami Home") {
                            getAddress = "5 Sembawang Walk 757717";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Tai Pei Old People's Home") {
                            getAddress = "10 Jalan Ampas 329510";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Tai Pei Social Service (TPSS)") {
                            getAddress = "10 Buangkok View 539747";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "The Lentor Residence") {
                            getAddress = "51 Lentor Avenue 786876";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Thian Leng Old Folks Home") {
                            getAddress = "115 Lorong G Telok Kurau 426317";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Thong Teck Home For Senior Citizens") {
                            getAddress = "91 Geylang East Avenue 2 389759";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Thuja Home @ Pelangi Village") {
                            getAddress = "4 Buangkok Green 539750";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "United Medicare Centre (Queensway)") {
                            getAddress = "55 Queensway 149058";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                        else if (item.Origin == "Tembusu Home @ Pelangi Village") {
                            getAddress = "2 Buangkok Green 539749";
                            $('#nursingFrom').val(getAddress);
                            $('#address').attr('disabled', true);
                            $('#origin').attr('disabled', true);
                        }
                            //End of Nursing
                        else {
                            getAddress = $('#address').val(item.Origin);
                            $('#origin').attr('disabled', true);
                        }

                        var getDestination;

                        if (item.Destination == "Changi General Hospital (CGH)") {
                            getDestination = "Changi General Hospital (CGH)";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Gleneagles Hospital") {
                            getDestination = "Gleneagles Hospital";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Khoo Teck Puat Hospital") {
                            getDestination = "Khoo Teck Puat Hospital";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "KK Women's And Children's Hospital (KKH)") {
                            getDestination = "KK Women's And Children's Hospital (KKH)";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Mount Alvernia Hospital") {
                            getDestination = "Mount Alvernia Hospital";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Mount Elizabeth Hospital") {
                            getDestination = "Mount Elizabeth Hospital";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "National University Hospital (NUH)") {
                            getDestination = "National University Hospital (NUH)";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Ng Teng Fong General Hospital & Jurong Community Hospital") {
                            getDestination = "Ng Teng Fong General Hospital & Jurong Community Hospital";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Parkway East Hospital (former East Shore Hospital)") {
                            getDestination = "Parkway East Hospital (former East Shore Hospital)";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Raffles Hospital") {
                            getDestination = "Raffles Hospital";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Singapore General Hospital (SGH)") {
                            getDestination = "Singapore General Hospital (SGH)";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Tan Tock Seng Hospital (TTSH)") {
                            getDestination = "Tan Tock Seng Hospital (TTSH)";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Thomson Medical Centre (TMC)") {
                            getDestination = "Thomson Medical Centre (TMC)";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                        else if (item.Destination == "Institute of Mental Health") {
                            getDestination = "Institute of Mental Health";
                            $('#destination').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#nursingTo').attr('disabled', true);
                        }
                            //To Nursing Home
                        else if (item.Destination == "Econ Medicare Centre (Upper East Coast Rd)") {
                            getDestination = "452 Upper East Coast Rd, Singapore 466500";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Orange Valley Nursing Home (Changi)") {
                            getDestination = "52 Biggin Hill Rd, Singapore 509945";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Orange Valley Nursing Home (Bukit Merah)") {
                            getDestination = "148A Silat Avenue 168871";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Orange Valley Nursing Home (Clementi)") {
                            getDestination = "221 Clementi Ave 4 129881";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Orange Valley Nursing Home (Marsiling)") {
                            getDestination = "11 Woodland Avenue 1 739068";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Orange Valley Nursing Home (Simei)") {
                            getDestination = "6 Simei Street 3 529898";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Orange Valley Nursing Home (Sims Avenue)") {
                            getDestination = " 461A Sims Avenue 387541";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "All Saints Home (Tampines Street)") {
                            getDestination = "11 Tampines Street 44, Singapore 529123";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Serene Nursing Home Pte Ltd") {
                            getDestination = "31 Joo Chiat Ln, Singapore 428101";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Nightingale") {
                            getAddress = "106 Braddell Rd, Singapore 359912";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Paean Nursing Home Pte Ltd") {
                            getDestination = "134 Lor J Telok Kurau, Singapore 425962";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Ju Eng Home For Senior Citizens") {
                            getDestination = "205 Jln Kayu, Singapore 799436";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Irene Nursing Home Pte. Ltd") {
                            getDestination = "1 Jln Ampas, Singapore 329514";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "The Man Fut Tong Nursing Home") {
                            getDestination = "20 Woodlands Street 82, Singapore 738507e";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Ren Ci @ Bukit Batok St. 52") {
                            getDestination = "31 Bukit Batok Street 52, Singapore 650540";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Peacehaven Nursing Home") {
                            getDestination = "9 Upper Changi Rd N, 507706";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Lee Ah Mooi") {
                            getDestination = "1 Thomson Ln, Singapore 297728";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Jamiyah Nursing Home") {
                            getDestination = "130 West Coast Drive Singapore 127444";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Jamiyah Home for the Aged") {
                            getDestination = "1 Tampines Ave 3, Singapore 529707";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Bethany Methodist Welfare Services") {
                            getDestination = "9 Choa Chu Kang Ave 4, Singapore 689815";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "St. Joseph's Home") {
                            getDestination = "9 Mandai Estate, 729906";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Sree Narayana Mission") {
                            getDestination = "12 Yishun Ave 5, Singapore 768990";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Bright Hill Evergreen Home") {
                            getDestination = "100 Punggol Field, 828811";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "St. Andrew's Nursing Home") {
                            getDestination = "60 Buangkok View, 534191";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Society For The Aged Sick") {
                            getDestination = "130 Hougang Ave 1, Singapore 538900";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Pacific Healthcare Nursing Home (Lengkok Bahru)") {
                            getDestination = "6 Lengkok Bahru, 159051";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Apex Harmony Lodge") {
                            getDestination = "10 Pasir Ris Walk, 518240";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Windsor Convalescent Home Pte Ltd") {
                            getDestination = "369 Pasir Panjang Rd, Singapore 118706";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Singapore Christian Home") {
                            getDestination = "20 Sembawang Cres, Singapore 757092";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Our Lady Of Lourdes Nursing Home Pte Ltd") {
                            getDestination = "19 Toh Drive, 507871";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Green Avenue Home for the Elderly") {
                            getDestination = "1 Lor 23 Geylang, 388352";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Ling Kwang Home") {
                            getDestination = "156 Serangoon Garden Way, Singapore 556055";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "LC Nursing Home") {
                            getDestination = "2 Jln Ulu Siglap, Singapore 457121";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Ren Ci Nursing Home (moulmein)") {
                            getDestination = "50 Jln Tan Tock Seng, 308438";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Cheshire Home") {
                            getDestination = "159 Serangoon Garden Way, Singapore 556056";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Pacific Healthcare Nursing Home II (Senja Rd)") {
                            getDestination = "21 Senja Rd, 677736";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Villa Francis Home") {
                            getDestination = "91 Yishun Central, 768829";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "St. Theresa's Home") {
                            getDestination = "49 Upper Thomson Rd, 574325";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "St John's Home") {
                            getDestination = "69 Wan Tho Avenue, 347601";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Lions Home For The Elders (Bedok South)") {
                            getDestination = "487 Bedok South Ave 2, Singapore 469316";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Econ Medicare Centres & Nursing Homes") {
                            getDestination = "451 Yio Chu Kang Rd, 805947";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Econ Medicare Centre Pte Ltd (Recreation Road)") {
                            getDestination = "25 Recreation Road, 546522";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Bishan Home For The Intellectually Disabled") {
                            getDestination = "6 Bishan Street 13, Singapore 579798";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Lions Home For The Elders (Bishan)") {
                            getDestination = "9 Bishan Street 13, 579804";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "United Medicare Centre (Toa Payoh)") {
                            getDestination = "170 Lor 6 Toa Payoh, Singapore 319400";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "United Medicare Centre (Elizabeth Drive)") {
                            getDestination = "72 Elizabeth Drive, 669745";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Econ Medicare Centre (Buangkok View)") {
                            getDestination = "10 Buangkok View, 539747";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "All Saints Home (Hougang)") {
                            getDestination = "5 Poh Huat Rd, Singapore 546703";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "All Saints Home (Yishun)") {
                            getDestination = "551 Yishun Ring Road Singapore 768681";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "All Saints Home (Jurong)") {
                            getDestination = "20 Jurong East Avenue 1";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Dover Park Hospice") {
                            getDestination = "10 Jalan Tan Tock Seng, 308436";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Assisi Hospice") {
                            getDestination = "820 Thomson Rd, 574623";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Simei Care Centre") {
                            getDestination = "10 Simei Street 3";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Ren Ci Community Hospital") {
                            getDestination = "71 Irrawaddy Rd, 329562";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Jurong Community Hospital") {
                            getDestination = "1 Jurong East Street 21, 609606";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Thye Hua Kwan Hospital") {
                            getDestination = "17 Ang Mo Kio Ave 9, 569766";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Saint Andrew's Community Hospital") {
                            getDestination = "8 Simei Street 3, 529895";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Kwong Wai Shiu Hospital") {
                            getDestination = "705 Serangoon Road, 328127";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Alexandra Hospital") {
                            getDestination = "378 Alexandra Road, Singapore 159964";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Bright Vision Hospital") {
                            getDestination = "5 Lor Napiri, Singapore 547530";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Pearl's Hill Care Home") {
                            getDestination = "5 Pearl's Hill Road 168996";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Acacia Welfare Home") {
                            getDestination = "10 Kaki Bukit Avenue 5 417902";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Adventist Home For The Elders") {
                            getDestination = "195 Kim Keat Ave #01-294 310195";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Lions Home For The Elders") {
                            getDestination = "487 Bedok South Ave 2, Singapore 469316";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Angsana Home @ Pelangi Village") {
                            getDestination = "14 Buangkok Green 539755";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Banyan Home @ Pelangi Village") {
                            getDestination = "12 Buangkok Green 539754";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Blue Cross Thong Kheng Home") {
                            getDestination = "201 Jurong East Avenue 1 609791";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Bo Tien Home For The Aged") {
                            getDestination = "6 Fourth Chin Bee Rd 619708";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Bukit Batok Home For The Aged") {
                            getDestination = "11 Bukit Batok West Ave 2 659205";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Christalite Methodist Home") {
                            getDestination = "51 Marsiling Drive 739297";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Econ Medicare Centre (Choa Chu Kang Rd)") {
                            getDestination = "53 Choa Chu Kang Road 689385";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Econ Medicare Centre (Chai Chee Street)") {
                            getDestination = "351 Chai Chee Street 468982";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Econ Medicare Centre (Braddell Road)") {
                            getDestination = "58 Braddell Road 359905";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Good Shepherd Loft") {
                            getDestination = "255A Bukit Timah Road 259691";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Grace Lodge") {
                            getDestination = "19 Compassvale Walk 544644";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Jenaris Home @ Pelangi Village") {
                            getDestination = "10 Buangkok Green 539753";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Kheng Chiu Loke Tin Kee Home") {
                            getDestination = "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Meranti Home @ Pelangi Village") {
                            getDestination = "6 Buangkok Green 539751";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Min Chong Comfort Home Pte Ltd") {
                            getDestination = "39 Sims Avenue 387412";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Mindsville @ Napiri - Home") {
                            getDestination = "7 Lorong Napiri 547533";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Moral Home For The Aged Sick (Jalan Bilal)") {
                            getDestination = "1 Jalan Bilal, 468854";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Moral Welfare Home (Henderson Road)") {
                            getDestination = "301 Henderson Road 108931";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "NTUC Health Nursing Home (Jurong West)") {
                            getDestination = "50 Jurong West Street 93 648967";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Soo's Nursing Home Pte Ltd") {
                            getDestination = "45 Sixth Avenue 276487";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "St Vincent Home") {
                            getDestination = "263 Waterloo Street #05-01 180263";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Sunlove Home") {
                            getDestination = "70 Buangkok View 534190";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Sunnyville Home") {
                            getDestination = "10 Ama Keng Road 709828";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Swami Home") {
                            getDestination = "5 Sembawang Walk 757717";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Tai Pei Old People's Home") {
                            getDestination = "10 Jalan Ampas 329510";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Tai Pei Social Service (TPSS)") {
                            getDestination = "10 Buangkok View 539747";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "The Lentor Residence") {
                            getDestination = "51 Lentor Avenue 786876";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Thian Leng Old Folks Home") {
                            getDestination = "115 Lorong G Telok Kurau 426317";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Thong Teck Home For Senior Citizens") {
                            getDestination = "91 Geylang East Avenue 2 389759";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Thuja Home @ Pelangi Village") {
                            getDestination = "4 Buangkok Green 539750";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "United Medicare Centre (Queensway)") {
                            getDestination = "55 Queensway 149058";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                        else if (item.Destination == "Tembusu Home @ Pelangi Village") {
                            getDestination = "2 Buangkok Green 539749";
                            $('#nursingTo').val(getDestination);
                            $('#to-destination').attr('disabled', true);
                            $('#destination').attr('disabled', true);
                        }
                            //End
                        else {
                            getDestination = $('#to-destination').val(item.Destination);
                            $('#destination').attr('disabled', true);
                        }


                        var jobPayment = $('#payment').val(item.Payment);
                        var jobTrip = $('#trip').val(item.Trip);
                        var jobRemarks = $('#patientRemarks').val(item.Remarks2);


                        //Convert String to Array
                        var getAccessories = item.Accessories;
                        var loadAccessories = new Array();
                        loadAccessories = getAccessories.split(",");

                        for (var i = 0; i < loadAccessories.length; ++i) {
                            if (loadAccessories[i] == "1") {
                                document.getElementById("getOxygen").checked = true;
                            } else if (loadAccessories[i] == "2") {
                                document.getElementById("getWheel").checked = true;
                            } else if (loadAccessories[i] == "3") {
                                document.getElementById("getStair").checked = true;
                            } else if (loadAccessories[i] == "4") {
                                document.getElementById("getStretches").checked = true;
                            }
                        }



                        codeAddress();

                        $('.selectpicker').selectpicker('refresh');
                        alert('Job Loaded');
                    }

                }

            });


        }
        else {
            clearJobForms();
            alert('Job Number not Found');
        }


    });

}

function clearJobForms() {
    $('#jobid').val('');
    $('#date').val('');
    $('#toc').val('');
    $('#amount').val('');
    $('#caller').val('');
    $('#phone').val('');
    $('#address').val('');
    $('#unit').val('');
    $('#bed').val('');
    $('#patient').val('');
    $('#remarks').val('');
    $('#to-destination').val('');
    $('#reference').val('');
    $('#patientRemarks').val('');
    $('#origin').val('');
    $('#nursingFrom').val('');
    $('#destination').val('');
    $('#nursingTo').val('');
    $('#payment').val('');
    $('#trip').val('');
    
    
    $("input[name='accessories']:checkbox").prop('checked', false);

    var $inputs = $('input:checkbox');
    $inputs.prop('disabled', false); // <-- enable all checkboxes
    $("#availAmbulance tr").remove();


    $(".selectpicker").selectpicker('refresh');

}

function sendNewJobAlert() {

    var getJobNumber = $('#reference').val();
    var getCaller = $('#caller').val();
    var getPhone = $('#phone').val();

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
                getAddress = "CGH";
                break;
            case "1.3074,103.8200":
                getAddress = "Gleneagles Hospital";
                break;
            case "1.4238,103.8387":
                getAddress = "Khoo Teck Puat Hospital";
                break;
            case "1.3106,103.8469":
                getAddress = "KKH";
                break;
            case "1.3418,103.8379":
                getAddress = "Mount Alvernia Hospital";
                break;
            case "1.3054,103.8356":
                getAddress = "Mount Elizabeth Hospital";
                break;
            case "1.2944,103.7829":
                getAddress = "NUH";
                break;
            case "1.3349,103.7447":
                getAddress = "Ng Teng Fong & JCH";
                break;
            case "1.3151,103.9091":
                getAddress = "Parkway East Hospital";
                break;
            case "1.3011,103.8575":
                getAddress = "Raffles Hospital";
                break;
            case "1.2795,103.8348":
                getAddress = "SGH";
                break;
            case "1.3214,103.8459":
                getAddress = "TTSH";
                break;
            case "1.325707,103.841496":
                getAddress = "TMC";
                break;
            case "1.3825,103.8843":
                getAddress = "IMH";
                break;
                //Nursing
            case "452 Upper East Coast Rd, Singapore 466500":
                getAddress = "EMC(Upper East Coast Rd)";
                break;
            case "52 Biggin Hill Rd, Singapore 509945":
                getAddress = "OVNH(Changi)";
                break;
            case "148A Silat Avenue 168871":
                getAddress = "OVNH(Bukit Merah)";
                break;
            case "221 Clementi Ave 4 129881":
                getAddress = "OVNH(Clementi)";
                break;
            case "11 Woodland Avenue 1 739068":
                getAddress = "OVNH(Marsiling)";
                break;
            case "6 Simei Street 3 529898":
                getAddress = "OVNH(Simei)";
                break;
            case "461A Sims Avenue 387541":
                getAddress = "OVNH(Sims Avenue)";
                break;
            case "11 Tampines Street 44, Singapore 529123":
                getAddress = "All Saints Home(Tampines Street 44)";
                break;
            case "31 Joo Chiat Ln, Singapore 428101":
                getAddress = "Serene Nursing Home Pte Ltd(Joo Chiat Ln)";
                break;
            case "106 Braddell Rd, Singapore 359912":
                getAddress = "Nightingale(Braddell Rd)";
                break;
            case "134 Lor J Telok Kurau, Singapore 425962":
                getAddress = "Paean Nursing Home Pte Ltd(Lor J)";
                break;
            case "205 Jln Kayu, Singapore 799436":
                getAddress = "Ju Eng Home For Senior Citizens(Jln Kayu)";
                break;
            case "11 Jln Ampas, Singapore 329514":
                getAddress = "Irene Nursing Home Pte. Ltd(Jln Ampas)";
                break;
            case "20 Woodlands Street 82, Singapore 738507":
                getAddress = "The Man Fut Tong Nursing Home(Woodlands Street 82)";
                break;
            case "31 Bukit Batok Street 52, Singapore 650540":
                getAddress = "Ren Ci @ Bukit Batok St. 52(Bukit Batok)";
                break;
            case "9 Upper Changi Rd N, 507706":
                getAddress = "Peacehaven Nursing Home(Upper Changi Rd)";
                break;
            case "1 Thomson Ln, Singapore 297728":
                getAddress = "Lee Ah Mooi";
                break;
            case "130 West Coast Drive Singapore 127444":
                getAddress = "Jamiyah Nursing Home(West Coast Drive)";
                break;
            case "1 Tampines Ave 3, Singapore 529707":
                getAddress = "Jamiyah Home for the Aged(Tampines Ave)";
                break;
            case "9 Choa Chu Kang Ave 4, Singapore 689815":
                getAddress = "BMWS(CCK)";
                break;
            case "9 Mandai Estate, 729906":
                getAddress = "St. Joseph's Home(Mandai Estate)";
                break;
            case "12 Yishun Ave 5, Singapore 768990":
                getAddress = "Sree Narayana Mission(Yishun)";
                break;
            case "100 Punggol Field, 828811":
                getAddress = "BHEH(Punggol)";
                break;
            case "60 Buangkok View, 534191":
                getAddress = "St. Andrew's Nursing Home(Buangkok)";
                break;
            case "130 Hougang Ave 1, Singapore 538900":
                getAddress = "SFTAS(Hougang)";
                break;
            case "6 Lengkok Bahru, 159051":
                getAddress = "PHNH(Lengkok Bahru)";
                break;
            case "10 Pasir Ris Walk, 518240":
                getAddress = "Apex Harmony Lodge(Pasir Ris)";
                break;
            case "369 Pasir Panjang Rd, Singapore 118706":
                getAddress = "WCHPL(Pasir Panjang)";
                break;
            case "20 Sembawang Cres, Singapore 757092":
                getAddress = "Singapore Christian Home(SembawangCres)";
                break;
            case "19 Toh Drive, 507871":
                getAddress = "OLOLNHPL(Toh Drive)";
                break;
            case "1 Lor 23 Geylang, 388352":
                getAddress = "GAHFTE(Geylang)";
                break;
            case "156 Serangoon Garden Way, Singapore 556055":
                getAddress = "Ling Kwang Home(Serangoon)";
                break;
            case "2 Jln Ulu Siglap, Singapore 457121":
                getAddress = "LC Nursing Home(Jln Ulu Siglap)";
                break;
            case "50 Jln Tan Tock Seng, 308438":
                getAddress = "Ren Ci Nursing Home (moulmein)";
                break;
            case "159 Serangoon Garden Way, Singapore 556056":
                getAddress = "Cheshire Home(Serangoon)";
                break;
            case "21 Senja Rd, 677736":
                getAddress = "PHNHII(Senja Rd)";
                break;
            case "91 Yishun Central, 768829":
                getAddress = "Villa Francis Home(Yishun Central)";
                break;
            case "49 Upper Thomson Rd, 574325":
                getAddress = "St. Theresa's Home(Upper Thomson Rd)";
                break;
            case "69 Wan Tho Avenue, 347601":
                getAddress = "St John's Home(Wan Tho Avenue)";
                break;
            case "487 Bedok South Ave 2, Singapore 469316":
                getAddress = "LHFTE(Bedok South Ave)";
                break;
            case "451 Yio Chu Kang Rd, 805947":
                getAddress = "EMC&NH(Yio Chu Kang Rd)";
                break;
            case "25 Recreation Road, 546522":
                getAddress = "EMC(Recreation Road)";
                break;
            case "6 Bishan Street 13, Singapore 579798":
                getAddress = "BHFTID(Bishan)";
                break;
            case "9 Bishan Street 13, 579804":
                getAddress = "LHFTE(Bishan)";
                break;
            case "170 Lor 6 Toa Payoh, Singapore 319400":
                getAddress = "UMC(Toa Payoh)";
                break;
            case "72 Elizabeth Drive, 669745":
                getAddress = "UMC(Elizabeth Drive)";
                break;
            case "10 Buangkok View, 539747":
                getAddress = "EMC(Buangkok View)";
                break;
            case "5 Poh Huat Rd, Singapore 546703":
                getAddress = "All Saints Home(Hougang)";
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
                getAddress = "SA’s Community Hospital";
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
                getAddress = "AHFTE(Kim Beat Ave)";
                break;
            case "14 Buangkok Green 539755":
                getAddress = "Angsana Home @ Pelangi Village";
                break;
            case "12 Buangkok Green 539754":
                getAddress = "Banyan Home @ Pelangi Village";
                break;
            case "201 Jurong East Avenue 1 609791":
                getAddress = "BCTKH(Jurong East Ave)";
                break;
            case "6 Fourth Chin Bee Rd 619708":
                getAddress = "BTHFTA(Fourth Chin Bee)";
                break;
            case "11 Bukit Batok West Ave 2 659205":
                getAddress = "Bukit Batok HFTA";
                break;
            case "51 Marsiling Drive 739297":
                getAddress = "Christalite Methodist Home";
                break;
            case "53 Choa Chu Kang Road 689385":
                getAddress = "EMC(Choa Chu Kang)";
                break;
            case "351 Chai Chee Street 468982":
                getAddress = "EMC(Chai Chee Street)";
                break;
            case "58 Braddell Road 359905":
                getAddress = "EMC(Braddell)";
                break;
            case "255A Bukit Timah Road 259691":
                getAddress = "Good Shepherd Loft(Bukit Timah)";
                break;
            case "19 Compassvale Walk 544644":
                getAddress = "Grace Lodge";
                break;
            case "10 Buangkok Green 539753":
                getAddress = "Jenaris Home @ Pelangi Village";
                break;
            case "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681":
                getAddress = "KCL Tin Kee Home";
                break;
            case "6 Buangkok Green 539751":
                getAddress = "Meranti Home @ Pelangi Village";
                break;
            case "39 Sims Avenue 387412":
                getAddress = "Min Chong Comfort Home";
                break;
            case "7 Lorong Napiri 547533":
                getAddress = "Mindsville(Napiri)";
                break;
            case "1 Jalan Bilal, 468854":
                getAddress = "MH For The Aged Sick(Jalan Bilal)";
                break;
            case "301 Henderson Road 108931":
                getAddress = "Moral Welfare Home(Henderson Road)";
                break;
            case "50 Jurong West Street 93 648967":
                getAddress = "NTUC Health Nursing Home(Jurong West)";
                break;
            case "45 Sixth Avenue 276487":
                getAddress = "Soo's Nursing Home(Sixth Avenue)";
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
                getAddress = "TPOPH(Jalan Ampas)";
                break;
            case "10 Buangkok View 539747":
                getAddress = "TPSS(Buangkok View)";
                break;
            case "51 Lentor Avenue 786876":
                getAddress = "The Lentor Residence";
                break;
            case "115 Lorong G Telok Kurau 426317":
                getAddress = "TL Old Folks Home";
                break;
            case "91 Geylang East Avenue 2 389759":
                getAddress = "TT Homes(Geylang East Ave)";
                break;
            case "4 Buangkok Green 539750":
                getAddress = "Thuja Home(Pelangi Village)";
                break;
            case "55 Queensway 149058":
                getAddress = "UMC(Queensway)";
                break;
            case "2 Buangkok Green 539749":
                getAddress = "Tembusu Home(Pelangi Village)";
                break;
        }
    }
    else {
        getAddress = $('#address').val();;
    }

    var getDestination;
    var toDestination = $('#to-destination').val();
    var destination = $('#destination').val();
    var nursingTo = $('#nursingTo').val();
    var getFinalDestination;

    if (toDestination == "") {

        if (destination == "") {
            getFinalDestination = nursingTo;
        }
        else if (nursingTo == "") {
            getFinalDestination = destination;
        }

        switch (getFinalDestination) {
            case "Changi General Hospital (CGH)":
                getDestination = "CGH";
                break;
            case "Gleneagles Hospital":
                getDestination = "Gleneagles Hospital";
                break;
            case "Khoo Teck Puat Hospital":
                getDestination = "Khoo Teck Puat Hospital";
                break;
            case "KK Women's And Children's Hospital (KKH)":
                getDestination = "KKH";
                break;
            case "Mount Alvernia Hospital":
                getDestination = "Mount Alvernia Hospital";
                break;
            case "Mount Elizabeth Hospital":
                getDestination = "Mount Elizabeth Hospital";
                break;
            case "National University Hospital (NUH)":
                getDestination = "NUH";
                break;
            case "Ng Teng Fong General Hospital & Jurong Community Hospital":
                getDestination = "Ng Teng Fong & JCH";
                break;
            case "Parkway East Hospital (former East Shore Hospital)":
                getDestination = "Parkway East Hospital";
                break;
            case "Raffles Hospital":
                getDestination = "Raffles Hospital";
                break;
            case "Singapore General Hospital (SGH)":
                getDestination = "SGH";
                break;
            case "Tan Tock Seng Hospital (TTSH)":
                getDestination = "TTSH";
                break;
            case "Thomson Medical Centre (TMC)":
                getDestination = "TMC";
                break;
            case "Institute of Mental Health":
                getDestination = "IMH";
                break;
                //Nursing
            case "452 Upper East Coast Rd, Singapore 466500":
                getDestination = "EMC(Upper East Coast Rd)";
                break;
            case "52 Biggin Hill Rd, Singapore 509945":
                getDestination = "OVNH(Changi)";
                break;
            case "148A Silat Avenue 168871":
                getDestination = "OVNH(Bukit Merah)";
                break;
            case "221 Clementi Ave 4 129881":
                getDestination = "OVNH(Clementi)";
                break;
            case "11 Woodland Avenue 1 739068":
                getDestination = "OVNH(Marsiling)";
                break;
            case "6 Simei Street 3 529898":
                getDestination = "OVNH(Simei)";
                break;
            case "461A Sims Avenue 387541":
                getDestination = "OVNH(Sims Avenue)";
                break;
            case "11 Tampines Street 44, Singapore 529123":
                getDestination = "All Saints Home(Tampine Street 44)";
                break;
            case "31 Joo Chiat Ln, Singapore 428101":
                getDestination = "Serene Nursing Home Pte Ltd(Joo Chiat Ln)";
                break;
            case "106 Braddell Rd, Singapore 359912":
                getDestination = "Nightingale(Braddell Rd)";
                break;
            case "134 Lor J Telok Kurau, Singapore 425962":
                getDestination = "Paean Nursing Home Pte Ltd(Lor J)";
                break;
            case "205 Jln Kayu, Singapore 799436":
                getDestination = "Ju Eng Home For Senior Citizens(Jln Kayu)";
                break;
            case "11 Jln Ampas, Singapore 329514":
                getDestination = "Irene Nursing Home Pte. Ltd(Jln Ampas)";
                break;
            case "20 Woodlands Street 82, Singapore 738507":
                getDestination = "The Man Fut Tong Nursing Home(Woodlands Street 82)";
                break;
            case "31 Bukit Batok Street 52, Singapore 650540":
                getDestination = "Ren Ci @ Bukit Batok St. 52(Bukit Batok)";
                break;
            case "9 Upper Changi Rd N, 507706":
                getDestination = "Peacehaven Nursing Home(Upper Changi Rd)";
                break;
            case "1 Thomson Ln, Singapore 297728":
                getDestination = "Lee Ah Mooi";
                break;
            case "130 West Coast Drive Singapore 127444":
                getDestination = "Jamiyah Nursing Home(West Coast Drive)";
                break;
            case "1 Tampines Ave 3, Singapore 529707":
                getDestination = "Jamiyah Home for the Aged(Tampines Ave)";
                break;
            case "9 Choa Chu Kang Ave 4, Singapore 689815":
                getDestination = "BMWS(CCK)";
                break;
            case "9 Mandai Estate, 729906":
                getDestination = "St. Joseph's Home(Mandai Estate)";
                break;
            case "12 Yishun Ave 5, Singapore 768990":
                getDestination = "Sree Narayana Mission(Yishun)";
                break;
            case "100 Punggol Field, 828811":
                getDestination = "BHEH(Punggol)";
                break;
            case "60 Buangkok View, 534191":
                getDestination = "St. Andrew's Nursing Home(Buangkok)";
                break;
            case "130 Hougang Ave 1, Singapore 538900":
                getDestination = "SFTAS(Hougang)";
                break;
            case "6 Lengkok Bahru, 159051":
                getDestination = "PHNH(Lengkok Bahru)";
                break;
            case "10 Pasir Ris Walk, 518240":
                getDestination = "Apex Harmony Lodge(Pasir Ris)";
                break;
            case "369 Pasir Panjang Rd, Singapore 118706":
                getDestination = "WCHPL(Pasir Panjang)";
                break;
            case "20 Sembawang Cres, Singapore 757092":
                getDestination = "Singapore Christian Home(SembawangCres)";
                break;
            case "19 Toh Drive, 507871":
                getDestination = "OLOLNHPL(Toh Drive)";
                break;
            case "1 Lor 23 Geylang, 388352":
                getDestination = "GAHFTE(Geylang)";
                break;
            case "156 Serangoon Garden Way, Singapore 556055":
                getDestination = "Ling Kwang Home(Serangoon)";
                break;
            case "2 Jln Ulu Siglap, Singapore 457121":
                getDestination = "LC Nursing Home(Jln Ulu Siglap)";
                break;
            case "50 Jln Tan Tock Seng, 308438":
                getDestination = "Ren Ci Nursing Home (moulmein)";
                break;
            case "159 Serangoon Garden Way, Singapore 556056":
                getDestination = "Cheshire Home(Serangoon)";
                break;
            case "21 Senja Rd, 677736":
                getDestination = "PHNHII(Senja Rd)";
                break;
            case "91 Yishun Central, 768829":
                getDestination = "Villa Francis Home(Yishun Central)";
                break;
            case "49 Upper Thomson Rd, 574325":
                getDestination = "St. Theresa's Home(Upper Thomson Rd)";
                break;
            case "69 Wan Tho Avenue, 347601":
                getDestination = "St John's Home(Wan Tho Avenue)";
                break;
            case "487 Bedok South Ave 2, Singapore 469316":
                getDestination = "LHFTE(Bedok South Ave)";
                break;
            case "451 Yio Chu Kang Rd, 805947":
                getDestination = "EMC&NH(Yio Chu Kang Rd)";
                break;
            case "25 Recreation Road, 546522":
                getDestination = "EMC(Recreation Road)";
                break;
            case "6 Bishan Street 13, Singapore 579798":
                getDestination = "BHFTID(Bishan)";
                break;
            case "9 Bishan Street 13, 579804":
                getDestination = "LHFTE(Bishan)";
                break;
            case "170 Lor 6 Toa Payoh, Singapore 319400":
                getDestination = "UMC(Toa Payoh)";
                break;
            case "72 Elizabeth Drive, 669745":
                getDestination = "UMC(Elizabeth Drive)";
                break;
            case "10 Buangkok View, 539747":
                getDestination = "EMC(Buangkok View)";
                break;
            case "5 Poh Huat Rd, Singapore 546703":
                getDestination = "All Saints Home(Hougang)";
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
                getDestination = "SA’s Community Hospital";
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
                getDestination = "AHFTE(Kim Beat Ave)";
                break;
            case "14 Buangkok Green 539755":
                getDestination = "Angsana Home @ Pelangi Village";
                break;
            case "12 Buangkok Green 539754":
                getDestination = "Banyan Home @ Pelangi Village";
                break;
            case "201 Jurong East Avenue 1 609791":
                getDestination = "BCTKH(Jurong East Ave)";
                break;
            case "6 Fourth Chin Bee Rd 619708":
                getDestination = "BTHFTA(Fourth Chin Bee)";
                break;
            case "11 Bukit Batok West Ave 2 659205":
                getDestination = "Bukit Batok HFTA";
                break;
            case "51 Marsiling Drive 739297":
                getDestination = "Christalite Methodist Home";
                break;
            case "53 Choa Chu Kang Road 689385":
                getDestination = "EMC(Choa Chu Kang)";
                break;
            case "351 Chai Chee Street 468982":
                getDestination = "EMC(Chai Chee Street)";
                break;
            case "58 Braddell Road 359905":
                getDestination = "EMC(Braddell)";
                break;
            case "255A Bukit Timah Road 259691":
                getDestination = "Good Shepherd Loft(Bukit Timah)";
                break;
            case "19 Compassvale Walk 544644":
                getDestination = "Grace Lodge";
                break;
            case "10 Buangkok Green 539753":
                getDestination = "Jenaris Home @ Pelangi Village";
                break;
            case "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681":
                getDestination = "KCL Tin Kee Home";
                break;
            case "6 Buangkok Green 539751":
                getDestination = "Meranti Home @ Pelangi Village";
                break;
            case "39 Sims Avenue 387412":
                getDestination = "Min Chong Comfort Home";
                break;
            case "7 Lorong Napiri 547533":
                getDestination = "Mindsville(Napiri)";
                break;
            case "1 Jalan Bilal, 468854":
                getDestination = "MH For The Aged Sick(Jalan Bilal)";
                break;
            case "301 Henderson Road 108931":
                getDestination = "Moral Welfare Home(Henderson Road)";
                break;
            case "50 Jurong West Street 93 648967":
                getDestination = "NTUC Health Nursing Home(Jurong West)";
                break;
            case "45 Sixth Avenue 276487":
                getDestination = "Soo's Nursing Home(Sixth Avenue)";
                break;
            case "263 Waterloo Street #05-01 180263":
                getDestination = "St Vincent Home";
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
                getDestination = "TPOPH(Jalan Ampas)";
                break;
            case "10 Buangkok View 539747":
                getDestination = "TPSS(Buangkok View)";
                break;
            case "51 Lentor Avenue 786876":
                getDestination = "The Lentor Residence";
                break;
            case "115 Lorong G Telok Kurau 426317":
                getDestination = "TL Old Folks Home";
                break;
            case "91 Geylang East Avenue 2 389759":
                getDestination = "TT Homes(Geylang East Ave)";
                break;
            case "4 Buangkok Green 539750":
                getDestination = "Thuja Home(Pelangi Village)";
                break;
            case "55 Queensway 149058":
                getDestination = "UMC(Queensway)";
                break;
            case "2 Buangkok Green 539749":
                getDestination = "Tembusu Home(Pelangi Village)";
        }
    }
    else {
        getDestination = $('#to-destination').val();
    }

    var getDate = $('#date').val();

    var smsAlertDriver = {
        Sender: "Advance Dispatch System",
        Recipients: sessionStorage.getItem('setSessionstorageValueDriverPhone'),
        Message: "New (From: " + getAddress + "\r\n" + "To: " + getDestination + " " + "Pickup: " + getDate + ")",
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
        AssetID: sessionStorage.getItem('setSessionstorageValueAvailableAmbulance'),
        JobNumber: sessionStorage.getItem('setSessionstorageValueJobNumber'),
        Notified: 1
    };


    $.ajax({
        url: "http://track.asiacom.co.th/adswebapi/api/messageinfo",
        type: "POST",
        data: JSON.stringify(smsAlertDriver),
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
        success: function (smsAlertDriver) {
            console.log(smsAlertDriver);
        }
    });

}

function sendNewJobAlertTwoWay() {

    var getJobNumber = $('#reference').val();
    var getCaller = $('#caller').val();
    var getPhone = $('#phone').val();

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
                getAddress = "CGH";
                break;
            case "1.3074,103.8200":
                getAddress = "Gleneagles Hospital";
                break;
            case "1.4238,103.8387":
                getAddress = "Khoo Teck Puat Hospital";
                break;
            case "1.3106,103.8469":
                getAddress = "KKH";
                break;
            case "1.3418,103.8379":
                getAddress = "Mount Alvernia Hospital";
                break;
            case "1.3054,103.8356":
                getAddress = "Mount Elizabeth Hospital";
                break;
            case "1.2944,103.7829":
                getAddress = "NUH";
                break;
            case "1.3349,103.7447":
                getAddress = "Ng Teng Fong & JCH";
                break;
            case "1.3151,103.9091":
                getAddress = "Parkway East Hospital";
                break;
            case "1.3011,103.8575":
                getAddress = "Raffles Hospital";
                break;
            case "1.2795,103.8348":
                getAddress = "SGH";
                break;
            case "1.3214,103.8459":
                getAddress = "TTSH";
                break;
            case "1.325707,103.841496":
                getAddress = "TMC";
                break;
            case "1.3825,103.8843":
                getAddress = "IMH";
                break;
                //Nursing
            case "452 Upper East Coast Rd, Singapore 466500":
                getAddress = "EMC(Upper East Coast Rd)";
                break;
            case "52 Biggin Hill Rd, Singapore 509945":
                getAddress = "OVNH(Changi)";
                break;
            case "148A Silat Avenue 168871":
                getAddress = "OVNH(Bukit Merah)";
                break;
            case "221 Clementi Ave 4 129881":
                getAddress = "OVNH(Clementi)";
                break;
            case "11 Woodland Avenue 1 739068":
                getAddress = "OVNH(Marsiling)";
                break;
            case "6 Simei Street 3 529898":
                getAddress = "OVNH(Simei)";
                break;
            case "461A Sims Avenue 387541":
                getAddress = "OVNH(Sims Avenue)";
                break;
            case "11 Tampines Street 44, Singapore 529123":
                getAddress = "All Saints Home(Tampines Street 44)";
                break;
            case "31 Joo Chiat Ln, Singapore 428101":
                getAddress = "Serene Nursing Home Pte Ltd(Joo Chiat Ln)";
                break;
            case "106 Braddell Rd, Singapore 359912":
                getAddress = "Nightingale(Braddell Rd)";
                break;
            case "134 Lor J Telok Kurau, Singapore 425962":
                getAddress = "Paean Nursing Home Pte Ltd(Lor J)";
                break;
            case "205 Jln Kayu, Singapore 799436":
                getAddress = "Ju Eng Home For Senior Citizens(Jln Kayu)";
                break;
            case "11 Jln Ampas, Singapore 329514":
                getAddress = "Irene Nursing Home Pte. Ltd(Jln Ampas)";
                break;
            case "20 Woodlands Street 82, Singapore 738507":
                getAddress = "The Man Fut Tong Nursing Home(Woodlands Street 82)";
                break;
            case "31 Bukit Batok Street 52, Singapore 650540":
                getAddress = "Ren Ci @ Bukit Batok St. 52(Bukit Batok)";
                break;
            case "9 Upper Changi Rd N, 507706":
                getAddress = "Peacehaven Nursing Home(Upper Changi Rd)";
                break;
            case "1 Thomson Ln, Singapore 297728":
                getAddress = "Lee Ah Mooi";
                break;
            case "130 West Coast Drive Singapore 127444":
                getAddress = "Jamiyah Nursing Home(West Coast Drive)";
                break;
            case "1 Tampines Ave 3, Singapore 529707":
                getAddress = "Jamiyah Home for the Aged(Tampines Ave)";
                break;
            case "9 Choa Chu Kang Ave 4, Singapore 689815":
                getAddress = "BMWS(CCK)";
                break;
            case "9 Mandai Estate, 729906":
                getAddress = "St. Joseph's Home(Mandai Estate)";
                break;
            case "12 Yishun Ave 5, Singapore 768990":
                getAddress = "Sree Narayana Mission(Yishun)";
                break;
            case "100 Punggol Field, 828811":
                getAddress = "BHEH(Punggol)";
                break;
            case "60 Buangkok View, 534191":
                getAddress = "St. Andrew's Nursing Home(Buangkok)";
                break;
            case "130 Hougang Ave 1, Singapore 538900":
                getAddress = "SFTAS(Hougang)";
                break;
            case "6 Lengkok Bahru, 159051":
                getAddress = "PHNH(Lengkok Bahru)";
                break;
            case "10 Pasir Ris Walk, 518240":
                getAddress = "Apex Harmony Lodge(Pasir Ris)";
                break;
            case "369 Pasir Panjang Rd, Singapore 118706":
                getAddress = "WCHPL(Pasir Panjang)";
                break;
            case "20 Sembawang Cres, Singapore 757092":
                getAddress = "Singapore Christian Home(SembawangCres)";
                break;
            case "19 Toh Drive, 507871":
                getAddress = "OLOLNHPL(Toh Drive)";
                break;
            case "1 Lor 23 Geylang, 388352":
                getAddress = "GAHFTE(Geylang)";
                break;
            case "156 Serangoon Garden Way, Singapore 556055":
                getAddress = "Ling Kwang Home(Serangoon)";
                break;
            case "2 Jln Ulu Siglap, Singapore 457121":
                getAddress = "LC Nursing Home(Jln Ulu Siglap)";
                break;
            case "50 Jln Tan Tock Seng, 308438":
                getAddress = "Ren Ci Nursing Home (moulmein)";
                break;
            case "159 Serangoon Garden Way, Singapore 556056":
                getAddress = "Cheshire Home(Serangoon)";
                break;
            case "21 Senja Rd, 677736":
                getAddress = "PHNHII(Senja Rd)";
                break;
            case "91 Yishun Central, 768829":
                getAddress = "Villa Francis Home(Yishun Central)";
                break;
            case "49 Upper Thomson Rd, 574325":
                getAddress = "St. Theresa's Home(Upper Thomson Rd)";
                break;
            case "69 Wan Tho Avenue, 347601":
                getAddress = "St John's Home(Wan Tho Avenue)";
                break;
            case "487 Bedok South Ave 2, Singapore 469316":
                getAddress = "LHFTE(Bedok South Ave)";
                break;
            case "451 Yio Chu Kang Rd, 805947":
                getAddress = "EMC&NH(Yio Chu Kang Rd)";
                break;
            case "25 Recreation Road, 546522":
                getAddress = "EMC(Recreation Road)";
                break;
            case "6 Bishan Street 13, Singapore 579798":
                getAddress = "BHFTID(Bishan)";
                break;
            case "9 Bishan Street 13, 579804":
                getAddress = "LHFTE(Bishan)";
                break;
            case "170 Lor 6 Toa Payoh, Singapore 319400":
                getAddress = "UMC(Toa Payoh)";
                break;
            case "72 Elizabeth Drive, 669745":
                getAddress = "UMC(Elizabeth Drive)";
                break;
            case "10 Buangkok View, 539747":
                getAddress = "EMC(Buangkok View)";
                break;
            case "5 Poh Huat Rd, Singapore 546703":
                getAddress = "All Saints Home(Hougang)";
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
                getAddress = "SA’s Community Hospital";
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
                getAddress = "AHFTE(Kim Beat Ave)";
                break;
            case "14 Buangkok Green 539755":
                getAddress = "Angsana Home @ Pelangi Village";
                break;
            case "12 Buangkok Green 539754":
                getAddress = "Banyan Home @ Pelangi Village";
                break;
            case "201 Jurong East Avenue 1 609791":
                getAddress = "BCTKH(Jurong East Ave)";
                break;
            case "6 Fourth Chin Bee Rd 619708":
                getAddress = "BTHFTA(Fourth Chin Bee)";
                break;
            case "11 Bukit Batok West Ave 2 659205":
                getAddress = "Bukit Batok HFTA";
                break;
            case "51 Marsiling Drive 739297":
                getAddress = "Christalite Methodist Home";
                break;
            case "53 Choa Chu Kang Road 689385":
                getAddress = "EMC(Choa Chu Kang)";
                break;
            case "351 Chai Chee Street 468982":
                getAddress = "EMC(Chai Chee Street)";
                break;
            case "58 Braddell Road 359905":
                getAddress = "EMC(Braddell)";
                break;
            case "255A Bukit Timah Road 259691":
                getAddress = "Good Shepherd Loft(Bukit Timah)";
                break;
            case "19 Compassvale Walk 544644":
                getAddress = "Grace Lodge";
                break;
            case "10 Buangkok Green 539753":
                getAddress = "Jenaris Home @ Pelangi Village";
                break;
            case "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681":
                getAddress = "KCL Tin Kee Home";
                break;
            case "6 Buangkok Green 539751":
                getAddress = "Meranti Home @ Pelangi Village";
                break;
            case "39 Sims Avenue 387412":
                getAddress = "Min Chong Comfort Home";
                break;
            case "7 Lorong Napiri 547533":
                getAddress = "Mindsville(Napiri)";
                break;
            case "1 Jalan Bilal, 468854":
                getAddress = "MH For The Aged Sick(Jalan Bilal)";
                break;
            case "301 Henderson Road 108931":
                getAddress = "Moral Welfare Home(Henderson Road)";
                break;
            case "50 Jurong West Street 93 648967":
                getAddress = "NTUC Health Nursing Home(Jurong West)";
                break;
            case "45 Sixth Avenue 276487":
                getAddress = "Soo's Nursing Home(Sixth Avenue)";
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
                getAddress = "TPOPH(Jalan Ampas)";
                break;
            case "10 Buangkok View 539747":
                getAddress = "TPSS(Buangkok View)";
                break;
            case "51 Lentor Avenue 786876":
                getAddress = "The Lentor Residence";
                break;
            case "115 Lorong G Telok Kurau 426317":
                getAddress = "TL Old Folks Home";
                break;
            case "91 Geylang East Avenue 2 389759":
                getAddress = "TT Homes(Geylang East Ave)";
                break;
            case "4 Buangkok Green 539750":
                getAddress = "Thuja Home(Pelangi Village)";
                break;
            case "55 Queensway 149058":
                getAddress = "UMC(Queensway)";
                break;
            case "2 Buangkok Green 539749":
                getAddress = "Tembusu Home(Pelangi Village)";
                break;
        }
    }
    else {
        getAddress = $('#address').val();;
    }

    var getDestination;
    var toDestination = $('#to-destination').val();
    var destination = $('#destination').val();
    var nursingTo = $('#nursingTo').val();
    var getFinalDestination;

    if (toDestination == "") {

        if (destination == "") {
            getFinalDestination = nursingTo;
        }
        else if (nursingTo == "") {
            getFinalDestination = destination;
        }

        switch (getFinalDestination) {
            case "Changi General Hospital (CGH)":
                getDestination = "CGH";
                break;
            case "Gleneagles Hospital":
                getDestination = "Gleneagles Hospital";
                break;
            case "Khoo Teck Puat Hospital":
                getDestination = "Khoo Teck Puat Hospital";
                break;
            case "KK Women's And Children's Hospital (KKH)":
                getDestination = "KKH";
                break;
            case "Mount Alvernia Hospital":
                getDestination = "Mount Alvernia Hospital";
                break;
            case "Mount Elizabeth Hospital":
                getDestination = "Mount Elizabeth Hospital";
                break;
            case "National University Hospital (NUH)":
                getDestination = "NUH";
                break;
            case "Ng Teng Fong General Hospital & Jurong Community Hospital":
                getDestination = "Ng Teng Fong & JCH";
                break;
            case "Parkway East Hospital (former East Shore Hospital)":
                getDestination = "Parkway East Hospital";
                break;
            case "Raffles Hospital":
                getDestination = "Raffles Hospital";
                break;
            case "Singapore General Hospital (SGH)":
                getDestination = "SGH";
                break;
            case "Tan Tock Seng Hospital (TTSH)":
                getDestination = "TTSH";
                break;
            case "Thomson Medical Centre (TMC)":
                getDestination = "TMC";
                break;
            case "Institute of Mental Health":
                getDestination = "IMH";
                break;
                //Nursing
            case "452 Upper East Coast Rd, Singapore 466500":
                getDestination = "EMC(Upper East Coast Rd)";
                break;
            case "52 Biggin Hill Rd, Singapore 509945":
                getDestination = "OVNH(Changi)";
                break;
            case "148A Silat Avenue 168871":
                getDestination = "OVNH(Bukit Merah)";
                break;
            case "221 Clementi Ave 4 129881":
                getDestination = "OVNH(Clementi)";
                break;
            case "11 Woodland Avenue 1 739068":
                getDestination = "OVNH(Marsiling)";
                break;
            case "6 Simei Street 3 529898":
                getDestination = "OVNH(Simei)";
                break;
            case "461A Sims Avenue 387541":
                getDestination = "OVNH(Sims Avenue)";
                break;
            case "11 Tampines Street 44, Singapore 529123":
                getDestination = "All Saints Home(Tampine Street 44)";
                break;
            case "31 Joo Chiat Ln, Singapore 428101":
                getDestination = "Serene Nursing Home Pte Ltd(Joo Chiat Ln)";
                break;
            case "106 Braddell Rd, Singapore 359912":
                getDestination = "Nightingale(Braddell Rd)";
                break;
            case "134 Lor J Telok Kurau, Singapore 425962":
                getDestination = "Paean Nursing Home Pte Ltd(Lor J)";
                break;
            case "205 Jln Kayu, Singapore 799436":
                getDestination = "Ju Eng Home For Senior Citizens(Jln Kayu)";
                break;
            case "11 Jln Ampas, Singapore 329514":
                getDestination = "Irene Nursing Home Pte. Ltd(Jln Ampas)";
                break;
            case "20 Woodlands Street 82, Singapore 738507":
                getDestination = "The Man Fut Tong Nursing Home(Woodlands Street 82)";
                break;
            case "31 Bukit Batok Street 52, Singapore 650540":
                getDestination = "Ren Ci @ Bukit Batok St. 52(Bukit Batok)";
                break;
            case "9 Upper Changi Rd N, 507706":
                getDestination = "Peacehaven Nursing Home(Upper Changi Rd)";
                break;
            case "1 Thomson Ln, Singapore 297728":
                getDestination = "Lee Ah Mooi";
                break;
            case "130 West Coast Drive Singapore 127444":
                getDestination = "Jamiyah Nursing Home(West Coast Drive)";
                break;
            case "1 Tampines Ave 3, Singapore 529707":
                getDestination = "Jamiyah Home for the Aged(Tampines Ave)";
                break;
            case "9 Choa Chu Kang Ave 4, Singapore 689815":
                getDestination = "BMWS(CCK)";
                break;
            case "9 Mandai Estate, 729906":
                getDestination = "St. Joseph's Home(Mandai Estate)";
                break;
            case "12 Yishun Ave 5, Singapore 768990":
                getDestination = "Sree Narayana Mission(Yishun)";
                break;
            case "100 Punggol Field, 828811":
                getDestination = "BHEH(Punggol)";
                break;
            case "60 Buangkok View, 534191":
                getDestination = "St. Andrew's Nursing Home(Buangkok)";
                break;
            case "130 Hougang Ave 1, Singapore 538900":
                getDestination = "SFTAS(Hougang)";
                break;
            case "6 Lengkok Bahru, 159051":
                getDestination = "PHNH(Lengkok Bahru)";
                break;
            case "10 Pasir Ris Walk, 518240":
                getDestination = "Apex Harmony Lodge(Pasir Ris)";
                break;
            case "369 Pasir Panjang Rd, Singapore 118706":
                getDestination = "WCHPL(Pasir Panjang)";
                break;
            case "20 Sembawang Cres, Singapore 757092":
                getDestination = "Singapore Christian Home(SembawangCres)";
                break;
            case "19 Toh Drive, 507871":
                getDestination = "OLOLNHPL(Toh Drive)";
                break;
            case "1 Lor 23 Geylang, 388352":
                getDestination = "GAHFTE(Geylang)";
                break;
            case "156 Serangoon Garden Way, Singapore 556055":
                getDestination = "Ling Kwang Home(Serangoon)";
                break;
            case "2 Jln Ulu Siglap, Singapore 457121":
                getDestination = "LC Nursing Home(Jln Ulu Siglap)";
                break;
            case "50 Jln Tan Tock Seng, 308438":
                getDestination = "Ren Ci Nursing Home (moulmein)";
                break;
            case "159 Serangoon Garden Way, Singapore 556056":
                getDestination = "Cheshire Home(Serangoon)";
                break;
            case "21 Senja Rd, 677736":
                getDestination = "PHNHII(Senja Rd)";
                break;
            case "91 Yishun Central, 768829":
                getDestination = "Villa Francis Home(Yishun Central)";
                break;
            case "49 Upper Thomson Rd, 574325":
                getDestination = "St. Theresa's Home(Upper Thomson Rd)";
                break;
            case "69 Wan Tho Avenue, 347601":
                getDestination = "St John's Home(Wan Tho Avenue)";
                break;
            case "487 Bedok South Ave 2, Singapore 469316":
                getDestination = "LHFTE(Bedok South Ave)";
                break;
            case "451 Yio Chu Kang Rd, 805947":
                getDestination = "EMC&NH(Yio Chu Kang Rd)";
                break;
            case "25 Recreation Road, 546522":
                getDestination = "EMC(Recreation Road)";
                break;
            case "6 Bishan Street 13, Singapore 579798":
                getDestination = "BHFTID(Bishan)";
                break;
            case "9 Bishan Street 13, 579804":
                getDestination = "LHFTE(Bishan)";
                break;
            case "170 Lor 6 Toa Payoh, Singapore 319400":
                getDestination = "UMC(Toa Payoh)";
                break;
            case "72 Elizabeth Drive, 669745":
                getDestination = "UMC(Elizabeth Drive)";
                break;
            case "10 Buangkok View, 539747":
                getDestination = "EMC(Buangkok View)";
                break;
            case "5 Poh Huat Rd, Singapore 546703":
                getDestination = "All Saints Home(Hougang)";
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
                getDestination = "SA’s Community Hospital";
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
                getDestination = "AHFTE(Kim Beat Ave)";
                break;
            case "14 Buangkok Green 539755":
                getDestination = "Angsana Home @ Pelangi Village";
                break;
            case "12 Buangkok Green 539754":
                getDestination = "Banyan Home @ Pelangi Village";
                break;
            case "201 Jurong East Avenue 1 609791":
                getDestination = "BCTKH(Jurong East Ave)";
                break;
            case "6 Fourth Chin Bee Rd 619708":
                getDestination = "BTHFTA(Fourth Chin Bee)";
                break;
            case "11 Bukit Batok West Ave 2 659205":
                getDestination = "Bukit Batok HFTA";
                break;
            case "51 Marsiling Drive 739297":
                getDestination = "Christalite Methodist Home";
                break;
            case "53 Choa Chu Kang Road 689385":
                getDestination = "EMC(Choa Chu Kang)";
                break;
            case "351 Chai Chee Street 468982":
                getDestination = "EMC(Chai Chee Street)";
                break;
            case "58 Braddell Road 359905":
                getDestination = "EMC(Braddell)";
                break;
            case "255A Bukit Timah Road 259691":
                getDestination = "Good Shepherd Loft(Bukit Timah)";
                break;
            case "19 Compassvale Walk 544644":
                getDestination = "Grace Lodge";
                break;
            case "10 Buangkok Green 539753":
                getDestination = "Jenaris Home @ Pelangi Village";
                break;
            case "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681":
                getDestination = "KCL Tin Kee Home";
                break;
            case "6 Buangkok Green 539751":
                getDestination = "Meranti Home @ Pelangi Village";
                break;
            case "39 Sims Avenue 387412":
                getDestination = "Min Chong Comfort Home";
                break;
            case "7 Lorong Napiri 547533":
                getDestination = "Mindsville(Napiri)";
                break;
            case "1 Jalan Bilal, 468854":
                getDestination = "MH For The Aged Sick(Jalan Bilal)";
                break;
            case "301 Henderson Road 108931":
                getDestination = "Moral Welfare Home(Henderson Road)";
                break;
            case "50 Jurong West Street 93 648967":
                getDestination = "NTUC Health Nursing Home(Jurong West)";
                break;
            case "45 Sixth Avenue 276487":
                getDestination = "Soo's Nursing Home(Sixth Avenue)";
                break;
            case "263 Waterloo Street #05-01 180263":
                getDestination = "St Vincent Home";
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
                getDestination = "TPOPH(Jalan Ampas)";
                break;
            case "10 Buangkok View 539747":
                getDestination = "TPSS(Buangkok View)";
                break;
            case "51 Lentor Avenue 786876":
                getDestination = "The Lentor Residence";
                break;
            case "115 Lorong G Telok Kurau 426317":
                getDestination = "TL Old Folks Home";
                break;
            case "91 Geylang East Avenue 2 389759":
                getDestination = "TT Homes(Geylang East Ave)";
                break;
            case "4 Buangkok Green 539750":
                getDestination = "Thuja Home(Pelangi Village)";
                break;
            case "55 Queensway 149058":
                getDestination = "UMC(Queensway)";
                break;
            case "2 Buangkok Green 539749":
                getDestination = "Tembusu Home(Pelangi Village)";
        }
    }
    else {
        getDestination = $('#to-destination').val();
    }

    var getDate = $('#date').val();

    var smsAlertDriver = {
        Sender: "Advance Dispatch System",
        Recipients: sessionStorage.getItem('setSessionstorageValueDriverPhone'),
        Message: "RTN (From: " + getDestination + "\r\n" + "To: " + getAddress + " " + "Pickup: " + getDate + ")",
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
        AssetID: sessionStorage.getItem('setSessionstorageValueAvailableAmbulance'),
        JobNumber: sessionStorage.getItem('setSessionstorageValueJobNumber'),
        Notified: 1
    };


    $.ajax({
        url: "http://track.asiacom.co.th/adswebapi/api/messageinfo",
        type: "POST",
        data: JSON.stringify(smsAlertDriver),
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
        success: function (smsAlertDriver) {
            console.log(smsAlertDriver);
        }
    });

}

function sendCancelAlert() {

    var getJobNumber = $('#reference').val();
    var getCaller = $('#caller').val();
    var getPhone = $('#phone').val();

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
                getAddress = "CGH";
                break;
            case "1.3074,103.8200":
                getAddress = "Gleneagles Hospital";
                break;
            case "1.4238,103.8387":
                getAddress = "Khoo Teck Puat Hospital";
                break;
            case "1.3106,103.8469":
                getAddress = "KKH";
                break;
            case "1.3418,103.8379":
                getAddress = "Mount Alvernia Hospital";
                break;
            case "1.3054,103.8356":
                getAddress = "Mount Elizabeth Hospital";
                break;
            case "1.2944,103.7829":
                getAddress = "NUH";
                break;
            case "1.3349,103.7447":
                getAddress = "Ng Teng Fong & JCH";
                break;
            case "1.3151,103.9091":
                getAddress = "Parkway East Hospital";
                break;
            case "1.3011,103.8575":
                getAddress = "Raffles Hospital";
                break;
            case "1.2795,103.8348":
                getAddress = "SGH";
                break;
            case "1.3214,103.8459":
                getAddress = "TTSH";
                break;
            case "1.325707,103.841496":
                getAddress = "TMC";
                break;
            case "1.3825,103.8843":
                getAddress = "IMH";
                break;
                //Nursing
            case "452 Upper East Coast Rd, Singapore 466500":
                getAddress = "EMC(Upper East Coast Rd)";
                break;
            case "52 Biggin Hill Rd, Singapore 509945":
                getAddress = "OVNH(Changi)";
                break;
            case "148A Silat Avenue 168871":
                getAddress = "OVNH(Bukit Merah)";
                break;
            case "221 Clementi Ave 4 129881":
                getAddress = "OVNH(Clementi)";
                break;
            case "11 Woodland Avenue 1 739068":
                getAddress = "OVNH(Marsiling)";
                break;
            case "6 Simei Street 3 529898":
                getAddress = "OVNH(Simei)";
                break;
            case "461A Sims Avenue 387541":
                getAddress = "OVNH(Sims Avenue)";
                break;
            case "11 Tampines Street 44, Singapore 529123":
                getAddress = "All Saints Home(Tampine Street 44)";
                break;
            case "31 Joo Chiat Ln, Singapore 428101":
                getAddress = "Serene Nursing Home Pte Ltd(Joo Chiat Ln)";
                break;
            case "106 Braddell Rd, Singapore 359912":
                getAddress = "Nightingale(Braddell Rd)";
                break;
            case "134 Lor J Telok Kurau, Singapore 425962":
                getAddress = "Paean Nursing Home Pte Ltd(Lor J)";
                break;
            case "205 Jln Kayu, Singapore 799436":
                getAddress = "Ju Eng Home For Senior Citizens(Jln Kayu)";
                break;
            case "11 Jln Ampas, Singapore 329514":
                getAddress = "Irene Nursing Home Pte. Ltd(Jln Ampas)";
                break;
            case "20 Woodlands Street 82, Singapore 738507":
                getAddress = "The Man Fut Tong Nursing Home(Woodlands Street 82)";
                break;
            case "31 Bukit Batok Street 52, Singapore 650540":
                getAddress = "Ren Ci @ Bukit Batok St. 52(Bukit Batok)";
                break;
            case "9 Upper Changi Rd N, 507706":
                getAddress = "Peacehaven Nursing Home(Upper Changi Rd)";
                break;
            case "1 Thomson Ln, Singapore 297728":
                getAddress = "Lee Ah Mooi";
                break;
            case "130 West Coast Drive Singapore 127444":
                getAddress = "Jamiyah Nursing Home(West Coast Drive)";
                break;
            case "1 Tampines Ave 3, Singapore 529707":
                getAddress = "Jamiyah Home for the Aged(Tampines Ave)";
                break;
            case "9 Choa Chu Kang Ave 4, Singapore 689815":
                getAddress = "BMWS(CCK)";
                break;
            case "9 Mandai Estate, 729906":
                getAddress = "St. Joseph's Home(Mandai Estate)";
                break;
            case "12 Yishun Ave 5, Singapore 768990":
                getAddress = "Sree Narayana Mission(Yishun)";
                break;
            case "100 Punggol Field, 828811":
                getAddress = "BHEH(Punggol)";
                break;
            case "60 Buangkok View, 534191":
                getAddress = "St. Andrew's Nursing Home(Buangkok)";
                break;
            case "130 Hougang Ave 1, Singapore 538900":
                getAddress = "SFTAS(Hougang)";
                break;
            case "6 Lengkok Bahru, 159051":
                getAddress = "PHNH(Lengkok Bahru)";
                break;
            case "10 Pasir Ris Walk, 518240":
                getAddress = "Apex Harmony Lodge(Pasir Ris)";
                break;
            case "369 Pasir Panjang Rd, Singapore 118706":
                getAddress = "WCHPL(Pasir Panjang)";
                break;
            case "20 Sembawang Cres, Singapore 757092":
                getAddress = "Singapore Christian Home(SembawangCres)";
                break;
            case "19 Toh Drive, 507871":
                getAddress = "OLOLNHPL(Toh Drive)";
                break;
            case "1 Lor 23 Geylang, 388352":
                getAddress = "GAHFTE(Geylang)";
                break;
            case "156 Serangoon Garden Way, Singapore 556055":
                getAddress = "Ling Kwang Home(Serangoon)";
                break;
            case "2 Jln Ulu Siglap, Singapore 457121":
                getAddress = "LC Nursing Home(Jln Ulu Siglap)";
                break;
            case "50 Jln Tan Tock Seng, 308438":
                getAddress = "Ren Ci Nursing Home (moulmein)";
                break;
            case "159 Serangoon Garden Way, Singapore 556056":
                getAddress = "Cheshire Home(Serangoon)";
                break;
            case "21 Senja Rd, 677736":
                getAddress = "PHNHII(Senja Rd)";
                break;
            case "91 Yishun Central, 768829":
                getAddress = "Villa Francis Home(Yishun Central)";
                break;
            case "49 Upper Thomson Rd, 574325":
                getAddress = "St. Theresa's Home(Upper Thomson Rd)";
                break;
            case "69 Wan Tho Avenue, 347601":
                getAddress = "St John's Home(Wan Tho Avenue)";
                break;
            case "487 Bedok South Ave 2, Singapore 469316":
                getAddress = "LHFTE(Bedok South Ave)";
                break;
            case "451 Yio Chu Kang Rd, 805947":
                getAddress = "EMC&NH(Yio Chu Kang Rd)";
                break;
            case "25 Recreation Road, 546522":
                getAddress = "EMC(Recreation Road)";
                break;
            case "6 Bishan Street 13, Singapore 579798":
                getAddress = "BHFTID(Bishan)";
                break;
            case "9 Bishan Street 13, 579804":
                getAddress = "LHFTE(Bishan)";
                break;
            case "170 Lor 6 Toa Payoh, Singapore 319400":
                getAddress = "UMC(Toa Payoh)";
                break;
            case "72 Elizabeth Drive, 669745":
                getAddress = "UMC(Elizabeth Drive)";
                break;
            case "10 Buangkok View, 539747":
                getAddress = "EMC(Buangkok View)";
                break;
            case "5 Poh Huat Rd, Singapore 546703":
                getAddress = "All Saints Home(Hougang)";
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
                getAddress = "SA’s Community Hospital";
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
                getAddress = "AHFTE(Kim Beat Ave)";
                break;
            case "14 Buangkok Green 539755":
                getAddress = "Angsana Home @ Pelangi Village";
                break;
            case "12 Buangkok Green 539754":
                getAddress = "Banyan Home @ Pelangi Village";
                break;
            case "201 Jurong East Avenue 1 609791":
                getAddress = "BCTKH(Jurong East Ave)";
                break;
            case "6 Fourth Chin Bee Rd 619708":
                getAddress = "BTHFTA(Fourth Chin Bee)";
                break;
            case "11 Bukit Batok West Ave 2 659205":
                getAddress = "Bukit Batok HFTA";
                break;
            case "51 Marsiling Drive 739297":
                getAddress = "Christalite Methodist Home";
                break;
            case "53 Choa Chu Kang Road 689385":
                getAddress = "Econ Medicare Centre (Choa Chu Kang Rd)";
                break;
            case "351 Chai Chee Street 468982":
                getAddress = "EMC(Chai Chee Street)";
                break;
            case "58 Braddell Road 359905":
                getAddress = "EMC(Braddell)";
                break;
            case "255A Bukit Timah Road 259691":
                getAddress = "Good Shepherd Loft(Bukit Timah)";
                break;
            case "19 Compassvale Walk 544644":
                getAddress = "Grace Lodge";
                break;
            case "10 Buangkok Green 539753":
                getAddress = "Jenaris Home @ Pelangi Village";
                break;
            case "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681":
                getAddress = "KCL Tin Kee Home";
                break;
            case "6 Buangkok Green 539751":
                getAddress = "Meranti Home @ Pelangi Village";
                break;
            case "39 Sims Avenue 387412":
                getAddress = "Min Chong Comfort Home";
                break;
            case "7 Lorong Napiri 547533":
                getAddress = "Mindsville(Napiri)";
                break;
            case "1 Jalan Bilal, 468854":
                getAddress = "MH For The Aged Sick(Jalan Bilal)";
                break;
            case "301 Henderson Road 108931":
                getAddress = "MH For The Aged Sick(Henderson Road)";
                break;
            case "50 Jurong West Street 93 648967":
                getAddress = "NTUC Health Nursing Home(Jurong West)";
                break;
            case "45 Sixth Avenue 276487":
                getAddress = "Soo's Nursing Home(Sixth Avenue)";
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
                getAddress = "TPOPH(Jalan Ampas)";
                break;
            case "10 Buangkok View 539747":
                getAddress = "TPSS(Buangkok View)";
                break;
            case "51 Lentor Avenue 786876":
                getAddress = "The Lentor Residence";
                break;
            case "115 Lorong G Telok Kurau 426317":
                getAddress = "TL Old Folks Home";
                break;
            case "91 Geylang East Avenue 2 389759":
                getAddress = "TT Homes(Geylang East Ave)";
                break;
            case "4 Buangkok Green 539750":
                getAddress = "Thuja Home(Pelangi Village)";
                break;
            case "55 Queensway 149058":
                getAddress = "UMC(Queensway)";
                break;
            case "2 Buangkok Green 539749":
                getAddress = "Tembusu Home(Pelangi Village)";
                break;
        }
    }
    else {
        getAddress = $('#address').val();
    }

    var getDestination;
    var toDestination = $('#to-destination').val();
    var destination = $('#destination').val();
    var nursingTo = $('#nursingTo').val();
    var getFinalDestination;

    if (toDestination == "") {

        if (destination == "") {
            getFinalDestination = nursingTo;
        }
        else if (nursingTo == "") {
            getFinalDestination = destination;
        }

        switch (getFinalDestination) {
            case "Changi General Hospital (CGH)":
                getDestination = "CGH";
                break;
            case "Gleneagles Hospital":
                getDestination = "Gleneagles Hospital";
                break;
            case "Khoo Teck Puat Hospital":
                getDestination = "Khoo Teck Puat Hospital";
                break;
            case "KK Women's And Children's Hospital (KKH)":
                getDestination = "KKH";
                break;
            case "Mount Alvernia Hospital":
                getDestination = "Mount Alvernia Hospital";
                break;
            case "Mount Elizabeth Hospital":
                getDestination = "Mount Elizabeth Hospital";
                break;
            case "National University Hospital (NUH)":
                getDestination = "NUH";
                break;
            case "Ng Teng Fong General Hospital & Jurong Community Hospital":
                getDestination = "Ng Teng Fong & JCH";
                break;
            case "Parkway East Hospital (former East Shore Hospital)":
                getDestination = "Parkway East Hospital";
                break;
            case "Raffles Hospital":
                getDestination = "Raffles Hospital";
                break;
            case "Singapore General Hospital (SGH)":
                getDestination = "SGH";
                break;
            case "Tan Tock Seng Hospital (TTSH)":
                getDestination = "TTSH";
                break;
            case "Thomson Medical Centre (TMC)":
                getDestination = "TMC";
                break;
            case "Institute of Mental Health":
                getDestination = "IMH";
                break;
                //Nursing
            case "452 Upper East Coast Rd, Singapore 466500":
                getDestination = "EMC(Upper East Coast Rd)";
                break;
            case "52 Biggin Hill Rd, Singapore 509945":
                getDestination = "OVNH(Changi)";
                break;
            case "148A Silat Avenue 168871":
                getDestination = "OVNH(Bukit Merah)";
                break;
            case "221 Clementi Ave 4 129881":
                getDestination = "OVNH(Clementi)";
                break;
            case "11 Woodland Avenue 1 739068":
                getDestination = "OVNH(Marsiling)";
                break;
            case "6 Simei Street 3 529898":
                getDestination = "OVNH(Simei)";
                break;
            case "461A Sims Avenue 387541":
                getDestination = "OVNH(Sims Avenue)";
                break;
            case "11 Tampines Street 44, Singapore 529123":
                getDestination = "All Saints Home(Tampine Street 44)";
                break;
            case "31 Joo Chiat Ln, Singapore 428101":
                getDestination = "Serene Nursing Home Pte Ltd(Joo Chiat Ln)";
                break;
            case "106 Braddell Rd, Singapore 359912":
                getDestination = "Nightingale(Braddell Rd)";
                break;
            case "134 Lor J Telok Kurau, Singapore 425962":
                getDestination = "Paean Nursing Home Pte Ltd(Lor J)";
                break;
            case "205 Jln Kayu, Singapore 799436":
                getDestination = "Ju Eng Home For Senior Citizens(Jln Kayu)";
                break;
            case "11 Jln Ampas, Singapore 329514":
                getDestination = "Irene Nursing Home Pte. Ltd(Jln Ampas)";
                break;
            case "20 Woodlands Street 82, Singapore 738507":
                getDestination = "The Man Fut Tong Nursing Home(Woodlands Street 82)";
                break;
            case "31 Bukit Batok Street 52, Singapore 650540":
                getDestination = "Ren Ci @ Bukit Batok St. 52(Bukit Batok)";
                break;
            case "9 Upper Changi Rd N, 507706":
                getDestination = "Peacehaven Nursing Home(Upper Changi Rd)";
                break;
            case "1 Thomson Ln, Singapore 297728":
                getDestination = "Lee Ah Mooi";
                break;
            case "130 West Coast Drive Singapore 127444":
                getDestination = "Jamiyah Nursing Home(West Coast Drive)";
                break;
            case "1 Tampines Ave 3, Singapore 529707":
                getDestination = "Jamiyah Home for the Aged(Tampines Ave)";
                break;
            case "9 Choa Chu Kang Ave 4, Singapore 689815":
                getDestination = "BMWS(CCK)";
                break;
            case "9 Mandai Estate, 729906":
                getDestination = "St. Joseph's Home(Mandai Estate)";
                break;
            case "12 Yishun Ave 5, Singapore 768990":
                getDestination = "Sree Narayana Mission(Yishun)";
                break;
            case "100 Punggol Field, 828811":
                getDestination = "BHEH(Punggol)";
                break;
            case "60 Buangkok View, 534191":
                getDestination = "St. Andrew's Nursing Home(Buangkok)";
                break;
            case "130 Hougang Ave 1, Singapore 538900":
                getDestination = "SFTAS(Hougang)";
                break;
            case "6 Lengkok Bahru, 159051":
                getDestination = "PHNH(Lengkok Bahru)";
                break;
            case "10 Pasir Ris Walk, 518240":
                getDestination = "Apex Harmony Lodge(Pasir Ris)";
                break;
            case "369 Pasir Panjang Rd, Singapore 118706":
                getDestination = "WCHPL(Pasir Panjang)";
                break;
            case "20 Sembawang Cres, Singapore 757092":
                getDestination = "Singapore Christian Home(SembawangCres)";
                break;
            case "19 Toh Drive, 507871":
                getDestination = "OLOLNHPL(Toh Drive)";
                break;
            case "1 Lor 23 Geylang, 388352":
                getDestination = "GAHFTE(Geylang)";
                break;
            case "156 Serangoon Garden Way, Singapore 556055":
                getDestination = "Ling Kwang Home(Serangoon)";
                break;
            case "2 Jln Ulu Siglap, Singapore 457121":
                getDestination = "LC Nursing Home(Jln Ulu Siglap)";
                break;
            case "50 Jln Tan Tock Seng, 308438":
                getDestination = "Ren Ci Nursing Home (moulmein)";
                break;
            case "159 Serangoon Garden Way, Singapore 556056":
                getDestination = "Cheshire Home(Serangoon)";
                break;
            case "21 Senja Rd, 677736":
                getDestination = "PHNHII(Senja Rd)";
                break;
            case "91 Yishun Central, 768829":
                getDestination = "Villa Francis Home(Yishun Central)";
                break;
            case "49 Upper Thomson Rd, 574325":
                getDestination = "St. Theresa's Home(Upper Thomson Rd)";
                break;
            case "69 Wan Tho Avenue, 347601":
                getDestination = "St John's Home(Wan Tho Avenue)";
                break;
            case "487 Bedok South Ave 2, Singapore 469316":
                getDestination = "LHFTE(Bedok South Ave)";
                break;
            case "451 Yio Chu Kang Rd, 805947":
                getDestination = "EMC&NH(Yio Chu Kang Rd)";
                break;
            case "25 Recreation Road, 546522":
                getDestination = "EMC(Recreation Road)";
                break;
            case "6 Bishan Street 13, Singapore 579798":
                getDestination = "BHFTID(Bishan)";
                break;
            case "9 Bishan Street 13, 579804":
                getDestination = "LHFTE(Bishan)";
                break;
            case "170 Lor 6 Toa Payoh, Singapore 319400":
                getDestination = "UMC(Toa Payoh)";
                break;
            case "72 Elizabeth Drive, 669745":
                getDestination = "UMC(Elizabeth Drive)";
                break;
            case "10 Buangkok View, 539747":
                getDestination = "EMC(Buangkok View)";
                break;
            case "5 Poh Huat Rd, Singapore 546703":
                getDestination = "All Saints Home(Hougang)";
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
                getDestination = "SA’s Community Hospital";
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
                getDestination = "AHFTE(Kim Beat Ave)";
                break;
            case "14 Buangkok Green 539755":
                getDestination = "Angsana Home @ Pelangi Village";
                break;
            case "12 Buangkok Green 539754":
                getDestination = "Banyan Home @ Pelangi Village";
                break;
            case "201 Jurong East Avenue 1 609791":
                getDestination = "BCTKH(Jurong East Ave)";
                break;
            case "6 Fourth Chin Bee Rd 619708":
                getDestination = "BTHFTA(Fourth Chin Bee)";
                break;
            case "11 Bukit Batok West Ave 2 659205":
                getDestination = "Bukit Batok HFTA";
                break;
            case "51 Marsiling Drive 739297":
                getDestination = "Christalite Methodist Home";
                break;
            case "53 Choa Chu Kang Road 689385":
                getDestination = "Econ Medicare Centre (Choa Chu Kang Rd)";
                break;
            case "351 Chai Chee Street 468982":
                getDestination = "ECM(Chai Chee Street)";
                break;
            case "58 Braddell Road 359905":
                getDestination = "ECM(Braddell)";
                break;
            case "255A Bukit Timah Road 259691":
                getDestination = "Good Shepherd Loft(Bukit Timah)";
                break;
            case "19 Compassvale Walk 544644":
                getDestination = "Grace Lodge";
                break;
            case "10 Buangkok Green 539753":
                getDestination = "Jenaris Home @ Pelangi Village";
                break;
            case "70 Tampines Ave 4, Kheng Chiu Happy Lodge 529681":
                getDestination = "KCL Tin Kee Home";
                break;
            case "6 Buangkok Green 539751":
                getDestination = "Meranti Home @ Pelangi Village";
                break;
            case "39 Sims Avenue 387412":
                getDestination = "Min Chong Comfort Home";
                break;
            case "7 Lorong Napiri 547533":
                getDestination = "Mindsville(Napiri)";
                break;
            case "1 Jalan Bilal, 468854":
                getDestination = "MH For The Aged Sick(Jalan Bilal)";
                break;
            case "301 Henderson Road 108931":
                getDestination = "MH For The Aged Sick(Henderson Road)";
                break;
            case "50 Jurong West Street 93 648967":
                getDestination = "NTUC Health Nursing Home(Jurong West)";
                break;
            case "45 Sixth Avenue 276487":
                getDestination = "Soo's Nursing Home(Sixth Avenue)";
                break;
            case "263 Waterloo Street #05-01 180263":
                getDestination = "St Vincent Home";
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
                getDestination = "TPOPH(Jalan Ampas)";
                break;
            case "10 Buangkok View 539747":
                getDestination = "TPSS(Buangkok View)";
                break;
            case "51 Lentor Avenue 786876":
                getDestination = "The Lentor Residence";
                break;
            case "115 Lorong G Telok Kurau 426317":
                getDestination = "TL Old Folks Home";
                break;
            case "91 Geylang East Avenue 2 389759":
                getDestination = "TT Homes(Geylang East Ave)";
                break;
            case "4 Buangkok Green 539750":
                getDestination = "Thuja Home(Pelangi Village)";
                break;
            case "55 Queensway 149058":
                getDestination = "UMC(Queensway)";
                break;
            case "2 Buangkok Green 539749":
                getDestination = "Tembusu Home(Pelangi Village)";

        }
    }
    else {
        getDestination = $('#to-destination').val();
    }

    var getDate = $('#date').val();


    var getAssetID;


    var smsAlertDriver = {
        Sender: "Advance Dispatch System",
        Recipients: sessionStorage.getItem('setSessionstorageValueDriverPhone'),
        Message: "Cancelled (From: " + getAddress + "\r\n" + "To: " + getDestination + " " + "Pickup: " + getDate + ")",
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
        AssetID: sessionStorage.getItem('setSessionstorageValuePreviousAsset'),
        JobNumber: sessionStorage.getItem('setSessionstorageValueJobNumber'),
        Notified: 1
    };


    $.ajax({
        url: "http://track.asiacom.co.th/adswebapi/api/messageinfo",
        type: "POST",
        data: JSON.stringify(smsAlertDriver),
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
        success: function (smsAlertDriver) {
            console.log(smsAlertDriver);
        }
    });

}


//Enable/Disable Address
$(function () {

    //Clear Address
    $(".disableAddress").keyup(function () {

        var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$';
        var rex = new RegExp($(this).val(), 'i');


        if (rex.length === 0 || rex.source == "(?:)" || rex.source == null || rex.source == "") {

            $('#origin').removeAttr('disabled');
            $('#nursingFrom').removeAttr('disabled');
            $('.selectpicker').selectpicker('refresh');
        }
        else {
            $('#origin').attr('disabled', true);
            $('#nursingFrom').attr('disabled', true);
            $('.selectpicker').selectpicker('refresh');
        }

    });

    //Hospital From
    $('#origin').change(function () {
        var selected = $(this).find("option:selected").val();
        $('#address').val('');

        if (selected == "")
        {
            $('#address').removeAttr('disabled');
            $('#nursingFrom').removeAttr('disabled');
            $('.selectpicker').selectpicker('refresh');
        }
        else
        {
            $('#address').attr('disabled', true);
            $('#nursingFrom').attr('disabled', true);
            $('.selectpicker').selectpicker('refresh');
        }

    });

    //Nursing Home From
    $('#nursingFrom').change(function () {
        var selected = $(this).find("option:selected").val();
        $('#address').val('');

        if (selected == "") {
            $('#address').removeAttr('disabled');
            $('#origin').removeAttr('disabled');
            $('.selectpicker').selectpicker('refresh');
        }
        else {
            $('#address').attr('disabled', true);
            $('#origin').attr('disabled', true);
            $('.selectpicker').selectpicker('refresh');
        }

    });

    //Clear Destination
    $(".disableDestination").keyup(function () {

        var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$';
        var rex = new RegExp($(this).val(), 'i');


        if (rex.length === 0 || rex.source == "(?:)" || rex.source == null || rex.source == "") {

            $('#destination').removeAttr('disabled');
            $('#nursingTo').removeAttr('disabled');
            $('.selectpicker').selectpicker('refresh');
        }
        else {
            $('#destination').attr('disabled', true);
            $('#nursingTo').attr('disabled', true);
            $('.selectpicker').selectpicker('refresh');
        }

    });

    //Hospital To
    $('#destination').change(function () {
        var selected = $(this).find("option:selected").val();
        $('#to-destination').val('');

        if (selected == "") {
            $('#to-destination').removeAttr('disabled');
            $('#nursingTo').removeAttr('disabled');
            $('.selectpicker').selectpicker('refresh');
        }
        else {
            $('#to-destination').attr('disabled', true);
            $('#nursingTo').attr('disabled', true);
            $('.selectpicker').selectpicker('refresh');
        }
    });


    //Nursing Home To
    $('#nursingTo').change(function () {
        var selected = $(this).find("option:selected").val();
        $('#to-destination').val('');

        if (selected == "") {
            $('#to-destination').removeAttr('disabled');
            $('#destination').removeAttr('disabled');
            $('.selectpicker').selectpicker('refresh');
        }
        else {
            $('#to-destination').attr('disabled', true);
            $('#destination').attr('disabled', true);
            $('.selectpicker').selectpicker('refresh');
        }

    });



});



function snFormatter(value, row, index) {

    return index + 1;
}


function jobStatusFormatter(value, row, index) {

    switch (value) {
        case 0:
            value = "Available";
            break;
        case 1:
            value = "Pending";
            break;
        case 2:
            value = "Acknowledge";
            break;
        case 3:
            value = "Onboard";
            break;
    }

    return value;
}

//  Format for Timestamp Column.
// =================================================================
function timeFormatter(value, row) {

    var timestamp = new Date(value);
    var rxtime = new Date("2001-01-01T00:00:00");

    if (timestamp < rxtime) {
        return '<div>' + '<span>&nbsp;-</span>' + '</div>';
    }
    else {

        //Convert Timezone
        var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');

        var Singapore = moment.tz(value, Asia);

        //Format UTC
        var timestamp = moment.utc(Singapore.format()).add('hours', 8).format('HH:mm:ss A');


        return '<div>' + '<span>' + timestamp + '</span>' + '</div>';

    }
}

function pickuptimeFormatter(value, row) {

    var timestamp = new Date(value);
    var rxtime = new Date("2001-01-01T00:00:00");

    if (timestamp < rxtime) {
        return '<div>' + '<span>&nbsp;-</span>' + '</div>';
    }
    else {

        //Convert Timezone
        var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');

        var Singapore = moment.tz(value, Asia);

        //Format UTC
        var timestamp = moment.utc(Singapore.format()).add('minutes', 495).format('HH:mm:ss A');


        return '<div>' + '<span>' + timestamp + '</span>' + '</div>';

    }
}

function tripFormatter(value, row) {
    var labelColor;
    var text;
    if (value == 1) {
        labelColor = "warning";
        text = "One Way";
    } else if (value == 2) {
        labelColor = "success";
        text = "Two Way";
    }

    return '<div class="label label-table label-' + labelColor + '"> ' + text + '</div>';
}

$(function () {

    //On Load users
    var WebAPIUser = "";

    if (getSessionstorageValueRoleID == 1) {

        WebAPIUser = 'http://103.237.168.119/adswebapi/api/userinfo?ResellerID=' + '1' + '&CompanyID=' + '1' + '&RoleID=' + getSessionstorageValueRoleID;

        $.getJSON(WebAPIUser, function (data) {

            $.each(data, function (index, item) {
                if (item.User == getSessionstorageValueUser) {
                    $('#getAgents').append($('<option selected="selected"></option>').val(item.User).html(item.User));
                }
                else {
                    $('#getAgents').append($('<option></option>').val(item.User).html(item.User));
                }
            });
            $(".selectpicker").selectpicker('refresh');
        });

    }
    else if (getSessionstorageValueRoleID == 2) {

        WebAPIUser = 'http://103.237.168.119/adswebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;

        $.getJSON(WebAPIUser, function (data) {
            $.each(data, function (index, item) {
                if (item.User == getSessionstorageValueUser) {

                    $('#getAgents').append($('<option selected="selected"></option>').val(item.User).html(item.User));
                }
                else {
                    $('#getAgents').append($('<option></option>').val(item.User).html(item.User));
                }

            });
            $(".selectpicker").selectpicker('refresh');
        });
    }
    else if (getSessionstorageValueRoleID >= 3) {

        WebAPIUser = 'http://103.237.168.119/adswebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;

        if (getSessionstorageValueRoleID >= 1)
        {
            $('#getAgents').append($('<option></option>').val("").html("ALL"));
        }

        $.getJSON(WebAPIUser, function (data) {
            $.each(data, function (index, item) {

                if (item.User == getSessionstorageValueUser)
                {
                    $('#getAgents').append($('<option selected="selected"></option>').val(item.User).html(item.User));
                }
                else {
                    $('#getAgents').append($('<option></option>').val(item.User).html(item.User));
                }
               
            });
            $(".selectpicker").selectpicker('refresh');
        });
    }

    $('.SelectAgentFilter').on('change', function () {

        var selected = $(this).find("option:selected").val();
        
        var timestamp = moment().format('D-MMM-YYYY');
        var rxtime = moment().add('days', 1).format('D-MMM-YYYY');

        WebAPIJobs = 'http://103.237.168.119/adswebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + timestamp + '&RxTime=' + rxtime + '&Agent=' + selected;

        $('#jobsCreated').bootstrapTable('destroy');
        $(document).ready(function () {

            $('#jobsCreated').bootstrapTable(
            {
                idField: 'JobID',
                url: WebAPIJobs,
                columns: [{
                    field: 'SN',
                    title: 'SN',
                    formatter: snFormatter
                }, {
                    field: 'JobNumber',
                    title: 'Job Number',
                }, {
                    field: 'JobType',
                    title: 'Job Type',
                }, {
                    field: 'JobStatus',
                    title: 'Job Status',
                }, {
                    field: 'Flag',
                    title: 'Status Desc',
                    formatter: jobStatusFormatter
                }, {
                    field: 'Asset',
                    title: 'Ambulance'
                }, {
                    field: 'TOC',
                    title: 'Time of Call',
                    sortable: 'true',
                    formatter: timeFormatter
                }, {
                    field: 'Timestamp',
                    title: 'Alert Time',
                    sortable: 'true',
                    formatter: timeFormatter
                }, {
                    field: 'Timestamp',
                    title: 'Pickup Time',
                    sortable: 'true',
                    formatter: pickuptimeFormatter
                }, {
                    field: 'DriverInfo.Name',
                    title: 'Driver'
                }, {
                    field: 'Origin',
                    title: 'From'
                }, {
                    field: 'Destination',
                    title: 'To'
                }, {
                    field: 'Caller',
                    title: 'Caller'
                }, {
                    field: 'Phone',
                    title: 'Phone'
                }, {
                    field: 'Agent',
                    title: 'Agent'
                }, {
                    field: 'Trip',
                    title: 'Trip',
                    formatter: tripFormatter
                }, {
                    field: 'Remarks2',
                    title: 'Remarks'
                }, ], onLoadSuccess: function (row) {

                    //Total Jobs
                    var $result = $('#total-jobsCreated');
                    var rows = document.getElementById('jobsCreated').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;

                    if (row.length == 0) {
                        $result.text(0)

                    } else {

                        $result.text(rows)
                    }

                }

            });
        });


    }); // end of on change


    //$('#getUserAgent').append($('<div></div>').val(getSessionstorageValueUser).html("Jobs Created by " + getSessionstorageValueUser + " (" + moment().format('D-MMM-YYYY') + ")"));


    generateJobNumber();
    reloadJobsCreated();
    $('#date').val(moment().format('DD-MMM-YYYY, HH:mm'));
    $('#toc').val(moment().format('DD-MMM-YYYY, HH:mm'));

});

function generateJobNumber() {

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

    var jobNumber = "JN-" + z + y + q + "-" + randomString();

    $('#reference').val(jobNumber);

}

function reloadJobsCreated()
    {
        var timestamp = moment().format('D-MMM-YYYY');
        var rxtime = moment().add('days', 1).format('D-MMM-YYYY');

        var WebAPIJobs;
        if (getSessionstorageValueRoleID == 1) {

            WebAPIJobs = 'http://103.237.168.119/adswebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + timestamp + '&RxTime=' + rxtime;
        }
        else if (getSessionstorageValueRoleID == 2) {

            WebAPIJobs = 'http://103.237.168.119/adswebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + timestamp + '&RxTime=' + rxtime;
        }
        else if (getSessionstorageValueRoleID == 3) {

            WebAPIJobs = 'http://103.237.168.119/adswebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + timestamp + '&RxTime=' + rxtime;
        }
        else if (getSessionstorageValueRoleID >= 4) {

            WebAPIJobs = 'http://103.237.168.119/adswebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + timestamp + '&RxTime=' + rxtime + '&Agent=' + getSessionstorageValueUser;
        }
        
        console.log(WebAPIJobs);

        $('#jobsCreated').bootstrapTable('destroy');
        $(document).ready(function () {

            $('#jobsCreated').bootstrapTable(
            {
                idField: 'JobID',
                url: WebAPIJobs,
                columns: [{
                    field: 'SN',
                    title: 'SN',
                    formatter: snFormatter
                }, {
                    field: 'JobNumber',
                    title: 'Job Number',
		        }, {
                    field: 'JobType',
                    title: 'Job Type',
		        }, {
		            field: 'JobStatus',
		            title: 'Job Status',
		        }, {
		            field: 'Flag',
		            title: 'Status Desc',
                    formatter: jobStatusFormatter
		        }, {
                    field: 'Asset',
                    title: 'Ambulance'
		        }, {
		            field: 'TOC',
		            title: 'Time of Call',
		            sortable: 'true',
		            formatter: timeFormatter
		        }, {
                    field: 'Timestamp',
                    title: 'Alert Time',
                    sortable: 'true',
                    formatter: timeFormatter
		        }, {
		            field: 'Timestamp',
		            title: 'Pickup Time',
		            sortable: 'true',
		            formatter: pickuptimeFormatter
		        }, {
                    field: 'DriverInfo.Name',
                    title: 'Driver'
                }, {
                    field: 'Origin',
                    title: 'From'
                }, {
                    field: 'Destination',
                    title: 'To'
                }, {
                    field: 'Caller',
                    title: 'Caller'
                }, {
                    field: 'Phone',
                    title: 'Phone'
                }, {
                    field: 'Agent',
                    title: 'Agent'
                }, {
                    field: 'Trip',
                    title: 'Trip',
                    formatter: tripFormatter
                }, {
                    field: 'Remarks2',
                    title: 'Remarks'
                }, ], onLoadSuccess: function (row) {

                    //Total Jobs
                    var $result = $('#total-jobsCreated');
                    var rows = document.getElementById('jobsCreated').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;

                    if (row.length == 0) {
                        $result.text(0)

                    } else {

                        $result.text(rows)
                    }

                }

            });
        });
    }

function loopSound(sound) {
        sound.play({
            onfinish: function () {
                loopSound(sound);
            }
        });
    }

function UIAlert() {



        soundManager.setup({

            // location: path to SWF files, as needed (SWF file name is appended later.)

            url: 'plugins/sound-manager/swf/soundmanager2.swf',

            // optional: version of SM2 flash audio API to use (8 or 9; default is 8 if omitted, OK for most use cases.)
            // flashVersion: 9,

            // use soundmanager2-nodebug-jsmin.js, or disable debug mode (enabled by default) after development/testing
            // debugMode: false,

            // good to go: the onready() callback

            onready: function () {

                // SM2 has started - now you can create and play sounds!

                mySound = soundManager.createSound({
                    id: 'UIAlertStop', // optional: provide your own unique id
                    url: 'sounds/b2_oringz-pack-nine-17.mp3',
                    //onload: function () { console.log('sound loaded!', this); }
                    // other options here..
                });


                //mySound.play();
                loopSound(mySound);

            },

            // optional: ontimeout() callback for handling start-up failure

            ontimeout: function () {

                // Hrmm, SM2 could not start. Missing SWF? Flash blocked? No HTML5 audio support? Show an error, etc.?
                // See the flashblock demo when you want to start getting fancy.

            }

        });


}

function setZones(map, zones, callback) {


    if (getSessionstorageValueRoleID == 1) {

        url = 'http://103.237.168.119/adswebapi/api/zoneinfo?ResellerID=' + '1' + '&CompanyID=' + '1';

    } else if (getSessionstorageValueRoleID == 2) {
        url = 'http://103.237.168.119/adswebapi/api/zoneinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    } else if (getSessionstorageValueRoleID >= 3) {

        url = 'http://103.237.168.119/adswebapi/api/zoneinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;
    }


    //alert(url);


    $.getJSON(url, function (zones) {

        callback(zones);

    }


)
}

function handleZones(zones) {

    for (var i = 0; i < zones.length; i++) {

        var zone = zones[i];
        var zoneID = zone.ZoneID;
        var name = zone.Name;
        var type = zone.Type;
        var perimeter = zone.Perimeter;
        var company = zone.Company;
        var color = zone.Color;


        var coords = perimeter.split(" ");
        var recoords;
        var Pos;
        var zoneCircle;
        var zoneCircle1;

        if (coords.length == 1) {

            for (var k = 0; k < coords.length; k++) {
                recoords = coords[k].split(",");

                var circle1 = {};
                circle1['Zones'] = {
                    center: new google.maps.LatLng(parseFloat(recoords[0]), parseFloat(recoords[1])),
                    radius: recoords[2]
                    //radius: 100
                };


            }


            // Construct the circle for each value in citymap.
            // Note: We scale the area of the circle based on the population.
            for (var zone in circle1) {
                var radiusOptions = {
                    strokeColor: color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.35,
                    map: map,
                    Company: company,
                    Name: name,
                    Pos: coords,
                    zoneID: zoneID,
                    center: circle1[zone].center,
                    radius: Math.sqrt(circle1[zone].radius)
                };
                // Add the circle for this city to the map.
                zoneCircle1 = new google.maps.Circle(radiusOptions);

            }
            circleCoordinates1.push(zoneCircle1);


            // Add a listener for the click event.
            google.maps.event.addListener(zoneCircle1, 'click', showArrayCircle);

            infoWindow = new google.maps.InfoWindow();


            // Click Zones
            google.maps.event.addListener(zoneCircle1, 'click', (function (zoneCircle1) {

                return function () {

                    map.panTo(this.position);

                }

            })(zoneCircle1));

        }

            //Circle - 1.042346,99.939392 1.038056,99.937031
        else if (coords.length <= 2) {

            var latlng1 = coords[0];
            var latlng2 = coords[1];
            var getlatlng1 = latlng1.split(",");

            var lat1 = getlatlng1[0];
            var lon1 = getlatlng1[1];

            var getlatlng2 = latlng2.split(",");

            var lat2 = getlatlng2[0];
            var lon2 = getlatlng2[1];

            function deg2rad(deg) {
                return deg * (Math.PI / 180)
            }

            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km

            var Radius = d * 100;



            recoords = coords[0].split(",");



            circle['Zones'] = {
                center: new google.maps.LatLng(parseFloat(recoords[0]), parseFloat(recoords[1])),
                //radius: recoords[2]
                //radius: 100
                radius: Radius
            };


            for (var zone in circle) {
                var radiusOptions = {
                    strokeColor: color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.35,
                    map: map,
                    Company: company,
                    Name: name,
                    Pos: coords,
                    zoneID: zoneID,
                    center: circle[zone].center,
                    radius: Math.sqrt(circle[zone].radius) * 100
                };
                // Add the circle for this city to the map.
                zoneCircle = new google.maps.Circle(radiusOptions);
            }

            circleCoordinates.push(zoneCircle);


            // Add a listener for the click event.
            google.maps.event.addListener(zoneCircle, 'click', showArrayCircle);

            infoWindow = new google.maps.InfoWindow();


            // Click Zones
            google.maps.event.addListener(zoneCircle, 'click', (function (zoneCircle) {

                return function () {

                    map.panTo(this.position);

                }

            })(zoneCircle));




        }

        else if (coords.length >= 3) {

            //for (var k = 0; k < coords.length; k++) {
            //    recoords = coords[k].split(",");
            //    pathCoordinates.push(new google.maps.LatLng(parseFloat(recoords[0]), parseFloat(recoords[1])));
            //}

            for (var k = 0; k < coords.length; k++) {
                recoords = coords[k].split(",");
                pathCoordinates.push(new google.maps.LatLng(parseFloat(recoords[0]), parseFloat(recoords[1])));
            }

            // Construct the polygon.
            polygon = new google.maps.Polygon({
                path: pathCoordinates,
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: color,
                fillOpacity: 0.35,
                Company: company,
                Name: name,
                Pos: coords,
                zoneID: zoneID,
                map: map
            });



            pathCoordinates = [];
            polygonCoordinates.push(polygon);


            polygon.setMap(map);


            // Add a listener for the click event.
            google.maps.event.addListener(polygon, 'click', showArrays);

            infoWindow = new google.maps.InfoWindow();


            // Click Zones
            google.maps.event.addListener(polygon, 'click', (function (polygon, i) {

                return function () {

                    map.panTo(this.position);

                }

            })(polygon, i));


        } //end of if


        /**
        * Function to Zones
    new algorithm updated by [chi:10may2016]
        */
        $(function () {

            $('.SelectZonesFilter').on('change', function () {

                var selected = $(this).find("option:selected").val();


                for (var b = 0; b < circleCoordinates1.length; b++) {
                    circle1 = circleCoordinates1[b];
                    //alert("trace "+parseInt(circle1.zoneID));
                    if (circle1.zoneID == selected || selected.length === 0) {

                        map.fitBounds(circle1.getBounds());

                    }
                }
                for (var j = 0; j < circleCoordinates.length; j++) {
                    circle = circleCoordinates[j];
                    if (circle.zoneID == selected || selected.length === 0) {

                        map.fitBounds(circle.getBounds());

                    }
                }
                for (var a = 0; a < polygonCoordinates.length; a++) {

                    polygon = polygonCoordinates[a];

                    if (polygon.zoneID == selected || selected.length === 0) {

                        var bounds = new google.maps.LatLngBounds();
                        var point = [];

                        var getPolygon = polygon.Pos;

                        for (var i = 0; i < polygon.getPath().length; i++) {
                            getPolygonEx = getPolygon[i].split(",");
                            point = new google.maps.LatLng(parseFloat(getPolygonEx[0]), parseFloat(getPolygonEx[1]));
                            bounds.extend(point);
                        }


                        map.fitBounds(bounds);
                    }//end if
                }//end for

            }); // end of on change

        }); //end of function

    }
    return zones;
}


/** @this {google.maps.Polygon} */
function showArrays(event) {

    // Since this polygon has only one path, we can call getPath()
    // to return the MVCArray of LatLngs.
    var vertices = this.getPath();

    var contentString = '<div style="color:black;"><strong>Zone: &nbsp;</strong>' + this.Name + '<br>' +
        '<strong>Company: &nbsp;</strong>' + this.Company + '<br>' +
        '<strong>Clicked location:</strong> <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
        '<br></div>';

    // Iterate over the vertices.
    //for (var i = 0; i < vertices.getLength() ; i++) {
    //    var xy = vertices.getAt(i);
    //    contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
    //        xy.lng();
    //}

    // Replace the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map);

}

function showArrayCircle(event) {

    var contentString = '<div><strong>Zone:</strong>&nbsp;' + this.Name + '</div>' +
                         '<strong>Company:&nbsp;</strong>' + this.Company + '</strong><br>' +
                         '<strong>Clicked location:</strong> <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
                         '<br>';



    // Replace the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map);
}

    //Enable/Disable alert
    changeCheckbox.onchange = function () {

        if (changeCheckbox.checked) {

            loopSound(mySound);

        } else {

            soundManager.stop('UIAlertStop');

        }

    };


    //On Load assets
    var WebAPIAsset = "";

    if (getSessionstorageValueRoleID == 1) {

        WebAPIAsset = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + '&ResellerID=' + '1' + '&CompanyID=' + '1';

        $.getJSON(WebAPIAsset, function (data) {

            $.each(data, function (index, item) {
                $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
            });
            $(".selectpicker").selectpicker('refresh');
        });

    }
    else if (getSessionstorageValueRoleID == 2) {

        WebAPIAsset = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $.each(data, function (index, item) {
                $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
            });
            $(".selectpicker").selectpicker('refresh');
        });
    }
    else if (getSessionstorageValueRoleID >= 3) {

        WebAPIAsset = 'http://103.237.168.119/adswebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $.each(data, function (index, item) {
                $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
            });
            $(".selectpicker").selectpicker('refresh');
        });
    }