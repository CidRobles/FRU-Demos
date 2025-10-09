// NB: Note that jQuery is not guaranteed to be included BEFORE js-common.js.
//
// jQuery references in functions should be okay; but inline jQuery will not.


// this function creates a shadowbox-like effect in Scribe Admin
// the div to remain 'lit' is sent to this function
function dimmer(nodim)
{
	$('body').toggleClass('dimmed');
	$(nodim).toggleClass('no-dim');
}

function addListener(element, type, expression, bubbling)
{
	bubbling = bubbling || false;

	if(window.addEventListener)	{ // Standard
		element.addEventListener(type, expression, bubbling);
		return true;
	} else if(window.attachEvent) { // IE
		element.attachEvent('on' + type, expression);
		return true;
	} else return false;
}
// toggle collapsible menu items and store cookie
function toggleMenu(trigger, target, cookie) {
	$(trigger).toggleClass('hidden');
	$(target).toggle('blind', '', 800);
	toggleCookie(target, 'hide', 'show')
}
function toggleCookie(name, toggle1, toggle2) // toggle the state of a cookie using jquery cookie plugin
{
	name = name.replace(/[^a-zA-Z 0-9 -]+/g,''); // strip non alpha numeric characters
	//alert(name); return false;
	var cookie = $.cookie(name);
	if (cookie == null) {
		cookie = toggle1;
	} else if (cookie == toggle1) {
		cookie = toggle2;
	} else {
		cookie = toggle1;
	}
	$.cookie(name, cookie, { expires: 30 });
}


function toggle_it(itemID){
	var ids = itemID.split(",");

	for(i = 0; i < ids.length; i++) {
		// Toggle visibility between none and inline
	  	if ((document.getElementById(ids[i]).style.display == 'none'))
	  	{
			//document.getElementById(ids[i]).style.display = 'block'; <- stopped working 17/11/08 not sure why //
			document.getElementById(ids[i]).style.display = '';
			if (oddeven == 'odd') {
				document.getElementById(ids[i]).style.background = 'transparent';
				var oddeven = 'even';
			} else {
				document.getElementById(ids[i]).style.background = '#f9f4fa';
				var oddeven = 'odd';
			}
	  	} else {
			document.getElementById(ids[i]).style.display = 'none';
			document.getElementById(ids[i]).style.background = 'transparent';
	  	}
	}
}
function toggleDisplay(itemname)
{
	tmp = document.getElementsByTagName('div');
	for (i=0;i<tmp.length;i++)
	{
		 if (tmp[i].className == itemname) tmp[i].style.display = 'none';
	}
}

function toggleDisplay02(obj,fromclassname,toclassname) {
	var el = document.getElementById(obj);
	if ( el.className == fromclassname ) {
		el.className = toclassname;
	}
	else {
		el.className = fromclassname;
	}
}

function toggle_help_module() {
	$('#module-help').toggle('blind', '', 800);
/* below was used for old SPRY approach
	var ID = 'module-help';
	var el = document.getElementById(ID);
	var fromclassname = 'hide';
	if (el.className == 'hidden') {
		//MM_effectBlind(ID, 800, '0%', '100%', true);
		$('#'+ID).toggle('blind', '', 800);
		el.className = '';
	} else {
		if ( el.className == fromclassname ) {
		el.className = '';
		}
		else {
			el.className = fromclassname;
		}
		//MM_effectBlind(ID, 800, '100%', '0%', true);
		$('#'+ID).toggle('blind', '', 800);
	}
*/
}

function toggle_show_hide_help_module()
{
	var id = 'show-hide-help-module';
	var el = document.getElementById(id);

	var text = ' help in all modules'
	var show_text = 'Show'+text;
	var hide_text = 'Hide'+text;

	if(el.innerHTML==show_text) {
		createCookie("show_help",true,365000);
		el.innerHTML = hide_text;
	} else {
		toggle_help_module();
		createCookie("show_help",false,365000);
		el.innerHTML = show_text;
	}
}

