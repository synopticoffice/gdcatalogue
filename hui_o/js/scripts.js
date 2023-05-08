$(document).ready(function() {
	/* Line 1: After the document has fully loaded, run the following code... */

	/*
	 * ************
	 * Toggle class 
	 * ************
	 *
	 * Line 12: When an element with the class 'js-menu-trigger' is clicked...
	 * Line 13: ...toggle the class 'show-menu' on the element 'body' (either add or remove the class)
	*/
	$('.js-menu-trigger').click( function() {
		$('body').toggleClass('show-menu');
	});

});