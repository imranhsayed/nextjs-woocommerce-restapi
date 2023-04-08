/**
 * External Dependencies.
 */
import axios from 'axios';

/**
 * Internal Dependencies.
 */
import {
	GET_COMMENTS_ENDPOINT,
	GET_PAGES_ENDPOINT,
	GET_POST_ENDPOINT,
	GET_POSTS_ENDPOINT,
} from './constants/endpoints';

/**
 * Get Posts.
 *
 * @return {Promise<void>}
 */
export const getPosts = async ( pageNo = 1 ) => {
	return await axios.get( `${ GET_POSTS_ENDPOINT }?page_no=${ pageNo }` )
		.then( res => {
			if ( 200 === res.data.status ) {
				return res;
			} else {
				return {
					posts_data: {},
					error: 'Post not found',
				};
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return {
				posts_data: {},
				error: err.response.data.message
			};
		} );
};

/**
 * Get Post By Slug.
 *
 * @return {Promise<void>}
 */
export const getPost = async ( postSlug = '' ) => {
	return await axios.get( `${ GET_POST_ENDPOINT }?slug=${ postSlug }&_embed` )
		.then( res => {
			if ( 200 === res.status ) {
				return res.data;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );
};

/**
 * Get Pages.
 *
 * @return {Promise<void>}
 */
export const getPages = async () => {
	return await axios.get( `${ GET_PAGES_ENDPOINT }?_embed` )
		.then( res => {
			if ( 200 === res.status ) {
				return res.data;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );
};

/**
 * Get Page By Slug.
 *
 * @return {Promise<void>}
 */
export const getPage = async ( pageSlug = '' ) => {
	return await axios.get( `${ GET_PAGES_ENDPOINT }?slug=${ pageSlug }&_embed` )
		.then( res => {
			if ( 200 === res.status ) {
				return res.data;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );
};

/**
 * Get Post By Slug.
 *
 * @return {Promise<void>}
 */
export const getComments = async ( postID = '' ) => {
	return await axios.get( `${ GET_COMMENTS_ENDPOINT }?slug=${ postID }&_embed` )
		.then( res => {
			if ( 200 === res.status ) {
				return res.data;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );
};
