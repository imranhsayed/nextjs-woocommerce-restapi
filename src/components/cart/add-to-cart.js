import { isEmpty } from 'lodash';
import {addToCart} from '../../utils/cart';
import { useContext } from 'react';
import { AppContext } from '../context';

const AddToCart = ( { product } ) => {
	
	const [ cart, setCart ] = useContext( AppContext );
	
	if ( isEmpty( product ) ) {
		return null;
	}
	
	return (
		<button
			className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
			onClick={ () => addToCart( product?.id ?? 0, 1, setCart ) }>
			Add to cart
		</button>
	);
};

export default AddToCart;
