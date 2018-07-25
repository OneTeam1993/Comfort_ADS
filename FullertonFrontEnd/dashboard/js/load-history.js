

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


//Load Events
$.getJSON("http://119.75.6.116/adswebapi/api/statusinfo", function (data) {
    $.each(data, function (index, item) {

        if (item.StatusID != 4) {
            $('#load-events').append(
                 $('<option></option>').val(item.StatusID).html(item.StatusDesc)
             );
        }
    });

    $(".selectpicker").selectpicker('refresh');
});




//Desktop
if (getSessionstorageValueRoleID == 1) {

    $('#load-assets').append($('<option value="" selected=""></option>').val('').html("ALL"));
    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + '&ResellerID=' + "1" + '&CompanyID=' + "1", function (data) {
        $.each(data, function (index, item) {
            $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2) {
    $('#load-assets').append($('<option value="" selected=""></option>').val('').html("ALL"));
    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {
            $('#load-assets').append(
                 $('<option></option>').val(item.Name).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID == 3) {
    $('#selectCompany').remove();
    $('#load-assets').append($('<option value="" selected=""></option>').val('').html("ALL"));
    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {
            $('#load-assets').append(
                 $('<option></option>').val(item.Name).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID >= 4) {
    $('#selectCompany').remove();
    $('#load-assets').append($('<option value="" selected=""></option>').val('').html("ALL"));
    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {
            $('#load-assets').append(
                 $('<option></option>').val(item.Name).html(item.Name)
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

        $('#mobile-load-reseller').empty();
        $('.MobileSelectResellerFilter').selectpicker('refresh');

        if (getSessionstorageValueRoleID == 1) {
            $.getJSON("http://119.75.6.116/adswebapi/api/resellerinfo", function (data) {
                $.each(data, function (index, item) {

                    if (item.ResellerID == selectedReseller) {
                        $('#mobile-load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name)
                     );
                    }
                    else {
                        $('#mobile-load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
                    }

                });

                var getReseller = $("#load-reseller").val();
                sessionStorage.setItem("setSessionstorageValueAssetReseller", getReseller);
                $('#mobile-load-reseller').selectpicker('refresh');
            });
        }
        else if (getSessionstorageValueRoleID == 2) {
            $.getJSON("http://119.75.6.116/adswebapi/api/resellerinfo?ResellerID=" + selectedReseller, function (data) {
                $.each(data, function (index, item) {

                    if (item.ResellerID == selectedReseller) {
                        $('#mobile-load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name));
                    }
                });

                var getReseller = $("#load-reseller").val();
                sessionStorage.setItem("setSessionstorageValueAssetReseller", getReseller);
                $('#mobile-load-reseller').selectpicker('refresh');
            });
        }
        else if (getSessionstorageValueRoleID >= 3) {
            $('#mobile-load-reseller').remove();
        }

        $('#mobile-load-company').empty();
        $(".MobileSelectCompanyFilter").selectpicker('refresh');

        $('#load-company').empty();
        $(".SelectCompanyFilter").selectpicker('refresh');

        $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?&ResellerID=" + selectedReseller, function (data) {

            $('#mobile-load-company').append($('<option></option>').val(0).html("-------"));
            $('#load-company').append($('<option></option>').val(0).html("-------"));

            $.each(data, function (index, item) {
                $('#mobile-load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            });

            $(".MobileSelectCompanyFilter").selectpicker('refresh');
            $(".SelectCompanyFilter").selectpicker('refresh');
        });


        $('#mobile-load-assets').empty();
        $('#mobile-load-assets').append($('<option></option>').val(0).html("-------"));
        $(".MobileSelectVechsFilter").selectpicker('refresh');

        $('#load-assets').empty();
        $('#load-assets').append($('<option></option>').val(0).html("-------"));
        $(".SelectVechsFilter").selectpicker('refresh');

    });


    $('.SelectCompanyFilter').on('change', function () {
        selectedCompany = $(this).find("option:selected").val();

        //Select New Company
        $('#mobile-load-company').empty();
        $('.MobileSelectCompanyFilter').selectpicker('refresh');

        if (getSessionstorageValueRoleID == 1) {
            $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?&ResellerID=" + "1", function (data) {

                $.each(data, function (index, item) {

                    if (item.CompanyID == selectedCompany) {
                        $('#mobile-load-company').append(
                         $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                     );
                    }
                    else {
                        $('#mobile-load-company').append(
                         $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                     );
                    }
                });
                var getCompany = $("#load-company").val();
                sessionStorage.setItem("setSessionstorageValueAssetCompany", getCompany);
                $('#mobile-load-company').selectpicker('refresh');
            })
        }
        else if (getSessionstorageValueRoleID == 2) {
            $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

                $.each(data, function (index, item) {

                    if (item.CompanyID == selectedCompany) {
                        $('#mobile-load-company').append(
                         $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                     );
                    }
                    else {
                        $('#mobile-load-company').append(
                         $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                     );
                    }

                });
                var getCompany = $("#load-company").val();
                sessionStorage.setItem("setSessionstorageValueAssetCompany", getCompany);
                $('#mobile-load-company').selectpicker('refresh');
            });
        }
        else if (getSessionstorageValueRoleID >= 3) {
            $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?CompanyID=" + getSessionstorageValueCompanyID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {


                $.each(data, function (index, item) {

                    if (item.CompanyID == selectedCompany) {
                        $('#mobile-load-company').append(
                         $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                     );
                    }
                    else {
                        $('#mobile-load-company').append(
                         $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                     );
                    }

                });

                var getCompany = $("#load-company").val();
                sessionStorage.setItem("setSessionstorageValueAssetCompany", getCompany);
                $('#mobile-load-company').selectpicker('refresh');

            });
        }

        //Load New Assets
        $('#mobile-load-assets').empty();
        $('.MobileSelectVechsFilter').selectpicker('refresh');
        $('#load-assets').empty();
        $('SelectVechsFilter').selectpicker('refresh');
        var getReseller = $('#load-reseller').val();
        var getCompany = $('#load-company').val();

        var userReseller;
        if (selectedReseller == '' || selectedReseller == null) {
            userReseller = $("#load-reseller").val();
        } else {
            userReseller = selectedReseller;
        }

        if (getSessionstorageValueRoleID == 1) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + '&ResellerID=' + getReseller + '&CompanyID=' + getCompany, function (data) {

                $.each(data, function (index, item) {

                    $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                });

                $('.MobileSelectVechsFilter').selectpicker('refresh');
                $(".SelectVechsFilter").selectpicker('refresh');
            });

        }
        else if (getSessionstorageValueRoleID == 2) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getCompany, function (data) {

                $.each(data, function (index, item) {

                    $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));

                });

                $('.MobileSelectVechsFilter').selectpicker('refresh');
                $(".SelectVechsFilter").selectpicker('refresh');
            });
        }
        else if (getSessionstorageValueRoleID >= 3) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getCompany, function (data) {
                $.each(data, function (index, item) {

                    $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));

                });

                $('.MobileSelectVechsFilter').selectpicker('refresh');
                $(".SelectVechsFilter").selectpicker('refresh');
            });
        }

    });
});



