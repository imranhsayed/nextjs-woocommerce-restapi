import { isEmpty } from 'lodash';

import axios from 'axios';
import { ADD_TO_CART_ENDPOINT } from '../../utils/constants/endpoints';
import { getSession, storeSession } from '../../utils/cart/session';
import { getAddOrViewCartConfig, getAddToCartConfig } from '../../utils/cart/api';

const AddToCart = ( { product } ) => {
	
	if ( isEmpty( product ) ) {
		return null;
	}
	
	const addToCart = ( productId, qty = 1 ) => {
		const storedSession = getSession();
		const addOrViewCartConfig = getAddOrViewCartConfig();
		axios.post( ADD_TO_CART_ENDPOINT, {
				product_id: productId,
				quantity: qty,
			},
			addOrViewCartConfig,
		)
			.then( ( res ) => {
				
				if ( ! isEmpty( storedSession ) ) {
					storeSession( res?.headers?.[ 'x-wc-session' ] );
				}
				viewCart();
			} )
			.catch( err => {
				console.log( 'err', err );
			} );
	};
	
	const viewCart = () => {
		const addOrViewCartConfig = getAddOrViewCartConfig();
		axios.get( ADD_TO_CART_ENDPOINT, addOrViewCartConfig )
			.then( ( res ) => {
				console.log( 'res', res );
			} )
			.catch( err => {
				console.log( 'err', err );
			} );
	};
	
	
	return (
		<button
			className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
			onClick={ () => addToCart( product?.id ) }>Add to cart</button>
	);
};

export default AddToCart;
