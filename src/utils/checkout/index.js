import { isArray, isEmpty } from 'lodash';
import { createCheckoutSession } from 'next-stripe/client' // @see https://github.com/ynnoj/next-stripe
import { loadStripe } from "@stripe/stripe-js";
import { createTheOrder, getCreateOrderData } from './order';
import { clearCart } from '../cart';

/**
 * Handle Stripe checkout.
 *
 * 1. Create Formatted Order data.
 * 2. Create Order using Next.js create-order endpoint.
 * 3. Clear the cart session.
 * 4. On success set show stripe form to true
 *
 * @param input
 * @param products
 * @param setRequestError
 * @param setCart
 * @param setIsStripeOrderProcessing
 *
 * @param setCreatedOrderData
 */
export const handleStripeCheckout = async ( input, products, setRequestError, setCart, setIsStripeOrderProcessing, setCreatedOrderData ) => {
	setIsStripeOrderProcessing( true );
	const orderData = getCreateOrderData( input, products );
	console.log( 'orderData', orderData, products );
	const createCustomerOrder = await createTheOrder( orderData, setRequestError, '' );
	const cartCleared = false;
	// const cartCleared = await clearCart( setCart, () => {} );
	setIsStripeOrderProcessing( false );
	
	
	if ( isEmpty( createCustomerOrder?.orderId ) || cartCleared?.error ) {
		console.log( 'came in' );
		setRequestError( 'Clear cart failed' );
		return null;
	}
	
	// On success show stripe form.
	setCreatedOrderData( createCustomerOrder );
	await createCheckoutSessionAndRedirect( products, input, createCustomerOrder?.orderId );
	
	return createCustomerOrder;
};

/**
 * Create Checkout Session and redirect.
 * @param products
 * @param input
 * @param orderId
 * @return {Promise<void>}
 */
const createCheckoutSessionAndRedirect = async ( products, input, orderId ) => {
	const sessionData = {
		success_url: window.location.origin + `/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${ orderId }`,
		cancel_url: window.location.href,
		customer_email: input.billingDifferentThanShipping ? input?.billing?.email : input?.shipping?.email,
		line_items: getStripeLineItems( products ),
		metadata: getMetaData( input, orderId ),
		payment_method_types: [ 'card' ],
		mode: 'payment',
	};
	const session = await createCheckoutSession( sessionData );
	try {
		const stripe = await loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY );
		if ( stripe ) {
			stripe.redirectToCheckout( { sessionId: session.id } );
		}
	} catch ( error ) {
		console.log( error );
	}
};

/**
 * Get Stripe Line Items
 *
 * @param products
 * @return {*[]|*}
 */
const getStripeLineItems = ( products ) => {
	if ( isEmpty( products ) && ! isArray( products ) ) {
		return [];
	}
	
	return products.map( product => {
		return {
			quantity: product?.qty ?? 0,
			name: product?.name ?? '',
			images: [ product?.image?.sourceUrl ?? '' ],
			amount: Math.round( product?.price * 100 ),
			currency: 'usd',
		};
	} );
};

/**
 * Get meta data.
 *
 * @param input
 * @param {String} orderId Order Id.
 *
 * @returns {{shipping: string, orderId: String, billing: string}}
 */
export const getMetaData = ( input, orderId ) => {
	
	return {
		billing: JSON.stringify(input?.billing),
		shipping: JSON.stringify(input.billingDifferentThanShipping ? input?.billing?.email : input?.shipping?.email),
		orderId,
	};
	
	// @TODO
	// if ( customerId ) {
	//     metadata.customerId = customerId;
	// }
	
}
