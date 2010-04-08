/******
 * Tipped: A tooltip plugin for jQuery
 * http://www.augustana.ualberta.ca/tls/help/foss/tipped
 *
 * Copyright 2010, University of Alberta
 *
 * Tipped is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Tipped is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License v2
 * along with Tipped.  If not, see <http://www.gnu.org/licenses/gpl-2.0.html>
 *
 * v1.3.4:  - Made themeroller compatible
 *			- Used removeAttr() to remove title attribute, rather than setting the attribute to blank
 *			- Thanks to Durval Agnelo for the advice/contribution
 * v1.3.3:	- Became a good jQuery citizen and return the jQuery object from tipped() so it supports chaining
 *			- Fixed a bug that emptied out the title stored in data(), if tipped() is called
 *			  on an element twice
 * v1.3.2:	Fixed 'title' based tips that were trying to show the title from the attribute after it was emptied out
 * v1.3.1:	Did some stuff
 * v1.3:	Reposition tooltip at top left before width calculation for repositioning done.  This
 *			prevents inline elements from being squished.
 * v1.2:	Fixed showing/hiding of the "Close" button if there are tips with both "hover" and "click" mode
 * v1.1: 	- Added turning off of default tooltip that appears when an elelment has a title
 *			- #tipped element is now created explicitely as an window variable - fixes a problem with Safari
 * v1.0: 	Initial release
 */
