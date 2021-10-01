import { Plugin } from 'ckeditor5/src/core';
import InsertTemplateCommand from './insertTemplateCommand';

export default class TemplatesEditing extends Plugin {
	init() {
		this.editor.commands.add( 'insertTemplate', new InsertTemplateCommand( this.editor ) );
	}
}
