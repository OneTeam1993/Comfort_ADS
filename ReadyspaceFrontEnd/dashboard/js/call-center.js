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
var openmarker = [];
var assets = [];
var marker, i, k;
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

    WebAPIReseller = 'https://track-asia.com/comfortwebapi/api/resellerinfo';

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

    WebAPIReseller = 'https://track-asia.com/comfortwebapi/api/resellerinfo?ResellerID=' + getSessionstorageValueUserResellerID;

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

    $.getJSON("https://track-asia.com/comfortwebapi/api/companyinfo?&ResellerID=" + "1", function (data) {

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

    $.getJSON("https://track-asia.com/comfortwebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

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

        $.getJSON("https://track-asia.com/comfortwebapi/api/companyinfo?&ResellerID=" + selectedReseller, function (data) {

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

            $.getJSON('https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + '&ResellerID=' + getReseller + '&CompanyID=' + selectedCompany, function (data) {

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
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions:
        {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        fullscreenControl: true,
        fullscreenControlOptions:
        {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
    });

    //map = new google.maps.Map(document.getElementById('map-canvas'), {
    //    zoom: 12,
    //    center: { lat: 1.3000, lng: 103.8000 },
    //    mapTypeControl: true,
    //    mapTypeControlOptions: {
    //        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    //        position: google.maps.ControlPosition.TOP_CENTER
    //    },
    //    zoomControl: true,
    //    zoomControlOptions: {
    //        position: google.maps.ControlPosition.LEFT_CENTER
    //    },
    //    scaleControl: true,
    //    streetViewControl: true,
    //    streetViewControlOptions: {
    //        position: google.maps.ControlPosition.LEFT_TOP
    //    },
    //    fullscreenControl: true
    //});


    var input = document.getElementById('panel');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    setZones(map, zones, handleZones);

    setMarkers(map, assets, updateAssets);
    assetMarkerInterval = setInterval(function () {
        setMarkers(map, assets, updateAssets);
    }, '10000');

    setInterval(function () {
        $('#jobsCreated').bootstrapTable('refresh');
    }, '120000');

    SearchPlacesFrom();
    SearchPlacesTo();
}

google.maps.event.addDomListener(window, 'load', initialize);

function setMarkers(map, assets, callback) {


    if (getSessionstorageValueRoleID == 1) {

        MarkerAPI = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + '&ResellerID=' + '1' + '&CompanyID=' + '1';

    } else if (getSessionstorageValueRoleID == 2) {

        MarkerAPI = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    } else if (getSessionstorageValueRoleID >= 3) {

        MarkerAPI = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

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
            url = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + '&ResellerID=' + selectedReseller + '&CompanyID=' + selectedCompany;
        } else {
            url = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + '&ResellerID=' + getReseller + '&CompanyID=' + selectedCompany;
        }

    } else if (getSessionstorageValueRoleID == 2) {

        url = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + selectedCompany;

    } else if (getSessionstorageValueRoleID >= 3) {

        url = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

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
    var pending = 0;
    var ack = 0;
    var onboard = 0;
    var breakdriver = 0;
    var logout = 0;

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
        //if (assets[i].Jobs.Flag == 0 && assets[i].Flag == 1 && timestamp1 == timestamp2) available++;       
        //if (asset.Jobs.Flag == 1 && asset.Flag == 1 && asset.Jobs.JobStatus != "Scheduled") pending++;

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
                breakdriver++;
            }
            else if (timestamp2 > timestamp1) {
                icon = iconURL + markerCategory + "-logout.png"; //no logout
                logout++;
            }
            else if (asset.Jobs.Flag == 0 && asset.Flag == 1 || asset.Jobs.Flag == 1 && asset.Jobs.JobStatus == "Scheduled") {
                icon = iconURL + markerCategory + "-available.png"; //Offload or Available
                available++;
            }
            else if (asset.Jobs.Flag == 1 && asset.Flag == 1 && asset.Jobs.JobStatus != "Scheduled") {
                icon = iconURL + markerCategory + "-pending.png"; //pending
                pending++;
            }
            else if (asset.Jobs.Flag == 2 && asset.Flag == 1) {
                icon = iconURL + markerCategory + "-ack.png"; //ack
                ack++;
            }
            else if (asset.Jobs.Flag == 3 && asset.Flag == 1) {
                icon = iconURL + markerCategory + "-onboard.png"; //onboard
                onboard++;
            }
            else if (asset.Jobs.Flag >= 0 && asset.Flag == 0) {
                icon = iconURL + markerCategory + "-logout.png"; //logout
                logout++;
            }

            document.getElementById('available').innerHTML = available;
            document.getElementById('pending').innerHTML = pending;
            document.getElementById('ack').innerHTML = ack;
            document.getElementById('onboard').innerHTML = onboard;
            document.getElementById('logout').innerHTML = logout;
            document.getElementById('break').innerHTML = breakdriver;

            var image = {
                url: icon, // url
                scaledSize: new google.maps.Size(28, 28), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(14, 14) // anchor
            };

            var infowindowcontent = "<div style='color:black;' id='infoWindow'><h6 style='color:#E31466;'>" + asset.Name + "</h6><br><span class='text-bold'>Address: </span>" + asset.LastPos.Location + "<br><span class='text-bold'>Date: </span>" + timestamp +
                                    "<br><span class='text-bold'>Speed: </span>" + speedFormatter(speed) +
                                    "<br><span class='text-bold'>Engine: </span>" + engine +
                                     //"<br><span class='text-bold'>Asset Status: </span>" + asset.Flag +
                                     // "<br><span class='text-bold'>Job Status: </span>" + asset.Jobs.Flag +
                                     //  "<br><span class='text-bold'>Job Status Description: </span>" + asset.Jobs.JobStatus +
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
                flag: asset.Jobs.Flag,
                assetflag: asset.Flag,
                jobStatus: asset.Jobs.JobStatus,
                address: asset.LastPos.Location,
                timestamp: asset.LastPos.Timestamp,
                html: infowindowcontent
            });

            //Open Barlight
            if (asset.LastPos.BarLight == 1) {
                pulse.setVisible(true);
            }
            else if (asset.LastPos.BarLight == 0) {
                pulse.setVisible(false);
            }


            //To fix marker sensitivity issue
            google.maps.event.addDomListener(pulse, "click", function (event) {
                google.maps.event.trigger(marker[i], "click");
            });

            if (markers[i] && markers[i].setPosition) {

                // To remove the marker from the map
                //marker.setVisible(false);
                marker.setMap(null);
                pulse.setMap(null);

                markers[i].setPosition(pt);
                pulses[i].setPosition(pt);


                //Open Barlight
                if (asset.LastPos.BarLight == 1) {
                    pulses[i].setVisible(true);
                }
                else if (asset.LastPos.BarLight == 0) {
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
                    markers[i].jobStatus = asset.Jobs.JobStatus;
                    markers[i].address = asset.LastPos.Location;
                    markers[i].id = asset.AssetID;
                    markers[i].timestamp = asset.LastPos.Timestamp;
					window.onload = function(){  
						document.getElementById('infoWindow').innerHTML = infowindowcontent;
					}
                    
                    //map.panTo(marker.getPosition());
                }
                else {
                    markers[i].flag = asset.Jobs.Flag;
                    markers[i].assetflag = asset.Flag;
                    markers[i].jobStatus = asset.Jobs.JobStatus;
                    markers[i].address = asset.LastPos.Location;
                    markers[i].id = asset.AssetID;
                    markers[i].timestamp = asset.LastPos.Timestamp;
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

/*** Function to Assets*/
$(function () {

    $('.SelectAssetFilter').on('change', function () {

        var selected = $(this).find("option:selected").val();

        for (k = 0; k < markers.length; k++) {
            marker = markers[k];
            if (markers[k])
            {
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

        }

    }); // end of on change

}); //end of function

/*** Function to Click Pending*/
$(function () {

    $('#pendingAsset').on('click', function () {

        if ($('#side_bar').length > 0) {
            $("#side_bar").empty();
        }

        for (var i = 0; i < circleCoordinates.length; i++) {
            circleCoordinates[i].setMap(null);
        }

        for (k = 0; k < markers.length; k++) {
            marker = markers[k];

            if (markers[k])
            {
                if (marker.flag == 1 && marker.assetflag == 1 && marker.jobStatus != "Scheduled") {
                    var outputDiv = document.getElementById('side_bar');
                    outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                                        + "<table id='availAmbulance' border='0'>"
                                        + "<tbody>"
                                        + "<tr>"
                                        + "<td>"
                                        + "<strong><a href='javascript:google.maps.event.trigger(openmarker[" + k + "],\"click\");' style='color:#458FD2;' onclick='scrollToTop()'>" + marker.title + '</a></strong><br>' + marker.address + "<br>"
                                        + "</td>"
                                        + "</tr>"
                                        + "</tbody>"
                                        + "</table>"
                                        + "</div>"
                                        + "<hr>";
                    marker.setVisible(true);
                    openmarker = findMarker(marker.position);

                } else {
                    marker.setVisible(false);
                }
            }

        }

        for (l = 0; l < pulses.length; l++) {
            pulse = pulses[l];

            if (pulses[l])
            {
                if (pulse.flag == 1 && pulse.assetflag == 1 && pulse.jobStatus != "Scheduled") {

                    pulses[l].setMap(map);
                }
                else {
                    pulses[l].setMap(null);
                }
            }

        }


        if (infoBoxList.length > 0) {
            for (var i = 0; i < infoBoxList.length; i++) {
                infoBoxList[i].close();
            }

            // Reset the markers array
            infoBoxList = [];
        }

        $('#getAssets').empty();

        $(".selectpicker").selectpicker('refresh');

        WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $('#getAssets').append($('<option value="0"></option>').val(0).html("Select Vehicle"));
            $.each(data, function (index, item) {
                if (item.Flag == 1 && item.Jobs.Flag == 1 && item.Jobs.JobStatus != "Scheduled") {
                    $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
                }

            });
            $(".selectpicker").selectpicker('refresh');
        });


        document.getElementById("statusTitle").innerHTML = "Pending Ambulance";
    }); // end of on click

}); //end of function

/*** Function to Click Ack*/
$(function () {

    $('#ackAsset').on('click', function () {

        if ($('#side_bar').length > 0) {
            $("#side_bar").empty();
        }

        for (k = 0; k < markers.length; k++) {
            marker = markers[k];

            if (markers[k])
            {
                if (marker.flag == 2 && marker.assetflag == 1) {
                    var outputDiv = document.getElementById('side_bar');
                    outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                                        + "<table id='availAmbulance' border='0'>"
                                        + "<tbody>"
                                        + "<tr>"
                                        + "<td>"
                                        + "<strong><a href='javascript:google.maps.event.trigger(openmarker[" + k + "],\"click\");' style='color:#458FD2;' onclick='scrollToTop()'>" + marker.title + '</a></strong><br>' + marker.address + "<br>"
                                        + "</td>"
                                        + "</tr>"
                                        + "</tbody>"
                                        + "</table>"
                                        + "</div>"
                                        + "<hr>";

                    marker.setVisible(true);
                    openmarker = findMarker(marker.position);
                } else {
                    marker.setVisible(false);
                }
            }

        }

        for (l = 0; l < pulses.length; l++) {
            pulse = pulses[l];

            if (pulses[l])
            {
                if (pulse.flag == 2 && pulse.assetflag == 1) {

                    pulses[l].setMap(map);
                }
                else {
                    pulses[l].setMap(null);
                }
            }

        }


        if (infoBoxList.length > 0) {
            for (var i = 0; i < infoBoxList.length; i++) {
                infoBoxList[i].close();
            }

            // Reset the markers array
            infoBoxList = [];
        }

        $('#getAssets').empty();

        $(".selectpicker").selectpicker('refresh');

        WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $('#getAssets').append($('<option value="0"></option>').val(0).html("Select Vehicle"));
            $.each(data, function (index, item) {
                if (item.Jobs.Flag == 2 && item.Flag == 1) {
                    $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
                }

            });
            $(".selectpicker").selectpicker('refresh');
        });

        document.getElementById("statusTitle").innerHTML = "Acknowledged Ambulance";
    }); // end of on click

}); //end of function

/*** Function to Click Onboard*/
$(function () {

    $('#onboardAsset').on('click', function () {

        if ($('#side_bar').length > 0) {
            $("#side_bar").empty();
        }

        for (k = 0; k < markers.length; k++) {
            marker = markers[k];

            if (markers[k])
            {
                if (marker.flag == 3 && marker.assetflag == 1) {
                    var outputDiv = document.getElementById('side_bar');
                    outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                                        + "<table id='availAmbulance' border='0'>"
                                        + "<tbody>"
                                        + "<tr>"
                                        + "<td>"
                                        + "<strong><a href='javascript:google.maps.event.trigger(openmarker[" + k + "],\"click\");' style='color:#458FD2;' onclick='scrollToTop()'>" + marker.title + '</a></strong><br>' + marker.address + "<br>"
                                        + "</td>"
                                        + "</tr>"
                                        + "</tbody>"
                                        + "</table>"
                                        + "</div>"
                                        + "<hr>";

                    marker.setVisible(true);
                    openmarker = findMarker(marker.position);
                } else {
                    marker.setVisible(false);
                }
            }

        }

        for (l = 0; l < pulses.length; l++) {
            pulse = pulses[l];

            if (pulses[l])
            {
                if (pulse.flag == 3 && pulse.assetflag == 1) {

                    pulses[l].setMap(map);
                }
                else {
                    pulses[l].setMap(null);
                }
            }

        }


        if (infoBoxList.length > 0) {
            for (var i = 0; i < infoBoxList.length; i++) {
                infoBoxList[i].close();
            }

            // Reset the markers array
            infoBoxList = [];
        }

        $('#getAssets').empty();

        $(".selectpicker").selectpicker('refresh');

        WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $('#getAssets').append($('<option value="0"></option>').val(0).html("Select Vehicle"));
            $.each(data, function (index, item) {
                if (item.Jobs.Flag == 3 && item.Flag == 1) {
                    $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
                }

            });
            $(".selectpicker").selectpicker('refresh');
        });

        document.getElementById("statusTitle").innerHTML = "Onboard Ambulance";
    }); // end of on click

}); //end of function

