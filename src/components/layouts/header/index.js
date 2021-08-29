import Head from 'next/head';
import Link from 'next/link';
import { isEmpty } from 'lodash';

import {BurgerIcon, TailwindIcon} from '../../icons';

const Header = ( { header } ) => {
	
	const { headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon } = header || {};
	
	return (
		<>
			<Head>
				<title>{ siteTitle || 'Nexts WooCommerce' }</title>
				<link rel="icon" href={ favicon || '/favicon.ico' }/>
			</Head>
			<div className="header">
				<nav className="bg-white p-4">
					<div className="flex items-center justify-between flex-wrap container mx-auto">
						<div className="flex items-center flex-shrink-0 text-black mr-20">
							<Link href="/">
								<a>
									{
										siteLogoUrl ? (
											<img className="mr-2" src={ siteLogoUrl } alt={ `${ siteTitle } logo` } width="86"
											     height="86"/>
										) : <TailwindIcon/>
									}
								</a>
							</Link>
							<span>
								<Link href="/">
									<a className="font-semibold text-xl tracking-tight">{ siteTitle || 'WooNext' }</a>
								</Link>
								{ siteDescription ? <p>{ siteDescription }</p> : null }
							</span>
						</div>
						<div className="block lg:hidden">
							<button
								className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
								<BurgerIcon/>
							</button>
						</div>
						<div
							className="h-0 w-full overflow-hidden lg:h-full flex-grow lg:flex lg:items-center lg:w-auto">
							<div className="text-sm font-medium uppercase lg:flex-grow">
								{ ! isEmpty( headerMenuItems ) && headerMenuItems.length ? headerMenuItems.map( menuItem => (
									<Link key={menuItem?.ID} href={ menuItem?.url || '/' }>
										<a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10"
										   dangerouslySetInnerHTML={{__html: menuItem.title}}/>
									</Link>
								) ) : null }
							</div>
							<div className="text-sm font-medium">
								<a href="#responsive-header"
								   className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block m-auto"
									     fill="none" viewBox="0 0 24 24" width="18" height="auto" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
									</svg>
									Profile
								</a>
								<a href="#responsive-header"
								   className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block m-auto"
									     fill="none" viewBox="0 0 24 24" width="18" height="auto" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
									</svg>
									Wishlist
								</a>
								<a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10"
								   href="/cart/">
									<svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block m-auto"
									     fill="none" viewBox="0 0 24 24" width="18" height="auto" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
									</svg>
									Bag
								</a>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Header;