function createCookie(name,value,days) {
  if (days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function swapPlusMinusImg(imgID, module_name) {
	var img = document.getElementById(imgID);
	var string = img.src;
	var cookie_name_start_with = '';
	var cookie_name = 'scribe-index-open';

	if (string.match('minus')) {
		img.src = '/scribe/sites/all/scripts/drag-drop-folder-tree/images/dhtmlgoodies_plus.png';
	} else {
		img.src = '/scribe/sites/all/scripts/drag-drop-folder-tree/images/dhtmlgoodies_minus.png';
	}

	if(module_name != undefined)
	{
		var pages_index_arr = new Array();
		if(string.match('plus')) {
			var cookie = $.cookie(cookie_name);
			if (cookie == null || cookie=='') {
				pages_index_arr.push(imgID);
			} else{
				pages_index_arr = cookie.split(',');
				if(jQuery.inArray(imgID, pages_index_arr) == -1){
					pages_index_arr.push(imgID);
				}
			}
			$.cookie(cookie_name, pages_index_arr, { expires: 30});
		}else{
			var cookie = $.cookie(cookie_name);
			if(cookie){
				pages_index_arr = cookie.split(',');
				pages_index_arr.splice($.inArray(imgID, pages_index_arr), 1);
				$.cookie(cookie_name, pages_index_arr, { expires: 30});
			}
			var cookie = $.cookie(cookie_name);
			if (cookie == null || cookie=='') {
				$.cookie(cookie_name, null);
			}
		}
	}
}

function toggle_visibility(id) {
	var e = document.getElementById(id);
	if(e.style.display == "none")
	e.style.display = "block";
	else
	e.style.display = "none";
}

function changePage(newLoc)
 {
   nextPage = newLoc.options[newLoc.selectedIndex].value;

   if (nextPage != "")
   {
	  document.location.href = nextPage;
   }
 }

function confirm_window(message, url)
{
	if(confirm(message)) location.href = url;
}

function pausejavascript(milliseconds) {
	var date = new Date();
	var curDate = null;

	do {
		curDate = new Date();
	} while(curDate-date < milliseconds);
}

function checkUncheckAll(theElement) {
	var theForm = theElement.form, z = 0;
 	for(z=0; z<theForm.length;z++){
		if(theForm[z].type == 'checkbox' && theForm[z].name != 'checkall'){
			theForm[z].checked = theElement.checked;
		}
 	}
}

function check_uncheck_all(scope, controller) {
	select_all_state = document.getElementById(controller).checked;
	$("#"+scope+" input:checkbox").each(function() {
		if(this.value!="on") {
			this.checked = select_all_state;
		}
	});
}

function checkUncheckSome(controller,theElements) {
	//Programmed by Shawn Olson
	//Copyright (c) 2006-2007
	//Updated on August 12, 2007
	//Permission to use this function provided that it always includes this credit text
	//  http://www.shawnolson.net
	//Find more JavaScripts at http://www.shawnolson.net/topics/Javascript/

	//theElements is an array of objects designated as a comma separated list of their IDs
	//If an element in theElements is not a checkbox, then it is assumed
	//that the function is recursive for that object and will check/uncheck
	//all checkboxes contained in that element

	 var formElements = theElements.split(',');
	 var theController = document.getElementById(controller);
	 for(var z=0; z<formElements.length;z++){
	  theItem = document.getElementById(formElements[z]);
	  if(theItem.type){
		if (theItem.type=='checkbox') {
			theItem.checked=theController.checked;
		}
	  } else {
	  	  theInputs = theItem.getElementsByTagName('input');
	  for(var y=0; y<theInputs.length; y++){
	  if(theInputs[y].type == 'checkbox' && theInputs[y].id != theController.id){
		 theInputs[y].checked = theController.checked;
		}
	  }
	  }
	}
}

function limitText(limitField, limitCount, limitNum) {
	if (limitField.value.length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
	} else {
		limitCount.value = limitNum - limitField.value.length;
	}
}


/* =============================================================================== */
/* Dreamweaver */

function MM_effectAppearFade(targetElement, duration, from, to, toggle)
{
	Spry.Effect.DoFade(targetElement, {duration: duration, from: from, to: to, toggle: toggle});
}

function MM_effectBlind(targetElement, duration, from, to, toggle)
{
	Spry.Effect.DoBlind(targetElement, {duration: duration, from: from, to: to, toggle: toggle});
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_changeProp(objName,x,theProp,theValue) { //v6.0
  var obj = MM_findObj(objName);
  if (obj && (theProp.indexOf("style.")==-1 || obj.style)){
	if (theValue == true || theValue == false)
	  eval("obj."+theProp+"="+theValue);
	else eval("obj."+theProp+"='"+theValue+"'");
  }
}
function MM_validateForm() { //v4.0
  var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
  for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=MM_findObj(args[i]);
	if (val) { nm=val.name; if ((val=val.value)!="") {
	  if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
		if (p<1 || p==(val.length-1)) errors+='- '+nm+' must contain an e-mail address.\n';
	  } else if (test!='R') { num = parseFloat(val);
		if (isNaN(val)) errors+='- '+nm+' must contain a number.\n';
		if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
		  min=test.substring(8,p); max=test.substring(p+1);
		  if (num<min || max<num) errors+='- '+nm+' must contain a number between '+min+' and '+max+'.\n';
	} } } else if (test.charAt(0) == 'R') errors += '- '+nm+' is required.\n'; }
  } if (errors) alert('The following error(s) occurred:\n'+errors);
  document.MM_returnValue = (errors == '');
}

