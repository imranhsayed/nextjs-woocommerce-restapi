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
	
	// Replace only the upload urls for images back to back to back-end url, since images are hosted in the backend.
	return formattedData.replaceAll( `${ process.env.NEXT_PUBLIC_SITE_URL }/wp-content/uploads`, `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-content/uploads` );
}
