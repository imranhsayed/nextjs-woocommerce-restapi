/**
 * External Dependencies.
 */
import { isArray, isEmpty } from 'lodash';
import { useRouter } from 'next/router';

/**
 * Internal Dependencies.
 */
import Layout from '../src/components/layout';
import { FALLBACK, handleRedirectsAndReturnData, isCustomPageUri } from '../src/utils/slug';
import { getFormattedDate, getPathNameFromUrl, sanitize } from '../src/utils/miscellaneous';
import { getPage, getPages, getPost, getPosts } from '../src/utils/blog';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';
import Image from '../src/components/image';
import PostMeta from '../src/components/post-meta';

const Page = ( { headerFooter, pageData } ) => {
	const router = useRouter();
	
	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}
	
	return (
		<Layout headerFooter={ headerFooter || {} } seo={ pageData?.yoast_head_json ?? {} }>
			<div className="mb-8 w-4/5 m-auto">
				<figure className="overflow-hidden mb-4">
					<Image
						sourceUrl={ pageData?._embedded[ 'wp:featuredmedia' ]?.[ 0 ]?.source_url ?? '' }
						title={ pageData?.title?.rendered ?? '' }
						width="600"
						height="400"
						layout="fill"
						containerClassNames="w-full h-600px"
					/>
				</figure>
				<PostMeta date={ getFormattedDate( pageData?.date ?? '' ) } authorName={ pageData?._embedded?.author?.[0]?.name ?? '' }/>
				<h1 dangerouslySetInnerHTML={ { __html: sanitize( pageData?.title?.rendered ?? '' ) } }/>
				<div dangerouslySetInnerHTML={ { __html: sanitize( pageData?.content?.rendered ?? '' ) } }/>
			</div>
		</Layout>
	);
};

export default Page;

export async function getStaticProps( { params } ) {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const pageData = await getPage( params?.slug.pop() ?? '' );
	
	const defaultProps = {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			pageData: pageData?.[0] ?? {}
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
	
	return handleRedirectsAndReturnData( defaultProps, pageData );
}

/**
 * Since the page name uses catch-all routes,
 * for example [...slug],
 * that's why params would contain slug which is an array.
 * For example, If we need to have dynamic route '/foo/bar'
 * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
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
	const pagesData = await getPages();
	
	const pathsData = [];
	
	isArray( pagesData ) && pagesData.map( page => {
		
		/**
		 * Extract pathname from url.
		 * e.g.
		 * getPathNameFromUrl( 'https://example.com/hello/hi/' ) will return '/hello/hi'
		 * getPathNameFromUrl( 'https://example.com' ) will return '/'
		 * @type {String}
		 */
		const pathName = getPathNameFromUrl( page?.link ?? '' );
		
		// Build paths data.
		if ( ! isEmpty( pathName ) && ! isCustomPageUri( pathName ) ) {
			const slugs = pathName?.split( '/' ).filter( pageSlug => pageSlug );
			pathsData.push( { params: { slug: slugs } } );
		}
	} );
	
	return {
		paths: pathsData,
		fallback: FALLBACK,
	};
}