if (getSessionstorageValueRoleID == 1) {

    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo", function (data) {
        $.each(data, function (index, item) {
            $('#load-assets2').append(
                 $('<option></option>').val(item.Name).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2) {

    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID, function (data) {
        $.each(data, function (index, item) {
            $('#load-assets2').append(
                 $('<option></option>').val(item.Name).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID >= 3) {

    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {
            $('#load-assets2').append(
                 $('<option></option>').val(item.Name).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });
}


$.getJSON("http://119.75.6.116/adswebapi/api/categoryinfo", function (data) {
    $.each(data, function (index, item) {
        $('#load-category').append(
             $('<option></option>').val(item.CategoryDesc).html(item.CategoryDesc)
         );

    });

    $(".selectpicker").selectpicker('refresh');
});


//  Format for Vehicle Column.
// =================================================================
function vehicleFormatter(value, row) {

    return '<a class="btn-link" id="showVehicle" onClick="showVehicle()">' + value + '</a>';
}

function snFormatter(value, row, index) {

    return index + 1;
}

//  Format for Mileage Column.
// =================================================================
function mileageFormatter(value, row) {

    var roundoff = Math.round(value * 100) / 100;
    return '<span>' + roundoff + ' Km' + '</span>';
}

//  Format for Speed  Column.
// =================================================================
function speedFormatter(value, row) {

    var convertKmPerHour = value * 1.60934;
    var roundoff = Math.round(convertKmPerHour * 100) / 100;

    return '<span>' + roundoff + ' Km/h' + '</span>';
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

//  Format for Barlight Column.
// =================================================================
function barlightFormatter(value, row) {
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

    if (timestamp < rxtime)
    {
        return '<div>' + '<span>&nbsp;-</span>' + '</div>';
    }
    else
    {
        //Convert Timezone
        var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');
        var Singapore = moment.tz(value, Asia);
        //Format UTC
        //var timestamp = moment(Singapore.format()).format("D-MMM-YYYY, hh:mm:ss A");
        var timestamp = moment.utc(Singapore.format()).add('hours', 8).format('D-MMM-YYYY, HH:mm:ss');


        return '<div>' + '<span><i class="fa fa-clock-o hidden-xs hidden-md"></i>&nbsp;' + timestamp + '</span>' + '</div>';
    }


}

function pickuptimestampFormatter(value, row) {

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
        //var timestamp = moment(Singapore.format()).format("D-MMM-YYYY, hh:mm:ss A");
        var timestamp = moment.utc(Singapore.format()).add('minutes', 495).format('D-MMM-YYYY, HH:mm:ss');


        return '<div>' + '<span><i class="fa fa-clock-o hidden-xs hidden-md"></i>&nbsp;' + timestamp + '</span>' + '</div>';
    }


}

function rxtimeFormatter(value, row) {


    //Convert Timezone
    var Asia = moment.tz.add('Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0');

    var Singapore = moment.tz(value, Asia);

    //Format UTC
    var timestamp = moment.utc(Singapore.format()).add('hours', 8).format('D-MMM-YYYY, HH:mm:ss');

    var rxtimestamp = moment(Singapore.format()).format("D-MMM-YYYY");


    if (rxtimestamp == "1-Jan-2000")
    {
        return;
    }
    else
    {
        return '<div>' + '<span><i class="fa fa-clock-o hidden-xs hidden-md"></i>&nbsp;' + timestamp + '</span>' + '</div>';
    }



}

function numberHoursFormatter(value, row) {

    var dateFormat = "HH:mm:ss";
    var timestamp = moment(row.Timestamp).subtract('hours', 0).format(dateFormat);
    var rxtime = moment(row.RxTime).add('hours', 0).format(dateFormat);

    var convertTimestamp = moment(timestamp, dateFormat);
    var convertRxtime = moment(rxtime, dateFormat);
    var duration = '<div>' + moment.duration(convertRxtime - convertTimestamp).humanize() + '</div>';


    return '<div>' +  duration + '</div>';

}

function amountFormatter(value, row) {

    return '<div>' + '<span><i class="fa fa-usd hidden-xs hidden-md"></i>&nbsp;' + value + '</span>' + '</div>';
}

function totalamountFormatter(value, row) {

    var getTotal = row.Amount + row.NewAmount;

    return '<div>' + '<span><i class="fa fa-usd hidden-xs hidden-md"></i>&nbsp;' + getTotal + '</span>' + '</div>';
}

function amountFormatter(value, row) {

    return '<div>' + '<span><i class="fa fa-usd hidden-xs hidden-md"></i>&nbsp;' + value + '</span>' + '</div>';
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

function driveridFormatter(value, row) {

    if (value == null) {

        return '<a class="btn-link" id="showVehicle">' + '#' + 'No Driver ID' + '</a>';
    }
    else {
        return '<a class="btn-link" id="showVehicle">' + '#' + value + '</a>';
    }
}

function nameFormatter(value, row) {
    var labelColor;
    var text;

    var getDriverID = row.DriverInfo.DriverID;

    var driverAddress;
    if (row.DriverInfo.Address == '') {
        driverAddress = "No Address";
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
        return '<center><div style="color:blck;"><a href="' + text + '" class="btn-link" data-toggle="lightbox" data-title="' + row.DriverInfo.Name + '" data-footer="' + "<strong>Address: </strong>" + driverAddress + "\n" + "<strong>Phone: </strong>" + driverPhone + '"><img src="' + text + '" class="img-responsive" alt="' + text + '" height="30" width="30"></a></div></center>';

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

function accessoriesFormatter(value, row) {

    var text, oxygen, wheelchair, stairchair, stretches;

    var valueAccessories = value.split(",");

    if (valueAccessories.length == 4)
    {
        var getOxygen = valueAccessories[0];
        var getWheelChair = valueAccessories[1];
        var getStairChair = valueAccessories[2];
        var getStretches = valueAccessories[3];

        if (getOxygen == 1) { oxygen = "Oxygen"; }
        if (getWheelChair == 2) { wheelchair = "Wheel Chair"; }
        if (getStairChair == 3) { stairchair = "Stair Chair"; }
        if (getStretches == 4) { stretches = "Stretcher"; }
    }
    else if (valueAccessories.length == 3) {
        var getOxygen = valueAccessories[0];
        var getWheelChair = valueAccessories[1];
        var getStairChair = valueAccessories[2];
        if (getOxygen == 1) { oxygen = "Oxygen"; }
        if (getOxygen == 2) { wheelchair = "Wheel Chair"; }
        if (getOxygen == 3) { stairchair = "Stair Chair"; }
        if (getOxygen == 4) { stretches = "Stretcher"; }
        if (getWheelChair == 1) { oxygen = "Oxygen"; }
        if (getWheelChair == 2) { wheelchair = "Wheel Chair"; }
        if (getWheelChair == 3) { stairchair = "Stair Chair"; }
        if (getWheelChair == 4) { stretches = "Stretcher"; }
        if (getStairChair == 1) { oxygen = "Oxygen"; }
        if (getStairChair == 2) { wheelchair = "Wheel Chair"; }
        if (getStairChair == 3) { stairchair = "Stair Chair"; }
        if (getStairChair == 4) { stretches = "Stretcher"; }
    }
    else if (valueAccessories.length == 2) {
        var getOxygen = valueAccessories[0];
        var getWheelChair = valueAccessories[1];
        if (getOxygen == 1) { oxygen = "Oxygen"; }
        if (getOxygen == 2) { wheelchair = "Wheel Chair"; }
        if (getOxygen == 3) { stairchair = "Stair Chair"; }
        if (getOxygen == 4) { stretches = "Stretcher"; }
        if (getWheelChair == 1) { oxygen = "Oxygen"; }
        if (getWheelChair == 2) { wheelchair = "Wheel Chair"; }
        if (getWheelChair == 3) { stairchair = "Stair Chair"; }
        if (getWheelChair == 4) { stretches = "Stretcher"; }
    }
    else if (valueAccessories.length == 1)
    {
        var getOxygen = valueAccessories[0];

        if (getOxygen == 1) { oxygen = "Oxygen"; }
        if (getOxygen == 2) { wheelchair = "Wheel Chair"; }
        if (getOxygen == 3) { stairchair = "Stair Chair"; }
        if (getOxygen == 4) { stretches = "Stretcher"; }
    }


    if (oxygen == "undefined" || oxygen == null) {oxygen = "";}
    if (wheelchair == "undefined" || wheelchair == null) {wheelchair = "";}
    if (stairchair == "undefined" || stairchair == null) {stairchair = "";}
    if (stretches == "undefined" || stretches == null) {stretches = "";}

    text = oxygen + "\r\n" + wheelchair + "\r\n" + stairchair + "\r\n" + stretches;

    return text;
  
}

//<!--Filter-Vehicle-->
(function (document) {
    'use strict';

    var VehicleTableFilter = (function (Arr) {


        var _select;


        function _onSelectEvent(e) {
            _select = e.target;
            var tables = document.getElementsByClassName(_select.getAttribute('data-table'));
            Arr.forEach.call(tables, function (table) {
                Arr.forEach.call(table.tBodies, function (tbody) {
                    Arr.forEach.call(tbody.rows, _filterSelect);
                });
            });
        }

        function _filter(row) {

            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';

        }

        function _filterSelect(row) {

            var text_select = row.textContent.toLowerCase(), val_select = _select.options[_select.selectedIndex].value.toLowerCase();
            row.style.display = text_select.indexOf(val_select) === -1 ? 'none' : 'table-row';

        }


        return {
            init: function () {
                var selects = document.getElementsByClassName('select-vehicle-filter');
                Arr.forEach.call(selects, function (select) {
                    select.onchange = _onSelectEvent;


                });
            }
        };
    })(Array.prototype);

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            VehicleTableFilter.init();

        }
    });

})(document);


//Hide Elements
$(document).ready(function () {
    options = {
        clearOnHide: true
    }
    $('[visibly]').Visibly();
})


//Select Report                                 
$(function () {



    $("#playback").hide();
    $("#viewLocation").hide();
    //Click Generate

    document.getElementById("clickGenerateEN").onclick = Generate;

    function Generate() {

        localStorage.removeItem("setLocalstorageValueReport");

        var e = document.getElementById("load-report");
        var strReport = e.options[e.selectedIndex].value;

        var reports = "";
        switch (strReport) {
            case "Positions":
                reports = "reports-positions";
                break;
            case "Speed":
                reports = "reports-speed";
                break;
            case "Mileage":
                reports = "reports-mileage";
                break;
            case "Utilization (Type 1)":
                reports = "reports-utilization";
                break;
            case "Events":
                reports = "reports-events";
                break;
            case "Messages":
                reports = "reports-messages";
                break;
            case "Jobs":
                reports = "reports-jobs";
                break;
            case "Job Status":
                reports = "reports-jobstatus";
                break;
            case "Call Center":
                reports = "reports-callcenter";
                break;
            case "Trip":
                reports = "reports-trip";
                break;
            case "Payment":
                reports = "reports-payment";
                break;
            case "Paramedic":
                reports = "reports-paramedic";
                break;
            case "Driver":
                reports = "reports-driver";
                break;
	        case "Type":
                reports = "reports-type";
                break;
            case "Comprehensive Vehicle Report":
                reports = "reports-cvr";
                break;
            case "Barlight":
                reports = "reports-barlight";
                break;

        }


        //Set
        localStorage.setItem("setLocalstorageValueReport", reports);


        $("#load-assets :selected").text(); //the text content of the selected option
        var getAsset = $("#load-assets").val(); //the value of the selected option       
        var getCompany = $("#load-company").val();
        var getReseller = $("#load-reseller").val();
        var getTimestamp = $("#dateFrom").val();
        var getRxTime = $("#dateTo").val();
        var getSpeed = $("#speedLimit").val();
        var getStatusID = $("#load-events").val();
        var getFlag = $("#load-messages").val();
        var dateFormat = "D-MMM-YYYY, hh:mm:ss A";
        var getPayment = $("#payment").val();
        var getJobStatus = $("#jobStatus").val();
        var getAgent = $("#agent").val();
        var getTrip = $("#trip").val();
	    var getDriver = $("#driver").val();
        var getType = $("#type").val();

        var convertTimestamp = moment(getTimestamp, dateFormat);
        var convertRxtime = moment(getRxTime, dateFormat);

        var timestamp = moment(convertTimestamp).subtract('hours', 8).format(dateFormat);
        var rxtime = moment(convertRxtime).subtract('hours', 8).format(dateFormat);

        var duration = '<div style="color:white">Selected Date:&nbsp;' + moment.duration(convertRxtime - convertTimestamp).humanize() + ' duration</div>';


        var validateTimestamp = moment(getTimestamp, dateFormat).isValid();
        var validateRxTime = moment(getRxTime, dateFormat).isValid();


        var convertMilesPerHour = getSpeed / 1.60934;


        //if (timestamp < rxtime) {
            // alert("Entered date is greater than today's date ");


            if (validateTimestamp == true && validateRxTime == true) {

                var getLocalstorageValueRetrieveReport = localStorage.getItem('setLocalstorageValueReport');
                localStorage.setItem('setLocalstorageValueReport', getLocalstorageValueRetrieveReport);

                var WebApiCVR = "";
                var WebApi = "";
                var WebApiBarlight = "";
                var jobApi = "";
                var WebApiMessages = "http://103.237.168.119/adswebapi/api/messageinfo?Asset=" + getAsset + "&Flag=" + getFlag + "&Timestamp=" + timestamp + "&RxTime=" + rxtime;
                if (getAsset == "")
                {
                    if (getReseller == "" || getReseller == "undefined" || getReseller == null)
                    {
                        getReseller = getSessionstorageValueUserResellerID;
                    }
                        
                    if (getCompany == "" || getCompany == "undefined" || getCompany == null)
                    {
                        getCompany = getSessionstorageValueCompanyID;
                    }

                    WebApiCVR = "http://119.75.6.116/adswebapi/api/cvrinfo?&CompanyID=" + getCompany + "&Timestamp=" + timestamp + "&RxTime=" + rxtime + "&Speed=" + convertMilesPerHour;
                    WebApi = "http://119.75.6.116/adswebapi/api/posinfo?&CompanyID=" + getCompany + "&Timestamp=" + timestamp + "&RxTime=" + rxtime + "&Speed=" + convertMilesPerHour;
                    WebApiBarlight = "http://119.75.6.116/adswebapi/api/posinfo?&CompanyID=" + getCompany + "&Timestamp=" + timestamp + "&RxTime=" + rxtime + "&Barlight=1";
                    jobApi = 'http://119.75.6.116/adswebapi/api/jobinfo?AssetResellerID=' + getReseller + '&AssetCompanyID=' + getCompany + '&Timestamp=' + timestamp + '&RxTime=' + rxtime + '&Flag=0' + '&Payment=' + getPayment + '&JobStatus=' + getJobStatus + '&Agent=' + getAgent + '&Trip=' + getTrip + '&JobDriver=' + getDriver + '&JobType=' + getType;
                }
                else
                {
                    if (getReseller == "" || getReseller == "undefined" || getReseller == null)
                    {
                        getReseller = getSessionstorageValueUserResellerID;
                    }
                        
                    if (getCompany == "" || getCompany == "undefined" || getCompany == null)
                    {
                        getCompany = getSessionstorageValueCompanyID;
                    }
                    
                    WebApiCVR = "http://119.75.6.116/adswebapi/api/cvrinfo?Asset=" + getAsset + "&Speed=" + convertMilesPerHour + "&CompanyID=" + getCompany + "&Timestamp=" + timestamp + "&RxTime=" + rxtime;
                    WebApi = "http://119.75.6.116/adswebapi/api/posinfo?Asset=" + getAsset + "&Speed=" + convertMilesPerHour + "&CompanyID=" + getCompany + "&Timestamp=" + timestamp + "&RxTime=" + rxtime;
                    WebApiBarlight = "http://119.75.6.116/adswebapi/api/posinfo?Asset=" + getAsset + "&Speed=" + convertMilesPerHour + "&Barlight=1" + "&CompanyID=" + getCompany + "&Timestamp=" + timestamp + "&RxTime=" + rxtime;
                    jobApi = 'http://119.75.6.116/adswebapi/api/jobinfo?AssetResellerID=' + getReseller + '&AssetCompanyID=' + getCompany + '&Asset=' + getAsset + '&Timestamp=' + timestamp + '&RxTime=' + rxtime + '&Flag=0' + '&Payment=' + getPayment + '&JobStatus=' + getJobStatus + '&Agent=' + getAgent + '&Trip=' + getTrip + '&JobDriver=' + getDriver + '&JobType=' + getType;            
                }
                

                var WebApiEvent;
                var getEvents = document.getElementById("load-events");
                var strEvent = getEvents.options[getEvents.selectedIndex].value;
            

                if (getLocalstorageValueRetrieveReport == "reports-positions") {
                    console.log("WebAPI:" + WebApi);
                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalPosition").innerHTML = duration;


                    //Positions Table
                    $(document).ready(function () {

                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'PosID',
                                url: WebApi,
                                columns: [{
                                    field: 'PosID',
                                    title: 'id',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'Asset',
                                    title: 'Vehicle',
                                    formatter: vehicleFormatter
                                }, {
                                    field: 'Tag',
                                    title: 'Device',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'Driver',
                                    title: 'Driver'
                                }, {
                                    field: 'Location',
                                    title: 'Location'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Timestamp',
                                    sortable: 'true',
                                    formatter: timestampFormatter
                                }, {
                                    field: 'Speed',
                                    title: 'Speed',
                                    formatter: speedFormatter
                                }, {
                                    field: 'Mileage',
                                    title: 'Mileage',
                                    formatter: mileageFormatter,
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'Engine',
                                    title: 'Engine',
                                    sortable: 'true',
                                    formatter: engineFormatter
                                }, {
                                    field: 'Ignition',
                                    title: 'Ignition',
                                    sortable: 'true',
                                    formatter: ignitionFormatter
                                }, {
                                    field: 'BarLight',
                                    title: 'Bar Light',
                                    sortable: 'true',
                                    formatter: barlightFormatter
                                }],

                                onLoadSuccess: function (data) {

                                    //console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));

                                    if (data == "")
                                    {
                                        $('#chartPositionStatus').hide();
                                        $('#chartPositionIgnition').hide();
                                        alert('No Position data!');

                                    }
                                    else
                                    {
                                        $('#chartPositionStatus').show();
                                        $('#chartPositionIgnition').show();
                                        //Set
                                        //sessionStorage.setItem("setSessionstorageValueData", JSON.stringify(data));
                                        //drawPositionChartStatus();
                                        //drawPositionChartIgnition();
                                    }

                                },

                                onClickRow: function (row) {
                                    //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    //Store
                                    localStorage.setItem("row", JSON.stringify(row));

                                    var width = 640;
                                    var height = 360;


                                    $('#myModal').modal("show");

                                    $("#myModal iframe").attr({
                                        'src': 'report_map.html',
                                        'height': height,
                                        'width': width,
                                    });

                                }

                            });


                    });


                }

                else if (getLocalstorageValueRetrieveReport == "reports-speed") {

                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalSpeed").innerHTML = duration;
                    //Speed Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'PosID',
                                url: WebApi,
                                columns: [{
                                    field: 'PosID',
                                    title: 'id',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'Asset',
                                    title: 'Vehicle',
                                    //title: 'พาหนะ',
                                    formatter: vehicleFormatter
                                }, {
                                    field: 'Tag',
                                    title: 'Device',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                    //title: 'เครื่อง'
                                }, {
                                    field: 'Driver',
                                    title: 'Driver'
                                }, {
                                    field: 'Speed',
                                    title: 'Speed',
                                    formatter: speedFormatter
                                    //title: 'ความเร็ว'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Timestamp',
                                    sortable: 'true',
                                    //title: 'การประทับเวลา',
                                    formatter: timestampFormatter
                                }, {
                                    field: 'Engine',
                                    title: 'Engine',
                                    sortable: 'true',
                                    //title: 'เครื่องยนต์',
                                    formatter: engineFormatter
                                }, {
                                    field: 'Ignition',
                                    title: 'Ignition',
                                    sortable: 'true',
                                    //title: 'การเผาไหม้',
                                    formatter: ignitionFormatter
                                }, {
                                    field: 'BarLight',
                                    title: 'Bar Light',
                                    sortable: 'true',
                                    formatter: barlightFormatter
                                }],

                                onLoadSuccess: function (data, row) {

                                    if (data == "") {

                                        alert('No data!');
                                    }

                                },

                                onClickRow: function (row) {
                                    //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    //Store
                                    localStorage.setItem("row", JSON.stringify(row));

                                    var width = 640;
                                    var height = 360;


                                    $('#myModal').modal("show");

                                    $("#myModal iframe").attr({
                                        'src': 'report_map.html',
                                        'height': height,
                                        'width': width,
                                    });
      

                                },

                            });

                    });

                }


                else if (getLocalstorageValueRetrieveReport == "reports-mileage") {

                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalMileage").innerHTML = duration;
                    //Mileage Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'PosID',
                                url: WebApi,
                                columns: [{
                                    field: 'PosID',
                                    title: 'id',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'Asset',
                                    title: 'Vehicle',
                                    //title: 'พาหนะ',
                                    formatter: vehicleFormatter
                                }, {
                                    field: 'Tag',
                                    title: 'Device',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                    //title: 'เครื่อง'
                                }, {
                                    field: 'Mileage',
                                    title: 'Mileage',
                                    formatter: mileageFormatter
                                    //title: 'การสะสมไมล์'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Timestamp',
                                    sortable: 'true',
                                    //title: 'การประทับเวลา',
                                    formatter: timestampFormatter
                                }, {
                                    field: 'Speed',
                                    title: 'Speed',
                                    formatter: speedFormatter
                                    //title: 'แบตเตอรี่'
                                }, {
                                    field: 'Engine',
                                    title: 'Engine',
                                    sortable: 'true',
                                    //title: 'เครื่องยนต์',
                                    formatter: engineFormatter
                                }, {
                                    field: 'Ignition',
                                    title: 'Ignition',
                                    sortable: 'true',
                                    //title: 'การเผาไหม้',
                                    formatter: ignitionFormatter
                                }, {
                                    field: 'BarLight',
                                    title: 'Bar Light',
                                    sortable: 'true',
                                    formatter: barlightFormatter
                                }],

                                onLoadSuccess: function (data, row) {

                                    if (data == 1) {
                                       
                                        alert('No data!');
                                    }
                                    else
                                    {
                                        //Set
                                        sessionStorage.setItem("setSessionstorageValueData", JSON.stringify(data));
                                        drawMileageChart();

                                    }

                                },

                                onClickRow: function (row) {
                                    //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    //Store
                                    localStorage.setItem("row", JSON.stringify(row));


                                    var width = 640;
                                    var height = 360;


                                    $('#myModal').modal("show");

                                    $("#myModal iframe").attr({
                                        'src': 'report_map.html',
                                        'height': height,
                                        'width': width,
                                    });





                                }
                              

                            });

                    });


                }


                else if (getLocalstorageValueRetrieveReport == "reports-utilization") {

                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalUtilization").innerHTML = duration;
                    //Utilization Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'PosID',
                                url: WebApi,
                                columns: [{
                                    field: 'PosID',
                                    title: 'id',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'Asset',
                                    title: 'Vehicle',
                                    //title: 'พาหนะ',
                                    formatter: vehicleFormatter
                                }, {
                                    field: 'Tag',
                                    title: 'Device',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                    //title: 'เครื่อง'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Timestamp',
                                    //title: 'การประทับเวลา',
                                    formatter: timestampFormatter
                                }, {
                                    field: 'Speed',
                                    title: 'Speed'
                                    //title: 'แบตเตอรี่'
                                }, {
                                    field: 'Engine',
                                    title: 'Engine',
                                    //title: 'เครื่องยนต์',
                                    formatter: engineFormatter
                                }, {
                                    field: 'Ignition',
                                    title: 'Ignition',
                                    //title: 'การเผาไหม้',
                                    formatter: ignitionFormatter
                                }],

                                onLoadSuccess: function (row) {

                                 
                                    if (data == "") {
                                       
                                        alert('No data!');
                                    }
                                    else
                                    {
                                        drawChart();
                                    }


                                },
                                onClickRow: function (row) {
                                    //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    //Store
                                    localStorage.setItem("row", JSON.stringify(row));


                                    //Then retrieve
                                    var localObj = JSON.parse(localStorage.getItem(row));


                                    //if (Modernizr.localstorage) {
                                    //    $("#Perimeter").text('localStorage is available');
                                    //} else {
                                    //    $("#Perimeter").text('localStorage is not available');
                                    //}

                                    var panel1 = $.jsPanel({
                                        iframe: {
                                            src: "report_pie.html",
                                            id: "myFrame",
                                            style: { "display": "none", "border": "10px solid transparent" },
                                            width: '100%',
                                            height: '100%'
                                        },

                                        callback: function () {
                                            document.getElementById("myFrame").onload = function () {
                                                $("#myFrame").fadeIn(1000);
                                            }
                                        },
                                        size: { width: 425, height: 425 },
                                        position: { left: "center", top: 30 },
                                        title: row.Asset, //Utilization Report
                                        theme: "black"
                                    });

                                },
                            });

                    });
                }

                else if (getLocalstorageValueRetrieveReport == "reports-events") {

                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalEvents").innerHTML = duration;


                    if (strEvent == 12 | strEvent == 13) {
                        WebApiEvent = "http://119.75.6.116/adswebapi/api/eventinfo/?StatusID=" + getStatusID + "&Timestamp=" + timestamp + "&RxTime=" + rxtime + '&CompanyID=' + getCompany + '&AckRoleID=' + getSessionstorageValueRoleID;

                        //User Login/Logout Table
                        $(document).ready(function () {

                            $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                                {
                                    idField: 'EventID',
                                    url: WebApiEvent,
                                    columns: [{
                                        field: 'EventID',
                                        title: 'id',
                                        class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                    }, {
                                        field: 'SN',
                                        title: 'SN',
                                        formatter: snFormatter
                                    }, {
                                        field: 'Timestamp',
                                        title: 'Timestamp',
                                        //title: 'การประทับเวลา',
                                        formatter: timestampFormatter
                                    }, {
                                        field: 'Event',
                                        title: 'Event'
                                    }, {
                                        field: 'Remarks',
                                        title: 'Remarks'
                                    }],

                                    onLoadSuccess: function (data) {

                                        if (data == "") {
                                            
                                            alert('No data!');
                                        }

                                    }
                                });

                        });
                    }
                    else if (strEvent == 17 | strEvent == 18) {
                        WebApiEvent = "http://119.75.6.116/adswebapi/api/eventinfo/?Asset=" + getAsset + "&StatusID=" + getStatusID + "&Timestamp=" + timestamp + "&RxTime=" + rxtime;

                        //Zone Enter/Exit Table
                        $(document).ready(function () {

                            $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                                {
                                    idField: 'EventID',
                                    url: WebApiEvent,
                                    columns: [{
                                        field: 'EventID',
                                        title: 'id',
                                        class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                    }, {
                                        field: 'SN',
                                        title: 'SN',
                                        formatter: snFormatter
                                    }, {
                                        field: 'Timestamp',
                                        title: 'Timestamp',
                                        formatter: timestampFormatter
                                    }, {
                                        field: 'Event',
                                        title: 'Event'
                                    }, {
                                        field: 'Remarks',
                                        title: 'Remarks'
                                    }, {
                                        field: 'Asset',
                                        title: 'Vehicle',
                                        formatter: vehicleFormatter
                                    }, {
                                        field: 'Location',
                                        title: 'Last Known Location'
                                    }, ],

                                    onLoadSuccess: function (data) {

                                        if (data == "") {
                                     
                                            alert('No data!');
                                        }

                                    },

                                    onClickRow: function (row) {
                                        //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                        var getEvent = row.Event;

                                        if (getEvent == "Zone Enter" || getEvent == "Zone Exit") {

                                            //Store
                                            localStorage.setItem("row", JSON.stringify(row));

                                            var width = 640;
                                            var height = 360;


                                            $('#myModal').modal("show");

                                            $("#myModal iframe").attr({
                                                'src': 'history_event.html',
                                                'height': height,
                                                'width': width,
                                            });


                                        }
                                    }

                                });

                        });

                    }

                    else if (strEvent == 19) {
                        WebApiEvent = "http://119.75.6.116/adswebapi/api/eventinfo/?Asset=" + getAsset + "&StatusID=" + getStatusID + "&Timestamp=" + timestamp + "&RxTime=" + rxtime;

                        //Speed Limit Table
                        $(document).ready(function () {

                            $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                                {
                                    idField: 'EventID',
                                    url: WebApiEvent,
                                    columns: [{
                                        field: 'EventID',
                                        title: 'id',
                                        class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                    }, {
                                        field: 'SN',
                                        title: 'SN',
                                        formatter: snFormatter
                                    }, {
                                        field: 'Timestamp',
                                        title: 'Timestamp',
                                        formatter: timestampFormatter
                                    }, {
                                        field: 'Event',
                                        title: 'Event'
                                    }, {
                                        field: 'Remarks',
                                        title: 'Remarks'
                                    }, {
                                        field: 'Speed',
                                        title: 'Speed',
                                        formatter: speedFormatter
                                    }, {
                                        field: 'Asset',
                                        title: 'Vehicle',
                                        formatter: vehicleFormatter
                                    }, ],

                                    onLoadSuccess: function (data) {

                                        if (data == "") {
                                   
                                            alert('No data!');
                                        }

                                    },

                                    onClickRow: function (row) {
                                        //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    }

                                });

                        });

                    }

                    else if (strEvent == 20) {
                        WebApiEvent = "http://119.75.6.116/adswebapi/api/eventinfo/?Asset=" + getAsset + "&StatusID=" + getStatusID + "&Timestamp=" + timestamp + "&RxTime=" + rxtime;

                        //Driver Break Table
                        $(document).ready(function () {

                            $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                                {
                                    idField: 'EventID',
                                    url: WebApiEvent,
                                    columns: [{
                                        field: 'EventID',
                                        title: 'id',
                                        class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                    }, {
                                        field: 'SN',
                                        title: 'SN',
                                        formatter: snFormatter
                                    }, {
                                        field: 'Asset',
                                        title: 'Vehicle',
                                        formatter: vehicleFormatter
                                    }, {
                                        field: 'Timestamp',
                                        title: 'Start',
                                        formatter: timestampFormatter
                                    }, {
                                        field: 'RxTime',
                                        title: 'End',
                                        formatter: timestampFormatter
                                    }, {
                                        field: 'Duration',
                                        title: 'Duration',
                                        formatter: numberHoursFormatter
                                    }, {
                                        field: 'Event',
                                        title: 'Event'
                                    }, {
                                        field: 'Remarks',
                                        title: 'Remarks'
                                    } ],

                                    onLoadSuccess: function (row) {

                                        var rows = document.getElementById('reports-events').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                        if (rows <= 1) {
                                     
                                            alert('No data!');
                                        }

                                    },

                                    onClickRow: function (row) {
                                        //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    }

                                });

                        });

                    }

                    else if (strEvent == 21) {
                        WebApiEvent = "http://119.75.6.116/adswebapi/api/eventinfo/?Asset=" + getAsset + "&StatusID=" + getStatusID + "&Timestamp=" + timestamp + "&RxTime=" + rxtime;

                        //Onboard & Offload Table
                        $(document).ready(function () {

                            $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                                {
                                    idField: 'EventID',
                                    url: WebApiEvent,
                                    columns: [{
                                        field: 'EventID',
                                        title: 'id',
                                        class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                    }, {
                                        field: 'SN',
                                        title: 'SN',
                                        formatter: snFormatter
                                    }, {
                                        field: 'Asset',
                                        title: 'Vehicle',
                                        formatter: vehicleFormatter
                                    }, {
                                        field: 'Timestamp',
                                        title: 'Start',
                                        formatter: timestampFormatter
                                    }, {
                                        field: 'RxTime',
                                        title: 'End',
                                        formatter: timestampFormatter
                                    }, {
                                        field: 'Duration',
                                        title: 'Duration',
                                        formatter: numberHoursFormatter
                                    }, {
                                        field: 'Event',
                                        title: 'Event'
                                    }, {
                                        field: 'Remarks',
                                        title: 'Remarks'
                                    }],

                                    onLoadSuccess: function (row) {

                                        var rows = document.getElementById('reports-events').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                        if (rows <= 1) {

                                            alert('No data!');
                                        }
                                    },

                                    onClickRow: function (row) {
                                        //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    }

                                });

                        });

                    }

                }

                else if (getLocalstorageValueRetrieveReport == "reports-messages") {

                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalMessages").innerHTML = duration;
                    //Messages Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'MessageID',
                                url: WebApiMessages,
                                columns: [{
                                    field: 'MessageID',
                                    title: 'id',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'Timestamp',
                                    title: 'Timestamp',
                                    formatter: timestampFormatter
                                }, {
                                    field: 'Flag',
                                    title: 'Status',
                                    formatter: flagFormatter
                                }, {
                                    field: 'Sender',
                                    title: 'From'
                                }, {
                                    field: 'Recipients',
                                    title: 'To'
                                }, {
                                    field: 'Asset',
                                    title: 'Vehicle',
                                    formatter: vehicleFormatter
                                }, {
                                    field: 'Message',
                                    title: 'Message'
                                }, ],

                                onLoadSuccess: function (row) {

                                    //console.log('Messages: onLoadSuccess, data: ' + JSON.stringify(row));

                                    var rows = document.getElementById('reports-messages').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 1) {
                                     
                                        alert('No data!');
                                    }

                                },

                            });

                    });
                }

                else if (getLocalstorageValueRetrieveReport == "reports-jobs") {
                    console.log("JobAPI:" + jobApi);
                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalJobs").innerHTML = duration;

                    //Jobs Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'id',
                                url: jobApi,
                                columns: [{
                                    field: 'JobID',
                                    title: 'Job id',
                                    sortable: 'true',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'JobNumber',
                                    title: 'Job Number',
                                    sortable: 'true'
                                }, {
                                    field: 'Asset',
                                    title: 'Ambulance',
                                    sortable: 'true'
                                }, {
                                    field: 'Caller',
                                    title: 'Caller Name',
                                    sortable: 'true'
                                }, {
                                    field: 'TOC',
                                    title: 'Time of Call',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Pickup Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
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
                                    title: 'Remarks',
                                    sortable: 'true'
                                }, {
                                    field: 'Receipt',
                                    title: 'Receipt No.',
                                    sortable: 'true'
                                }, {
				                    field: 'JobDriver',
                                    title: 'Driver',
                                    sortable: 'true'
                                }, {
                                    field: 'JobStatus',
                                    title: 'Job Status'
                                }, {
                                    field: 'Payment',
                                    title: 'Payment',
                                    formatter: 'paymentFormatter'
                                }],

                                onLoadSuccess: function (data, row) {


                                    if (data == "") {
                                     
                                        alert('No Jobs Found!');                                       
                                    } 
                                    else
                                    {
                                        //Set
                                        drawJobChart(data);
                                    }
                             
                                }

                            });

                    });
                }

                else if (getLocalstorageValueRetrieveReport == "reports-jobstatus") {
                    console.log("JobAPI:" + jobApi);
                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalJobStatus").innerHTML = duration;

                    //Job Status Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'id',
                                url: jobApi,
                                columns: [{
                                    field: 'JobID',
                                    title: 'Job id',
                                    sortable: 'true',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'JobNumber',
                                    title: 'Job Number',
                                    sortable: 'true'
                                }, {
                                    field: 'Asset',
                                    title: 'Ambulance',
                                    sortable: 'true'
                                }, {
                                    field: 'Caller',
                                    title: 'Caller Name',
                                    sortable: 'true'
                                }, {
                                    field: 'TOC',
                                    title: 'Time of Call',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Pickup Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
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
                                },  {
                                    field: 'Receipt',
                                    title: 'Receipt No.',
                                    sortable: 'true'
                                }, {
                                    field: 'JobStatus',
                                    title: 'Job Status',
                                    sortable: 'true'
                                }],

                                onLoadSuccess: function (data, row) {

                                    //Check if no data
                                    var rows = document.getElementById('reports-jobstatus').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 0) {
                                       
                                        alert('No Jobs Found!');
                                    }

                                    //Set
                                    drawJobStatusChart(data);

                                },

                            });

                    });
                }

                else if (getLocalstorageValueRetrieveReport == "reports-callcenter") {
                    console.log("JobAPI:" + jobApi);
                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalCallCenter").innerHTML = duration;

                    //Call Center Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'id',
                                url: jobApi,
                                columns: [{
                                    field: 'JobID',
                                    title: 'Job id',
                                    sortable: 'true',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'JobNumber',
                                    title: 'Job Number',
                                    sortable: 'true'
                                }, {
                                    field: 'Asset',
                                    title: 'Ambulance',
                                    sortable: 'true'
                                }, {
                                    field: 'Caller',
                                    title: 'Caller Name',
                                    sortable: 'true'
                                }, {
                                    field: 'TOC',
                                    title: 'Time of Call',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Pickup Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
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
                                    field: 'Receipt',
                                    title: 'Receipt No.',
                                    sortable: 'true'
                                }, {
                                    field: 'Agent',
                                    title: 'Call Center',
                                    sortable: 'true'
                                }],

                                onLoadSuccess: function (data, row) {

                                    //Check if no data
                                    var rows = document.getElementById('reports-callcenter').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 0) {
                                    
                                        alert('No Jobs Found!');
                                    }

                                    //Set
                                    drawCallCenterChart(data);

                                },

                            });

                    });
                }

                else if (getLocalstorageValueRetrieveReport == "reports-trip") {
                    console.log("JobAPI:" + jobApi);
                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalTrip").innerHTML = duration;

                    //Trip Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'id',
                                url: jobApi,
                                columns: [{
                                    field: 'JobID',
                                    title: 'Job id',
                                    sortable: 'true',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'JobNumber',
                                    title: 'Job Number',
                                    sortable: 'true'
                                }, {
                                    field: 'Asset',
                                    title: 'Ambulance',
                                    sortable: 'true'
                                }, {
                                    field: 'Caller',
                                    title: 'Caller Name',
                                    sortable: 'true'
                                }, {
                                    field: 'TOC',
                                    title: 'Time of Call',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Pickup Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
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
                                    field: 'Receipt',
                                    title: 'Receipt No.',
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
                                },{
                                    field: 'Trip',
                                    title: 'Trip',
                                    sortable: 'true',
                                    formatter: 'tripFormatter'
                                }],

                                onLoadSuccess: function (data, row) {

                                    //Check if no data
                                    var rows = document.getElementById('reports-trip').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 0) {
                                       
                                        alert('No Jobs Found!');
                                    }

                                    //Set
                                    sessionStorage.setItem("setSessionstorageValueData", JSON.stringify(data));
                                    drawTripChart(data);

                                },

                            });

                    });
                }

                else if (getLocalstorageValueRetrieveReport == "reports-payment") {
                    console.log("JobAPI:" + jobApi);
                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalPayment").innerHTML = duration;

                    //Payment Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'id',
                                url: jobApi,
                                columns: [{
                                    field: 'JobID',
                                    title: 'Job id',
                                    sortable: 'true',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'JobNumber',
                                    title: 'Job Number',
                                    sortable: 'true'
                                }, {
                                    field: 'Asset',
                                    title: 'Ambulance',
                                    sortable: 'true'
                                }, {
                                    field: 'Caller',
                                    title: 'Caller Name',
                                    sortable: 'true'
                                }, {
                                    field: 'TOC',
                                    title: 'Time of Call',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Pickup Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
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
                                    field: 'Receipt',
                                    title: 'Receipt No.',
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
                                    class: 'amount',
                                    sortable: 'true',
                                    formatter: 'amountFormatter'
                                }, {
                                    field: 'Payment',
                                    title: 'Payment',
                                    sortable: 'true',
                                    formatter: 'paymentFormatter'
                                }],

                                onLoadSuccess: function (data, row) {

                                    //Check if no data
                                    var rows = document.getElementById('reports-payment').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 0) {
                                    
                                        alert('No Jobs Found!');
                                    }


                                    //Set
                                    drawPaymentChart(data);

                                },

                            });

                    });
                }

                else if (getLocalstorageValueRetrieveReport == "reports-paramedic") {
                    console.log("JobAPI:" + jobApi);
                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalParamedic").innerHTML = duration;

                    //Paramedic Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'id',
                                url: jobApi,
                                columns: [{
                                    field: 'JobID',
                                    title: 'Job id',
                                    sortable: 'true',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'JobNumber',
                                    title: 'Job Number',
                                    sortable: 'true'
                                }, {
                                    field: 'Asset',
                                    title: 'Ambulance',
                                    sortable: 'true'
                                }, {
                                    field: 'Caller',
                                    title: 'Caller Name',
                                    sortable: 'true'
                                }, {
                                    field: 'TOC',
                                    title: 'Time of Call',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Pickup Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
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
                                    field: 'Receipt',
                                    title: 'Receipt No.',
                                    sortable: 'true'
                                }, {
                                    field: 'JobDriver',
                                    title: 'Driver',
                                    sortable: 'true'
                                },{
                                    field: 'Paramedic',
                                    title: 'Paramedic',
                                    sortable: 'true'
                                }],

                                onLoadSuccess: function (data, row) {

                                    //Check if no data
                                    var rows = document.getElementById('reports-paramedic').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 0) {
                                   
                                        alert('No Jobs Found!');
                                    }

                                    //Set
                                    sessionStorage.setItem("setSessionstorageValueData", JSON.stringify(data));
                                    drawParamedicChart(data);

                                },

                            });

                    });
                }

                else if (getLocalstorageValueRetrieveReport == "reports-driver") {
                    console.log("JobAPI:" + jobApi);
                    $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
                    document.getElementById("timeIntervalDriver").innerHTML = duration;

                    //Driver Table
                    $(document).ready(function () {


                        $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'id',
                                url: jobApi,
                                columns: [{
                                    field: 'JobID',
                                    title: 'Job id',
                                    sortable: 'true',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'JobNumber',
                                    title: 'Job Number',
                                    sortable: 'true'
                                }, {
                                    field: 'Asset',
                                    title: 'Ambulance',
                                    sortable: 'true'
                                }, {
                                    field: 'TOC',
                                    title: 'Time of Call',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Pickup Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
                                }, {
                                    field: 'Origin',
                                    title: 'Pickup Location',
                                    sortable: 'true'
                                }, {
                                    field: 'Destination',
                                    title: 'Destination',
                                    sortable: 'true'
                                },  {
                                    field: 'Receipt',
                                    title: 'Receipt No.',
                                    sortable: 'true'
                                },  {
                                    field: 'Paramedic',
                                    title: 'Paramedic',
                                    sortable: 'true'
                                }, {
                                    field: 'JobDriver',
                                    title: 'Driver',
                                    sortable: 'true'
                                }, {
                                    field: 'DriverInfo.Email',
                                    title: 'Email',
                                    sortable: 'true'
                                }, {
                                    field: 'DriverInfo.Phone',
                                    title: 'Phone',
                                    sortable: 'true'
                                }, {
                                    field: 'DriverInfo.Address',
                                    title: 'Driver Address',
                                    sortable: 'true'
                                }, {
                                    field: 'DriverInfo.Image',
                                    title: 'Driver Profile',
                                    sortable: 'true',
                                    formatter: 'nameFormatter',
                                }, ],

                                onLoadSuccess: function (data, row) {

                                    //Check if no data
                                    var rows = document.getElementById('reports-driver').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 0) {
                                      
                                        alert('No Jobs Found!');
                                    }

                                    //Set
                                    drawDriverChart(data);

                                },

                            });

                    });
                }

		        else if (getLocalstorageValueRetrieveReport == "reports-type") {
		            console.log("JobAPI:" + jobApi);
		            $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
		            document.getElementById("timeIntervalType").innerHTML = duration;

		            //Type Table
		            $(document).ready(function () {


		                $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'id',
                                url: jobApi,
                                columns: [{
                                    field: 'JobID',
                                    title: 'Job id',
                                    sortable: 'true',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'JobNumber',
                                    title: 'Job Number',
                                    sortable: 'true'
                                }, {
                                    field: 'Asset',
                                    title: 'Ambulance',
                                    sortable: 'true'
                                }, {
                                    field: 'TOC',
                                    title: 'Time of Call',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Alert Date & Time',
                                    sortable: 'true',
                                    formatter: 'timestampFormatter'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Pickup Date & Time',
                                    sortable: 'true',
                                    formatter: 'pickuptimestampFormatter'
                                }, {
                                    field: 'Origin',
                                    title: 'Pickup Location',
                                    sortable: 'true'
                                }, {
                                    field: 'Destination',
                                    title: 'Destination',
                                    sortable: 'true'
                                }, {
                                    field: 'Receipt',
                                    title: 'Receipt No.',
                                    sortable: 'true'
                                }, {
                                    field: 'Paramedic',
                                    title: 'Paramedic',
                                    sortable: 'true'
                                }, {
                                    field: 'JobDriver',
                                    title: 'Driver',
                                    sortable: 'true'
                                }, {
                                    field: 'JobType',
                                    title: 'Job Type',
                                    sortable: 'true'
                                }],

                                onLoadSuccess: function (data, row) {

                                    //Check if no data
                                    var rows = document.getElementById('reports-type').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 0) {

                                        alert('No Jobs Found!');
                                    }

                                    //Set
                                    sessionStorage.setItem("setSessionstorageValueData", JSON.stringify(data));
                                    drawDriverChart();

                                },

                            });

		            });
		        }

		        else if (getLocalstorageValueRetrieveReport == "reports-cvr") {
		            console.log("WebAPICVR:" + WebApiCVR);
		            $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
		            document.getElementById("timeIntervalCVR").innerHTML = duration;


		            //CVR Table
		            $(document).ready(function () {

		                $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'PosID',
                                url: WebApiCVR,
                                columns: [{
                                    field: 'PosID',
                                    title: 'id',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'Asset',
                                    title: 'Vehicle',
                                    formatter: vehicleFormatter
                                }, {
                                    field: 'Tag',
                                    title: 'Device',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'Driver',
                                    title: 'Driver'
                                }, {
                                    field: 'Location',
                                    title: 'Location'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Start',
                                    sortable: 'true',
                                    formatter: timestampFormatter
                                }, {
                                    field: 'RxTime',
                                    title: 'End',
                                    sortable: 'true',
                                    formatter: rxtimeFormatter
                                }, {
                                    field: 'Speed',
                                    title: 'Speed',
                                    formatter: speedFormatter
                                }, {
                                    field: 'Mileage',
                                    title: 'Mileage',
                                    formatter: mileageFormatter,
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'Engine',
                                    title: 'Engine',
                                    sortable: 'true',
                                    formatter: engineFormatter
                                }, {
                                    field: 'Ignition',
                                    title: 'Ignition',
                                    sortable: 'true',
                                    formatter: ignitionFormatter
                                }, {
                                    field: 'BarLight',
                                    title: 'Bar Light',
                                    sortable: 'true',
                                    formatter: barlightFormatter
                                }],

                                onLoadSuccess: function (data) {

                                    //console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));

                                    if (data == "") {
                                        $('#chartCVRStatus').hide();
                                        $('#chartCVRIgnition').hide();
                                        alert('No Position data!');

                                    }
                                    else {
                                        $('#chartPositionStatus').show();
                                        $('#chartPositionIgnition').show();
                                        //Set
                                        //sessionStorage.setItem("setSessionstorageValueData", JSON.stringify(data));
                                        drawCVRChartStatus(data);
                                        drawCVRChartIgnition(data);
                                    }

                                },

                                onClickRow: function (row) {
                                    //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    //Store
                                    localStorage.setItem("row", JSON.stringify(row));

                                    var width = 640;
                                    var height = 360;


                                    $('#myModal').modal("show");

                                    $("#myModal iframe").attr({
                                        'src': 'report_map.html',
                                        'height': height,
                                        'width': width,
                                    });

                                }

                            });


		            });


		        }

		        else if (getLocalstorageValueRetrieveReport == "reports-barlight") {
		            console.log("WebApiBarlight:" + WebApiBarlight);
		            $('#' + getLocalstorageValueRetrieveReport).bootstrapTable('destroy');
		            document.getElementById("timeIntervalBarlight").innerHTML = duration;

		            //Barlight Table
		            $(document).ready(function () {

		                $('#' + getLocalstorageValueRetrieveReport).bootstrapTable(
                            {
                                idField: 'PosID',
                                url: WebApiBarlight,
                                columns: [{
                                    field: 'PosID',
                                    title: 'id',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'SN',
                                    title: 'SN',
                                    formatter: snFormatter
                                }, {
                                    field: 'Asset',
                                    title: 'Vehicle',
                                    formatter: vehicleFormatter
                                }, {
                                    field: 'Tag',
                                    title: 'Device',
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'Driver',
                                    title: 'Driver'
                                }, {
                                    field: 'Location',
                                    title: 'Location'
                                }, {
                                    field: 'Timestamp',
                                    title: 'Timestamp',
                                    sortable: 'true',
                                    formatter: timestampFormatter
                                }, {
                                    field: 'Speed',
                                    title: 'Speed',
                                    formatter: speedFormatter
                                }, {
                                    field: 'Mileage',
                                    title: 'Mileage',
                                    formatter: mileageFormatter,
                                    class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
                                }, {
                                    field: 'Engine',
                                    title: 'Engine',
                                    sortable: 'true',
                                    formatter: engineFormatter
                                }, {
                                    field: 'Ignition',
                                    title: 'Ignition',
                                    sortable: 'true',
                                    formatter: ignitionFormatter
                                }, {
                                    field: 'BarLight',
                                    title: 'Bar Light',
                                    sortable: 'true',
                                    formatter: barlightFormatter
                                }],

                                onLoadSuccess: function (data) {

                                    //console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));
                                    var rows = document.getElementById('reports-barlight').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                                    if (rows <= 1) {

                                        alert('No data!');
                                    }


                                    //Set
                                    sessionStorage.setItem("setSessionstorageValueData", JSON.stringify(data));


                                },

                                onClickRow: function (row) {
                                    //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                                    //Store
                                    localStorage.setItem("row", JSON.stringify(row));
                                    //alert(row.PosID);

                                    var panel1 = $.jsPanel({
                                        iframe: {
                                            src: "report_map.html",
                                            id: "myFrame",
                                            style: { "display": "none", "border": "10px solid transparent" },
                                            width: '100%',
                                            height: '100%'
                                        },

                                        callback: function () {

                                            document.getElementById("myFrame").onload = function () {

                                                $("#myFrame").fadeIn(1000);
                                                localStorage.setItem("PosID", row.PosID);
                                                localStorage.setItem("jsPanel", "true");

                                            }
                                        },
                                        size: { width: 425, height: 425 },
                                        position: { left: "center", top: 30 },
                                        title: row.Asset, //Position Report
                                        theme: "black"
                                    });


                                    //panel1.close(function () {
                                    //    alert("#" + this.attr('id') + " closed !");
                                    //});



                                }

                            });


		            });


		        }

                //===============================

            }

            else {

                alert('Date Invalid');

            }
        //} else {

        //    alert('Date Invalid');

        //}


    }



});


