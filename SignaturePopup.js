enyo.kind({
	name: "SignaturePopup",
	kind: "onyx.Popup",
	classes: "signature-popup",
	scrim: true,
	centered: true,
	floating: true,
	autoDismiss: false,
	published: {
		text: "Please write your signature",
		copy: "",
		showCancelButton: true,
		key: "",
		scale: { w: null, h: null }
	},
	events: {
		onAccept: "",
		onCancel: ""
	},
	components: [
		{name: "text", classes: "signature-popup-text"},
		{name: "copy", tag: "p", classes: "signature-popup-copy"},
		{tag: "br"},
		{name: "signature", kind: "Signature"},
		{tag: "br"},
		{kind: "onyx.Button", name: "cancel", classes: "signature-cancel-btn", content: "CANCEL", ontap: "cancel"},
		{kind: "onyx.Button", name: "clear", classes: "signature-clear-btn", content: "CLEAR", ontap: "clear"},
		{kind: "onyx.Button", name: "accept", classes: "signature-accept-btn open-button", content: "ACCEPT", ontap: "accept"}
	],
	create: function () {
		this.inherited(arguments);
		this.textChanged();
		this.copyChanged();
		this.showCancelButtonChanged();
		this.scaleChanged();
	},
	configure: function (options) {
		if (options) {
			this.setKey(options.key || this.key);
			this.setText(options.text || this.text);
			this.setCopy(options.copy || this.copy);
		}
		return this;
	},
	textChanged: function () {
		this.$.text.setContent(this.text);
	},
	copyChanged: function () {
		this.$.copy.setContent(this.copy);
	},
	showCancelButtonChanged: function () {
		this.$.cancel.setShowing(this.showCancelButton);
	},
	scaleChanged: function () {
		this.$.signature.setScale(this.scale);
	},
	clear: function () {
		this.$.signature.update();
	},
	accept: function (inSource, inEvent) {
		var signature = this.$.signature.getDataString() || null;
		this.doAccept({ signature: signature, key: this.key });
		this.close();
	},
	close: function () {
		this.clear();
		this.hide();
	},
	cancel: function () {
		this.close();
		this.doCancel();
	}
});