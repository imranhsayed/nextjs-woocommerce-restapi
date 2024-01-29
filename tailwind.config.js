module.exports = {
	purge: [
		'./src/components/**/*.js',
		'./pages/**/*.js'],
	theme: {
		extend: {
			colors: {
				brand: {
					'orange': '#fd7e35',
					'platinum-black': '#333',
					'bright-grey': '#b1b1b1',
					'gunsmoke-grey': '#8d8d8d',
					'royal-blue': '#3b82f6',
					'wild-blue': '#858Fbb',
					'gun-powder': '#434656',
				}
			},
			fontFamily: {
				'lato': [ 'Lato', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif' ],
				'lato-bold': [ 'Lato Bold', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif' ],
				'lato-heavy': [ 'Lato Heavy', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif' ],
				'lato-heavy-italic': [ 'Lato Heavy Italic', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif' ],
			},
			fontSize: {
				'8px': '8px',
				'9px': '9px',
				'10px': '10px',
				'11px': '11px',
				'12px': '12px',
				'13px': '13px',
				'14px': '14px',
				'15px': '15px',
				'16px': '16px',
				'17px': '17px',
				'18px': '18px',
				'19px': '19px',
				'20px': '20px',
				'21px': '21px',
				'22px': '22px',
				'24px': '24px',
				'26px': '26px',
				'27px': '27px',
				'28px': '28px',
				'30px': '30px',
				'32px': '32px',
				'34px': '34px',
				'36px': '36px',
				'40px': '40px',
				'42px': '42px',
			},
			spacing: {
				'11px': '11px'
			},
			minHeight: {
				'50vh': '50vh'
			},
			height: {
				'600px': '600px',
			},
			lineHeight: {
				'0': '0',
				'1.6': '1.6',
				'12px': '12px',
				'13px': '13px',
				'14px': '14px',
				'16px': '16px',
				'17px': '17px',
				'18px': '18px',
				'19px': '19px',
				'20px': '20px',
				'22px': '22px',
				'24px': '24px',
				'26px': '26px',
				'28px': '28px',
				'30px': '30px',
				'32px': '32px',
				'35px': '35px',
				'36px': '36px',
				'40px': '40px',
				'42px': '42px',
				'48px': '48px',
				'50px': '50px',
				'56px': '56px',
				'72px': '72px',
			},
			letterSpacing: {
				'0.5px': '0.5px',
				'0.1px': '0.1px',
			},
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