/*** Function to Click Break*/
$(function () {

    $('#breakAsset').on('click', function () {

        if ($('#side_bar').length > 0) {
            $("#side_bar").empty();
        }

        for (k = 0; k < markers.length; k++) {
            marker = markers[k];
            if (markers[k])
            {
                if (marker.assetflag == 2) {
                    var outputDiv = document.getElementById('side_bar');
                    outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                                        + "<table id='availAmbulance' border='0'>"
                                        + "<tbody>"
                                        + "<tr>"
                                        + "<td>"
                                        + "<strong><a href='javascript:google.maps.event.trigger(openmarker[" + k + "],\"click\");' style='color:#458FD2;' onclick='scrollToTop()'>" + marker.title + '</a></strong><br>' + marker.address + "<br>"
                                        + "</td>"
                                        + "</tr>"
                                        + "</tbody>"
                                        + "</table>"
                                        + "</div>"
                                        + "<hr>";

                    marker.setVisible(true);
                    openmarker = findMarker(marker.position);
                } else {
                    marker.setVisible(false);
                }
            }

        }

        for (l = 0; l < pulses.length; l++) {
            pulse = pulses[l];

            if (pulses[l])
            {
                if (pulse.assetflag == 2) {

                    pulses[l].setMap(map);
                }
                else {
                    pulses[l].setMap(null);
                }
            }

        }


        if (infoBoxList.length > 0) {
            for (var i = 0; i < infoBoxList.length; i++) {
                infoBoxList[i].close();
            }

            // Reset the markers array
            infoBoxList = [];
        }

        $('#getAssets').empty();

        $(".selectpicker").selectpicker('refresh');

        WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $('#getAssets').append($('<option value="0"></option>').val(0).html("Select Vehicle"));
            $.each(data, function (index, item) {
                if (item.Flag == 2) {
                    $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
                }

            });
            $(".selectpicker").selectpicker('refresh');
        });

        document.getElementById("statusTitle").innerHTML = "Driver is on-break";
    }); // end of on click

}); //end of function

