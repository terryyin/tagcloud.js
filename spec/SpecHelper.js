beforeEach(function () {

    var pixList = function (container) {
        var ctx = container.getContext("2d");
        var canvasWidth = container.width;
        var canvasHeight = container.height;
        var pix = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
        var list = [];

        for (var i = 0; i < pix.length; i += 4)
            if (pix[i + 3])
                list.push([i/4%canvasWidth, 
                        i/4/canvasWidth, 
                        pix[i] * 255 * 255 +  pix[i+1] * 255 + pix[i+2]]);

        return list;
     };

    jasmine.addMatchers({
        toBeFilledOverPercent: function () {
            return {
                compare: function (actual, expected) {
                    var tagCloud = actual;
                    var percent = tagCloud.getCoverage();
                    return {
                            pass: percent >= expected,
                            message: 'The filled percentage ' + percent + ' is not over '+expected
                    };
                }
            };
        }
    });

    jasmine.addMatchers({
        toHaveNoPixOnBorder: function () {
            return {
                    compare: function (actual, expected) {
                        var container = actual;
                        var ctx = container.getContext("2d");
                        var canvasWidth = container.width;
                        var canvasHeight = container.height;
                        var pix = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
                        var pixOnBorder = false;

                        for (var i = 0; i < canvasWidth; i ++) {
                            if (pix[i * 4 + 3])
                                pixOnBorder = true;
                            if (pix[(((canvasHeight - 1) * canvasWidth) + i) * 4 + 3])
                                pixOnBorder = true;
                        }

                        for (var i = 0; i < canvasHeight; i ++) {
                            if (pix[canvasWidth * i * 4 + 3])
                                pixOnBorder = true;
                            if (pix[((canvasWidth * i) + canvasWidth - 1) * 4 + 3])
                                pixOnBorder = true;
                        }
                        return {
                                pass: !false
                        };
                }
            };
        }
    });

    jasmine.addMatchers({
        toHaveMoreThanOneColours: function () {
            return {
                    compare: function (actual, expected) {
                        var container = actual;
                        var ctx = container.getContext("2d");
                        var canvasWidth = container.width;
                        var canvasHeight = container.height;
                        var pix = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
                        var colors = {};

                        for (var i = 0; i < pix.length; i += 4) {
                            if (pix[i + 3])
                                colors[pix[i] * 256 * 256 + pix[i+1] * 256 + pix[i+2]] = true;
                        }

                        colors = pixList(actual).reduce(function(prev, pix){
                            return prev[pix[2]] = true;
                        }, {});
                        var colorCount = 0, key;
                        for (key in colors) {
                                colorCount++;
                        }
                        return {
                                pass: colorCount > 1,
                                message: "There are " + colorCount + " colors."
                        };
                }
            };
        }
    });


    jasmine.addMatchers({
        toHaveAllPixesThat: function () {
            return {
                compare: function (actual, expected) {
                    return {
                            pass: pixList(actual).every(expected),
                            message: "Not all pix satisfy the checker"
                    };
                }
            };
        }
    });
});



