/**
 * Display only selected interlanguage links
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/FilterInterlanguageLinks.js]] ([[File:User:Helder.wiki/Tools/FilterInterlanguageLinks.js]])
 */
/*jshint browser: true, camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, trailing: true, maxlen: 120, evil: true, onevar: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';
var enMsgs = {
	'fil-show': 'Show more $1',
	'fil-desc': 'Toggle link(s) which do not appear by default',
	'fil-hide': 'Hide $1'
};
mw.messages.set( $.extend( {}, enMsgs, window.filterInterlanguageLinks && window.filterInterlanguageLinks.msgs ) );
function customize (){
	var // [[meta:List of Wikipedias#1 000 000+ articles]]
		top = [ 'de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'ru', 'sv' ],
		langsToShow = window.filterInterlanguageLinks && window.filterInterlanguageLinks.show || top,
		sel = '.interwiki-' + langsToShow.join( ', .interwiki-' ) + ', .wbc-editpage',
		count = $( '#p-lang' )
			.find( 'li' )
			.filter( function(){
				return ! $( this ).is( sel );
			} )
			.addClass( 'interwiki-hidden-by-default' )
			.hide()
			.length;
	if( !count ){
		return;
	}
	$( mw.util.addPortletLink(
		'p-lang',
		'#',
		mw.msg( 'fil-show', count ),
		'p-show-ilw',
		mw.msg( 'fil-desc' ),
		null,
		$('#p-lang li:last')
	) ).click( function( e ){
		var isVisible = $( '.interwiki-hidden-by-default' ).toggle().is( ':visible' );
		$( e.target ).text(
			isVisible ? mw.msg( 'fil-hide', count ) : mw.msg( 'fil-show', count )
		);
		e.preventDefault();
	} ).addClass( 'fil-toggle' );
}

if( mw.user.options.get('uls-compact-links') !== '1' ){
	$( customize );
}

}( mediaWiki, jQuery ) );