//OnChange Filter
$(document).ready(function () {

    $('#load-report').change(function () {
        var selected = $(this).find("option:selected").val();

        if (selected == "Positions") {
            $("#playback").show();
            $("#viewLocation").show();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").hide();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Speed") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").hide();
            $("#historyType").hide();
        }
        else if (selected == "Events") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
            $("#historyDriver").hide();
            $("#historyType").hide();
            $("#speedLimit").val('');
        }
        else if (selected == "Mileage") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
            $("#historyDriver").hide();
            $("#historyType").hide();
            $("#speedLimit").val('');
        }
        else if (selected == "Utilization (Type 1)") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").hide();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Messages") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").hide();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
            //$('.SelectVechsFilter').find('[value=""]').remove();
            //$('.SelectVechsFilter').selectpicker('refresh');

        }
        else if (selected == "Jobs") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").show();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").show();
	        $("#historyDriver").show();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Job Status") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").show();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").hide();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Call Center") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").show();
            $("#historyTrip").hide();
	        $("#historyDriver").hide();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Trip") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").show();
	        $("#historyDriver").hide();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Payment") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").show();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").hide();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Paramedic") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").show();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Driver") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").show();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }
        else if (selected == "Type") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
            $("#historyDriver").show();
            $("#historyType").show();
            $("#speedLimit").val('');
        }
        else if (selected == "Comprehensive Vehicle Report") {
            $("#playback").show();
            $("#viewLocation").show();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
            $("#historyDriver").hide();
            $("#historyType").hide();
            $("#speedForm").show();
        }
        else if (selected == "Barlight") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").show();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
            $("#historyDriver").hide();
            $("#historyType").hide();
            $("#speedLimit").val('');
        }
        else if (selected == "") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $(".vehicle").hide();
            $("#historyPayment").hide();
            $("#historyStatus").hide();
            $("#historyCallCenter").hide();
            $("#historyTrip").hide();
	        $("#historyDriver").hide();
	        $("#historyType").hide();
	        $("#speedLimit").val('');
        }

    });

    $('#load-messages').change(function () {
        localStorage.setItem("setLocalstorageValueMessages", $(this).val());

    });

    $('#load-events').change(function () {
        localStorage.setItem("setLocalstorageValueEvents", $(this).val());
        var selected = $(this).find("option:selected").html();

        if (selected == "User Logout") {
            $("#historyAssets").hide();
        }
        else if (selected == "User Login") {
            $("#historyAssets").hide();
        }
        else if (selected == "Zone Enter") {
            $("#historyAssets").show();
        }
        else if (selected == "Zone Exit") {
            $("#historyAssets").show();
        }
        else if (selected == "Speeding Report") {
            $("#historyAssets").show();
        }
        else if (selected == "Driver Break") {
            $("#historyAssets").show();
        }
        else if (selected == "Onboard & Offload") {
            $("#historyAssets").show();
        }


    });

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