/*** Function to Click Logout*/
$(function () {

    $('#logoutAsset').on('click', function () {

        if ($('#side_bar').length > 0) {
            $("#side_bar").empty();
        }

        for (k = 0; k < markers.length; k++) {
            marker = markers[k];

            if (markers[k])
            {
                var timestamp1 = moment.utc(marker.timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);

                if (marker.flag >= 0 && marker.assetflag == 0 || timestamp2 > timestamp1) {
                    if (marker.assetflag != 2) {
                        var outputDiv = document.getElementById('side_bar');
                        outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                                            + "<table id='availAmbulance' border='0'>"
                                            + "<tbody>"
                                            + "<tr>"
                                            + "<td>"
                                            + "<strong><a href='javascript:google.maps.event.trigger(openmarker[" + k + "],\"click\");' style='color:#458FD2;' onclick='scrollToTop()'>" + marker.title + '</a></strong><br>' + marker.address + "<br>"
                                            + "</td>"
                                            + "</tr>"
                                            + "</tbody>"
                                            + "</table>"
                                            + "</div>"
                                            + "<hr>";

                        marker.setVisible(true);
                        openmarker = findMarker(marker.position);
                    }
                    else {
                        marker.setVisible(false);
                    }
                } else {
                    marker.setVisible(false);
                }
            }

        }

        for (l = 0; l < pulses.length; l++) {
            pulse = pulses[l];

            if (pulses[l])
            {
                var timestamp1 = moment.utc(pulse.timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);

                if (pulse.flag >= 0 && pulse.assetflag == 0 || timestamp2 > timestamp1) {
                    if (pulse.assetflag != 2) {
                        pulses[l].setMap(map);
                    }
                }
                else {
                    pulses[l].setMap(null);
                }
            }


        }


        if (infoBoxList.length > 0) {
            for (var i = 0; i < infoBoxList.length; i++) {
                infoBoxList[i].close();
            }

            // Reset the markers array
            infoBoxList = [];
        }

        $('#getAssets').empty();

        $(".selectpicker").selectpicker('refresh');

        WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $('#getAssets').append($('<option value="0"></option>').val(0).html("Select Vehicle"));
            $.each(data, function (index, item) {

                var timestamp1 = moment.utc(item.LastPos.Timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);

                if (item.Jobs.Flag >= 0 && item.Flag == 0 || timestamp2 > timestamp1) {
                    if (item.Flag != 2) $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
                }

            });
            $(".selectpicker").selectpicker('refresh');
        });

        document.getElementById("statusTitle").innerHTML = "Driver is logout";
    }); // end of on click

}); //end of function

