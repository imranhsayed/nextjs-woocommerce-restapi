import Layout from '../src/components/layout';
import {
	HEADER_FOOTER_ENDPOINT,
	WOOCOMMERCE_COUNTRIES_ENDPOINT,
} from '../src/utils/constants/endpoints';
import axios from 'axios';
import CheckoutForm from '../src/components/checkout/checkout-form';

export default function Checkout({ headerFooter, countries }) {
	return (
		<Layout headerFooter={headerFooter || {}}>
			<h1>Checkout</h1>
			<CheckoutForm countriesData={countries}/>
		</Layout>
	);
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: countries } = await axios.get( WOOCOMMERCE_COUNTRIES_ENDPOINT );

	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			countries: countries || {}
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