function MM_setTextOfTextfield(objId,x,newText) { //v9.0
  with (document){ if (getElementById){
	var obj = getElementById(objId);} if (obj) obj.value = newText;
  }
}


/* Select all checkboxes in a group =====================
 * Use this function if there are groups of checkboxes in a single form
 * When a select all checkbox of id all_XYZ is checked, checkboxes with class XYZ are checked */
var checkbox_group = {}
function selectCheckboxGroup(obj) {
	var checkbox_class = obj.id.substring(4);
	var boxes = $("input." + checkbox_class);
	if (!checkbox_group[checkbox_class])
		checkbox_group[checkbox_class] = obj.checked;
	else
		checkbox_group[checkbox_class] = !checkbox_group[checkbox_class];
	for (var x=0; x<boxes.length; x++)
		boxes[x].checked = checkbox_group[checkbox_class];
}
/* /Select all checkboxes in a group =====================

/* URL encoding ===================== */
function urlencode (str) {
	var hexStr = function (dec) {
		return '%' + dec.toString(16).toUpperCase();
	};

	var ret = '',
			unreserved = /[\w.-]/; // A-Za-z0-9_.- // Tilde is not here for historical reasons; to preserve it, use rawurlencode instead
	str = (str+'').toString();

	for (var i = 0, dl = str.length; i < dl; i++) {
		var ch = str.charAt(i);
		if (unreserved.test(ch)) {
			ret += ch;
		}
		else {
			var code = str.charCodeAt(i);
			// Reserved assumed to be in UTF-8, as in PHP
			if (code === 32) {
				ret += '+'; // %20 in rawurlencode
			}
			else if (code < 128) { // 1 byte
				ret += hexStr(code);
			}
			else if (code >= 128 && code < 2048) { // 2 bytes
				ret += hexStr((code >> 6) | 0xC0);
				ret += hexStr((code & 0x3F) | 0x80);
			}
			else if (code >= 2048 && code < 65536) { // 3 bytes
				ret += hexStr((code >> 12) | 0xE0);
				ret += hexStr(((code >> 6) & 0x3F) | 0x80);
				ret += hexStr((code & 0x3F) | 0x80);
			}
			else if (code >= 65536) { // 4 bytes
				ret += hexStr((code >> 18) | 0xF0);
				ret += hexStr(((code >> 12) & 0x3F) | 0x80);
				ret += hexStr(((code >> 6) & 0x3F) | 0x80);
				ret += hexStr((code & 0x3F) | 0x80);
			}
		}
	}
	return ret;
}

/* /URL encoding ===================== */



/* confirms if a number is numeric or not. */
/* ref: http://stackoverflow.com/a/1830844 */
/* NB: You can also use JQuery.isNumeric() */
function is_numeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/* ref: http://www.inventpartners.com/content/javascript_is_int */
function is_integer(value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
	  return true;
  } else {
	  return false;
  }
}


/**
	* Gets given a date in SQL datetime format (yyyy-mm-dd hh:MM:ss) and returns
	* a human-formatted date.
	*
	* Expected values of type: 'time', 'date', 'datetime'
	*
	*/
dateRE = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):?(\d{2})?/;
function formatDate(date, type) {


	if (!date || !dateRE.test(date)) {
		return date;
	}
	var dateArray = dateRE.exec(date);

	var formattedDate = dateArray[3] + '/' + dateArray[2] + '/' + dateArray[1]; // = d/m/y

	if (type === 'date') {
		return formattedDate;
	}

	//Format hours for 12-hour time.
	var mm = (dateArray[4] > '11') ? 'pm' : 'am';
	if (dateArray[4] > '12') {
		dateArray[4] -= 12;
	}

	if (type === 'time') {
		formattedDate = dateArray[4] + ':' + dateArray[5] + mm;
		return formattedDate;
	}

	//else type == 'datetime'

	formattedDate = formattedDate + '&nbsp;&nbsp;' +  dateArray[4] + ':' + dateArray[5] + mm;

	//format: dd-mm-yyyy hh:mm nn
	return formattedDate;
}


