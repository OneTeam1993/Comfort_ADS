$(document).ready(function () {

    var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
    var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
    var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
    var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
    var getSessionstorageValueUser = sessionStorage.getItem('setSessionstorageValueUser');

    var WebAPISched = "";
    var WebAPICompleted = "";
    var WebAPIReturn = "";
    var WebAPIJobs;
    var dateFormat = "D-MMM-YYYY, HH:mm:ss A";
    var getTimestampDate = moment().format();
    var Timestamp = moment.tz(getTimestampDate, 'Asia/Singapore');
    //var getTimestamp = moment.utc(Timestamp.format()).subtract('hours', 8).format('D-MMM-YYYY, HH:mm:ss A');
    var getTimestamp = moment.utc().startOf('day').subtract('minutes', 495).format('D-MMM-YYYY, HH:mm:ss A');
    var getAssets = $("#load-assets").val();


    var getDate = moment().format();
    var RxTime = moment.tz(getDate, 'Asia/Singapore');
    //var getRxTime = moment.utc(RxTime.format()).add('days', 1).format('D-MMM-YYYY, HH:mm:ss A');
    var getRxTime = moment.utc().endOf('day').subtract('minutes', 495).format('D-MMM-YYYY, HH:mm:ss A');

    //Scheduled Jobs API
    if (getSessionstorageValueRoleID == 1) {
        WebAPISched = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + "1" + '&AssetCompanyID=' + "1" + '&AssetID=' + "" + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobType=Scheduled' + '&Trip=1' + '&isReturn=1' + '&Flag=1';
    }
    else if (getSessionstorageValueRoleID == 2) {
        WebAPISched = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + "" + '&AssetID=' + "" + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobType=Scheduled' + '&Trip=1' + '&isReturn=1' + '&Flag=1';
    }
    else if (getSessionstorageValueRoleID >= 3) {
        WebAPISched = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&AssetID=' + getAssets + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobType=Scheduled' + '&Trip=1' + '&isReturn=1' + '&Flag=1';
    }

    //Completed Jobs API
    if (getSessionstorageValueRoleID == 1) {
        WebAPICompleted = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + "1" + '&AssetCompanyID=' + "1" + '&AssetID=' + "" + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobStatus=Completed';
    }
    else if (getSessionstorageValueRoleID == 2) {
        WebAPICompleted = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + "" + '&AssetID=' + "" + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobStatus=Completed';
    }
    else if (getSessionstorageValueRoleID >= 3) {
        WebAPICompleted = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&AssetID=' + getAssets + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&JobStatus=Completed';
    }

    //Return Jobs API
    if (getSessionstorageValueRoleID == 1) {
        WebAPIReturn = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + "1" + '&AssetCompanyID=' + "1" + '&AssetID=' + "" + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&Trip=2' + '&JobType=Scheduled' + '&isReturn=2';
    }
    else if (getSessionstorageValueRoleID == 2) {
        WebAPIReturn = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + "" + '&AssetID=' + "" + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&Trip=2' + '&JobType=Scheduled' + '&isReturn=2';
    }
    else if (getSessionstorageValueRoleID >= 3) {
        WebAPIReturn = 'https://track-asia.com/comfortwebapi/api/jobinfo?AssetResellerID=' + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&AssetID=' + getAssets + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime + '&Trip=2' + '&JobType=Scheduled' + '&isReturn=2';
    }

    //New Jobs API
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


    assetMarkerInterval = setInterval(function () {
        countJobs();
    }, '30000');

    countJobs();
    function countJobs()
    {
        $.ajax({
            url: WebAPISched,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                //console.log(data);
                if ($('#countSched').length > 0) document.getElementById("countSched").innerHTML = data.length;
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });

        $.ajax({
            url: WebAPICompleted,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                //console.log(data);
                if ($('#countCompleted').length > 0) document.getElementById("countCompleted").innerHTML = data.length;
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });

        $.ajax({
            url: WebAPIReturn,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                //console.log(data);
                if ($('#countReturn').length > 0) document.getElementById("countReturn").innerHTML = data.length;
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });

        $.ajax({
            url: WebAPIJobs,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                //console.log(data);
                if ($('#countJobs').length > 0) document.getElementById("countJobs").innerHTML = data.length;
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
    }




});