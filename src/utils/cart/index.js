import { getSession, storeSession } from './session';
import { getAddOrViewCartConfig } from './api';
import axios from 'axios';
import { CART_ENDPOINT } from '../constants/endpoints';
import { isEmpty } from 'lodash';

/**
 * Add To Cart Request Handler.
 *
 * @param {int} productId Product Id.
 * @param {int} qty Product Quantity.
 */
export const addToCart = ( productId, qty = 1 ) => {
	
	const storedSession = getSession();
	const addOrViewCartConfig = getAddOrViewCartConfig();
	
	axios.post( CART_ENDPOINT, {
			product_id: productId,
			quantity: qty,
		},
		addOrViewCartConfig,
	)
		.then( ( res ) => {
			
			if ( isEmpty( storedSession ) ) {
				storeSession( res?.headers?.[ 'x-wc-session' ] );
			}
			viewCart();
		} )
		.catch( err => {
			console.log( 'err', err );
		} );
};

/**
 * View Cart Request Handler
 */
export const viewCart = () => {
	
	const addOrViewCartConfig = getAddOrViewCartConfig();
	
	axios.get( CART_ENDPOINT, addOrViewCartConfig )
		.then( ( res ) => {
			console.log( 'res', res );
		} )
		.catch( err => {
			console.log( 'err', err );
		} );
};

