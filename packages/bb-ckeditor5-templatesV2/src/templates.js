/**
 * @module bb-ckeditor5-templates/templates
*/

import TemplatesEditing from './templatesEditing';
import TemplatesUI from './templatesUi';
import { Plugin } from 'ckeditor5/src/core';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';

export default class Templates extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Templates';
	}

	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ GeneralHtmlSupport, TemplatesEditing, TemplatesUI ];
	}
}
