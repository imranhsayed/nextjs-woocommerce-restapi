import { isEmpty } from 'lodash';

export const FALLBACK = 'blocking';

/**
 * Check if it's a custom page uri.
 *
 *
 * @param uri
 * @return {boolean}
 */
export const isCustomPageUri = ( uri ) => {
	const pagesToExclude = [
		'/',
		'/blog/',
		'/checkout/',
		'/cart/',
		'/thank-you/',
	];
	
	return pagesToExclude.includes( uri );
};

/**
 * Handle Redirect Data.
 *
 * @param defaultProps
 * @param data
 * @param field
 * @return {{notFound: boolean}|*|{redirect: {destination: string, statusCode: number}}}
 */
export const handleRedirectsAndReturnData = ( defaultProps, data, field = '' ) => {
	
	// If no data is available then redirect to 503.
	if ( isEmpty( data ) ) {
		return {
			redirect: {
				destination: '/503',
				statusCode: 301,
			},
		};
	}
	
	// If data for a given field is not available, redirect to 404.
	if ( field && isEmpty( data?.[ field ] ) ) {
		return {
			// returns the default 404 page with a status code of 404
			notFound: true,
		};
	}
	
	return defaultProps;
};
