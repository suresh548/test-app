var globalAction='';
var targetUrl='';
var dest_space_name='';
var redirection_url='';
var source_html_url='';
var src_space_name='';
var to_place_blog_url='';
var global_blog_place_url='';

var CONTENT_TYPE_DICUSSION = 'discussion';
var CONTENT_TYPE_BLOG = 'post';
var CONTENT_TYPE_POLLS = 'poll';
var CONTENT_TYPE_FILES = 'file';
var CONTENT_TYPE_DOCUMENT = 'document';
var CONTENT_TYPE_IDEA = 'idea';
var noOfFile= 0;
var noOfFileExecuted=0;
var noOfFileFailed = 0;

function movendelete(action,srcgroup_place_url,target_groupurl,Grp_file_json,Grp_doc_json,Grp_disc_json,Grp_idea_json,Grp_poll_json,Grp_blog_json,dest_space_name1,redirection_url1,source_html_url1,src_space_name1,to_place_blog_url1) {
globalAction = action;

dest_space_name=dest_space_name1;
redirection_url=redirection_url1;
source_html_url=source_html_url1;
src_space_name=src_space_name1;


var	discussionSplitValue = Grp_disc_json.split(";");
var fileSplitValue = Grp_file_json.split(";");			
var documetSplitValue = Grp_doc_json.split(";");
var blogSplitValue = Grp_blog_json.split(";");
var ideaSplitValue = Grp_idea_json.split(";");
var pollSplitValue = Grp_poll_json.split(";");
 noOfFile= 0;
 noOfFileExecuted=0;
 noOfFileFailed = 0;





//For calculating the number of files.
for (var i = 0; i <discussionSplitValue.length; i++) {
	if(discussionSplitValue[i] != ''){
	noOfFile = noOfFile + 1;
	}
}
for (var i = 0; i <fileSplitValue.length; i++) {
if(fileSplitValue[i] != ''){
	noOfFile = noOfFile + 1;
	}
}
for (var i = 0; i <documetSplitValue.length; i++) {
if(documetSplitValue[i] != ''){
	noOfFile = noOfFile + 1;
	}
}
for (var i = 0; i <pollSplitValue.length; i++) {
if(pollSplitValue[i] != ''){
	noOfFile = noOfFile + 1;
	}
}
for (var i = 0; i <ideaSplitValue.length; i++) {
if(ideaSplitValue[i] != ''){
	noOfFile = noOfFile + 1;
	}
}
for (var i = 0; i <blogSplitValue.length; i++) {
if(blogSplitValue[i] != ''){
	noOfFile = noOfFile + 1;
	}
}
alert("noOfFile = "+noOfFile);
			

var templateSpace='';
$("#start_copying_button").hide();
$("#change_contents").hide();
$("#button_div").hide();
var iframe = '<iframe id="frame1" src = "" style="width:650px;height:90px;margin-top:0px;font-family:Tahoma"></iframe>';
document.getElementById("selected_items").innerHTML=iframe;  
$("#copyTo").text("Moving this:");

if(discussionSplitValue.length > 1) {
var str='';
var str2='';
targetUrl = target_groupurl;
//alert("disc targetUrl: "+targetUrl);
if(globalAction == 'move')
{
str='Moving ';
str2='Moving discussions';
}
if(globalAction == 'delete')
{
str='Deleting ';
str2='Deleting discussions';
}
for (var i = 0; i <discussionSplitValue.length; i++) {
document.getElementById("frame1").contentDocument.body.style.fontFamily="Tahoma";	
document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
document.getElementById("frame1").contentDocument.body.style.color='Grey';
document.getElementById("frame1").contentDocument.body.innerHTML = str+"in Progress.<br>Please leave this window open until the "+str+"process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str2.fontcolor("#3778C7")+"</span>";
templateSpace = discussionSplitValue[i];
//alert("discussionSplitValue[i]: "+discussionSplitValue[i]);
if(discussionSplitValue[i] != ''){
getContent(discussionSplitValue[i],target_groupurl,CONTENT_TYPE_DICUSSION);
}
}
}

if(fileSplitValue.length > 1) {
var str='';
var str2='';
targetUrl = target_groupurl;
//alert("file targetUrl: "+targetUrl);
if(globalAction == 'move')
{
str='Moving ';
str2='Moving files';
}
if(globalAction == 'delete')
{
str='Deleting ';
str2='Deleting files';
}

for (var i = 0; i <fileSplitValue.length; i++) {
document.getElementById("frame1").contentDocument.body.style.fontFamily="Tahoma";	
document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
document.getElementById("frame1").contentDocument.body.style.color='Grey';
document.getElementById("frame1").contentDocument.body.innerHTML = str+"in Progress.<br>Please leave this window open until the "+str+"process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str2.fontcolor("#3778C7")+"</span>";
templateSpace = fileSplitValue[i];
//alert("fileSplitValue[i]: "+fileSplitValue[i]);
if(fileSplitValue[i] != ''){
getContent(fileSplitValue[i],target_groupurl,CONTENT_TYPE_FILES);
}
}
}

if(documetSplitValue.length > 1) {
var str='';
var str2='';
targetUrl = target_groupurl;
//alert("doc targetUrl: "+targetUrl);
if(globalAction == 'move')
{
str='Moving ';
str2='Moving documents';
}
if(globalAction == 'delete')
{
str='Deleting ';
str2='Deleting documents';
}

for (var i = 0; i <documetSplitValue.length; i++) {
document.getElementById("frame1").contentDocument.body.style.fontFamily="Tahoma";	
document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
document.getElementById("frame1").contentDocument.body.style.color='Grey';
document.getElementById("frame1").contentDocument.body.innerHTML = str+"in Progress.<br>Please leave this window open until the "+str+"process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str2.fontcolor("#3778C7")+"</span>";

templateSpace = documetSplitValue[i];
//alert("documetSplitValue[i]: "+documetSplitValue[i]);
if(documetSplitValue[i] != ''){
getContent(documetSplitValue[i],target_groupurl,CONTENT_TYPE_DOCUMENT);
}
}
}

if(pollSplitValue.length > 1) {
var str='';
var str2='';
targetUrl = target_groupurl;
//alert("poll targetUrl: "+target_groupurl);
if(globalAction == 'move')
{
str='Moving ';
str2='Moving polls';
}
if(globalAction == 'delete')
{
str='Deleting ';
str2='Deleting polls';
}

for (var i = 0; i <pollSplitValue.length; i++) {
document.getElementById("frame1").contentDocument.body.style.fontFamily="Tahoma";	
document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
document.getElementById("frame1").contentDocument.body.style.color='Grey';
document.getElementById("frame1").contentDocument.body.innerHTML = str+"in Progress.<br>Please leave this window open until the "+str+"process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str2.fontcolor("#3778C7")+"</span>";

templateSpace = pollSplitValue[i];
//alert("pollSplitValue[i]: "+pollSplitValue[i]);
if(pollSplitValue[i] != ''){
getContent(pollSplitValue[i],target_groupurl,CONTENT_TYPE_POLLS);
}
}
}

if(ideaSplitValue.length > 1) {
var str='';
var str2='';
targetUrl = target_groupurl;
//alert("idea targetUrl: "+target_groupurl);
if(globalAction == 'move')
{
str='Moving ';
str2='Moving ideas';
}
if(globalAction == 'delete')
{
str='Deleting ';
str2='Deleting ideas';
}

for (var i = 0; i <ideaSplitValue.length; i++) {
document.getElementById("frame1").contentDocument.body.style.fontFamily="Tahoma";	
document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
document.getElementById("frame1").contentDocument.body.style.color='Grey';
document.getElementById("frame1").contentDocument.body.innerHTML = str+"in Progress.<br>Please leave this window open until the "+str+"process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str2.fontcolor("#3778C7")+"</span>";	

templateSpace = ideaSplitValue[i];
//alert("ideaSplitValue[i]: "+ideaSplitValue[i]);
if(ideaSplitValue[i] != ''){
getContent(ideaSplitValue[i],target_groupurl,CONTENT_TYPE_IDEA);
}
}
}

if(blogSplitValue.length > 1) {
var str='';
var str2='';
global_blog_place_url=to_place_blog_url1;
//alert("blog targetUrl: "+global_blog_place_url);
if(globalAction == 'move')
{
str='Moving ';
str2='Moving blogs';
}
if(globalAction == 'delete')
{
str='Deleting ';
str2='Deleting blogs';
}

for (var i = 0; i <blogSplitValue.length; i++) {
document.getElementById("frame1").contentDocument.body.style.fontFamily="Tahoma";	
document.getElementById("frame1").contentDocument.body.style.fontSize = "12px";
document.getElementById("frame1").contentDocument.body.style.color='Grey';
document.getElementById("frame1").contentDocument.body.innerHTML = str+"in Progress.<br>Please leave this window open until the "+str+"process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str2.fontcolor("#3778C7")+"</span>";	

templateSpace = blogSplitValue[i];
//alert("blogSplitValue[i]: "+blogSplitValue[i]);
if(blogSplitValue[i] != ''){
console.log("FROM HTML :"+blogSplitValue[i]);
getContent(blogSplitValue[i],to_place_blog_url1,CONTENT_TYPE_BLOG);
}
}
}
}

