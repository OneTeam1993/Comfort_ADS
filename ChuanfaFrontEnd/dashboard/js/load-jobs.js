

var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');




//Session Storage
$(document).ready(function () {

    //Then retrieve
    var getSessionstorageValueLanguage = sessionStorage.getItem('setSessionstorageValueLanguage');


    //Set
    sessionStorage.setItem("setSessionstorageValueLanguage", getSessionstorageValueLanguage);


    document.documentElement.lang = getSessionstorageValueLanguage;


    $("#load-lang").val(getSessionstorageValueLanguage);


});


//OnChange Session Storage
$(document).ready(function () {

    $('#load-lang').change(function () {

        //sessionStorage.clear();

        sessionStorage.removeItem("setSessionstorageValueLanguage");

        var lang = $("#load-lang").val();

        //Set
        sessionStorage.setItem("setSessionstorageValueLanguage", lang);

        location.reload();


    });


});

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "data/version.txt",
        async: false,
        dataType: "text",
        success: function (data) {


            //Set
            localStorage.setItem("setLocalstorageValueVersion", data);


        },
        error: function () { alert('error'); }
    });

    var version;
    //Then retrieve
    version = localStorage.getItem('setLocalstorageValueVersion');

    document.getElementById("verNum").innerHTML = version;

    document.getElementById("verNumEN").innerHTML = version;

});

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "data/software.txt",
        async: false,
        dataType: "text",
        success: function (data) {


            //Set
            localStorage.setItem("setLocalstorageValueSoftware", data);


        },
        error: function () { alert('error'); }
    });


    //Then retrieve
    var version = localStorage.getItem('setLocalstorageValueSoftware');

    document.getElementById("softwareEN").innerHTML = version;


});





