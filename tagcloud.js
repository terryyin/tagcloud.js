function TagCloud(w, h, context) {
    ctx = context;
    width = w;
    height = h;
}

TagCloud.prototype.render = function(tags) {
    var tags = tags;
    var fontSize = height / 5;
    ctx.font = "" + fontSize + "pt Arial";
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText(tags[0][0], 0, 0);
}

