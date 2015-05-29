By default, Tipped creates a hover triggered tip, pulling the value from the _title_ attribute. Changing these options will alter that behaviour.


# Options #
**ajaxType**
> The type of HTTP request to make.

> _Possible values_: `POST`, `GET`<br>
<blockquote><i>Default</i>: <code>POST</code></blockquote>


<b>cache</b>
<blockquote>Whether or not to cache AJAX requests.  Cache is based solely on URL, not URL + data, so if you are making multiple requests to the same URL with different data, turn off cache.</blockquote>

<blockquote>ex: <code>{params:{id:1},url:'mypage.php'}</code> and <code>{params:{id:2},url:'mypage.php'}</code> will access the same value in the cache.</blockquote>

<blockquote><i>Possible values</i>: <code>true</code>, <code>false</code><br>
<i>Default</i>: <code>false</code></blockquote>


<b>closer</b>
<blockquote>The HTML to display when a tip is to be manually closed (ie: when triggered by a click).</blockquote>

<blockquote>All HTML in <b>closer</b> will be injected inside another element that has the close listener, so you don't need to specify the #tipped-closer element in this value.</blockquote>

<blockquote><i>Default</i>: <code>Close</code></blockquote>


<b>delay</b>
<blockquote>The milliseconds to wait between when the trigger is hovered over, and the tip appears. Ignored if <b>mode</b> is <code>click</code>.</blockquote>

<blockquote><i>Default</i>: <code>0</code></blockquote>


<b>hideDelay</b>
<blockquote>The milliseconds to wait between when the trigger is hovered out, and the tip disappears. Ignored if <b>mode</b> is <code>click</code>.</blockquote>

<blockquote><i>Default</i>: <code>0</code></blockquote>


<b>marginX</b>
<blockquote>The pixels to the right of the element that the tip should appear.  This amount will be overridden if necessary to ensure the entire tip shows on the screen.</blockquote>

<blockquote><i>Possible values</i>: Any integer.  Negative numbers will position the tip to the left of the right edge of the triggering element.<br>
<i>Default</i>: <code>10</code></blockquote>


<b>marginY</b>
<blockquote>The pixels to the bottom of the element that the tip should appear.  This amount will be overridden if necessary to ensure the entire tip shows on the screen.</blockquote>

<blockquote><i>Possible values</i>: Any integer.  Negative numbers will position the tip above of the bottom edge of the triggering element.<br>
<i>Default</i>: <code>10</code></blockquote>


<b>mode</b>
<blockquote>The method by which the tip shows & hides.  "hover" shows and hides the tip when the trigger is hovered.  "click" shows the tip when the trigger is clicked, and requires clicking of the closer to go away</blockquote>

<blockquote><i>Possible values</i>: <code>hover</code>, <code>click</code><br>
<i>Default</i>: <code>hover</code></blockquote>


<b>oversizeStick</b>
<blockquote>A boolean representing whether or not to make the tooltip behave like it is 'click' mode, if the content is larger than the screen.  Too-large tooltips automatically (as of 1.4) get resized to the screen & scrollbars appear.  The <b>oversizeStick</b> option makes the tooltip show the <b>closer</b>, and not hide on mouseout.</blockquote>

<blockquote><i>Possible values</i>: <code>true</code>, <code>false</code><br>
<i>Default</i>: <code>true</code></blockquote>


<b>params</b>
<blockquote>An object representing the parameters to send along with an AJAX request as the <code>data</code> parameter.</blockquote>

<blockquote><i>Possible values</i>:<br>
<blockquote>» A function: The function must return an object, which will be passed as the <code>data</code> parameter to $.ajax().  This function will be passed a jQuery object representing the triggering element.<br>
» An object: Will be passed as the <code>data</code> parameter to $.ajax()</blockquote></blockquote>

<blockquote><i>Default</i>: An empty object, <code>{}</code></blockquote>


<b>position</b>
<blockquote>The method Tipped will use to determine position.</blockquote>

<blockquote><i>Possible values</i>:<br>
<blockquote>» <code>absolute</code>: The position of the tip will be determined by the posX and posY parameters, with no application of the margins and no consideration for where the triggering element is.<br>
» <code>mouse</code>: The position of the tip will be determined by the location of the mouse when the tip is triggered. Margins will be applied.<br>
» <code>element</code>: The position of the tip will be determined by the bottom right corner of the triggering element. Margins will be applied.</blockquote></blockquote>

<blockquote><i>Default</i>: <code>element</code></blockquote>


<b>posX</b>
<blockquote>The absolute position on the x-axis the tooltip will have when displayed.  Only used if the 'position' option is "absolute"</blockquote>

<blockquote><i>Possible values</i>:<br>
<blockquote>» A callback: The function will be passed a jQuery object representing the triggering element and must return an integer.<br />
» An integer<br>
</blockquote><i>Default</i>: <code>0</code></blockquote>


<b>posY</b>
<blockquote>The absolute position on the y-axis the tooltip will have when displayed.  Only used if the 'position' option is "absolute"</blockquote>

<blockquote><i>Possible values</i>:<br>
<blockquote>» A callback: The function will be passed a jQuery object representing the triggering element and must return an integer.<br>
» An integer<br>
</blockquote><i>Default</i>: <code>0</code></blockquote>


<b>source</b>
<blockquote>The source of the value to display</blockquote>

<blockquote><i>Possible values</i>:<br>
<blockquote>» <code>title</code>: Value to display will be pulled from the "title" attribute of the triggering element.<br>
» <code>url</code>: Value to display will be returned by an AJAX call.  This value must be the letters "u", "r", "l", not a web address.  The address to make the call to is defined with the <b>url</b> option.<br>
» A function: Value to display will be returned from the this function.  The function will be passed a jQuery object representing the triggering element.<br>
» Any other string: Will be treated as the value to display.</blockquote></blockquote>

<blockquote><i>Default</i>: <code>title</code></blockquote>


<b>themeroller</b>
<blockquote>Whether to make apply themeroller classes or not</blockquote>

<blockquote><i>Possible values</i>: <code>true</code>, <code>false</code><br>
<i>Default: <code>false</code></blockquote></i>


<b>throbber</b>
<blockquote>The URL to the image to display while the AJAX request is being sent.  If blank, no throbber will be shown.</blockquote>

<blockquote><i>Default</i>: An empty string, ''</blockquote>


<b>url</b>
<blockquote>The web address to make the AJAX request to. Unused if the source option is not "url".</blockquote>

<blockquote><i>Default</i>: An empty string, ''