function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}



/**
* Delete all elements of set B from set A.
*/
function set_minus(A, B) {
	var map = {}, C = [];

	for(var i = B.length; i--; )
		map[B[i]] = null; // any other value would do

	for(var i = A.length; i--; ) {
		if(!map.hasOwnProperty(A[i]))
			C.push(A[i]);
	}

	return C;
}

/**
 * This clever bit of trickery removes duplicates from an array.
 * Source: http://paulirish.com/2010/duck-punching-with-jquery/
 */
function removeDuplicates(arr) {
	return $.grep(arr,function(v,k){
		return $.inArray(v,arr) === k;
}); }

function validate_email_address(email_address) {
	var email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return email_regex.test(email_address);
}

function set_pagination_session(session_value){
	$.post("/scribe/sites/all/themes/salvos-admin/includes/setsession.php", {"site_pagination": session_value});
}


// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and IE 10+.
// IE: The clipboard feature may be disabled by an administrator. By
// default a prompt is shown the first time the clipboard is
// used (per session).
function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		// IE specific code path to prevent textarea being shown while dialog is visible.
		return clipboardData.setData("Text", text);

	} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
		var textarea = document.createElement("textarea");
		textarea.textContent = text;
		textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
		document.body.appendChild(textarea);
		textarea.select();
		try {
			return document.execCommand("copy");  // Security exception may be thrown by some browsers.
		} catch (ex) {
			console.warn("Copy to clipboard failed.", ex);
			return false;
		} finally {
			document.body.removeChild(textarea);
		}
	}
}

//Used in the admin panel to copy public urls to the clipboard
function copyPublicURLToClipboard(this_obj){
		var text = $(this_obj).attr('href');

		copyToClipboard(text);
		$(this_obj).fadeOut(200).fadeIn(200);
		$(this_obj).attr('title', 'URL Copied to clipboard');
		alert('URL Copied to clipboard');
		event.preventDefault();
}

//function overrides defaut callback function for resposnive file manager
function responsive_filemanager_callback(field_id){

	if( field_id.indexOf("responsive-custom-block-") !== -1){
		responsive_filemanager_callback_custom_block(field_id);

	}else if( field_id.indexOf("elements-video_url-") !== -1){
		 //video hero unify homepage, home page extension block
		responsive_filemanager_callback_video(field_id);

	}else if(field_id == 'image_url_responsive'){
		responsive_filemanager_callback_image(field_id);
	}else if(field_id == 'video_image_url_responsive'){
		responsive_filemanager_callback_video_image(field_id);

	}else if(field_id.indexOf("image_url_theme_responsive") !== -1){
		responsive_filemanager_callback_theme_image(field_id); //for theme customisation

	}else if(field_id == 'auto_reply_image_url_responsive'){
		responsive_filemanager_callback_auto_reply(field_id);

	}else if(field_id == 'site_meta_responsive'){
		responsive_filemanager_callback_site_meta(field_id);

	}else if(field_id == 'error_page_image'){
		responsive_filemanager_callback_error_page_image(field_id);

	}else if(field_id == 'attached_filepath'){
		responsive_filemanager_callback_file_attachment(field_id);

	}else if(field_id == 'download_url'){
		responsive_filemanager_callback_file(field_id);

	}else if(field_id == 'upload_video'){
		responsive_filemanager_callback_video(field_id);

	}else if(field_id == 'audio-file'){
		responsive_filemanager_callback_audio(field_id);

	}else if(field_id == 'image_url_responsive_page_builder'){
		responsive_filemanager_callback_page_builder(field_id);

	}else if(field_id == 'image_url_responsive_page_builder_home'){
		responsive_filemanager_callback_page_builder_home(field_id);

	}else if( field_id.indexOf("cc-") !== -1){ //custom content
			responsive_filemanager_callback_custom_content(field_id);

	}else{// It's either come from a block or a home page element

		if(field_id == ''){
			responsive_filemanager_callback_theme_block_file(field_id);
		}else{
			var myarr = field_id.split("-");
			var source = myarr[0]
			var type = myarr[1];
			var block_id = myarr[2];

			if(source == 'home_page'){ // hand over to home_page module functions to determine how to handle
				responsive_file_manager_home_page_routes(field_id);
			}else if(source == 'ad_block'){
				responsive_filemanager_callback_ad_block(field_id);
			}else if(source == 'item'){
				responsive_filemanager_callback_page_builder_item(field_id);
			}else if(['dhandle','theader','tmobile', 'meta','product','imgthumb','mthumb'].includes(source)){
				responsive_filemanager_callback_dollar_handles(field_id);
			} else if (type == 'file') {
				responsive_filemanager_callback_theme_block_file(field_id);
			}else{
				responsive_filemanager_callback_theme_block(field_id);
			}
		}

	}
}

