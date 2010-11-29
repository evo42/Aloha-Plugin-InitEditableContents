/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
/**
 * InitEditableContents
 * 
 * On standard behaviour the plugin will automatically prefill empty editables with <p>-tags.
 * You can specify your on regular expressions and replacements for each editalbe to tackle
 * more sophisticated replacements, like replacing all occurences of "Aloha" by "Aloha-Editor"
 * (well, ok, this is not tooo challenging either...)
 * 
 * Example configuration:
 * 
 * GENTICS.Aloha.settings = {
 *		"com.gentics.aloha.plugins.InitEditableContents": {
 *			config : {
 *				// these are the default settings for this plugin 
 *				regex : /^\s*$/, // regular expression to be matched
 *				replace : "<p>&nbsp;</p>" // replacement to be made 
 *			},
 *			editables : {
 *				'#content' : {
 *					// editables that match the #content selector will be prefilled with some text if empty
 *					replace : "<p>Write your content here</p>"
 *				}
 *			}
 *		}
 * };
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
