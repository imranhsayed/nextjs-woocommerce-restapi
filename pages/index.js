/**
 * Internal Dependencies.
 */
import Header from '../src/components/layouts/header';
import Footer from '../src/components/layouts/footer';
import Products from '../src/components/products';
import { GET_PRODUCTS_ENDPOINT, HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';

export default function Home({ headerFooter, products }) {
	console.log( 'headerFooter', headerFooter );
	const { header, footer } = headerFooter || {};
	
	return (
		<div >
			<Header header={header}/>
			<main className="container mx-auto p-4">
				<Products products={products}/>
			</main>
			
			<Footer footer={footer}/>
		</div>
	)
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: productsData } = await axios.get( GET_PRODUCTS_ENDPOINT );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			products: productsData?.products ?? {}
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
