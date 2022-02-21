/* eslint-disable dot-notation */
import { Plugin } from 'ckeditor5/src/core';
import { Collection } from 'ckeditor5/src/utils';
import { createDropdown, SplitButtonView, Model, addListToDropdown } from 'ckeditor5/src/ui';
import TemplateIcon from '../icons/template.svg';

export default class TemplatesUI extends Plugin {
	init() {
		const editor = this.editor;
		this.editor.ui.componentFactory.add( 'templates', locale => {
			// default entry in templates dropdown
			const defaultEntry = [ {
				id: 'default',
				title: 'No templates available at the moment'
			} ];

			// templates supplied through editor config
			let templates = this.editor.config.get( 'templates' ) || [];
			templates = templates.length > 0 ? templates : defaultEntry;

			// dropdown button in toolbar
			const dropdownView = createDropdown( locale, SplitButtonView );

			dropdownView.buttonView.set( {
				withText: false,
				label: 'Templates',
				tooltip: true,
				icon: TemplateIcon
			} );

			const items = new Collection();

			items.addMany( templates.map( template => ( {
				type: 'button',
				model: new Model( {
					withText: true,
					id: template[ 'id' ] || template.title,
					label: template.title
				} ),
				title: template.title
			} ) ) );

			addListToDropdown( dropdownView, items );

			// Disable the placeholder button when the command is disabled.
			const command = editor.commands.get( 'insertTemplate' );
			dropdownView.bind( 'isEnabled' ).to( command );

			dropdownView.on( 'execute', event => {
				const id = event.source.id;

				// stop event and return on default template
				if ( id === 'default' ) {
					event.stop();
					return;
				}

				const template = templates.find( template => template.title === id );

				this.editor.execute( 'insertTemplate', template[ 'html' ] );
			} );

			const trackChangesEditing = editor.plugins.get( 'TrackChangesEditing' );

			trackChangesEditing.enableCommand( 'insertTemplate' );

			return dropdownView;
		} );
	}
}
