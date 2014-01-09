function TagCloud(context) {
    ctx = context;
}

TagCloud.prototype.render = function(tags) {
    var tags = tags;

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText(tags[0][0], 25, 25);
}