//Storage
$(document).ready(function () {


    try {

        var getAsset = $("#load-assets").val();
        var getCompany = $("#load-company").val();
        var getReseller = $("#load-reseller").val();

        localStorage.setItem("setLocalstorageValueAsset", getAsset);
        localStorage.setItem("setLocalstorageValueCompany", getCompany);
        localStorage.setItem("setLocalstorageValueReseller", getReseller);

        var getLocalstorageValueAsset = localStorage.getItem('setLocalstorageValueAsset');
        var getLocalstorageValueCompany = localStorage.getItem('setLocalstorageValueCompany');
        var getLocalstorageValueReseller = localStorage.getItem('setLocalstorageValueReseller');

    }
    catch (e) {

        alert('You got this error: ' + e);
    }



    //Then retrieve
    var getSessionstorageValueCompany = sessionStorage.getItem('setSessionstorageValueCompany');
    var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
    var getSessionstorageValueEmail = sessionStorage.getItem('setSessionstorageValueEmail');
    var getSessionstorageValueName = sessionStorage.getItem('setSessionstorageValueName');
    var getSessionstorageValueRoleDesc = sessionStorage.getItem('setSessionstorageValueRoleDesc');
    var getSessionstorageValueUser = sessionStorage.getItem('setSessionstorageValueUser');

    if (getSessionstorageValueUser == null | getSessionstorageValueUser == undefined | getSessionstorageValueUser == "") {


        localStorage.clear();
        window.location.href = 'http://66.96.208.81/tracking/'; //Login URL
        //window.location.href = '/'; //Login URL

    }

    else {


        //Set
        sessionStorage.setItem("setSessionstorageValueCompany", getSessionstorageValueCompany);
        sessionStorage.setItem("setSessionstorageValueCompanyID", getSessionstorageValueCompanyID);
        sessionStorage.setItem("setSessionstorageValueEmail", getSessionstorageValueEmail);
        sessionStorage.setItem("setSessionstorageValueName", getSessionstorageValueName);
        sessionStorage.setItem("setSessionstorageValueRoleDesc", getSessionstorageValueRoleDesc);
        sessionStorage.setItem("setSessionstorageValueUser", getSessionstorageValueUser);


        $('#load-username').append($('<div></div>').val(getSessionstorageValueUser).html(getSessionstorageValueUser));
        $('#load-email').append($('<p></p>').val(getSessionstorageValueEmail).html(getSessionstorageValueEmail));

        function loadjscssfile(filename, filetype) {
            if (filetype == "js") { //if filename is a external JavaScript file
                var fileref = document.createElement('script')
                fileref.setAttribute("type", "text/javascript")
                fileref.setAttribute("src", filename)
            }
            else if (filetype == "css") { //if filename is an external CSS file
                var fileref = document.createElement("link")
                fileref.setAttribute("rel", "stylesheet")
                fileref.setAttribute("type", "text/css")
                fileref.setAttribute("href", filename)
            }
            if (typeof fileref != "undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref)
        }

        //loadjscssfile("myscript.js", "js") //dynamically load and add this .js file
        //loadjscssfile("javascript.php", "js") //dynamically load "javascript.php" as a JavaScript file

        //load css
        var css = "";
        switch (getSessionstorageValueRoleDesc) {
            case "Super User":
                css = "super";
                break;
            case "Reseller":
                css = "reseller";
                break;
            case "Master User":
                css = "master";
                break;
            case "Company Administrator":
                css = "companyadmin";
                break;
            case "Administrator":
                css = "administrator";
                break;
            case "User Report":
                css = "viewer";
                break;
            case "User w/o Report":
                css = "viewernoreport";
                break;
        }


        loadjscssfile("css/" + css + ".css", "css") ////dynamically load and add this .css file


    }

});
  

$('#clear-job').on('click', function () {

    bootbox.setDefaults({
        /**
         * @optional String
         * @default: en
         * which locale settings to use to translate the three
         * standard button labels: OK, CONFIRM, CANCEL
         */
        locale: "en",


    });

    bootbox.confirm("<div style='color:black'>Are you sure you wish to clear a job?</div>", function (result) {

        if (result) {

            $.niftyNoty({
                type: 'success',
                icon: 'fa fa-check',
                message: 'Successful',
                container: 'floating',
                timer: 3000
            });


            clearJobForms();

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



var WebAPIDriver = "";

if (getSessionstorageValueRoleID == 1) {
    WebAPIDriver = 'http://66.96.208.81/adswebapi/api/driverinfoex?ResellerID=' + '1' + '&CompanyID=' + '1';
}

else if (getSessionstorageValueRoleID == 2) {
    WebAPIDriver = 'http://66.96.208.81/adswebapi/api/driverinfoex?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

}
else if (getSessionstorageValueRoleID >= 3) {
    WebAPIDriver = 'http://66.96.208.81/adswebapi/api/driverinfoex?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;
}

$.getJSON(WebAPIDriver, function (data) {
    $.each(data, function (index, item) {

        if (item.AssetID != 0) {
            $('#driver').append(
            $('<option data-imagesrc="' + item.Image + '"></option>').val(item.Name).html(item.Name)
            );

        } else {
            $('#driver').append(
            $('<option data-imagesrc="' + item.Image + '"></option>').val(item.Name).html(item.Name)
            );
        }
    });

    $('.selectpicker').selectpicker('refresh');
});


//On Load assets
var WebAPIAsset = "";

if (getSessionstorageValueRoleID == 1) {

    WebAPIAsset = 'http://66.96.208.81/adswebapi/api/assetinfo?UserID=' + '&ResellerID=' + '1' + '&CompanyID=' + '1';

    $('#assets').append($('<option></option>').val("0").html("No Ambulance"));

    $.getJSON(WebAPIAsset, function (data) {

        $.each(data, function (index, item) {
            $('#assets').append($('<option></option>').val(item.AssetID).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2) {

    WebAPIAsset = 'http://66.96.208.81/adswebapi/api/assetinfo?UserID=' + '' + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    $('#assets').append($('<option></option>').val("0").html("No Ambulance"));

    $.getJSON(WebAPIAsset, function (data) {
        $.each(data, function (index, item) {
            $('#assets').append($('<option></option>').val(item.AssetID).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID >= 3) {

    WebAPIAsset = 'http://66.96.208.81/adswebapi/api/assetinfo?UserID=' + '' + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    $('#assets').append($('<option></option>').val("0").html("No Ambulance"));

    $.getJSON(WebAPIAsset, function (data) {
        $.each(data, function (index, item) {
            $('#assets').append($('<option></option>').val(item.AssetID).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });
}


function clearJobForms() {
    $('#jobid').val('');
    $('#case').val('');
    $('#origin').val('');
    $('#destination').val('');
    $('#date').val('');
    $('#amount').val('');
    $('#caller').val('');
    $('#phone').val('');
    $('#patient').val('');
    $('#remarks').val('');
    $('#patientRemarks').val('');
    $("input[name='accessories']:checkbox").prop('checked', false);
    $('#amount').val('SGD ');
}

function sendAlert() {

    var getCaller = $('#caller').val();
    var getPhone = $('#phone').val();
    var getAddress = $('#origin').val();
    var getDestination = $('#destination').val();
    var getDate = $('#date').val();


    var emailAlert = {
        Sender: "Advance Dispatch System",
        Recipients: sessionStorage.getItem('setSessionstorageValueDriverPhone'),
        Message: "Scheduled (From: " + getAddress + "\r\n" + "To: " + getDestination + " " +"Pickup: " + getDate + ")",
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
        AssetID: $('#assets').val(),
	    JobNumber: $('#case').val(),
    };


    $.ajax({
        url: "http://103.237.168.119/adswebapi/api/messageinfo",
        type: "POST",
        data: JSON.stringify(emailAlert),
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
        success: function (emailAlert) {
            console.log(emailAlert);
        }
    });
}

function sendAlertRtn() {

    var getCaller = $('#caller').val();
    var getPhone = $('#phone').val();
    var getAddress = $('#origin').val();
    var getDestination = $('#destination').val();
    var getDate = $('#date').val();


    var emailAlert = {
        Sender: "Advance Dispatch System",
        Recipients: sessionStorage.getItem('setSessionstorageValueDriverPhone'),
        Message: "Scheduled Rtn (From: " + getDestination + "\r\n" + "To: " + getAddress + " " + "Pickup: " + getDate + ")",
        Timestamp: moment().format(),
        RxTime: moment().format(),
        Flag: 1,
        CompanyID: sessionStorage.getItem('setSessionstorageValueCompanyID'),
        AssetID: $('#assets').val(),
        JobNumber: $('#case').val(),
    };


    $.ajax({
        url: "http://103.237.168.119/adswebapi/api/messageinfo",
        type: "POST",
        data: JSON.stringify(emailAlert),
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
        success: function (emailAlert) {
            console.log(emailAlert);
        }
    });
}

$(document).ready(function () {


    $('#amount').val('SGD ');

});

$(function () {

    generateJobNumber();
    $('#date').val(moment().format('DD-MMM-YYYY, HH:mm'));

});


function generateJobNumber() {

    $.ajax({
        url: 'http://66.96.208.81/adswebapi/api/generatejobid',
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
            $('#case').val('');
            $('#case').val(jobNumber);

        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });


}


$(function () {

    $('#origin').keyup(function () {

        var from = $('#origin').val();

        if ($(this).val().length == 6)
        {
            geocoder = new google.maps.Geocoder();

            geocoder.geocode({
                'address': from

            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0].geometry.location);
                    var coords = results[0].geometry.location;

                    sessionStorage.setItem("setSessionstorageValueScheduledJobCoordinatesFrom", coords);
                    var input = sessionStorage.getItem('setSessionstorageValueScheduledJobCoordinatesFrom');
                    var latlngStr = input.split(',', 2);
                    var lat = parseFloat(latlngStr[0].replace(/\(/g, ""));
                    var lng = parseFloat(latlngStr[1].replace(/\)/g, ""));

                    //Reverse Geocode
                    var getAPI = "http://66.96.208.81/adswebapi/api/reversegeocode?PosY=" + lat + "&PosX=" + lng;
                    console.log(getAPI);

                    //$.getJSON(getAPI, function (data) {

                    //    $.each(data, function (index, item) {
                    //        sessionStorage.setItem("setSessionstorageValueScheduledJobLocationFrom", item.Location);
                    //    });

                    //});

                    $.ajax({
                        type: 'GET',
                        url: getAPI,
                        data: { get_param: 'value' },
                        dataType: 'json',
                        success: function (data) {
                            $.each(data, function (index, element) {
                                sessionStorage.setItem("setSessionstorageValueScheduledJobLocationFrom", element.Location);
                            });
                        }
                    });


                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

    });


    $('#destination').keyup(function () {

        var to = $('#destination').val();

        if ($(this).val().length == 6)
        {
            geocoder.geocode({
                'address': to

            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0].geometry.location);
                    var coords = results[0].geometry.location;

                    sessionStorage.setItem("setSessionstorageValueScheduledJobCoordinatesTo", coords);
                    var input = sessionStorage.getItem('setSessionstorageValueScheduledJobCoordinatesTo');
                    var latlngStr = input.split(',', 2);
                    var lat = parseFloat(latlngStr[0].replace(/\(/g, ""));
                    var lng = parseFloat(latlngStr[1].replace(/\)/g, ""));

                    //Reverse Geocode
                    var getAPI = "http://66.96.208.81/adswebapi/api/reversegeocode?PosY=" + lat + "&PosX=" + lng;
                    console.log(getAPI);


                    $.ajax({
                        type: 'GET',
                        url: getAPI,
                        data: { get_param: 'value' },
                        dataType: 'json',
                        success: function (data) {
                            $.each(data, function (index, element) {
                                sessionStorage.setItem("setSessionstorageValueScheduledJobLocationTo", element.Location);
                            });
                        }
                    });


                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

    });


    SearchPlacesFrom();
    SearchPlacesTo();
    //Search Places
    function SearchPlacesFrom() {

        var defaultBounds = new google.maps.LatLngBounds(
           new google.maps.LatLng(1.3000, 103.8000),
           new google.maps.LatLng(1.3000, 103.5710));


        var input = document.getElementById('origin');

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

    function SearchPlacesTo() {

        var defaultBounds = new google.maps.LatLngBounds(
           new google.maps.LatLng(1.3000, 103.8000),
           new google.maps.LatLng(1.3000, 103.5710));


        var input = document.getElementById('destination');

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

});

