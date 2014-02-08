
function TagCloud(w, h, context) {
    "use strict";
    this.ctx = context;
    this.canvasWidth = w;
    this.canvasHeight = h;
    this.fontSize = this.canvasHeight / 3;
    this.shape = "rectangle";
}

TagCloud.prototype.setShape = function () {
    this.shape = "circle";
};

TagCloud.prototype.render = function (tags) {
    this.ctx.textBaseline = "top";
    tags.forEach(function (tag) {
        this.placeTag(tag[0]);
    }, this);
};

TagCloud.prototype.placeTag = function (tag) {
    var placement;
    while (!(placement = this._getNonOverlappingPlaceWithBestSize(this.fontSize, tag)))
        this.fontSize *= 0.9;

    this.ctx.fillStyle = this._getRandomColor();
    this.ctx.fillText(tag, placement.x, placement.y);
};

TagCloud.prototype._getNonOverlappingPlaceWithBestSize = function (fontSize, tag) {
    this.ctx.font = "" + fontSize + "pt " + "Arial";
    var lineHeight=this.getLineHeight(fontSize);
    var tagWidth = this.ctx.measureText(tag).width;

    var base = new BasePlacement(
        (this.canvasWidth - tagWidth) * Math.random(),
        (this.canvasHeight - lineHeight) * Math.random(),
        lineHeight
        );

    var placement;
    /* jshint ignore:start */
    while (placement = base.nextPlaceToTry()) {
        if (this._isPlaceEmpty(placement, tagWidth, lineHeight))
            break;
    }
    /* jshint ignore:end */
    return placement;
};

TagCloud.prototype.getLineHeight = function (fontSize) {
    return this.ctx.measureText('M').width * 1.2;
}

TagCloud.prototype._getRandomColor = function (){
    var colors = ["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy", "olive", "orange", "purple", "red", "silver", "teal"];
    return colors[Math.floor(colors.length * Math.random())];
};

TagCloud.prototype._isPlaceEmpty = function (placement, width, height) {
    if (placement.x < 0 || placement.y < 0 || placement.x + width > this.canvasWidth || placement.y + height > this.canvasHeight)
        return false;

    var pix = this.ctx.getImageData(placement.x, placement.y, width, height).data;

    for (var i = 0, n = pix.length; i < n; i += 4)
        if (pix[i+3])
                return false;

    return [[placement.x, placement.y], 
            [placement.x + width, placement.y], 
            [placement.x, placement.y + height], 
            [placement.x + width, placement.y + height]].every(
                function(pos) {
                    var a = this.canvasWidth / 2;
                    var b = this.canvasHeight / 2;
                    var X = pos[0] - a;
                    var Y = pos[1] - b;
                    return (X * X / a / a + Y * Y / b / b < 1);
                }, this);
};

TagCloud.prototype.getCoverage = function () {
    var pix = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
    var pixCount = 0;
    for (var i = 0, n = pix.length; i < n; i += 4) {
        if (pix[i+3])
            pixCount++;
    }
    return pixCount * 100 / this.canvasWidth / this.canvasHeight;
};

function BasePlacement(x, y, h) {
    var baseX = x,
        baseY = y,
        scale = h,
        tryNumber = 0;

    this.nextPlaceToTry = function() {
        if (tryNumber < this._spiralOffsets.length)
            return {
                x : baseX + this._spiralOffsets[tryNumber][0] * scale,
                y : baseY + this._spiralOffsets[tryNumber++][1] * scale
            };
    };
}

function generateSpiralOffsets() {
    var spiralOffsets = [];
    var radius = 0;
    var dr = 0.2;
    for (var i = 0; radius < 40; i+=0.4, radius += dr) {
        spiralOffsets.push([
                   radius * Math.sin(i),
                   radius * Math.cos(i)
                ]);
    }
    return spiralOffsets;
}

BasePlacement.prototype._spiralOffsets = generateSpiralOffsets();

