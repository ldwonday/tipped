## Show title on hover ##
HTML:
```
<img src = "fruit.png" title = "Fruit" alt = "tipped-title-hover" />
```

Javascript:
```
$(document).ready(function(){
  $("img[alt=tipped-title-hover]").tipped();
});
```

## Show some different text on hover ##
HTML:
```
<img src = "fruit.jpg" alt = "tipped-string-hover"/>
```
Javascript:
```
$(document).ready(function(){
  $("img[alt=tipped-string-hover]").tipped({
    source:'This is another string'
  });
});
```

## Show the results of a function on hover ##
HTML:
```
<img src = "fruit.jpg" alt = "tipped-function-hover"/>
```
Javascript:
```
$(document).ready(function(){
  $("img[alt=tipped-function-hover]").tipped({
    source:function($trigger){
      var $allIcons = $("img[src$='fruit.png']");
      var index = $allIcons.index($trigger);
							
      return "This is icon #"+index+" of "+$allIcons.length;
    }
  });
});
```

## Show the results of an AJAX call on hover ##
HTML:
```
<img src = "fruit.jpg" alt = "tipped-ajax-hover"/>
```
Javascript:
```
$(document).ready(function(){
  $("img[alt=tipped-ajax-hover]").tipped({
    source:'url',
    throbber:'/path/to/animated.gif',
    url:'http://path.to/file'
  });
});
```
_If your AJAX returned content is static, use the ["cache" option](Options.md) to cache AJAX results & prevent repeated AJAX calls being triggered by the same element._


## Show the results of an AJAX call on click ##

HTML:
```
<img src = "fruit.jpg" alt = "tipped-ajax-click"/>
```
Javascript:
```
$(document).ready(function(){
  $("img[alt=tipped-ajax-hover]").tipped({
    mode:'click'
    source:'url',
    throbber:'/path/to/animated.gif',
    url:'http://path.to/file'
  });
});
```