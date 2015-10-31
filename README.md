tagcloud.js
===========

Javascript to generate tag cloud with HTML5.

This is used in the lizard (https://github.com/terryyin/lizard) project as an
extension to generate tag cloud of the source code. (For more information,
check out the `lizard -EWordCount` command with lizard.)

## How To Use It

There's only a `TagCloud` class which has one method `render`.

Basically you need to have a HTML5 <canvas> and pass the width, height and the 2D context
of the canvas to create the TagCloud:

```javascript
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    var tagCloud = new TagCloud(canvas.width,
          canvas.height, ctx);
    tagCloud.render([["Apple", 100], ["Orange", 70], ["Banana", 20]]);
  }
}
```

To make sure it works with Retina display:

```javascript
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    // scale 2x for retina displays
    if(window.devicePixelRatio == 2) {
        canvas.setAttribute('width', canvas.width * 2);
        canvas.setAttribute('height', canvas.height * 2);
    }

    var tagCloud = new TagCloud(canvas.width,
        canvas.height, ctx);
    tagCloud.render([["Apple", 100], ["Orange", 70], ["Banana", 20]]);
  }
}
```

codecloud.html is an example. You can save and open it with a browser to see the effect.

## To Be Implemented

The's only a "circle" shape. More shapes should be added.
