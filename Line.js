/**
	_enyo.canvas.Line_ is a canvas control that draws a line fitting the
	parameters specified in the	_startPoint_ and _endPoint_ property.
*/
enyo.kind({
	name: "enyo.canvas.Line",
	kind: enyo.canvas.Shape,
	published: {
		startPoint: {x:0, y:0},
		endPoint: {x:0, y:0}
	},
	//* @protected
	renderSelf: function (ctx) {
		ctx.beginPath();
		ctx.moveTo(this.startPoint.x, this.startPoint.y);
		ctx.lineTo(this.endPoint.x, this.endPoint.y);
		this.draw(ctx);
	}
});