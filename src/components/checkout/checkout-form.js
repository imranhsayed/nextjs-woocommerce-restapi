import { useState, useContext } from 'react';
import cx from 'classnames';

import YourOrder from './your-order';
import PaymentModes from './payment-modes';
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import OrderSuccess from './order-success';
import Address from './user-address';
import { AppContext } from '../context';
import CheckboxField from './form-elements/checkbox-field';
import {
	handleBillingDifferentThanShipping,
	handleCreateAccount, handleStripeCheckout,
	setStatesForCountry,
} from '../../utils/checkout';

// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
// const defaultCustomerInfo = {
// 	firstName: 'Imran',
// 	lastName: 'Sayed',
// 	address1: '123 Abc farm',
// 	address2: 'Hill Road',
// 	city: 'Mumbai',
// 	country: 'IN',
// 	state: 'Maharastra',
// 	postcode: '221029',
// 	email: 'codeytek.academy@gmail.com',
// 	phone: '9883778278',
// 	company: 'The Company',
// 	errors: null,
// };

const defaultCustomerInfo = {
	firstName: '',
	lastName: '',
	address1: '',
	address2: '',
	city: '',
	country: '',
	state: '',
	postcode: '',
	email: '',
	phone: '',
	company: '',
	errors: null
}

const CheckoutForm = ( { countriesData } ) => {

	const { billingCountries, shippingCountries } = countriesData || {};

	const initialState = {
		billing: {
			...defaultCustomerInfo,
		},
		shipping: {
			...defaultCustomerInfo,
		},
		createAccount: false,
		orderNotes: '',
		billingDifferentThanShipping: false,
		paymentMethod: 'cod',
	};

	const [ cart, setCart ] = useContext( AppContext );
	const [ input, setInput ] = useState( initialState );
	const [ requestError, setRequestError ] = useState( null );
	const [ theShippingStates, setTheShippingStates ] = useState( [] );
	const [ isFetchingShippingStates, setIsFetchingShippingStates ] = useState( false );
	const [ theBillingStates, setTheBillingStates ] = useState( [] );
	const [ isFetchingBillingStates, setIsFetchingBillingStates ] = useState( false );
	const [ isStripeOrderProcessing, setIsStripeOrderProcessing ] = useState( false );
	const [ createdOrderData, setCreatedOrderData ] = useState( {} );

	/**
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return Null.
	 */
	const handleFormSubmit = async ( event ) => {
		event.preventDefault();

		/**
		 * Validate Billing and Shipping Details
		 *
		 * Note:
		 * 1. If billing is different than shipping address, only then validate billing.
		 * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
		 * the respective states should only be mandatory, if a country has states.
		 */
		const billingValidationResult = input?.billingDifferentThanShipping ? validateAndSanitizeCheckoutForm( input?.billing, theBillingStates?.length ) : {
			errors: null,
			isValid: true,
		};
		const shippingValidationResult = validateAndSanitizeCheckoutForm( input?.shipping, theShippingStates?.length );

		setInput( {
			...input,
			billing: { ...input.billing, errors: billingValidationResult.errors },
			shipping: { ...input.shipping, errors: shippingValidationResult.errors },
		} );

		// If there are any errors, return.
		if ( ! shippingValidationResult.isValid || ! billingValidationResult.isValid ) {
			return null;
		}

		if ( 'stripe-mode' === input.paymentMethod ) {
			const createdOrderData = await handleStripeCheckout( input, cart?.cartItems, setRequestError, setCart, setIsStripeOrderProcessing, setCreatedOrderData );
			return null;
		}

		setRequestError( null );

	};

	/*
	 * Handle onchange input.
	 *
	 * @param {Object} event Event Object.
	 * @param {bool} isShipping If this is false it means it is billing.
	 * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
	 *
	 * @return {void}
	 */
	const handleOnChange = async ( event, isShipping = false, isBillingOrShipping = false ) => {
		const { target } = event || {};

		if ( 'createAccount' === target.name ) {
			handleCreateAccount( input, setInput, target );
		} else if ( 'billingDifferentThanShipping' === target.name ) {
			handleBillingDifferentThanShipping( input, setInput, target );
		} else if ( isBillingOrShipping ) {
			if ( isShipping ) {
				await handleShippingChange( target );
			} else {
				await handleBillingChange( target );
			}
		} else {
			const newState = { ...input, [ target.name ]: target.value };
			setInput( newState );
		}
	};

	const handleShippingChange = async ( target ) => {
		const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value } };
		setInput( newState );
		await setStatesForCountry( target, setTheShippingStates, setIsFetchingShippingStates );
	};

	const handleBillingChange = async ( target ) => {
		const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value } };
		setInput( newState );
		await setStatesForCountry( target, setTheBillingStates, setIsFetchingBillingStates );
	};

	// Loading state. @TODO To be updated with more options.
	const isOrderProcessing = isStripeOrderProcessing;

	return (
		<>
			{ cart ? (
				<form onSubmit={ handleFormSubmit } className="woo-next-checkout-form">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-20">
						<div>
							{/*Shipping Details*/ }
							<div className="billing-details">
								<h2 className="text-xl font-medium mb-4">Shipping Details</h2>
								<Address
									states={ theShippingStates }
									countries={ shippingCountries }
									input={ input?.shipping }
									handleOnChange={ ( event ) => handleOnChange( event, true, true ) }
									isFetchingStates={ isFetchingShippingStates }
									isShipping
									isBillingOrShipping
								/>
							</div>
							<div>
								<CheckboxField
									name="billingDifferentThanShipping"
									type="checkbox"
									checked={ input?.billingDifferentThanShipping }
									handleOnChange={ handleOnChange }
									label="Billing different than shipping"
									containerClassNames="mb-4 pt-4"
								/>
							</div>
							{/*Billing Details*/ }
							{ input?.billingDifferentThanShipping ? (
								<div className="billing-details">
									<h2 className="text-xl font-medium mb-4">Billing Details</h2>
									<Address
										states={ theBillingStates }
										countries={ billingCountries.length ? billingCountries: shippingCountries }
										input={ input?.billing }
										handleOnChange={ ( event ) => handleOnChange( event, false, true ) }
										isFetchingStates={ isFetchingBillingStates }
										isShipping={ false }
										isBillingOrShipping
									/>
								</div>
							) : null }

						</div>
						{/* Order & Payments*/ }
						<div className="your-orders">
							{/*	Order*/ }
							<h2 className="text-xl font-medium mb-4">Your Order</h2>
							<YourOrder cart={ cart }/>

							{/*Payment*/ }
							<PaymentModes input={ input } handleOnChange={ handleOnChange }/>

							<div className="woo-next-place-order-btn-wrap mt-5">
								<button
									disabled={ isOrderProcessing }
									className={ cx(
										'bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full',
										{ 'opacity-50': isOrderProcessing },
									) }
									type="submit"
								>
									Place Order
								</button>
							</div>

							{/* Checkout Loading*/ }
							{ isOrderProcessing && <p>Processing Order...</p> }
							{ requestError && <p>Error : { requestError } :( Please try again</p> }
						</div>
					</div>
				</form>
			) : null }
			{/*	Show message if Order Success @TODO To be updated*/ }
			<OrderSuccess response={ null }/>
		</>
	);
};

export default CheckoutForm;