function responsive_filemanager_callback_page_builder_item(field_id){

	var myarr = field_id.split("-");
	var source = myarr[0]
	var type = myarr[1];
	var block_id = myarr[2];
	var key = myarr[3];

	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url=site_folder+jQuery('#'+field_id).val();

	var id,segment,img_preview_id, thumb_id;

	id ='elements['+block_id+'][items]['+key+']['+type+']';

	if (type == 'image_url') {

		id ='elements['+block_id+'][items]['+key+']['+type+']';

		img_preview_id = 'image-preview-'+block_id+'-'+key;
		thumb_id = 'thumbnail_image_'+block_id+'_'+key;

		document.getElementById(id).value = url;

		$('#'+thumb_id).attr('src', url);
		$('#'+thumb_id).attr('width', '150px');

		$('#'+img_preview_id).removeClass('hidden');
	}
	else {
		id ='item-'+type+'-'+block_id+'-'+key;
		document.getElementById(id).value = url;
	}




}

function responsive_file_manager_home_page_routes(field_id){
	var myarr = field_id.split("-");
	var source = myarr[0]
	var type = myarr[1];
	var thumb_id, img_id, remove_id,image_name,slide_num = '';

	if(type == 'image_url_src'){
		responsive_filemanager_callback_home_page(field_id);
	}else{
		var site_folder = "/scribe/sites/"+site_path+"/files/";
		var html;
		var url=site_folder+jQuery('#'+field_id).val();

		if(type == 'image_url_single'){

			thumb_id = 'thumbnail_image_single';
			img_id = 'hero[image][src]';
			image_name ='hero[image][src]';
			remove_id = 'thumbnail_image_single_remove';

		}else if(type == 'image_url_slide'){
			slide_num = myarr[2];

			thumb_id = 'thumbnail_image-'+slide_num;
			img_id = 'hero_slide-'+slide_num;
			image_name ='hero[slides]['+slide_num+'][src]';
			remove_id = 'sidebar-remove-img-'+slide_num;

		}else if(type == 'image_url_bgslide'){
			slide_num = myarr[2];

			thumb_id = 'thumbnail_bgimage-'+slide_num;
			img_id = 'hero_bgslide-'+slide_num;
			image_name ='hero[slides]['+slide_num+'][bgsrc]';
			remove_id = 'remove_thumbnail_bgimage-'+slide_num;
		}

		jQuery('#'+thumb_id).remove();
		var element = document.getElementById(img_id);
		if(element){
			element.parentNode.removeChild(element);
		}

		jQuery('#'+remove_id).remove();

		html =  '<img id="'+thumb_id+'" width="150" src="/image?src='+url+'&max=150">'
		 +'<input type="hidden" id="'+img_id+'" name="'+image_name+'" value="'+url+'">';
		 // +'<span id="'+remove_id+'" class="actions"><span id="delete"><a id="sidebar-remove-img" onclick="remove_image_src_link_thumbnail(\''+thumb_id+'\', \''+img_id+'\')">&nbsp;</a></span></span>'
		 jQuery('#'+field_id).after(html);

	}
}

function responsive_filemanager_callback_home_page(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url=site_folder+jQuery('#'+field_id).val();

	//jQuery('#img-options').show();

	jQuery('#image_src_thumbnail').remove();
	jQuery('#home_page_image_src_url').remove();
	jQuery('#remove_image_src_thumbnail').remove();

	html =  '<img id="image_src_thumbnail" width="150" src="/image?src='+url+'&max=150">'
	 +'<input type="hidden" id="home_page_image_src_url" name="home_page_image_src_url" value="'+url+'">'
	 +'<span id="remove_image_src_thumbnail" class="actions"><span id="delete"><a id="sidebar-remove-img" onclick="remove_image_src_link_thumbnail(\'image_src_thumbnail\', \'home_page_image_src_url\')">&nbsp;</a></span></span>'
	 jQuery('#'+field_id).after(html);
}