/*** Function to Click Available*/
$(function () {

    $('#availableAsset').on('click', function () {

        if ($('#side_bar').length > 0) {
            $("#side_bar").empty();
        }

        for (k = 0; k < markers.length; k++) {
            marker = markers[k];

            if (markers[k])
            {
                var timestamp1 = moment.utc(marker.timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);

                if (marker.flag == 0 && marker.assetflag == 1 && marker.jobStatus != "Incomplete" || marker.flag == 1 && marker.jobStatus == "Scheduled") {
                    var outputDiv = document.getElementById('side_bar');
                    outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                                        + "<table id='availAmbulance' border='0'>"
                                        + "<tbody>"
                                        + "<tr>"
                                        + "<td>"
                                        + "<strong><a href='javascript:google.maps.event.trigger(openmarker[" + k + "],\"click\");' style='color:#458FD2;' onclick='scrollToTop()'>" + marker.title + '</a></strong><br>' + marker.address + "<br>"
                                        + "</td>"
                                        + "</tr>"
                                        + "</tbody>"
                                        + "</table>"
                                        + "</div>"
                                        + "<hr>";

                    marker.setVisible(true);
                    openmarker = findMarker(marker.position);
                }
                else {
                    marker.setVisible(false);
                }
            }

        }

        for (l = 0; l < pulses.length; l++) {
            pulse = pulses[l];

            if (pulses[l])
            {
                var timestamp1 = moment.utc(pulse.timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);

                if (pulse.flag == 0 && pulse.assetflag == 1 && pulse.jobStatus != "Incomplete" || pulse.flag == 1 && pulse.jobStatus == "Scheduled") {

                    pulses[l].setMap(map);
                }
                else {
                    pulses[l].setMap(null);
                }
            }

        }


        if (infoBoxList.length > 0) {
            for (var i = 0; i < infoBoxList.length; i++) {
                infoBoxList[i].close();
            }

            // Reset the markers array
            infoBoxList = [];
        }

        $('#getAssets').empty();

        $(".selectpicker").selectpicker('refresh');

        WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $('#getAssets').append($('<option value="0"></option>').val(0).html("Select Vehicle"));
            $.each(data, function (index, item) {

                var timestamp1 = moment.utc(item.LastPos.Timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);

                if (item.Jobs.Flag == 0 && item.Flag == 1 && item.Jobs.JobStatus != "Incomplete" || item.Jobs.Flag == 1 && item.Jobs.JobStatus == "Scheduled") {
                    $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
                }

            });
            $(".selectpicker").selectpicker('refresh');
        });

        document.getElementById("statusTitle").innerHTML = "Available Ambulance";
    }); // end of on click

}); //end of function

/*** Function to Click All Assets*/
$(function () {

    $('#allAsset').on('click', function () {

        if ($('#side_bar').length > 0) {
            $("#side_bar").empty();
        }

        for (k = 0; k < markers.length; k++) {
            marker = markers[k];

            if (markers[k])
            {
                var timestamp1 = moment.utc(marker.timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);

                var outputDiv = document.getElementById('side_bar');
                outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                                    + "<table id='availAmbulance' border='0'>"
                                    + "<tbody>"
                                    + "<tr>"
                                    + "<td>"
                                    + "<strong><a href='javascript:google.maps.event.trigger(openmarker[" + k + "],\"click\");' style='color:#458FD2;' onclick='scrollToTop()'>" + marker.title + '</a></strong><br>' + marker.address + "<br>"
                                    + "</td>"
                                    + "</tr>"
                                    + "</tbody>"
                                    + "</table>"
                                    + "</div>"
                                    + "<hr>";

                marker.setVisible(true);
                openmarker = findMarker(marker.position);
            }

        }

        for (l = 0; l < pulses.length; l++) {
            pulse = pulses[l];
            if (pulses[l]) {
                pulse.setMap(map);
            }
           
        }


        if (infoBoxList.length > 0) {
            for (var i = 0; i < infoBoxList.length; i++) {
                infoBoxList[i].close();
            }

            // Reset the markers array
            infoBoxList = [];
        }

        $('#getAssets').empty();

        $(".selectpicker").selectpicker('refresh');

        WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

        $.getJSON(WebAPIAsset, function (data) {
            $('#getAssets').append($('<option value="0"></option>').val(0).html("Select Vehicle"));
            $.each(data, function (index, item) {

                $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));

            });
            $(".selectpicker").selectpicker('refresh');
        });

        document.getElementById("statusTitle").innerHTML = "All Ambulance";
    }); // end of on click

}); //end of function

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

            if (infoBoxList.length > 0) {
                for (var i = 0; i < infoBoxList.length; i++) {
                    infoBoxList[i].close();
                }

                // Reset the markers array
                infoBoxList = [];
            }

            //var newInfoWindow;
            //// this -> the marker on which the onclick event is being attached
            //if (!this.getMap().newMarker) {
            //    //newInfoWindow = this.getMap().newMarker = new google.maps.InfoWindow({
            //    //    disableAutoPan: false
            //    //});

            //    newInfoWindow = this.getMap().newMarker = new InfoBubble({
            //        minWidth: getWidth,
            //        minHeight: getHeight,
            //        shadowStyle: 1,
            //        borderRadius: 4,
            //        arrowSize: 15,
            //        borderWidth: 1,
            //        disableAutoPan: false,
            //        hideCloseButton: false,
            //        arrowPosition: 30,
            //        backgroundClassName: 'phoney',
            //        arrowStyle: 2,
            //        title: param.title
            //    });

            //    infoBoxList.push(newInfoWindow);
            //    alert("newInfoWindow1: " + infoBoxList);
            //}


            var newInfoWindow = this.getMap().newMarker = new InfoBubble({
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
                arrowStyle: 2,
                title: param.title
            });

            infoBoxList.push(newInfoWindow);

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
        url: "https://track-asia.com/adswebapi/api/messageinfo",
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
        permissions: ["https://track-asia.com"],
        success: function (msgDriver) {
            //console.log(msgDriver);
            $('#smsMsgDriverEN').val('');
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
        types: $('#autocomplete').val(),
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

        //for (var i = 0; i < infoBoxList.length; i++) {
        //    infoBoxList[i].close(null);
        //}

        if (infoBoxList.length > 0) {
            for (var i = 0; i < infoBoxList.length; i++) {
                infoBoxList[i].close(null);
            }
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
            if (markers[i] === marker) markers[i].setMap(null);
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
        types: $('#autocomplete').val(),
        componentRestrictions: {
            country: 'SG'
        }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);


    autocomplete.setTypes();


}

