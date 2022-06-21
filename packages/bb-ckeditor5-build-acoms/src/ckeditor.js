import EditorWatchdog from '@ckeditor/ckeditor5-watchdog/src/editorwatchdog';
import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/bb-ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/bb-ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/bb-ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/bb-ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/bb-ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/bb-ckeditor5-basic-styles/src/superscript';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/bb-ckeditor5-custom-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import { Paragraph } from 'ckeditor5/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize';
import { TextTransformation } from 'ckeditor5/src/typing';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';
import WProofreader from '@webspellchecker/wproofreader-ckeditor5/src/wproofreader';
import Font from '@ckeditor/ckeditor5-font/src/font';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';

// Core plugin that provides the API for the management of special characters and their categories.
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
// A plugin that combines a basic set of special characters.
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import Style from '@ckeditor/ckeditor5-style/src/style';
import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';

import RealTimeCollaborativeEditing from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting';
// The following plugin enables real-time collaborative comments.
import RealTimeCollaborativeComments from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments';
// The following plugin enables real-time collaborative track changes and is optional.
import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges';
// The following plugin enables users presence list and is optional.
import PresenceList from '@ckeditor/ckeditor5-real-time-collaboration/src/presencelist';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import Templates from '@ckeditor/bb-ckeditor5-templates';

class CKEditorCS extends DecoupledEditorBase {}

// Plugins to include in the build.
CKEditorCS.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Subscript,
	Superscript,
	HorizontalLine,
	Highlight,
	SpecialCharacters,
	SpecialCharactersEssentials,
	Font,
	BlockQuote,
	CKFinder,
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	ListProperties,
	MediaEmbed,
	Mention,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TableProperties,
	TableCellProperties,
	TableCaption,
	TableColumnResize,
	TextTransformation,
	Comments,
	TrackChanges,
	RealTimeCollaborativeEditing,
	RealTimeCollaborativeComments,
	RealTimeCollaborativeTrackChanges,
	PresenceList,
	SourceEditing,
	Style,
	Alignment,
	WordCount,
	WProofreader,
	FindAndReplace,
	GeneralHtmlSupport,
	Templates
];

// Editor configuration.
CKEditorCS.defaultConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'horizontalLine',
			'|',
			'highlight',
			'specialCharacters',
			'|',
			'style',
			'heading',
			'|',
			'findAndReplace',
			'|',
			'numberedList',
			'outdent',
			'indent',
			'alignment',
			'|',
			'link',
			'uploadImage',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'templates',
			'|',
			'comment',
			'trackChanges',
			'wproofreader'
		]
	},
	image: {
		styles: [
			'alignCenter',
			'alignLeft',
			'alignRight'
		],
		toolbar: [
			'imageTextAlternative', 'toggleImageCaption', '|',
			'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', 'imageStyle:side'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties',
			'tableCellProperties',
			'toggleTableCaption'
		]
	},
	wproofreader: {
		lang: 'en_GB', // sets the default language
		serviceId: 'H8nP8rA4Ek8YDqR', // required for the Cloud version only
		srcUrl: 'https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js'
	},
	mention: {
		feeds: [
			{
				marker: '@',
				feed: [ '@Barney', '@Lily', '@Marry Ann', '@Marshall', '@Robin', '@Ted' ],
				minimumCharacters: 1
			}
		]
	},

	// html support must be configured with the following
	// only then all the html tags would be recognized by the CKEditor
	htmlSupport: {
		allow: [
			{
				name: /.*/,
				attributes: true,
				classes: true,
				styles: true
			}
		]
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{
				model: 'heading1',
				view: {
					name: 'p',
					classes: 'h1'
				},
				title: 'Heading 1',
				class: 'h1',
				// It needs to be converted before the standard 'heading1'.
				converterPriority: 'high'
			},
			{
				model: 'heading2',
				view: {
					name: 'p',
					classes: 'h2'
				},
				title: 'Heading 2',
				class: 'h2',
				// It needs to be converted before the standard 'heading2'.
				converterPriority: 'high'
			},
			{
				model: 'heading3',
				view: {
					name: 'p',
					classes: 'h3'
				},
				title: 'Heading 3',
				class: 'h3',
				// It needs to be converted before the standard 'heading3'.
				converterPriority: 'high'
			},
			{
				model: 'heading4',
				view: {
					name: 'p',
					classes: 'h4'
				},
				title: 'Heading 4',
				class: 'h4',
				// It needs to be converted before the standard 'heading4'.
				converterPriority: 'high'
			},
			{
				model: 'heading5',
				view: {
					name: 'p',
					classes: 'h5'
				},
				title: 'Heading 5',
				class: 'h5',
				// It needs to be converted before the standard 'heading5'.
				converterPriority: 'high'
			},
			{
				model: 'heading6',
				view: {
					name: 'p',
					classes: 'h6'
				},
				title: 'Heading 6',
				class: 'h6',
				// It needs to be converted before the standard 'heading6'.
				converterPriority: 'high'
			}
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

export default { CKEditorCS, EditorWatchdog };
