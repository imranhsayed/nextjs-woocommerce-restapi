/**
 * External Dependencies.
 */
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import axios from 'axios';

/**
 * Internal Dependencies.
 */
import Layout from '../../src/components/layout';
import { FALLBACK, handleRedirectsAndReturnData } from '../../src/utils/slug';
import { sanitize } from '../../src/utils/miscellaneous';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getPost, getPosts } from '../../src/utils/blog';

const Post = ( { headerFooter, postData } ) => {
	const router = useRouter();

	console.log( 'postData', postData );

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
		<Layout headerFooter={ headerFooter || {} } seo={ null }>
			{/*<div dangerouslySetInnerHTML={ { __html: sanitize( data?.post?.content ?? {} ) } }/>*/}
		</Layout>
	);
};

export default Post;

export async function getStaticProps( { params } ) {
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: postData } = await getPost( params?.slug ?? '' );

	const defaultProps = {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			postData: postData || {}
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
	
	return defaultProps;

	// return handleRedirectsAndReturnData( defaultProps, postData, 'post' );
}

/**
 * Since the page name 'does not' use catch-all routes,
 * for example [slug],
 * that's why params would contain just slug and not an array of slugs , unlike [...slug].
 * For example, If we need to have dynamic route '/foo/'
 * Then we would add paths: [ params: { slug: 'foo' } } ]
 * Here slug will be 'foo', then Next.js will statically generate the page at /foo/
 *
 * At build time next js will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
	const { data: postsData } = await getPosts();

	const pathsData = [];
	
	postsData?.posts_data.length && postsData?.posts_data.map( post => {
		if ( ! isEmpty( post?.slug ) ) {
			pathsData.push( { params: { slug: post?.slug } } );
		}
	} );

	return {
		paths: pathsData,
		fallback: FALLBACK,
	};
}
