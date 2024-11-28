/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js';
import AutoLink from '@ckeditor/bb-ckeditor5-medimir-custom-link/src/autolink.js';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace.js';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/bb-ckeditor5-medimir-custom-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties.js';
import { Paragraph } from 'ckeditor5/src/paragraph';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Style from '@ckeditor/ckeditor5-style/src/style';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize.js'; 
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import Templates from '@ckeditor/bb-ckeditor5-templatesV2';  
import { TextTransformation } from 'ckeditor5/src/typing';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

class Editor extends ClassicEditor { }

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	Base64UploadAdapter,
	BlockQuote,
	Bold,
	CKFinder,
	CKFinderUploadAdapter,
	Essentials,
	FindAndReplace,
	GeneralHtmlSupport,
	FontBackgroundColor,
	FontColor,
	FontSize,
	Heading,
	Highlight,
	HorizontalLine,
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	ListProperties,
	Paragraph,
	PictureEditing,
	RemoveFormat,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersText,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	Templates,
	TableCaption,
	TextTransformation,
	Underline
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'superscript',
			'subscript',
			'|',
			'highlight',
			'specialCharacters',
			'|',
			'style',
			'|',
			'fontBackgroundColor',
			'fontColor',
			'fontSize',
			'heading',
			'removeFormat',
			'|',
			'outdent',
			'indent',
			'bulletedList',
			'numberedList',
			'|',
			'blockQuote',
			'link',
			'horizontalLine',
			'alignment',
			'|', 
			'insertTable',
			'templates',
			'imageUpload',
			'ckfinder',
			'findAndReplace'
		]
	}, table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties',
			'toggleTableCaption'
		]
	}, image: {
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

export default Editor;