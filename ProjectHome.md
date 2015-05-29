Tipped is a tooltip plugin initially designed to provide contextual information when an icon is clicked or hovered on. As a result, it does not follow the mouse, nor does it appear relative to the mouse. It appears relative to the element that has the tooltip attached.

## Features ##
  * Customize the tooltips that appear when you hover over links or images
  * Have a custom function callback or an AJAX call as the tooltip source.
  * Add new hover-based tips to any element
  * Create click-based tips to provide contextual content
  * Themeroller compatible

## More Information ##
> [Options »](Options.md)<br>
<blockquote><a href='Code.md'>Example code »</a></blockquote>

<h2>Updates</h2>
<i>February 7, 2011</i>: 2.1.1b:<br>
<ul><li>Fixed a typing bug in the html code for creation of the #tip element, which resulted in Firefox rendering an extra line.</li></ul>

<i>December 15, 2010</i>: 2.1b:<br>
<ul><li>Fixed a bug which resulted in the last matched element becoming the $target for all custom param functions<br>
</li><li>Fixed an typing error in the html code for creation of the #tip element<br>
</li><li>Added (or rather completed) functionality of hideDelay option.  If the Tip is now hovered within hideDelay milliseconds the automatic hiding is cancelled & the tip stays visible until the user hovers out of the tip</li></ul>

<i>November 26, 2010</i>: 2.0b:<br>
Completely refactored the code into a "Tip" class.  Still having problems with resizing too-wide-tips - they're a few pixels wider than the screen currently.<br>
<br>
Also includes updates from v1.5.3 and v1.5.4 (which I failed to upload here.  Updates from those versions include:<br>
<ul><li>Adding logic to allow the tip to appear to the left of the mouse, if the tip would otherwise have appeared over the cursor position.  This fixes a flickering problem that would occur if the tip is being triggered towards the right side of the screen<br>
</li><li>Added a "hideDelay" option to allow the tip to persist after the target has been hovered out.</li></ul>

<i>August 18, 2010</i>: 1.5.2:<br>
<blockquote>Fixed width resizing when tooltip is full window width</blockquote>

<i>June 22, 2010</i>: 1.5.1:<br>
<blockquote>Fixed implementation of 'position':'mouse' option</blockquote>

<i>April 14, 2010</i>: 1.5:<br>
<blockquote>Added the <code>position</code>, <code>posX</code>, <code>posY</code>, and <code>delay</code> options</blockquote>

<i>April 9, 2010</i>: 1.4:<br>
<blockquote>Now applies some styles to ensure the tooltip is within the viewable size of the screen.  Scrollbars appear when necessary.  The  <a href='Options.md'>oversizeStick option</a> was added to allow tooltips that are too large, to automatically revert to 'click' behaviour.</blockquote>

<h2>Contact</h2>
If you want to contact me, do so to <a href='mailto:tls@augustana.ca'>tls@augustana.ca</a> with the subject line "Tipped jQuery plugin"