function codeAddress() {

    document.getElementById("statusTitle").innerHTML = "Available Ambulance";

    $('#getAssets').empty();

    $(".selectpicker").selectpicker('refresh');

    WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    $.getJSON(WebAPIAsset, function (data) {
        $('#getAssets').append($('<option value="0"></option>').val(0).html("Select Vehicle"));
        $.each(data, function (index, item) {

            $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));

        });
        $(".selectpicker").selectpicker('refresh');
    });

    for (k = 0; k < markers.length; k++) {
        marker = markers[k];
        if (markers[k]) marker.setVisible(true);
    }

    for (var i = 0; i < circleCoordinates.length; i++) {
        if (circleCoordinates[i]) circleCoordinates[i].setMap(null);
    }

    if (infoBoxList.length > 0) {
        for (var i = 0; i < infoBoxList.length; i++) {
            if (infoBoxList[i]) infoBoxList[i].close(null);
        }
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
        else if (origin == "") {
            if (nursingFrom != "" || nursingFrom != null) {
                getAddress = $('#nursingFrom').val();
            }
        }
        else if (nursingFrom == "") {
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

            if (address.length == 6 && isNaN(address) == false || address.length == 16 && isNaN(address) == false) {
                sessionStorage.setItem("setSessionstorageValueNewJobCoordinatesFrom", coords);
                var input = sessionStorage.getItem('setSessionstorageValueNewJobCoordinatesFrom');
                var latlngStr = input.split(',', 2);
                var lat = parseFloat(latlngStr[0].replace(/\(/g, ""));
                var lng = parseFloat(latlngStr[1].replace(/\)/g, ""));

                //Reverse Geocode
                var getAPI = "https://track-asia.com/comfortwebapi/api/reversegeocode?PosY=" + lat + "&PosX=" + lng;
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
                if (markers[i] === marker)
                    markers[i].setMap(null); //Check if marker is undefined     
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
    if (toDestination.length == 6 && isNaN(address) == false || toDestination.length == 16 && isNaN(address) == false) {

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
                var getAPI = "https://track-asia.com/comfortwebapi/api/reversegeocode?PosY=" + lat + "&PosX=" + lng;
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
    else {
        //Remove session storage
        sessionStorage.removeItem("setSessionstorageValueNewJobLocationTo");
    }




}

function findClosestN(pt, numberOfResults) {
    var closest = [];
    for (var i = 0; i < markers.length; i++) {
        if (markers[i] === marker) //Check if marker is undefined
        {
            markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, markers[i].getPosition());
            markers[i].setMap(null);
        }

        //if (markers[i].assetflag == 1 && markers[i].flag == 0) closest.push(markers[i]); //Filter logout distance matrix
        if (markers[i]) if (markers[i].assetflag == 1 && markers[i].flag >= 0) closest.push(markers[i]);
    }
    closest.sort(sortByDist);

    return closest.splice(0, numberOfResults);
}

function findMarker(pt) {
    var openmarker = [];
    for (var i = 0; i < markers.length; i++) {
        if (markers[i] === marker) //Check if marker is undefined
        {
            markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, markers[i].getPosition());
        }
        openmarker.push(markers[i]);
    }

    return openmarker.splice(0);
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
			
			    var isChromium = window.chrome,
                vendorName = window.navigator.vendor,
                isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
                isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;

            for (var i = 0; i < numberOfResults; i++) {
                if (closest[i]){ closest[i].setMap(map);
                if (closest[i].assetflag == 1)
                    //if (closest[i].flag == 0 || closest[i].flag == 1 && closest[i].jobStatus == "Scheduled")
                        var timestamp1 = moment.utc(closest[i].timestamp).local().format("DD MMM YYYY");
                var d = new Date();
                var timestamp2 = moment.utc(d).local().format("DD MMM YYYY");
                timestamp2 = Date.parse(timestamp2);
                timestamp1 = Date.parse(timestamp1);
                if (timestamp1 == timestamp2)
					console.log(i);
				if (closest[i].address != "No Address from Google Maps")
                    outputDiv.innerHTML += "<div style='margin-top:10px;'>"
                        + "<table id='availAmbulance' border='0'>"
                        + "<tbody>"
                        + "<tr>"
                        + "<td>"
                        + "<strong><a href='javascript:google.maps.event.trigger(closest[" + i + "],\"click\");' style='color:#458FD2;' onclick='scrollToTop()'>" + closest[i].title + '</a></strong><br>' + closest[i].address + "<br>"
                        + (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false ? "" : results[i].distance.text + ' appoximately' + '<br>')
                        + (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false ? "" : results[i].duration.text) + '<br>'
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
        }
    });

}