function getContent(source,target_groupurl,contentType) {




if(CONTENT_TYPE_BLOG == contentType && (source != 'null' || source != '')){
console.log("Get Content ::"+source+" contentType ::"+ contentType);
	osapi.jive.corev3.contents.get({
	type : contentType,
	fields: '@all',
	uri: source
	}).execute(onContentFetchForBlog);
	}
	else {
	
	osapi.jive.corev3.contents.get({
	type : contentType,
	fields: '@all',
	uri: source
	}).execute(onContentFetch);
	
	}


}

function onContentFetch(response) {
if (response.error) {
console.log("json "+JSON.stringify(response));
return;
}


console.log("json "+JSON.stringify(response));
//alert("json "+JSON.stringify(response));
var postDisc;

if(globalAction == 'move'){
//response.parent=targetUrl;
response.parent=targetUrl;
console.log("move targetUrl: "+targetUrl);
response.update().execute(updateResponse);
var str='Moving completed. You will now be redirected to "'+dest_space_name+'"';
document.getElementById("frame1").contentDocument.body.innerHTML = "Moving in Progress.<br>Please leave this window open until the moving process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str.fontcolor("#3778C7")+"</span>";
//$("#stylized").fadeOut(5000,function(){
//window.location = redirection_url+'/content';         

//});

}
else if (globalAction == 'delete'){
response.destroy().execute();
var str='Deleting completed. You will now be redirected to "'+src_space_name+'"';
document.getElementById("frame1").contentDocument.body.innerHTML = "Deleting in Progress.<br>Please leave this window open until the deleting process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str.fontcolor("#3778C7")+"</span>";
$("#stylized").fadeOut(5000,function(){
window.location = source_html_url+'/content';
});
}

}



