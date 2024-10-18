/**
 * @module bb-ckeditor5-templates/templatesEditing
*/

import { Plugin } from 'ckeditor5/src/core';
import InsertTemplateCommand from './insertTemplateCommand';

export default class TemplatesEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'TemplatesEditing';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		this.editor.commands.add( 'insertTemplate', new InsertTemplateCommand( this.editor ) );
	}
}
