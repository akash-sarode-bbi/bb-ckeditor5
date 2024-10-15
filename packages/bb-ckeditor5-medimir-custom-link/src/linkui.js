/* globals document */
/**
 * @module link/linkui
 */

import {
	Plugin
} from 'ckeditor5/src/core';
import { ClickObserver } from 'ckeditor5/src/engine';
import { ButtonView } from 'ckeditor5/src/ui';
import { logWarning } from 'ckeditor5/src/utils';
import { isWidget } from 'ckeditor5/src/widget';
import { Modal } from 'bootstrap';
import { debounce } from 'lodash-es';
import { isLinkElement, LINK_KEYSTROKE } from './utils';

import linkIcon from '../theme/icons/link.svg';

const VISUAL_SELECTION_MARKER_NAME = 'link-ui';

export default class LinkUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'LinkUI';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );
		this._tool = {};
		this._toolHtml = '';

		/**
		 * Stores link configurations.
		 *
		 * @type {Map<String, Object>}
		 * @private
		 */
		this._linkConfigurations = new Map();

		/**
		 * Debounced toc requester. It uses `lodash#debounce` method to delay function call.
		 *
		 * @private
		 * @method
		 */
		this._requestToolDebounced = debounce( this._requestTool, 100 );

		editor.config.define( 'link', { data: { tool: [] } } );
	}

	init() {
		const editor = this.editor;
		const data = editor.config.get( 'link.data' );
		const tool = data.tool;

		editor.editing.view.addObserver( ClickObserver );

		// Renders a fake visual selection marker on an expanded selection.
		editor.conversion.for( 'editingDowncast' ).markerToHighlight( {
			model: VISUAL_SELECTION_MARKER_NAME,
			view: {
				classes: [ 'ck-fake-link-selection' ]
			}
		} );

		// Renders a fake visual selection marker on a collapsed selection.
		editor.conversion.for( 'editingDowncast' ).markerToElement( {
			model: VISUAL_SELECTION_MARKER_NAME,
			view: {
				name: 'span',
				classes: [ 'ck-fake-link-selection', 'ck-fake-link-selection_collapsed' ]
			}
		} );

		// modal creation code
		let modalWrap;
		if ( document.getElementById( 'ckeditorLinkModelWrap' ) ) {
			modalWrap = document.getElementById( 'ckeditorLinkModelWrap' );
			modalWrap.innerHTML = '';
		} else {
			modalWrap = document.createElement( 'div' );
			modalWrap.id = 'ckeditorLinkModelWrap';
			document.body.append( modalWrap );
		}

		this._addModal( modalWrap );
		const linkModalElement = document.getElementById( 'linkModal' );
		this._linkModal = new Modal( linkModalElement, {
			keyboard: false
		} );
		const unlinkButton = document.getElementById( 'unlinkButton' );

		this._createToolbarLinkButton();

		// Attach lifecycle actions to the the modal.
		this._enableUserModalInteractions();

		// tool callback
		const toolCallback = typeof tool == 'function' ? tool.bind( this.editor ) : this.createToolCallback( tool );
		this._linkConfigurations.set( 'tool', { toolCallback } );

		// get dom elements
		const linkType = modalWrap.querySelector( '#linkType' );
		const link = modalWrap.querySelector( '#link' );
		const list = modalWrap.querySelector( '#list' );

		// bind click event on model-success-button
		modalWrap.querySelector( '.modal-success-button' ).onclick = () => {
			const linkTypeValue = linkType.value;
			const listInput = modalWrap.querySelector( 'input[name="listRadioInput"]:checked' );
			let linkValue = link.value;
			if ( linkTypeValue !== '' ) {
				if ( linkTypeValue === 'external' && linkValue != '' ) {
					editor.execute( 'link', linkValue );
					this._hideUI();
				} else if ( listInput ) {
					if ( linkTypeValue === 'tool' ) {
						linkValue = 'INT_TOOL_REF_LINK#' + listInput.value;
					}
					editor.execute( 'link', linkValue );
					this._hideUI();
				}
			}
		};

		document.querySelectorAll( '.close-modal-button' ).forEach( item => {
			item.addEventListener( 'click', () => {
				this._hideUI();
			} );
		} );

		// bind click event on unlink button
		unlinkButton.onclick = () => {
			editor.execute( 'unlink' );
			this._hideUI();
		};

		// bind change event on link type
		linkType.onchange = e => {
			const selectedLinkType = e.target.value;
			if ( selectedLinkType === 'external' || selectedLinkType === '' ) {
				list.classList.add( 'd-none' );
				link.classList.remove( 'd-none' );
			} else {
				list.innerHTML = '';
				if ( selectedLinkType === 'tool' ) {
					list.innerHTML = '<ul class="list-group">' + this._toolHtml + '</ul>';
				}

				link.classList.add( 'd-none' );
				list.classList.remove( 'd-none' );
			}
		};

		if ( toolCallback ) {
			this._requestToolDebounced();
		}

		// const stopEvent = this._stopEvent;
		document.addEventListener( 'keydown', event => {
			if ( event.key === 'Escape' && linkModalElement.classList.contains( 'show' ) ) {
				this._hideUI();
			}
		} );
	}

	/**
	 * Creates a toolbar Link button. Clicking this button will show
	 * a {@link #modal}.
	 *
	 * @private
	 */
	_createToolbarLinkButton() {
		const editor = this.editor;
		const command = editor.commands.get( 'link' );
		const t = editor.t;

		// Handle the `Ctrl+K` keystroke and show the panel.
		editor.keystrokes.set( LINK_KEYSTROKE, ( keyEvtData, cancel ) => {
			// Prevent focusing the search bar in FF, Chrome and Edge. See https://github.com/ckeditor/ckeditor5/issues/4811.
			cancel();

			if ( command.isEnabled ) {
				this._showUI();
			}
		} );

		editor.ui.componentFactory.add( 'link', locale => {
			// The button will be an instance of ButtonView.
			const button = new ButtonView( locale );

			button.isEnabled = true;
			button.label = t( 'Link' );
			button.icon = linkIcon;
			button.keystroke = LINK_KEYSTROKE;
			button.tooltip = true;
			button.isToggleable = true;

			// Bind the state of the button to the command.
			button.bind( 'isEnabled' ).to( command, 'isEnabled' );
			button.bind( 'isOn' ).to( command, 'value', value => !!value );

			// Execute the command when the dropdown item is clicked (executed).
			this.listenTo( button, 'execute', () => {
				this._showUI();
			} );

			return button;
		} );
	}

	/**
	 * append modal html to body
	 *
	 * @private
	 */
	_addModal( modalWrap ) {
		modalWrap.innerHTML = `
			<div class="modal" tabindex="-1" id="linkModal">
				<div class="modal-dialog modal-dialog-scrollable modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Add Link</h5>
							<button type="button" class="btn-close close-modal-button" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<select class="form-select mb-3" id="linkType">
								<option selected value="">Select</option>
								<option value="tool" id="toolSelectInput">Tool Link</option>
								<option value="external" id="externalSelectInput">External Link</option>
							</select>
							<input class="form-control d-none" id="link"/>
							<div class="d-none border-top border-bottom" id="list"
							style="max-height: calc(100vh - 19rem); overflow-y:auto;">
							</div>

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary close-modal-button">Close</button>
							<button type="button" class="btn btn-danger d-none" id="unlinkButton">Unlink</button>
							<button type="button" class="btn btn-primary modal-success-button">OK</button>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	/**
	 * Attaches actions that control whether the modal containing the
	 * {@link #form} is visible or not.
	 *
	 * @private
	 */
	_enableUserModalInteractions() {
		const viewDocument = this.editor.editing.view.document;
		// Handle click on view document and show panel when selection is placed inside the link element.
		// Keep panel open until selection will be inside the same link element.
		this.listenTo( viewDocument, 'click', () => {
			const parentLink = this._getSelectedLinkElement();

			if ( parentLink ) {
				// Then show panel but keep focus inside editor editable.
				this._showUI();
			}
		} );
	}

	/**
	 * Shows the link modal.
	 *
	 * @param {Boolean} forceVisible
	 * @private
	 */
	_showUI() {
		const editor = this.editor;
		const model = editor.model;
		const unlinkButton = document.getElementById( 'unlinkButton' );
		if ( !this._getSelectedLinkElement() ) {
			// Show visual selection on a text without a link when the Modal is displayed.
			// See https://github.com/ckeditor/ckeditor5/issues/4721.
			this._showFakeVisualSelection();
		} else {
			const linkType = document.getElementById( 'linkType' );
			const link = document.getElementById( 'link' );
			const list = document.getElementById( 'list' );
			const selection = model.document.selection;
			let linkHref = selection.getAttribute( 'linkHref' );
			if ( !linkHref ) {
				const selectedElement = selection.getSelectedElement();
				linkHref = selectedElement.getAttribute( 'linkHref' );
			}

			const URL_TOOL_REG_EXP = new RegExp( '^INT_TOOL_REF_LINK#' );
			const URL_EXTERNAL_REG_EXP = new RegExp( '^http|https|ftps|mailto|www|ftp' );

			if ( URL_EXTERNAL_REG_EXP.test( linkHref ) ) {
				linkType.value = 'external';
				link.value = linkHref;
				list.classList.add( 'd-none' );
				link.classList.remove( 'd-none' );
			} else {
				let linkUrl = linkHref;
				if ( URL_TOOL_REG_EXP.test( linkHref ) ) {
					list.innerHTML = '<ul class="list-group">' + this._toolHtml + '</ul>';
					linkType.value = 'tool';
					linkUrl = linkHref.split( 'INT_TOOL_REF_LINK#' )[ 1 ];
				}
				const listInput = document.getElementById( `input_${ linkUrl }` );

				if ( listInput ) {
					listInput.checked = true;
				}
				link.classList.add( 'd-none' );
				list.classList.remove( 'd-none' );
			}
		}
		unlinkButton.classList.remove( 'd-none' );
		this._linkModal.show();

		// Begin responding to ui#update once the UI is added.
		this._startUpdatingUI();
	}

	/**
	 * Hide the link modal.
	 *
	 *
	 * @protected
	 */
	_hideUI() {
		const editor = this.editor;

		// hide form.
		this._linkModal.hide();

		const link = document.getElementById( 'link' );
		link.value = '';

		this.stopListening( editor.ui, 'update' );
		// Make sure the focus always gets back to the editable _before_ removing the focused form view.
		// Doing otherwise causes issues in some browsers. See https://github.com/ckeditor/ckeditor5-link/issues/193.
		editor.editing.view.focus();

		this._hideFakeVisualSelection();
		clearInput();
	}

	_getSelectedLinkElement() {
		const view = this.editor.editing.view;
		const selection = view.document.selection;
		const selectedElement = selection.getSelectedElement();

		// The selection is collapsed or some widget is selected (especially inline widget).
		if ( selection.isCollapsed || selectedElement && isWidget( selectedElement ) ) {
			return findLinkElementAncestor( selection.getFirstPosition() );
		} else {
			// The range for fully selected link is usually anchored in adjacent text nodes.
			// Trim it to get closer to the actual link element.
			const range = selection.getFirstRange().getTrimmed();
			const startLink = findLinkElementAncestor( range.start );
			const endLink = findLinkElementAncestor( range.end );

			if ( !startLink || startLink != endLink ) {
				return null;
			}

			// Check if the link element is fully selected.
			if ( view.createRangeIn( startLink ).getTrimmed().isEqual( range ) ) {
				return startLink;
			} else {
				return null;
			}
		}
	}

	/**
	 * Displays a fake visual selection when the link Modal is displayed.
	 *
	 * This adds a 'link-ui' marker into the document that is rendered as a highlight on selected text fragment.
	 *
	 * @private
	 */
	_showFakeVisualSelection() {
		const model = this.editor.model;

		model.change( writer => {
			const range = model.document.selection.getFirstRange();

			if ( model.markers.has( VISUAL_SELECTION_MARKER_NAME ) ) {
				writer.updateMarker( VISUAL_SELECTION_MARKER_NAME, { range } );
			} else {
				if ( range.start.isAtEnd ) {
					const startPosition = range.start.getLastMatchingPosition(
						( { item } ) => !model.schema.isContent( item ),
						{ boundaries: range }
					);

					writer.addMarker( VISUAL_SELECTION_MARKER_NAME, {
						usingOperation: false,
						affectsData: false,
						range: writer.createRange( startPosition, range.end )
					} );
				} else {
					writer.addMarker( VISUAL_SELECTION_MARKER_NAME, {
						usingOperation: false,
						affectsData: false,
						range
					} );
				}
			}
		} );
	}

	/**
	 * Hides the fake visual selection created in {@link #_showFakeVisualSelection}.
	 *
	 * @private
	 */
	_hideFakeVisualSelection() {
		const model = this.editor.model;

		if ( model.markers.has( VISUAL_SELECTION_MARKER_NAME ) ) {
			model.change( writer => {
				writer.removeMarker( VISUAL_SELECTION_MARKER_NAME );
			} );
		}
	}

	/**
	 * Makes the UI react to the {@link module:core/editor/editorui~EditorUI#event:update} event to
	 * reposition itself when the editor UI should be refreshed.
	 *
	 * See: {@link #_hideUI} to learn when the UI stops reacting to the `update` event.
	 *
	 * @protected
	 */
	_startUpdatingUI() {
		const editor = this.editor;
		const viewDocument = editor.editing.view.document;

		let prevSelectedLink = this._getSelectedLinkElement();
		let prevSelectionParent = getSelectionParent();

		const update = () => {
			const selectedLink = this._getSelectedLinkElement();
			const selectionParent = getSelectionParent();

			// Hide the panel if:
			//
			// * the selection went out of the EXISTING link element. E.g. user moved the caret out
			//   of the link,
			// * the selection went to a different parent when creating a NEW link. E.g. someone
			//   else modified the document.
			// * the selection has expanded (e.g. displaying link actions then pressing SHIFT+Right arrow).
			//
			// Note: #_getSelectedLinkElement will return a link for a non-collapsed selection only
			// when fully selected.
			if ( ( prevSelectedLink && !selectedLink ) ||
				( !prevSelectedLink && selectionParent !== prevSelectionParent ) ) {
				this._hideUI();
			}

			prevSelectedLink = selectedLink;
			prevSelectionParent = selectionParent;
		};

		function getSelectionParent() {
			return viewDocument.selection.focus.getAncestors()
				.reverse()
				.find( node => node.is( 'element' ) );
		}

		this.listenTo( editor.ui, 'update', update );
	}

	/**
	 * Requests a tool from a configured callbacks.
	 *
	 * @private
	 */
	_requestTool() {
		const { toolCallback } = this._linkConfigurations.get( 'tool' );
		const toolResponse = toolCallback();
		const isAsynchronous = toolResponse instanceof Promise;

		// For synchronous toc (e.g. callbacks, arrays) fire the response event immediately.
		if ( !isAsynchronous ) {
			this.createToolCallback( toolResponse );
			return;
		}

		// Handle the asynchronous responses.
		toolResponse
			.then( response => {
				this.createToolCallback( response );
			} )
			.catch( error => {
				// disabled tool option in select dropdown
				const toolElement = document.getElementById( 'toolSelectInput' );
				if ( toolElement ) {
					toolElement.disabled = true;
				}

				/**
				 * Fired whenever the requested promise fails with error.
				 *
				 * @event requestTool:error
				 * @param {Object} data Event data.
				 * @param {Error} data.error The error that was caught.
				 */
				this.fire( 'requestTool:error', { error } );

				/**
				 * The callback used for obtaining custom link tool thrown and error.
				 *
				 * @error link-tool-callback-error
				 */
				logWarning( 'link-tool-callback-error' );
			} );
	}

	// The default tool callback.
	createToolCallback( items ) {
		this._tool = items;
		if ( items ) {
			this._toolHtml = toolHtmlGenerate( items );
		}
	}
}

function toolHtmlGenerate( items ) {
	return items.reduce( function( acc, d ) {
		return acc + `
		<li class="list-group-item list-group-item-action">
		<div class="form-check">
			<input class="form-check-input me-1" name="listRadioInput" type="radio" value="${ d.toolIdentifier }"
			id="input_${ d.toolIdentifier }">
			<label class="form-check-label" for="input_${ d.toolIdentifier }">${ d.toolName }</label>
		</div>
		</li>`;
	}, '' );
}

function clearInput() {
	const linkType = document.getElementById( 'linkType' );
	const link = document.getElementById( 'link' );
	const list = document.getElementById( 'list' );

	linkType.value = '';
	link.value = '';
	list.innerHTML = '';

	link.classList.add( 'd-none' );
	list.classList.add( 'd-none' );
}

// Returns a link element if there's one among the ancestors of the provided `Position`.
//
// @private
// @param {module:engine/view/position~Position} View position to analyze.
// @returns {module:engine/view/attributeelement~AttributeElement|null} Link element at the position or null.
function findLinkElementAncestor( position ) {
	return position.getAncestors().find( ancestor => isLinkElement( ancestor ) );
}
