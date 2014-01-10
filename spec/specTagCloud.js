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
        spyOn(ctx, 'fillText');
        spyOn(Math, 'random').and.returnValue(0);
        tagCloud.render([['Only', 1]]);
        expect(ctx.fillText).toHaveBeenCalledWith('Only', 0, jasmine.any(Number));
    });

    it("should find another location when the selected location doesn't fit in the canvas.", function() {
        spyOn(Math, 'random').and.returnValue(1);
        tagCloud.render([['Only', 1]]);
        expect(ctx).toBeFilledOverPercent(3);
    });

    it("should not draw on painted area", function() {
        spyOn(ctx, 'fillText').and.callThrough();
        ctx.fillStyle = "rgb(0,0,0);"
        ctx.fillRect(0, 0, 20, height);
        spyOn(Math, 'random').and.returnValue(0);
        tagCloud.render([['Only', 1]]);
        expect(ctx.fillText.calls.mostRecent().args[1]).toBeGreaterThan(20);
    });

    it("should draw text when 2 tags", function() {
        spyOn(ctx, 'fillText').and.callThrough();
        tagCloud.render([['One', 1], ['Two', 1]]);
        expect(ctx.fillText).toHaveBeenCalledWith('One', jasmine.any(Number), jasmine.any(Number));
        expect(ctx.fillText).toHaveBeenCalledWith('Two', jasmine.any(Number), jasmine.any(Number));
    });
});

