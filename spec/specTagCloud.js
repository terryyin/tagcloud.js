describe("TagCloud", function() {
    var rootId = 'testContainer';
    var canvasWidth = 150;
    var canvasHeight = 100;
    var container;
    var ctx;
    var tagCloud;
    
    beforeEach(function() {
        container = document.createElement('canvas');
        container.setAttribute('id', rootId);
        container.setAttribute('width', canvasWidth);
        container.setAttribute('height', canvasHeight);
        document.body.appendChild(container);
        ctx = container.getContext("2d");
        tagCloud = new TagCloud(canvasWidth, canvasHeight, ctx);
    });

    beforeEach(function () {
        jasmine.addMatchers({
            toBeFilledOverPercent: function () {
                return {
                     compare: function (actual, expected) {
                            var ctx = actual;
                            var pix = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
                            var pixCount = 0;
                            for (var i = 0, n = pix.length; i < n; i += 4) {
                                if (pix[i+3])
                                    pixCount++;
                            }
                            var percent = pixCount * 100 / canvasWidth / canvasHeight;
                            return {
                                  pass: percent >= expected,
                                  message: 'The filled percentage ' + percent + ' is not over '+expected
                            };
                    }
                };
            }
        });
    });

    afterEach(function() {
        var container = document.getElementById(rootId);
        container.parentNode.removeChild(container);
    });

    it("should take the whole place when only 1 tag", function() {
        tagCloud.render([['Only', 1]]);
        expect(ctx).toBeFilledOverPercent(3);
    });

    it("should write the tag at a random place when only 1 tag", function() {
        spyOn(ctx, 'fillText').returnValue = 3;
        //spyOn(tagCloud, 'randomX');
        tagCloud.render([['Only', 1]]);
        expect(ctx.fillText).toHaveBeenCalledWith('Only', jasmine.any(Number), jasmine.any(Number));
    });

});

