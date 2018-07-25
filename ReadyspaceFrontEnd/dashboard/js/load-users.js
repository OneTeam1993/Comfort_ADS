var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');

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

//Onload Notifications
$.getJSON("https://track-asia.com/comfortwebapi/api/statusinfo", function (data) {
    $.each(data, function (index, item) {

        if (item.StatusID != 4 || item.StatusID != 20 || item.StatusID != 21)
        {
            $('#userNotifications').append($('<option></option>').val(item.StatusID).html(item.StatusDesc));
            $('#mobile-userNotifications').append($('<option></option>').val(item.StatusID).html(item.StatusDesc));
        }
    });
    $(".selectpicker").selectpicker('refresh');
});


//OnLoad User Role
$.getJSON("https://track-asia.com/comfortwebapi/api/roleinfo?RoleID=" + getSessionstorageValueRoleID, function (data) {
    $.each(data, function (index, item) {
        if (item.RoleID == 1 || item.RoleID == 3 || item.RoleID == 5 || item.RoleID == 6)
        $('#userRoleDesc').append($('<option data-icon="fa fa-user fa-lg"></option>').val(item.RoleID).html(item.RoleDesc));
        $('#mobile-userRoleDesc').append($('<option data-icon="fa fa-user fa-lg"></option>').val(item.RoleID).html(item.RoleDesc));
    });
    $(".selectpicker").selectpicker('refresh');
});

//On Load Reseller
var WebAPIReseller = "";