function responsive_filemanager_callback_image(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url=site_folder+jQuery('#'+field_id).val();

	jQuery('#img-options').show();

	jQuery('#thumbnail_image').remove();
	jQuery('#image_url').remove();
	jQuery('#remove_thumbnail_image').remove();

	jQuery('#image_preview').removeClass('hidden');
	jQuery('#image_preview').removeAttr('style');

	html =  '<img id="thumbnail_image" width="150" src="/image?src='+url+'&max=150">'
	 +'<input type="hidden" id="image_url" name="image_url" value="'+url+'">'
	 +'<span id="remove_thumbnail_image" class="actions"><span id="delete"><a id="sidebar-remove-img" onclick="remove_thumbnail_image(\'thumbnail_image\', \'image_url\')">&nbsp;</a></span></span>'
	 jQuery('#'+field_id).after(html);
}

function responsive_filemanager_callback_video_image(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url=site_folder+jQuery('#'+field_id).val();

	jQuery('#video-img-options').show();

	jQuery('#video_thumbnail_image').remove();
	jQuery('#video-image_url').remove();
	jQuery('#vieo_remove_thumbnail_image').remove();

	jQuery('#video_image_preview').removeClass('hidden');
	jQuery('#video_image_preview').removeAttr('style');

	html =  '<img id="video_thumbnail_image" width="150" src="/image?src='+url+'&max=150">'
	 +'<input type="hidden" id="video_image_url" name="image_url" value="'+url+'">'
	 +'<span id="video_remove_thumbnail_image" class="actions"><span id="delete"><a id="sidebar-remove-img" onclick="remove_thumbnail_image(\'video_thumbnail_image\', \'video_image_url\')">&nbsp;</a></span></span>'
	 jQuery('#'+field_id).after(html);
}

function responsive_filemanager_callback_theme_image(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url=site_folder+jQuery('#'+field_id).val();
	bgimage_preview(url, undefined);


}

function responsive_filemanager_callback_auto_reply(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url=site_folder+jQuery('#'+field_id).val();


	jQuery('#image-preview-ar').removeClass('hidden');
	jQuery('#auto_reply_thumbnail_image').remove();
	jQuery('#auto_reply_image_url').remove();
	jQuery('#auto_reply_remove_thumbnail_image').remove();

	html =  '<img  width="150" id="auto_reply_thumbnail_image" class="thumbnail_image" src="/image?src='+url+'&max=150">'
	 +'<input type="hidden" id="auto_reply_image_url" name="auto_reply_image_url" value="'+url+'">'
	 +'<span id="auto_reply_remove_thumbnail_image" class="actions"><span id="delete"><a id="auto_reply_sidebar-remove-img" onclick="remove_theme_block_thumbnail_image(\'image-preview-ar\', \'auto_reply_thumbnail_image\', \'auto_reply_image_url\')">&nbsp;</a></span></span>';
	 jQuery('#'+field_id).after(html);
}

function responsive_filemanager_callback_site_meta(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url=site_folder+jQuery('#'+field_id).val();

	jQuery('#img-options').show();

	jQuery('#thumbnail_image').remove();
	jQuery('#site_meta_image_url').remove();
	jQuery('#remove_thumbnail_image').remove();

	html =  '<img id="thumbnail_image" width="150" src="/image?src='+url+'&max=150">'
	 +'<input type="hidden" id="site_meta_image_url" name="site_meta_image_url" value="'+url+'">'
	 +'<span id="remove_thumbnail_image" class="actions"><span id="delete"><a id="sidebar-remove-img" onclick="remove_thumbnail_image(\'thumbnail_image\', \'image_url\')">&nbsp;</a></span></span>'
	 jQuery('#'+field_id).after(html);
}

function responsive_filemanager_callback_error_page_image(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url=site_folder+jQuery('#'+field_id).val();

	jQuery('#img-options').show();

	jQuery('#thumbnail_image_error').remove();
	jQuery('#error_page_image_url').remove();
	jQuery('#remove_thumbnail_image_error').remove();

	html =  '<img id="thumbnail_image_error" width="150" src="/image?src='+url+'&max=150">'
	 +'<input type="hidden" id="error_page_image_url" name="error_page_image_url" value="'+url+'">'
	 +'<span id="remove_thumbnail_image_error" class="actions"><span id="delete"><a id="sidebar-remove-img" onclick="remove_image_src_link_thumbnail_2(\'image-preview-error\',\'thumbnail_image_error\', \'error_page_image_url\')">&nbsp;</a></span></span>'
	 jQuery('#'+field_id).after(html);
}

