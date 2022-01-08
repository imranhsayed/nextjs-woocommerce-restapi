import React, { useContext, useState } from 'react';
import { AppContext } from '../context';
import CartItem from './cart-item';

import Link from 'next/link';

const CartItemsContainer = () => {
	const [ cart, setCart ] = useContext( AppContext );
	const { cartItems, totalPrice, totalQty } = cart || {};
	const [ isUpdateCartProcessing, setUpdateCartProcessing ] = useState( false );
	const [ isClearCartProcessing, setClearCartProcessing ] = useState( false );
	console.log( 'cartItems', cartItems );
	/*
	 * Handle remove product click.
	 *
	 * @param {Object} event event
	 * @param {Integer} Product Id.
	 *
	 * @return {void}
	 */
	const handleRemoveProductClick = ( event, cartKey, products ) => {
		event.stopPropagation();
		if ( products.length ) {
			// By passing the newQty to 0 in updateCart Mutation, it will remove the item.
			const newQty = 0;
			// const updatedItems = getUpdatedItems(products, newQty, cartKey);
			//
			// updateCart({
			// 	variables: {
			// 		input: {
			// 			clientMutationId: v4(),
			// 			items: updatedItems,
			// 		},
			// 	},
			// });
		}
	};
	
	// Clear the entire cart.
	const handleClearCart = ( event ) => {
		event.stopPropagation();
		
		// if (isClearCartProcessing) {
		// 	return;
		// }
		//
		// clearCart({
		// 	variables: {
		// 		input: {
		// 			clientMutationId: v4(),
		// 			all: true,
		// 		},
		// 	},
		// });
	};
	
	return (
		<div className="content-wrap-cart">
			{ cart ? (
				<div className="woo-next-cart-table-row grid grid-cols-3 gap-4">
					{/*Cart Items*/ }
					<div className="woo-next-cart-table lg:col-span-2 mb-md-0 mb-5">
						{ cartItems.length &&
						cartItems.map( ( item ) => (
							<CartItem
								key={ item.product_id }
								item={ item }
								updateCartProcessing={ isUpdateCartProcessing }
								products={ cartItems }
								handleRemoveProductClick={ handleRemoveProductClick }
							/>
						) ) }
					</div>
					
					{/*Cart Total*/ }
					<div className="woo-next-cart-total-container lg:col-span-1 p-5">
						<h2>Cart Total</h2>
						<table className="table table-hover">
							<tbody>
							<tr className="table-light">
								<td className="woo-next-cart-element-total">Total</td>
								<td className="woo-next-cart-element-amt">{ totalPrice }</td>
							</tr>
							</tbody>
						</table>
						<Link href="/checkout">
							<button className="btn btn-dark woo-next-large-black-btn">
			                  <span className="woo-next-cart-checkout-txt">
			                    Proceed to Checkout
			                  </span>
								<i className="fas fa-long-arrow-alt-right"/>
							</button>
						</Link>
						{/*Clear entire cart*/}
						<div className="clear-cart">
							<button
								className="btn btn-light "
								onClick={(event) => handleClearCart(event)}
								disabled={isClearCartProcessing}
							>
								<span className="woo-next-cart">Clear Cart</span>
								<i className="fa fa-arrow-alt-right" />
							</button>
							{isClearCartProcessing ? <p>Clearing...</p> : ""}
						</div>
					</div>
				</div>
			) : (
				<div className="container mt-5" style={ { height: '72vh' } }>
					<h2>No items in the cart</h2>
					<Link href="/">
						<button className="btn btn-secondary woo-next-large-black-btn">
              <span className="woo-next-cart-checkout-txt">
                Add New Products
              </span>
							<i className="fas fa-long-arrow-alt-right"/>
						</button>
					</Link>
				</div>
			) }
		</div>
	);
};

export default CartItemsContainer;
