describe("TagCloud", function() {
    var rootId = 'testContainer';
    var canvasWidth = 550;
    var canvasHeight = 400;
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

        ctx.fillStyle = "rgb(0,0,0);"
    });


    afterEach(function() {
        var container = document.getElementById(rootId);
        container.parentNode.removeChild(container);
    });
    it("should take the whole place when only 1 tag", function() {
        tagCloud.render([['Only', 1]]);
        expect(tagCloud).toBeFilledOverPercent(3);
    });

    it("should write the tag at a random place when only 1 tag", function() {
        spyOn(ctx, 'fillText');
        spyOn(Math, 'random').and.returnValue(0);
        tagCloud.render([['Only', 1]]);
        expect(ctx.fillText).toHaveBeenCalledWith('Only', jasmine.any(Number), jasmine.any(Number));
    });

    it("should not draw on painted area", function() {
        var leftFillPixes = canvasWidth/2;
        ctx.fillRect(0, 0, leftFillPixes, canvasHeight);
        spyOn(ctx, 'fillText').and.callThrough();
        spyOn(Math, 'random').and.returnValue(0);
        tagCloud.render([['Only', 1]]);
        expect(ctx.fillText.calls.mostRecent().args[1]).not.toBeLessThan(leftFillPixes);
    });


    it("should use smaller font when no enough space", function() {
        var leftFillPixes = canvasWidth - 30;
        ctx.fillRect(1, 1, leftFillPixes, canvasHeight-2);
        tagCloud.render([['Only', 1]]);
        expect(container).toHaveNoPixOnBorder();
    });

    it("should draw texts when 2 tags", function() {
        spyOn(ctx, 'fillText').and.callThrough();
        tagCloud.render([['One', 1], ['Two', 1]]);
        expect(ctx.fillText).toHaveBeenCalledWith('One', jasmine.any(Number), jasmine.any(Number));
        expect(ctx.fillText).toHaveBeenCalledWith('Two', jasmine.any(Number), jasmine.any(Number));
    });

    it("should have more than 1 colour when more than 1 tag", function() {
        var rand = 0.1;
        spyOn(Math, "random").and.callFake(function() {
            return rand += 0.2;
        });
        //tagCloud.render([['One', 1], ['Two', 1]]);
        //expect(container).toHaveMoreThanOneColours();
    });
    it("should only paint within the given circle shape", function () {
        tagCloud.setShape("circle");
        tagCloud.render([['A', 1], ['A', 1], ['A', 1], ['A', 1], ['A', 1], ['A', 1], ['A', 1], ['A', 1], ['A', 1]]);
        expect(container).toHaveAllPixesThat(function(pix) {
            var a = canvasWidth / 2;
            var b = canvasHeight / 2;
            var X = pix[0] - a;
            var Y = pix[1] - b;
            return (X * X / a / a + Y * Y / b / b <= 1);
        });
    });
});

