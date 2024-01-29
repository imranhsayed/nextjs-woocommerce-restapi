import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';

/**
 * Custom SEO component
 *
 * Used to seo meta tags for each page
 *
 * @param {Object} seo Seo.
 * @param {string} uri Page URI.
 * @see https://www.npmjs.com/package/next-seo
 *
 * @returns {JSX.Element}
 *
 */
const Seo = ( { seo, uri } ) => {
	
	if ( ! Object.keys( seo ).length ) {
		return null;
	}
	
	const {
		title,
		description,
		og_title,
		og_description,
		og_image,
		og_site_name,
		robots,
	} = seo || {};

	const currentLocation = 'undefined' !== typeof window ? window.location.origin : null;
	const opengraphUrl = ( process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : currentLocation ) + uri;
	
	return (
		<NextSeo
			title={ title || og_title }
			description={ description || og_description }
			canonical={ opengraphUrl }
			noindex={ 'noindex' === robots?.index }
			nofollow={ 'nofollow' === robots?.follow }
			robotsProps={{
				maxSnippet: parseInt( robots?.['max-snippet']?.replace( 'max-snippet:', '' ) ?? '' ),
				maxImagePreview: robots?.['max-image-preview']?.replace( 'max-image-preview:', '' ) ?? '',
				maxVideoPreview: parseInt( robots?.['max-video-preview']?.replace( 'max-video-preview:', '' ) ?? '' ),
			}}
			openGraph={ {
				type: 'website',
				locale: 'en_US',
				url: opengraphUrl,
				title: og_title,
				description: og_description,
				images: [
					{
						url: isArray( og_image ) ? ( og_image[0]?.url ?? '' ) : '',
						width: 1280,
						height: 720,
					},
				],
				site_name: og_site_name,
			} }
			twitter={ {
				handle: '@Codeytek',
				site: '@Codeytek',
				cardType: 'summary_large_image',
			} }
		/>
	);
};

Seo.propTypes = {
	seo: PropTypes.object,
};

Seo.defaultProps = {
	seo: {
		title: '',
		description: '',
		og_title: '',
		og_description: '',
		og_image: [],
		og_site_name: '',
		robots: {
			follow: '',
			index: '',
		},
		article_modified_time: '',
	},
};

export default Seo;
