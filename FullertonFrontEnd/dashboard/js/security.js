$(document).ready(function () {

    var TrackVersion = "ads";

    var getSessionstorageValueTrackVersion = sessionStorage.getItem('setSessionstorageValueTrackVersion');
    var getSessionstorageValueCompany = localStorage.getItem('setLocalstorageValueSoftware');
    var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');

    if (getSessionstorageValueTrackVersion != TrackVersion || getSessionstorageValueCompany != "COMFORT AMBULANCE") {

       
        window.location.href = 'http://119.75.6.116/tracking/';

    }


});



