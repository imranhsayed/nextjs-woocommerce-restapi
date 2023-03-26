import Layout from '../../src/components/layout';
// import { PER_PAGE_FIRST, totalPagesCount } from '../../src/utils/pagination';
// import Pagination from '../../src/components/blog/pagination';
// import Posts from '../../src/components/blog/posts';
import axios from 'axios';
import { GET_POSTS_ENDPOINT, HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getPosts } from '../../src/utils/blog';

const Blog = ( { headerFooter } ) => {
	// const pagesCount = totalPagesCount( data?.posts?.pageInfo?.offsetPagination?.total ?? 0 );
	return (
		<Layout headerFooter={ headerFooter || {} } seo={null}>
			{/*<Posts posts={data?.posts?.edges ?? []}/>*/}
			{/*<Pagination pagesCount={pagesCount} postName="blog" />*/}
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