//Storage
$(document).ready(function () {


    try {

        var getAsset = $("#load-assets").val();
        var getCompany = $("#load-company").val();
        var getReseller = $("#load-reseller").val();
        var getDateFrom = $("#dateFrom").val();
        var getDateTo = $("#dateTo").val();

        localStorage.setItem("setLocalstorageValueAsset", getAsset);
        localStorage.setItem("setLocalstorageValueCompany", getCompany);
        localStorage.setItem("setLocalstorageValueReseller", getReseller);
        localStorage.setItem("setLocalstorageValueDateFrom", getDateFrom);
        localStorage.setItem("setLocalstorageValueDateTo", getDateTo);

        var getSpeed = $("#speedLimit").val();

        localStorage.setItem("setLocalstorageValueSpeedLimit", getSpeed);
        var getStatusID = $("#load-events").val();
        localStorage.setItem("setLocalstorageValueEvents", getStatusID);

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
        window.location.href = 'http://119.75.6.116/tracking/'; //Login URL
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


//Load Report in History
$.getJSON("http://119.75.6.116/adswebapi/api/reportinfo", function (data) {
    $.each(data, function (index, item) {

        if (item.Name != "Mileage" && item.Name != "Messages" && item.Name != "Positions")
        {
            $('#load-report').append($('<option></option>').val(item.Name).html(item.Name));
        }


    });

    $(".selectpicker").selectpicker('refresh');
});

var WebAPIAgent = "";


if (getSessionstorageValueRoleID == 1) {

    WebAPIAgent = 'http://119.75.6.116/adswebapi/api/userinfo?ResellerID=' + '1' + '&CompanyID=' + '1' + '&RoleID=' + getSessionstorageValueRoleID;

} else if (getSessionstorageValueRoleID == 2) {
    WebAPIAgent = 'http://119.75.6.116/adswebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;

} else if (getSessionstorageValueRoleID == 3) {

    WebAPIAgent = 'http://119.75.6.116/adswebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;
    $('#agent').append($('<option value="" selected="selected"></option>').val('').html("ALL"));
}
else if (getSessionstorageValueRoleID >= 4) {

    WebAPIAgent = 'http://119.75.6.116/adswebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;
    $('#agent').append($('<option value="" selected="selected"></option>').val('').html("ALL"));
}


    $.getJSON(WebAPIAgent, function (data) {
        $.each(data, function (index, item) {
            $('#agent').append($('<option></option>').val(item.User).html(item.Name));

        });

        $(".selectpicker").selectpicker('refresh');
    });





var WebAPIReseller = "";

if (getSessionstorageValueRoleID == 1) {

    WebAPIReseller = 'http://119.75.6.116/adswebapi/api/resellerinfo';

    $.getJSON(WebAPIReseller, function (data) {

        //$('#load-reseller').append(
        //$('<option></option>').val(0).html("-------")
        //);

        $.each(data, function (index, item) {
            if (item.ResellerID == 1) {
                $('#load-reseller').append(
                     $('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name)
                 );
            } else {
                $('#load-reseller').append(
                 $('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name)
             );
            }
        });
        $(".selectpicker").selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID == 2) {

    WebAPIReseller = 'http://119.75.6.116/adswebapi/api/resellerinfo?ResellerID=' + getSessionstorageValueUserResellerID;

    $.getJSON(WebAPIReseller, function (data) {
        $.each(data, function (index, item) {
            $('#load-reseller').append(
                 $('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID >= 3) {
    $('#formsReseller').remove();
}


//Desktop
if (getSessionstorageValueRoleID == 1) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?ResellerID=" + "1", function (data) {

        $.each(data, function (index, item) {

            if (item.Name == "DEMO Company" || item.Name == "Comfort Ambulance")

            $('#load-company').append(
                 $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
             );

        });
        $(".selectpicker").selectpicker('refresh');
    });

}

else if (getSessionstorageValueRoleID == 2) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

        $.each(data, function (index, item) {

            if (item.CompanyID == getSessionstorageValueCompanyID) {
                $('#load-company').append(
                 $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                );
            }
            else {
                $('#load-company').append(
                 $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                );
            }

        });


        $('.selectpicker').selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID >= 3) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?CompanyID=" + getSessionstorageValueCompanyID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {


        $.each(data, function (index, item) {


            $('#load-company').append(
                 $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
             );

        });


        $('.selectpicker').selectpicker('refresh');

    });
}



//Mobile
if (getSessionstorageValueRoleID == 1) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo", function (data) {

        $.each(data, function (index, item) {

            $('#load-company2').append(
                 $('<option></option>').val(item.CompanyID).html(item.Name)
             );

        });
        $(".selectpicker").selectpicker('refresh');
    });

}

else if (getSessionstorageValueRoleID == 2) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

        $.each(data, function (index, item) {

            if (item.CompanyID == getSessionstorageValueCompanyID) {
                $('#load-company2').append(
                 $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                );
            }
            else {
                $('#load-company2').append(
                 $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                );
            }

        });


        $('.selectpicker').selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID >= 3) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?CompanyID=" + getSessionstorageValueCompanyID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {


        $.each(data, function (index, item) {

            $('#load-company2').append(
                 $('<option></option>').val(item.CompanyID).html(item.Name)
             );

        });


        $('.selectpicker').selectpicker('refresh');

    });
}


