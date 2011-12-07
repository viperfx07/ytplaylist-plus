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

function addVideoToPlaylist(p)
{	
	if(p){
		var videos = p.split("|||");
		var scriptdata = "";
		for(var v in videos)
		{
			scriptdata += ' function addTo' + v + '(){ ymfPl.push("' + videos[v] + '");' +
			' ymfAddItem("'+ videos[v] +'"); } setTimeout("addTo' + v +'()",' + v + '000);';
		}
		scriptdata += " ymfSwitchSideBar('tab_playlist')";
		var e = document.createElement("script");
		e.type = "text/javascript";
		e.appendChild(document.createTextNode(scriptdata));
		document.body.appendChild(e);
	}
}
 
$(document).ready(function(){
	chrome.extension.sendRequest({reqType: "getList"},function(playlist){
		addVideoToPlaylist(playlist);
	});
});