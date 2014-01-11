function TagCloud(w, h, context) {
    ctx = context;
    canvasWidth = w;
    canvasHeight = h;
}

TagCloud.prototype.render = function(tags) {
    ctx.textBaseline = "top";
    for (tag in tags) {
        this._placeTag(tags[tag][0]);
    }
};

TagCloud.prototype._placeTag = function(tag) {
    var fontSize = canvasHeight / 4;
    var placement;
    while (!(placement = this._getNonOverlappingPlaceWithBestSize(fontSize, tag)))
        fontSize *= 0.9;

    ctx.fillText(tag, placement.x, placement.y);
};

TagCloud.prototype._getNonOverlappingPlaceWithBestSize = function(fontSize, tag) {
    ctx.font = "" + fontSize + "pt Arial";
    ctx.fillStyle = "rgb(0,0,0)";
    var lineHeight=ctx.measureText('M').width * 1.1;
    var matrics = ctx.measureText(tag);

    var base = new BasePlacement(
        (canvasWidth - matrics.width) * Math.random(),
        (canvasHeight - lineHeight) * Math.random()
        );

    var placement;
    while (placement = base.nextPlaceToTry()) {
        if (this._isPlaceEmpty(placement, matrics.width, lineHeight))
            break;
    }
    return placement;
};

TagCloud.prototype._isPlaceEmpty = function(placement, width, height) {
    if (placement.x < 0 || placement.y < 0 || placement.x + width > canvasWidth || placement.y + height > canvasHeight)
        return false;

    var pix = ctx.getImageData(placement.x, placement.y, width, height).data;

    for (var i = 0, n = pix.length; i < n; i += 4) {
        if (pix[i+3]) {
                return false;
        }
    }
    return true;
};

function BasePlacement(x, y) {
    var baseX = x,
        baseY = y,
        tryNumber = 0;

    this.nextPlaceToTry = function() {
        if (tryNumber < this._spiralOffsets.length)
            return {
                x : baseX + this._spiralOffsets[tryNumber][0],
                y : baseY + this._spiralOffsets[tryNumber++][1]
            };
    };
}

BasePlacement.prototype._spiralOffsets = [
    [0, 0],
    [10, 0],
    [-35, 0],
    [280, 0]
];


