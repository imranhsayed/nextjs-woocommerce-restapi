/**
 * External Dependencies
 */

import Head from 'next/head';

/**
 * Internal Dependencies.
 */
import { AppProvider } from '../context';
import Header from './header';
import Footer from './footer';
import Seo from '../seo';
import { replaceBackendWithFrontendUrl, sanitize } from '../../utils/miscellaneous';


const Layout = ({children, headerFooter, seo, uri }) => {
	const { header, footer } = headerFooter || {};
	const yoastSchema = seo?.schema ? replaceBackendWithFrontendUrl( JSON.stringify( seo.schema ) ) : null;

	return (
		<AppProvider>
			<div>
				<Seo seo={ seo || {} } uri={ uri || '' }/>
				<Head>
					{ header?.favicon ? <link rel="shortcut icon" href={ header.favicon }/> : null }
					{ yoastSchema ? ( <script
							type="application/ld+json"
							className="yoast-schema-graph"
							key="yoastSchema"
							dangerouslySetInnerHTML={ { __html: sanitize( yoastSchema ) } }
						/> ) : null }
				</Head>
				<Header header={header}/>
				<main className="container mx-auto py-4 min-h-50vh">
					{children}
				</main>
				<Footer footer={footer}/>
			</div>
		</AppProvider>
	)
}

export default Layout
