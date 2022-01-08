module.exports = {
	purge: [
		'./src/components/**/*.js',
		'./pages/**/*.js'],
	theme: {
		extend: {
			spacing: {
				'11px': '11px'
			},
			minHeight: {
				'50vh': '50vh'
			}
		},
		container: {
			padding: {
				DEFAULT: '1rem',
				md: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
	},
	variants: {},
	plugins: [
		require( 'tailwindcss' ),
		require( 'precss' ),
		require( 'autoprefixer' )
	]
}
