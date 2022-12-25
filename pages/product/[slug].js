/**
 * Internal Dependencies.
 */
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';

/**
 * External Dependencies.
 */
import axios from 'axios';
import { getProductsData, getProductBySlug } from '../../src/utils/products';
import Layout from '../../src/components/layout';
import SingleProduct from '../../src/components/single-product';

export default function Home({ headerFooter, product }) {
	return (
		<Layout headerFooter={headerFooter || {}}>
			<SingleProduct product={ product }/>
		</Layout>
	)
}

export async function getStaticProps( { params } ) {
	
	const { slug } = params || {};
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: product } = await getProductBySlug( slug );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			product: product.length ? product[0] : {}
		},
		revalidate: 1
	};
}

export async function getStaticPaths() {
	const { data: products } = await getProductsData();
	
	const pathsData = [];
	
	products.length && products.map( ( product ) => {
		console.log( 'product slug', product.slug );
		if ( product.slug ) {
			pathsData.push({ params: { slug: product.slug ?? '' } })
		}
	});
	
	console.log( 'count products', products.length );
	console.log( 'pathsData length', pathsData.length );
	
	return {
		paths: pathsData,
		fallback: true
	};
}