(function($) {
	/******
	/*	Options
		
			ajaxType:	The type of HTTP request to make.
				Possible values: Anything $.ajax accepts (usually 'GET' or 'POST')
				Default: 'POST'
			
			cache:		Whether or not to cache AJAX requests.  Cache is based on URL, not URL + data, so if 
						you are making multiple requests to the same URL with different data, turn off cache
				Default: false
			
			closer:		The HTML to display when a tip is to be manually closed (ie: when triggered by a click).  
						All text in 'closer' will be injected inside another element that has the close listener
				Default: 'Close'
			
			marginX:	The pixels to the right of the element that the tip should appear.  This amount will be
						overridden if necessary to ensure the entire tip shows on the screen.
				Possible values: Any integer.  Negative numbers will position the tip to the left of the right
								 edge of the triggering element
				Default: '10'
				
			marginY:	The pixels to the bottom of the element that the tip should appear.  This amount will be
						overridden if necessary to ensure the entire tip shows on the screen.
				Possible values: Any integer.  Negative numbers will position the tip above of the bottom
								 edge of the triggering element
				Default: '10'
				
			mode:		The type of tip to make.  'Hover' shows and hides on hover, 'Click' is triggered with a
						click and requires clicking of the closer to go away
				Possible values: 'hover', 'click'
				Default: 'hover'
				
			params:		An object representing the parameters to send along with an AJAX request as 'data'
				Possible values:
					A callback: Data passed will be the object returned from this function.  Function will be passed
								a jQuery object representing the triggering element
					An object: Will be used as the data
				Default: {}
				
			source:		The source of the value to display.
				Possible values: 
					'title':	Value to display will be pulled from the 'title' attribute of the triggering element
					A callback: Value to display will be returned from the callback function.  Function will be passed
								a jQuery object representing the triggering element
					'url':		An AJAX request will be made to the address specified by the 'url' option
					Any other string:	Will be displayed
				Default: 'title'
				
			themeroller:Whether or not to make Themeroller compatible
				Possible values: true, false
				Default: false
				
			throbber:	The URL to the image to display while the AJAX request is being sent.  If blank, no throbber
						will be shown.
				Default: ''
				
			url:		The web address to make the AJAX request to.  Unused if 'source' is not 'url'
	*/
	
	var defaults = {
		ajaxType:'POST',
		cache:false,
		cached:{},
		closer:'Close',
		marginX:10,
		marginY:10,
		mode:'hover',
		params:{},
		source:'title',
		themeroller:false,
		throbber:'',
		url:''
	};
	
	//create single tooltip
	window.$tip = {};
	window.$tip_content = {}

	$(document).ready(function(){
		$tip = $("#tipped").length ? $("#tipped") : $('<div id = "tipped"><div id = "tipped_content"></div></div>').appendTo(document.body).data('showing',false);		
		$tip_content = $("#tipped_content");
	});

	$.fn.tipped = function(settings){
		this.each(function(i){
			
			$target = $(this);//shortcut
			
			//store settings
			settings = $.extend({},defaults,settings);
			$target.data('tipped',{settings:settings});			
			
			if(settings.themeroller)
				$tip.addClass('ui-helper-hidden ui-widget ui-dialog ui-corner-all');
			else
				$tip.removeClass('ui-helper-hidden ui-widget ui-dialog ui-corner-all');
				
			
			//2 modes act differently
			if(settings.mode == 'hover')
				$target
					.mouseover(function(){
						$.fn.tipped.showTip($(this));
					})
					.mouseout(function(){
						$.fn.tipped.hideTip($(this));
					});
			else if(settings.mode == 'click')
			{
				//add closer if necessary
				if($("#tipped-closer").length == 0)
					$tip.append('<div id = "tipped-closer-wrapper"><span id = "tipped-closer">'+settings.closer+'</span>');
				
				if(settings.themeroller)
				{
					$("#tipped-closer")
						.addClass('ui-button ui-state-hover ui-state-default')
						.hover(function(){$(this).addClass('ui-state-hover');},function(){$(this).removeClass('ui-state-hover');})
						.mousedown(function(){$(this).addClass('ui-state-active');})
						.mouseup(function(){$(this).removeClass('ui-state-active');})
				}
				else
					$("#tipped-closer").removeClass('ui-button ui-state-hover ui-state-default');				
					
				$target.click(function(){
					$this = $(this);
					$.fn.tipped.showTip($this);
					$("#tipped-closer").click(function(){
						$.fn.tipped.hideTip($this);
					});
				});
			}	
		});
		
		return this;
	};
	
	/**
	 * Function: showTip()
	 * Purpose: To initiate the showing of a tip.
	 * Parameters: $target: a jQuery object that has had a tip bound to it.  Tipped uses
	 *                      the settings associated with the $target to determine what to display
	 */
	$.fn.tipped.showTip = function($target)
	{
		//shortcuts
		var settings = $target.data('tipped').settings;
		var cached = $tip.data('cached');

		//manage the closer
		if(settings.mode != 'click')
			$("#tipped-closer-wrapper").hide();
		else
			$("#tipped-closer-wrapper").show();

		//hide the original title
		if($target.data('tipped').title === undefined)
		{
			$target.data('tipped',$.extend($target.data('tipped'),{title:$target.attr('title')}));
			$target.removeAttr('title');
		}

		//AJAX
		if(settings.source === 'url')
		{
			//if we're not caching, retrieve the value
			if(!settings.cache || cached === undefined || cached[settings.url] === undefined)
			{
				//set parameters
				var data = {};
				if(typeof settings.params == 'function')
					data = settings.params($target);
				else if(typeof settings.params == 'object')
					data = settings.params;
					
				$.ajax({
					beforeSend:function(){
						show($target,'<img src = '+settings.throbber+' alt = "Loading..." />');
					},
					data:data,
					error:function(){
						show($target,'Unable to retrieve contents');
					},
					success:function(display){
						if($tip.data('showing'))
							show($target,display);
						
						//cache results if necessary
						if(settings.cache)
						{
							var newCache = new Object;
							newCache[settings.url] = display;
							cached = $.extend(cached,newCache);
							$tip.data('cached',cached);
						}
					},
					type:settings.ajaxType,
					url:settings.url
				});
				return;
			}
			//otherwise, show the cached copy
			else
			{
				show($target,cached[settings.url]);
				return;
			}
		}
				
		
		var value = '';
		
		//'title' attribute
		if(settings.source === 'title')
			value = $target.data('tipped').title;
		
		//any other string
		else if(typeof settings.source == 'string')
			value = settings.source;
			
		//custom function
		else if(typeof settings.source == 'function')
			value = settings.source($target);
		
		//jQuery object
		else if(typeof settings.source == 'object')
			value = settings.source.html();
		
		show($target,value);
	}
	
	/*
	 * Function: hideTip()
	 * Purpose: To hide the tip
	 * Parameters: $target:	a jQuery object representing the element that triggered the tip
	 */
	$.fn.tipped.hideTip = function($target)
	{
		$target.attr('title',$target.data('tipped').title);
		$tip.data('showing',false).data('original','').hide();
		$tip_content.html('');
	}
	
	
	/*
	 * Function: getTrigger()
	 * Purpose: To provide access to the element that triggered the tip.  Useful for 
	 *          clicked tips that need to know who triggered them
	 *
	 * Access with: $.getTrigger()
	 */
	$.extend({
		getTrigger:function(){
			return $tip.data('original');
		}
	});

	/*
	 * Function: show()
	 * Purpose: To actually show the tip
	 * Parameters: $target: The element (wrapped in a jQuery object) that triggered the showing of this tip
	 *			   value: The HTML to place into the tip
 	 *
	 * Note: This function is private
	 */
	function show($target,value)
	{
		$tip_content.html(value);
		setPosition($target)
		$tip.data('showing',true).data('original',$target).show();
	}
	
	
	/*
	 * Function: setPosition()
	 * Purpose: To set the position of the tip.  This function is called after the content of the tip
	 *          is set, allowing the function to make a dynamic decision about the position of the tip
	 *			
	 *			The tip is always displayed fully on the screen & will be moved to ensure that.
	 * Parameters: $elem:	a jQuery object representing the element relative to which the tip is to be positioned.
	 *
	 * Note: This function is private
	 */
	function setPosition($elem)
	{
		var settings = $elem.data('tipped').settings;		

		//position tip in the top left corner, so full, proper width gets calculated
		$tip.css({left:0,top:0});

		//determine element position on screen
		var elemPos = $elem.offset();
		var posX = elemPos.left + $elem.outerWidth() + settings.marginX;
		var posY = elemPos.top + $elem.outerHeight() + settings.marginY;
		
		//adjust to ensure tip is inside viewable screen
		var right = posX + $tip.outerWidth();
		var bottom = posY + $tip.outerHeight();
		
		var windowWidth = $(window).width() + $(window).scrollLeft()-5;
		var windowHeight = $(window).height() + $(window).scrollTop()-5;
		
		posX = (right > windowWidth) ? posX - (right - windowWidth) : posX;
		posY = (bottom > windowHeight) ? posY - (bottom - windowHeight) : posY

		$tip.css({ left: posX, top: posY });
	}
})(jQuery);