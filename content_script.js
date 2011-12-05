/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 *
 * The Initial Developer of the Original Code is
 * viperfx07 <viperfx07@gmail.com>.
 * Portions created by the Initial Developer are Copyright (C) 2009-2011
 * the Initial Developer. All Rights Reserved.
 *
 
 *
 * ***** END LICENSE BLOCK ***** */

 //Add "Add to YTPlaylist" button on Youtube
 
 
$(".video-list-item-link").each(function(){
	var temp = (($(this).attr("href")).split("&"))[0];
	var temp1 = (temp.split("="))[1];
	
	$(this).append('<a class="ytplaylist_addtolist title" id="' + temp1 + '" href="#addtoplaylist">Add to YTPlaylist</a>');
});

$("iframe[src*='youtube.com/embed/']").each(function(){
		var vid_id = (($("link[rel='canonical']", this).attr("href")).split("="))[1];
		$(this).after('<br/><a class="ytplaylist_addtolist title" id="' + vid_id + '" href="#addtoplaylist">Add to YTPlaylist</a>');
		
});

$(".ytplaylist_addtolist").click(function(){
	localStorage.ytplaylist = (localStorage.ytplaylist) ?  (localStorage.ytplaylist +  "|||" + $(this).attr('id')) : ($(this).attr('id'));
});