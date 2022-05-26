/**
 * @module bb-ckeditor5-templates/insertTemplateCommand
 */

import { Command } from 'ckeditor5/src/core';

export default class InsertTemplateCommand extends Command {
	execute( content ) {
		const editor = this.editor;

		const viewFragment = editor.data.processor.toView( content );
		const modelFragment = editor.data.toModel( viewFragment );

		editor.model.insertContent( modelFragment );
	}
}