function responsive_filemanager_callback_file(field_id){
	//site_path is defined in the page.tpl
	//var site_folder = "/scribe/sites/"+site_path+"/files/";
	//var url=site_folder+jQuery('#'+field_id).val();
	//var url=jQuery('#'+field_id).val();
//	jQuery('#'+field_id).val(url);

}

function responsive_filemanager_callback_video(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var url=site_folder+jQuery('#'+field_id).val();

	jQuery('#'+field_id).val(url);

}

function responsive_filemanager_callback_file_attachment(field_id){
	//site_path is defined in the page.tpl
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var url=site_folder+jQuery('#'+field_id).val();

	jQuery('#'+field_id).val(url);

}

function responsive_filemanager_callback_audio(field_id){
	//site_path is defined in the page.tpl
	//var site_folder = "/scribe/sites/"+site_path+"/files/";
	//var url=site_folder+jQuery('#'+field_id).val();
	//var url=jQuery('#'+field_id).val();
	//jQuery('#'+field_id).val(url);
	jQuery('#'+field_id).val(decodeURIComponent(jQuery('#'+field_id).val()));
}

function responsive_filemanager_callback_page_builder(field_id){
	//site_path is defined in the page.tpl
		var site_folder = "/scribe/sites/"+site_path+"/files/";
		var html;
		var url=site_folder+jQuery('#'+field_id).val();

		jQuery('#img-options').show();

		jQuery('#thumbnail_image').remove();
		jQuery('#image_url').remove();
		jQuery('#remove_thumbnail_image').remove();

		html =  '<img id="thumbnail_image" width="150" src="/image?src='+url+'&max=150">'
		 +'<input type="hidden" id="image_url" name="image_url" value="'+url+'">'
		 +'<span id="remove_thumbnail_image" class="actions"><span id="delete"><a id="sidebar-remove-img" onclick="remove_thumbnail_image(\'thumbnail_image\', \'image_url\')">&nbsp;</a></span></span>'
		 jQuery('#image_url_responsive_page_builder').after(html);
		//your code
}

function responsive_filemanager_callback_page_builder_home(field_id){
	//site_path is defined in the page.tpl
		var site_folder = "/scribe/sites/"+site_path+"/files/";
		var html;
		var url=site_folder+jQuery('#'+field_id).val();



		jQuery('#thumbnail_image').remove();
		jQuery('#home_page_hero_image_src').remove();
		jQuery('#remove_thumbnail_image').remove();

		html =  '<img id="thumbnail_image" width="150" src="/image?src='+url+'&max=150">'
		 +'<input type="hidden" id="home_page_hero_image_src" name="home_page[hero][image][src]" value="'+url+'">'
		 +'<span id="remove_thumbnail_image" class="actions"><span id="delete"><a id="sidebar-remove-img" onclick="remove_thumbnail_image(\'thumbnail_image\', \'home_page_hero_image_src\')">&nbsp;</a></span></span>'
		 jQuery('#image_url_responsive_page_builder_home').after(html);
		//your code
}

function responsive_filemanager_callback_theme_block(field_id){
	var myarr = field_id.split("-");
	var source = myarr[0]
	var type = myarr[1];
	var block_id = myarr[2];

	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var html;
	var url = site_folder+jQuery('#'+field_id).val();

	var id,segment,img_preview_id, thumb_id;

	if(myarr.length>3){
		segment = myarr[3];
		id = 'elements['+block_id+']['+segment+']['+type+']';
		img_preview_id = 'image-preview-'+segment+'-'+block_id;
		thumb_id = 'thumbnail_image_'+segment+'_'+block_id;

	}else{
		id ='elements['+block_id+']['+type+']';
		if(type == 'mobile_image_url'){
			img_preview_id = 'mobile-image-preview-'+block_id;
			thumb_id = 'thumbnail_mobile_image_'+block_id;
		}else{
			img_preview_id = 'image-preview-'+block_id;
			thumb_id = 'thumbnail_image_'+block_id;
		}
	}

	document.getElementById(id).value = url;

	$('#'+thumb_id).attr('src', url);
	$('#'+thumb_id).attr('width', '150px');
	//Splitting it with : as the separator
	$('#'+img_preview_id).removeClass('hidden');



}

