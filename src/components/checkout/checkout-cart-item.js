import Image from '../image';
import { isEmpty } from 'lodash';

const CheckoutCartItem = ( { item } ) => {
	
	const productImg = item?.data?.images?.[0] ?? '';
	
	return (
		<tr className="woo-next-cart-item" key={ item?.productId ?? '' }>
			<td className="woo-next-cart-element">
				<figure >
					<Image
						width="50"
						height="50"
						altText={productImg?.alt ?? ''}
						sourceUrl={! isEmpty( productImg?.src ) ? productImg?.src : ''} // use normal <img> attributes as props
					/>
				</figure>
			</td>
			<td className="woo-next-cart-element">{ item?.data?.name ?? '' }</td>
			<td className="woo-next-cart-element">{item?.currency ?? ''}{item?.line_subtotal ?? ''}</td>
		</tr>
	)
};

export default CheckoutCartItem;