// Mobile Reseller
var MobileWebAPIReseller = "";

if (getSessionstorageValueRoleID == 1) {

    MobileWebAPIReseller = 'http://119.75.6.116/adswebapi/api/resellerinfo';

    $.getJSON(MobileWebAPIReseller, function (data) {
        $.each(data, function (index, item) {

            if (item.ResellerID == "1") {
                $('#mobile-load-reseller').append(
                     $('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name)

                 );
            } else {

                $('#mobile-load-reseller').append(
                    $('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name)

                );
            }
        });
        var getReseller = $("#mobile-load-reseller").val();
        sessionStorage.setItem("setSessionstorageValueAssetReseller", getReseller);
        $('#mobile-load-reseller').selectpicker('refresh');

    });

} else if (getSessionstorageValueRoleID == 2) {

    MobileWebAPIReseller = 'http://119.75.6.116/adswebapi/api/resellerinfo?ResellerID=' + getSessionstorageValueUserResellerID;

    $.getJSON(MobileWebAPIReseller, function (data) {
        $.each(data, function (index, item) {
            $('#mobile-load-reseller').append(
                 $('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name)
             );
        });
        var getReseller = $("#mobile-load-reseller").val();
        sessionStorage.setItem("setSessionstorageValueAssetReseller", getReseller);
        $('#mobile-load-reseller').selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID >= 3) {
    $('#modalReseller').remove();
}


//Mobile Company
if (getSessionstorageValueRoleID == 1) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?&ResellerID=" + "1", function (data) {


        $.each(data, function (index, item) {

            if (item.CompanyID == 2) {

                $('#mobile-load-company').append(
                 $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                );

            } else {

                $('#mobile-load-company').append(
                     $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                 );

            }

        });


        $(".selectpicker").selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID == 2) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {
        $.each(data, function (index, item) {

            if (item.CompanyID == getSessionstorageValueCompanyID) {
                $('#mobile-load-company').append(
                 $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                );
            }
            else {
                $('#mobile-load-company').append(
                 $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                );
            }

        });

        $(".selectpicker").selectpicker('refresh');

    });
} else if (getSessionstorageValueRoleID >= 3) {

    $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?CompanyID=" + getSessionstorageValueCompanyID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

        $.each(data, function (index, item) {

            $('#mobile-load-company').append(
                 $('<option></option>').val(item.CompanyID).html(item.Name)
             );

        });

        $(".selectpicker").selectpicker('refresh');

    });

}


