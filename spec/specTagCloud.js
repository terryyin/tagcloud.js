describe("TagCloud", function() {
    var rootId = 'testContainer';
    
    beforeEach(function() {
        var container = document.createElement('canvas');
        container.setAttribute('id', rootId);
        container.setAttribute('width', 150);
        container.setAttribute('height', 100);
        document.body.appendChild(container);
        ctx = container.getContext("2d");
    });

    afterEach(function() {
        var container = document.getElementById(rootId);
        container.parentNode.removeChild(container);
    });

    it("should take the whole place when only 1 tag", function() {
        tagCloud = new TagCloud(ctx);
        tagCloud.render([('Only', 1)]);
    });
});

