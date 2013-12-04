var globalAction = '';
var targetUrl = '';
var dest_space_name = '';
var redirection_url = '';
var source_html_url = '';
var src_space_name = '';
var to_place_blog_url = '';
var global_blog_place_url = '';
var browserName = '';
var finalurl = '';

var CONTENT_TYPE_DICUSSION = 'discussion';
var CONTENT_TYPE_BLOG = 'post';
var CONTENT_TYPE_POLLS = 'poll';
var CONTENT_TYPE_FILES = 'file';
var CONTENT_TYPE_DOCUMENT = 'document';
var CONTENT_TYPE_IDEA = 'idea';

var noOfFile = 0;
var noOfFileExecuted = 0;
var noOfFileFailed = 0;
var movendeleteIndex = 0;
var totalContentSelfUrlArray = new Array();
var errorArray = new Array();
var errorIndex = 0;

function movendelete(action, srcgroup_place_url, target_groupurl, Grp_file_json, Grp_doc_json, Grp_disc_json, Grp_idea_json, Grp_poll_json, Grp_blog_json, dest_space_name1, redirection_url1, source_html_url1, src_space_name1, to_place_blog_url1, browserName1) {
    globalAction = action;

    dest_space_name = dest_space_name1;
    redirection_url = redirection_url1;
    source_html_url = source_html_url1;
    src_space_name = src_space_name1;
    to_place_blog_url = to_place_blog_url1;
    browserName = browserName1;
    alert("redirection_url = " + redirection_url);
    finalurl = redirection_url + '/content';

    var discussionSplitValue = Grp_disc_json.split(";");
    var fileSplitValue = Grp_file_json.split(";");
    var documetSplitValue = Grp_doc_json.split(";");
    var blogSplitValue = Grp_blog_json.split(";");
    var ideaSplitValue = Grp_idea_json.split(";");
    var pollSplitValue = Grp_poll_json.split(";");

    totalContentSelfUrlArray = new Array();
    errorArray = new Array();
    errorIndex = 0;

    noOfFile = 0;
    noOfFileExecuted = 0;
    noOfFileFailed = 0;

    //For calculating the number of files.
    for (var i = 0; i < discussionSplitValue.length; i++) {
        if (discussionSplitValue[i] != '') {
            totalContentSelfUrlArray[noOfFile] = discussionSplitValue[i];
            noOfFile = noOfFile + 1;
        }
    }
    for (var i = 0; i < fileSplitValue.length; i++) {
        if (fileSplitValue[i] != '') {
            totalContentSelfUrlArray[noOfFile] = fileSplitValue[i];
            noOfFile = noOfFile + 1;
        }
    }
    for (var i = 0; i < documetSplitValue.length; i++) {
        if (documetSplitValue[i] != '') {
            totalContentSelfUrlArray[noOfFile] = documetSplitValue[i];
            noOfFile = noOfFile + 1;
        }
    }
    for (var i = 0; i < pollSplitValue.length; i++) {
        if (pollSplitValue[i] != '') {
            totalContentSelfUrlArray[noOfFile] = pollSplitValue[i];
            noOfFile = noOfFile + 1;
        }
    }
    for (var i = 0; i < ideaSplitValue.length; i++) {
        if (ideaSplitValue[i] != '') {
            totalContentSelfUrlArray[noOfFile] = ideaSplitValue[i];
            noOfFile = noOfFile + 1;
        }
    }
    for (var i = 0; i < blogSplitValue.length; i++) {
        if (blogSplitValue[i] != '') {
            totalContentSelfUrlArray[noOfFile] = blogSplitValue[i];
            noOfFile = noOfFile + 1;
        }
    }
    //alert("noOfFile = "+noOfFile);

    var templateSpace = '';

    $("#start_copying_button").hide();
    $("#change_contents").hide();
    $("#button_div").hide();

    if (browserName == "MSIE" && globalAction == 'move') {
        var ieSpan = '<span id="ieSpan" style="font-family:Tahoma;font-size:12px;font-color:#3778C7;"></span>';
        document.getElementById("selected_items").innerHTML = ieSpan;
    } else if (browserName == "MSIE" && globalAction == 'delete') {
        var ieSpan = '<span id="ieSpan" style="font-family:Tahoma;font-size:12px;font-color:#3778C7;"></span>';
        document.getElementById("selected_items").innerHTML = ieSpan;
    } else {
        var iframe = '<iframe id="frame1" src = "javascript:"&nbsp;" style="width:650px;height:90px;margin-top:0px;font-family:Tahoma"></iframe>';
        document.getElementById("selected_items").innerHTML = iframe;
        $("#copyTo").text("Moving this:");
    }


    var str = '';
    var str2 = '';

    if (globalAction == 'move') {
        str = 'Moving ';
        str2 = 'Intializing Moving';
    }
    if (globalAction == 'delete') {
        str = 'Deleting ';
        str2 = 'Intializing Deleting';
    }

    if (browserName == "MSIE" && globalAction == 'move') {
        finalurl = redirection_url + '/content';
        document.getElementById("ieSpan").innerHTML = 'The selected contents are being moved. The moved contents will appear here in a short while: <a href=' + finalurl + '>' + dest_space_name + ' - Contents</a>';
    } else if (browserName == "MSIE" && globalAction == 'delete') {
        finalurl = source_html_url + '/content';
        document.getElementById("ieSpan").innerHTML = 'The selected contents have been deleted. This can be verified here: <a href=' + finalurl + '>' + src_space_name + ' - Contents</a>';
    } else {
        document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
        document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
        document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
        document.getElementById("frame1").contentDocument.body.innerHTML = str + "in Progress.<br>Please leave this window open until the " + str + "process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str2.fontcolor("#3778C7") + "</span>";
    }
    alert("to_place_blog_url = " + to_place_blog_url);
    targetUrl = target_groupurl;
    movendeleteIndex = 0;

    if (globalAction == 'move') {
        movenContents();
    } else {
        deleteContents()
    }


}