//Mobile Assets
if (getSessionstorageValueRoleID == 1) {

    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + '&ResellerID=' + '1' + '&CompanyID=' + '1', function (data) {

        $.each(data, function (index, item) {

            $('#mobile-load-assets').append(
                 $('<option></option>').val(item.Name).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2) {

    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {

        $.each(data, function (index, item) {

            $('#mobile-load-assets').append(
                 $('<option></option>').val(item.Name).html(item.Name)
             );

        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID >= 3) {

    $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID, function (data) {
        $.each(data, function (index, item) {
            $('#mobile-load-assets').append(
                 $('<option></option>').val(item.Name).html(item.Name)
             );
        });
        $(".selectpicker").selectpicker('refresh');
    });
}


//Mobile Report
$.getJSON("http://119.75.6.116/adswebapi/api/reportinfo", function (data) {
    $.each(data, function (index, item) {
        $('#mobile-load-report').append(
             $('<option></option>').val(item.Name).html(item.Name)
         );

    });

    $(".selectpicker").selectpicker('refresh');
});

//Mobile Events
$.getJSON("http://119.75.6.116/adswebapi/api/statusinfo", function (data) {
    $.each(data, function (index, item) {

        if (item.StatusID != 4 && item.StatusID != 20 && item.StatusID != 21) {
            $('#mobile-load-events').append(
                 $('<option></option>').val(item.StatusID).html(item.StatusDesc)
             );
        }
    });

    $(".selectpicker").selectpicker('refresh');
});




var selectedAsset = "";

//Dashboard Asset
/*** Function to filter tables, markers and zones*/
$(function () {

    $('.SelectVechsFilter').on('change', function () {
        selectedAsset = $(this).find("option:selected").val();

        $('#mobile-load-assets').empty();
        $('.MobileSelectVechsFilter').selectpicker('refresh');
        var getReseller = $('#load-reseller').val();
        var getCompany = $('#load-company').val();

        if (getSessionstorageValueRoleID == 1) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + '&ResellerID=' + getReseller + '&CompanyID=' + getCompany, function (data) {

                $.each(data, function (index, item) {

                    if (item.Name == selectedAsset) {
                        $('#mobile-load-assets').append($('<option selected="selected"></option>').val(item.Name).html(item.Name));
                    }
                    else {
                        $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    }

                });

                $(".MobileSelectVechsFilter").selectpicker('refresh');
            });

        }
        else if (getSessionstorageValueRoleID == 2) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID, function (data) {

                $.each(data, function (index, item) {

                    if (item.Name == selectedAsset) {
                        $('#mobile-load-assets').append($('<option selected="selected"></option>').val(item.Name).html(item.Name));
                    }
                    else {
                        $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    }

                });

                $(".MobileSelectVechsFilter").selectpicker('refresh');
            });
        }
        else if (getSessionstorageValueRoleID >= 3) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getCompany, function (data) {
                $.each(data, function (index, item) {

                    if (item.Name == selectedAsset) {
                        $('#mobile-load-assets').append($('<option selected="selected"></option>').val(item.Name).html(item.Name));
                    }
                    else {
                        $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    }

                });

                $(".MobileSelectVechsFilter").selectpicker('refresh');
            });
        }

    });

});

//====================================================//

var selectedMobileReseller = "";

/*** Function to filter reseller and companies*/
$(function () {

    $('.MobileSelectResellerFilter').on('change', function () {
        selectedMobileReseller = $(this).find("option:selected").val();

        $('#load-reseller').empty();
        $('.SelectResellerFilter').selectpicker('refresh');

        if (getSessionstorageValueRoleID == 1) {
            $.getJSON("http://119.75.6.116/adswebapi/api/resellerinfo", function (data) {
                $.each(data, function (index, item) {

                    if (item.ResellerID == selectedMobileReseller) {
                        $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name)
                     );
                    }
                    else {
                        $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
                    }

                });

                var getReseller = $("#load-reseller").val();
                sessionStorage.setItem("setSessionstorageValueAssetReseller", getReseller);
                $('#load-reseller').selectpicker('refresh');
            });
        }
        else if (getSessionstorageValueRoleID == 2) {
            $.getJSON("http://119.75.6.116/adswebapi/api/resellerinfo?ResellerID=" + selectedMobileReseller, function (data) {
                $.each(data, function (index, item) {

                    if (item.ResellerID == selectedMobileReseller) {
                        $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name));
                    }
                });

                var getReseller = $("#load-reseller").val();
                sessionStorage.setItem("setSessionstorageValueAssetReseller", getReseller);
                $('#load-reseller').selectpicker('refresh');
            });
        }
        else if (getSessionstorageValueRoleID >= 3) {
            $('#load-reseller').remove();
        }


        $('#mobile-load-company').empty();
        $(".MobileSelectCompanyFilter").selectpicker('refresh');

        $('#load-company').empty();
        $(".SelectCompanyFilter").selectpicker('refresh');

        $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?&ResellerID=" + selectedMobileReseller, function (data) {

            $('#mobile-load-company').append($('<option></option>').val(0).html("-------"));
            $('#load-company').append($('<option></option>').val(0).html("-------"));

            $.each(data, function (index, item) {
                $('#mobile-load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            });

            $(".MobileSelectCompanyFilter").selectpicker('refresh');
            $(".SelectCompanyFilter").selectpicker('refresh');
        });

        $('#mobile-load-assets').empty();
        $(".MobileSelectVechsFilter").selectpicker('refresh');

        $('#load-assets').empty();
        $(".SelectVechsFilter").selectpicker('refresh');

    });

});

var selectedMobileCompany = "";

//Mobile Company
/*** Function to filter tables, markers and zones*/
$(function () {

    $('.MobileSelectCompanyFilter').on('change', function () {
        selectedMobileCompany = $(this).find("option:selected").val();

        if (selectedMobileCompany != 0) {

            //Select New Company
            $('#load-company').empty();
            $('.SelectCompanyFilter').selectpicker('refresh');

            if (getSessionstorageValueRoleID == 1) {
                $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?&ResellerID=" + "1", function (data) {

                    $.each(data, function (index, item) {

                        if (item.CompanyID == selectedMobileCompany) {
                            $('#load-company').append(
                             $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                         );
                        }
                        else {
                            $('#load-company').append(
                             $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                         );
                        }
                    });
                    var getCompany = $("#mobile-load-company").val();
                    sessionStorage.setItem("setSessionstorageValueAssetCompany", getCompany);
                    $('#load-company').selectpicker('refresh');
                })
            }
            else if (getSessionstorageValueRoleID == 2) {
                $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

                    $.each(data, function (index, item) {

                        if (item.CompanyID == selectedMobileCompany) {
                            $('#load-company').append(
                             $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                         );
                        }
                        else {
                            $('#load-company').append(
                             $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                         );
                        }

                    });
                    var getCompany = $("#mobile-load-company").val();
                    sessionStorage.setItem("setSessionstorageValueAssetCompany", getCompany);
                    $('#load-company').selectpicker('refresh');
                });
            }
            else if (getSessionstorageValueRoleID >= 3) {
                $.getJSON("http://119.75.6.116/adswebapi/api/companyinfo?CompanyID=" + getSessionstorageValueCompanyID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {


                    $.each(data, function (index, item) {

                        if (item.CompanyID == selectedMobileCompany) {
                            $('#load-company').append(
                             $('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name)
                         );
                        }
                        else {
                            $('#load-company').append(
                             $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                         );
                        }

                    });

                    var getCompany = $("#mobile-load-company").val();
                    sessionStorage.setItem("setSessionstorageValueAssetCompany", getCompany);
                    $('#load-company').selectpicker('refresh');

                });
            }

            //Load New Assets
            $('#mobile-load-assets').empty();      
            $('.MobileSelectVechsFilter').selectpicker('refresh');
            $('#load-assets').empty();
            $('.SelectVechsFilter').selectpicker('refresh');
            var getReseller = $('#mobile-load-reseller').val();
            var getCompany = $('#mobile-load-company').val();

            if (getSessionstorageValueRoleID == 1) {

                $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + '&ResellerID=' + getReseller + '&CompanyID=' + getCompany, function (data) {

                    $.each(data, function (index, item) {

                        $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                        $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    });

                    $('.MobileSelectVechsFilter').selectpicker('refresh');
                    $(".SelectVechsFilter").selectpicker('refresh');
                });

            }
            else if (getSessionstorageValueRoleID == 2) {

                $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getCompany, function (data) {

                    $.each(data, function (index, item) {
                        
                        $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                        $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));

                    });
                    
                    $('.MobileSelectVechsFilter').selectpicker('refresh');
                    $(".SelectVechsFilter").selectpicker('refresh');
                });
            }
            else if (getSessionstorageValueRoleID >= 3) {

                $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getCompany, function (data) {
                    $.each(data, function (index, item) {
                       
                        $('#mobile-load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                        $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));

                    });
                    
                    $('.MobileSelectVechsFilter').selectpicker('refresh');
                    $(".SelectVechsFilter").selectpicker('refresh');
                });
            }
       
        }

    });


});

