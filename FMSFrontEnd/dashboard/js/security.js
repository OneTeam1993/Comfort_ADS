$(document).ready(function () {

    var TrackVersion = "ads";

    var getSessionstorageValueTrackVersion = sessionStorage.getItem('setSessionstorageValueTrackVersion');
     var getSessionstorageValueCompany = localStorage.getItem('setLocalstorageValueSoftware');

    if (getSessionstorageValueTrackVersion != TrackVersion || getSessionstorageValueCompany != "COMFORT AMBULANCE") {

       
        window.location.href = 'http://track.asiacom.co.th/comfort/';

    }


});



