import { isArray, isEmpty } from 'lodash';
import Link from 'next/link';

const Products = ({ products }) => {
	
	if ( isEmpty( products ) || !isArray( products ) ) {
		return null;
	}
	
	console.warn(products)
	
	return (
		<div className="flex flex-wrap -mx-2 overflow-hidden">
			
			{ products.length ? products.map( product => (
				<div key={ product?.id } className="my-2 px-2 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
					<Link href={product?.permalink ?? '/'}>
						<a>
							<h3>{ product?.name ?? '' }</h3>
						</a>
					</Link>
				</div>
			) ) : null }
		
		</div>
	)
}

export default Products;