function onContentFetchForBlog(response) {
if (response.error) {
console.log("json "+JSON.stringify(response));
return;
}


console.log("BLOG ^^^^ json "+JSON.stringify(response));
//alert("blog json "+JSON.stringify(response));
var postDisc;

if(globalAction == 'move'){
//response.parent=targetUrl;
response.parent=global_blog_place_url;
//alert("move targetUrl: "+global_blog_place_url);
response.update().execute(updateResponse);
var str='Moving completed. You will now be redirected to "'+dest_space_name+'"';
document.getElementById("frame1").contentDocument.body.innerHTML = "Moving in Progress.<br>Please leave this window open until the moving process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str.fontcolor("#3778C7")+"</span>";
//$("#stylized").fadeOut(5000,function(){
//window.location = redirection_url+'/content';         

//});

}
else if (globalAction == 'delete'){
response.destroy().execute();
var str='Deleting completed. You will now be redirected to "'+src_space_name+'"';
document.getElementById("frame1").contentDocument.body.innerHTML = "Deleting in Progress.<br>Please leave this window open until the deleting process has been completed.<br><br><span id='mySpan' style='font-weight:bold;'>"+str.fontcolor("#3778C7")+"</span>";
$("#stylized").fadeOut(5000,function(){
window.location = source_html_url+'/content';
});
}

}

function updateResponse(response) {
if (response.error) {
console.log("jsonError "+JSON.stringify(response));
noOfFileFailed = noOfFileFailed + 1;
return;
}

console.log("Update res json "+JSON.stringify(response));
console.log("noOfFileExecuted = "+noOfFileExecuted);
noOfFileExecuted = noOfFileExecuted + 1;
if(noOfFileExecuted == (noOfFile-1)) {
	console.log("noOfFileExecuted = "+noOfFileExecuted);
	/*$("#stylized").fadeOut(5000,function(){
	window.location = redirection_url+'/content';         

});*/
} 
}

updateResponseBlog

function updateResponseBlog(response) {
if (response.error) {
console.log("jsonError "+JSON.stringify(response));
return;
}

console.log("Update blog res json "+JSON.stringify(response));

}
