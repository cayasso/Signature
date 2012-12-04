enyo.kind({
    name: "Signature",
    kind: "enyo.Canvas",
    downloadMime: "image/octet-stream",
    style: "position: relative; background-color: transparent; -webkit-overflow-scrolling:touch;",
    published: {
		width: 500,
		height: 400,
		scale: { w: null, h: null }
    },
    handlers: {
		onup: "up",
        ondown: "down",
        onmove: "move",
        onhold: "hold"
    },
    components: [
		{name: "line", kind: "enyo.canvas.Line", outlineColor: "#222"},
		{name: "x", kind: "enyo.canvas.Text", text: "X", color: "#222", font: "20pt Arial", outlineColor: "#222"},
		{name: "pen", kind: "Pen", color: "transparent", outlineColor: "#000"}
    ],
    create: function () {
		this.inherited(arguments);
		var w = window.innerWidth;
		var h = window.innerHeight;

		if (w <= 320 || w <= 480) {
			this.width = 300;
			this.height = 240;
		}

		this.heightChanged();
		this.widthChanged();
    },
    heightChanged: function () {
		this.setAttribute("height", this.height);
		this.boundsChanged();
    },
    widthChanged: function () {
		this.setAttribute("width", this.width);
		this.boundsChanged();
    },
    boundsChanged: function () {
		this.lineChanged();
		this.xChanged();
    },
    lineChanged: function () {
		var cw = this.width;
		var ch = this.height;
		var lineOffset = Math.round( ch / 10 );
		this.$.line.setStartPoint({x: lineOffset, y: ch - lineOffset -160 });
		this.$.line.setEndPoint({x: cw - (lineOffset), y: ch - lineOffset - 160 });
	},
	xChanged: function () {
		var lineOffset = Math.round( this.height / 3 );
		this.$.x.setBounds({t:this.height - lineOffset - 70, l:lineOffset - 90});
	},
    rendered: function() {
		this.lineChanged();
		this.xChanged();
        this.inherited(arguments);
        if (this.hasNode()) {
			this.canvas = this.node;
			this.context = this.canvas.getContext('2d');
		}
    },
    down: function(inSender, inEvent) {
        if (this.isCanvas(inEvent)) return true;
        this.drawing = true;
        this.updatePosition(inEvent);
    },
    move: function(inSender, inEvent) {
        if (this.isCanvas(inEvent)) return true;
        if (this.drawing) {
			this.updatePosition(inEvent);
        }
    },
    up: function(inSender, inEvent) {
		if (this.isCanvas(inEvent)) return true;
        if (this.drawing) {
			this.drawing = false;
			this.$.pen.clearPoints();
        }
    },
    hold: function(inSender, inEvent) {
		if (this.isCanvas(inEvent)) return true;
		var e = inEvent.srcEvent;
		this.$.pen.drawPoint(e.offsetX || e.layerX, e.offsetY || e.layerY);
    },
    updatePosition: function (inEvent) {
		var e = inEvent.srcEvent;
		this.$.pen.setPoint({ x: e.offsetX || e.layerX, y: e.offsetY || e.layerY});
    },
    toString: function () {
		var dataString = this.getDataString();
		var index = dataString.indexOf( "," ) + 1;
		dataString = dataString.substring( index );
		return dataString;
    },
    getDataString: function (width, height) {
    	var scaledCanvas = this.scaleCanvas(width, height);
		return scaledCanvas.toDataURL("image/png");
    },
	clear: function () {
		this.update();
    },
    isCanvas: function (inEvent) {
		return (inEvent.target.nodeName !== "CANVAS");
    },
	update: function() {
		var ctx = this.context;
		ctx.lineWidth = 1;
		ctx.shadowBlur = 0;
		ctx.shadowColor = "none";
		this.inherited(arguments);
	},
	scaleCanvas: function (width, height) {
		var canvas = this.canvas;
		width = width || this.scale.w;
		height = height || this.scale.h;
		if (width && height) {
			console.log(width, height);
			var _canvas = document.createElement("canvas");
			_canvas.width = width;
			_canvas.height = height;
			_canvas.style.width = width+"px";
			_canvas.style.height = height+"px";
			var _canvasCtx = _canvas.getContext("2d");
			_canvasCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);
			return _canvas;
		}
		return canvas;
	}
});