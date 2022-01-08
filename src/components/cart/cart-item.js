import React, { useState } from 'react';
import {isEmpty} from "lodash";
import Image from '../image';

const CartItem = ( {
	                   item,
	                   products,
	                   updateCartProcessing,
	                   handleRemoveProductClick,
	                   updateCart,
                   } ) => {
	
	const [productCount, setProductCount] = useState( item.quantity );
	
	/*
	 * When user changes the qty from product input update the cart in localStorage
	 * Also update the cart in global context
	 *
	 * @param {Object} event event
	 *
	 * @return {void}
	 */
	const handleQtyChange = ( event, cartKey, type ) => {
		
		if ( process.browser ) {
			
			event.stopPropagation();
			let newQty;
			
			// If the previous update cart mutation request is still processing, then return.
			if ( updateCartProcessing || ( 'decrement' === type && 1 === productCount ) ) {
				return;
			}
			
			if ( !isEmpty( type ) ) {
				newQty = 'increment' === type ? productCount + 1 : productCount - 1;
			} else {
				// If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
				newQty = ( event.target.value ) ? parseInt( event.target.value ) : 1;
			}
			
			// Set the new qty in state.
			setProductCount( newQty );
			
			if ( products.length ) {
				
				// const updatedItems = getUpdatedItems( products, newQty, cartKey );
				//
				// updateCart( {
				// 	variables: {
				// 		input: {
				// 			clientMutationId: v4(),
				// 			items: updatedItems
				// 		}
				// 	},
				// } );
			}
			
		}
	};
	
	const productImg = item?.data?.images?.[0];
	console.log( 'productImg', productImg );
	
	return (
		<div className="cart-item-wrap grid grid-cols-3 gap-6 mb-5 border p-5">
			<div className="col-span-1 cart-left-col">
				<figure>
					<Image
						width="300"
						height="300"
						altText={productImg?.alt ?? ''}
						sourceUrl={! isEmpty( productImg?.src ) ? productImg?.src : ''} // use normal <img> attributes as props
					/>
				</figure>
			</div>
			
			<div className="col-span-2 cart-right-col">
				<div className="cart-product-title-wrap">
					<h2 className="cart-product-title">{ item?.data?.name }</h2>
					<button className="cart-remove-item" onClick={ ( event ) => handleRemoveProductClick( event, item?.cartKey, products ) }>x</button>
				</div>
				
				<footer className="cart-product-footer">
					{/*Qty*/}
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<button className="increment-btn" onClick={( event ) => handleQtyChange( event, item?.cartKey, 'decrement' )} >-</button>
						<input
							type="number"
							min="1"
							style={{ textAlign: 'center', width: '60px', paddingRight: '0' }}
							data-cart-key={ item?.data?.cartKey }
							className={ `woo-next-cart-qty-input form-control ${ updateCartProcessing ? 'woo-next-cart-disabled' : '' } ` }
							value={ productCount }
							onChange={ ( event ) => handleQtyChange( event, item?.cartKey, '' ) }
						/>
						<button className="decrement-btn" onClick={( event ) => handleQtyChange( event, item?.cartKey, 'increment' )}>+</button>
						{ updateCartProcessing ?
							<img className="woo-next-cart-item-spinner" src={ cartSpinnerGif } alt="spinner"/> : '' }
					</div>
					{/*<div className="">*/}
					{/*	<span className="cart-product-price">{ ( 'string' !== typeof item?.data?.price ) ? item?.data?.price.toFixed( 2 ) : item?.data?.price }</span>*/}
					{/*	<span className="cart-total-price"> {( 'string' !== typeof item?.totalPrice ) ? item?.totalPrice.toFixed( 2 ) : item?.totalPrice }</span>*/}
					{/*</div>*/}
				</footer>
			</div>
		</div>
	)
};

export default CartItem;
