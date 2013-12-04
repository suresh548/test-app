/*
Copyright : Accenture India
Author : Accenture Interactive
Description : This file does all the necessary Java Script actions* for Copy,Upload,Move,Delete,
	  Download,Manage Categories & Manage Tags
	  
	  The functionality for Move & Delete are performed by movedelete.js
	  
	  The Java Script Actions performed for the each use case are as follows
	  Copy - Hide & Show the ui components & Start Copying done by startCopying().
	  Move - Hide & Show the ui components.Triggering move is done by movedelete.js
	  Upload - Hide & Show the ui components. Triggering for upload is done as POST form action
	  Delete - Hide & Show the ui components. Triggering delete is done by movedelete.js
	  Download - Hide & Show the ui components. Triggering for download is done as POST form action
	  Manage Categories - Hide & Show the ui components & Start Copying done by 
						  startUpdatingCategories().
	  Manage Tags - Hide & Show the ui components & Start Copying done by 
						  startUpdatingTags().
			  
*/
var browserName = '';
var loggedUser = '';
var loggedUserName = '';

var space_url = '';
var to_url = '';
var redirection_url = '';
var source_html_url = '';

var files_row = '';
var docs_row = '';
var disc_row = '';
var idea_row = '';
var blog_row = '';
var poll_row = '';

var src_space_name = '';
var dest_space_name = '';

var to_place_blog_url = '';
var Grp_file_json = '';
var Grp_doc_json = '';
var Grp_idea_json = '';
var Grp_disc_json = '';
var Grp_blog_json = '';
var Grp_poll_json = '';
var finalJSON = '';
var sel_action_val = '';
var msg2 = 'Please select a place.';

//variables for categories
var errorReferenceCatArray = new Array();
var errorDeReferenceCatArray = new Array();
var referenceCatArrayIndex = 0;
var deReferenceCatArrayIndex = 0;
var dotIndex = 0;
var tagPopulatList = new Array();
var completeTagIndex = 0;
var fromRequestAction = '';
var global_from_place_name = '';
var site_url = document.referrer;
var uploadContinueAction = false;
var downloadContinueAction = false;
var contentCheckedIndex = 0;
var contentUnCheckedIndex = 0;
var mainCheckedItems = new Array();
var mainUncheckItems = new Array();
//for categories
var contentCheckedIndex = 0;
var contentUnCheckedIndex = 0;
var catSelection = false;
var catIndex = 0;
var catRedirectUrl = '';
//end
//for tags
var tagSelection = false;
var tagIndex = 0;
var tagRedirectUrl = '';
//end

var addId = new Array();
var arrayIndex = 0;

function showLoading() {
    $("#maskLoad").mask("Please Wait...");
}

function hideLoading() {

    $("#maskLoad").unmask();
}

function handleResponse(data) {
    alert("Error in Application..!!");
    console.log(data);
}

