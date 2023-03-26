/**
 * External Dependencies.
 */
import axios from 'axios';

/**
 * Internal Dependencies.
 */
import Layout from '../../src/components/layout';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getPosts } from '../../src/utils/blog';
import Posts from '../../src/components/posts';

const Blog = ( { headerFooter, postsData } ) => {
	console.log( 'postsData', postsData );
	return (
		<Layout headerFooter={ headerFooter || {} } seo={null}>
			<h1>Blog</h1>
			<Posts posts={postsData?.posts_data ?? []}/>
			{/*<Pagination pagesCount={postsData?.page_count} postName="blog" />*/}
		</Layout>
	);
};

export default Blog;

export async function getStaticProps() {
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: postsData } = await getPosts();
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			postsData: postsData || {}
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