if (getSessionstorageValueRoleID == 1) {

    WebAPIReseller = 'https://track-asia.com/comfortwebapi/api/resellerinfo';

    $.getJSON(WebAPIReseller, function (data) {


        $.each(data, function (index, item) {
            if (item.ResellerID == 1) {
                $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name));
                $('#userReseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name));
                $('#mobile-load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg" selected="selected"></option>').val(item.ResellerID).html(item.Name));
            } else {
                $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
                $('#userReseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
                $('#mobile-load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
            }
        });
        $(".selectpicker").selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID == 2) {

    WebAPIReseller = 'https://track-asia.com/comfortwebapi/api/resellerinfo?ResellerID=' + getSessionstorageValueUserResellerID;

    $.getJSON(WebAPIReseller, function (data) {
        $.each(data, function (index, item) {
            $('#load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
            $('#userReseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
            $('#mobile-load-reseller').append($('<option data-icon="fa fa-user-secret fa-lg"></option>').val(item.ResellerID).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });

} else if (getSessionstorageValueRoleID >= 3) {
    $('#modal-load-reseller').remove();
    $('#formsReseller').remove();
    $('#userFormReseller').remove(); 
}

//On Load assets
var WebAPIAsset = "";

if (getSessionstorageValueRoleID == 1) {

    WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + '&ResellerID=' + '1' + '&CompanyID=' + '1';

    $.getJSON(WebAPIAsset, function (data) {

        $.each(data, function (index, item) {
            $('#userAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
            $('#mobile-userAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2) {

    WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + '' + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    $.getJSON(WebAPIAsset, function (data) {
        $.each(data, function (index, item) {
            $('#userAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
            $('#mobile-userAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });
}
else if (getSessionstorageValueRoleID >= 3) {

    WebAPIAsset = 'https://track-asia.com/comfortwebapi/api/assetinfo?UserID=' + '' + '&ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID;

    $.getJSON(WebAPIAsset, function (data) {
        $.each(data, function (index, item) {
            $('#userAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
            $('#mobile-userAssets').append($('<option></option>').val(item.AssetID).html(item.Name));
        });
        $(".selectpicker").selectpicker('refresh');
    });
}


var selectedReseller = "";

/*** Function to filter reseller and companies*/
$(function () {

    $('.select-reseller-filter').on('change', function () {
        selectedReseller = $(this).find("option:selected").val();

        $('#load-company').empty();
        $("#load-company").selectpicker('refresh');

        $.getJSON("https://track-asia.com/comfortwebapi/api/companyinfo?&ResellerID=" + selectedReseller, function (data) {

            $('#load-company').append($('<option></option>').val(0).html("-----"));

            $.each(data, function (index, item) {


                $('#load-company').append(
                     $('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name)
                 );
            });

            $(".select-company-filter").selectpicker('refresh');
        });

    });



});



$(document).ready(function () {

    var selectedCompany;
    var selectedReseller;

    if (getSessionstorageValueRoleID == 1) {
        // $(".select-company-filter").hide();
        $(".select-reseller-filter").change(function () {

            selectedReseller = $(this).find("option:selected").val();

        });

    }
    else if (getSessionstorageValueRoleID == 2) {

        //$(".select-reseller-filter").hide();
        $('.activateUser').hide();
        selectedReseller = getSessionstorageValueUserResellerID;

    }
    else if (getSessionstorageValueRoleID >= 3) {

        $(".reseller-filter").hide();
        $('#submit-filter').hide();
        $('.activateUser').hide();     
        selectedReseller = getSessionstorageValueUserResellerID;

    }

    $(".select-company-filter").change(function () {
        selectedCompany = $(this).find("option:selected").val();


    });


    $("#submit-filter").click(function () {

        $('#users-editable').bootstrapTable('destroy');

        var getReseller = "";

        if (selectedReseller == "" || selectedReseller == undefined) {

            getReseller = $('#load-reseller').val();
        } else {

            getReseller = selectedReseller;
        }

        var getCompany = "";

        if (selectedCompany == "" || selectedCompany == undefined) {

            getCompany = $('#load-company').val();
        } else {

            getCompany = selectedCompany;
        }

        var WebAPI = 'https://track-asia.com/comfortwebapi/api/userinfo?ResellerID=' + getReseller + '&CompanyID=' + getCompany + '&RoleID=' + getSessionstorageValueRoleID;


        $('#users-editable').bootstrapTable({
            idField: 'id',
            url: WebAPI,
            columns: [{
                field: 'state',
                title: '',
                checkbox: 'true'
            }, {
                field: 'Name',
                title: 'Full Name'
            }, {
                field: 'User',
                title: 'User Name'
            }, {
                field: 'RoleDesc',
                title: 'User Role'
            }, {
                field: 'Phone',
                title: 'Phone Number'
            }, {
                field: 'Email',
                title: 'Email Address'
            }, {
                field: 'Company',
                title: 'Company',
                class: 'userCompanyColumn'
            }, {
                field: 'ResellerDesc',
                title: 'Reseller',
                class: 'userResellerColumn'
            }, {
                field: 'LoginRetry',
                title: 'Status',
                formatter: 'statusFormatter'
            }],


            onCheck: function (row) {

                $("#toggle-aside").hide();
                $("#toggle-aside2").show();
                //$("#edit-toggle-button").show();
                //$("#add-toggle-button").hide();

                var userID = $('#userID').val(row.UserID);
                var userReseller = $('#userReseller').val(row.ResellerID);

                //var userCompany = $('#userCompany').val(row.Company);
                var userCompany = $('#userCompany').val(row.CompanyID);
                var userRoleDesc = $('#userRoleDesc').val(row.RoleID);
                var userFullName = $('#userFullName').val(row.Name);
                var userFullNameEN = $('#userFullNameEN').val(row.Name);
                var UserName = $('#UserName').val(row.User);
                var UserNameEN = $('#UserNameEN').val(row.User);
                var userPassword = $('#userPassword').val(row.Password);
                var userPasswordEN = $('#userPasswordEN').val(row.Password);
                var confirmPassword = $('#confirmPassword').val(row.Password);
                var confirmPasswordEN = $('#confirmPasswordEN').val(row.Password);
                var userEmail = $('#userEmail').val(row.Email);
                var userEmailEN = $('#userEmailEN').val(row.Email);
                var userPhone = $('#userPhone').val(row.Phone);
                var userPhoneEN = $('#userPhoneEN').val(row.Phone);
                var userImage = $('#userImage').val(row.Image);
                var userLanguage = $('#load-language').val(row.Language);


                //Convert String to Array
                var Notifications = row.Notifications;
                var AssignedNotifications = new Array();
                AssignedNotifications = Notifications.split(",");
                var getNotification = new Array();
                var getNotificationType = new Array();


                var Email = AssignedNotifications[0].substring(3, 4) + "E";
                var SMS = AssignedNotifications[0].substring(4, 5) + "S";
                var UI = AssignedNotifications[0].substring(5, 6) + "U";
                getNotificationType.push(Email, SMS, UI);


                for (var n = 0; n < AssignedNotifications.length; n++) {

                    var arrNotification = AssignedNotifications[n].substring(0, 2);

                    getNotification.push(arrNotification);


                }

                var userNotifications = $('#userNotifications').val(getNotification);
                var userNotificationsType = $('#userNotificationsType').val(getNotificationType);


                //Convert String to Array
                var Assets = row.Assets;
                var AssignedAssets = new Array();
                AssignedAssets = Assets.split(",");
                for (a in AssignedAssets) {
                    AssignedAssets[a] = parseInt(AssignedAssets[a], 10);
                }

                var userAssets = $('#userAssets').val(AssignedAssets);



                var arrAssets = [];

                if (getSessionstorageValueRoleID == 1) {

                    $.getJSON("https://track-asia.com/comfortwebapi/api/assetinfo", function (data) {

                        for (var i = 0; i < data.length; i++) {

                            var asset = data[i];
                            var assignedAsset = asset.Name;
                            var currAsset = JSON.stringify(asset.Name);

                            arrAssets.push(currAsset);
                        }

                        var ObjAssets = JSON.stringify(arrAssets);
                        var parseObjAssets = ObjAssets.replace(/\[|\"|\\|\]/g, "");
                        var SplitObjAssets = parseObjAssets.split(",");


                        $('#userAssignAssets').val(parseObjAssets);

                    });

                }
                else if (getSessionstorageValueRoleID == 2) {

                    $.getJSON("https://track-asia.com/comfortwebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

                        for (var i = 0; i < data.length; i++) {

                            var asset = data[i];
                            var assignedAsset = asset.Name;
                            var currAsset = JSON.stringify(asset.Name);

                            arrAssets.push(currAsset);
                        }

                        var ObjAssets = JSON.stringify(arrAssets);
                        var parseObjAssets = ObjAssets.replace(/\[|\"|\\|\]/g, "");
                        var SplitObjAssets = parseObjAssets.split(",");


                        $('#userAssignAssets').val(parseObjAssets);

                    });
                }
                else if (getSessionstorageValueRoleID >= 3) {

                    $.getJSON("https://track-asia.com/comfortwebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + "&ResellerID=" + getSessionstorageValueUserResellerID + "&CompanyID=" + getSessionstorageValueCompanyID, function (data) {

                        for (var i = 0; i < data.length; i++) {

                            var asset = data[i];
                            var assignedAsset = asset.Name;
                            var currAsset = JSON.stringify(asset.Name);

                            arrAssets.push(currAsset);
                        }

                        var ObjAssets = JSON.stringify(arrAssets);
                        var parseObjAssets = ObjAssets.replace(/\[|\"|\\|\]/g, "");
                        var SplitObjAssets = parseObjAssets.split(",");


                        $('#userAssignAssets').val(parseObjAssets);

                    });

                }

                $("#userPasswordEN").change(function () {
                    delete hashPassword;
                    var getPassword = $('#userPasswordEN').val();
                    var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
                    var hashPassword = hash;
                });


                $('.selectpicker').selectpicker('refresh');
            },

            onUncheck: function (row) {
                $("#toggle-aside").hide();
                $("toggle-aside2").hide();
                //$("#add-toggle-button").show();
                //$("#edit-toggle-button").hide();
                window.location.reload(true);
            },

            onLoadSuccess: function (row) {
                $("#toggle-aside2").hide();
                //$("#edit-toggle-button").hide();
                //$result.text('Event: onLoadSuccess, data: ' + data);

            }

            //onLoadError: function () {

            //    alert('Event: onLoadError, data: ' + alert('error'));
            //}

        });



    });


});


$(document).ready(function() {

    var WebAPI = "";

    if (getSessionstorageValueRoleID == 1) {

        WebAPI = 'https://track-asia.com/comfortwebapi/api/userinfo?ResellerID=' + '1' + '&CompanyID=' + '1' + '&RoleID=' + getSessionstorageValueRoleID;

    } else if (getSessionstorageValueRoleID == 2) {
        WebAPI = 'https://track-asia.com/comfortwebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;

    } else if (getSessionstorageValueRoleID >= 3) {

        WebAPI = 'https://track-asia.com/comfortwebapi/api/userinfo?ResellerID=' + getSessionstorageValueUserResellerID + '&CompanyID=' + getSessionstorageValueCompanyID + '&RoleID=' + getSessionstorageValueRoleID;
    }


	$('#users-editable').bootstrapTable({
		idField: 'id',
		url: WebAPI,
		columns: [{
			field: 'state',
			title: '',
			checkbox: 'true'
		}, {
		    field: 'Name',
		    title: 'Full Name'
		}, {
			field: 'User',
			title: 'User Name'
		},  {
			field: 'Phone',
			title: 'Phone Number'
		}, {
		    field: 'Email',
		    title: 'Email Address'
		}, {
		    field: 'RoleDesc',
		    title: 'User Role'
		}, {
		    field: 'Company',
		    title: 'Company',
            class: 'userCompanyColumn'
		}, {
		    field: 'ResellerDesc',
		    title: 'Reseller',
		    class: 'userResellerColumn'
		}, {
		    field: 'LoginRetry',
		    title: 'Status',
		    formatter: 'statusFormatter'
		}, {
		    field: 'Image',
		    title: 'User Profile',
		    formatter: 'nameFormatter'
		}],

		
		onCheck: function (row) {

		    $("#userImage").show();
		    $("#toggle-aside").hide();
		    $("#toggle-aside2").show();
		    //$("#edit-toggle-button").show();
		    //$("#add-toggle-button").hide();
		    if (row.ImageFill == "Uniform") {
		       // document["showImage"].src = row.Image;
		        $("#showImage").attr("src", row.Image);
		    }

		    var userID = $('#userID').val(row.UserID);
		    //var userCompany = $('#userCompany').val(row.Company);
		    var userCompany = $('#userCompany').val(row.CompanyID);
		    var userReseller = $('#userReseller').val(row.ResellerID);
		    var userRoleDesc = $('#userRoleDesc').val(row.RoleID);
		    //var userRoleDescAdmin = $('#userRoleDescReseller').val(row.RoleID);
		    //var userRoleDescAdmin = $('#userRoleDescMaster').val(row.RoleID);
		    //var userRoleDescAdmin = $('#userRoleDescAdmin').val(row.RoleID);
		    var userFullName = $('#userFullName').val(row.Name);
		    var userFullNameEN = $('#userFullNameEN').val(row.Name);
		    var UserName = $('#UserName').val(row.User);
		    var UserNameEN = $('#UserNameEN').val(row.User);
		    var userPassword = $('#userPassword').val(row.Password);
		    var userPasswordEN = $('#userPasswordEN').val(row.Password);
		    var confirmPassword = $('#confirmPassword').val(row.Password);
		    var confirmPasswordEN = $('#confirmPasswordEN').val(row.Password);
		    var userEmail = $('#userEmail').val(row.Email);
		    var userEmailEN = $('#userEmailEN').val(row.Email);
		    var userPhone = $('#userPhone').val(row.Phone);
		    var userPhoneEN = $('#userPhoneEN').val(row.Phone);
		    var userImage = $('#userImage').val(row.Image);

		    var userLanguage = $('#load-language').val(row.Language);

		    //Convert String to Array
		    var Notifications = row.Notifications;
		    var AssignedNotifications = new Array();
		    AssignedNotifications = Notifications.split(",");
		    var getNotification = new Array();
		    var getNotificationType = new Array();


		    var Email = AssignedNotifications[0].substring(3, 4) + "E";
		    var SMS = AssignedNotifications[0].substring(4, 5) + "S";
		    var UI = AssignedNotifications[0].substring(5, 6) + "U";
		    getNotificationType.push(Email, SMS, UI);


		    for (var n = 0; n < AssignedNotifications.length; n++) {

		        var arrNotification = AssignedNotifications[n].substring(0, 2);

		        getNotification.push(arrNotification);


		    }

		    var userNotifications = $('#userNotifications').val(getNotification);
		    var userNotificationsType = $('#userNotificationsType').val(getNotificationType);

   
		    //Convert String to Array
		    var Assets = row.Assets;           
		    var AssignedAssets = new Array();
		    AssignedAssets = Assets.split(",");
		    for (a in AssignedAssets) {
		        AssignedAssets[a] = parseInt(AssignedAssets[a], 10);
		    }

		    var userAssets = $('#userAssets').val(AssignedAssets);



		    var arrAssets = [];

		    if (getSessionstorageValueRoleID == 1) {

		        $.getJSON("https://track-asia.com/comfortwebapi/api/assetinfo", function (data) {

		            for (var i = 0; i < data.length; i++) {

		                var asset = data[i];
		                var assignedAsset = asset.Name;
		                var currAsset = JSON.stringify(asset.Name);

		                arrAssets.push(currAsset);
		            }

		            var ObjAssets = JSON.stringify(arrAssets);
		            var parseObjAssets = ObjAssets.replace(/\[|\"|\\|\]/g, "");
		            var SplitObjAssets = parseObjAssets.split(",");


		            $('#userAssignAssets').val(parseObjAssets);

		        });

		    }
		    else if (getSessionstorageValueRoleID == 2) {

		        $.getJSON("https://track-asia.com/comfortwebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

		            for (var i = 0; i < data.length; i++) {

		                var asset = data[i];
		                var assignedAsset = asset.Name;
		                var currAsset = JSON.stringify(asset.Name);

		                arrAssets.push(currAsset);
		            }

		            var ObjAssets = JSON.stringify(arrAssets);
		            var parseObjAssets = ObjAssets.replace(/\[|\"|\\|\]/g, "");
		            var SplitObjAssets = parseObjAssets.split(",");


		            $('#userAssignAssets').val(parseObjAssets);

		        });
		    }
		    else if (getSessionstorageValueRoleID >= 3) {

		      $.getJSON("https://track-asia.com/comfortwebapi/api/assetinfo?UserID=" + getSessionstorageValueUserID + "&ResellerID=" + getSessionstorageValueUserResellerID + "&CompanyID=" + getSessionstorageValueCompanyID, function (data) {

		            for (var i = 0; i < data.length; i++) {

		                var asset = data[i];
		                var assignedAsset = asset.Name;
		                var currAsset = JSON.stringify(asset.Name);

		                arrAssets.push(currAsset);
		            }

		            var ObjAssets = JSON.stringify(arrAssets);
		            var parseObjAssets = ObjAssets.replace(/\[|\"|\\|\]/g, "");
		            var SplitObjAssets = parseObjAssets.split(",");


		            $('#userAssignAssets').val(parseObjAssets);

		        });

		    }

		    $("#userPasswordEN").change(function () {
		        delete hashPassword;
		        var getPassword = $('#userPasswordEN').val();
		        var hash = CryptoJS.SHA3(getPassword, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
		        var hashPassword = hash;
		    });

		    var elem = document.querySelector('.js-dynamic-state');
		    var switchery = new Switchery(elem);


		    $('.selectpicker').selectpicker('refresh');
		},

		onUncheck: function (row) {
		    $("#toggle-aside").hide();
		    $("toggle-aside2").hide();
		    //$("#add-toggle-button").show();
		    //$("#edit-toggle-button").hide();
		    window.location.reload(true);
		},

		onLoadSuccess: function (row) {
		    $("#toggle-aside2").hide();
		    $("#userImage").hide();
		    //$("#edit-toggle-button").hide();
		    //$result.text('Event: onLoadSuccess, data: ' + data);
		}

		//onLoadError: function () {

		//    alert('Event: onLoadError, data: ' + alert('error'));
		//}

	});


    


	
});

//Delete Row
var $table = $('#users-editable'), $remove = $('#users-confirm-delete'), $removeEN = $('#users-confirm-deleteEN');

$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    $removeEN.prop('disabled', !$table.bootstrapTable('getSelections').length);
});




//Total Users
var url = 'https://track-asia.com/comfortwebapi/api/userinfo';

$.getJSON(url, function (users) {


    var $result = $('#total-users');
    $result.text(users.length)

});


// FORMAT COLUMN
// Use "data-formatter" on HTML to format the display of bootstrap table column.
// =================================================================


// format for Vehicle Column.
// =================================================================
function userFormatter(value, row) {
	return '<a href="#" class="btn-link" > Vehicle #' + value + '</a>';
}




// Format for User Name Column.
// =================================================================
function nameFormatter(value, row) {
    var labelColor;
    var text;

    if (row.ImageFill == "Uniform") {
        text = value;

        var userEmail;
        if (row.Email == '') {
            userEmail = "No Email";
        } else {
            userEmail = row.Email;
        }

        var userPhone;
        if (row.Phone == '') {
            userPhone = "No Phone";
        } else {
            userPhone = row.Phone;
        }


        return '<center><div style="color:black;"><a href="' + text + '" class="btn-link" data-toggle="lightbox" data-title="' + row.Name + '" data-footer="' + "<strong>Email: </strong>" + userEmail + "\n" + "<strong>Phone: </strong>" + userPhone + '"><img src="' + text + '" class="img-responsive" alt="' + text + '" height="30" width="30"></a></div></center>';

    } else if (row.ImageFill != "Uniform") {
        labelColor = "dark";
        text = "No User Photo";
        return '<center><div class="label label-table label-' + labelColor + '">' + text + '</div></center>';
    }

}




// Format for Order Date Column.
// =================================================================
function dateFormatter(value, row) {
	var icon = row.id % 2 === 0 ? 'fa-star' : 'fa-user';
	return '<span class="text-muted"><i class="fa fa-clock-o"></i> ' + value + '</span>';
}



//  Format for Status Column.
// =================================================================
function statusFormatter(value, row) {
	var labelColor;
	if (value == "Active") {
		labelColor = "success";
	}else if(value == "Locked"){
		labelColor = "dark";
	}
	var icon = row.id % 2 === 0 ? 'fa-star' : 'fa-user';
	return '<div class="label label-table label-'+ labelColor+'"> ' + value + '</div>';
}



// Format for Tracking Number Column.
// =================================================================
function trackFormatter(value, row) {
	if (value) return '<i class="fa fa-truck"></i> ' + value;
}



// Sort Price Column
// =================================================================
function priceSorter(a, b) {
	a = +a.substring(1); // remove $
	b = +b.substring(1);
	if (a > b) return 1;
	if (a < b) return -1;
	return 0;
}


//populate the Drop Down List
$.getJSON("https://track-asia.com/comfortwebapi/api/languageinfo", function (data) {
    $.each(data, function (index, item) {
        $('#load-language').append(
             $('<option></option>').val(item.Name).html(item.Name)
         );
    });
    $(".selectpicker").selectpicker('refresh');
});




//OnChange Session Storage
$(document).ready(function () {

    $('#load-company').change(function () {
        setTimeout(function () {
            $('#users-editable').bootstrapTable('resetView');

        }, 500);

    });


});


//<!--Filter-Company-->
//(function (document) {
//    'use strict';

//    var CompanyTableFilter = (function (Arr) {


//        var _select;


//        function _onSelectEvent(e) {
//            _select = e.target;
//            var tables = document.getElementsByClassName(_select.getAttribute('data-table'));
//            Arr.forEach.call(tables, function (table) {
//                Arr.forEach.call(table.tBodies, function (tbody) {
//                    Arr.forEach.call(tbody.rows, _filterSelect);
//                });
//            });
//        }

//        function _filter(row) {

//            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
//            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';

//        }

//        function _filterSelect(row) {

//            var text_select = row.textContent.toLowerCase(), val_select = _select.options[_select.selectedIndex].value.toLowerCase();
//            row.style.display = text_select.indexOf(val_select) === -1 ? 'none' : 'table-row';

//        }


//        return {
//            init: function () {
//                var selects = document.getElementsByClassName('select-company-filter');
//                Arr.forEach.call(selects, function (select) {
//                    select.onchange = _onSelectEvent;


//                });
//            }
//        };
//    })(Array.prototype);

//    document.addEventListener('readystatechange', function () {
//        if (document.readyState === 'complete') {
//            CompanyTableFilter.init();

//        }
//    });

//})(document);




$(document).ready(function () {

    //Then retrieve
    var getSessionstorageValueCompany = sessionStorage.getItem('setSessionstorageValueCompany');
    var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
    var getSessionstorageValueEmail = sessionStorage.getItem('setSessionstorageValueEmail');
    var getSessionstorageValueName = sessionStorage.getItem('setSessionstorageValueName');
    var getSessionstorageValueRoleDesc = sessionStorage.getItem('setSessionstorageValueRoleDesc');
    var getSessionstorageValueUser = sessionStorage.getItem('setSessionstorageValueUser');

    if (getSessionstorageValueUser == null | getSessionstorageValueUser == undefined | getSessionstorageValueUser == "") {

        window.location.href = 'https://track-asia.com/comfort/'; //Login URL

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

    document.getElementById("software").innerHTML = version;
    document.getElementById("softwareEN").innerHTML = version;


});


var changeCheckbox = document.querySelector('.userStatus');

changeCheckbox.onchange = function () {

    var val;

    if (changeCheckbox.checked == true) {
        val = 10;
    }

    else if (changeCheckbox.checked == false) {
        val = 0;
    }

    return val;

};




//Table Header Filter
if (getSessionstorageValueRoleID == 1)
{

    $.getJSON("https://track-asia.com/comfortwebapi/api/companyinfo?ResellerID=" + "1", function (data) {


        $.each(data, function (index, item) {

            if (item.Name == "DEMO Company" || item.Name == "Comfort Ambulance")

            if (item.CompanyID == 1)
            {
                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name));
                $('#userCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#mobile-load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));

            }
            else
            {
                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#userCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#mobile-load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            }

        });


        $(".selectpicker").selectpicker('refresh');
    });

}
else if (getSessionstorageValueRoleID == 2)
{

    var select = document.getElementById('userCompany');

    for (i = 0; i < select.length; i++) {
        if (select.options[i].value == '0') {
            select.remove(i);
        }
    }


    $.getJSON("https://track-asia.com/comfortwebapi/api/companyinfo?ResellerID=" + getSessionstorageValueUserResellerID, function (data) {
        $.each(data, function (index, item) {

            if (item.CompanyID == getSessionstorageValueCompanyID) {
                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name));
                $('#userCompany').append($('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name));
                $('#mobile-load-company').append($('<option data-icon="fa fa-building-o fa-lg" selected="selected"></option>').val(item.CompanyID).html(item.Name));
            }
            else
            {
                $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#userCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
                $('#mobile-load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            }

        });

        $(".selectpicker").selectpicker('refresh');

    });
}
else if (getSessionstorageValueRoleID >= 3){

    var select = document.getElementById('userCompany');

    for (i = 0; i < select.length; i++) {
        if (select.options[i].value == '0') {
            select.remove(i);
        }
    }

    $.getJSON("https://track-asia.com/comfortwebapi/api/companyinfo?CompanyID=" + getSessionstorageValueCompanyID + "&ResellerID=" + getSessionstorageValueUserResellerID, function (data) {

        $.each(data, function (index, item) {

            $('#load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            $('#userCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            $('#mobile-load-company').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));

        });

        $(".selectpicker").selectpicker('refresh');

    });

}



/*** Function to filter reseller and companies*/
$(function () {

    var selectedReseller = "";
    var selectedCompany = "";

    $('.select-reseller-filter').on('change', function () {
        selectedReseller = $(this).find("option:selected").val();

        var userReseller = $('#userReseller').val(selectedReseller);

        $("#userReseller").selectpicker('refresh');

        $('#userCompany').empty();

        $("#userCompany").selectpicker('refresh');

        $.getJSON("https://track-asia.com/comfortwebapi/api/companyinfo?&ResellerID=" + selectedReseller, function (data) {

            if (getSessionstorageValueRoleID == 1)
            {
            $('#userCompany').append($('<option selected="selected"></option>').val(0).html("-----"));
            }

            $.each(data, function (index, item) {

                if (item.Name == "DEMO Company" || item.Name == "Comfort Ambulance")

                $('#userCompany').append($('<option data-icon="fa fa-building-o fa-lg"></option>').val(item.CompanyID).html(item.Name));
            });

            $(".select-company-filter").selectpicker('refresh');
        });

    });


    $('.select-company-filter').on('change', function () {
        selectedCompany = $(this).find("option:selected").val();

        $('#userAssets').empty();

        $("#userAssets").selectpicker('refresh');

        var userReseller;
        if (selectedReseller == '' || selectedReseller == null) {
            userReseller = $("#userReseller").val();
        } else {
            userReseller = selectedReseller;
        }

        $.getJSON("https://track-asia.com/comfortwebapi/api/assetinfo?UserID=" + "&ResellerID=" + userReseller + "&CompanyID=" + selectedCompany, function (data) {

            $.each(data, function (index, item) {
                $('#userAssets').append(
                     $('<option></option>').val(item.AssetID).html(item.Name)
                 );
            });

            $("#userAssets").selectpicker('refresh');
        });

    });
});


$(function () {

    $('.tgl-menu-btn').click(function () {

        setTimeout(function () {
            $('#users-editable').bootstrapTable('resetView');

        }, 500);


    });

    $('.add-user').click(function () {

        setTimeout(function () {
            $('#users-editable').bootstrapTable('resetView');

        }, 500);


    });

    $('.add-userEN').click(function () {

        setTimeout(function () {
            $('#users-editable').bootstrapTable('resetView');

        }, 500);


    });

    $('.edit-user').click(function () {

        setTimeout(function () {
            $('#users-editable').bootstrapTable('resetView');

        }, 500);


    });

    $('.edit-userEN').click(function () {

        setTimeout(function () {
            $('#users-editable').bootstrapTable('resetView');

        }, 500);


    });


});


window.onresize = function (event) {
    setTimeout(function () {
        $('#users-editable').bootstrapTable('resetView');

    }, 500);
};


function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#showImage')
                .attr('src', e.target.result)
                .width(110)
                .height(110);
        };

        reader.readAsDataURL(input.files[0]);
    }
}



//Onload
document.getElementById("userStatus").checked = true;