function responsive_filemanager_callback_theme_block_file(field_id){
	var myarr = field_id.split("-");
	var source = myarr[0]
	var type = myarr[1];
	var block_id = myarr[2];

	var site_folder = "/scribe/sites/" + site_path + "/files/";
	var html;
	var url = site_folder + jQuery('#' + field_id).val();

	var id, segment, file_preview_id;

	if (type == 'file' && source == 'button'){
		var parent_id = jQuery('#' + field_id).data('path');
		jQuery('#' + parent_id).val(url);

	}else{

		id = 'elements[' + block_id + '][' + type + ']';

		file_preview_id = 'file-preview-' + block_id;


		document.getElementById(id).value = url;

		$('#' + file_preview_id).removeClass('hidden');
	}

}

function responsive_filemanager_callback_ad_block(field_id){
		var myarr = field_id.split("-");
		var source = myarr[0]
		var type = myarr[1];
		var block_id = myarr[2];
		var promo_id = myarr[3];

		var site_folder = "/scribe/sites/"+site_path+"/files/";
		var html;
		var url = site_folder+jQuery('#'+field_id).val();

		$('#'+field_id+'_thumb').remove();

		var html =	'<div id="'+field_id+'_thumb" >'
					+ '	<img id="thumbnail_image" width="150" src="/image?src='+url+'&amp;width=150&amp;height=150">'
					+ '	<input type="hidden" id="ad_block_image_url_'+promo_id+'" name="ads['+promo_id+'][ad_block_image_url]" value="'+url+'">'
					+ '</div>';
		$('#browse-'+ field_id ).append(html);
		if(promo_id != 0){
			$('#'+field_id).siblings('span').removeClass('hidden');
		}
}

function responsive_filemanager_callback_custom_block(field_id){
	//field_id = responsive-custom-block-{name}-randomNum
	//					0		1		2    3		4

	var myarr = field_id.split("-");
	var name = myarr[3];

	/* 	transalting back from special character sequence(resposnive file manager fix)
		sqs == square bracket start [
		sqe == square bracket end ]
	*/
	name = name.replace(/sqs/g, "[");
	name = name.replace(/sqe/g, "]");

	var site_folder = "/scribe/sites/"+site_path+"/files/";

	var url = site_folder+jQuery('#'+field_id).val();

	jQuery('#'+field_id).siblings(".image-preview").remove();

	var html ='<span class="image-preview">\n'
	+'<input type="hidden" class="custom_block_image_url" id="'+name+'" name="'+name+'" value="'+url+'" /> \n'
 	+'<img id="thumbnail_image" src="/image?src='+url+'&amp;width=150&amp;height=150" /> \n'
	+'<br/></span>';


	jQuery('#'+field_id).before(html);

}

function responsive_filemanager_callback_dollar_handles(field_id){
		var myarr = field_id.split("-");
		var source = myarr[0]
		var type = myarr[1];
		var rowid = myarr[2];

		var site_folder = "/scribe/sites/"+site_path+"/files/";
		var url = site_folder+jQuery('#'+field_id).val();
		var id, img_width;

		if(rowid){
			id = source+'['+rowid+']'+'['+type+']';
			source += '-'+rowid;
			img_width = '40px';
		}else{
			id = source+'['+type+']';
			img_width = '150px';
		}

		//file_preview_id = 'file-preview-'+block_id;

		img_preview_id = 'image-preview-'+source;
		thumb_id = 'thumbnail_image_'+source;

		document.getElementById(id).value = url;

		$('#'+thumb_id).attr('src', url);
		$('#'+thumb_id).attr('width', img_width);
		//Splitting it with : as the separator

		$('#'+img_preview_id).removeClass('hidden');
		$('#remove_'+thumb_id).removeClass('hidden');

		//$('#'+file_preview_id).removeClass('hidden');
}

function responsive_filemanager_callback_custom_content(field_id){
	//console.log('custom_content_callback');
	//console.log(field_id);
	var img_width = '150px';
	var site_folder = "/scribe/sites/"+site_path+"/files/";
	var url = site_folder+jQuery('#'+field_id).val();

	var thumb_url ="/image?src="+url+"&max="+img_width
	var source = field_id.replace('cc-','');

	var img_preview_id = 'preview-'+source;
	var thumb_id = 'thumbnail-'+source;



	document.getElementById(source).value = url;

	$('#'+thumb_id).attr('src', thumb_url);
	$('#'+thumb_id).attr('width', img_width);
	//console.log(field_id);

	$('#'+img_preview_id).removeClass('hidden');
	$('#remove_'+thumb_id).removeClass('hidden');
	// thumbnail-mobile-image-url
	// mobile-image-url
}

function load_datalayer(){
	window.dataLayer = window.dataLayer || []
	dataLayer.push({
	 'event': 'pdfclick'
	});
}
