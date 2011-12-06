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
 //TODO: add buttons on channel page.
 

  var ytplaylist_button_thumb = '<button type="button" class="yt-uix-button yt-uix-button-short ytplaylist_addtolist" onclick=";return false;" data-feature="thumbnail" role="button"><span class="yt-uix-button-content"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Add to YTPlaylist"><span class="addto-label">Add to YTPlaylist</span> </span></button>';
  
  var ytplaylist_button_watch = '<button onclick=";return false;" title="Add to YTPlaylist" type="button" class="addto-button watch show-label yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip ytplaylist_addtolist" data-feature="watch" role="button" data-tooltip-text="Add to YTPlaylist"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Add to YTPlaylist"><span class="yt-uix-button-content"><span class="addto-label">Add to YTPlaylist</span></span></button>';
 

 
 //Add "Add to YTPlaylist" button on Youtube recommended links on the right hand side
 $(".video-list-item-link").each(function(){
	var temp = (($(this).attr("href")).split("&"))[0];
	var temp1 = (temp.split("="))[1];
	if($(this).next().attr('data-tooltip-text') == undefined){
		$(this).after(ytplaylist_button_thumb + '<input type="hidden" id="ytplaylist_video_id" value="' + temp1 + '"/>');
	}
});

//Add "Add to YTPlaylist" button on websites that have embedded Youtube videos
$("iframe[src*='youtube.com/embed/']").each(function(){
		var vid_id = (($("link[rel='canonical']", this).attr("href")).split("="))[1];
		$(this).after(ytplaylist_button_watch + '<input type="hidden" id="ytplaylist_video_id" value="' + temp1 + '"/>');
});

//Add "Add to YTPlaylist" button on websites that have embedded Youtube videos
 $(".feed-item-visual").each(function(){
 	var temp = (($(".feed-item-visual-thumb a",this).attr("href")).split("&"))[0];
	var temp1 = (temp.split("="))[1];
	$(this).after(ytplaylist_button_watch + '<input type="hidden" id="ytplaylist_video_id" value="' + temp1 + '"/>');
});

//Add "Add to YTPlaylist" button on Youtube video page
 $("#watch-flag").each(function(){
 	var temp = ((document.location.href).split("&"))[0];
	var temp1 = (temp.split("="))[1];
	$(this).after(ytplaylist_button_watch + '<input type="hidden" id="ytplaylist_video_id" value="' + temp1 + '"/>');
});

//ytplaylist _addtolist click listener
$(".ytplaylist_addtolist").click(function(){
	localStorage.ytplaylist = (localStorage.ytplaylist) ?  (localStorage.ytplaylist +  "|||" + $(this).next().attr('value')) : ($(this).next().attr('value'));
});

var isActive = false;
var inject = function() {
  if (isActive) {
    console.log('INFO: Injection already active');
    return;
  }
  try {
    isActive = true;
    //inject your buttons here
    	
	var temp = (($(".video-list-item-link:last").attr("href")).split("&"))[0];
	var temp1 = (temp.split("="))[1];
	
	if($(".video-list-item-link:last").next().attr('type') != 'button'){
		$(".video-list-item-link:last").after(ytplaylist_button_thumb + '<input type="hidden" id="ytplaylist_video_id" value="' + temp1 + '"/>');
	}
	
  } catch(e) {
    console.error("ERROR: " + e.toString());
  } finally {
    isActive = false;
  }
};
document.getElementById("watch-sidebar").addEventListener("DOMNodeInserted", inject, false);
document.getElementById("feed-system-all").addEventListener("DOMNodeInserted", inject, false);

