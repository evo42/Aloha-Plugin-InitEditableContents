/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
/**
 * InitEditableContents
 * The plugin will automatically prefill editables with values
 */
GENTICS.Aloha.InitEditableContents = new GENTICS.Aloha.Plugin('com.gentics.aloha.plugins.InitEditableContents');

/**
 * Initialize the plugin
 */
GENTICS.Aloha.InitEditableContents.init = function () {
	var that = this;
	GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha, 'editableCreated', function (event, editable) {
		var config = that.getEditableConfig(editable.obj);

		// determine regex for matching
		var regex = /^\s*$/; // default match: empty or just whitespaces
		if (config && config.regex && typeof config.regex == "function") {
			regex = config.regex;
		}
		
		// determine replace string
		var replace = "<p>&nbsp;</p>"; // add paragraphs by default
		if (config && config.replace) {
			replace = config.replace;
		}
		
		// now execute replacement
		editable.obj.html(editable.obj.html().replace(regex, replace));
	});
};
