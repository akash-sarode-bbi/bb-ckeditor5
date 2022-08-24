/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

const config = {
	devtool: 'source-map',
	performance: { hints: false },

	optimization: {
		minimizer: [
			new TerserPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				},
				extractComments: false
			} )
		]
	},

	plugins: [
		new CKEditorWebpackPlugin( {
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en',
			additionalLanguages: 'all'
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} )
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: styles.getPostCssConfig( {
								themeImporter: {
									themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
								},
								minify: true
							} )
						}
					}
				]
			},
			{
				test: /\.ts$/,
				use: [ 'ts-loader' ]
			}
		]
	},
	resolve: {
		extensions: [ '.ts', '.js', '.json' ]
	}
};

module.exports = [
	// The first bundle will have the editor with watchdog and can be used in your application.
	{
		...config,
		entry: path.resolve( __dirname, 'src', 'ckeditor.js' ),
		output: {
			library: 'Watchdog',
			path: path.resolve( __dirname, 'build' ),
			filename: 'ckeditor.js',
			libraryTarget: 'umd',
			libraryExport: 'default'
		}
	},
	// The second bundle will be ready to be uploaded to the Cloud Services server.
	{
		...config,
		entry: path.resolve( __dirname, 'src', 'ckeditor-cs.js' ),
		output: {
			library: 'CKEditorCS',
			path: path.resolve( __dirname, 'build' ),
			filename: 'ckeditor-cs.js',
			libraryTarget: 'umd',
			libraryExport: 'default'
		}
	}
];
