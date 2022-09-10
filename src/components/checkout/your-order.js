

import { Fragment } from 'react';
import CheckoutCartItem from "./checkout-cart-item";

const YourOrder = ( { cart } ) => {
	
	return (
		<Fragment>
			{ cart ? (
				<Fragment>
					{/*Product Listing*/}
					<table className="checkout-cart table table-hover w-full mb-10">
						<thead>
						<tr className="woo-next-cart-head-container text-left">
							<th className="woo-next-cart-heading-el" scope="col"/>
							<th className="woo-next-cart-heading-el" scope="col">Product</th>
							<th className="woo-next-cart-heading-el" scope="col">Total</th>
						</tr>
						</thead>
						<tbody>
						{ cart?.cartItems?.length && (
							cart.cartItems.map( ( item, index ) => (
								<CheckoutCartItem key={ item?.productId ?? index } item={ item } />
							) )
						) }
						{/*Total*/}
						<tr className="bg-gray-200">
							<td className=""/>
							<td className="woo-next-checkout-total font-normal text-xl">Total</td>
							<td className="woo-next-checkout-total font-bold text-xl">{ cart?.cartItems?.[ 0 ]?.currency ?? '' }{ cart?.totalPrice ?? '' }</td>
						</tr>
						</tbody>
					</table>
				</Fragment>
			) : '' }
		</Fragment>
	)
};

export default YourOrder;
