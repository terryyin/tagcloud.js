function TagCloud(w, h, context) {
    ctx = context;
    width = w;
    height = h;
}

TagCloud.prototype.render = function(tags) {
    for (tag in tags) {
        var fontSize = height / 5;
        ctx.font = "" + fontSize + "pt Arial";
        ctx.textBaseline = "top";
        ctx.fillStyle = "rgb(0,0,0)";
        var lineHeight=ctx.measureText('M').width;
        var matrics = ctx.measureText(tags[0][0]);
        var x = (width - matrics.width) * Math.random();
        var y = (height - lineHeight) * Math.random();

        ctx.fillText(tags[tag][0], x, y);
    }
}
