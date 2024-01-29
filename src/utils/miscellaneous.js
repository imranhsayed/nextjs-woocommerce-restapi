import DOMPurify from 'dompurify';

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = ( content ) => {
	return 'undefined' !== typeof window ? DOMPurify.sanitize( content ) : content;
};

/**
 * Replace backend url with front-end url.
 *
 * @param {String} data Data.
 *
 * @return formattedData Formatted data.
 */
export const replaceBackendWithFrontendUrl = ( data ) => {
	if ( ! data || 'string' !== typeof data ) {
		return '';
	}
	
	// First replace all the backend-url with front-end url
	let formattedData = data.replaceAll( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, process.env.NEXT_PUBLIC_SITE_URL );
	
	// Replace only the upload urls for images to back-end url, since images are hosted in the backend.
	return formattedData.replaceAll( `${ process.env.NEXT_PUBLIC_SITE_URL }/wp-content/uploads`, `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-content/uploads` );
}

/**
 * Get Formatted Date.
 * @param {String} theDate The date to be formatted.
 * @param {String} locales locales.
 *
 * @return {string} Formatted Date.
 */
export const getFormattedDate = ( theDate = '', locales = 'en-us' ) => {
	const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
	return new Date( theDate ).toLocaleDateString( locales, options );
};

/**
 * Get path name from url.
 *
 * @param {String} url URL.
 *
 * @return {String} URL pathname.
 */
export const getPathNameFromUrl = ( url = '' ) => {
	if ( ! url ) {
		return '';
	}
	const theURL = new URL( url );
	return theURL.pathname;
}

/**
 * Smooth Scroll.
 *
 * Scrolls the given element to the top of the screen
 * minus the topOffset( when provided ), smoothly(with animation).
 *
 * @param {Object} targetEl  element to be scrolled.
 * @param {number} topOffset When target is clicked it will move up until this offset
 *                           from the top of the screen.
 * @param {number} duration  Duration of scroll in milliseconds.
 *
 * @return {null|void} Null.
 */
export const smoothScroll = ( targetEl, topOffset = 0, duration = 500 ) => {
	if ( ! targetEl ) {
		return null;
	}
	
	const targetPosition = targetEl.getBoundingClientRect().top - topOffset;
	const startPosition = window.scrollY; // Current height of the window.
	let startTime = null;
	
	const animationCallBack = ( currentTime ) => {
		if ( null === startTime ) {
			startTime = currentTime;
		}
		const timeElapsed = currentTime - startTime;
		const runPosition = getAnimateWithEasePosition( timeElapsed, startPosition, targetPosition, duration );
		
		window.scrollTo( 0, runPosition );
		if ( timeElapsed < duration ) {
			window.requestAnimationFrame( animationCallBack );
		}
	};
	
	window.requestAnimationFrame( animationCallBack );
};

/**
 * Animation With Ease Position.
 *
 * @param {number} timeElapsed    Time elapsed.
 * @param {number} startPosition  Start position.
 * @param {number} targetPosition Target position.
 * @param {number} duration       Duration in milliseconds.
 *
 * @return {number} Position.
 */
const getAnimateWithEasePosition = ( timeElapsed, startPosition, targetPosition, duration ) => {
	timeElapsed /= duration / 2;
	if ( 1 > timeElapsed ) {
		return ( ( targetPosition / 2 ) * timeElapsed * timeElapsed ) + startPosition;
	}
	timeElapsed--;
	return -( ( targetPosition / 2 ) * ( ( timeElapsed * ( timeElapsed - 2 ) ) - 1 ) ) + startPosition;
};
