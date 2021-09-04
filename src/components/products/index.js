import { isArray, isEmpty } from 'lodash';
import Link from 'next/link';
import Image from '../image';

const Products = ({ products }) => {
	
	if ( isEmpty( products ) || !isArray( products ) ) {
		return null;
	}
	
	return (
		<div className="flex flex-wrap -mx-2 overflow-hidden">
			
			{ products.length ? products.map( product => {
				const img = product?.images?.[0] ?? {};
				return (
					<div key={ product?.id } className="my-2 px-2 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
						<Link href={product?.permalink ?? '/'}>
							<a>
								<Image
									sourceUrl={ img?.src ?? '' }
									altText={ img?.alt ?? ''}
									title={ product?.name ?? '' }
									width="380"
									height="380"
								/>
								<h3 className="font-bold uppercase">{ product?.name ?? '' }</h3>
							</a>
						</Link>
					</div>
				)
			} ) : null }
		
		</div>
	)
}

export default Products;
