/**
 * Display only selected interlanguage links
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/FilterInterlanguageLinks.js]] ([[File:User:Helder.wiki/Tools/FilterInterlanguageLinks.js]])
 */
/*jshint browser: true, camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, trailing: true, maxlen: 120, evil: true, onevar: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

mw.messages.set( {
	'fil-show': 'Mostrar mais $1',
	'fil-desc': 'Mostrar/ocultar link(s) que não aparece(m) por padrão',
	'fil-hide': 'Ocultar $1'
} );
function customize (){
	var langsToShow = [ 'de', 'en', 'es', 'fr', 'gl', 'it', 'pt', 'ru', 'zh' ],
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
	} );
}

$( customize );

}( mediaWiki, jQuery ) );