function movenContents() {
    if (movendeleteIndex < totalContentSelfUrlArray.length) {

        var contentURL = totalContentSelfUrlArray[movendeleteIndex];
        var toUpdateCategories;
        var toCategoriesArray;
        var updatedCategoryList = new Array();

        //alert("contentURL got is ="+contentURL);
        console.log("contentURL got is =" + contentURL);
        osapi.jive.corev3.contents.get({
            fields: '@all',
            uri: contentURL
        }).execute(function (contentMoveResponseObj) {
            //alert(JSON.stringify(contentMoveResponseObj));
            console.log(JSON.stringify(contentMoveResponseObj));

            var str2 = 'Moving ' + contentMoveResponseObj.type + '';
            for (index = 0; index < dotIndex; index++)
                str2 = str2 + '.';
            dotIndex++;
            if (dotIndex == 4) dotIndex = 0;
            if (browserName == "MSIE") {

                document.getElementById("ieSpan").innerHTML = 'The selected contents are being moved. The moved contents will appear here in a short while: <a href=' + finalurl + '>' + dest_space_name + ' - Contents</a>';
            } else {
                document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
                document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
                document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
                document.getElementById("frame1").contentDocument.body.innerHTML = "Moving in Progress.<br>Please leave this window open until the moving process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str2.fontcolor("#3778C7") + "</span>";
            }

            var title = contentMoveResponseObj.subject;
            title = title.replace('&amp;', '&');
            title = title.replace('&lt;', '<');
            title = title.replace('&gt;', '>');
            contentMoveResponseObj.subject = title;
            contentMoveResponseObj.categories = updatedCategoryList;
            if (contentMoveResponseObj.type == "post") {
                contentMoveResponseObj.parent = to_place_blog_url;
            } else {
                contentMoveResponseObj.parent = targetUrl;
            }
            contentMoveResponseObj.update().execute(function (contentUpdateResponse) {
                //alert(JSON.stringify(contentUpdateResponse));
                console.log("UPDated -- " + JSON.stringify(contentUpdateResponse));
                if (contentUpdateResponse.error) {
                    console.log("updated --" + JSON.stringify(contentUpdateResponse));
                    console.log("errorArray.length --" + errorArray.length);

                    errorArray[errorIndex] = contentMoveResponseObj.resources.html.ref;
                    errorIndex++;

                }
            });
            movendeleteIndex++;
            movenContents();

        });

    } else {
        for (var index = 0; index < errorArray.length; index++) {
            console.log("Could not Move : " + errorArray[index]);
        }
        if (errorArray.length > 0) {
            alert('Message:\n\nYou have insufficient rights to update all the content selected.\n\nYou need to have group administration or space moderation rights to update content with restricted authorship (e.g. discussions started by other users).\n\nPlease contact your group or space admin to get the necessary rights.');
           /* $("#from_place").show();
            $("#to_place").show();
            $("#cmdu").hide();
            $("#button_div").show();
            $("#src_place").show();
            $('#selected_items').css("margin-top", "-105px");
            $('#button_div').css("margin-top", "10px");
            $("#select_items_button").show();*/
        } else {

            console.log("contents  succesfully moved");
            //alert("contents  succesfully moved");
            console.log("contents  succesfully moved");
            /*$("#from_place").show();
            $("#to_place").show();
            $("#cmdu").hide();
            $("#button_div").show();
            $("#src_place").show();
            $('#selected_items').css("margin-top", "-105px");
            $('#button_div').css("margin-top", "10px");
            $("#select_items_button").show();*/
            var str = 'Moving completed. Please click   <a href=' + finalurl + '>here </a>  for the new location of your content.';
            document.getElementById("frame1").contentDocument.body.innerHTML = "Note.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";

        }
    }
}