var selectedMobileAsset = "";

//Mobile Asset
/*** Function to filter tables, markers and zones*/
$(function () {

    $('.MobileSelectVechsFilter').on('change', function () {
        selectedMobileAsset = $(this).find("option:selected").val();

        $('#load-assets').empty();
        $('.SelectVechsFilter').selectpicker('refresh');
        var getReseller = $('#mobile-load-reseller').val();
        var getCompany = $('#mobile-load-company').val();

        if (getSessionstorageValueRoleID == 1) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + '&ResellerID=' + getReseller + '&CompanyID=' + getCompany, function (data) {

                $.each(data, function (index, item) {

                    if (item.Name == selectedMobileAsset)
                    {
                        $('#load-assets').append($('<option selected="selected"></option>').val(item.Name).html(item.Name));
                    }
                    else
                    {
                        $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    }
                
                });

                $(".SelectVechsFilter").selectpicker('refresh');
            });

        }
        else if (getSessionstorageValueRoleID == 2) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID, function (data) {

                $.each(data, function (index, item) {

                    if (item.Name == selectedMobileAsset) {
                        $('#load-assets').append($('<option selected="selected"></option>').val(item.Name).html(item.Name));
                    }
                    else {
                        $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    }

                });

                $(".SelectVechsFilter").selectpicker('refresh');
            });
        }
        else if (getSessionstorageValueRoleID >= 3) {

            $.getJSON("http://119.75.6.116/adswebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getCompany, function (data) {
                $.each(data, function (index, item) {

                    if (item.Name == selectedMobileAsset) {
                        $('#load-assets').append($('<option selected="selected"></option>').val(item.Name).html(item.Name));
                    }
                    else {
                        $('#load-assets').append($('<option></option>').val(item.Name).html(item.Name));
                    }

                });

                $(".SelectVechsFilter").selectpicker('refresh');
            });
        }
       
    });

});

//====================================================//

$(function () {

    $("#mobile-assets").hide();
    $('#mobile-events').hide();
    $("#mobile-speed").hide();
    $("#mobile-messages").hide();
    $("#mobile-payment").hide();

    $('#mobile-load-report').change(function () {
        var selected = $(this).find("option:selected").val();

        if (selected == "Positions") {
            $("#playback").show();
            $("#viewLocation").show();
            $("#mobile-assets").show();
            $("#mobile-events").hide();
            $("#mobile-speed").hide();
            $("#mobile-messages").hide();
            $("#mobile-payment").hide();
        }
        else if (selected == "Speed") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $("#mobile-assets").show();
            $("#mobile-events").hide();
            $("#mobile-speed").show();
            $("#mobile-messages").hide();
            $("#mobile-payment").hide();
        }
        else if (selected == "Events") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $("#mobile-assets").show();
            $("#mobile-events").show();
            $("#mobile-speed").hide();
            $("#mobile-messages").hide();
            $("#mobile-payment").hide();
        }
        else if (selected == "Utilization (Type 1)") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $("#mobile-assets").show();
            $("#mobile-events").hide();
            $("#mobile-speed").hide();
            $("#mobile-messages").hide();
            $("#mobile-payment").hide();
        }
        else if (selected == "Messages") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $("#mobile-assets").show();
            $("#mobile-events").hide();
            $("#mobile-speed").hide();
            $("#mobile-messages").show();
            $("#mobile-payment").hide();

        } else if (selected == "Jobs") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $("#mobile-assets").show();
            $("#mobile-events").hide();
            $("#mobile-speed").hide();
            $("#mobile-messages").hide();
            $("#mobile-payment").show();

        } else if (selected == "") {
            $("#playback").hide();
            $("#viewLocation").hide();
            $("#mobile-assets").hide();
            $("#mobile-events").hide();
            $("#mobile-speed").hide();
            $("#mobile-messages").hide();
            $("#mobile-payment").hide();
        }

    });

    $('#mobile-load-events').change(function () {
        localStorage.setItem("setLocalstorageValueEvents", $(this).val());
        var selected = $(this).find("option:selected").html();

        if (selected == "User Logout") {
            $("#mobile-assets").hide();
        }
        else if (selected == "User Login") {
            $("#mobile-assets").hide();
        }
        else if (selected == "Zone Enter") {
            $("#mobile-assets").show();
        }
        else if (selected == "Zone Exit") {
            $("#mobile-assets").show();
        }
        else if (selected == "Speeding Report") {
            $("#mobile-assets").show();
        }


    });

});


