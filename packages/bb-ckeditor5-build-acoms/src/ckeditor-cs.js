import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/bb-ckeditor5-basic-styles/src/bold';
import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Italic from '@ckeditor/bb-ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/bb-ckeditor5-custom-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import { Paragraph } from 'ckeditor5/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
// The following plugin enables users presence list and is optional.
import PresenceList from '@ckeditor/ckeditor5-real-time-collaboration/src/presencelist';
// The following plugin enables real-time collaborative comments.
import RealTimeCollaborativeComments from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments';
import RealTimeCollaborativeEditing from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting';
// The following plugin enables real-time collaborative track changes and is optional.
import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges';
// Core plugin that provides the API for the management of special characters and their categories.
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
// A plugin that combines a basic set of special characters.
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import Strikethrough from '@ckeditor/bb-ckeditor5-basic-styles/src/strikethrough';
import Style from '@ckeditor/ckeditor5-style/src/style';
import Subscript from '@ckeditor/bb-ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/bb-ckeditor5-basic-styles/src/superscript';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Templates from '@ckeditor/bb-ckeditor5-templates';
import { TextTransformation } from 'ckeditor5/src/typing';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';
import Underline from '@ckeditor/bb-ckeditor5-basic-styles/src/underline';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';
import WProofreader from '@webspellchecker/wproofreader-ckeditor5/src/wproofreader';
class CKEditorCS extends DecoupledEditorBase {}

// Plugins to include in the build.
CKEditorCS.builtinPlugins = [
	Alignment,
	Autoformat,
	BlockQuote,
	Bold,
	Comments,
	CKFinder,
	CKFinderUploadAdapter,
	CloudServices,
	Essentials,
	FindAndReplace,
	GeneralHtmlSupport,
	Heading,
	Highlight,
	HorizontalLine,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	ListProperties,
	Mention,
	Paragraph,
	PasteFromOffice,
	PresenceList,
	RealTimeCollaborativeEditing,
	RealTimeCollaborativeComments,
	RealTimeCollaborativeTrackChanges,
	SpecialCharacters,
	SpecialCharactersEssentials,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	Table,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TableCaption,
	TextTransformation,
	Templates,
	TrackChanges,
	Underline,
	WordCount,
	WProofreader
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
			'ckfinder',
			'blockQuote',
			'insertTable',
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
	// html support must be configured with the following
	// only then all the html tags would be recognized by the CKEditor
	htmlSupport: {
		allow: [
			// Enables block elements.
			{
				name: /^(ul|ol|li|section|nav|article|dl|dt|dd|center)$/,
				attributes: true,
				classes: true,
				styles: true
			},
			{
				name: /^(pre|p|blockquote|li|div|address|aside|main|details|summary|fieldset|legend|header|footer|form|dir|menu)$/,
				attributes: true,
				classes: true,
				styles: true
			},
			{
				name: /^(table|tbody|thead|tfoot|tr|td|th|caption|figcaption|img|figure|header|footer|form|h1|h2|h3|h4|h5|h6|)$/,
				attributes: true,
				classes: true,
				styles: true
			},
			// Enables inline elements.
			{
				name: /^(acronym|tt|font|time|big|small|samp|q|output|kbd|bdi|bdo|abbr|a|strong|b|i|em|s|del|ins|u|sub|sup)$/,
				attributes: true,
				classes: true,
				styles: true
			},
			{
				name: /^(code|mark|span|cite|label|dfn|object|iframe|input|button|textarea|select|video|embed|oembed)$/,
				attributes: true,
				classes: true,
				styles: true
			},
			{
				name: /^(audio|img|canvas|meter|progress|script|style)$/,
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

export default CKEditorCS;
