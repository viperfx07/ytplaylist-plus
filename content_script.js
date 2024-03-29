﻿/* ***** BEGIN LICENSE BLOCK *****
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

var ytplaylist_button_iframe = '<br/><button onclick=";return false;" class="ytplaylist_addtolist" title="Add to YTPlaylist" type="button" data-feature="watch" role="button" data-tooltip-text="Add to YTPlaylist" style="margin: 0; padding: 0; border: 0; font-size: 100%; background: transparent;padding: 0 .5em; height: 2.0833em; border: 1px solid #CCC; color: black; background: #F6F6F6; background-image: -moz-linear-gradient(top,#ffffff,#efefef); background-image: -webkit-gradient(linear,left top,left bottom,from(#ffffff),to(#efefef)); filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ffffff,endColorStr=#efefef); -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; white-space: nowrap; vertical-align: middle; cursor: pointer; overflow: visible; color: #555; font-weight: bold; font-size: 11px; text-shadow: 0 0 0 transparent,0 1px 0 white; height: 2.95em; padding: 0 0.91em; border: 1px solid #CCC; border-bottom-color: #AAA; background-image: -webkit-linear-gradient(top,#fff 0,#e0e0e0 100%); background-image: linear-gradient(to bottom,#fff 0,#e0e0e0 100%); -webkit-border-radius: 3px; border-radius: 3px; -webkit-box-shadow: inset 0 0 1px #fff; box-shadow: inset 0 0 1px #fff;" alt="Add to YTPlaylist"><img style="background: no-repeat url(//s.ytimg.com/yt/imgbin/www-refresh-vfl3IcHHw.png) -116px -61px; width: 8px; margin-right:5px; height: 9px;" src="http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Add to YTPlaylist"><span class="yt-uix-button-content"><span class="addto-label">Add to YTPlaylist</span></span></button>';
 
 
function attach_addtolist_button(){
	$(".ytplaylist_addtolist").unbind();
	$(".ytplaylist_addtolist").click(function(){
		chrome.extension.sendRequest({reqType: 'addToList', v : $(this).next().attr('value')});
	});
}

//Add "Add to YTPlaylist" button on Youtube recommended links on the right hand side
$(".video-list-item-link").each(function(){
	var temp = (($(this).attr("href")).split("&"))[0];
	var temp1 = (temp.split("="))[1];
	if($(this).next().attr('data-tooltip-text') == undefined){
		$(this).after(ytplaylist_button_thumb + '<input type="hidden" id="ytplaylist_video_id" value="' + temp1 + '"/>');
	}
});

//Add "Add to YTPlaylist" button on websites that have embedded Youtube videos
$('iframe[src*="youtube.com/embed/"]').each(function(){
	var vid_id = (((($(this).attr('src')).split('?'))[0]).split("embed/"))[1];
	$(this).after(ytplaylist_button_iframe + '<input type="hidden" id="ytplaylist_video_id" value="' + vid_id + '"/>');
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

attach_addtolist_button();

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
		attach_addtolist_button();
	}
	
  } catch(e) {
    console.error("ERROR: " + e.toString());
  } finally {
    isActive = false;

  }
};
if(document.getElementById("watch-sidebar"))
	document.getElementById("watch-sidebar").addEventListener("DOMNodeInserted", inject, false);

	
	
var isActive1 = false;
var inject1 = function() {
  if (isActive1) {
    console.log('INFO: Injection already active');
    return;
  }
  try {
    isActive1 = true;
    //inject your buttons here
    
	if($(".feed-page").next().attr('type') != 'button'){
		$(".feed-page").each(function(){
			$(".feed-item-visual",this).each(function(){
				var temp = (($(".feed-item-visual-thumb a",this).attr("href")).split("&"))[0];
				var temp1 = (temp.split("="))[1];
				if($(this).next().attr('type') !='button'){
					$(this).after(ytplaylist_button_watch + '<input type="hidden" id="ytplaylist_video_id" value="' + temp1 + '"/>');
					attach_addtolist_button();
				}
			});
		});
	}
	
	
  } catch(e) {
    console.error("ERROR: " + e.toString());
  } finally {
    isActive1 = false;
	
  }
};

if(document.getElementById("feed-system-all"))
	document.getElementById("feed-system-all").addEventListener("DOMNodeInserted", inject1, false);

