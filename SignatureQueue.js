enyo.kind({
	name: "SignatureQueue",
	published: {
		scale: { w: "", h: "" }
	},
	events: {
		onComplete: "",
		onCancel: ""
	},
	components: [
		{name: "signature", kind: "SignaturePopup", onAccept: "complete", onCancel: "cancel"}
	],
	create: function () {
		this.inherited(arguments);
		this.queue = [];
		this.signatures = [];
	},
	start: function () {
		var signature = this.queue.shift();
		this.scaleChanged();
		this.$.signature.configure({
			key: signature.key,
			text: signature.text,
			copy: signature.copy
		}).show();
	},
	scaleChanged: function () {
		this.$.signature.setScale(this.scale);
	},
	set: function (options) {
		if (options && enyo.isArray(options)) {
			for (var i = 0, option; option = options[i]; i++) {
				this.add(option);
			}
		}
		return this;
	},
	add: function (options) {
		options && this.queue.push(options);
		return this;
	},
	complete: function (source, event) {
		this.signatures.push({type: event.key, signature: event.signature});
		if (this.queue.length) {
			enyo.asyncMethod(this, "start");
		} else {
			this.doComplete({ signatures: this.signatures });
			this.reset();
		}
	},
	cancel: function () {
		this.reset();
		this.doCancel();
	},
	reset: function () {
		this.queue.length = 0;
		this.queue = [];
		this.signatures = [];
	}
});