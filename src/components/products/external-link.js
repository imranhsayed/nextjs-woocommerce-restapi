import Link from 'next/link';

const ExternalLink = ( { url, text } ) => {
	
	if ( ! url || ! text ) {
		return null;
	}
	
	return <Link href={ url }>
		<a target="_blank"
		   className="duration-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow bg-white hover:bg-gray-100">
			{ text }
		</a>
	</Link>;
};

export default ExternalLink;