function onPageLoad() {

    // Detect the browser for adding different code when using IE.
    navigator.sayswho = (function () {
        var N = navigator.appName,
            ua = navigator.userAgent,
            tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        M = M ? [M[1]] : [N];

        browserName = M;
    })();

    // Set the margins and position for given elements while loading the page in IE.
    if (browserName == "MSIE") {
        $('#deleteFrom').css("margin-left", "200px");
        $('#del_place').css("margin-left", "245px");
        $('#deleteTo').css("margin-left", "262px");
        $('#del_select_items_button').css("margin-left", "240px");
        $('#dwn_place').css("margin-left", "250px");
        $('#dwnTo').css("margin-left", "255px");
        $('#dwn_select_items_button').css("margin-left", "245px");
    }

    // Identifying the logged-in user.
    osapi.people.get({
        userId: '@me'
    }).execute(function (response) {
        loggedUser = response.id;
        loggedUserName = response.name.formatted;
    });

}
/*
	Triggered on changing the Bulk Action combobox. This function does the hide/show of the 
	ui components for copy,move,delete,upload,download,Manage Tags,Manage Categories, based
	on the variable sel_action
	
*/
function selected_action() {
    // Check which action is selected by user copy/move/delete/upload/download &
    // hide show elements accordingly.
    var sel_action = document.getElementById("src_place");
    sel_action_val = sel_action.options[sel_action.selectedIndex].value;

    var dialog_obj3 = $("#uploadIE");
    dialog_obj3.dialog("close");

    if (sel_action_val == "copy") {

        src_space_name = '';
        dest_space_name = '';
        $("#cmdu").text("Copy");
        $("#to_space").hide();
        $("#from_place").show();
        $("#tab_items").show();
        $("#dwnFrom").hide();
        $("#dwn_from_space").hide();
        $("#dwn_from_group").hide();
        $("#dwn_from_project").hide();
        $("#dwn_place").hide();
        $("#dwnTo").hide();
        $("#dwn_select_items_button").hide();
        $("#to_group").hide();
        $("#to_project").hide();
        $("#from_space").hide();
        $("#from_group").hide();
        $("#from_project").hide();
        $("#del_from_space").hide();
        $("#del_from_group").hide();
        $("#del_from_project").hide();
        $("#up_from_space").hide();
        $("#up_from_group").hide();
        $("#up_from_project").hide();
        $("#deleteFrom").hide();
        $("#upFrom").hide();
        $('#all_selected_items').css("margin-top", "0px");
        $('#selected_items').css("margin-top", "0px");
        document.getElementById("deleteTo").style.display = "inline";
        $("#deleteTo").hide();
        $("#upTo").hide();
        document.getElementById("del_select_items_button").style.display = "inline";
        document.getElementById("up_select_items_button").style.display = "inline";
        $("#del_select_items_button").hide();
        $("#up_select_items_button").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
        document.getElementById("del_place").style.display = "inline";
        document.getElementById("up_place").style.display = "inline";
        $("#del_place").hide();
        $("#up_place").hide();
        $("#change_selection_div").hide();
        $("#stylized").show();
        $("#showDiv").show();
        $("#to_place").show();
        document.getElementById("to_place").disabled = true;
        $("#copyTo").show();
        $('#from_label').text("Copy From:");
        $('#to_label').text("Copy To:");
        $('#from_label').show();
        $('#to_label').show();
        $('#select_items_button').hide();

        $("#copyTo").text("Copy this:").append('<br/>');
        $('#start_copying_button').val('Start Copying');
        //******************Hidiing all the items with reagard to categories
        $("#catShow").hide();
        $("#catFrom").hide();
        $("#cat_from_space").hide();
        $("#cat_from_group").hide();
        $("#cat_from_project").hide();
        $("#cat_place").hide();
        $("#selCat").hide();
        $("#cat_sel").hide();
        $("#catTo").hide();
        $("#cat_select_items_button").hide();
        $("#selected_items_categories").hide();
        //***********************End***************8
        //Hiding all the items with regard to tags
        $("#tagShow").hide();
        $("#tagFrom").hide();
        $("#tag_from_space").hide();
        $("#tag_from_group").hide();
        $("#tag_from_project").hide();
        $("#tag_place").hide();
        $("#selTag").hide();
        $("#tag_sel").hide();
        $("#add_tag_button").hide();
        $("#tagTo").hide();
        $("#tag_select_items_button").hide();
        //*********************End*********

        $('#start_copying_button').unbind('click').click(function () {
            startCopying();
        });
    } else if (sel_action_val == "move") {
        document.getElementById("to_place").disabled = true;
        src_space_name = '';
        dest_space_name = '';
        $("#cmdu").text("Move");
        $("#dwn_from_space").hide();
        $("#dwn_from_group").hide();
        $("#dwn_from_project").hide();
        $("#dwn_place").hide();
        $("#dwn_select_items_button").hide();
        $("#dwnTo").hide();
        $('#all_selected_items').css("margin-top", "0px");
        $('#selected_items').css("margin-top", "0px");
        $("#to_space").hide();
        $("#from_place").show();
        $("#tab_items").show();
        $("#to_group").hide();
        $("#dwnFrom").hide();
        $("#to_project").hide();
        $("#from_space").hide();
        $("#from_group").hide();
        $("#from_project").hide();
        $("#del_from_space").hide();
        $("#del_from_group").hide();
        $("#del_from_project").hide();
        $("#deleteFrom").hide();
        $("#up_from_space").hide();
        $("#up_from_group").hide();
        $("#up_from_project").hide();
        $("#upFrom").hide();
        document.getElementById("deleteTo").style.display = "inline";
        document.getElementById("upTo").style.display = "inline";
        $("#deleteTo").hide();
        $("#upTo").hide();
        document.getElementById("del_select_items_button").style.display = "inline";
        document.getElementById("up_select_items_button").style.display = "inline";
        $("#del_select_items_button").hide();
        $("#up_select_items_button").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
        document.getElementById("del_place").style.display = "inline";
        document.getElementById("up_place").style.display = "inline";
        $("#del_place").hide();
        $("#up_place").hide();
        $("#change_selection_div").hide();
        $("#stylized").show();
        $("#showDiv").show();
        $("#to_place").show();
        $("#copyTo").show();
        $('#from_label').text("Move From:");
        $('#to_label').text("Move To:");
        $('#from_label').show();
        $('#to_label').show();
        $('#select_items_button').hide();
        $("#copyTo").text("Move this:").append('<br/>');
        $('#start_copying_button').val('Start Moving');
        //******************Hidiing all the items with reagard to categories
        $("#catShow").hide();
        $("#catFrom").hide();
        $("#cat_from_space").hide();
        $("#cat_from_group").hide();
        $("#cat_from_project").hide();
        $("#cat_place").hide();
        $("#selCat").hide();
        $("#cat_sel").hide();
        $("#catTo").hide();
        $("#cat_select_items_button").hide();
        $("#selected_items_categories").hide();
        //***********************End***************8
        //Hiding all the items with regard to tags
        $("#tagShow").hide();
        $("#tagFrom").hide();
        $("#tag_from_space").hide();
        $("#tag_from_group").hide();
        $("#tag_from_project").hide();
        $("#tag_place").hide();
        $("#selTag").hide();
        $("#tag_sel").hide();
        $("#add_tag_button").hide();
        $("#tagTo").hide();
        $("#tag_select_items_button").hide();
        //*********************End*********
        $('#start_copying_button').unbind('click').click(function () {
            startMoving();
        });
    } else if (sel_action_val == "delete") {
        src_space_name = '';
        dest_space_name = '';
        $("#dwn_from_space").hide();
        $("#dwn_from_group").hide();
        $("#dwn_from_project").hide();
        $("#dwn_place").hide();
        $("#dwnTo").hide();
        $("#cmdu").text("Delete");
        $("#dwn_select_items_button").hide();
        $("#dwnFrom").hide();
        $("#tab_items").show();
        $('#all_selected_items').css("margin-top", "80px");
        $('#selected_items').css("margin-top", "80px");
        $("#change_selection_div").hide();
        $("#showDiv").hide();
        document.getElementById("del_place").style.display = "inline";
        document.getElementById("del_select_items_button").style.display = "inline";
        document.getElementById("up_select_items_button").style.display = "inline";
        document.getElementById("up_place").style.display = "inline";
        $("#del_place").css("margin-top", "110px");
        $("#del_select_items_button").hide();
        $("#up_select_items_button").hide();
        $("#copyTo").hide();
        $("#up_place").hide();
        $("#delShow").show();
        $("#upShow").hide();
        $("#upTo").hide();
        $("#del_from_space").hide();
        $("#del_from_group").hide();
        $("#del_from_project").hide();
        $("#up_from_space").hide();
        $("#up_from_group").hide();
        $("#up_from_project").hide();
        document.getElementById("deleteFrom").style.display = "inline";
        document.getElementById("upFrom").style.display = "inline";
        $('#upFrom').hide();
        $('#from_label').hide();
        $('#to_label').hide();
        $('#to_place').hide();
        $("#to_space").hide();
        $("#to_group").hide();
        $("#to_project").hide();
        $('#select_items_button').hide();
        $('#start_copying_button').val('Start Deleting');
        //******************Hidiing all the items with reagard to categories
        $("#catShow").hide();
        $("#catFrom").hide();
        $("#cat_from_space").hide();
        $("#cat_from_group").hide();
        $("#cat_from_project").hide();
        $("#cat_place").hide();
        $("#selCat").hide();
        $("#cat_sel").hide();
        $("#catTo").hide();
        $("#cat_select_items_button").hide();
        $("#selected_items_categories").hide();
        //***********************End***************8
        //Hiding all the items with regard to tags
        $("#tagShow").hide();
        $("#tagFrom").hide();
        $("#tag_from_space").hide();
        $("#tag_from_group").hide();
        $("#tag_from_project").hide();
        $("#tag_place").hide();
        $("#selTag").hide();
        $("#tag_sel").hide();
        $("#add_tag_button").hide();
        $("#tagTo").hide();
        $("#tag_select_items_button").hide();
        //*********************End*********
        $('#start_copying_button').unbind('click').click(function () {
            startDeleting();
        });
    } else if (sel_action_val == "uploadd") {
        //******************Hidiing all the items with reagard to categories
        $("#catShow").hide();
        $("#catFrom").hide();
        $("#cat_from_space").hide();
        $("#cat_from_group").hide();
        $("#cat_from_project").hide();
        $("#cat_place").hide();
        $("#selCat").hide();
        $("#cat_sel").hide();
        $("#catTo").hide();
        $("#cat_select_items_button").hide();
        $("#selected_items_categories").hide();
        //***********************End***************8
        //Hiding all the items with regard to tags
        $("#tagShow").hide();
        $("#tagFrom").hide();
        $("#tag_from_space").hide();
        $("#tag_from_group").hide();
        $("#tag_from_project").hide();
        $("#tag_place").hide();
        $("#selTag").hide();
        $("#tag_sel").hide();
        $("#add_tag_button").hide();
        $("#tagTo").hide();
        $("#tag_select_items_button").hide();
        //*********************End*********

        if (browserName == "MSIE") {

            src_space_name = '';
            dest_space_name = '';
            $("#cmdu").text("Upload");
            $("#dwn_from_space").hide();
            $("#dwn_from_group").hide();
            $("#dwn_from_project").hide();
            $("#dwn_place").hide();
            $("#dwnTo").hide();
            $("#dwn_select_items_button").hide();
            $('#all_selected_items').css("margin-top", "80px");
            $('#selected_items').css("margin-top", "80px");
            $("#change_selection_div").hide();
            $("#showDiv").hide();
            $("#deleteFrom").hide();
            $("#dwnFrom").hide();
            document.getElementById("deleteTo").style.display = "inline";
            $("#deleteTo").hide();
            document.getElementById("up_place").style.display = "inline";
            document.getElementById("del_select_items_button").style.display = "inline";
            document.getElementById("up_select_items_button").style.display = "inline";
            $("#del_place").hide();
            $("#del_select_items_button").hide();
            $("#up_select_items_button").hide();
            $("#copyTo").hide();
            $("#delShow").hide();
            $("#upShow").hide();
            $("#up_place").hide();
            $('#up_place').css("margin-top", "90px");
            $("#del_from_space").hide();
            $("#del_from_group").hide();
            $("#del_from_project").hide();
            $("#up_from_space").hide();
            $("#up_from_group").hide();
            $("#up_from_project").hide();
            document.getElementById("upFrom").style.display = "inline";
            $('#from_label').hide();
            $('#to_label').hide();
            $('#to_place').hide();
            $("#to_space").hide();
            $("#to_group").hide();
            $("#to_project").hide();
            $('#select_items_button').hide();

            $("#uploadIE").show();
            $("#uploadIE").dialog();

            $("#src_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#src_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#src_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

        } else {
            src_space_name = '';
            dest_space_name = '';
            $("#dwn_from_space").hide();
            $("#dwn_from_group").hide();
            $("#dwn_from_project").hide();
            $("#dwn_place").hide();
            $("#dwnTo").hide();
            $("#cmdu").text("Upload");
            $('#all_selected_items').css("margin-top", "80px");
            $("#dwnFrom").hide();
            $('#selected_items').css("margin-top", "80px");
            $("#change_selection_div").hide();
            $("#showDiv").hide();
            $("#deleteFrom").hide();
            document.getElementById("deleteTo").style.display = "inline";
            $("#deleteTo").hide();
            document.getElementById("up_place").style.display = "inline";
            document.getElementById("del_select_items_button").style.display = "inline";
            document.getElementById("up_select_items_button").style.display = "inline";
            $("#del_place").hide();
            $("#del_select_items_button").hide();
            $("#up_select_items_button").hide();
            $("#copyTo").hide();
            $("#delShow").hide();
            $("#upShow").show();
            $("#dwn_select_items_button").hide();
            $("#up_place").show();
            $('#up_place').css("margin-top", "90px");
            $("#del_from_space").hide();
            $("#del_from_group").hide();
            $("#del_from_project").hide();
            $("#up_from_space").hide();
            $("#up_from_group").hide();
            $("#up_from_project").hide();
            document.getElementById("upFrom").style.display = "inline";
            $('#from_label').hide();
            $('#to_label').hide();
            $('#to_place').hide();
            $("#to_space").hide();
            $("#to_group").hide();
            $("#to_project").hide();
            $('#select_items_button').hide();
        }
    } else if (sel_action_val == "download") {
        src_space_name = '';
        dest_space_name = '';
        $("#cmdu").text("Download");
        $("#tab_items").hide();
        $('#all_selected_items').css("margin-top", "80px");
        $('#selected_items').css("margin-top", "80px");
        $("#change_selection_div").hide();
        $("#showDiv").hide();
        document.getElementById("del_place").style.display = "inline";
        document.getElementById("del_select_items_button").style.display = "inline";
        document.getElementById("up_select_items_button").style.display = "inline";
        document.getElementById("up_place").style.display = "inline";
        $("#del_place").css("margin-top", "110px");
        $("#del_select_items_button").hide();
        $("#up_select_items_button").hide();
        $("#copyTo").hide();
        $("#up_place").hide();
        $("#dwn_select_items_button").hide();
        $("#deleteTo").hide();
        $("#delShow").hide();
        $("#dwnShow").show();
        $("#upShow").hide();
        $("#upTo").hide();
        $("#del_from_space").hide();
        $("#del_from_group").hide();
        $("#del_from_project").hide();
        $("#up_from_space").hide();
        $("#up_from_group").hide();
        $("#up_from_project").hide();
        document.getElementById("deleteFrom").style.display = "inline";
        document.getElementById("upFrom").style.display = "inline";

        $('#dwnFrom').show();
        $('#upFrom').hide();
        $('#from_label').hide();
        $('#to_label').hide();
        $('#to_place').hide();
        $("#to_space").hide();
        $("#to_group").hide();
        $("#to_project").hide();
        $('#select_items_button').hide();
        $('#start_copying_button').val('Start Downloading');
        //******************Hidiing all the items with reagard to categories
        $("#catShow").hide();
        $("#catFrom").hide();
        $("#cat_from_space").hide();
        $("#cat_from_group").hide();
        $("#cat_from_project").hide();
        $("#cat_place").hide();
        $("#selCat").hide();
        $("#cat_sel").hide();
        $("#catTo").hide();
        $("#cat_select_items_button").hide();
        $("#selected_items_categories").hide();
        //***********************End***************8
        //Hiding all the items with regard to tags
        $("#tagShow").hide();
        $("#tagFrom").hide();
        $("#tag_from_space").hide();
        $("#tag_from_group").hide();
        $("#tag_from_project").hide();
        $("#tag_place").hide();
        $("#selTag").hide();
        $("#tag_sel").hide();
        $("#add_tag_button").hide();
        $("#tagTo").hide();
        $("#tag_select_items_button").hide();
        //*********************End*********
        $('#start_copying_button').unbind('click').click(function () {
            startDownloading();
        });
    } else if (sel_action_val == "categs") {
        src_space_name = '';
        dest_space_name = '';
        $("#cat_place").css("margin-top", 0);
        //Show the items related to categories and hide the others
        $("#cmdu").text("Manage Categories");
        $("#catShow").show();
        $("#catFrom").show();
        $("#cat_place").show();
        $("#selCat").hide();
        $("#cat_sel").hide();
        $("#catTo").hide();
        $("#cat_select_items_button").hide();
        $("#cat_from_space").hide();
        $("#cat_from_group").hide();
        $("#cat_from_project").hide();
        $("#selected_items_categories").hide();
        $("#refresh_app_button").hide();
        $("#refresh_app").hide();
        $("#newUpSel").hide();
        $("#start_copying_button").hide();
        $("#start_uploading").hide();
        $("#change_contents").hide();
        //*********************End*********************
        //hide the finale tags items also 
        $("#finalTagShow").hide();
        $("#finale_tagFrom").hide();
        $("#finale_tag_from_space").hide();
        $("#finale_tag_from_group").hide();
        $("#finale_tag_from_project").hide();
        $("#finalSelTag").hide();
        $("#finale_tag_sel").hide();
        $("#finale_add_tag").hide();
        $("#tag_select_items_button").hide();
        $("#finale_finalTagTo").hide();
        //End
        //Hide all the items with regard to Manage Tags*************
        $("#tagShow").hide();
        $("#tagFrom").hide();
        $("#tag_place").hide();
        $("#selTag").hide();
        $("#tag_sel").hide();
        $("#tagTo").hide();
        $("#tag_from_space").hide();
        $("#tag_from_group").hide();
        $("#tag_from_project").hide();
        $("#add_tag_button").hide();
        $("#tag_select_items_button").hide();
        document.getElementById("cat_place").style.display = "inline";
        //*************End****************

        //Hide all the items with regard to download
        $("#dwnShow").hide();
        $("#dwnFrom").hide();
        $("#dwn_from_space").hide();
        $("#dwn_from_group").hide();
        $("#dwn_from_project").hide();
        $("#dwn_place").hide();
        $("#dwnTo").hide();
        $("#dwn_select_items_button").hide();

        $("#tab_items").show();
        $("#change_selection_div").hide();
        $("#selected_items_categories").hide();
        $('#select_items_button').hide();
        $("#showDiv").hide();
        $("#copyTo").hide();
        document.getElementById("del_place").style.display = "inline";
        document.getElementById("del_select_items_button").style.display = "inline";
        document.getElementById("up_select_items_button").style.display = "inline";
        document.getElementById("up_place").style.display = "inline";
        //*******************hide all items with regard to delete
        $("#delShow").hide();
        $("#deleteFrom").hide();
        $("#del_from_space").hide();
        $("#del_from_group").hide();
        $("#del_from_project").hide();
        $("#del_place").hide();
        $("#deleteTo").hide();
        $("#del_select_items_button").hide();

        //*************Hide all elements with regard to upload
        $("#upShow").hide();
        $("#up_place").hide();
        $('#upFrom').hide();
        $("#up_select_items_button").hide();
        $("#up_from_space").hide();
        $("#up_from_group").hide();
        $("#up_from_project").hide();
        $("#upTo").hide();


        document.getElementById("deleteFrom").style.display = "inline";
        document.getElementById("upFrom").style.display = "inline";

        $('#from_label').hide();
        $('#to_label').hide();
        $('#from_space').hide();
        $('#from_group').hide();
        $('#from_project').hide();
        $('#to_space').hide();
        $('#to_group').hide();
        $('#to_project').hide();
        $('#from_place').hide();
        $('#to_place').hide();
        $('#button_div').hide();
    } else if (sel_action_val == "tags") {
        src_space_name = '';
        dest_space_name = '';
        $("#tagShow").show();
        $("#catShow").hide();
        $("#deleteTo").hide();
        $("#tag_select_items_button").hide();
        $("#selCat").hide();
        $("#cat_place").hide();
        $("#cat_sel").hide();
        $("#catFrom").hide();
        $("#cat_from_space").hide();
        $("#cat_from_group").hide();
        $("#cat_from_project").hide();
        $("#catTo").hide();
        $("#tag_update_text").hide();
        $("#cat_select_items_button").hide();
        document.getElementById("tag_place").style.display = "inline";
        $("#tag_place").show();
        //$("#tagFrom").css("margin-top", "-40px");
        $("#tagFrom").show();
        //$("#tag_place").css("margin-top", parseInt($("#tagFrom").css("margin-top"))+parseInt($("#tagFrom").css("height"))+10+'px');
        //$("#tag_place").css("margin-top", "-20px");
        //$("#del_place").css("margin-top", "110px");
        //$('#tag_place').css("margin-top", "110px");
        $("#dwnFrom").hide();
        $("#del_place").hide();
        $("#dwn_from_space").hide();
        $("#dwn_from_group").hide();
        $("#dwn_from_project").hide();
        $("#dwn_place").hide();
        $("#dwnTo").hide();
        $("#cmdu").text("Delete");
        $("#dwn_select_items_button").hide();
        $("#dwnFrom").hide();
        $("#tab_items").show();
        //$('#all_selected_items').css("margin-top", "80px");
        //$('#selected_items').css("margin-top", "80px");
        $("#change_selection_div").hide();
        $("#showDiv").hide();
        //document.getElementById("del_place").style.display="inline";
        document.getElementById("del_select_items_button").style.display = "inline";
        document.getElementById("up_select_items_button").style.display = "inline";
        document.getElementById("up_place").style.display = "inline";
        //$("#del_place").css("margin-top", "110px");
        $("#del_select_items_button").hide();
        $("#up_select_items_button").hide();
        $("#dwn_select_items_button").hide();
        $("#copyTo").hide();
        $("#up_place").hide();
        $("#delShow").hide();
        $("#catShow").hide();
        $("#tagShow").show();
        $("#upShow").hide();
        $("#upTo").hide();
        $("#del_from_space").hide();
        $("#del_from_group").hide();
        $("#del_from_project").hide();
        $("#up_from_space").hide();
        $("#up_from_group").hide();
        $("#up_from_project").hide();
        document.getElementById("deleteFrom").style.display = "inline";
        document.getElementById("upFrom").style.display = "inline";
        $('#upFrom').hide();
        $('#from_label').hide();
        $('#to_label').hide();
        $('#to_place').hide();
        $("#to_space").hide();
        $("#to_group").hide();
        $("#to_project").hide();
        $('#select_items_button').hide();
        $('#start_copying_button').val('Start Deleting');
        $('#start_copying_button').unbind('click').click(function () {
            startDeleting();
        });
    } else if (sel_action_val == "select_action") {
        src_space_name = '';
        dest_space_name = '';

        document.getElementById("del_place").style.display = "inline";
        $("#change_selection_div").hide();
        $("#dwn_from_space").hide();
        $("#dwn_select_items_button").hide();
        $("#dwn_from_group").hide();
        $("#dwn_from_project").hide();
        $("#dwn_place").hide();
        $("#dwnTo").hide();
        $("#dwnFrom").hide();
        $("#deleteFrom").hide();
        $("#upFrom").hide();
        document.getElementById("deleteTo").style.display = "inline";
        document.getElementById("upTo").style.display = "inline";
        $("#deleteTo").hide();
        $("#upTo").hide();
        document.getElementById("del_select_items_button").style.display = "inline";
        document.getElementById("up_select_items_button").style.display = "inline";
        $("#del_select_items_button").hide();
        $("#up_select_items_button").hide();
        $("#del_from_space").hide();
        $("#del_from_group").hide();
        $("#del_from_project").hide();
        $("#up_from_space").hide();
        $("#up_from_group").hide();
        $("#up_from_project").hide();
        $("#showDiv").hide();
        $("#copyTo").hide();
        $("#delShow").hide();
        $("#del_place").hide();
        $("#upShow").hide();
        $("#up_place").hide();
        $('#select_items_button').hide();
        //******************Hidiing all the items with reagard to categories
        $("#catShow").hide();
        $("#catFrom").hide();
        $("#cat_from_space").hide();
        $("#cat_from_group").hide();
        $("#cat_from_project").hide();
        $("#cat_place").hide();
        $("#selCat").hide();
        $("#cat_sel").hide();
        $("#catTo").hide();
        $("#cat_select_items_button").hide();
        $("#selected_items_categories").hide();
        //***********************End***************8
        //Hiding all the items with regard to tags
        $("#tagShow").hide();
        $("#tagFrom").hide();
        $("#tag_from_space").hide();
        $("#tag_from_group").hide();
        $("#tag_from_project").hide();
        $("#tag_place").hide();
        $("#selTag").hide();
        $("#tag_sel").hide();
        $("#add_tag_button").hide();
        $("#tagTo").hide();
        $("#tag_select_items_button").hide();
        //*********************End*********
    }
}

/*
	This function is triggerd for copy/move. Based on the value of from_sel_place the 
	#from_place is populated.
	functionality : Upon Selecting place the combobox changes to "change place".
*/
function fromPlace() {
    // Identifies which space/group/project the user  has chosen the content to copy/move and calls the relevant method.
    var from_place = document.getElementById("from_place");
    var from_sel_place = from_place.options[from_place.selectedIndex].value;

    if (from_sel_place == "select_space") {
        src_space_name = '';
        dest_space_name = '';
        document.getElementById("to_space").innerHTML = msg2;
        document.getElementById("to_group").innerHTML = msg2;
        document.getElementById("to_project").innerHTML = msg2;
        $("#change_selection_div").hide();
        $("#change_contents").hide();
        $("#start_copying_button").hide();
        fromSpaceRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (from_sel_place == "select_group") {
        src_space_name = '';
        dest_space_name = '';
        document.getElementById("to_space").innerHTML = msg2;
        document.getElementById("to_group").innerHTML = msg2;
        document.getElementById("to_project").innerHTML = msg2;
        $("#change_selection_div").hide();
        $("#change_contents").hide();
        $("#start_copying_button").hide();
        fromGroupRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (from_sel_place == "select_project") {
        src_space_name = '';
        dest_space_name = '';
        document.getElementById("to_space").innerHTML = msg2;
        document.getElementById("to_group").innerHTML = msg2;
        document.getElementById("to_project").innerHTML = msg2;
        $("#change_selection_div").hide();
        $("#change_contents").hide();
        $("#start_copying_button").hide();
        fromProjectRequest();
        document.getElementById("copyTo").style.visibility = "hidden";
    } else if (from_sel_place == "select_one") {
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
    }
}

/**
	This function is triggerd by #del_place onchange(). It takes the value passes it 
	fromSpaceRequest(),fromGroupRequest(),fromProjectRequest() to accept the value
*/
function delFromPlace() {
    // Identifies which space/group/project the user  has chosen the content to delete from and calls the relevant method.
    var from_place = document.getElementById("del_place");
    var from_sel_place = from_place.options[from_place.selectedIndex].value;

    if (from_sel_place == "select_space") {
        fromSpaceRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (from_sel_place == "select_group") {
        fromGroupRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (from_sel_place == "select_project") {
        fromProjectRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (from_sel_place == "select_one") {
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
    }
}

/**
	This function is triggerd by #dwn_place onchange() for download. It takes the value passes it 
	fromSpaceRequest(),fromGroupRequest(),fromProjectRequest() to accept the value
*/
function dwnFromPlace() {
    // Identifies which space/group/project user has chosen to download content from and calls the appropriate method.
    var from_place = document.getElementById("dwn_place");
    var from_sel_place = from_place.options[from_place.selectedIndex].value;

    if (from_sel_place == "select_space") {
        fromSpaceRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (from_sel_place == "select_group") {
        fromGroupRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (from_sel_place == "select_project") {
        fromProjectRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (from_sel_place == "select_one") {
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
    }
}

/**
	This function is triggerd by #up_place onchange() for upload. It takes the value passes it 
	fromSpaceRequest(),fromGroupRequest(),fromProjectRequest() to accept the value
*/

function upFromPlace() {
    // Identifies which space/group/project user has chosen to upload file to and calls the appropriate method.
    var up_place = document.getElementById("up_place");
    var up_sel_place = up_place.options[up_place.selectedIndex].value;

    if (up_sel_place == "select_space") {
        toSpaceRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (up_sel_place == "select_group") {
        toGroupRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (up_sel_place == "select_project") {
        toProjectRequest();
        document.getElementById("copyTo").style.visibility = "hidden";

    } else if (up_sel_place == "select_one") {
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
    }
}

/**
	This function is triggerd by #to_place onchange() for copy,move. It takes the value passes it 
	fromSpaceRequest(),fromGroupRequest(),fromProjectRequest() to accept the value
*/

function toPlace() {
    // Identifies which space/group/project the user  has chosen to copy/move the selected content and calls the relevant method.
    var to_place = document.getElementById("to_place");
    var to_sel_place = to_place.options[to_place.selectedIndex].value;

    if (to_sel_place == "to_space") {
        toSpaceRequest();
    } else if (to_sel_place == "to_group") {
        toGroupRequest();
    } else if (to_sel_place == "to_project") {
        toProjectRequest();
    } else if (to_sel_place == "select_to") {
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
    }
}

/**
	This function accepts the place url and opens as place-request picker dialog  box for
	Space .Base on the place selected it hide/shows the ui components
*/
function fromSpaceRequest() {
    // Handles user request to select the SPACE and then handle the response to fetch details about the selected SPACE.

    var from_place_name = '';
    src_space_name = '';
    dest_space_name = '';

    //Code related to categories
    selected_cat = '';
    selected_tag = '';
    arrayIndex = 0;
    addId = new Array();
    tagPopulatList = new Array();
    //Assigning the values 
    $("#cat_from_space").text('Change Category in Space');
    $("#cat_from_group").text('Change Category in Group');
    $("#cat_from_project").text('Change Category in Project');

    $("#tag_from_space").text('Manage Tags in Space');
    $("#tag_from_group").text('Manage Tags in Group');
    $("#tag_from_project").text('Manage Tags in Project');
    //**************
    //******************End***************

    document.getElementById("to_place").disabled = false;
    document.getElementById("from_project").innerHTML = msg2;
    document.getElementById("from_group").innerHTML = msg2;
    document.getElementById("from_space").innerHTML = msg2;
    var params = {
        type: "space",
        success: (function (data) {
            //consolelog("DATA: "+JSON.stringify(data));

            // Assigns values to the variables from the received response.
            from_place_name = data.name;
            src_space_name = from_place_name;
            space_url = data.resources.self.ref;
            blog_url = data.resources.blog.ref;
            source_html_url = data.resources.html.ref;
            global_from_place_name = src_space_name; //code added for categories

            $("#del_place").hide();
            document.getElementById("from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + from_place_name;

            // Check if the source place is empty and reset the values accordingly.
            if (from_place_name != '') {
                if (dest_space_name == from_place_name) {
                    if (sel_action_val == "move") {
                        // Showing an error message if the source and target is same for move.
                        $("#dialogMove").show();
                        $("#dialogMove").dialog();
                    } else {
                        // Showing an error message if the source and target is same for copy.
                        $("#dialog").show();
                        $("#dialog").dialog();
                    }
                    document.getElementById("start_copying_button").style.visibility = "hidden";
                    $("#button_div").hide();
                    document.getElementById("from_space").innerHTML = msg2;
                    document.getElementById("copyTo").style.visibility = "hidden";
                } else {
                    var dialog_obj = $("#dialog");
                    dialog_obj.dialog("close");
                    var dialog_obj2 = $("#dialogMove");
                    dialog_obj2.dialog("close");
                    document.getElementById("to_place").disabled = false;
                    document.getElementById("from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + from_place_name;
                }
            }

            //changing the default dropdown selection to 'Change Place'	   
            $("#from_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#from_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#from_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            //changing the default dropdown selection to 'Change Place'
            $("#del_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#del_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#del_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            //changing the default dropdown selection to 'Change Place'
            $("#dwn_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#dwn_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#dwn_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            // calling methods to fetch content.
            getDocs(space_url);
            getFiles(space_url);
            getDiscussions(space_url);
            getIdeas(space_url);
            getPolls(space_url);
            getBlogs(blog_url);

            // actions when the user choses to delete content.
            if (sel_action_val == "delete") {
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#deleteTo").text("Delete this:").append('<br/>');
                document.getElementById("deleteTo").style.display = "inline";
                $("#deleteTo").show();
                $("#upTo").hide();
                document.getElementById("del_select_items_button").style.display = "inline";
                document.getElementById("up_select_items_button").style.display = "inline";
                $("#del_select_items_button").show();
                $("#up_select_items_button").hide();
                $("#change_selection_div").hide();
                $("#delShow").show();
                $("#upShow").show();
                $("#up_place").hide();
                document.getElementById("del_place").style.display = "inline";
                $("#del_place").show();
                document.getElementById("del_from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + from_place_name;
                $("#del_place").css("margin-top", "140px");
                $("#del_from_space").show();
                $("#del_from_group").hide();
                $("#del_from_project").hide();
            } else if (sel_action_val == "download") {
                // actions when the user choses to download files.
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#dwnTo").text("Download this:").append('<br/>');
                document.getElementById("dwnTo").style.display = "inline";
                $("#dwnTo").show();
                $("#upTo").hide();
                document.getElementById("dwn_select_items_button").style.display = "inline";
                document.getElementById("up_select_items_button").style.display = "inline";
                $("#dwn_select_items_button").show();
                $("#up_select_items_button").hide();
                $("#change_selection_div").hide();
                $("#dwnShow").show();
                $("#upShow").hide();
                $("#up_place").hide();
                document.getElementById("dwn_place").style.display = "inline";
                $("#dwn_place").show();
                document.getElementById("dwn_from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + from_place_name;
                $("#dwn_place").css("margin-top", "135px");
                $("#dwn_from_space").show();
                $("#dwn_from_group").hide();
                $("#dwn_from_project").hide();
            } else if (sel_action_val == "tags") {
                // actions when the user choses to download files.

                tagPopulatList = new Array();
                completeTagIndex = 0;
                fromRequestAction = 'fromSpaceRequestAction';
                populateContentforTags(space_url, blog_url);
            } else if (sel_action_val == "categs") {
                // actions when the user choses to download files.
                $("#catShow").show();
                $("#cat_from_space").show();
                $("#cat_from_group").hide();
                $("#cat_from_project").hide();
                $("#cat_place").show();
                $("#catTo").text("Manage content for this category:").append('<br/>');
                $("#selCat").show();
                $("#cat_sel").show();
                $("#catTo").hide();
                $("#cat_select_items_button").hide();
                //document.getElementById("catTo").style.display="inline";

                $("#cat_sel option").each(function () {
                    $(this).remove();
                });

                document.getElementById("cat_sel").style.display = "inline";
                document.getElementById("cat_place").style.display = "inline";
                document.getElementById("cat_from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + from_place_name;
                $("#cat_place").css("margin-top", "40px");
                categoryTest();
            } else if (sel_action_val == "select_action") {
                // actions if user changes action to default value.
                document.getElementById("del_place").style.display = "inline";
                $("#change_selection_div").hide();
                $("#del_from_space").hide();
                $("#del_from_group").hide();
                $("#del_from_project").hide();
                $("#deleteFrom").hide();
                document.getElementById("deleteTo").style.display = "inline";
                $("#deleteTo").hide();

                $("#showDiv").hide();
                $("#copyTo").hide();
                $("#delShow").hide();
                $("#upShow").hide();
                $("#del_place").hide();
            }

            $("#from_space").show();
            $("#from_group").hide();
            $("#from_project").hide();
        }),
        error: handleResponse
    };

    if (from_place_name == '') {
        // actions if the selected place name is empty.
        document.getElementById("to_place").disabled = true;
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
        document.getElementById("from_space").innerHTML = msg2;
    }

    // calling the OSAPI with the params. final call.
    osapi.jive.corev3.places.requestPicker(params);
}

/**
	This function accepts the place url and opens as place-request picker dialog  box for
	Group .Base on the place selected it hide/shows the ui components
*/
function fromGroupRequest() {
    // Handles user request to select the GROUP and then handle the response to fetch details about the selected GROUP.

    var from_place_name = '';
    src_space_name = '';
    dest_space_name = '';
    //Code related to categories
    selected_cat = '';
    selected_tag = '';
    arrayIndex = 0;
    addId = new Array();
    tagPopulatList = new Array();
    //Assigning the values 
    $("#cat_from_space").text('Change Category in Space');
    $("#cat_from_group").text('Change Category in Group');
    $("#cat_from_project").text('Change Category in Project');

    $("#tag_from_space").text('Manage Tags in Space');
    $("#tag_from_group").text('Manage Tags in Group');
    $("#tag_from_project").text('Manage Tags in Project');

    //**************
    //******************End***************
    document.getElementById("to_place").disabled = false;
    document.getElementById("from_project").innerHTML = msg2;
    document.getElementById("from_group").innerHTML = msg2;
    document.getElementById("from_space").innerHTML = msg2;
    var params = {
        type: "group",
        success: (function (data) {
            //console.log("DATA: "+JSON.stringify(data));

            // assigning values to the variables from the received response.
            from_place_name = data.name;
            src_space_name = from_place_name;
            space_url = data.resources.self.ref;
            blog_url = data.resources.blog.ref;
            source_html_url = data.resources.html.ref;
            global_from_place_name = src_space_name; //code added for categories

            $("#del_place").hide();
            document.getElementById("from_group").innerHTML = '<span id="myId" style="text-decoration:underline;">Group</span>' + ': ' + from_place_name;

            if (from_place_name != '') {
                // checking if the selected source and target are same.
                if (dest_space_name == from_place_name) {
                    if (sel_action_val == "move") {
                        // an error message of the source and target are same for move.
                        $("#dialogMove").show();
                        $("#dialogMove").dialog();
                    } else {
                        // an error message of the source and target are same for copy.
                        $("#dialog").show();
                        $("#dialog").dialog();
                    }
                    document.getElementById("start_copying_button").style.visibility = "hidden";
                    $("#button_div").hide();
                    document.getElementById("copyTo").style.visibility = "hidden";
                    document.getElementById("from_group").innerHTML = msg2;
                } else {
                    var dialog_obj = $("#dialog");
                    dialog_obj.dialog("close");
                    var dialog_obj2 = $("#dialogMove");
                    dialog_obj2.dialog("close");
                    document.getElementById("to_place").disabled = false;
                    $("#del_place").hide();
                    document.getElementById("from_group").innerHTML = '<span id="myId" style="text-decoration:underline;">Group</span>' + ': ' + from_place_name;
                }
            }

            //changing the default dropdown value to 'Change Place'
            $("#from_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#from_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#from_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            //changing the default dropdown value to 'Change Place'
            $("#del_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#del_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#del_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            //changing the default dropdown value to 'Change Place'
            $("#dwn_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#dwn_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#dwn_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            // calling methods to fetch content from the selected group.
            getDocs(space_url);
            getFiles(space_url);
            getDiscussions(space_url);
            getIdeas(space_url);
            getPolls(space_url);
            getBlogs(blog_url);

            if (sel_action_val == "delete") {
                // actions when user choses to delete content.
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#deleteTo").text("Delete this:").append('<br/>');
                document.getElementById("deleteTo").style.display = "inline";
                $("#deleteTo").show();
                $("#upTo").hide();
                document.getElementById("del_select_items_button").style.display = "inline";
                document.getElementById("up_select_items_button").style.display = "inline";
                $("#del_select_items_button").show();
                $("#up_select_items_button").hide();
                $("#change_selection_div").hide();
                $("#delShow").show();
                $("#upShow").hide();
                $("#up_place").hide();
                document.getElementById("del_place").style.display = "inline";
                $("#del_place").show();
                document.getElementById("del_from_group").innerHTML = '<span id="myId" style="text-decoration:underline;">Group</span>' + ': ' + from_place_name;
                $("#del_place").css("margin-top", "140px");
                $("#del_from_group").show();
                $("#del_from_space").hide();
                $("#del_from_project").hide();
            } else if (sel_action_val == "download") {
                // actions when user choses to download content.
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#dwnTo").text("Download this:").append('<br/>');
                document.getElementById("dwnTo").style.display = "inline";
                $("#dwnTo").show();
                $("#upTo").hide();
                document.getElementById("dwn_select_items_button").style.display = "inline";
                document.getElementById("up_select_items_button").style.display = "inline";
                $("#dwn_select_items_button").show();
                $("#up_select_items_button").hide();
                $("#change_selection_div").hide();
                $("#dwnShow").show();
                $("#upShow").hide();
                $("#up_place").hide();
                document.getElementById("dwn_place").style.display = "inline";
                $("#dwn_place").show();
                document.getElementById("dwn_from_group").innerHTML = '<span id="myId" style="text-decoration:underline;">Group</span>' + ': ' + from_place_name;
                $("#dwn_place").css("margin-top", "135px");
                $("#dwn_from_group").show();
                $("#dwn_from_space").hide();
                $("#dwn_from_project").hide();
            } else if (sel_action_val == "categs") {
                // actions when the user choses to download files.
                $("#cat_place").css("margin-top", "20px");
                $("#catShow").show();
                $("#cat_from_space").show();
                $("#cat_from_group").hide();
                $("#cat_from_project").hide();
                $("#cat_place").show();
                $("#catTo").text("Manage content for this category:").append('<br/>');
                $("#selCat").show();
                $("#cat_sel").show();
                $("#catTo").hide();
                $("#cat_select_items_button").hide();
                //document.getElementById("catTo").style.display="inline";

                $("#cat_sel option").each(function () {
                    $(this).remove();
                });

                document.getElementById("cat_sel").style.display = "inline";
                document.getElementById("cat_place").style.display = "inline";
                document.getElementById("cat_from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + from_place_name;
                $("#cat_place").css("margin-top", "40px");
                categoryTest();
            } else if (sel_action_val == "tags") {
                //alert("Inside tags...");
                tagPopulatList = new Array();
                completeTagIndex = 0;
                fromRequestAction = 'fromGroupRequestAction';
                populateContentforTags(space_url, blog_url);
            } else if (sel_action_val == "select_action") {
                //action when user changes the action to default value.
                document.getElementById("del_place").style.display = "inline";
                $("#change_selection_div").hide();
                $("#showDiv").hide();
                document.getElementById("deleteTo").style.display = "inline";
                $("#deleteTo").hide();
                $("#copyTo").hide();
                $("#delShow").hide();
                $("#upShow").hide();
                $("#deleteFrom").hide();
                $("#del_place").hide();
                $("#del_from_space").hide();
                $("#del_from_group").hide();
                $("#del_from_project").hide();
            }


            $("#from_space").hide();
            $("#from_group").show();
            $("#from_project").hide();
        }),
        error: handleResponse
    };

    if (from_place_name == '') {
        // actions if the source place is empty
        document.getElementById("to_place").disabled = true;
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
        document.getElementById("from_group").innerHTML = msg2;
    }

    // final call by OSAPI using the params.
    osapi.jive.corev3.places.requestPicker(params);
}

/**
	This function accepts the place url and opens as place-request picker dialog  box for
	Project .Base on the place selected it hide/shows the ui components
*/
function fromProjectRequest() {
    // Handles user request to select the PROJECT and then handle the response to fetch details about the selected PROJECT.

    var from_place_name = '';
    src_space_name = '';
    dest_space_name = '';
    //Code related to categories
    selected_cat = '';
    selected_tag = '';
    arrayIndex = 0;
    addId = new Array();
    tagPopulatList = new Array();
    //Assigning the values 
    $("#cat_from_space").text('Change Category in Space');
    $("#cat_from_group").text('Change Category in Group');
    $("#cat_from_project").text('Change Category in Project');

    $("#tag_from_space").text('Manage Tags in Space');
    $("#tag_from_group").text('Manage Tags in Group');
    $("#tag_from_project").text('Manage Tags in Project');
    document.getElementById("to_place").disabled = false;
    document.getElementById("from_project").innerHTML = msg2;
    document.getElementById("from_group").innerHTML = msg2;
    document.getElementById("from_space").innerHTML = msg2;
    var params = {
        type: "project",
        success: (function (data) {
            //console.log("DATA: "+JSON.stringify(data));

            // assigning values to the variables from the received response.
            from_place_name = data.name;
            src_space_name = from_place_name;
            space_url = data.resources.self.ref;
            blog_url = data.resources.blog.ref;
            source_html_url = data.resources.html.ref;
            global_from_place_name = src_space_name; //code added for categories

            $("#del_place").hide();
            document.getElementById("from_project").innerHTML = '<span id="myId" style="text-decoration:underline;">Project</span>' + ': ' + from_place_name;

            if (from_place_name != '') {
                //checking if the selected source and destination are same.
                if (dest_space_name == from_place_name) {
                    if (sel_action_val == "move") {
                        // error message of the selected source and destination are same for move.
                        $("#dialogMove").show();
                        $("#dialogMove").dialog();
                    } else {
                        // error message of the selected source and destination are same for copy.
                        $("#dialog").show();
                        $("#dialog").dialog();
                    }
                    document.getElementById("start_copying_button").style.visibility = "hidden";
                    $("#button_div").hide();
                    document.getElementById("copyTo").style.visibility = "hidden";
                    document.getElementById("from_project").innerHTML = msg2;
                } else {
                    var dialog_obj = $("#dialog");
                    dialog_obj.dialog("close");
                    var dialog_obj2 = $("#dialogMove");
                    dialog_obj2.dialog("close");
                    document.getElementById("to_place").disabled = false;
                    document.getElementById("from_project").innerHTML = '<span id="myId" style="text-decoration:underline;">Project</span>' + ': ' + from_place_name;
                }
            }

            //changing the default dropdown value to 'Change Place'
            $("#from_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#from_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#from_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            //changing the default dropdown value to 'Change Place'
            $("#del_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#del_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#del_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            //changing the default dropdown value to 'Change Place'
            $("#dwn_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#dwn_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#dwn_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            // calling the methods to fetch content from selected project.
            getDocs(space_url);
            getFiles(space_url);
            getDiscussions(space_url);
            getIdeas(space_url);
            getPolls(space_url);
            getBlogs(blog_url);

            if (sel_action_val == "delete") {
                // actions when the user choses to delete.
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#deleteTo").text("Delete this:").append('<br/>');
                document.getElementById("deleteTo").style.display = "inline";
                $("#deleteTo").show();
                $("#upTo").hide();
                document.getElementById("del_select_items_button").style.display = "inline";
                document.getElementById("up_select_items_button").style.display = "inline";
                $("#del_select_items_button").show();
                $("#up_select_items_button").hide();
                $("#change_selection_div").hide();
                $("#delShow").show();
                $("#upShow").hide();
                $("#up_place").hide();
                document.getElementById("del_place").style.display = "inline";
                $("#del_place").show();
                document.getElementById("del_from_project").innerHTML = '<span id="myId" style="text-decoration:underline;">Project</span>' + ': ' + from_place_name;
                $("#del_place").css("margin-top", "140px");
                $("#del_from_project").show();
                $("#del_from_group").hide();
                $("#del_from_space").hide();
            } else if (sel_action_val == "download") {
                // actions when the user choses to download.
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#dwnTo").text("Download this:").append('<br/>');
                document.getElementById("dwnTo").style.display = "inline";
                $("#dwnTo").show();
                $("#upTo").hide();
                document.getElementById("dwn_select_items_button").style.display = "inline";
                document.getElementById("up_select_items_button").style.display = "inline";
                $("#dwn_select_items_button").show();
                $("#up_select_items_button").hide();
                $("#change_selection_div").hide();
                $("#dwnShow").show();
                $("#delShow").hide();
                $("#upShow").hide();
                $("#up_place").hide();
                document.getElementById("dwn_place").style.display = "inline";
                $("#dwn_place").show();
                $("#del_place").hide();
                document.getElementById("dwn_from_project").innerHTML = '<span id="myId" style="text-decoration:underline;">Project</span>' + ': ' + from_place_name;
                $("#dwn_place").css("margin-top", "135px");
                $("#dwn_from_group").hide();
                $("#dwn_from_space").hide();
                $("#dwn_from_project").show();
            } else if (sel_action_val == "categs") {
                // actions when the user choses to download files.
                $("#cat_place").css("margin-top", "20px");
                $("#catShow").show();
                $("#cat_from_space").show();
                $("#cat_from_group").hide();
                $("#cat_from_project").hide();
                $("#cat_place").show();
                $("#catTo").text("Manage content for this category:").append('<br/>');
                $("#selCat").show();
                $("#cat_sel").show();
                $("#catTo").hide();
                $("#cat_select_items_button").hide();
                //document.getElementById("catTo").style.display="inline";

                $("#cat_sel option").each(function () {
                    $(this).remove();
                });

                document.getElementById("cat_sel").style.display = "inline";
                document.getElementById("cat_place").style.display = "inline";
                document.getElementById("cat_from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + from_place_name;
                $("#cat_place").css("margin-top", "40px");
                categoryTest();
            } else if (sel_action_val == "tags") {

                // actions when the user choses to download files.
                //alert("Inside tags...");
                tagPopulatList = new Array();
                completeTagIndex = 0;
                fromRequestAction = 'fromProjectRequestAction';
                populateContentforTags(space_url, blog_url);
            } else if (sel_action_val == "select_action") {
                // actions when the user changes the action to default value.
                document.getElementById("del_place").style.display = "inline";
                $("#change_selection_div").hide();
                $("#showDiv").hide();
                $("#copyTo").hide();
                $("#delShow").hide();
                $("#upShow").hide();
                document.getElementById("deleteTo").style.display = "inline";
                $("#deleteTo").hide();
                $("#del_place").hide();
                $("#deleteFrom").hide();
                $("#del_from_space").hide();
                $("#del_from_group").hide();
                $("#del_from_project").hide();
            }

            $("#from_space").hide();
            $("#from_group").hide();
            $("#from_project").show();
        }),
        error: handleResponse
    };

    if (from_place_name == '') {
        // actions if the soruce place name is empty.
        document.getElementById("to_place").disabled = true;
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
        document.getElementById("from_project").innerHTML = msg2;
    }

    // final OSAPI call with params.
    osapi.jive.corev3.places.requestPicker(params);
}

/**
	This function accepts the place url and opens as place-request picker dialog  box for
	to -space .Base on the place selected it hide/shows the ui components
*/
function toSpaceRequest() {
    var to_place_name = '';
    document.getElementById("to_project").innerHTML = msg2;
    document.getElementById("to_group").innerHTML = msg2;
    document.getElementById("to_space").innerHTML = msg2;
    var params = {
        type: "space",
        success: (function (data) {
            //console.log("DATA: "+JSON.stringify(data));
            to_place_name = data.name;
            to_place_blog_url = data.resources.blog.ref;

            //showing execute button		

            if (to_place_name != '') {
                if (src_space_name == to_place_name) {
                    //alert("The source place and destination place should be different..!!");
                    if (sel_action_val == "move") {
                        $("#dialogMove").show();
                        $("#dialogMove").dialog();
                    } else {
                        $("#dialog").show();
                        $("#dialog").dialog();
                    }
                    document.getElementById("start_copying_button").style.visibility = "hidden";
                    $("#button_div").hide();
                    document.getElementById("copyTo").style.visibility = "hidden";
                    document.getElementById("to_space").innerHTML = msg2;
                } else {
                    if (sel_action_val == 'copy')
                        $("#copyTo").text("Copy this:").append('<br/>');
                    else
                        $("#copyTo").text("Move this:").append('<br/>');

                    var dialog_obj = $("#dialog");
                    dialog_obj.dialog("close");
                    var dialog_obj2 = $("#dialogMove");
                    dialog_obj2.dialog("close");
                    document.getElementById("start_copying_button").style.visibility = "visible";
                    $('#select_items_button').show();
                    document.getElementById("start_uploading").style.visibility = "hidden";
                    $("#button_div").show();
                    $("#change_selection_div").hide();
                    document.getElementById("copyTo").style.visibility = "visible";
                    document.getElementById("to_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + to_place_name;
                }
            }
            to_url = data.resources.self.ref;
            redirection_url = data.resources.html.ref;
            dest_space_name = to_place_name;

            //changing the selection to 'Change Place'	   
            $("#to_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#to_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#to_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            $("#up_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#up_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#up_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            if (sel_action_val == "uploadd") {
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#upTo").text("Upload this:").append('<br/>');
                document.getElementById("upTo").style.display = "inline";
                $("#upTo").show();
                document.getElementById("up_select_items_button").style.display = "inline";
                document.getElementById("del_select_items_button").style.display = "inline";
                $("#up_select_items_button").show();
                $('#up_select_items_button').css("margin-top", "180px");
                $('#up_select_items_button').css("margin-left", "-80px");
                $("#del_select_items_button").hide();
                $("#button_div").hide();
                $("#change_selection_div").hide();
                $("#upShow").show();
                document.getElementById("up_place").style.display = "inline";
                $("#up_place").show();
                document.getElementById("up_from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + to_place_name;
                $('#up_place').css("margin-top", "128px");
                $("#up_from_project").hide();
                $("#up_from_group").hide();
                $("#up_from_space").show();
                $('#select_items_button').hide();
            } else if (sel_action_val == "select_action") {
                document.getElementById("up_place").style.display = "inline";
                //$("#stylized").hide();		
                $("#change_selection_div").hide();
                $("#showDiv").hide();
                $("#copyTo").hide();
                $("#upShow").hide();
                document.getElementById("upTo").style.display = "inline";
                $("#upTo").hide();
                $("#up_place").hide();
                $("#upFrom").hide();
                $("#up_from_space").hide();
                $("#up_from_group").hide();
                $("#up_from_project").hide();
                $('#select_items_button').hide();
            }

            $("#to_space").show();
            $("#to_group").hide();
            $("#to_project").hide();
        }),
        error: handleResponse
    };
    //hiding execute button
    if (to_place_name == '') {
        //document.getElementById("start_copying_button").style.visibility="hidden";	
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
        document.getElementById("to_space").innerHTML = msg2;
        //document.getElementById("to_space").innerHTML='<span id="myId" style="text-decoration:underline;">Space</span>'+': '+dest_space_name;
        $("#to_place option").each(function () {
            if ($(this).text() == 'Select Place') {
                $(this).attr('selected', 'selected');
                $('#to_place :selected').text('Change Place');
            } else if ($(this).text() == 'Change Place') {
                $('#to_place option:[text="' + $(this).text() + '"]').attr('selected', true);
            }
        });
    }

    osapi.jive.corev3.places.requestPicker(params);
}

/**
	This function accepts the place url and opens as place-request picker dialog  box for
	to -Group .Base on the place selected it hide/shows the ui components
*/
function toGroupRequest() {
    var to_place_name = '';
    document.getElementById("to_project").innerHTML = msg2;
    document.getElementById("to_group").innerHTML = msg2;
    document.getElementById("to_space").innerHTML = msg2;
    var params = {
        type: "group",
        success: (function (data) {
            //console.log("DATA: "+JSON.stringify(data));
            to_place_name = data.name;
            to_place_blog_url = data.resources.blog.ref;
            //showing execute button		
            if (to_place_name != '') {
                if (src_space_name == to_place_name) {
                    //alert("The source place and destination place should be different..!!");
                    if (sel_action_val == "move") {
                        $("#dialogMove").show();
                        $("#dialogMove").dialog();
                    } else {
                        $("#dialog").show();
                        $("#dialog").dialog();
                    }
                    document.getElementById("start_copying_button").style.visibility = "hidden";
                    $("#button_div").hide();
                    document.getElementById("copyTo").style.visibility = "hidden";
                    document.getElementById("to_group").innerHTML = msg2;
                } else {
                    if (sel_action_val == 'copy')
                        $("#copyTo").text("Copy this:").append('<br/>');
                    else
                        $("#copyTo").text("Move this:").append('<br/>');

                    var dialog_obj = $("#dialog");
                    dialog_obj.dialog("close");
                    var dialog_obj2 = $("#dialogMove");
                    dialog_obj2.dialog("close");
                    document.getElementById("to_place").disabled = false;
                    document.getElementById("start_copying_button").style.visibility = "visible";
                    document.getElementById("start_uploading").style.visibility = "hidden";
                    $("#button_div").show();
                    $("#change_selection_div").hide();
                    $('#select_items_button').show();
                    document.getElementById("copyTo").style.visibility = "visible";
                    document.getElementById("to_group").innerHTML = '<span id="myId" style="text-decoration:underline;">Group</span>' + ': ' + to_place_name;
                }
            }

            to_url = data.resources.self.ref;
            redirection_url = data.resources.html.ref;
            dest_space_name = to_place_name;


            //changing the selection to 'Change Place'	   
            $("#to_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#to_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#to_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            $("#up_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#up_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#up_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            if (sel_action_val == "uploadd") {
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#upTo").text("Upload this:").append('<br/>');
                document.getElementById("upTo").style.display = "inline";
                $("#upTo").show();
                document.getElementById("up_select_items_button").style.display = "inline";
                document.getElementById("del_select_items_button").style.display = "inline";
                $("#up_select_items_button").show();
                $('#up_select_items_button').css("margin-top", "180px");
                $('#up_select_items_button').css("margin-left", "-80px");
                $("#del_select_items_button").hide();
                $("#change_selection_div").hide();
                $("#button_div").hide();
                $("#upShow").show();
                document.getElementById("up_place").style.display = "inline";
                $("#up_place").show();
                document.getElementById("up_from_group").innerHTML = '<span id="myId" style="text-decoration:underline;">Group</span>' + ': ' + to_place_name;
                $('#up_place').css("margin-top", "128px");
                $("#up_from_project").hide();
                $("#up_from_group").show();
                $("#up_from_space").hide();
                $('#select_items_button').hide();
            } else if (sel_action_val == "select_action") {
                document.getElementById("up_place").style.display = "inline";
                //$("#stylized").hide();		
                $("#change_selection_div").hide();
                $("#showDiv").hide();
                $("#copyTo").hide();
                $("#upShow").hide();
                document.getElementById("upTo").style.display = "inline";
                $("#upTo").hide();
                $("#up_place").hide();
                $("#upFrom").hide();
                $("#up_from_space").hide();
                $("#up_from_group").hide();
                $("#up_from_project").hide();
                $('#select_items_button').hide();
            }

            $("#to_space").hide();
            $("#to_group").show();
            $("#to_project").hide();
        }),
        error: handleResponse
    };

    if (to_place_name == '') {
        //document.getElementById("start_copying_button").style.visibility="hidden";	
        $("#button_div").hide();
        //document.getElementById("copyTo").style.visibility="hidden";
        document.getElementById("copyTo").style.visibility = "hidden";
        document.getElementById("to_group").innerHTML = msg2;
        //document.getElementById("to_group").innerHTML='<span id="myId" style="text-decoration:underline;">Group</span>'+': '+dest_space_name;	
        $("#to_place option").each(function () {
            if ($(this).text() == 'Select Place') {
                $(this).attr('selected', 'selected');
                $('#to_place :selected').text('Change Place');
            } else if ($(this).text() == 'Change Place') {
                $('#to_place option:[text="' + $(this).text() + '"]').attr('selected', true);
            }
        });
    }

    osapi.jive.corev3.places.requestPicker(params);
}

/**
	This function accepts the place url and opens as place-request picker dialog  box for
	to -project .Base on the place selected it hide/shows the ui components
*/
function toProjectRequest() {
    var to_place_name = '';
    document.getElementById("to_project").innerHTML = msg2;
    document.getElementById("to_group").innerHTML = msg2;
    document.getElementById("to_space").innerHTML = msg2;
    var params = {
        type: "project",
        success: (function (data) {
            //console.log("DATA: "+JSON.stringify(data));
            to_place_name = data.name;
            to_place_blog_url = data.resources.blog.ref;
            //showing execute button		
            if (to_place_name != '') {
                if (src_space_name == to_place_name) {
                    //alert("The source place and destination place should be different..!!");
                    if (sel_action_val == "move") {
                        $("#dialogMove").show();
                        $("#dialogMove").dialog();
                    } else {
                        $("#dialog").show();
                        $("#dialog").dialog();
                    }
                    document.getElementById("start_copying_button").style.visibility = "hidden";
                    $("#button_div").hide();
                    document.getElementById("copyTo").style.visibility = "hidden";
                    document.getElementById("to_project").innerHTML = msg2;
                } else {
                    if (sel_action_val == 'copy')
                        $("#copyTo").text("Copy this:").append('<br/>');
                    else
                        $("#copyTo").text("Move this:").append('<br/>');

                    var dialog_obj = $("#dialog");
                    dialog_obj.dialog("close");
                    var dialog_obj2 = $("#dialogMove");
                    dialog_obj2.dialog("close");
                    //document.getElementById("to_place").disabled = false;
                    document.getElementById("start_copying_button").style.visibility = "visible";
                    document.getElementById("start_uploading").style.visibility = "hidden";
                    $("#button_div").show();
                    $("#change_selection_div").hide();
                    $('#select_items_button').show();
                    document.getElementById("copyTo").style.visibility = "visible";
                    document.getElementById("to_project").innerHTML = '<span id="myId" style="text-decoration:underline;">Project</span>' + ': ' + to_place_name;

                }
            }

            to_url = data.resources.self.ref;
            redirection_url = data.resources.html.ref;
            dest_space_name = to_place_name;

            //changing the selection to 'Change Place'	   
            $("#to_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#to_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#to_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            $("#up_place option").each(function () {
                if ($(this).text() == 'Select Place') {
                    $(this).attr('selected', 'selected');
                    $('#up_place :selected').text('Change Place');
                } else if ($(this).text() == 'Change Place') {
                    $('#up_place option:[text="' + $(this).text() + '"]').attr('selected', true);
                }
            });

            if (sel_action_val == "uploadd") {
                $('#all_selected_items').css("margin-top", "80px");
                $('#selected_items').css("margin-top", "80px");
                $("#upTo").text("Upload this:").append('<br/>');
                document.getElementById("upTo").style.display = "inline";
                $("#upTo").show();
                document.getElementById("up_select_items_button").style.display = "inline";
                document.getElementById("del_select_items_button").style.display = "inline";
                $("#up_select_items_button").show();
                $('#up_select_items_button').css("margin-top", "180px");
                $('#up_select_items_button').css("margin-left", "-80px");
                $("#del_select_items_button").hide();
                $("#change_selection_div").hide();
                $("#button_div").hide();
                $("#upShow").show();
                document.getElementById("up_place").style.display = "inline";
                $("#up_place").show();
                document.getElementById("up_from_project").innerHTML = '<span id="myId" style="text-decoration:underline;">Project</span>' + ': ' + to_place_name;
                $('#up_place').css("margin-top", "128px");
                $("#up_from_project").show();
                $("#up_from_group").hide();
                $("#up_from_space").hide();
                $('#select_items_button').hide();
            } else if (sel_action_val == "select_action") {
                document.getElementById("up_place").style.display = "inline";
                //$("#stylized").hide();		
                $("#change_selection_div").hide();
                $("#showDiv").hide();
                $("#copyTo").hide();
                $("#upShow").hide();
                document.getElementById("upTo").style.display = "inline";
                $("#upTo").hide();
                $("#up_place").hide();
                $("#upFrom").hide();
                $("#up_from_space").hide();
                $("#up_from_group").hide();
                $("#up_from_project").hide();
                $('#select_items_button').hide();
            }

            $("#to_space").hide();
            $("#to_group").hide();
            $("#to_project").show();
        }),
        error: handleResponse
    };

    if (to_place_name == '') {
        //document.getElementById("start_copying_button").style.visibility="hidden";	
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
        //document.getElementById("copyTo").style.visibility="visible";
        document.getElementById("to_project").innerHTML = msg2;
        //document.getElementById("to_project").innerHTML='<span id="myId" style="text-decoration:underline;">Project</span>'+': '+dest_space_name;
        $("#to_place option").each(function () {
            if ($(this).text() == 'Select Place') {
                $(this).attr('selected', 'selected');
                $('#to_place :selected').text('Change Place');
            } else if ($(this).text() == 'Change Place') {
                $('#to_place option:[text="' + $(this).text() + '"]').attr('selected', true);
            }
        });
    }

    osapi.jive.corev3.places.requestPicker(params);
}
/**
	Used to get the files and populate in the table
*/
function getFiles(space_url) {
    // fetches the files from the selected space/group/project using the SPACE_URL.

    osapi.jive.corev3.contents.get({
        type: 'file',
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Files: "+JSON.stringify(response));

        var files = response.list;
        var postFiles;
        var files_length = response.list.length;

        if (files_length == 0) {
            // action when the selected space/group/project has no files.

            files_row = '<table id="filesTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No files in this place.</strong></td></tr>';
        } else {
            // action when the selected space/group/project has files.

            // creates table header row.
            files_row = '<table id="filesTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +

            '<tr>' +
                '<td style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_files"  onclick="javascript:checkedAll(this.id);">' + '</strong></td>' +
                '<td style="border:1px ;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></td>' +
                '<td style="border:1px solid ;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Author</strong></td>' +
                '</tr>';


            $.each(files, function (index, group) {
                postFiles = {
                    title: "",
                    author: "",
                    updated: "",
                    fileUrl: ""
                }

                // assigning values from the received response to the variables.
                postFiles.title = group.subject;
                postFiles.author = group.author.name.formatted;
                postFiles.updated = group.updated;
                postFiles.fileUrl = group.resources.self.ref;

                // adding each file in a row as per the received response.
                files_row = files_row + '<tr>' +
                    '<td style="border:1px ;border: 1px solid #000000;text-align:right;padding:2px;">' + '<input type="checkbox" name="file_cb" class="file_cb" onclick="javascript:checkUncheck(this.name);" value="' + postFiles.fileUrl + '">' + '</td>' +
                    '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postFiles.title + '</td>' +
                    '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postFiles.author + '</td>' +
                    '</tr>';
            });
        }
        files_row = files_row + '</table>';

        // writing the files table to the files tab.
        document.getElementById("files_div").innerHTML = files_row;

    });
};

/**
	Used to get the blogs and populate in the table
*/
function getBlogs(blog_url) {
    // getting the blogs from the selected space/group/project using the BLOG_URL.

    osapi.jive.corev3.contents.get({
        type: 'post',
        fields: '@all',
        count: 50,
        place: blog_url
    }).execute(function (response) {
        //console.log("Blogs: "+JSON.stringify(response));

        var blogs = response.list;
        var postBlogs;
        var blogs_length = response.list.length;
        if (blogs_length == 0) {
            // action when the selected space/group/project has no blogs.
            blog_row = '<table id="blogTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No blog posts in this place.</strong></td></tr>';
        } else {
            // action when the selected space/group/project has blogs.

            // adding the header for blogs table.
            blog_row = '<table id="blogTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_blogs"  onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Author</strong></th>' +
                '</tr>';

            $.each(blogs, function (index, group) {
                postBlogs = {
                    title: "",
                    author: "",
                    updated: "",
                    fileUrl: ""
                }

                // assigning values from received response to the variables.
                postBlogs.title = group.subject;
                postBlogs.author = group.author.name.formatted;
                postBlogs.updated = group.updated;
                postBlogs.fileUrl = group.resources.self.ref;

                // adding each blog in a row as per the received response.
                blog_row = blog_row + '<tr>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="blog_cb" class="blog_cb" onclick="javascript:checkUncheck(this.name);" value="' + postBlogs.fileUrl + '">' + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postBlogs.title + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postBlogs.author + '</td>' +
                    '</tr>';
            });
        }
        blog_row = blog_row + '</table>';

        // writing the blog table in the blog tab.
        document.getElementById("blog_div").innerHTML = blog_row;

    });
};

/**
	Used to get the Docs and populate in the table
*/
function getDocs(space_url) {

    osapi.jive.corev3.documents.get({
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Documents: "+JSON.stringify(response));

        var documents = response.list;
        var postDoc;
        var docs_length = response.list.length;
        if (docs_length == 0) {
            docs_row = '<table id="docsTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No documents in this place.</strong></td></tr>';
        } else {
            docs_row = '<table id="docsTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +

            '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_docs" onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Author</strong></th>' +
                '</tr>';

            $.each(documents, function (index, group) {
                postDoc = {
                    title: "",
                    author: "",
                    updated: "",
                    docUrl: ""
                }

                postDoc.title = group.subject;
                postDoc.author = group.author.name.formatted;
                postDoc.updated = group.updated;
                postDoc.docUrl = group.resources.self.ref;

                docs_row = docs_row + '<tr>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="doc_cb" class="doc_cb" onclick="javascript:checkUncheck(this.name);" value="' + postDoc.docUrl + '">' + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDoc.title + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDoc.author + '</td>' +
                    '</tr>';

            });
        }
        docs_row = docs_row + '</table>';
        document.getElementById("docs_div").innerHTML = docs_row;
    });
};

/**
	Used to get the Discussion and populate in the table
*/
function getDiscussions(space_url) {

    osapi.jive.corev3.discussions.get({
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Discussions: "+JSON.stringify(response));

        var disc = response.list;
        var postDisc;
        var disc_length = response.list.length;
        if (disc_length == 0) {
            disc_row = '<table id="discTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No discussions in this place.</strong></td></tr>';
        } else {
            disc_row = '<table id="discTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +

            '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_disc"  onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Author</strong></th>' +
                '</tr>';

            $.each(disc, function (index, group) {
                postDisc = {
                    title: "",
                    author: "",
                    updated: "",
                    discUrl: ""
                }

                postDisc.title = group.subject;
                postDisc.author = group.author.name.formatted;
                postDisc.updated = group.updated;
                postDisc.discUrl = group.resources.self.ref;

                disc_row = disc_row + '<tr>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="disc_cb" class="disc_cb" onclick="javascript:checkUncheck(this.name);" value="' + postDisc.discUrl + '">' + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDisc.title + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDisc.author + '</td>' +
                    '</tr>';
            });
        }
        disc_row = disc_row + '</table>';
        document.getElementById("disc_div").innerHTML = disc_row;
    });

};
/**
	Used to get the Idea and populate in the table
*/
function getIdeas(space_url) {

    osapi.jive.corev3.ideas.get({
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Ideas: "+JSON.stringify(response));

        var idea = response.list;
        var postIdea;
        var idea_length = response.list.length;
        if (idea_length == 0) {
            idea_row = '<table id="ideaTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr>' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No ideas in this place.</strong></td></tr>';
        } else {
            idea_row = '<table id="ideaTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_ideas"  onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Author</strong></th>' +
                '</tr>';

            $.each(idea, function (index, group) {
                postIdea = {
                    title: "",
                    author: "",
                    updated: "",
                    ideaUrl: ""
                }

                postIdea.title = group.subject;
                postIdea.author = group.author.name.formatted;
                postIdea.updated = group.updated;
                postIdea.ideaUrl = group.resources.self.ref;

                idea_row = idea_row + '<tr>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="idea_cb" class="idea_cb" onclick="javascript:checkUncheck(this.name);" value="' + postIdea.ideaUrl + '">' + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postIdea.title + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postIdea.author + '</td>' +
                    '</tr>';
            });
        }
        idea_row = idea_row + '</table>';
        document.getElementById("idea_div").innerHTML = idea_row;
    });
};

/**
	Used to get the Polls and populate in the table
*/
function getPolls(space_url) {
    osapi.jive.corev3.polls.get({
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Polls: "+JSON.stringify(response));

        var polls = response.list;
        var postPolls;
        var poll_length = response.list.length;
        if (poll_length == 0) {
            poll_row = '<table id="pollTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No polls in this place.</strong></td></tr>';
        } else {
            poll_row = '<table id="pollTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +

            '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_polls"  onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Author</strong></th>' +
                '</tr>';

            $.each(polls, function (index, group) {
                postPolls = {
                    title: "",
                    author: "",
                    updated: "",
                    fileUrl: ""
                }

                postPolls.title = group.subject;
                postPolls.author = group.author.name.formatted;
                postPolls.updated = group.updated;
                postPolls.fileUrl = group.resources.self.ref;

                poll_row = poll_row + '<tr>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="poll_cb" class="poll_cb" onclick="javascript:checkUncheck(this.name);" value="' + postPolls.fileUrl + '">' + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postPolls.title + '</td>' +
                    '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postPolls.author + '</td>' +
                    '</tr>';
            });
        }
        poll_row = poll_row + '</table>';
        document.getElementById("poll_div").innerHTML = poll_row;

    });
};

function checkedAll(selCheckId) {

    // check/uncheck all the checkboxes if the one in header is checked/unchecked.

    var tab = '';
    if (selCheckId == 'sel_all_files') {
        tab = document.getElementById("filesTable");
    } else if (selCheckId == 'sel_all_docs') {
        tab = document.getElementById("docsTable");
    } else if (selCheckId == 'sel_all_disc') {
        tab = document.getElementById("discTable");
    } else if (selCheckId == 'sel_all_ideas') {
        tab = document.getElementById("ideaTable");
    } else if (selCheckId == 'sel_all_polls') {
        tab = document.getElementById("pollTable");
    } else if (selCheckId == 'sel_all_blogs') {
        tab = document.getElementById("blogTable");
    }
    var elems = tab.getElementsByTagName("input");
    var len = elems.length;
    var sel_all = document.getElementById(selCheckId);

    if (sel_all.checked == true) {
        for (var i = 0; i < len; i++) {
            if (elems[i].type == "checkbox") {
                elems[i].checked = true;
            }
        }
    } else if (sel_all.checked == false) {
        for (var i = 0; i < len; i++) {
            if (elems[i].type == "checkbox") {
                elems[i].checked = false;
            }
        }
    }

};

function checkUncheck(name) {
    // check/uncheck the checkbox in header if all the others below are checked/unchecked.

    var id = '';
    var mcb_id = '';
    var check = '';
    if (name == "file_cb") {
        id = 'sel_all_files';
        mcb_id = '#' + id;
        name = '.' + name;
        var rowCount = $('#filesTable tr').length;
        if (rowCount == 2)
            $(mcb_id).attr('checked', 'checked');
        else
            $(mcb_id).removeAttr("checked");
    } else if (name == "doc_cb") {
        id = 'sel_all_docs';
        mcb_id = '#' + id;
        name = '.' + name;
        var rowCount = $('#docsTable tr').length;
        if (rowCount == 2)
            $(mcb_id).attr('checked', 'checked');
        else
            $(mcb_id).removeAttr("checked");
    } else if (name == "disc_cb") {
        id = 'sel_all_disc';
        mcb_id = '#' + id;
        name = '.' + name;
        var rowCount = $('#discTable tr').length;
        if (rowCount == 2)
            $(mcb_id).attr('checked', 'checked');
        else
            $(mcb_id).removeAttr("checked");
    } else if (name == "idea_cb") {
        id = 'sel_all_ideas';
        mcb_id = '#' + id;
        name = '.' + name;
        var rowCount = $('#ideaTable tr').length;
        if (rowCount == 2)
            $(mcb_id).attr('checked', 'checked');
        else
            $(mcb_id).removeAttr("checked");
    } else if (name == "poll_cb") {
        id = 'sel_all_polls';
        mcb_id = '#' + id;
        name = '.' + name;
        var rowCount = $('#pollTable tr').length;
        if (rowCount == 2)
            $(mcb_id).attr('checked', 'checked');
        else
            $(mcb_id).removeAttr("checked");
    } else if (name == "blog_cb") {
        id = 'sel_all_blogs';
        mcb_id = '#' + id;
        name = '.' + name;
        var rowCount = $('#blogTable tr').length;
        if (rowCount == 2)
            $(mcb_id).attr('checked', 'checked');
        else
            $(mcb_id).removeAttr("checked");
    }

    check = name + ':checked';

    $(mcb_id).click(function () {
        $(name).attr('checked', this.checked);
    });

    $(name).click(function () {
        if ($(name).length == $(check).length) {
            $(mcb_id).attr("checked", "checked");
        } else {
            $(mcb_id).removeAttr("checked");
        }
    });

};

function highlightTab() {
    // highlight the tab on which the user clicks by adding a blue border and underline.
    $("#docs_tab").addClass("borderadd");
    $("#disc_tab").addClass("borderadd");
    $("#idea_tab").addClass("borderadd");
    $("#blog_tab").addClass("borderadd");
    $("#poll_tab").addClass("borderadd");
    $("li.active").removeClass("active");
    $("#files_tab").removeClass("borderadd");
    $("#files_tab").addClass("active");
    $('li').click(function () {
        $("li.active").addClass("borderadd");
        $("li.active").removeClass("active");
        $(this).addClass('active');
        $(this).removeClass('borderadd');
    });

}

function showTab() {
    // actions when user choses to select content he wants to copy/move/delete/download.

    //for checking and unchecking the contents
    //checking of checkboxes
    console.log("array Len: " + addId.length);
    for (var i = 0; i < addId.length; i++) {
        console.log("value: " + addId[i]);
        document.getElementById(addId[i]).checked = true;
    }
    //end checking of checkboxes

    $("#stylized").hide();
    $("#selection_menu").show();

    $("#files_div").show();

    $("#files_tab").click(function () {
        $("#files_div").show();
        $("#docs_div").hide();
        $("#disc_div").hide();
        $("#idea_div").hide();
        $("#poll_div").hide();
        $("#blog_div").hide();
    });

    $("#docs_tab").click(function () {
        $("#files_div").hide();
        $("#docs_div").show();
        $("#disc_div").hide();
        $("#idea_div").hide();
        $("#poll_div").hide();
        $("#blog_div").hide();
    });

    $("#disc_tab").click(function () {
        $("#files_div").hide();
        $("#docs_div").hide();
        $("#disc_div").show();
        $("#idea_div").hide();
        $("#poll_div").hide();
        $("#blog_div").hide();
    });

    $("#idea_tab").click(function () {
        $("#files_div").hide();
        $("#docs_div").hide();
        $("#disc_div").hide();
        $("#idea_div").show();
        $("#poll_div").hide();
        $("#blog_div").hide();
    });

    $("#poll_tab").click(function () {
        $("#files_div").hide();
        $("#docs_div").hide();
        $("#disc_div").hide();
        $("#idea_div").hide();
        $("#poll_div").show();
        $("#blog_div").hide();
    });

    $("#blog_tab").click(function () {
        $("#files_div").hide();
        $("#docs_div").hide();
        $("#disc_div").hide();
        $("#idea_div").hide();
        $("#poll_div").hide();
        $("#blog_div").show();
    });
};

var all_selected = '';

function goBack() {
    if (sel_action_val == "categs") {

        startUpdatingCategories();
    } else if (sel_action_val == "tags") {

        startUpdatingTags();
    } else {
        // handles the code for creating the final selection tables and the list of values to be passed to the server/javascript

        all_selected = '';
        Grp_file_json = '';
        Grp_doc_json = '';
        Grp_idea_json = '';
        Grp_disc_json = '';
        Grp_blog_json = '';
        Grp_poll_json = '';

        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "visible";
        document.getElementById("start_copying_button").disabled = false;

        $("#docs_div").hide();
        $("#files_div").hide();
        $("#disc_div").hide();
        $("#idea_div").hide();
        $("#poll_div").hide();
        $("#blog_div").hide();
        document.getElementById("del_select_items_button").style.display = "inline";
        document.getElementById("dwn_select_items_button").style.display = "inline";
        $("#del_select_items_button").hide();
        $("#dwn_select_items_button").hide();
        document.getElementById("up_select_items_button").style.display = "inline";
        $("#up_select_items_button").hide();

        if (sel_action_val == "delete") {
            document.getElementById("start_copying_button").style.visibility = "visible";
            document.getElementById("start_uploading").style.visibility = "hidden";
        } else if (sel_action_val == "download") {
            document.getElementById("start_copying_button").style.visibility = "visible";
            document.getElementById("start_uploading").style.visibility = "hidden";
        }

        $("#selection_menu").hide();
        $("#stylized").show();
        $("#change_selection_div").show();
        $("#change_contents").show();
        $("#start_copying_button").show();
        document.getElementById("start_uploading").style.visibility = "hidden";

        // creating the header for the final selection table.
        all_selected = '<TABLE id="all_selected_items" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 600px;">' + '<col width="400px" /><col width="120px" /><col width="10px" />' + '<tr>' +
            '<td style="border:1px ;border: 1px solid #000000;width: 43px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>Title</strong></td>' +
            '<td style="border:1px ;border: 1px solid #000000;width: 43px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>Author</strong></td>' +
            '<td style="border:1px ;border: 1px solid #000000;width: 43px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>Type</strong></td>' +
            '</tr>';

        $('#filesTable input[type=checkbox]:checked').each(function () {
            // getting self url's of files from the files table and adding them to files JSON.
            if ($(this).val() != 'on') {
                Grp_file_json = Grp_file_json + $(this).val() + ';';
                var row = $(this).parent().parent();
                var rowcells = row.find('td');

                if (rowcells[1].textContent != 'Title') {
                    all_selected = all_selected + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[1].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[2].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">File</td>' +
                        '</tr>';
                }
            }
        });

        $('#docsTable input[type=checkbox]:checked').each(function () {
            // getting self url's of files from the files table and adding them to files JSON.
            if ($(this).val() != 'on') {
                Grp_doc_json = Grp_doc_json + $(this).val() + ';';
                var row = $(this).parent().parent();
                var rowcells = row.find('td');

                if (rowcells[1].textContent != 'Title') {
                    all_selected = all_selected + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[1].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[2].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">Documents</td>' +
                        '</tr>';
                }
            }
        });

        $('#discTable input[type=checkbox]:checked').each(function () {
            // getting self url's of files from the files table and adding them to files JSON.
            if ($(this).val() != 'on') {
                Grp_disc_json = Grp_disc_json + $(this).val() + ';';
                var row = $(this).parent().parent();
                var rowcells = row.find('td');

                if (rowcells[1].textContent != 'Title') {
                    all_selected = all_selected + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[1].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[2].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">Discussions</td>' +
                        '</tr>';
                }
            }
        });

        $('#ideaTable input[type=checkbox]:checked').each(function () {
            // getting self url's of files from the files table and adding them to files JSON.
            if ($(this).val() != 'on') {
                Grp_idea_json = Grp_idea_json + $(this).val() + ';';
                var row = $(this).parent().parent();
                var rowcells = row.find('td');

                if (rowcells[1].textContent != 'Title') {
                    all_selected = all_selected + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[1].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[2].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">Ideas</td>' +
                        '</tr>';
                }
            }
        });

        $('#pollTable input[type=checkbox]:checked').each(function () {
            // getting self url's of files from the files table and adding them to files JSON.
            if ($(this).val() != 'on') {
                Grp_poll_json = Grp_poll_json + $(this).val() + ';';
                var row = $(this).parent().parent();
                var rowcells = row.find('td');

                if (rowcells[1].textContent != 'Title') {
                    all_selected = all_selected + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[1].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[2].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">Polls</td>' +
                        '</tr>';
                }
            }
        });

        $('#blogTable input[type=checkbox]:checked').each(function () {
            // getting self url's of files from the files table and adding them to files JSON.
            if ($(this).val() != 'on') {
                Grp_blog_json = Grp_blog_json + $(this).val() + ';';
                var row = $(this).parent().parent();
                var rowcells = row.find('td');

                if (rowcells[1].textContent != 'Title') {
                    all_selected = all_selected + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[1].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + rowcells[2].textContent + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">Blogs</td>' +
                        '</tr>';
                }
            }
        });


        all_selected = all_selected + '</table>';

        // writing all selected files to the final selection table on the app home page.
        document.getElementById("selected_items").innerHTML = all_selected;

        var count = $('#all_selected_items tr').length;
        if (count == 1) {
            // actions when no content has been selected by the user.
            all_selected = '<table name="all_selected_items" id="all_selected_items" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 600px;">' + '<col width="400px" /><col width="120px" /><col width="10px" />' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No content selected.</strong></td></tr></table>';
            document.getElementById("start_copying_button").disabled = true;
            document.getElementById("selected_items").innerHTML = all_selected;
        }
    }
};

function startCopying() {
    // handles actions after clicking the start copy button.

    $("#cmdu").show();
    $("#src_place").hide();
    $("#start_copying_button").hide();
    $("#change_contents").hide();
    $("#button_div").hide();
    $("#from_place").hide();
    $("#to_place").hide();

    if (browserName == "MSIE") {
        // actions when the app is used in IE.
        var finalurl = redirection_url + '/content';

        // we add static message to IE and do not use the iframe based tracker because of compatibility issues.
        var ieSpan = '<span id="ieSpan" style="font-family:Tahoma;font-size:12px;font-color:#3778C7;">The selected contents are being copied. This may take a while depending on the number of contents and files that have been selected. The process will be completed in the background so you can close this window. The copies of the selected contents will be available after completion here: <a href=' + finalurl + '>' + dest_space_name + ' - Contents</a></span>';
        document.getElementById("selected_items").innerHTML = ieSpan;

        dest_space_name = dest_space_name.toLowerCase();
        dest_space_name = dest_space_name.replace(/[^a-z0-9-\s]/gi, '').replace(/[_\s]/g, '-');

        // OSAPI call to send the details to the server for copying.
        osapi.http.get({
            'href': 'http://54.247.84.129:8081/UAT/AIServlet?srcgroup_place_url=' + space_url + '&target_groupurl=' + to_url + '&src_group_file=' + Grp_file_json + '&src_group_document=' + Grp_doc_json + '&src_idea=' + Grp_idea_json + '&src_discussion=' + Grp_disc_json + '&src_blog=' + Grp_blog_json + '&src_poll=' + Grp_poll_json + '&logged-user=' + loggedUser + '&logged-userName=' + loggedUserName + '&group-name=' + dest_space_name,
            'format': 'json',
            'authz': 'signed'
        }).execute(blankMethod);
    } else {
        // actions when the app is used in any other browser.
        var iframe = '<iframe id="frame1" src = "javascript:"&nbsp;" style="width:650px;height:90px;margin-top:0px;font-family:Tahoma"></iframe>';
        document.getElementById("selected_items").innerHTML = iframe;
        $("#copyTo").text("Copying this:");

        dest_space_name = dest_space_name.toLowerCase();
        dest_space_name = dest_space_name.replace(/[^a-z0-9-\s]/gi, '').replace(/[_\s]/g, '-');

        var initialMsg = 'Please wait, initialising copying..';
        document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
        document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
        document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
        document.getElementById("frame1").contentDocument.body.innerHTML = "Copying in Progress.<br>Please leave this window open until the copying process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + initialMsg.fontcolor("#3778C7") + "</span>";

        // OSAPI call to send the details to the server for copying.
        osapi.http.get({
            'href': 'http://54.247.84.129:8081/UAT/AIServlet?srcgroup_place_url=' + space_url + '&target_groupurl=' + to_url + '&src_group_file=' + Grp_file_json + '&src_group_document=' + Grp_doc_json + '&src_idea=' + Grp_idea_json + '&src_discussion=' + Grp_disc_json + '&src_blog=' + Grp_blog_json + '&src_poll=' + Grp_poll_json + '&logged-user=' + loggedUser + '&logged-userName=' + loggedUserName + '&group-name=' + dest_space_name,
            'format': 'json',
            'authz': 'signed'
        }).execute(refreshiframe);
    }
};

var flag = false;

function blankMethod(response) {
    // to handle the response when the app is being used in IE.
    // the method is blank because we are adding the call just to complete the syntax.
}

function refreshiframe() {
    // to hit the logger servlet and get the response of which action is being done right now.
    flag = true;
    osapi.http.get({
        'href': 'http://54.247.84.129:8081/UAT/LoggerServlet?logged-user=' + loggedUser + '&logged-userName=' + loggedUserName,
        'format': 'text',
        'authz': 'signed'
    }).execute(refreshFrameResponse);
};


function refreshFrameResponse(response) {
    // refreshs iframe with the fresh messages being received from the server.
    if (!flag) {
        refreshiframe();
    }
    setTimeout("refreshiframe()", 1000);
    var str = response.content;
    var res = '{ error: "Connect to /54.246.36.246:8081 timed out" }';
    var errorCode = str.indexOf(res);
    if (errorCode != 0) {
        // checks if the server is running
        document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
        document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
        document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
        document.getElementById("frame1").contentDocument.body.innerHTML = "Copying in Progress.<br>Please leave this window open until the copying process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";

        var compare = 'You will be redirected to the "copy to" group.';

        var pos = str.indexOf(compare);
        if (pos != -1) {
            // redirects to target place when the final message is received.
            document.getElementById("frame1").contentDocument.body.innerHTML = "Copying in Progress.<br>Please leave this window open until the copying process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";
            $("#stylized").fadeOut(5000, function () {
                window.location = redirection_url + '/content';
            });
        }
    } else {
        var serverMsg = "Server is stopped/down, check with the administrator.";
        document.getElementById("frame1").contentDocument.body.innerHTML = "<br><br><span id='mySpan' style='font-weight:bold;'>" + serverMsg.fontcolor("#3778C7") + "</span>";
    }
}

var uploadSelected = '';

function uploadFiles() {
    // handles the response for uploading files.
    uploadSelected = '';

    uploadSelected = '<input  style="visibility:hidden" type="text" name="loggedUser" value="' + loggedUser + '">' +
        '<input  style="visibility:hidden" type="text" name="loggedUserName" value="' + loggedUserName + '">' +
        '<input  style="visibility:hidden" type="text" name="to_url" value="' + to_url + '">' +

    '<TABLE id="upload_selected_items" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 600px;">' + '<col width="400px" /><col width="120px" /><col width="10px" />' + '<tr>' +
        '<td style="border:1px ;border: 1px solid #000000;width: 43px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>Name</strong></td>' +
        '<td style="border:1px ;border: 1px solid #000000;width: 43px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>Size</strong></td>' +
        '<td style="border:1px ;border: 1px solid #000000;width: 43px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>Description [optional]</strong></td>' +
        '</tr>';

    // getting the details about the files selected by the user for upload.
    var files = $('#up_select_items_button').prop("files");
    var names = $.map(files, function (val) {
        return val.name;
    });
    for (var i = 0; i < names.length; i++) {
        var fileObject = document.getElementById('up_select_items_button').files[i];
        var fileName = fileObject.name;
        var fileSize = fileObject.size;
        var sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);
        sizeInMB = sizeInMB + 'MB';
        var fileDesc = 'Please enter your description here.';

        // listing the files selected for upload.
        uploadSelected = uploadSelected + '<tr>' +
            '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;"><input id="fileName' + i + '" size="45" type="text" name="fileName" value="' + fileName + '" onchange="javascript:getName(this,' + i + ')"></td>' +
            '<td style="color:black; border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;">' + sizeInMB + '</td>' +
            '<td style="border:1px solid black;border: 1px solid #000000;text-align: left;padding: 2px;"><input id="fileDesc' + i + '" size="35" type="text" name="fileDesc" value="' + fileDesc + '" onchange="javascript:getDesc(this,' + i + ')" onblur="javascript:clickrecall(this);" onclick="javascript:clickclear(this);" onfocus="javascript:clickclear(this);"  autocomplete="off" style="color:black;"></td>' +
            '</tr>';
    }

    uploadSelected = uploadSelected + '</table>';

    $("#change_selection_div").show();
    //$("#up_select_items_button").hide();
    $("#change_contents").hide();
    $("#start_copying_button").hide();
    document.getElementById("start_uploading").style.visibility = "visible";
    document.getElementById("start_uploading").disabled = false;

    document.getElementById("selected_items").innerHTML = uploadSelected;
    document.getElementById("form2").innerHTML = uploadSelected;
    var count = $('#upload_selected_items tr').length;
    // count is taken as 2 because we are adding three dynamic textboxes in this table
    // check if the selection is empty.
    if (count == 2) {
        uploadSelected = '<table name="upload_selected_items" id="upload_selected_items" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 600px;">' + '<col width="400px" /><col width="120px" /><col width="10px" />' +
            '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No content selected.</strong></td></tr></table>';
        document.getElementById("start_copying_button").disabled = true;
        document.getElementById("start_uploading").disabled = true;
        document.getElementById("selected_items").innerHTML = uploadSelected;
    }
    $('#up_select_items_button').css("margin-top", "333px");
    $('#up_select_items_button').css("margin-left", "-320px");
}

function clickclear(thisfield) {
    // adding description and handling the description textfield.
    if (thisfield.value == 'Please enter your description here.') {
        thisfield.value = "";
        thisfield.color = "black";
    }

}

function clickrecall(thisfield) {
    // when the description is cleared add the defualt message.
    if (thisfield.value == "") {
        thisfield.value = 'Please enter your description here.';
    }

}

function getName(data, counter) {
    // adding the new name in name textbox.
    var id = 'fileName' + counter;
    document.getElementById(id).value = data.value;
}

function getDesc(data, counter) {
    // adding the new description.
    var id = 'fileDesc' + counter;

    if (data.value != 'Please enter your description here.')
        document.getElementById(id).value = data.value;
    else
        document.getElementById(id).value = '';
}

function startUploading() {

    // handles the actions for upload functionality.
    $("#cmdu").show();
    $("#src_place").hide();
    var files = $('#up_select_items_button').prop("files");
    var names = $.map(files, function (val) {
        return val.name;
    });
    for (var i = 0; i < names.length; i++) {
        var val = document.getElementById('fileDesc' + i).value;
        if (val == 'Please enter your description here.')
            document.getElementById('fileDesc' + i).value = '';
    }

    $("#up_place").hide();
    $("#up_select_items_button").hide();
    $("#start_uploading").hide();
    $("#upTo").text("Uploading this:");

    var iframe = '<iframe id="frame1" src = "javascript:"&nbsp;" style="width:650px;height:90px;margin-top:0px;font-family:Tahoma"></iframe>';
    document.getElementById("selected_items").innerHTML = iframe;

    var initialMsg1 = 'Your files are now being uploaded. Please <u>do not close</u> this window.!<br/><br/>';
    var initialMsg2 = 'You will be redirected to the uploaded files once the upload is complete.<br/>';

    document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
    document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
    document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
    document.getElementById("frame1").contentDocument.body.innerHTML = "<span id='mySpan' style='font-family:Tahoma;font-size:12px;font-weight:bold;'>" + initialMsg1.fontcolor("#3778C7") + "</span><span id='mySpan' style='font-weight:bold;'>" + initialMsg2.fontcolor("Grey") + "</span>";

    document.getElementById('redirectVal').value = redirection_url;

    document.getElementById("form2").submit();

}

var flag = false;

function uprefreshiframe() {

    // for getting servlet response for upload functionality.
    flag = true;

    osapi.http.get({
        'href': 'http://54.247.84.129:8081/UAT/LoggerServlet?logged-user=' + loggedUser + '&logged-userName=' + loggedUserName,
        'format': 'text',
        'authz': 'signed'
    }).execute(uprefreshFrameResponse);
};


function uprefreshFrameResponse(response) {
    // refresh iframe for upload functionality.
    if (!flag) {
        uprefreshiframe();
    }
    setTimeout("uprefreshiframe()", 1000);
    var str = response.content;
    var res = '{ error: "Connect to /54.247.84.129:8081 timed out" }';
    var errorCode = str.indexOf(res);
    if (errorCode != 0) {
        document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
        document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
        document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
        document.getElementById("frame1").contentDocument.body.innerHTML = "Upload in Progress.<br>Please leave this window open until the upload process has completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";

        var compare = 'You will be redirected to the "upload to" place.';

        var pos = str.indexOf(compare);
        if (pos != -1) {
            document.getElementById("frame1").contentDocument.body.innerHTML = "Upload in Progress.<br>Please leave this window open until the upload process has completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";
            $("#stylized").fadeOut(5000, function () {
                window.location = redirection_url;
            });
        }
        //}	
    } else {
        var serverMsg = "Server is stopped/down, check with the administrator.";
        document.getElementById("frame1").contentDocument.body.innerHTML = "<br><br><span id='mySpan' style='font-weight:bold;'>" + serverMsg.fontcolor("#3778C7") + "</span>";
    }
}

function startMoving() {
    // handles actions for move.
    $("#cmdu").show();
    $("#src_place").hide();
    $("#from_place").hide();
    $("#to_place").hide();
    $("#start_copying_button").hide();
    $("#change_contents").hide();
    $("#button_div").hide();
    $("#copyTo").text("Moving this:");

    // send data to JS file movendelete for move.
    movendelete('move', space_url, to_url, Grp_file_json, Grp_doc_json, Grp_disc_json, Grp_idea_json, Grp_poll_json, Grp_blog_json, dest_space_name, redirection_url, source_html_url, src_space_name, to_place_blog_url, browserName);
};

function startDeleting() {
    $("#cmdu").show();
    $("#src_place").hide();
    $("#start_copying_button").hide();
    $("#change_contents").hide();
    $("#button_div").hide();
    $("#del_place").hide();
    $("#deleteTo").text("Deleting this:");

    // send data to JS file movendelete for move.
    movendelete('delete', space_url, to_url, Grp_file_json, Grp_doc_json, Grp_disc_json, Grp_idea_json, Grp_poll_json, Grp_blog_json, 'test_name', 'test_url', source_html_url, src_space_name, to_place_blog_url, browserName);
};

function startDownloading() {
    // handles actions for download.
    $("#cmdu").show();
    $("#src_place").hide();
    $("#start_copying_button").hide();
    $("#change_contents").hide();
    $("#button_div").hide();
    $("#dwn_place").hide();
    $("#dwnTo").text("Downloading this:");

    document.getElementById("dwnloadDataSend").value = Grp_file_json;

    // submits the form to server for processing download.
    document.getElementById("form3").submit();
    var strDwnload = "Closing this browser window will abort the operation.";

    var ieSpan = '<span id="ieSpan" style="font-family:Tahoma;font-size:12px;font-color:#3778C7;"><br/>Download is being prepared. DO NOT CLOSE THIS WINDOW.<br/>A zip file containing all selected contents is being assembled by the server.<br/>After that process is complete a download dialog will pop up giving you the option to save the zip file on your local hard drive.<br/><br/></span>' +
        '<span id="ieSpan2" style="font-weight:bold;">' + strDwnload.fontcolor("#3778C7") + '</span>';

    document.getElementById("selected_items").innerHTML = ieSpan;
}


//******************Code for Categories start****************

function catFromPlace() {
    // Identifies which space/group/project user has chosen to edit categories into and calls the appropriate method.
    //alert("Into CatFrom Place");
    var cat_place = document.getElementById("cat_place");
    var cat_sel_place = cat_place.options[cat_place.selectedIndex].value;
    if (cat_sel_place == "select_space") {
        fromSpaceRequest();
        document.getElementById("copyTo").style.visibility = "hidden";
    } else if (cat_sel_place == "select_group") {
        fromGroupRequest();
        document.getElementById("copyTo").style.visibility = "hidden";
    } else if (cat_sel_place == "select_project") {
        fromProjectRequest();
        document.getElementById("copyTo").style.visibility = "hidden";
    } else if (cat_sel_place == "select_one") {
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
    }
}

function categoryTest() {
    osapi.jive.corev3.places.get({
        uri: space_url
    }).execute(onPlaceFetchBlog);
}

function onPlaceFetchBlog(response) {
    response.getCategories().execute(catFetch);

}

function catFetch(response) {
    // capture the categories in the space/group/project and then populate the same in a dropdown.
    var groups_list = [];

    //console.log(JSON.stringify(response));
    var list_len = response.list.length;
    for (i = 0; i < list_len; i++) {
        //console.log(response.list[i].name);
        groups_list.push(response.list[i].name);
        document.getElementById('cat_sel').options[i] = new Option(response.list[i].name, response.list[i].name);
    }

    var myOptions = {
        val1: 'Select Category'
    };
    var mySelect = $('#cat_sel');
    $.each(myOptions, function (val, text) {
        mySelect.prepend(
            $('<option></option>').val(val).html(text));
    });

    $('select option[value="val1"]').attr("selected", true);
}

function categSel() {

    selected_cat = document.getElementById('cat_sel').value;
    //alert("selected_cat = "+selected_cat);
    if (selected_cat == "val1") {
        $("#cat_select_items_button").hide();
        $("#catTo").hide();
    } else {
        //*********************Hide and show for resetting the position of the element
        $("#cat_select_items_button").show();
        $("#catTo").show();
        $("#cat_select_items_button").hide();
        $("#catTo").hide();
        //***************************************End***************
        $("#cat_select_items_button").show();
        $("#catTo").show();

    }

}

//-----------------------------Populate content---------------------

function populateContent1() {
    console.log("Space url : " + space_url);
    console.log("blog url : " + blog_url);
    populateContent(space_url, blog_url);
}

function populateContent() {
    // fetches the files from the selected space/group/project using the SPACE_URL.
    addId = new Array();
    arrayIndex = 0;
    contentCheckedIndex = 0;
    contentUnCheckedIndex = 0;
    mainCheckedItems = new Array();
    mainUncheckItems = new Array();
    //  alert("mainCheckedItems.length = "+mainCheckedItems.length);
    // alert("mainUncheckItems.length = "+mainUncheckItems.length);
    alert("Please wait , as this operation may take some time . Press ok");
    osapi.jive.corev3.contents.get({
        type: 'file',
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Files: "+JSON.stringify(response));

        var files = response.list;
        var postFiles;
        var files_length = response.list.length;

        if (files_length == 0) {
            // action when the selected space/group/project has no files.

            files_row = '<table id="filesTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No files in this place.</strong></td></tr>';
        } else {
            // action when the selected space/group/project has files.
            if (sel_action_val == 'categs') {
                var header = 'Category';
            } else if (sel_action_val == 'tags') {
                var header = 'Tags';
            } else {
                var header = 'Author';
            }

            // creates table header row.
            files_row = '<table id="filesTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +

            '<tr>' +
                '<td style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_files"  onclick="javascript:checkedAll(this.id);">' + '</strong></td>' +
                '<td style="border:1px ;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></td>' +
                '<td style="border:1px solid ;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; ' + header + '</strong></td>' +
                '</tr>';


            $.each(files, function (index, group) {
                postFiles = {
                    title: "",
                    author: "",
                    updated: "",
                    fileUrl: "",
                    category: "",
                    tags: ""
                }

                // assigning values from the received response to the variables.
                postFiles.title = group.subject;
                postFiles.author = group.author.name.formatted;
                postFiles.updated = group.updated;
                postFiles.fileUrl = group.resources.self.ref;
                postFiles.category = group.categories;
                postFiles.tags = group.tags;

                // adding each file in a row as per the received response.
                var checkFlagItem = false;
                if (sel_action_val == 'categs') {
                    var categg1 = postFiles.category;

                    files_row = files_row + '<tr>' +
                        '<td style="border:1px ;border: 1px solid #000000;text-align:right;padding:2px;">' + '<input type="checkbox" id="file_cb' + index + '" name="file_cb" class="file_cb" onclick="javascript:checkUncheck(this.name);" value="' + postFiles.fileUrl + '">' + '</td>' +
                        '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postFiles.title + '</td>' +
                        '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postFiles.category + '</td>' +
                        '</tr>';

                    for (var ind = 0; ind < categg1.length; ind++) {
                        if (categg1[ind] == selected_cat) {
                            console.log("categg1= " + categg1);
                            console.log("selected_cat= " + selected_cat);
                            //console.log(document.getElementById("file_cb"+index).value);
                            var temp_id = "file_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postFiles.fileUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_cat == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postFiles.fileUrl;
                        contentUnCheckedIndex++;
                    }
                } else if (sel_action_val == 'tags') {
                    var tags = postFiles.tags;
                    checkFlagItem == false
                    console.log("tags: " + tags);
                    files_row = files_row + '<tr>' +
                        '<td style="border:1px ;border: 1px solid #000000;text-align:right;padding:2px;">' + '<input type="checkbox" id="file_cb' + index + '" name="file_cb" class="file_cb" onclick="javascript:checkUncheck(this.name);" value="' + postFiles.fileUrl + '">' + '</td>' +
                        '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postFiles.title + '</td>' +
                        '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postFiles.tags + '</td>' +
                        '</tr>';

                    for (var ind = 0; ind < tags.length; ind++) {
                        if (tags[ind] == selected_tag) {
                            console.log("tags= " + tags);
                            console.log("selected_tag= " + selected_tag);
                            //console.log(document.getElementById("file_cb"+index).value);
                            var temp_id = "file_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postFiles.fileUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_tag == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postFiles.fileUrl;
                        contentUnCheckedIndex++;
                    }

                } else {
                    files_row = files_row + '<tr>' +
                        '<td style="border:1px ;border: 1px solid #000000;text-align:right;padding:2px;">' + '<input type="checkbox" name="file_cb" class="file_cb" onclick="javascript:checkUncheck(this.name);" value="' + postFiles.fileUrl + '">' + '</td>' +
                        '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postFiles.title + '</td>' +
                        '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postFiles.author + '</td>' +
                        '</tr>';
                }

            });
        }
        files_row = files_row + '</table>';

        // writing the files table to the files tab.
        document.getElementById("files_div").innerHTML = files_row;
        populateBlogContent(space_url, blog_url);
    });

}

function populateBlogContent(space_url, blog_url) {

    // getting the blogs from the selected space/group/project using the BLOG_URL.

    osapi.jive.corev3.contents.get({
        type: 'post',
        fields: '@all',
        count: 50,
        place: blog_url
    }).execute(function (response) {
        //console.log("Blogs: "+JSON.stringify(response));

        var blogs = response.list;
        var postBlogs;
        var blogs_length = response.list.length;
        if (blogs_length == 0) {
            // action when the selected space/group/project has no blogs.
            blog_row = '<table id="blogTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No blog posts in this place.</strong></td></tr>';
        } else {
            // action when the selected space/group/project has blogs.
            if (sel_action_val == 'categs') {
                var header = 'Category';
            } else if (sel_action_val == 'tags') {
                var header = 'Tags';
            } else {
                var header = 'Author';
            }
            // adding the header for blogs table.
            blog_row = '<table id="blogTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_blogs"  onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; ' + header + '</strong></th>' +
                '</tr>';

            $.each(blogs, function (index, group) {
                postBlogs = {
                    title: "",
                    author: "",
                    updated: "",
                    fileUrl: "",
                    category: "",
                    tags: ""
                }

                // assigning values from received response to the variables.
                postBlogs.title = group.subject;
                postBlogs.author = group.author.name.formatted;
                postBlogs.updated = group.updated;
                postBlogs.fileUrl = group.resources.self.ref;
                postBlogs.category = group.categories;
                postBlogs.tags = group.tags;


                // adding each blog in a row as per the received response.
                var checkFlagItem = false;
                if (sel_action_val == 'categs') {
                    blog_row = blog_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="blog_cb' + index + '" name="blog_cb" class="blog_cb" onclick="javascript:checkUncheck(this.name);" value="' + postBlogs.fileUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postBlogs.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postBlogs.category + '</td>' +
                        '</tr>';

                    var categg2 = postBlogs.category;


                    for (var ind = 0; ind < categg2.length; ind++) {
                        if (categg2[ind] == selected_cat) {
                            console.log("categg2= " + categg2);
                            console.log("selected_cat= " + selected_cat);
                            //console.log(document.getElementById("blog_cb"+index).value);
                            var temp_id = "blog_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postBlogs.fileUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_cat == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postBlogs.fileUrl;
                        contentUnCheckedIndex++;
                    }
                } else if (sel_action_val == 'tags') {
                    var tags = postBlogs.tags;
                    checkFlagItem == false
                    console.log("tags: " + tags);
                    blog_row = blog_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="blog_cb' + index + '" name="blog_cb" class="blog_cb" onclick="javascript:checkUncheck(this.name);" value="' + postBlogs.fileUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postBlogs.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postBlogs.tags + '</td>' +
                        '</tr>';

                    for (var ind = 0; ind < tags.length; ind++) {
                        if (tags[ind] == selected_tag) {
                            console.log("tags= " + tags);
                            console.log("selected_tag= " + selected_tag);
                            //console.log(document.getElementById("blog_cb"+index).value);
                            var temp_id = "blog_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postBlogs.fileUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_tag == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postBlogs.fileUrl;
                        contentUnCheckedIndex++;
                    }
                } else {
                    blog_row = blog_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="blog_cb" class="blog_cb" onclick="javascript:checkUncheck(this.name);" value="' + postBlogs.fileUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postBlogs.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postBlogs.author + '</td>' +
                        '</tr>';
                }
            });
        }
        blog_row = blog_row + '</table>';

        // writing the blog table in the blog tab.
        document.getElementById("blog_div").innerHTML = blog_row;
        populateDocContent(space_url);
    });
}

function populateDocContent(space_url) {
    osapi.jive.corev3.documents.get({
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Documents: "+JSON.stringify(response));

        var documents = response.list;
        var postDoc;
        var docs_length = response.list.length;
        if (docs_length == 0) {
            docs_row = '<table id="docsTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No documents in this place.</strong></td></tr>';
        } else {
            if (sel_action_val == 'categs') {
                var header = 'Category';
            } else if (sel_action_val == 'tags') {
                var header = 'Tags';
            } else {
                var header = 'Author';
            }

            docs_row = '<table id="docsTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +

            '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_docs" onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; ' + header + '</strong></th>' +
                '</tr>';

            $.each(documents, function (index, group) {
                postDoc = {
                    title: "",
                    author: "",
                    updated: "",
                    docUrl: "",
                    category: "",
                    tags: ""
                }

                postDoc.title = group.subject;
                postDoc.author = group.author.name.formatted;
                postDoc.updated = group.updated;
                postDoc.docUrl = group.resources.self.ref;
                postDoc.category = group.categories;
                postDoc.tags = group.tags;

                var checkFlagItem = false;
                if (sel_action_val == 'categs') {
                    docs_row = docs_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="doc_cb' + index + '" name="doc_cb" class="doc_cb" onclick="javascript:checkUncheck(this.name);" value="' + postDoc.docUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDoc.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDoc.category + '</td>' +
                        '</tr>';

                    var categg3 = postDoc.category;


                    for (var ind = 0; ind < categg3.length; ind++) {
                        if (categg3[ind] == selected_cat) {
                            console.log("categg3= " + categg3);
                            console.log("selected_cat= " + selected_cat);
                            //console.log(document.getElementById("doc_cb"+index).value);
                            var temp_id = "doc_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postDoc.docUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_cat == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postDoc.docUrl;
                        contentUnCheckedIndex++;
                    }

                } else if (sel_action_val == 'tags') {
                    var tags = postDoc.tags;
                    checkFlagItem == false
                    console.log("tags: " + tags);
                    docs_row = docs_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="doc_cb' + index + '" name="doc_cb" class="doc_cb" onclick="javascript:checkUncheck(this.name);" value="' + postDoc.docUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDoc.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDoc.tags + '</td>' +
                        '</tr>';

                    for (var ind = 0; ind < tags.length; ind++) {
                        if (tags[ind] == selected_tag) {
                            console.log("tags= " + tags);
                            console.log("selected_tag= " + selected_tag);
                            //console.log(document.getElementById("doc_cb"+index).value);
                            var temp_id = "doc_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postDoc.docUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_tag == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postDoc.docUrl;
                        contentUnCheckedIndex++;
                    }
                } else {
                    docs_row = docs_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="doc_cb" class="doc_cb" onclick="javascript:checkUncheck(this.name);" value="' + postDoc.docUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDoc.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDoc.author + '</td>' +
                        '</tr>';
                }



            });
        }
        docs_row = docs_row + '</table>';
        document.getElementById("docs_div").innerHTML = docs_row;
        populateDiscussions(space_url);
    });
}

function populateDiscussions(space_url) {
    osapi.jive.corev3.discussions.get({
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Discussions: "+JSON.stringify(response));

        var disc = response.list;
        var postDisc;
        var disc_length = response.list.length;
        if (disc_length == 0) {
            disc_row = '<table id="discTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No discussions in this place.</strong></td></tr>';
        } else {
            if (sel_action_val == 'categs') {
                var header = 'Category';
            } else if (sel_action_val == 'tags') {
                var header = 'Tags';
            } else {
                var header = 'Author';
            }

            disc_row = '<table id="discTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +

            '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_disc"  onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; ' + header + '</strong></th>' +
                '</tr>';

            $.each(disc, function (index, group) {
                postDisc = {
                    title: "",
                    author: "",
                    updated: "",
                    discUrl: "",
                    category: "",
                    tags: ""
                }

                postDisc.title = group.subject;
                postDisc.author = group.author.name.formatted;
                postDisc.updated = group.updated;
                postDisc.discUrl = group.resources.self.ref;
                postDisc.category = group.categories;
                postDisc.tags = group.tags;
                var checkFlagItem = false;
                if (sel_action_val == 'categs') {
                    disc_row = disc_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="disc_cb' + index + '" name="disc_cb" class="disc_cb" onclick="javascript:checkUncheck(this.name);" value="' + postDisc.discUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDisc.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDisc.category + '</td>' +
                        '</tr>';

                    var categg4 = postDisc.category;

                    for (var ind = 0; ind < categg4.length; ind++) {
                        if (categg4[ind] == selected_cat) {
                            console.log("categg4= " + categg4);
                            console.log("selected_cat= " + selected_cat);
                            //console.log(document.getElementById("disc_cb"+index).value);
                            var temp_id = "disc_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postDisc.discUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_cat == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postDisc.discUrl;
                        contentUnCheckedIndex++;
                    }
                } else if (sel_action_val == 'tags') {
                    var tags = postDisc.tags;
                    checkFlagItem == false
                    console.log("tags: " + tags);
                    disc_row = disc_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="disc_cb' + index + '" name="disc_cb" class="disc_cb" onclick="javascript:checkUncheck(this.name);" value="' + postDisc.discUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDisc.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDisc.tags + '</td>' +
                        '</tr>';

                    for (var ind = 0; ind < tags.length; ind++) {
                        if (tags[ind] == selected_tag) {
                            console.log("tags= " + tags);
                            console.log("selected_tag= " + selected_tag);
                            //console.log(document.getElementById("disc_cb"+index).value);
                            var temp_id = "disc_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postDisc.discUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_tag == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postDisc.discUrl;
                        contentUnCheckedIndex++;
                    }
                } else {
                    disc_row = disc_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="disc_cb" class="disc_cb" onclick="javascript:checkUncheck(this.name);" value="' + postDisc.discUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDisc.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postDisc.author + '</td>' +
                        '</tr>';
                }


            });
        }
        disc_row = disc_row + '</table>';
        document.getElementById("disc_div").innerHTML = disc_row;
        populateIdeas(space_url);
    });
}

function populateIdeas(space_url) {
    osapi.jive.corev3.ideas.get({
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Ideas: "+JSON.stringify(response));

        var idea = response.list;
        var postIdea;
        var idea_length = response.list.length;
        if (idea_length == 0) {
            idea_row = '<table id="ideaTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr>' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No ideas in this place.</strong></td></tr>';
        } else {
            if (sel_action_val == 'categs') {
                var header = 'Category';
            } else if (sel_action_val == 'tags') {
                var header = 'Tags';
            } else {
                var header = 'Author';
            }

            idea_row = '<table id="ideaTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_ideas"  onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; ' + header + '</strong></th>' +
                '</tr>';

            $.each(idea, function (index, group) {
                postIdea = {
                    title: "",
                    author: "",
                    updated: "",
                    ideaUrl: "",
                    category: "",
                    tags: ""
                }

                postIdea.title = group.subject;
                postIdea.author = group.author.name.formatted;
                postIdea.updated = group.updated;
                postIdea.ideaUrl = group.resources.self.ref;
                postIdea.category = group.categories;
                postIdea.tags = group.tags;

                var checkFlagItem = false;
                if (sel_action_val == 'categs') {
                    idea_row = idea_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="idea_cb' + index + '" name="idea_cb" class="idea_cb" onclick="javascript:checkUncheck(this.name);" value="' + postIdea.ideaUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postIdea.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postIdea.category + '</td>' +
                        '</tr>';

                    var categg5 = postIdea.category;

                    for (var ind = 0; ind < categg5.length; ind++) {
                        if (categg5[ind] == selected_cat) {
                            console.log("categg5= " + categg5);
                            console.log("selected_cat= " + selected_cat);
                            //console.log(document.getElementById("idea_cb"+index).value);
                            var temp_id = "idea_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postIdea.ideaUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_cat == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postIdea.ideaUrl;
                        contentUnCheckedIndex++;
                    }

                } else if (sel_action_val == 'tags') {
                    var tags = postIdea.tags;
                    checkFlagItem == false
                    console.log("tags: " + tags);
                    idea_row = idea_row + '<tr>' +
                        '<td style="border:1px ;border: 1px solid #000000;text-align:right;padding:2px;">' + '<input type="checkbox" id="idea_cb' + index + '" name="idea_cb" class="idea_cb" onclick="javascript:checkUncheck(this.name);" value="' + postIdea.ideaUrl + '">' + '</td>' +
                        '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postIdea.title + '</td>' +
                        '<td style="border:1px ;border: 1px solid #000000;padding: 2px;">' + postIdea.tags + '</td>' +
                        '</tr>';

                    for (var ind = 0; ind < tags.length; ind++) {
                        if (tags[ind] == selected_tag) {
                            console.log("tags= " + tags);
                            console.log("selected_tag= " + selected_tag);
                            //console.log(document.getElementById("idea_cb"+index).value);
                            var temp_id = "idea_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postIdea.ideaUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_tag == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postIdea.ideaUrl;
                        contentUnCheckedIndex++;
                    }
                } else {
                    idea_row = idea_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="idea_cb" class="idea_cb" onclick="javascript:checkUncheck(this.name);" value="' + postIdea.ideaUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postIdea.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postIdea.author + '</td>' +
                        '</tr>';
                }


            });
        }
        idea_row = idea_row + '</table>';
        document.getElementById("idea_div").innerHTML = idea_row;
        populatePolls(space_url);
    });
}

function populatePolls(space_url) {
    osapi.jive.corev3.polls.get({
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Polls: "+JSON.stringify(response));

        var polls = response.list;
        var postPolls;
        var poll_length = response.list.length;
        if (poll_length == 0) {
            poll_row = '<table id="pollTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +
                '<tr><td colspan="4" style="border:1px ;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: center;" valign="middle"><strong>No polls in this place.</strong></td></tr>';
        } else {
            if (sel_action_val == 'categs') {
                var header = 'Category';
            } else if (sel_action_val == 'tags') {
                var header = 'Tags';
            } else {
                var header = 'Author';
            }

            poll_row = '<table id="pollTable" border="0" class="jiveBorder" jive-data-cell="{&quot;color&quot;:&quot;#575757&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;backgroundColor&quot;:&quot;transparent&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" jive-data-header="{&quot;color&quot;:&quot;#FFFFFF&quot;,&quot;backgroundColor&quot;:&quot;#6690BC&quot;,&quot;textAlign&quot;:&quot;left&quot;,&quot;padding&quot;:&quot;2&quot;,&quot;fontFamily&quot;:&quot;arial,helvetica,sans-serif&quot;,&quot;verticalAlign&quot;:&quot;baseline&quot;}" style="border: 1px solid #000000; width: 450px;">' +

            '<tr>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 60px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: right;" valign="middle"><strong>' + 'All<input type="checkbox" id="sel_all_polls"  onclick="javascript:checkedAll(this.id);">' + '</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 450px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; Title</strong></th>' +
                '<td style="border:1px solid black;border: 1px solid #000000;width: 160px;padding: 2px;color: #ffffff;background-color: #6690bc;text-align: left;" valign="middle"><strong>&nbsp; ' + header + '</strong></th>' +
                '</tr>';

            $.each(polls, function (index, group) {
                postPolls = {
                    title: "",
                    author: "",
                    updated: "",
                    fileUrl: "",
                    category: "",
                    tags: ""
                }

                postPolls.title = group.subject;
                postPolls.author = group.author.name.formatted;
                postPolls.updated = group.updated;
                postPolls.fileUrl = group.resources.self.ref;
                postPolls.category = group.categories;
                postPolls.tags = group.tags;
                var checkFlagItem = false;
                if (sel_action_val == 'categs') {
                    poll_row = poll_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="poll_cb' + index + '" name="poll_cb" class="poll_cb" onclick="javascript:checkUncheck(this.name);" value="' + postPolls.fileUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postPolls.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postPolls.category + '</td>' +
                        '</tr>';

                    var categg6 = postPolls.category;

                    for (var ind = 0; ind < categg6.length; ind++) {
                        if (categg6[ind] == selected_cat) {
                            console.log("categg6= " + categg6);
                            console.log("selected_cat= " + selected_cat);
                            //console.log(document.getElementById("poll_cb"+index).value);
                            var temp_id = "poll_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postPolls.fileUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_cat == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postPolls.fileUrl;
                        contentUnCheckedIndex++;
                    }

                } else if (sel_action_val == 'tags') {
                    var tags = postPolls.tags;
                    checkFlagItem == false
                    console.log("tags: " + tags);
                    poll_row = poll_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" id="poll_cb' + index + '" name="poll_cb" class="poll_cb" onclick="javascript:checkUncheck(this.name);" value="' + postPolls.fileUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postPolls.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postPolls.tags + '</td>' +
                        '</tr>';

                    for (var ind = 0; ind < tags.length; ind++) {
                        if (tags[ind] == selected_tag) {
                            console.log("tags= " + tags);
                            console.log("selected_tag= " + selected_tag);
                            //console.log(document.getElementById("poll_cb"+index).value);
                            var temp_id = "poll_cb" + index;
                            console.log("temp_id= " + temp_id);
                            addId[arrayIndex] = temp_id;
                            console.log("Array val: " + addId[arrayIndex]);
                            arrayIndex++;
                            mainCheckedItems[contentCheckedIndex] = postPolls.fileUrl;
                            contentCheckedIndex++;
                            checkFlagItem = true;
                        }
                    }
                    if (checkFlagItem == false && !(selected_tag == '')) {
                        mainUncheckItems[contentUnCheckedIndex] = postPolls.fileUrl;
                        contentUnCheckedIndex++;
                    }
                } else {
                    poll_row = poll_row + '<tr>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;text-align: right;padding: 2px;">' + '<input type="checkbox" name="poll_cb" class="poll_cb" onclick="javascript:checkUncheck(this.name);" value="' + postPolls.fileUrl + '">' + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postPolls.title + '</td>' +
                        '<td style="border:1px solid black;border: 1px solid #000000;padding: 2px;">' + postPolls.author + '</td>' +
                        '</tr>';
                }

            });
        }
        poll_row = poll_row + '</table>';
        document.getElementById("poll_div").innerHTML = poll_row;
        //	alert("after mainCheckedItems.length = "+mainCheckedItems.length);
        //	alert("after mainUncheckItems.length = "+mainUncheckItems.length);
        javascript: showTab();
        javascript: highlightTab();
    });
}

function startUpdatingCategories() {
    //alert("catagory selectionn....");
    //alert("browserName = "+browserName);
    //positioning the components
    $("#catFrom").css("margin-top", "-50px");
    $("#catFrom").css("margin-left", "240px");
    $("#cat_from_space").css("margin-top", "0px");
    $("#selCat").css("margin-top", "30px");
    $("#catTo").css("margin-top", "55px");
    $("#selected_items_categories").css("margin-top", "120px");
    $("#cat_from_space").css("margin-left", "180px");
    $("#selCat").css("margin-left", "220px");
    $("#catTo").css("margin-left", "290px");

    $("#cat_updating_text").css("margin-left", "-320px");


    $("#selection_menu").hide();
    $("#stylized").show();
    $("#change_selection_div").show();
    $("#change_contents").hide();
    $("#start_copying_button").hide();

    $("#cmdu").show();
    $("#cmdu").text("Manage Categories");
    $("#selCat").text("Selected Category");
    $("#src_place").hide();
    $("#start_copying_button").hide();
    $("#change_contents").hide();
    $("#button_div").hide();
    $("#cat_place").hide();
    $("#cat_sel").hide();
    $("#selCat").show();
    $("#catTo").show();
    //$("#refresh_app_button").show();
    //$("#refresh_app").show();
    $("#cat_updating_text").show();
    $("#catTo").text(selected_cat);
    $("#cat_select_items_button").hide();



    $("#selected_items").hide();
    $("#selected_items_categories").show();

    if (browserName == "MSIE") {
        var ieSpan = '<span id="ieSpan" style="font-family:Tahoma;font-size:12px;font-color:#3778C7;"></span>';
        document.getElementById("selected_items_categories").innerHTML = ieSpan;
    } else {
        var iframe = '<iframe id="frame1"  style="width:650px;height:90px;margin-top:0px;font-family:Tahoma"></iframe>';
        document.getElementById("selected_items_categories").innerHTML = iframe;
        $("#cat_updating_text").text("Updating this:");
    }

    if (browserName == "MSIE") {
        var finalurl = redirection_url + '/content';
        document.getElementById("ieSpan").innerHTML = 'The selected contents are being update with category. The update contents will appear here in a short while: <a href=' + 'URL' + '>' + '' + ' - Contents</a>';
    } else {
        document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
        document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
        document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
        document.getElementById("frame1").contentDocument.body.innerHTML = "Updating categories is in Progress.<br>Please leave this window open until the updating process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + 'Updating content'.fontcolor("#3778C7") + "</span>";
    }
    for (var index = 0; index < mainCheckedItems.length; index++) {
        //	alert("checked items : "+mainCheckedItems[index]);
        //console.log("checked items : "+mainCheckedItems[index]);
    }

    for (var index = 0; index < mainUncheckItems.length; index++) {
        //alert("unchecked items : "+mainUncheckItems[index]);
        //console.log("unchecked items : "+mainUncheckItems[index]);
    }

    //alert("mainCheckedItems.length = "+mainCheckedItems.length);
    //console.log("mainCheckedItems.length = "+mainCheckedItems.length);
    //alert("mainUncheckItems.length = "+mainUncheckItems.length);
    //console.log("mainUncheckItems.length = "+mainUncheckItems.length);
    //***********************************

     filterCheckedUncheckCatgUrl1();


    catIndex = 0;
    //updateCategoriesForNewContents1();
    //removeCategoriesForContents();
}

function filterCheckedUncheckCatgUrl1() {
    var contentTypeCheckBoxIdArray = new Array();
    checkedItemsArray = new Array();
    uncheckItemArray = new Array();
    checkItemArrayUpdated = new Array();
    uncheckedItemArrayUpdated = new Array();
    errorReferenceCatArray = new Array();
    errorReferenceCatArray = new Array();
    referenceCatArrayIndex = 0;
    deReferenceCatArrayIndex = 0;

    contentTypeCheckBoxIdArray[0] = '#filesTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[1] = '#docsTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[2] = '#ideaTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[3] = '#pollTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[4] = '#blogTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[5] = '#discTable input[type=checkbox]';


    var checkedIndex = 0;
    var uncheckedIndex = 0;
    var val = [];
    for (index = 0; index < contentTypeCheckBoxIdArray.length; index++) {
        //$('#filesTable input[type=checkbox]').each(function(i){
        $(contentTypeCheckBoxIdArray[index]).each(function (i) {

            val[i] = $(this).val();
            // alert(val[i]);
            if (val[i] != 'on') {
                if ($(this).is(':checked')) {
                    //alert("true");
                    checkedItemsArray[checkedIndex] = $(this).val();
                    checkedIndex++;
                } else {
                    // alert("false");
                    uncheckItemArray[uncheckedIndex] = $(this).val();
                    uncheckedIndex++;
                }
            }


        });

    }
    //  alert("checkedItemsArray.length = "+checkedItemsArray.length);
    console.log("checkedItemsArray.length = " + checkedItemsArray.length);
    //  alert("uncheckItemArray.length = "+uncheckItemArray.length);
    console.log("uncheckItemArray.length = " + uncheckItemArray.length);


    for (var index = 0; index < checkedItemsArray.length; index++) {
        console.log("checked items : " + checkedItemsArray[index]);
    }

    for (var index = 0; index < uncheckItemArray.length; index++) {
        console.log("unchecked items : " + uncheckItemArray[index]);
    }

    //	alert("mainCheckedItems.length = "+mainCheckedItems.length);
    console.log("mainCheckedItems.length = " + mainCheckedItems.length);
    //   alert("mainUncheckItems.length = "+mainUncheckItems.length);
    console.log("mainUncheckItems.length = " + mainUncheckItems.length);


    for (var index = 0; index < mainCheckedItems.length; index++) {
        console.log("checked items : " + mainCheckedItems[index]);
    }

    for (var index = 0; index < mainUncheckItems.length; index++) {
        console.log("unchecked items : " + mainUncheckItems[index]);
    }

    /*Filter the the list */
    var checkedIndex = 0;
    var uncheckedIndex = 0;
    for (var outerIndex = 0; outerIndex < checkedItemsArray.length; outerIndex++) {
        if (mainCheckedItems.length != 0) {
            for (var innerIndex = 0; innerIndex < mainCheckedItems.length; innerIndex++) {
                //alert("checkedItemsArray[outerIndex] = mainCheckedItems[innerIndex] :" +checkedItemsArray[outerIndex] == mainCheckedItems[innerIndex]);
                //alert("checkedItemsArray[outerIndex] = mainCheckedItems[innerIndex] :" +checkedItemsArray[outerIndex] == mainCheckedItems[innerIndex]);
                if (checkedItemsArray[outerIndex] == mainCheckedItems[innerIndex]) {
                    break;
                } else {
                    if (innerIndex == (mainCheckedItems.length - 1)) {
                        checkItemArrayUpdated[checkedIndex] = checkedItemsArray[outerIndex];
                        checkedIndex++;
                    }

                }
            }
        } else {
            checkItemArrayUpdated[checkedIndex] = checkedItemsArray[outerIndex];
            checkedIndex++;
        }
    }



    for (var outerIndex = 0; outerIndex < uncheckItemArray.length; outerIndex++) {
        if (mainUncheckItems.length != 0) {
            for (var innerIndex = 0; innerIndex < mainUncheckItems.length; innerIndex++) {
                //alert("checkedItemsArray[outerIndex] = mainCheckedItems[innerIndex] :" +checkedItemsArray[outerIndex] == mainCheckedItems[innerIndex]);
                if (uncheckItemArray[outerIndex] == mainUncheckItems[innerIndex]) {
                    break;
                } else {
                    if (innerIndex == (mainUncheckItems.length - 1)) {
                        uncheckedItemArrayUpdated[uncheckedIndex] = uncheckItemArray[outerIndex];
                        uncheckedIndex++;
                    }

                }
            }
        } else {
            uncheckedItemArrayUpdated[uncheckedIndex] = uncheckItemArray[outerIndex];
            uncheckedIndex++;
        }
    }

    //	alert("checkItemArrayUpdated.length = "+checkItemArrayUpdated.length);
    console.log("checkItemArrayUpdated.length = " + checkItemArrayUpdated.length);
    //	alert("uncheckedItemArrayUpdated.length = "+uncheckedItemArrayUpdated.length);
    console.log("uncheckedItemArrayUpdated.length = " + uncheckedItemArrayUpdated.length);


    for (var index = 0; index < checkItemArrayUpdated.length; index++) {
        //alert("new checked items : "+checkItemArrayUpdated[index]);
        console.log("new checked update items : " + checkItemArrayUpdated[index]);
    }
    for (var index = 0; index < uncheckedItemArrayUpdated.length; index++) {
        //alert("new unchecked items : "+uncheckedItemArrayUpdated[index]);
        console.log("new unchecked update items : " + uncheckedItemArrayUpdated[index]);
    }
    catIndex = 0;
    updateCategoriesForNewContents1();



}

function updateCategoriesForNewContents1() {
    //alert("Into the updateCategories for new contents");
    console.log("Into the updateCategories for new contents");
    for (var index = 0; index < checkedItemsArray.length; index++) {
        //alert("new checked items : "+checkedItemsArray[index]);
        //console.log("new checked items : "+checkedItemsArray[index]);
    }
    for (var index = 0; index < uncheckedItemArrayUpdated.length; index++) {
        //alert("new unchecked items : "+uncheckedItemArrayUpdated[index]);
        //	console.log("new unchecked items : "+uncheckedItemArrayUpdated[index]);
    }

    //alert("checkItemArrayUpdated.length = "+uncheckItemArray.length+" catIndex ="+catIndex);
    //console.log("checkItemArrayUpdated.length = "+uncheckItemArray.length+" catIndex="+catIndex);

    if (catIndex < checkItemArrayUpdated.length) {

        var contentURL = checkItemArrayUpdated[catIndex];
        var toUpdateCategories;
        var toCategoriesArray;
        var updatedCategoryList = new Array();
        var isCategoryExisting = false;

        //alert("contentURL got is ="+contentURL);
        console.log("contentURL got is =" + contentURL);
        osapi.jive.corev3.contents.get({
            fields: '@all',
            uri: contentURL
        }).execute(function (contentCatResponseObj) {
            //alert(JSON.stringify(contentCatResponseObj));
            //console.log(JSON.stringify(contentCatResponseObj));

            //console.log(contentCatResponseObj.categories);
            //alert("selected_cat = "+selected_cat);
            toUpdateCategories = contentCatResponseObj.categories;
            var str = 'Applying category ' + selected_cat + ' to ' + contentCatResponseObj.type + '';
            for (index = 0; index < dotIndex; index++)
                str = str + '.';
            dotIndex++;
            if (dotIndex == 4) dotIndex = 0;
            document.getElementById("frame1").contentDocument.body.innerHTML = "Updating Categories in Progress.<br>Please leave this window open until the moving process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";


            var tempIndex = 0;
            for (var index = 0; index < toUpdateCategories.length; index++, tempIndex++) {
                //alert("---cc-"+toUpdateCategories[index]);
                //console.log("---cc-"+toUpdateCategories[index]);
                updatedCategoryList[tempIndex] = toUpdateCategories[index];
                if (toUpdateCategories[index] == selected_cat) {
                    isCategoryExisting = true;
                }


            }
            //	alert("isCategoryExisting = "+isCategoryExisting);
            if (!isCategoryExisting) {
                updatedCategoryList[tempIndex] = selected_cat;
                isCategoryExisting = false;
            }

            for (var index = 0; index < updatedCategoryList.length; index++, tempIndex++) {
                //console.log("VVVV-- "+updatedCategoryList[index]);
            }

            //console.log("toUpdateCategories = "+toUpdateCategories);
            // alert("Title = " + contentCatResponseObj.subject);
            var title = contentCatResponseObj.subject;
            title = title.replace('&amp;', '&');
            title = title.replace('&lt;', '<');
            title = title.replace('&gt;', '>');
            contentCatResponseObj.subject = title;
            contentCatResponseObj.categories = updatedCategoryList;
            contentCatResponseObj.update().execute(function (catUpdateResponse) {

                //console.log("updated --"+JSON.stringify(catUpdateResponse));
                if (catUpdateResponse.error) {
                    console.log("updated --" + JSON.stringify(catUpdateResponse));
                    console.log("errorReferenceCatArray.length --" + errorReferenceCatArray.length);
                    errorReferenceCatArray[referenceCatArrayIndex] = contentCatResponseObj.resources.html.ref;
                    referenceCatArrayIndex++;

                }


            });
            catIndex++;
            updateCategoriesForNewContents1();

        });

    } else {
        catIndex = 0;
        dotIndex = 0;
        removeCategoriesForContents();
    }

}

function removeCategoriesForContents() {


    if (catIndex < uncheckedItemArrayUpdated.length) {

        var contentURL = uncheckedItemArrayUpdated[catIndex];
        var toUpdateCategories;
        var toCategoriesArray;
        var updatedCategoryList = new Array();

        //alert("contentURL got is ="+contentURL);
        console.log("contentURL got is =" + contentURL);
        osapi.jive.corev3.contents.get({
            fields: '@all',
            uri: contentURL
        }).execute(function (contentCatResponseObj) {
            //alert(JSON.stringify(contentCatResponseObj));
            console.log(JSON.stringify(contentCatResponseObj));

            //alert(contentCatResponseObj.categories);
            //alert("selected_cat = "+selected_cat);
            toUpdateCategories = contentCatResponseObj.categories;
            var str = 'Removing category ' + selected_cat + ' from ' + contentCatResponseObj.type + '';
            for (index = 0; index < dotIndex; index++)
                str = str + '.';
            dotIndex++;
            if (dotIndex == 4) dotIndex = 0;
            document.getElementById("frame1").contentDocument.body.innerHTML = "Removing Categories in Progress.<br>Please leave this window open until the moving process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";
            //toUpdateCategories = toUpdateCategories+','+selected_cat;
            //toUpdateCategories = ["cat1","cat2","cat3"];
            //toCategoriesArray = toUpdateCategories.split(",");
            var tempIndex = 0;
            for (var index = 0; index < toUpdateCategories.length; index++) {
                if (selected_cat != toUpdateCategories[index]) {
                    //	alert("---cc-"+toUpdateCategories[index]);
                    console.log("---cc-" + toUpdateCategories[index]);
                    updatedCategoryList[tempIndex] = toUpdateCategories[index];
                    tempIndex++;
                }
            }

            //toUpdateCategories = selected_cat;
            //alert("toUpdateCategories = "+toUpdateCategories);
            console.log("toUpdateCategories = " + toUpdateCategories);
            //contentCatResponseObj.categories = toUpdateCategories;
            var title = contentCatResponseObj.subject;
            title = title.replace('&amp;', '&');
            title = title.replace('&lt;', '<');
            title = title.replace('&gt;', '>');
            contentCatResponseObj.subject = title;
            contentCatResponseObj.categories = updatedCategoryList;
            contentCatResponseObj.update().execute(function (catUpdateResponse) {
                //alert(JSON.stringify(catUpdateResponse));
                //console.log("UPDated -- "+JSON.stringify(catUpdateResponse));
                if (catUpdateResponse.error) {
                    console.log("updated --" + JSON.stringify(catUpdateResponse));
                    console.log("errorReferenceCatArray.length --" + errorReferenceCatArray.length);

                    errorDeReferenceCatArray[deReferenceCatArrayIndex] = contentCatResponseObj.resources.html.ref;
                    deReferenceCatArrayIndex++;

                }

            });
            catIndex++;
            removeCategoriesForContents();

        });

    } else {
        for (var index = 0; index < errorReferenceCatArray.length; index++) {
            console.log("Could Not Reference " + errorReferenceCatArray[index]);
        }

        for (var index = 0; index < errorDeReferenceCatArray.length; index++) {
            console.log("Could Not De-Reference " + errorDeReferenceCatArray[index]);
        }
        if (errorReferenceCatArray.length > 0 || errorDeReferenceCatArray.length > 0) {
            alert('Message:\n\nYou have insufficient rights to update all the content selected.\n\nYou need to have group administration or space moderation rights to update content with restricted authorship (e.g. discussions started by other users).\n\nPlease contact your group or space admin to get the necessary rights.');
            $("#refresh_app_button").show();
            $("#refresh_app").show();
        } else {

            console.log("Category " + selected_cat + " succesfully updated");
            //alert("Category "+selected_cat+" succesfully updated");
            var tempRedirectionUrl = source_html_url + '/content?filterID=contentstatus[published]~category[' + selected_cat + ']';
            catRedirectUrl = source_html_url + '/content?filterID=contentstatus[published]~category[' + selected_cat + ']';
            console.log("temRedirectionUrl = " + tempRedirectionUrl);
            $("#refresh_app_button").show();
            $("#refresh_app").show();
            if ($("#cat_from_space").text() != 'Change Category in Space')
                $("#cat_from_space").show();
            else
                $("#cat_from_space").hide();
            if ($("#cat_from_group").text() != 'Change Category in Group')
                $("#cat_from_group").show();
            else
                $("#cat_from_group").hide();
            if ($("#cat_from_project").text() != 'Change Category in Project')
                $("#cat_from_project").show();
            else
                $("#cat_from_project").hide();

            //$('#catTo').css("margin-top", "230px");
            var str = 'Updating categories has completed. Please click   <a id="content_url" href=' + tempRedirectionUrl + '>here </a>  to review the result.';
            //var str = 'Updating categories has completed. Please click   <a href="" id="content_url" >here </a>  to review the result.';
            document.getElementById("frame1").contentDocument.body.innerHTML = "Note:<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";

        }


    }



}

function startFromBeginning() {
    //alert("url ="+document.referrer);
    window.location = document.referrer;
}
$('#content_url').click(function () {
    alert("opening in a new tab");
    $(this).target = "_blank";
    window.open($(this).prop(catRedirectUrl));
    return false;
});


//**********************End of code for catergories******************

//**********************Code Tags***********************

function tagFromPlace() {
    // Identifies which space/group/project user has chosen to edit categories into and calls the appropriate method.
    var cat_place = document.getElementById("tag_place");
    var cat_sel_place = cat_place.options[cat_place.selectedIndex].value;

    if (cat_sel_place == "select_space") {
        fromSpaceRequest();
        document.getElementById("copyTo").style.visibility = "hidden";
    } else if (cat_sel_place == "select_group") {
        fromGroupRequest();
        document.getElementById("copyTo").style.visibility = "hidden";
    } else if (cat_sel_place == "select_project") {
        fromProjectRequest();
        document.getElementById("copyTo").style.visibility = "hidden";
    } else if (cat_sel_place == "select_one") {
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
    }
}

function toPlace() {
    // Identifies which space/group/project the user  has chosen to copy/move the selected content and calls the relevant method.
    var to_place = document.getElementById("to_place");
    var to_sel_place = to_place.options[to_place.selectedIndex].value;

    if (to_sel_place == "to_space") {
        toSpaceRequest();
    } else if (to_sel_place == "to_group") {
        toGroupRequest();
    } else if (to_sel_place == "to_project") {
        toProjectRequest();
    } else if (to_sel_place == "select_to") {
        document.getElementById("start_copying_button").style.visibility = "hidden";
        $("#button_div").hide();
        document.getElementById("copyTo").style.visibility = "hidden";
    }
}
//-- for auto completion of tags
var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
];
$(function () {
    $("#tag_sel").autocomplete({
        source: availableTags
    });
});
///--end

function populateContentforTags(space_url, blog_url) {

    alert("Please wait , as this operation may take some time . Press ok");
    addId = new Array();
    arrayIndex = 0;
    contentCheckedIndex = 0;
    contentUnCheckedIndex = 0;
    mainCheckedItems = new Array();
    mainUncheckItems = new Array();
    osapi.jive.corev3.contents.get({
        type: 'file',
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Files: "+JSON.stringify(response));

        var files = response.list;
        var postFiles;
        var files_length = response.list.length;
        var tagExist = false;
        $.each(files, function (index, group) {


            var tags = group.tags;
            for (var ind = 0; ind < tags.length; ind++) {
                tagExist = false;
                for (var indexTag = 0; indexTag < tagPopulatList.length; indexTag++) {

                    if (tagPopulatList[indexTag] == tags[ind]) {
                        tagExist = true;
                    }
                }
                if (!tagExist) {
                    tagPopulatList[completeTagIndex] = tags[ind];
                    completeTagIndex++;
                }
                availableTags = tagPopulatList;
                /*$( "#tag_sel" ).autocomplete({
      source: availableTags
    });*/

            }

        });
        populateBlogforTags(blog_url, space_url);
    });

}

function populateBlogforTags(blog_url, space_url) {
    osapi.jive.corev3.contents.get({
        type: 'post',
        fields: '@all',
        count: 50,
        place: blog_url
    }).execute(function (response) {
        //console.log("Files: "+JSON.stringify(response));

        var blogs = response.list;
        var files_length = response.list.length;
        var tagExist = false;
        $.each(blogs, function (index, group) {


            var tags = group.tags;
            for (var ind = 0; ind < tags.length; ind++) {
                tagExist = false;
                for (var indexTag = 0; indexTag < tagPopulatList.length; indexTag++) {

                    if (tagPopulatList[indexTag] == tags[ind]) {
                        tagExist = true;
                    }
                }
                if (!tagExist) {
                    tagPopulatList[completeTagIndex] = tags[ind];
                    completeTagIndex++;
                }
                availableTags = tagPopulatList;
                /*$( "#tag_sel" ).autocomplete({
				  source: availableTags
				});*/

            }

        });
        populateDocContentForTags(space_url);
    });

}

function populateDocContentForTags(space_url) {
    osapi.jive.corev3.contents.get({
        type: 'post',
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Files: "+JSON.stringify(response));

        var docs = response.list;
        var files_length = response.list.length;
        var tagExist = false;
        $.each(docs, function (index, group) {


            var tags = group.tags;
            for (var ind = 0; ind < tags.length; ind++) {
                tagExist = false;
                for (var indexTag = 0; indexTag < tagPopulatList.length; indexTag++) {

                    if (tagPopulatList[indexTag] == tags[ind]) {
                        tagExist = true;
                    }
                }
                if (!tagExist) {
                    tagPopulatList[completeTagIndex] = tags[ind];
                    completeTagIndex++;
                }
                availableTags = tagPopulatList;
                /*$( "#tag_sel" ).autocomplete({
				  source: availableTags
				});*/

            }

        });
        populateDiscussionsForTags(space_url);
    });

}

function populateDiscussionsForTags(space_url) {
    osapi.jive.corev3.contents.get({
        type: 'discussion',
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Files: "+JSON.stringify(response));

        var discs = response.list;
        var files_length = response.list.length;
        var tagExist = false;
        $.each(discs, function (index, group) {


            var tags = group.tags;
            for (var ind = 0; ind < tags.length; ind++) {
                tagExist = false;
                for (var indexTag = 0; indexTag < tagPopulatList.length; indexTag++) {

                    if (tagPopulatList[indexTag] == tags[ind]) {
                        tagExist = true;
                    }
                }
                if (!tagExist) {
                    tagPopulatList[completeTagIndex] = tags[ind];
                    completeTagIndex++;
                }
                availableTags = tagPopulatList;
                /*$( "#tag_sel" ).autocomplete({
				  source: availableTags
				});*/

            }

        });
        populateIdeasForTags(space_url);
    });

}

function populateIdeasForTags(space_url) {
    osapi.jive.corev3.contents.get({
        type: 'idea',
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Files: "+JSON.stringify(response));

        var ideas = response.list;
        var files_length = response.list.length;
        var tagExist = false;
        $.each(ideas, function (index, group) {


            var tags = group.tags;
            for (var ind = 0; ind < tags.length; ind++) {
                tagExist = false;
                for (var indexTag = 0; indexTag < tagPopulatList.length; indexTag++) {

                    if (tagPopulatList[indexTag] == tags[ind]) {
                        tagExist = true;
                    }
                }
                if (!tagExist) {
                    tagPopulatList[completeTagIndex] = tags[ind];
                    completeTagIndex++;
                }
                availableTags = tagPopulatList;
                /*$( "#tag_sel" ).autocomplete({
				  source: availableTags
				});*/

            }

        });
        populatePollsForTags(space_url);
    });

}

function populatePollsForTags(space_url) {
    osapi.jive.corev3.contents.get({
        type: 'poll',
        fields: '@all',
        count: 50,
        place: space_url
    }).execute(function (response) {
        //console.log("Files: "+JSON.stringify(response));

        var ideas = response.list;
        var files_length = response.list.length;
        var tagExist = false;
        $.each(ideas, function (index, group) {


            var tags = group.tags;
            for (var ind = 0; ind < tags.length; ind++) {
                tagExist = false;
                for (var indexTag = 0; indexTag < tagPopulatList.length; indexTag++) {

                    if (tagPopulatList[indexTag] == tags[ind]) {
                        tagExist = true;
                    }
                }
                if (!tagExist) {
                    tagPopulatList[completeTagIndex] = tags[ind];
                    completeTagIndex++;
                }
                availableTags = tagPopulatList;
                /*$( "#tag_sel" ).autocomplete({
				  source: availableTags
				});*/

            }

        });
        // populateIdeasForTags(space_url);
        for (var indexTag1 = 0; indexTag1 < availableTags.length; indexTag1++) {
            console.log("availableTags .. " + availableTags[indexTag1]);
        }
        $("#tag_sel").autocomplete({
            source: availableTags
        });


        if (fromRequestAction == 'fromSpaceRequestAction') {
            // $('#all_selected_items').css("margin-top", "80px");
            // $('#selected_items').css("margin-top", "80px");
            // $("#tagFrom").css("margin-top", "-30px");
            // $("#tag_from_space").css("margin-top", "10px");
            $("#tag_place").css("margin-top", "30px");
            $("#selTag").css("margin-left", '200px');
            //   $("#selTag").css("margin-top", parseInt($("#tag_place").css("margin-top")) + 35 + 'px');
            //$("#selTag").css("margin-top", "60px");
            //  $("#tag_sel").css("margin-top", "90px");
            //  $("#add_tag_button").css("margin-top", "90px");
            // $("#tag_place").css("margin-left", '-65px');
            // $("#tagFrom").css("margin-left", '235px');
            // $("#selTag").css("margin-left", '205px');
            //  $("#tag_sel").css("margin-left", '-75px');
            $("#selTag").text("Enter Tag");


            $("#tagTo").text("Assign tag to this content:").append('<br/>');
            document.getElementById("tagTo").style.display = "inline";
            $("#tagTo").hide();
            $("#dwnTo").hide();
            $("#upTo").hide();
            $("#tag_sel option").each(function () {
                $(this).remove();
            });
            document.getElementById("dwn_select_items_button").style.display = "inline";
            document.getElementById("tag_select_items_button").style.display = "inline";
            document.getElementById("tag_sel").style.display = "inline";
            document.getElementById("up_select_items_button").style.display = "inline";
            $("#dwn_select_items_button").hide();
            $("#tag_select_items_button").hide();

            $("#tag_sel").show();
            $("#add_tag_button").show();
            $("#selTag").show();
            $("#up_select_items_button").hide();
            $("#change_selection_div").hide();
            $("#dwnShow").hide();
            $("#catShow").hide();
            $("#tagShow").show();
            $("#upShow").hide();
            $("#up_place").hide();
            $("#add_tag").hide();
            document.getElementById("dwn_place").style.display = "inline";
            document.getElementById("tag_place").style.display = "inline";
            $("#dwn_place").hide();
            $("#tag_place").show();
            document.getElementById("tag_from_space").innerHTML = '<span id="myId" style="text-decoration:underline;">Space</span>' + ': ' + global_from_place_name;

            $("#tag_from_space").show();
            $("#tag_from_group").hide();
            $("#tag_from_project").hide();
        } else if (fromRequestAction == 'fromGroupRequestAction') {
            //  $('#all_selected_items').css("margin-top", "80px");
            // $('#selected_items').css("margin-top", "80px");
            // $("#selTag").css("margin-top", parseInt($("#tag_place").css("margin-top")) + 35 + 'px');
            //$("#selTag").css("margin-top", "60px");
            // $("#tag_sel").css("margin-top", "90px");
            // $("#add_tag_button").css("margin-top", "90px");
            // $("#tag_place").css("margin-left", '-65px');
            // $("#tagFrom").css("margin-left", '235px');
            // $("#selTag").css("margin-left", '205px');
            // $("#tag_sel").css("margin-left", '-75px');
            $("#tag_place").css("margin-top", "30px");
            $("#selTag").css("margin-left", '200px');
            $("#add_tag_button").hide();
            $("#add_tag_button").show();
            $("#add_tag_button").hide();
            $("#add_tag_button").show();
            $("#add_tag_button").css("margin-left", '390px');
            $("#selTag").text("Enter Tag");
            $("#tagTo").text("Assign tag to this content:").append('<br/>');
            document.getElementById("catTo").style.display = "inline";
            $("#tagTo").hide();
            $("#dwnTo").hide();
            $("#upTo").hide();
            $("#tag_sel option").each(function () {
                $(this).remove();
            });
            document.getElementById("dwn_select_items_button").style.display = "inline";
            document.getElementById("tag_select_items_button").style.display = "inline";
            document.getElementById("tag_sel").style.display = "inline";
            document.getElementById("up_select_items_button").style.display = "inline";
            $("#dwn_select_items_button").hide();
            $("#tag_select_items_button").hide();
            $("#tag_sel").show();
            $("#add_tag_button").show();
            $("#selTag").show();
            $("#up_select_items_button").hide();
            $("#change_selection_div").hide();
            $("#dwnShow").hide();
            $("#catShow").hide();
            $("#tagShow").show();
            $("#upShow").hide();
            $("#up_place").hide();
            document.getElementById("dwn_place").style.display = "inline";
            document.getElementById("tag_place").style.display = "inline";
            $("#dwn_place").hide();
            $("#tag_place").show();
            document.getElementById("tag_from_group").innerHTML = '<span id="myId" style="text-decoration:underline;">Group</span>' + ': ' + global_from_place_name;
            //  $("#tag_place").css("margin-top", "40px");
            $("#tag_from_space").hide();
            $("#tag_from_group").show();
            $("#tag_from_project").hide();
            $("#add_tag").hide();
        } else {
            //$('#all_selected_items').css("margin-top", "80px");
            // $('#selected_items').css("margin-top", "80px");
            // $("#tagFrom").css("margin-top", "-30px");
            // $("#tag_from_project").css("margin-top", "10px");
            // $("#tag_place").css("margin-top", "40px");
            //$("#selTag").css("margin-top", parseInt($("#tag_place").css("margin-top")) + 35 + 'px');
            //$("#selTag").css("margin-top", "60px");
            //$("#tag_sel").css("margin-top", "90px");
            //$("#add_tag_button").css("margin-top", "90px");
            // $("#tag_place").css("margin-left", '-65px');
            //$("#tagFrom").css("margin-left", '235px');
            //  $("#selTag").css("margin-left", '205px');
            // $("#tag_sel").css("margin-left", '-75px');
            $("#tag_place").css("margin-top", "30px");
            $("#selTag").css("margin-left", '200px');
            $("#selTag").text("Enter Tag");
            $("#tagTo").text("Assign tag to this content:").append('<br/>');
            document.getElementById("tagTo").style.display = "inline";
            $("#catTo").hide();
            $("#tagTo").hide();
            $("#dwnTo").hide();
            $("#upTo").hide();
            $("#tag_sel option").each(function () {
                $(this).remove();
            });
            $("#add_tag").hide();
            document.getElementById("dwn_select_items_button").style.display = "inline";
            document.getElementById("tag_select_items_button").style.display = "inline";
            document.getElementById("tag_sel").style.display = "inline";
            document.getElementById("up_select_items_button").style.display = "inline";
            $("#dwn_select_items_button").hide();
            $("#tag_select_items_button").hide();
            $("#cat_sel").hide();
            $("#tag_sel").show();
            $("#add_tag_button").show();
            $("#selCat").hide();
            $("#selTag").show();
            $("#up_select_items_button").hide();
            $("#change_selection_div").hide();
            $("#dwnShow").hide();
            $("#catShow").hide();
            $("#tagShow").show();
            $("#upShow").hide();
            $("#up_place").hide();
            document.getElementById("dwn_place").style.display = "inline";
            document.getElementById("tag_place").style.display = "inline";
            $("#dwn_place").hide();
            $("#tag_place").show();
            document.getElementById("tag_from_project").innerHTML = '<span id="myId" style="text-decoration:underline;">Project</span>' + ': ' + global_from_place_name;
            //   $("#tag_place").css("margin-top", "40px");
            $("#tag_from_space").hide();
            $("#tag_from_group").hide();
            $("#tag_from_project").show();
        }
    });



}

function tagSel() {

    selected_cat = '';

    contentCheckedIndex = 0;
    contentUnCheckedIndex = 0;
    mainCheckedItems = new Array();
    mainUncheckItems = new Array();
    addId = new Array();
    catSelection = true;
    var str = '';
    if (document.getElementById("frame1") != null)
        document.getElementById("frame1").contentDocument.body.innerHTML = "<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";

    arrayIndex = 0;
    //put the selected category to further use
    selected_tag = $('#tag_sel').val();
    if (selected_tag == "val1") {
        $("#tag_select_items_button").hide();
        $("#tagTo").hide();
    } else {

        $('#selTag').text("Tag");
        // $("#selTag").css("margin-top", parseInt($("#tag_place").css("margin-top")) + 40 + 'px');
        $("#selTag").css("margin-left", '180px');
        $('#selTag').show();
        $("#tagTo").show();
        $("#tagTo").hide();
        //alert("fromRequestAction = "+fromRequestAction);
        if (fromRequestAction == 'fromGroupRequestAction') {
            $("#tagTo").css("margin-left", '235px');
            //$("#add_tag_button").css("margin-left", '390px');
        } else if (fromRequestAction == 'fromSpaceRequestAction') {
            $("#tagTo").css("margin-left", '235px');
            //$("#add_tag_button").css("margin-left", '390px');
        } else {
            $("#tagTo").css("margin-left", '235px');
            $("#add_tag_button").css("margin-left", '390px');
        }

        //$("#add_tag").css("margin-top", parseInt($("#selTag").css("margin-top")) + 20 + 'px');
        //$("#tagTo").css("margin-top", parseInt($("#add_tag").css("margin-top")) + 30 + 'px');
        //$("#tagTo").css("margin-left", parseInt($("#cmdu").css("margin-left")) - 20 + 'px');
        //$("#tag_select_items_button").css("margin-top", parseInt($("#tagTo").css("margin-top")) + 30 + 'px');
        $("#tagTo").text("Assign tag to this content:").append('<br/>');
        $("#tagTo").show();
        $("#tag_select_items_button").show();

        $("#add_tag_button").hide();

        $("#selTag").show();
        $("#cmdu").hide();

        $("#tag_sel").hide();
        document.getElementById("add_tag").innerHTML = $('#tag_sel').val();
        //$("#add_tag").css("margin-left", '250px');
        $("#add_tag").show();
        getDocs(space_url);
        getFiles(space_url);
        getDiscussions(space_url);
        getIdeas(space_url);
        getPolls(space_url);
        getBlogs(blog_url);
    }

}

function startUpdatingTags() {
    //alert("tag selectionn....");
    //alert("browserName = "+browserName);

    $("#tagFrom").css("margin-top", "-60px");
    $("#tagFrom").css("margin-left", "210px");
    $("#tag_from_space").css("margin-top", "-10px");
    $("#tag_from_group").css("margin-top", "-10px");
    $("#tag_from_project").css("margin-top", "-10px");
    $("#tag_from_space").css("margin-left", "170px");
    //$("#tag_from_group").css("margin-top", "-250px");
    // $("#tag_from_project").css("margin-top", "-250px");
    $("#selTag").show();
    $('#selTag').text("Selected Tag");
    $('#selTag').text("Selected Place");
    $("#selTag").css("margin-left", "190px");
    $("#selTag").css("margin-top", "10px");
    $("#add_tag").css("margin-top", "30px");
    $("#tagTo").css("margin-left", "250px");
    $("#add_tag").css("margin-left", "230px");
    $("#tagTo").css("margin-top", "70px");
    $("#selected_items_categories").css("margin-top", "90px");
    $("#tagTo").text("Updating Tags :");

    $("#selection_menu").hide();
    $("#stylized").show();
    $("#change_selection_div").show();
    $("#change_contents").hide();
    $("#start_copying_button").hide();
    //$("#refresh_app_button").show();
    //$("#refresh_app").show();

    $("#cmdu").show();
    $("#cmdu").text("Manage Tags");
    $("#src_place").hide();
    $("#start_copying_button").hide();
    $("#change_contents").hide();
    $("#button_div").hide();
    $("#tag_place").hide();
    $("#tag_sel").hide();
    //$("#selTag").hide();
    $("#tagTo").show();
    $("#tag_select_items_button").hide();



    $("#selected_items").hide();
    $("#selected_items_categories").show();
    $("#tag_from_space").hide();
    $("#tag_from_group").hide();
    $("#tag_from_project").hide();
    if ($("#tag_from_space").text() != 'Manage Tags in Space')
        $("#tag_from_space").show();
    else
        $("#tag_from_space").hide();
    if ($("#tag_from_group").text() != 'Manage Tags in Group')
        $("#tag_from_group").show();
    else
        $("#tag_from_group").hide();
    if ($("#tag_from_project").text() != 'Manage Tags in Project')
        $("#tag_from_project").show();
    else
        $("#tag_from_project").hide();

    if (browserName == "MSIE") {
        var ieSpan = '<span id="ieSpan" style="font-family:Tahoma;font-size:12px;font-color:#3778C7;"></span>';
        document.getElementById("selected_items_categories").innerHTML = ieSpan;
    } else {
        var iframe = '<iframe id="frame1"  style="width:650px;height:90px;margin-top:0px;font-family:Tahoma"></iframe>';
        document.getElementById("selected_items_categories").innerHTML = iframe;
        $("#cat_select_items_button").text("Updating Tags:");
    }

    if (browserName == "MSIE") {
        var finalurl = redirection_url + '/content';
        document.getElementById("ieSpan").innerHTML = 'The selected contents are being update with tag. The update contents will appear here in a short while: <a href=' + 'URL' + '>' + '' + ' - Contents</a>';
    } else {
        document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
        document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
        document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
        document.getElementById("frame1").contentDocument.body.innerHTML = "Updating tags is in Progress.<br>Please leave this window open until the updating process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + 'Updating content'.fontcolor("#3778C7") + "</span>";
    }
    for (var index = 0; index < mainCheckedItems.length; index++) {
        //	alert("checked items : "+mainCheckedItems[index]);
        //console.log("checked items : "+mainCheckedItems[index]);
    }

    for (var index = 0; index < mainUncheckItems.length; index++) {
        //alert("unchecked items : "+mainUncheckItems[index]);
        //console.log("unchecked items : "+mainUncheckItems[index]);
    }

    //alert("mainCheckedItems.length = "+mainCheckedItems.length);
    console.log("mainCheckedItems.length = " + mainCheckedItems.length);
    // alert("mainUncheckItems.length = "+mainUncheckItems.length);
    console.log("mainUncheckItems.length = " + mainUncheckItems.length);
    //***********************************
    filterCheckedUncheckTagUrl1();


    catIndex = 0;
    //updateTagsForNewContents1();
    //removeTagsForContents();
}

function filterCheckedUncheckTagUrl1() {

    // alert("Into filterCheckedUncheckTagUrl1");
    checkItemArrayUpdated = new Array();
    uncheckedItemArrayUpdated = new Array();
    checkedItemsArray = new Array();
    uncheckItemArray = new Array();
    errorReferenceCatArray = new Array();
    errorReferenceCatArray = new Array();
    referenceCatArrayIndex = 0;
    deReferenceCatArrayIndex = 0;

    var contentTypeCheckBoxIdArray = new Array();

    contentTypeCheckBoxIdArray[0] = '#filesTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[1] = '#docsTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[2] = '#ideaTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[3] = '#pollTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[4] = '#blogTable input[type=checkbox]';
    contentTypeCheckBoxIdArray[5] = '#discTable input[type=checkbox]';


    var checkedIndex = 0;
    var uncheckedIndex = 0;
    var val = [];
    for (index = 0; index < contentTypeCheckBoxIdArray.length; index++) {
        //$('#filesTable input[type=checkbox]').each(function(i){
        $(contentTypeCheckBoxIdArray[index]).each(function (i) {

            val[i] = $(this).val();
            // alert(contentTypeCheckBoxIdArray[index]);
            if (val[i] != 'on') {
                if ($(this).is(':checked')) {
                    //  alert("its true"+ "This "+$(this).val());
                    checkedItemsArray[checkedIndex] = $(this).val();
                    checkedIndex++;
                } else {
                    //    alert("its false"+ "This "+$(this).val());
                    uncheckItemArray[uncheckedIndex] = $(this).val();
                    uncheckedIndex++;
                }
            }


        });

    }

    for (var index = 0; index < checkedItemsArray.length; index++) {
        //alert("new checked items : "+checkedItemsArray[index]);
        console.log("new checked items : " + checkedItemsArray[index]);
    }
    for (var index = 0; index < uncheckItemArray.length; index++) {
        //alert("new unchecked items : "+uncheckedItemArrayUpdated[index]);
        console.log("new unchecked items : " + uncheckItemArray[index]);
    }

    //  alert("checkedItemsArray.length = "+checkedItemsArray.length);
    console.log("checkedItemsArray.length = " + checkedItemsArray.length);
    // alert("uncheckItemArray.length = "+uncheckItemArray.length);
    console.log("uncheckItemArray.length = " + uncheckItemArray.length);
    catIndex = 0;
    dotIndex = 0;
    //alert("mainCheckedItems.length = "+mainCheckedItems.length);
    console.log("mainCheckedItems.length = " + mainCheckedItems.length);
    //    alert("mainUncheckItems.length = "+mainUncheckItems.length);
    console.log("mainUncheckItems.length = " + mainUncheckItems.length);


    for (var index = 0; index < mainCheckedItems.length; index++) {
        console.log("checked items : " + mainCheckedItems[index]);
    }

    for (var index = 0; index < mainUncheckItems.length; index++) {
        console.log("unchecked items : " + mainUncheckItems[index]);
    }

    /*Filter the the list */
    var checkedIndex = 0;
    var uncheckedIndex = 0;
    for (var outerIndex = 0; outerIndex < checkedItemsArray.length; outerIndex++) {
        if (mainCheckedItems.length != 0) {
            for (var innerIndex = 0; innerIndex < mainCheckedItems.length; innerIndex++) {
                //alert("checkedItemsArray[outerIndex] = mainCheckedItems[innerIndex] :" +checkedItemsArray[outerIndex] == mainCheckedItems[innerIndex]);
                //alert("checkedItemsArray[outerIndex] = mainCheckedItems[innerIndex] :" +checkedItemsArray[outerIndex] == mainCheckedItems[innerIndex]);
                if (checkedItemsArray[outerIndex] == mainCheckedItems[innerIndex]) {
                    break;
                } else {
                    if (innerIndex == (mainCheckedItems.length - 1)) {
                        checkItemArrayUpdated[checkedIndex] = checkedItemsArray[outerIndex];
                        checkedIndex++;
                    }

                }
            }
        } else {
            checkItemArrayUpdated[checkedIndex] = checkedItemsArray[outerIndex];
            checkedIndex++;
        }
    }



    for (var outerIndex = 0; outerIndex < uncheckItemArray.length; outerIndex++) {
        if (mainUncheckItems.length != 0) {
            for (var innerIndex = 0; innerIndex < mainUncheckItems.length; innerIndex++) {
                //alert("checkedItemsArray[outerIndex] = mainCheckedItems[innerIndex] :" +checkedItemsArray[outerIndex] == mainCheckedItems[innerIndex]);
                if (uncheckItemArray[outerIndex] == mainUncheckItems[innerIndex]) {
                    break;
                } else {
                    if (innerIndex == (mainUncheckItems.length - 1)) {
                        uncheckedItemArrayUpdated[uncheckedIndex] = uncheckItemArray[outerIndex];
                        uncheckedIndex++;
                    }

                }
            }
        } else {
            uncheckedItemArrayUpdated[uncheckedIndex] = uncheckItemArray[outerIndex];
            uncheckedIndex++;
        }
    }

    //alert("checkItemArrayUpdated.length = "+checkItemArrayUpdated.length);
    console.log("checkItemArrayUpdated.length = " + checkItemArrayUpdated.length);
    //alert("uncheckedItemArrayUpdated.length = "+uncheckedItemArrayUpdated.length);
    console.log("uncheckedItemArrayUpdated.length = " + uncheckedItemArrayUpdated.length);


    for (var index = 0; index < checkItemArrayUpdated.length; index++) {
        //alert("new checked items : "+checkItemArrayUpdated[index]);
        console.log("new checked update items : " + checkItemArrayUpdated[index]);
    }
    for (var index = 0; index < uncheckedItemArrayUpdated.length; index++) {
        //alert("new unchecked items : "+uncheckedItemArrayUpdated[index]);
        console.log("new unchecked update items : " + uncheckedItemArrayUpdated[index]);
    }
    updateTagsForNewContents1();

}

function updateTagsForNewContents1() {
    //alert("Into the updateCategories for new contents");
    console.log("Into the updateTagsForNewContents1 for new contents");
    for (var index = 0; index < checkedItemsArray.length; index++) {
        //alert("new checked items : "+checkedItemsArray[index]);
        //console.log("new checked items : "+checkedItemsArray[index]);
    }
    for (var index = 0; index < uncheckedItemArrayUpdated.length; index++) {
        //alert("new unchecked items : "+uncheckedItemArrayUpdated[index]);
        //	console.log("new unchecked items : "+uncheckedItemArrayUpdated[index]);
    }

    //alert("checkItemArrayUpdated.length = "+uncheckItemArray.length+" catIndex ="+catIndex);
    //console.log("checkItemArrayUpdated.length = "+uncheckItemArray.length+" catIndex="+catIndex);

    if (catIndex < checkItemArrayUpdated.length) {

        var contentURL = checkItemArrayUpdated[catIndex];
        var toUpdateTags;
        var toTagsArray;
        var updatedTagList = new Array();
        var isTagExisting = false;

        //alert("contentURL got is ="+contentURL);
        console.log("contentURL got is =" + contentURL);
        //alert("catIndex = "+catIndex+"checkedItemsArray length ="+checkedItemsArray.length);
        //alert("contentURL="+contentURL);

        if (contentURL != 'undefined') {
            osapi.jive.corev3.contents.get({
                fields: '@all',
                uri: contentURL
            }).execute(function (contentCatResponseObj) {
                //alert(JSON.stringify(contentCatResponseObj));
                //console.log(JSON.stringify(contentCatResponseObj));

                //console.log(contentCatResponseObj.tags);
                //alert("selected_cat = "+selected_cat);
                toUpdateTags = contentCatResponseObj.tags;
                var str = 'Applying tag ' + selected_cat + ' to ' + contentCatResponseObj.type + '';
                for (index = 0; index < dotIndex; index++)
                    str = str + '.';
                dotIndex++;
                if (dotIndex == 4) dotIndex = 0;
                document.getElementById("frame1").contentDocument.body.innerHTML = "Applying tags in Progress.<br>Please leave this window open until the updating process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";

                var tempIndex = 0;
                for (var index = 0; index < toUpdateTags.length; index++, tempIndex++) {
                    //alert("---cc-"+toUpdateTags[index]);
                    //console.log("---cc-"+toUpdateTags[index]);
                    updatedTagList[tempIndex] = toUpdateTags[index];
                    if (toUpdateTags[index] == selected_tag) {
                        isTagExisting = true;
                    }


                }
                //	alert("isTagExisting = "+isTagExisting);
                if (!isTagExisting) {
                    updatedTagList[tempIndex] = selected_tag;
                    isTagExisting = false;
                }

                for (var index = 0; index < updatedTagList.length; index++, tempIndex++) {
                    //console.log("VVVV-- "+updatedTagList[index]);
                }

                //console.log("toUpdateTags = "+toUpdateTags);
                var title = contentCatResponseObj.subject;
                title = title.replace('&amp;', '&');
                title = title.replace('&lt;', '<');
                title = title.replace('&gt;', '>');
                contentCatResponseObj.subject = title;
                contentCatResponseObj.tags = updatedTagList;

                contentCatResponseObj.update().execute(function (catUpdateResponse) {

                    //console.log("updated --"+JSON.stringify(catUpdateResponse));

                    if (catUpdateResponse.error) {
                        errorReferenceCatArray[referenceCatArrayIndex] = contentCatResponseObj.resources.html.ref;
                        referenceCatArrayIndex++;

                    }


                });
                catIndex++;
                updateTagsForNewContents1();

            });
        }

    } else {
        catIndex = 0;
        dotIndex = 0;
        removeTagsForContents();
    }

}

function removeTagsForContents() {


    if (catIndex < uncheckedItemArrayUpdated.length) {

        var contentURL = uncheckedItemArrayUpdated[catIndex];
        var toUpdateTags;
        var toTagsArray;
        var updatedCategoryList = new Array();
        //alert("catIndex = "+catIndex+"uncheckItemArray length ="+uncheckItemArray.length);
        //alert("contentURL got is ="+contentURL);
        console.log("contentURL got is =" + contentURL);
        osapi.jive.corev3.contents.get({
            fields: '@all',
            uri: contentURL
        }).execute(function (contentCatResponseObj) {
            //alert(JSON.stringify(contentCatResponseObj));
            console.log(JSON.stringify(contentCatResponseObj));

            //alert(contentCatResponseObj.categories);
            //alert("selected_cat = "+selected_cat);
            var str = 'Removing tag ' + selected_cat + ' from ' + contentCatResponseObj.type + '';
            for (index = 0; index < dotIndex; index++)
                str = str + '.';
            dotIndex++;
            if (dotIndex == 4) dotIndex = 0;
            document.getElementById("frame1").contentDocument.body.innerHTML = "Removing tags in Progress.<br>Please leave this window open until the updating process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";

            var title = contentCatResponseObj.subject;
            title = title.replace('&amp;', '&');
            title = title.replace('&lt;', '<');
            title = title.replace('&gt;', '>');
            contentCatResponseObj.subject = title;
            toUpdateTags = contentCatResponseObj.tags;
            //toUpdateTags = toUpdateTags+','+selected_cat;
            //toUpdateTags = ["cat1","cat2","cat3"];
            //toTagsArray = toUpdateTags.split(",");
            var tempIndex = 0;
            for (var index = 0; index < toUpdateTags.length; index++) {
                if (selected_tag != toUpdateTags[index]) {
                    //	alert("---cc-"+toUpdateTags[index]);
                    console.log("---cc-" + toUpdateTags[index]);
                    updatedCategoryList[tempIndex] = toUpdateTags[index];
                    tempIndex++;
                }
            }

            //toUpdateTags = selected_cat;
            //alert("toUpdateTags = "+toUpdateTags);
            console.log("toUpdateTags = " + toUpdateTags);
            //contentCatResponseObj.categories = toUpdateTags;
            contentCatResponseObj.tags = updatedCategoryList;
            contentCatResponseObj.update().execute(function (catUpdateResponse) {
                //alert(JSON.stringify(catUpdateResponse));
                console.log("UPDated -- " + JSON.stringify(catUpdateResponse));
            });
            catIndex++;
            removeTagsForContents();

        });

    } else {
        for (var index = 0; index < errorReferenceCatArray.length; index++) {
            console.log("Could Not Reference " + errorReferenceCatArray[index]);
        }

        for (var index = 0; index < errorDeReferenceCatArray.length; index++) {
            console.log("Could Not De-Reference " + errorDeReferenceCatArray[index]);
        }
        if (errorReferenceCatArray.length > 0 || errorDeReferenceCatArray.length > 0) {
            alert('Message:\n\nYou have insufficient rights to update all the content selected.\n\nYou need to have group administration or space moderation rights to update content with restricted authorship (e.g. discussions started by other users).\n\nPlease contact your group or space admin to get the necessary rights.');
            $("#refresh_app_button").show();
            $("#refresh_app").show();

        } else {
            //alert("inside else ");
            $("#refresh_app_button").show();
            $("#refresh_app").show();


            /// $('#selTag').css("margin-top", "-200px");
            // $('#selTag').css("margin-left", "200px");
            //  $("#selTag").show();
            // $('#tag_sel').css("margin-top", "-190px");
            // $('#tag_sel').css("margin-left", "250px");
            //$("#tag_sel").show();
            // $('#add_tag_button').css("margin-top", "-190px");
            // $('#add_tag_button').css("margin-left", "390px");
            // $("#add_tag_button").show();

            for (var index = 0; index < errorReferenceCatArray.length; index++) {
                console.log("Could Not Reference " + errorReferenceCatArray[index]);
            }

            for (var index = 0; index < errorDeReferenceCatArray.length; index++) {
                console.log("Could Not De-Reference " + errorDeReferenceCatArray[index]);
            }
            console.log("tag " + selected_cat + " succesfully updated");
            //alert("Category "+selected_cat+" succesfully updated");
            var tempRedirectionUrl = source_html_url + '/content?filterID=contentstatus[published]~tag[' + selected_tag + ']';

            console.log("temRedirectionUrl = " + tempRedirectionUrl);
            /*$("#stylized").fadeOut(5000,function(){
		window.location = window.location = tempRedirectionUrl;
			});*/

            /*document.getElementById("frame1").contentDocument.body.innerHTML = "Updating is in Progress.<br>Please leave this window open until the updating process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+"'Moving completed. Please click   <a href='+tempRedirectionUrl+'>here </a>  for the new location of your content.'.fontcolor("#3778C7")+"</span>";*/
            var str = 'Updating tags is completed. Please click   <a href=' + tempRedirectionUrl + '>here </a>  for the new location of your content.';
            document.getElementById("frame1").contentDocument.body.innerHTML = "Note.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";
        }


    }



}
