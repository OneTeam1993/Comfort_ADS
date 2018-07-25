

var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
//populate the Drop Down List

$(document).ready(function ($) {
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function (event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function () {
                if (window.console) {
                    return console.log('Checking our the events huh?');
                }
            },
            onNavigate: function (direction, itemIndex) {
                if (window.console) {
                    return console.log('Navigating ' + direction + '. Current item: ' + itemIndex);
                }
            }
        });
    });


    // navigateTo
    $(document).delegate('*[data-gallery="navigateTo"]', 'click', function (event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function () {

                var a = this.modal_content.find('.modal-footer a');
                if (a.length > 0) {

                    a.click(function (e) {

                        e.preventDefault();
                        this.navigateTo(2);

                    }.bind(this));

                }

            }
        });
    });


});

//Desktop
if (getSessionstorageValueRoleID == 1) {

$('#load-assets').append(
               $('<option></option>').val(0).html("ALL")
           );
    $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + '&ResellerID=' + "1" + '&CompanyID=' + "1", function (data) {
        $.each(data, function (index, item) {
            $('#load-assets').append(
                 $('<option></option>').val(item.AssetID).html(item.Name)
             );

        });
        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2) {

     $('#load-assets').append(
               $('<option></option>').val(0).html("ALL")
           );
    $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {

            $('#load-assets').append(
                 $('<option></option>').val(item.AssetID).html(item.Name)
             );

        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID >= 3) {
    $('#load-assets').append(
                $('<option></option>').val(0).html("ALL")
            );

    $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {
            $('#load-assets').append(
                 $('<option></option>').val(item.AssetID).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });
}


/*** Function to filter reseller and companies*/
$(function () {

    var selectedCompany = "";
    var selectedReseller = "";

    $('.SelectResellerFilter').on('change', function () {
        selectedReseller = $(this).find("option:selected").val();

        $('#load-company').empty();
        $('#load-company').selectpicker('refresh');
        $('#jobCompany').empty();
        $('#jobCompany').selectpicker('refresh');
        $.getJSON("http://103.237.168.119/adswebapi/api/companyinfo?&ResellerID=" + selectedReseller, function (data) {

            $('#load-company').append($('<option></option>').val(0).html("All"));

            $.each(data, function (index, item) {

                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#jobCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            });

            $('#load-company').selectpicker('refresh');
            $('#jobCompany').selectpicker('refresh');
        });

    });


    $('.SelectCompanyFilter').on('change', function () {
        selectedCompany = $(this).find("option:selected").val();

        var getReseller = $('#load-reseller').val();

        //On Change Company
        $('#jobCompany').empty();
        $("#jobCompany").selectpicker('refresh');

        $.getJSON("http://103.237.168.119/adswebapi/api/companyinfo?ResellerID=" + getReseller, function (data) {

            $.each(data, function (index, item) {

                if (item.CompanyID == selectedCompany) {
                    $('#jobCompany').append($('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name));
                }
                else {
                    $('#jobCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                }

            });

            $('#jobCompany').selectpicker('refresh');
        });

        $('#load-assets').empty();
        $("#load-assets").selectpicker('refresh');
        $('#jobAssets').empty();
        $("#jobAssets").selectpicker('refresh');
        var userReseller;
        if (selectedReseller == '' || selectedReseller == null) {
            userReseller = $("#load-reseller").val();
        } else {
            userReseller = selectedReseller;
        }

        $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + "&ResellerID=" + userReseller + "&CompanyID=" + selectedCompany, function (data) {

            $.each(data, function (index, item) {
                $('#load-assets').append($('<option></option>').val(item.AssetID).html(item.Name));
                $('#jobAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
            });

            $("#load-assets").selectpicker('refresh');
            $("#jobAssets").selectpicker('refresh');
        });

    });

    $('.MobileSelectCompanyFilter').on('change', function () {
        selectedCompany = $(this).find("option:selected").val();

        var getMobileReseller = $('#jobReseller').val();

        //On Change Company
        $('#load-company').empty();
        $("#load-company").selectpicker('refresh');

        $.getJSON("http://103.237.168.119/adswebapi/api/companyinfo?ResellerID=" + getMobileReseller, function (data) {

            $.each(data, function (index, item) {

                if (item.CompanyID == selectedCompany) {
                    $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name));
                }
                else {
                    $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                }
              
            });

            $('#load-company').selectpicker('refresh');
        });

        $('#load-assets').empty();
        $("#load-assets").selectpicker('refresh');
        $('#jobAssets').empty();
        $("#jobAssets").selectpicker('refresh');
        var userReseller;
        if (selectedReseller == '' || selectedReseller == null) {
            userReseller = $("#load-reseller").val();
        } else {
            userReseller = selectedReseller;
        }

        $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + "&ResellerID=" + userReseller + "&CompanyID=" + selectedCompany, function (data) {

            $.each(data, function (index, item) {
                $('#load-assets').append($('<option></option>').val(item.AssetID).html(item.Name));
                $('#jobAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
            });

            $("#load-assets").selectpicker('refresh');
            $("#jobAssets").selectpicker('refresh');
        });

    });
});


$(function () {

    var selectedJobCompany = "";
    var selectedJobReseller = "";

    $('.SelectJobResellerFilter').on('change', function () {
        selectedJobReseller = $(this).find("option:selected").val();

        $('#jobCompany').empty();
        $('#jobCompany').selectpicker('refresh');
        $.getJSON("http://103.237.168.119/adswebapi/api/companyinfo?&ResellerID=" + selectedJobReseller, function (data) {

            //$('#load-company').append($('<option></option>').val(0).html("All"));

            $.each(data, function (index, item) {
                $('#jobCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            });
            $('#jobCompany').selectpicker('refresh');
        });

    });


    $('.SelectJobCompanyFilter').on('change', function () {
        selectedJobCompany = $(this).find("option:selected").val();

        $('#jobAssets').empty();
        $("#jobAssets").selectpicker('refresh');
        var jobReseller;
        if (selectedJobReseller == '' || selectedJobReseller == null) {
            jobReseller = $("#jobReseller").val();
        } else {
            jobReseller = selectedJobReseller;
        }

        $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + "&ResellerID=" + jobReseller + "&CompanyID=" + selectedJobCompany, function (data) {

            $.each(data, function (index, item) {
                $('#jobAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
            });
            $("#jobAssets").selectpicker('refresh');
        });

    });
});


//modal
if (getSessionstorageValueRoleID == 1) {

    $('#jobAssets').append($('<option></option>').val(0).html("No Ambulance"));
    $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + '&ResellerID=' + "1" + '&CompanyID=' + "1", function (data) {
        $.each(data, function (index, item) {
            $('#jobAssets').append(
                 $('<option></option>').val(item.AssetID).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2) {
    $('#jobAssets').append($('<option></option>').val(0).html("No Ambulance"));

    $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {

            $('#jobAssets').append(
                 $('<option></option>').val(item.AssetID).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID >= 3) {

    $('#jobAssets').append($('<option></option>').val(0).html("No Ambulance"));
    $.getJSON("http://103.237.168.119/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {
            $('#jobAssets').append(
                 $('<option></option>').val(item.AssetID).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });
}
var WebAPIDriver = "";

if (getSessionstorageValueRoleID == 1) {
    WebAPIDriver = 'http://103.237.168.119/adswebapi/api/driverinfoex?ResellerID=' + '1' + '&CompanyID=' + '1';
}

else if (getSessionstorageValueRoleID == 2) {
    WebAPIDriver = 'http://103.237.168.119/adswebapi/api/driverinfoex?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

}
else if (getSessionstorageValueRoleID >= 3) {
    WebAPIDriver = 'http://103.237.168.119/adswebapi/api/driverinfoex?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;
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


$(document).ready(function () {

    var WebAPI = "";
    var dateFormat = "D-MMM-YYYY, HH:mm:ss A";
    var getTimestampDate = moment().format();
    var Timestamp = moment.tz(getTimestampDate, 'Asia/Singapore');
    var getTimestamp = moment.utc(Timestamp.format()).subtract('hours', 8).format('D-MMM-YYYY, HH:mm:ss A');
    var getAssets = $("#load-assets").val();


    var getDate = moment().format();
    var RxTime = moment.tz(getDate, 'Asia/Singapore');
    var getRxTime = moment.utc(RxTime.format()).add('month', 12).format('D-MMM-YYYY, HH:mm:ss A');

    if (getSessionstorageValueRoleID == 1) {
        WebAPI = 'http://103.237.168.119/adswebapi/api/jobinfo?AssetResellerID=' + "1" + '&AssetCompanyID=' + "1" + '&AssetID=' + "" + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime;
    }
    else if (getSessionstorageValueRoleID == 2) {
        WebAPI = 'http://103.237.168.119/adswebapi/api/jobinfo?AssetResellerID=' + getSessionstorageValueUserResellerID + '&AssetCompanyID=' + "" + '&AssetID=' + "" + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime;
    }
    else if (getSessionstorageValueRoleID >= 3) {
        WebAPI = 'http://103.237.168.119/adswebapi/api/jobinfo?AssetResellerID=' + '&AssetCompanyID=' + getSessionstorageValueCompanyID + '&AssetID=' + getAssets + '&Timestamp=' + getTimestamp + '&RxTime=' + getRxTime;
    }

    //alert(WebAPI);

    $('#jobs-editable').bootstrapTable({
        idField: 'id',
        url: WebAPI,
        columns: [{
            field: 'state',
            checkbox: 'true'
        }, {
            field: 'SN',
            title: 'SN',
            formatter: snFormatter
        }, {
            field: 'Agent',
            title: 'Agent',
            sortable: 'true'
        }, {
            field: 'JobNumber',
            title: 'Job Number',
            sortable: 'true'
        }, {
            field: 'Asset',
            title: 'Ambulance',
            sortable: 'true'
        },{
            field: 'Patient',
            title: 'Patient',
            sortable: 'true'
        }, {
            field: 'Caller',
            title: 'Caller Name',
            sortable: 'true'
        },{
            field: 'JobDriver',
            title: 'Driver',
            formatter: 'jobdriverFormatter',
            sortable: 'true'
        }, {
            field: 'TOC',
            title: 'Time of Call',
            sortable: 'true',
            formatter: 'timestampFormatter'
        }, {
            field: 'Timestamp',
            title: 'Alert Date',
            sortable: 'true',
            formatter: 'timestampFormatter'
	    }, {
            field: 'Timestamp',
            title: 'Pickup Date',
            sortable: 'true',
            formatter: 'pickupFormatter'
        }, {
            field: 'Bed',
            title: 'Bed/Ward',
            sortable: 'true'
        }, {
            field: 'Accessories',
            title: 'Accessories',
            sortable: 'true',
            formatter: 'accessoriesFormatter'
        }, {
            field: 'Origin',
            title: 'Pickup Location',
            sortable: 'true'
        }, {
            field: 'Destination',
            title: 'Destination',
            sortable: 'true'
        }, {
            field: 'Phone',
            title: 'Phone',
            sortable: 'true'
        }, {
            field: 'Amount',
            title: 'Amount',
            class: 'amount',
            sortable: 'true',
            formatter: 'amountFormatter'
        }, {
            field: 'NewAmount',
            title: 'New Amount',
            sortable: 'true',
            formatter: 'amountFormatter'
        }, {
            field: 'TotalAmount',
            title: 'Total Amount',
            sortable: 'true',
            formatter: 'totalamountFormatter'
        }, {
            field: 'Remarks',
            title: 'Medical Condition',
            sortable: 'true'
        }, {
            field: 'Remarks2',
            title: 'Remarks',
            sortable: 'true'
        }, {
            field: 'Trip',
            title: 'Trip',
            sortable: 'true',
            formatter: tripFormatter
        }, {
            field: 'Payment',
            title: 'Payment',
            sortable: 'true',
            formatter: 'paymentFormatter'
        }, {
            field: 'Receipt',
            title: 'Receipt No.',
            sortable: 'true'
        }, {
	        field: 'JobStatus',
            title: 'Job Status',
            sortable: 'true'
        }, {
            field: 'JobType',
            title: 'Job Type',
            sortable: 'true'

        }],
        onCheck: function (row) {

            $("#buttonNew").hide();
            $("#buttonEdit").show();
            $("#addform").hide();
	        if (row.JobStatus == "In Progress") {
                // replace the contents of the div
                $('#editform').html("Edit New/Transfer Job");
                $("#editform").show();
                var jobAssets = $('#jobAssets').val(row.AssetID);
            }
            else if (row.JobStatus == "Scheduled In Progress") {
                // replace the contents of the div
                $('#editform').html("Edit Scheduled Job");
                $("#editform").show();
                //var jobAssets = $('#jobAssets').val(0);
                var jobAssets = $('#jobAssets').val(row.AssetID);
            }
            
            var jobID = $('#jobid').val(row.JobID);
            var jobNumber = $('#case').val(row.JobNumber);
            var jobPatientName = $('#patient').val(row.Patient);
            var jobMedicalCondition = $('#remarks').val(row.Remarks);
            var jobCallerName = $('#caller').val(row.Caller);
            var jobCallerPhone = $('#phone').val(row.Phone);
            var jobOrigin = $('#origin').val(row.Origin);
            var jobDestination = $('#destination').val(row.Destination);

            var jobDriver = $('#driver').val(row.JobDriver);
            var jobPayment = $('#payment').val(row.Payment);
            var jobTrip = $('#trip').val(row.Trip);
            var jobAmount = $('#amount').val(row.Amount);

            var jobReseller = $('#jobReseller').val(row.AssetResellerID);
            var jobCompany = $('#jobCompany').val(row.AssetCompanyID);


            var deliveryDate = row.Timestamp;
            var Singapore = moment.tz(deliveryDate, 'Asia/Singapore');
            //Format UTC
            var timestamp = moment(Singapore.format()).add('hours', 8).format("D-MMM-YYYY, HH:mm:ss A");
            $('#date').val(timestamp);

            //Convert String to Array
            var getAccessories = row.Accessories;
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




            $('.selectpicker').selectpicker('refresh');
        },

        onUncheck: function (row) {

            window.location.reload(true);
        },

        onLoadSuccess: function (data) {
            $("#buttonEdit").hide();

            var rows = document.getElementById('jobs-editable').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
            if (rows < 1)
            {
                alert('No Jobs!');
            }

            //Get Total Amount
            sessionStorage.setItem("setSessionstorageValueData", JSON.stringify(data));
            getAmount();

        }
    });



});


//Delete Row
var $table = $('#jobs-editable'), $remove = $('#job-confirm-delete'), $removeEN = $('#job-confirm-deleteEN');



$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    $removeEN.prop('disabled', !$table.bootstrapTable('getSelections').length);


});


//  Format for Vehicle Column.
// =================================================================
function vehicleFormatter(value, row) {


    return '<a class="btn-link" id="showVehicle" onClick="showVehicle()">' + value + '</a>';
}


function jobFormatter(value, row) {

    return '<a class="btn-link" id="showJobID">' + '#' + value + '</a>';
}


function totalamountFormatter(value, row) {

    var getTotal = row.Amount + row.NewAmount;

    return '<div>' + '<span><i class="fa fa-usd hidden-xs hidden-md"></i>&nbsp;' + getTotal + '</span>' + '</div>';
}

function paymentFormatter(value, row) {
    var labelColor;
    var text;
    if (value == 1) {
        labelColor = "success";
        text = "Cash";
    } else if (value == 2) {
        labelColor = "warning";
        text = "Billing";
    }

    return '<div class="label label-table label-' + labelColor + '"> ' + text + '</div>';
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


//  Format for Ignition Column.
// =================================================================
function ignitionFormatter(value, row) {
    var labelColor;
    var text;
    if (value == 1) {
        labelColor = "success";
        text = "On";
    } else if (value == 0) {
        labelColor = "dark";
        text = "Off";
    }
    var icon = row.id % 2 === 0 ? 'fa-star' : 'fa-user';
    return '<div class="label label-table label-' + labelColor + '"> ' + text + '</div>';
}


//  Format for Engine Column.
// =================================================================
function engineFormatter(value, row) {
    var labelColor;
    if (value == "MOVE") {
        labelColor = "success";
    } else if (value == "IDLE") {
        labelColor = "warning";
    } else if (value == "STOP") {
        labelColor = "danger";
    }
    var icon = row.id % 2 === 0 ? 'fa-star' : 'fa-user';
    return '<div class="label label-table label-' + labelColor + '"> ' + value + '</div>';
}


//  Format for Timestamp Column.
// =================================================================
function timestampFormatter(value, row) {

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
        var timestamp = moment.utc(Singapore.format()).add('hours', 8).format('D-MMM-YYYY, HH:mm:ss A');


        return '<div>' + '<span><i class="fa fa-clock-o hidden-xs hidden-md"></i>&nbsp;' + timestamp + '</span>' + '</div>';
    }

}

function pickupFormatter(value, row) {

    //Convert Timezone
    var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');

    var Singapore = moment.tz(value, Asia);

    var timestamp = moment.utc(Singapore.format()).add('hours', 8).add('minutes', 15).format('D-MMM-YYYY, HH:mm:ss A');

    return '<div>' + '<span><i class="fa fa-clock-o hidden-xs hidden-md"></i>&nbsp;' + timestamp + '</span>' + '</div>';

}

function flagFormatter(value, row) {
    var labelColor;
    var text;
    if (value == 0) {
        labelColor = "success";
        text = "Sent";
    } else if (value == 1) {
        labelColor = "warning";
        text = "Pending";
    }

    return '<div class="label label-table label-' + labelColor + '"> ' + text + '</div>';
}

// Format for User Name Column.
// =================================================================
function jobdriverFormatter(value, row) {
    var labelColor;
    var text;

    if (value == "")
    {
        labelColor = "success";
        text = "No Driver";
        return '<center><div class="label label-table label-' + labelColor + '">' + text + '</div></center>';
    }
    else
    {
        labelColor = "success";
        return '<center><div class="label label-table label-' + labelColor + '">' + value + '</div></center>';
    }

}
function nameFormatter(value, row) {
    var labelColor;
    var text;

    var getDriverID = row.DriverInfo.DriverID;

    var driverAddress;
    if (row.DriverInfo.Address == '') {
        driverAddress = "No Name";
    } else {
        driverAddress = row.DriverInfo.Address;
    }

    var driverPhone;
    if (row.DriverInfo.Phone == '') {
        driverPhone = "No Phone";
    } else {
        driverPhone = row.DriverInfo.Phone;
    }


    if (row.DriverInfo.DriverID != "0" && row.DriverInfo.ImageFill == "Uniform") {
        text = value;
        return '<center><div style="color:black;"><a href="' + text + '" class="btn-link" data-toggle="lightbox" data-title="' + row.DriverInfo.Name + '" data-footer="' + "<strong>Address: </strong>" + driverAddress + "\n" + "<strong>Phone: </strong>" + driverPhone + '"><img src="' + text + '" class="img-responsive" alt="' + text + '" height="30" width="30"></a></div></center>';

    } else if (row.DriverInfo.DriverID != "0" && row.DriverInfo.ImageFill == "None") {
        labelColor = "success";
        text = row.DriverInfo.Name;
        return '<center><div class="label label-table label-' + labelColor + '">' + text + '</div></center>';

    } else if (row.DriverInfo.DriverID == "0") {
        labelColor = "dark";
        text = "No Driver";

        return '<center><div class="label label-table label-' + labelColor + '">' + text + '</div></center>';

    } 
}

function snFormatter(value, row, index) {

    return index + 1;
}

function accessoriesFormatter(value, row) {

    var text, oxygen, wheelchair, stairchair, stretches;

    var valueAccessories = value.split(",");
    var getOxygen = valueAccessories[0];
    var getWheelChair = valueAccessories[1];
    var getStairChair = valueAccessories[2];
    var getStretches = valueAccessories[3];


    if (getOxygen == 1) { oxygen = "Oxygen"; }
    if (getWheelChair == 2) { wheelchair = "Wheel Chair"; }
    if (getStairChair == 3) { stairchair = "Stair Chair"; }
    if (getStretches == 4) { stretches = "Stretches"; }

    if (oxygen == "undefined" || oxygen == null) { oxygen = ""; }
    if (wheelchair == "undefined" || wheelchair == null) { wheelchair = ""; }
    if (stairchair == "undefined" || stairchair == null) { stairchair = ""; }
    if (stretches == "undefined" || stretches == null) { stretches = ""; }

    text = oxygen + "\r\n" + wheelchair + "\r\n" + stairchair + "\r\n" + stretches;

    return text;

}

function amountFormatter(value, row) {

    return '<div>' + '<span><i class="fa fa-usd hidden-xs hidden-md"></i>&nbsp;' + value + '</span>' + '</div>';
}

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

    //  document.getElementById("software").innerHTML = version;
    document.getElementById("softwareEN").innerHTML = version;


});



var WebAPIReseller = "";

if (getSessionstorageValueRoleID == 1) {

    WebAPIReseller = 'http://103.237.168.119/adswebapi/api/resellerinfo';

    $.getJSON(WebAPIReseller, function (data) {

        //$('#load-reseller').append(
        //$('<option></option>').val(0).html("-------")
        //);

        $.each(data, function (index, item) {
            if (item.ResellerID == 1) {
                $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name));

                $('#jobReseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name));
            } else {
                $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
                $('#jobReseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
            }
        });
        $(".selectpicker").selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID == 2) {

    WebAPIReseller = 'http://103.237.168.119/adswebapi/api/resellerinfo?ResellerID=' + getSessionstorageValueUserResellerID;

    $.getJSON(WebAPIReseller, function (data) {
        $.each(data, function (index, item) {
            $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
            $('#jobReseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID >= 3) {
    $('#formsReseller').remove();
    $('#modalReseller').remove();
}


//Desktop
if (getSessionstorageValueRoleID == 1) {

    $.getJSON("http://103.237.168.119/adswebapi/api/companyinfo?ResellerID=" + "1", function (data) {

        $.each(data, function (index, item) {

            $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            $('#jobCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));

        });
        $(".selectpicker").selectpicker('refresh');
    });

}

else if (getSessionstorageValueRoleID == 2) {

    $.getJSON("http://track.asiacom.co.th/adswebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

        $.each(data, function (index, item) {

            if (item.CompanyID == getSessionstorageValueCompanyID) {
                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name));
                $('#jobCompany').append($('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name));
            }
            else
            {
                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#jobCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            }
        });


        $('.selectpicker').selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID >= 3) {

    $.getJSON("http://103.237.168.119/adswebapi/api/companyinfo?CompanyID=" + getSessionstorageValueCompanyID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {


        $.each(data, function (index, item) {

            $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            $('#jobCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
        });


        $('.selectpicker').selectpicker('refresh');

    });
}


//OnChange Jobs
$(function () {

document.getElementById("clickGenerateEN").onclick = GenerateEN;


function GenerateEN() {

        $("#load-assets :selected").text(); //the text content of the selected option
        var getAsset = $("#load-assets").val(); //the value of the selected option
        var getCompany = $("#load-company").val();
        var getReseller = $("#load-reseller").val();
        var dateFormat = "D-MMM-YYYY, hh:mm:ss A";
        var getTimestamp = $("#dateFrom").val();
        var getRxTime = $("#dateTo").val();

        var convertTimestamp = moment(getTimestamp, dateFormat);
        var convertRxtime = moment(getRxTime, dateFormat);
        var timestamp = moment(convertTimestamp).subtract('hours', 8).format(dateFormat);
        var rxtime = moment(convertRxtime).subtract('hours', 8).format(dateFormat);


        //var jobApi = 'http://103.237.168.119/adswebapi/api/jobinfo?AssetResellerID=' + getReseller + '&AssetCompanyID=' + getCompany + '&AssetID=' + getAsset + '&Timestamp=' + timestamp + '&RxTime=' + rxtime;
        var jobApi = 'http://103.237.168.119/adswebapi/api/jobinfo?AssetResellerID=' + getReseller + '&AssetCompanyID=' + getCompany+ '&AssetID=' + getAsset + '&Timestamp=' + timestamp + '&RxTime=' + rxtime;


            $('#jobs-editable').bootstrapTable('destroy');

            $('#jobs-editable').bootstrapTable({
                idField: 'id',
                url: jobApi,
                columns: [{
                    field: 'state',
                    checkbox: 'true'
                }, {
                    field: 'SN',
                    title: 'SN',
                    formatter: snFormatter
                }, {
                    field: 'Agent',
                    title: 'Agent',
                    sortable: 'true'
                }, {
                    field: 'JobNumber',
                    title: 'Job Number',
                    sortable: 'true'
                }, {
                    field: 'Asset',
                    title: 'Ambulance',
                    sortable: 'true'
                }, {
                    field: 'Patient',
                    title: 'Patient',
                    sortable: 'true'
                },{
                    field: 'Caller',
                    title: 'Caller Name',
                    sortable: 'true'
                }, {
                    field: 'JobDriver',
                    title: 'Driver',
                    formatter: 'jobdriverFormatter',
                    sortable: 'true'
                }, {
                    field: 'TOC',
                    title: 'Time of Call',
                    sortable: 'true',
                    formatter: 'timestampFormatter'
                }, {
                    field: 'Timestamp',
                    title: 'Alert Date',
                    sortable: 'true',
                    formatter: 'timestampFormatter'
		        }, {
                    field: 'Timestamp',
                    title: 'Pickup Date',
                    sortable: 'true',
                    formatter: 'pickupFormatter'
                }, {
                    field: 'Bed',
                    title: 'Bed/Ward',
                    sortable: 'true'
                }, {
                    field: 'Accessories',
                    title: 'Accessories',
                    sortable: 'true',
                    formatter: 'accessoriesFormatter'
                }, {
                    field: 'Origin',
                    title: 'Pickup Location',
                    sortable: 'true'
                }, {
                    field: 'Destination',
                    title: 'Destination',
                    sortable: 'true'
                }, {
                    field: 'Phone',
                    title: 'Phone',
                    sortable: 'true'
                }, {
                    field: 'Amount',
                    title: 'Amount',
                    class: 'amount',
                    sortable: 'true',
                    formatter: 'amountFormatter'
                }, {
                    field: 'NewAmount',
                    title: 'New Amount',
                    sortable: 'true',
                    formatter: 'amountFormatter'
                }, {
                    field: 'TotalAmount',
                    title: 'Total Amount',
                    sortable: 'true',
                    formatter: 'totalamountFormatter'
                }, {
                    field: 'Remarks',
                    title: 'Medical Condition',
                    sortable: 'true'
                }, {
                    field: 'Remarks2',
                    title: 'Remarks',
                    sortable: 'true'
                }, {
                    field: 'Trip',
                    title: 'Trip',
                    sortable: 'true',
                    formatter: tripFormatter
                }, {
                    field: 'Payment',
                    title: 'Payment',
                    sortable: 'true',
                    formatter: 'paymentFormatter'
                }, {
                    field: 'Receipt',
                    title: 'Receipt No.',
                    sortable: 'true'
                }, {
		            field: 'JobStatus',
                    title: 'Job Status',
                    sortable: 'true'
                }, {
                    field: 'JobType',
                    title: 'Job Type',
                    sortable: 'true'

                }],
                onCheck: function (row) {

                    $("#buttonNew").hide();
                    $("#buttonEdit").show();
                    $("#addform").hide();
		                      if (row.JobStatus == "In Progress") {
                        // replace the contents of the div
                        $('#editform').html("Edit New/Transfer Job");
                        $("#editform").show();
                        var jobAssets = $('#jobAssets').val(row.AssetID);
                    }
                    else if (row.JobStatus == "Scheduled In Progress") {
                        // replace the contents of the div
                        $('#editform').html("Edit Scheduled Job");
                        $("#editform").show();
                        var jobAssets = $('#jobAssets').val(0);
                    }

                    var jobID = $('#jobid').val(row.JobID);
                    var jobNumber = $('#case').val(row.JobNumber);
                    var jobPatientName = $('#patient').val(row.Patient);
                    var jobMedicalCondition = $('#remarks').val(row.Remarks);
                    var jobCallerName = $('#caller').val(row.Caller);
                    var jobCallerPhone = $('#phone').val(row.Phone);
                    var jobOrigin = $('#origin').val(row.Origin);
                    var jobDestination = $('#destination').val(row.Destination);

                    var jobDriver = $('#driver').val(row.JobDriver);
                    var jobPayment = $('#payment').val(row.Payment);
                    var jobTrip = $('#trip').val(row.Trip);
                    var jobAmount = $('#amount').val(row.Amount);

                    var jobReseller = $('#jobReseller').val(row.AssetResellerID);
                    var jobCompany = $('#jobCompany').val(row.AssetCompanyID);
                    //var jobAssets = $('#jobAssets').val(row.AssetID);

                    var deliveryDate = row.Timestamp;
                    var Singapore = moment.tz(deliveryDate, 'Asia/Singapore');
                    //Format UTC
                    var timestamp = moment(Singapore.format()).add('hours', 8).format("D-MMM-YYYY, HH:mm:ss A");
                    $('#date').val(timestamp);

                    //Convert String to Array
                    var getAccessories = row.Accessories;
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
  




                    $('.selectpicker').selectpicker('refresh');
                },

                onUncheck: function (row) {

                    window.location.reload(true);
                },

                onLoadSuccess: function (data) {
                    $("#buttonEdit").hide();

                    var rows = document.getElementById('jobs-editable').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                    if (rows < 1) {
                        alert('No Jobs!');
                    }



                }
            });
      

    }


});



//OnChange Filter
$(document).ready(function () {


    $('#load-assets').change(function () {
        localStorage.setItem("setLocalstorageValueAsset", $(this).val());

    });

    $('#load-reseller').change(function () {
        localStorage.setItem("setLocalstorageValueReseller", $(this).val());

    });

    $('#load-company').change(function () {

        localStorage.setItem("setLocalstorageValueCompany", $(this).val());

    });


    $('#speedLimit').change(function () {
        localStorage.setItem("setLocalstorageValueSpeedLimit", $(this).val());

    });


    $('#dateFrom').on('change', function () {
        localStorage.setItem("setLocalstorageValueDateFrom", $(this).val());
    });

    $('#dateTo').on('change', function () {
        localStorage.setItem("setLocalstorageValueDateTo", $(this).val());
    });


});
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

    $("input[name='accessories']:checkbox").prop('checked', false);
    $('#amount').val('$SGD ');
}

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
        window.location.href = 'http://track.asiacom.co.th/royal/'; //Login URL
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
  


$(function () {

    $('.tgl-menu-btn').click(function () {

        setTimeout(function () {
            $('#jobs-editable').bootstrapTable('resetView');

        }, 500);


    });


});


window.onresize = function (event) {
    setTimeout(function () {
        $('#jobs-editable').bootstrapTable('resetView');

    }, 500);
};