$('#generatemobile').on('click', function () {

    var reseller = $('#mobile-load-reseller').val();
    var company = $('#mobile-load-company').val();
    var reports = $('#mobile-load-report').val();
    var vehicle = $('#mobile-load-assets').val();
    var speed = $('#mobile-load-speed').val();
    var datefrom = $('#mobile-dateFrom').val();
    var dateto = $('#mobile-dateTo').val();
    var getFlag = $("#mobile-load-messages").val();
    var getStatusID = $("#mobile-load-events").val();
    var getPayment = $("#mobile-load-payment").val();

    localStorage.setItem("setLocalstorageValueAsset", vehicle);
    localStorage.setItem("setLocalstorageValueCompany", company);
    localStorage.setItem("setLocalstorageValueDateFrom", datefrom);
    localStorage.setItem("setLocalstorageValueDateTo", dateto);

    var webapiMobile = "http://119.75.6.116/adswebapi/api/posinfo?Asset=" + vehicle + "&Speed=" + speed + "&Timestamp=" + datefrom + "&RxTime=" + dateto;
    var WebApiEvent = "http://119.75.6.116/adswebapi/api/eventinfo/?Asset=" + vehicle + "&StatusID=" + getStatusID + "&Timestamp=" + datefrom + "&RxTime=" + dateto;
    var WebApiMessages = "http://119.75.6.116/adswebapi/api/messageinfo?Asset=" + vehicle + "&Flag=" + getFlag + "&Timestamp=" + datefrom + "&RxTime=" + dateto;
    var jobApi = 'http://119.75.6.116/adswebapi/api/jobinfo?AssetResellerID=' + reseller + '&AssetCompanyID=' + company + '&Asset=' + vehicle + '&Timestamp=' + datefrom + '&RxTime=' + dateto + '&Flag=0' + '&Payment=' + getPayment;


    if (reports == "Positions") {

        $("#event-report").hide();
        $("#position-report").show();
        $("#speed-report").hide();
        $("#mileage-report").hide();
        $("#utilization-report").hide();
        $("#messages-report").hide();
        $("#jobs-report").hide();
        $("#jobstatus-report").hide();

        $('#reports-positions').bootstrapTable('destroy');

        $('#reports-positions').bootstrapTable({
            idField: 'id',
            url: webapiMobile,
            columns: [{
                field: 'Asset',
                title: 'Vehicle',
                formatter: vehicleFormatter
            }, {
                field: 'Tag',
                title: 'Device',
                class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
            }, {
                field: 'Driver',
                title: 'Driver'
            }, {
                field: 'Location',
                title: 'Location'
            }, {
                field: 'Timestamp',
                title: 'Timestamp',
                sortable: 'true',
                formatter: timestampFormatter
            }, {
                field: 'Speed',
                title: 'Speed'
            }, {
                field: 'Engine',
                title: 'Engine',
                sortable: 'true',
                formatter: engineFormatter
            }, {
                field: 'Ignition',
                title: 'Ignition',
                sortable: 'true',
                formatter: ignitionFormatter
            }],

            onLoadSuccess: function (row) {

                //console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));

                var move = 0;
                var idle = 0;
                var stop = 0;

                for (var i = 0; i < row.length; ++i) {
                    if (row[i].Engine == "MOVE") {
                        move++;
                    } else if (row[i].Engine == "IDLE") {
                        idle++;
                    } else if (row[i].Engine == "STOP") {
                        stop++;
                    }

                }

                var objEngine = {
                    Move: move,
                    Idle: idle,
                    Stop: stop,
                };


                //Set
                sessionStorage.setItem("setSessionstorageValueEngine", JSON.stringify(objEngine));


                drawChart();

                var rows = document.getElementById('reports-positions').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
                if (rows <= 0) {
                    alert('No data!');
                }

            },

            onClickRow: function (row) {
                //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                //Store
                localStorage.setItem("row", JSON.stringify(row));


                //Then retrieve
                var localObj = JSON.parse(localStorage.getItem(row));


                //if (Modernizr.localstorage) {
                //    $("#Perimeter").text('localStorage is available');
                //} else {
                //    $("#Perimeter").text('localStorage is not available');
                //}

                var panel1 = $.jsPanel({
                    iframe: {
                        src: "report_map.html",
                        id: "myFrame",
                        style: { "display": "none", "border": "10px solid transparent" },
                        width: '100%',
                        height: '100%'
                    },

                    callback: function () {
                        document.getElementById("myFrame").onload = function () {
                            $("#myFrame").fadeIn(1000);
                        }
                    },
                    size: { width: 425, height: 425 },
                    position: { left: "center", top: 30 },
                    title: row.Asset, //Position Report
                    theme: "black"
                });



            }

        });
    }

    else if (reports == "Speed") {

        $("#event-report").hide();
        $("#position-report").hide();
        $("#speed-report").show();
        $("#mileage-report").hide();
        $("#utilization-report").hide();
        $("#messages-report").hide();
        $("#jobs-report").hide();

        $('#reports-speed').bootstrapTable('destroy');

        $('#reports-speed').bootstrapTable({
            idField: 'id',
            url: webapiMobile,
            columns: [{
                field: 'Asset',
                title: 'Vehicle',
                formatter: vehicleFormatter
            }, {
                field: 'Tag',
                title: 'Device',
                class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
            }, {
                field: 'Driver',
                title: 'Driver'
            }, {
                field: 'Speed',
                title: 'Speed'
            }, {
                field: 'Timestamp',
                title: 'Timestamp',
                sortable: 'true',
                formatter: timestampFormatter
            }, {
                field: 'Engine',
                title: 'Engine',
                sortable: 'true',
                formatter: engineFormatter
            }, {
                field: 'Ignition',
                title: 'Ignition',
                sortable: 'true',
                formatter: ignitionFormatter
            }],

            onLoadSuccess: function (row) {

                //console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));


                var move = 0;
                var idle = 0;
                var stop = 0;

                for (var i = 0; i < row.length; ++i) {
                    if (row[i].Engine == "MOVE") {
                        move++;
                    } else if (row[i].Engine == "IDLE") {
                        idle++;
                    } else if (row[i].Engine == "STOP") {
                        stop++;
                    }

                }

                var objEngine = {
                    Move: move,
                    Idle: idle,
                    Stop: stop,
                };


                //Set
                sessionStorage.setItem("setSessionstorageValueEngine", JSON.stringify(objEngine));


                drawChart();



            },

            onClickRow: function (row) {
                //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                //Store
                localStorage.setItem("row", JSON.stringify(row));


                //Then retrieve
                var localObj = JSON.parse(localStorage.getItem(row));


                //if (Modernizr.localstorage) {
                //    $("#Perimeter").text('localStorage is available');
                //} else {
                //    $("#Perimeter").text('localStorage is not available');
                //}

                var panel1 = $.jsPanel({
                    iframe: {
                        src: "report_map.html",
                        id: "myFrame",
                        style: { "display": "none", "border": "10px solid transparent" },
                        width: '100%',
                        height: '100%'
                    },

                    callback: function () {
                        document.getElementById("myFrame").onload = function () {
                            $("#myFrame").fadeIn(1000);
                        }
                    },
                    size: { width: 425, height: 425 },
                    position: { left: "center", top: 30 },
                    title: row.Asset, //Speed Report
                    theme: "black"
                });

            },

        });
    } 

    else if (reports == "Mileage")
    {

        $("#event-report").hide();
        $("#position-report").hide();
        $("#speed-report").hide();
        $("#mileage-report").show();
        $("#utilization-report").hide();
        $("#messages-report").hide();
        $("#jobs-report").hide();

        $('#reports-mileage').bootstrapTable('destroy');

        $('#reports-mileage').bootstrapTable({
            idField: 'id',
            url: webapiMobile,
            columns: [{
                field: 'Asset',
                formatter: vehicleFormatter
            }, {
                field: 'Tag',
                title: 'Device',
                class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
            }, {
                field: 'Mileage',
                title: 'Mileage'
            }, {
                field: 'Timestamp',
                title: 'Timestamp',
                sortable: 'true',
                formatter: timestampFormatter
            }, {
                field: 'Speed',
                title: 'Speed'
            }, {
                field: 'Engine',
                title: 'Engine',
                sortable: 'true',
                formatter: engineFormatter
            }, {
                field: 'Ignition',
                title: 'Ignition',
                sortable: 'true',
                formatter: ignitionFormatter
            }],

            onLoadSuccess: function (row) {

                //console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));


                var move = 0;
                var idle = 0;
                var stop = 0;

                for (var i = 0; i < row.length; ++i) {
                    if (row[i].Engine == "MOVE") {
                        move++;
                    } else if (row[i].Engine == "IDLE") {
                        idle++;
                    } else if (row[i].Engine == "STOP") {
                        stop++;
                    }

                }

                var objEngine = {
                    Move: move,
                    Idle: idle,
                    Stop: stop,
                };


                //Set
                sessionStorage.setItem("setSessionstorageValueEngine", JSON.stringify(objEngine));

                drawChart();


            },

            onClickRow: function (row) {
                //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                //Store
                localStorage.setItem("row", JSON.stringify(row));


                //Then retrieve
                var localObj = JSON.parse(localStorage.getItem(row));


                //if (Modernizr.localstorage) {
                //    $("#Perimeter").text('localStorage is available');
                //} else {
                //    $("#Perimeter").text('localStorage is not available');
                //}

                var panel1 = $.jsPanel({
                    iframe: {
                        src: "report_bar.html",
                        id: "myFrame",
                        style: { "display": "none", "border": "10px solid transparent" },
                        width: '100%',
                        height: '100%'
                    },

                    callback: function () {
                        document.getElementById("myFrame").onload = function () {
                            $("#myFrame").fadeIn(1000);
                        }
                    },
                    size: { width: 425, height: 425 },
                    position: { left: "center", top: 30 },
                    title: row.Asset, //Mileage Report
                    theme: "black"
                });


            },

        });
    }
    else if (reports == "Utilization (Type 1)")
    {

        $("#event-report").hide();
        $("#position-report").hide();
        $("#speed-report").hide();
        $("#mileage-report").hide();
        $("#utilization-report").show();
        $("#messages-report").hide();
        $("#jobs-report").hide();

        $('#reports-utilization').bootstrapTable('destroy');

        $('#reports-utilization').bootstrapTable({
            idField: 'id',
            url: webapiMobile,
            columns: [{
                field: 'Asset',
                title: 'Vehicle',
                formatter: vehicleFormatter
            }, {
                field: 'Tag',
                title: 'Device',
                class: 'hidden-xs hidden-sm hidden-md hidden-lg hidden-desktop'
            }, {
                field: 'Timestamp',
                title: 'Timestamp',
                formatter: timestampFormatter
            }, {
                field: 'Speed',
                title: 'Speed'
            }, {
                field: 'Engine',
                title: 'Engine',
                formatter: engineFormatter
            }, {
                field: 'Ignition',
                title: 'Ignition',
                formatter: ignitionFormatter
            }],
            onLoadSuccess: function (row) {

                //console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));

                var move = 0;
                var idle = 0;
                var stop = 0;

                for (var i = 0; i < row.length; ++i) {
                    if (row[i].Engine == "MOVE") {
                        move++;
                    } else if (row[i].Engine == "IDLE") {
                        idle++;
                    } else if (row[i].Engine == "STOP") {
                        stop++;
                    }

                }

                var objEngine = {
                    Move: move,
                    Idle: idle,
                    Stop: stop,
                };

                //Set
                sessionStorage.setItem("setSessionstorageValueEngine", JSON.stringify(objEngine));

                drawChart();


            },


            onClickRow: function (row) {
                //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                //Store
                localStorage.setItem("row", JSON.stringify(row));


                //Then retrieve
                var localObj = JSON.parse(localStorage.getItem(row));


                //if (Modernizr.localstorage) {
                //    $("#Perimeter").text('localStorage is available');
                //} else {
                //    $("#Perimeter").text('localStorage is not available');
                //}

                var panel1 = $.jsPanel({
                    iframe: {
                        src: "report_pie.html",
                        id: "myFrame",
                        style: { "display": "none", "border": "10px solid transparent" },
                        width: '100%',
                        height: '100%'
                    },

                    callback: function () {
                        document.getElementById("myFrame").onload = function () {
                            $("#myFrame").fadeIn(1000);
                        }
                    },
                    size: { width: 425, height: 425 },
                    position: { left: "center", top: 30 },
                    title: row.Asset, //Utilization Report
                    theme: "black"
                });

            },

        });
    }

    else if (reports == "Messages") {

        $("#event-report").hide();
        $("#position-report").hide();
        $("#speed-report").hide();
        $("#mileage-report").hide();
        $("#utilization-report").hide();
        $("#messages-report").show();
        $("#jobs-report").hide();

        $('#reports-messages').bootstrapTable('destroy');

        $('#reports-messages').bootstrapTable({
            idField: 'id',
            url: WebApiMessages,
            columns: [{
                field: 'Timestamp',
                title: 'Timestamp',
                formatter: timestampFormatter
            }, {
                field: 'Flag',
                title: 'Status',
                formatter: flagFormatter
            }, {
                field: 'Sender',
                title: 'From'
            }, {
                field: 'Recipients',
                title: 'To'
            }, {
                field: 'Asset',
                title: 'Vehicle',
                formatter: vehicleFormatter
            }, {
                field: 'Message',
                title: 'Message'
            }, ],

            onLoadSuccess: function (row) {

                console.log('Messages: onLoadSuccess, data: ' + JSON.stringify(row));
                var sent = 0;
                var pending = 0;


                for (var i = 0; i < row.length; ++i) {
                    if (row[i].Flag == 0) {
                        sent++;
                    } else if (row[i].Flag == 1) {
                        pending++;
                    }
                }

                var objMessages = {
                    Sent: sent,
                    Pending: pending
                };


                //Set
                sessionStorage.setItem("setSessionstorageValueMessages", JSON.stringify(objMessages));

                drawMessages();

            }
        });
    }

    else if (reports == "Jobs") {

        $("#event-report").hide();
        $("#position-report").hide();
        $("#speed-report").hide();
        $("#mileage-report").hide();
        $("#utilization-report").hide();
        $("#messages-report").hide();
        $("#jobs-report").show();

        $('#reports-jobs').bootstrapTable('destroy');

        $('#reports-jobs').bootstrapTable({
            idField: 'id',
            url: jobApi,
            columns: [{
                field: 'JobID',
                title: 'Job id',
                sortable: 'true',
                class: 'hidden-xs hidden-sm hidden-md hidden-lg'
            }, {
                field: 'Asset',
                title: 'Vehicle',
                sortable: 'true'
            }, {
                field: 'Caller',
                title: 'Caller Name',
                sortable: 'true'
            }, {
                field: 'Timestamp',
                title: 'Date & Time',
                sortable: 'true',
                formatter: 'timestampFormatter'
            }, {
                field: 'Bed',
                title: 'Bed/Ward',
                sortable: 'true'
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
                field: 'Accessories',
                title: 'Accessories',
                sortable: 'true',
                class: 'hidden-xs hidden-sm hidden-md hidden-lg'
            }, {
                field: 'Amount',
                title: 'Amount',
                class: 'amount',
                sortable: 'true',
                formatter: 'amountFormatter'
            }, {
                field: 'Remarks',
                title: 'Remarks',
                sortable: 'true'
            }, {
                field: 'Receipt',
                title: 'Receipt No.',
                sortable: 'true'
            }, {
                field: 'DriverInfo.Image',
                title: 'Driver Profile',
                formatter: 'nameFormatter',
                sortable: 'true'
            }],
        });
    }

    else if (reports == "Events") {

        $("#event-report").show();
        $("#position-report").hide();
        $("#speed-report").hide();
        $("#mileage-report").hide();
        $("#utilization-report").hide();
        $("#messages-report").hide();
        $("#jobs-report").hide();

        $('#reports-events').bootstrapTable('destroy');

        //Event Table
        var getEvents = document.getElementById("mobile-load-events");
        var strEvent = getEvents.options[getEvents.selectedIndex].value;

        if (strEvent == 12 | strEvent == 13) {
            //User Log In/Out
            $(document).ready(function () {

                $('#reports-events').bootstrapTable(
                    {
                        idField: 'EventID',
                        url: 'http://119.75.6.116/adswebapi/api/eventinfo/?StatusID=' + getStatusID + '&Timestamp=' + datefrom + '&RxTime=' + dateto + "&CompanyID=" + company + "&AckRoleID=" + getSessionstorageValueRoleID,
                        columns: [{
                            field: 'Timestamp',
                            title: 'Timestamp',

                            formatter: timestampFormatter
                        }, {
                            field: 'Event',
                            title: 'Event'
                        }, {
                            field: 'Remarks',
                            title: 'Remarks'
                        }]

                    });

            });
        }
        else if (strEvent == 17 | strEvent == 18) {
            $(document).ready(function () {

                $('#reports-events').bootstrapTable(
                    {
                        idField: 'EventID',
                        url: WebApiEvent,
                        columns: [{
                            field: 'Timestamp',
                            title: 'Timestamp',
                            formatter: timestampFormatter
                        }, {
                            field: 'Event',
                            title: 'Event'
                        }, {
                            field: 'Remarks',
                            title: 'Remarks'
                        }, {
                            field: 'Asset',
                            title: 'Vehicle',
                            formatter: vehicleFormatter
                        }, ],

                        onLoadSuccess: function (row) {

                            //console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));
                            var enter = 0;
                            var exit = 0;


                            for (var i = 0; i < row.length; ++i) {
                                if (row[i].Event == "Zone Enter") {
                                    enter++;
                                } else if (row[i].Event == "Zone Exit") {
                                    exit++;
                                }
                            }

                            var objEvent = {
                                ZoneEnter: enter,
                                ZoneExit: exit
                            };


                            //Set
                            sessionStorage.setItem("setSessionstorageValueEvents", JSON.stringify(objEvent));

                            drawEvent();

                        },

                        onClickRow: function (row) {
                            //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                            //Store
                            localStorage.setItem("row", JSON.stringify(row));


                            //Then retrieve
                            var localObj = JSON.parse(localStorage.getItem(row));


                            //if (Modernizr.localstorage) {
                            //    $("#Perimeter").text('localStorage is available');
                            //} else {
                            //    $("#Perimeter").text('localStorage is not available');
                            //}

                            var panel1 = $.jsPanel({
                                iframe: {
                                    src: "history_event.html",
                                    id: "myFrame",
                                    style: { "display": "none", "border": "10px solid transparent" },
                                    width: '100%',
                                    height: '100%'
                                },

                                callback: function () {
                                    document.getElementById("myFrame").onload = function () {
                                        $("#myFrame").fadeIn(1000);
                                    }
                                },
                                size: { width: 425, height: 425 },
                                position: { left: "center", top: 30 },
                                title: row.Asset,
                                theme: "black"
                            });
                        },

                    });

            });
        }
        else if (strEvent == 19) {
            //Speed Limit Table
            $(document).ready(function () {

                $('#reports-events').bootstrapTable(
                    {
                        idField: 'EventID',
                        url: WebApiEvent,
                        columns: [{
                            field: 'Timestamp',
                            title: 'Timestamp',
                            formatter: timestampFormatter
                        }, {
                            field: 'Event',
                            title: 'Event'
                        }, {
                            field: 'Remarks',
                            title: 'Remarks'
                        }, {
                            field: 'Asset',
                            title: 'Vehicle',
                            formatter: vehicleFormatter
                        }, ],

                        onLoadSuccess: function (row) {

                            // console.log('Event: onLoadSuccess, data: ' + JSON.stringify(row));
                            var speed = 0;


                            for (var i = 0; i < row.length; ++i) {
                                if (row[i].Event == "Speeding Report") {
                                    speed++;
                                }
                            }

                            var objEvent = {
                                SpeedLimit: speed,
                            };


                            //Set
                            sessionStorage.setItem("setSessionstorageValueEvents", JSON.stringify(objEvent));

                            drawEventSpeedLimit();

                        },

                        onClickRow: function (row) {
                            //console.log('Event: onClickRow, data: ' + JSON.stringify(row));

                        }

                    });

            });
        }
    }


});

//Populate Driver
var WebAPIDriver = "";

if (getSessionstorageValueRoleID == 1) {
    WebAPIDriver = 'http://119.75.6.116/adswebapi/api/driverinfoex?ResellerID=' + '1' + '&CompanyID=' + '1';
}

else if (getSessionstorageValueRoleID == 2) {
    WebAPIDriver = 'http://119.75.6.116/adswebapi/api/driverinfoex?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

}
else if (getSessionstorageValueRoleID >= 3) {
    WebAPIDriver = 'http://119.75.6.116/adswebapi/api/driverinfoex?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;
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