function deleteContents() {
    alert("Method :" + deleteContents);
    if (movendeleteIndex < totalContentSelfUrlArray.length) {

        var contentURL = totalContentSelfUrlArray[movendeleteIndex];
        var toUpdateCategories;
        var toCategoriesArray;
        var updatedCategoryList = new Array();

        alert("contentURL got is =" + contentURL);
        console.log("contentURL got is =" + contentURL);
        osapi.jive.corev3.contents.get({
            fields: '@all',
            uri: contentURL
        }).execute(function (contentDeleteResponseObj) {
            //alert(JSON.stringify(contentMoveResponseObj));
            console.log(JSON.stringify(contentDeleteResponseObj));

            var str2 = 'Deleting ' + contentDeleteResponseObj.type + '';
            for (index = 0; index < dotIndex; index++)
                str2 = str2 + '.';
            dotIndex++;
            if (dotIndex == 4) dotIndex = 0;
            if (browserName == "MSIE") {

                document.getElementById("ieSpan").innerHTML = 'The selected contents have been deleted. This can be verified here: <a href=' + finalurl + '>' + src_space_name + ' - Contents</a>';
            } else {
                document.getElementById("frame1").contentDocument.body.style.fontFamily = "Tahoma";
                document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
                document.getElementById("frame1").contentDocument.body.style.color = 'Grey';
                document.getElementById("frame1").contentDocument.body.innerHTML = "Deleting in Progress.<br>Please leave this window open until the deleting process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>" + str2.fontcolor("#3778C7") + "</span>";
            }



            contentDeleteResponseObj.destroy().execute(function (contentUpdateResponse) {
                alert(JSON.stringify(contentUpdateResponse));
                console.log("UPDated -- " + JSON.stringify(contentUpdateResponse));
                if (contentUpdateResponse.error) {
                    console.log("updated --" + JSON.stringify(contentUpdateResponse));
                    console.log("errorArray.length --" + errorArray.length);

                    errorArray[errorIndex] = contentMoveResponseObj.resources.html.ref;
                    errorIndex++;

                }
            });
            movendeleteIndex++;
            deleteContents();

        });

    } else {
        for (var index = 0; index < errorArray.length; index++) {
            console.log("Could not Move : " + errorArray[index]);
        }
        if (errorArray.length > 0) {
            alert('Message:\n\nYou have insufficient rights to update all the content selected.\n\nYou need to have group administration or space moderation rights to update content with restricted authorship (e.g. discussions started by other users).\n\nPlease contact your group or space admin to get the necessary rights.');
            $("#cmdu").hide();
            /*$("#src_place").show();
            $('#del_place').css("margin-left", "250px");
            $('#del_select_items_button').css("margin-left", "250px");
            $("#del_place").show();
            $("#deleteTo").show();
            $("#del_select_items_button").show();*/
        } else {

            console.log("contents  succesfully deleted");
            alert("contents  succesfully deleted");
            alert('finalurl = ' + finalurl);
            console.log("contents  succesfully deleted");
           /* $("#cmdu").hide();
            $("#src_place").show();
            $('#del_place').css("margin-left", "250px");
            $('#del_select_items_button').css("margin-left", "250px");
            $("#del_place").show();
            $("#deleteTo").show();
            $("#del_select_items_button").show();*/
            //alert('finalurl = '+finalurl);
            var str = 'Deleting completed. This can be verified here: <a href=' + finalurl + '>' + src_space_name + ' - Contents</a>';
            document.getElementById("frame1").contentDocument.body.innerHTML = "Note.<br><br><span id='mySpan' style='font-weight:bold;'>" + str.fontcolor("#3778C7") + "</span>";

        }
    }
}