function getAvailableAmbulance(cb, title, address, id) {

    var $inputs = $('input:checkbox')

    if (cb.checked == true) {
        //alert('Asset ID: ' + id);
        sessionStorage.setItem("setSessionstorageValueAvailableAmbulance", id);
        searchDriver(id);
        searchDevice(id);
        //alert('You have selected: ' + title);
        $inputs.not(cb).prop('disabled', true);
    }
    else if (cb.checked == false) {
        $inputs.prop('disabled', false); // <-- enable all checkboxes
        //alert('This will reset you have selected');
        //window.location.reload(true);
    }

}

function scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
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
    var apiDriver = 'https://track-asia.com/comfortwebapi/api/driverinfo?ResellerID=' + getReseller + '&CompanyID=' + getCompany + '&AssetID=' + id;
    var apiDevice = 'https://track-asia.com/comfortwebapi/api/deviceinfo?ResellerID=' + getReseller + '&CompanyID=' + getCompany + '&AssetID=' + id;
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
    var apiDevice = 'https://track-asia.com/comfortwebapi/api/deviceinfo?ResellerID=' + getReseller + '&CompanyID=' + getCompany + '&AssetID=' + id;
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
    var apiJobNumber = 'https://track-asia.com/comfortwebapi/api/searchjob?JobNumber=' + getJobNumber;
    //alert(apiJobNumber);

    $.ajax({
        url: 'https://track-asia.com/comfortwebapi/api/hospitalinfo',
        type: 'GET',
        dataType: 'json',
        success: function (hospital, textStatus, xhr) {
            //console.log(hospital);

            $.getJSON(apiJobNumber, function (data) {

                if (data.length == 1 || data.length == 2) {

                    $.each(data, function (index, item) {

                        if (item.JobType == "Scheduled") {
                            if (data.length == 1) alert('Cannot edit Scheduled Job here');
                        }
                        else if (item.JobType == "Normal") {

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
                                var timestamp = moment.utc(Singapore.format()).add('minutes', 495).format('DD-MMM-YYYY, hh:mm:ss A');
                                var jobDateTime = $('#date').val(timestamp);

                                var TOC = moment.tz(item.TOC, Asia);
                                var timeofcall = moment.utc(TOC.format()).add('hours', 8).format('DD-MMM-YYYY, hh:mm:ss A');
                                var jobTOC = $('#toc').val(timeofcall);

                                var jobID = $('#jobid').val(item.JobID);
                                var jobAmount = $('#amount').val(item.Amount);
                                var jobCaller = $('#caller').val(item.Caller);
                                var jobPhone = $('#phone').val(item.Phone);
                                var jobUnit = $('#unit').val(item.Unit);
                                var jobBed = $('#bed').val(item.Bed);
                                var jobPatient = $('#patient').val(item.Patient);
                                var jobRemarks = $('#remarks').val(item.Remarks);

                                var getAddress;


                                for (var i = 0; i < hospital.length; ++i) {

                                    //Get Address from hospital
                                    if (item.Origin == hospital[i].Name) {
                                        getAddress = hospital[i].Address;
                                        sessionStorage.setItem("setSessionstorageValueGetAddress", hospital[i].ShortName);
                                        if (hospital[i].CodeID == 1) {
                                            $('#origin').val(getAddress);
                                            $('#origin').attr('disabled', false);
                                            $('#address').attr('disabled', true);
                                            $('#nursingFrom').attr('disabled', true);
                                        } else if (hospital[i].CodeID == 2) {
                                            $('#nursingFrom').val(getAddress);
                                            $('#nursingFrom').attr('disabled', false);
                                            $('#address').attr('disabled', true);
                                            $('#origin').attr('disabled', true);
                                        } else {
                                            getAddress = $('#address').val(item.Origin);
                                            $('#address').attr('disabled', false);
                                            $('#origin').attr('disabled', true);
                                            $('#nursingFrom').attr('disabled', true);
                                        }
                                    }
                                    else if (item.Origin != hospital[i].Name) {
                                        //if (item.Origin == hospital[i].Name)
                                        getAddress = $('#address').val(item.Origin);
                                        $('#address').attr('disabled', false);
                                        $('#origin').attr('disabled', true);
                                        $('#nursingFrom').attr('disabled', true);
                                    }

                                }


                                var getDestination;


                                for (var i = 0; i < hospital.length; ++i) {

                                    //Get Address from hospital
                                    if (item.Destination == hospital[i].Name) {
                                        getDestination = hospital[i].Name;
                                        sessionStorage.setItem("setSessionstorageValueGetDestination", hospital[i].ShortName);
                                        if (hospital[i].CodeID == 1) {
                                            $('#destination').val(getDestination);
                                            $('#destination').attr('disabled', false);
                                            $('#to-destination').attr('disabled', true);
                                            $('#nursingTo').attr('disabled', true);
                                        } else if (hospital[i].CodeID == 2) {
                                            $('#nursingTo').val(hospital[i].Address);
                                            $('#nursingTo').attr('disabled', false);
                                            $('#to-destination').attr('disabled', true);
                                            $('#destination').attr('disabled', true);
                                        } else {
                                            getDestination = $('#to-destination').val(item.Destination);
                                            $('#to-destination').attr('disabled', false);
                                            $('#destination').attr('disabled', true);
                                            $('#nursingTo').attr('disabled', true);
                                        }
                                    } else if (item.Destination != hospital[i].Name) {
                                        //if (item.Destination == hospital[i].Name)
                                        getDestination = $('#to-destination').val(item.Destination);
                                        $('#to-destination').attr('disabled', false);
                                        $('#destination').attr('disabled', true);
                                        $('#nursingTo').attr('disabled', true);
                                    }

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
                                $('#trip').attr('disabled', true);
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

        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
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
    $("#side_bar").empty();

    $('#origin').attr('disabled', false);
    $('#nursingFrom').attr('disabled', false);
    $('#address').attr('disabled', false);
    $('#destination').attr('disabled', false);
    $('#nursingTo').attr('disabled', false);
    $('#to-destination').attr('disabled', false);
    $('#trip').attr('disabled', false);
    $(".selectpicker").selectpicker('refresh');

}

function sendNewJobAlert(bed, unit, origin, destination) {

    var getDate = $('#date').val();

    var smsAlertDriver = {
        Sender: "Advance Dispatch System",
        Recipients: sessionStorage.getItem('setSessionstorageValueDriverPhone'),
        Message: "New (From: " + origin + " " + unit + " " + bed + "\r\n" + "To: " + destination + " " + "Pickup: " + getDate + ")",
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
        AssetID: sessionStorage.getItem('setSessionstorageValueAvailableAmbulance'),
        JobNumber: sessionStorage.getItem('setSessionstorageValueJobNumber'),
        Notified: 1
    };


    $.ajax({
        url: "https://track-asia.com/adswebapi/api/messageinfo",
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
        permissions: ["https://track-asia.com"],
        success: function (smsAlertDriver) {
            console.log(smsAlertDriver);
        }
    });

}

function sendNewJobAlertTwoWay(origin, destination) {

    var getDate = $('#date').val();

    var smsAlertDriver = {
        Sender: "Advance Dispatch System",
        Recipients: sessionStorage.getItem('setSessionstorageValueDriverPhone'),
        Message: "RTN (From: " + origin + "\r\n" + "To: " + destination + " " + "Pickup: " + getDate + ")",
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
        AssetID: sessionStorage.getItem('setSessionstorageValueAvailableAmbulance'),
        JobNumber: sessionStorage.getItem('setSessionstorageValueJobNumber'),
        Notified: 1
    };


    $.ajax({
        url: "https://track-asia.com/adswebapi/api/messageinfo",
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
        permissions: ["https://track-asia.com"],
        success: function (smsAlertDriver) {
            console.log(smsAlertDriver);
        }
    });

}

function sendCancelAlert(origin, destination) {


    var getDate = $('#date').val();

    var smsAlertDriver = {
        Sender: "Advance Dispatch System",
        Recipients: sessionStorage.getItem('setSessionstorageValueDriverPhone'),
        Message: "Cancelled (From: " + origin + "\r\n" + "To: " + destination + " " + "Pickup: " + getDate + ")",
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
        AssetID: sessionStorage.getItem('setSessionstorageValuePreviousAsset'),
        JobNumber: sessionStorage.getItem('setSessionstorageValueJobNumber'),
        Notified: 1
    };


    $.ajax({
        url: "https://track-asia.com/adswebapi/api/messageinfo",
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
        permissions: ["https://track-asia.com"],
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

        if (selected == "") {
            $('#address').removeAttr('disabled');
            $('#nursingFrom').removeAttr('disabled');
            $('.selectpicker').selectpicker('refresh');
        }
        else {
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

    var labelColor;
    switch (value) {
        case 0:
            value = "Available";
            labelColor = "#8CC152";
            break;
        case 1:
            value = "Pending";
            labelColor = "#FEAB34";
            break;
        case 2:
            value = "Acknowledge";
            labelColor = "#458FD2";
            break;
        case 3:
            value = "Onboard";
            labelColor = "#EB72C1";
            break;
    }

    return '<div class="label label-table" style="background-color:' + labelColor + '"> ' + value + '</div>';
}

function statusFormatter(value, row, index) {

    var labelColor;
    switch (value) {
        case "New":
            labelColor = "#458FD2";
            break;
        case "In Progress":
            labelColor = "#FEAB34";
            break;
        case "Completed":
            labelColor = "#8CC152";
            break;
        case "Scheduled":
            labelColor = "#FEAB34";
            break;
        case "Scheduled In Progress":
            labelColor = "#FEAB34";
            break;
        case "Job Edited":
            labelColor = "#E9573F";
            break;
        case "Scheduled Edited":
            labelColor = "#E9573F";
            break;
    }

    return '<div class="label label-table" style="background-color:' + labelColor + '"> ' + value + '</div>';
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
    else if (row.JobStatus == "Scheduled In Progress" || row.JobStatus == "Scheduled Edited") {
        var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');
        var Singapore = moment.tz(value, Asia);

        //Format UTC
        var timestamp = moment.utc(Singapore.format()).add('minutes', 480).format('HH:mm:ss A');
        return '<div>' + '<span>' + timestamp + '</span>' + '</div>';
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

        WebAPIUser = 'https://track-asia.com/comfortwebapi/api/userinfo?ResellerID=' + '1' + '&CompanyID=' + '1' + '&RoleID=' + getSessionstorageValueRoleID;

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

        WebAPIUser = 'https://track-asia.com/comfortwebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;

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

        WebAPIUser = 'https://track-asia.com/comfortwebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;

        if (getSessionstorageValueRoleID >= 1) {
            $('#getAgents').append($('<option></option>').val("").html("ALL"));
        }

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

    $('.SelectAgentFilter').on('change', function () {

        var selected = $(this).find("option:selected").val();

        var dateFormat = "D-MMM-YYYY, HH:mm:ss A";
        var getTimestampDate = moment().format();
        var Timestamp = moment.tz(getTimestampDate, 'Asia/Singapore');
        var getTimestamp = moment.utc(Timestamp.format()).subtract('hours', 8).format('D-MMM-YYYY, HH:mm:ss A');

        var getDate = moment().format();
        var RxTime = moment.tz(getDate, 'Asia/Singapore');
        var getRxTime = moment.utc(RxTime.format()).add('days', 1).format('D-MMM-YYYY, HH:mm:ss A');

        WebAPIJobs = 'https://track-asia.com/comfortwebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&Agent=' + selected + '&JobType=Normal';

        $('#jobsCreated').bootstrapTable('destroy');

        var checkbox;
        if (getSessionstorageValueRoleID < 6) {
            checkbox = true;
        } else {
            checkbox = false;
        }
        $(document).ready(function () {

            $('#jobsCreated').bootstrapTable(
            {
                idField: 'JobID',
                url: WebAPIJobs,
                columns: [{
                    field: 'state',
                    checkbox: checkbox
                }, {
                    field: 'SN',
                    title: 'SN',
                    formatter: snFormatter
                }, {
                    field: 'JobNumber',
                    title: 'Job Number',
                }, {
                    field: 'JobType',
                    title: 'Job Type',
                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                }, {
                    field: 'JobStatus',
                    title: 'Job Status',
                    formatter: statusFormatter
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
                    field: 'Unit',
                    title: 'Unit'
                }, {
                    field: 'Bed',
                    title: 'Ward/Bed'
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
					field: 'Amount',
					title: 'Amount',
					formatter: totalamountFormatter
				},{
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

            var jobNumber = "JN-" + z + y + q + "-" + NewJobID();
            $('#reference').val('');
            $('#reference').val(jobNumber);

        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });

}

function reloadJobsCreated() {

    var dateFormat = "D-MMM-YYYY, HH:mm:ss A";
    var getTimestampDate = moment().format();
    var Timestamp = moment.tz(getTimestampDate, 'Asia/Singapore');
    var getTimestamp = moment.utc().startOf('day').subtract('minutes', 495).format('D-MMM-YYYY, HH:mm:ss A');

    var getDate = moment().format();
    var RxTime = moment.tz(getDate, 'Asia/Singapore');
    var getRxTime = moment.utc().endOf('day').subtract('minutes', 495).format('D-MMM-YYYY, HH:mm:ss A');

    var WebAPIJobs;
    if (getSessionstorageValueRoleID == 1) {

        WebAPIJobs = 'https://track-asia.com/comfortwebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobType=Normal';
    }
    else if (getSessionstorageValueRoleID == 2) {

        WebAPIJobs = 'https://track-asia.com/comfortwebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobType=Normal';
    }
    else if (getSessionstorageValueRoleID == 3) {

        WebAPIJobs = 'https://track-asia.com/comfortwebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobType=Normal';
    }
    else if (getSessionstorageValueRoleID >= 4) {

        WebAPIJobs = 'https://track-asia.com/comfortwebapi/api/jobinfofilter?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&Agent=' + getSessionstorageValueUser + '&JobType=Normal';
    }

    console.log(WebAPIJobs);

    $('#jobsCreated').bootstrapTable('destroy');

    var checkbox;
    if (getSessionstorageValueRoleID < 6) {
        checkbox = true;
    } else {
        checkbox = false;
    }

    $(document).ready(function () {

        $('#jobsCreated').bootstrapTable(
        {
            idField: 'JobID',
            url: WebAPIJobs,
            columns: [{
                field: 'state',
                checkbox: checkbox
            }, {
                field: 'SN',
                title: 'SN',
                formatter: snFormatter
            }, {
                field: 'JobNumber',
                title: 'Job Number',
            }, {
                field: 'JobType',
                title: 'Job Type',
                class: 'hidden-xs hidden-sm hidden-md hidden-lg'
            }, {
                field: 'JobStatus',
                title: 'Job Status',
                formatter: statusFormatter
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
                field: 'Unit',
                title: 'Unit'
            }, {
                field: 'Bed',
                title: 'Ward/Bed'
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
                field: 'Amount',
                title: 'Amount',
				formatter: totalamountFormatter
            },{
                field: 'Remarks2',
                title: 'Remarks'
            }], onLoadSuccess: function (row) {

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

function totalamountFormatter(value, row) {

    var getTotal = row.Amount + row.NewAmount;

    return '<div>' + '<span><i class="fa fa-usd hidden-xs hidden-md"></i>&nbsp;' + getTotal + '</span>' + '</div>';
}

//Delete Row
var $table = $('#jobsCreated'), $removeEN = $('#jobsCreated-deleteEN');

$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
    $removeEN.prop('disabled', !$table.bootstrapTable('getSelections').length);


});

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

        url = 'https://track-asia.com/comfortwebapi/api/zoneinfo?ResellerID=' + '1' + '&CompanyID=' + '1';

    } else if (getSessionstorageValueRoleID == 2) {
        url = 'https://track-asia.com/comfortwebapi/api/zoneinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    } else if (getSessionstorageValueRoleID >= 3) {

        url = 'https://track-asia.com/comfortwebapi/api/zoneinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;
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
          new algorithm updated by 
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

    WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + '&ResellerID=' + '1' + '&CompanyID=' + '1';

    $.getJSON(WebAPIAsset, function (data) {

        $.each(data, function (index, item) {
            $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2) {

    WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    $.getJSON(WebAPIAsset, function (data) {
        $.each(data, function (index, item) {
            $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID >= 3) {

    WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    $.getJSON(WebAPIAsset, function (data) {
        $.each(data, function (index, item) {
            $('#getAssets').append($('<option></option>').val(item.Name).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });
}


$(document).ready(function () {

    //Load Hospital
    $('#origin').append($('<option value="" selected="selected"></option>').val('').html("Select Hospital..."));
    $('#destination').append($('<option value="" selected="selected"></option>').val('').html("Select Hospital..."));
    $('#nursingFrom').append($('<option value="" selected="selected"></option>').val('').html("Select Nursing Home Community Hospital..."));
    $('#nursingTo').append($('<option value="" selected="selected"></option>').val('').html("Select Nursing Home Community Hospital..."));
    $.getJSON("https://track-asia.com/comfortwebapi/api/hospitalinfo", function (data) {
        $.each(data, function (index, item) {

            if (item.CodeID == 1) {
                $('#origin').append($('<option></option>').val(item.Address).html(item.Name));
                $('#destination').append($('<option></option>').val(item.Name).html(item.Name));
            }
            else if (item.CodeID == 2) {
                $('#nursingFrom').append($('<option></option>').val(item.Address).html(item.Name));
                $('#nursingTo').append($('<option></option>').val(item.Address).html(item.Name));
            }

        });
        $(".selectpicker").selectpicker('refresh');
    });

});


$(function () {

    $('.tgl-menu-btn').click(function () {

        setTimeout(function () {
            $('#jobsCreated').bootstrapTable('resetView');

        }, 500);


    });

    $('#toggle-aside').click(function () {

        setTimeout(function () {
            $('#jobsCreated').bootstrapTable('resetView');

        }, 500);


    });

});


window.onresize = function (event) {
    setTimeout(function () {
        $('#jobsCreated').bootstrapTable('resetView');

    }, 500);
};