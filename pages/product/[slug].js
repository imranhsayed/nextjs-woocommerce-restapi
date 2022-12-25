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
	console.log( 'hey', product );
	
	return (
		<Layout headerFooter={headerFooter || {}}>
			<SingleProduct product={ product }/>
		</Layout>
	)
}

export async function getStaticProps( context ) {
	
	const { params: { slug } } = context;
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: product } = await getProductBySlug( slug );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			product: product[0] ?? {}
		},
		revalidate: 1
	};
}

export async function getStaticPaths() {
	const { data: products } = await getProductsData();
	
	const pathsData = [];
	
	products.length && products.map((product) => {
		if ( product.slug ) {
			pathsData.push({ params: { slug: product?.slug } })
		}
	})
	
	return {
		paths: pathsData,
		fallback: true
	};
}
