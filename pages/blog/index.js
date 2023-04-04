/**
 * External Dependencies.
 */
import axios from 'axios';

/**
 * Internal Dependencies.
 */
import Layout from '../../src/components/layout';
import Posts from '../../src/components/posts';
import Pagination from '../../src/components/pagination';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getPosts } from '../../src/utils/blog';

/**
 * Blog Component.
 *
 * @param {Object} headerFooter Header Footer Data.
 * @param {Object} postsData Post Data.
 */
const Blog = ( { headerFooter, postsData } ) => {
	const seo = {
		title: 'Blog Page',
		description: 'Blog Page',
		og_image: [],
		og_site_name: 'React WooCommerce Theme',
		robots: {
			index: 'index',
			follow: 'follow',
		},
	}
	
	return (
		<Layout headerFooter={ headerFooter || {} } seo={ seo }>
			<h1>Blog</h1>
			<Posts posts={ postsData?.posts_data ?? [] }/>
			<Pagination pagesCount={ postsData?.page_count ?? 0 } postName="blog"/>
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
			postsData: postsData || {},
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
