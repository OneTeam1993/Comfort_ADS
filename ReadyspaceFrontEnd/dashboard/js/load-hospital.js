var getSessionstorageValueUserID = sessionStorage.getItem('setSessionstorageValueUserID');
var getSessionstorageValueCompanyID = sessionStorage.getItem('setSessionstorageValueCompanyID');
var getSessionstorageValueRoleID = sessionStorage.getItem('setSessionstorageValueRoleID');
var getSessionstorageValueUserResellerID = sessionStorage.getItem('setSessionstorageValueUserResellerID');
var getSessionstorageValueLanguage = sessionStorage.getItem('setSessionstorageValueLanguage');


$(document).ready(function() {

    var WebAPI = 'https://track-asia.com/comfortwebapi/api/hospitalinfo';


	$('#hospital-editable').bootstrapTable({
		idField: 'id',
		url: WebAPI,
		columns: [{
		    field: 'state',
		    checkbox: 'true'
		}, {
			field: 'ResellerID',
			title: 'ID',
			class: 'hidden-xs hidden-sm hidden-md hidden-lg',
			formatter: 'resellerFormatter'
		}, {
		    field: 'Name',
		    title: 'Name',
            sortable: 'true'
		}, {
			field: 'Address',
			title: 'Address',
			sortable: 'true'
		},  {
		    field: 'ShortName',
		    title: 'Short Name',
		    sortable: 'true'
		},  {
		    field: 'CodeID',
		    title: 'Category',
		    formatter: 'categoryFormatter'
		}],

		
		onCheck: function (row) {

		    $("#toggle-aside").hide();
		    $("#toggle-aside2").show();

		    var hospitalID = $('#hospitalID').val(row.HospitalID);
		    var hospitalName = $('#hospitalName').val(row.Name);
		    var hospitalAddress = $('#hospitalAddress').val(row.Address);
		    var hospitalSN = $('#hospitalSN').val(row.ShortName);
		    var hospitalCategory = $('#category').val(row.CodeID);


		    
		    $(".selectpicker").selectpicker('refresh');



		},

		onUncheck: function (row) {
		   
		    $("#toggle-aside").hide();
		    $("toggle-aside2").hide();

		    window.location.reload(true);
		},
		onLoadSuccess: function (row) {

		    $("#toggle-aside").show();
		    $("#toggle-aside2").hide();
		    $removeEN.prop('disabled', true);
		}

	});



});

//Delete Row
var $table = $('#hospital-editable'), $removeEN = $('#hospital-confirm-deleteEN');

$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
    $removeEN.prop('disabled', !$table.bootstrapTable('getSelections').length);
});


// format for Vehicle Column.
// =================================================================
function resellerFormatter(value, row) {
	return '<a href="#" class="btn-link" > Reseller #' + value + '</a>';
}


// Format for User Name Column.
// =================================================================
function nameFormatter(value, row) {
	return '<a href="#" class="btn-link" > ' + value + '</a>';
}


// Format for Order Date Column.
// =================================================================
function dateFormatter(value, row) {
	var icon = row.id % 2 === 0 ? 'fa-star' : 'fa-user';
	return '<span class="text-muted"><i class="fa fa-clock-o"></i> ' + value + '</span>';
}

//  Format for Status Column.
// =================================================================
function categoryFormatter(value, row) {
    var labelColor;
    var text;

	if (value == 1) {
	    labelColor = "success";
	    text = "Hospital";
	}else if(value == 2){
	    labelColor = "success";
	    text = "Nursing Home";
	}

	return '<div class="label label-table label-'+ labelColor+'"> ' + text + '</div>';
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


$(function () {


    $('.tgl-menu-btn').click(function () {

        setTimeout(function () {
            $('#hospital-editable').bootstrapTable('resetView');

        }, 500);


    });

    $('.add-hospital').click(function () {

        setTimeout(function () {
            $('#hospital-editable').bootstrapTable('resetView');

        }, 500);


    });

    $('.add-hospitalEN').click(function () {

        setTimeout(function () {
            $('#hospital-editable').bootstrapTable('resetView');

        }, 500);


    });

    $('.edit-hospital').click(function () {

        setTimeout(function () {
            $('#hospital-editable').bootstrapTable('resetView');

        }, 500);


    });

    $('.edit-hospitalEN').click(function () {

        setTimeout(function () {
            $('#hospital-editable').bootstrapTable('resetView');

        }, 500);


    });


});


window.onresize = function (event) {
    setTimeout(function () {
        $('#hospital-editable').bootstrapTable('resetView');

    }, 500);
};