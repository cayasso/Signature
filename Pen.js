enyo.kind({
	name: "Pen",
	kind: "enyo.canvas.Shape",
	points: [],
	context: null,
	published: {
		point: { x: 0, y: 0 }
	},
	renderSelf: function (ctx) {
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.fillStyle = "none";
		ctx.shadowBlur = 1;
		ctx.lineWidth = 3;
		ctx.shadowColor = "black";
		this.context = ctx;
		this.inherited(arguments);
	},
	drawPoints: function () {
		var p, p2;
		var ctx = this.context;
		var points = this.points;
		var len = points.length;
		if (len < 6) return;
		ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);
		for (var i = 1; i < len - 2; i++) {
			p = points[i]; p2 = points[i + 1];
			var c = (p.x + p2.x) / 2,
				d = (p.y + p2.y) / 2;
			ctx.quadraticCurveTo(p.x, p.y, c, d);
		}
		ctx.quadraticCurveTo(p.x, p.y, p2.x, p2.y);
		this.draw(ctx);
	},
	drawPoint: function (x, y) {
		//draw a dot
		var ctx = this.context;
		ctx.beginPath();
		ctx.arc(x, y, 2, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		this.draw(ctx);
	},
	clearPoints: function () {
		this.points.length = 0;
		this.points = [];
	},
	pointChanged: function () {
		this.points.push(this.point);
		this.drawPoints();
	}
});