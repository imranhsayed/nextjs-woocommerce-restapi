import ImageGallery from 'react-image-gallery';
const ProductGallery = ( { items } ) => {
	// Construct Images.
	const images = items.map( ( item ) => {
			return {
				original: item.src,
				thumbnail: item.src,
			};
		},
	);
	
	return <ImageGallery items={images} />;
};

export default ProductGallery;
