export const HEADER_FOOTER_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`;
export const GET_PRODUCTS_ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products`;

/**
 * Cart
 * @type {string}
 */
export const ADD_TO_CART_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/cart/items/`;
