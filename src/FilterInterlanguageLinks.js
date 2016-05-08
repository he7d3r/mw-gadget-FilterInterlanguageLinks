/**
 * Display only selected interlanguage links
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 */
( function ( mw, $ ) {
	'use strict';
	var enMsgs = {
		'fil-show': 'Show more $1',
		'fil-desc': 'Toggle link(s) which do not appear by default',
		'fil-hide': 'Hide $1'
	};
	mw.messages.set( $.extend( {}, enMsgs, window.filterInterlanguageLinks && window.filterInterlanguageLinks.msgs ) );
	function customize() {
		var // [[m:List of Wikipedias#1 000 000+ articles]]
			top = [ 'de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'ru', 'sv' ],
			langsToShow = window.filterInterlanguageLinks && window.filterInterlanguageLinks.show || top,
			sel = '.interwiki-' + langsToShow.join( ', .interwiki-' ) + ', .wbc-editpage',
			count = $( '#p-lang' )
				.find( 'li' )
				.filter( function () {
					return !$( this ).is( sel );
				} )
				.addClass( 'interwiki-hidden-by-default' )
				.hide()
				.length;
		if ( !count ) {
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
		) ).click( function ( e ) {
			var isVisible = $( '.interwiki-hidden-by-default' ).toggle().is( ':visible' );
			$( e.target ).text(
				isVisible ? mw.msg( 'fil-hide', count ) : mw.msg( 'fil-show', count )
			);
			e.preventDefault();
		} ).addClass( 'fil-toggle' );
	}

	if ( mw.user.options.get('uls-compact-links') !== '1' ) {
		$.when(
			mw.loader.using( 'mediawiki.util' ),
			$.ready
		).then( customize );
	}

}( mediaWiki, jQuery ) );
