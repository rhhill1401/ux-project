import type {Config} from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			screens: {
				mobile: '320px',
				tablet: '640px',
				laptop: '1024px',
				desktop: '1280px',
				desktopLarge: '1800px',
				lg: '1024px',
				xl: '1280px',
			},
			colors: {
				links: '#777B80',
				mainBackground: '#E9F2F6',
				primaryBlue: '#5698F0',
				primaryGray: '#404448',
				secondaryGray: '#676D74',
				tertiaryGray: '#3C3F43',
				lightGray: '#DDDFE1',
				ctaYellow: '#F8DB45',
				secondaryText: '#5A5F65',
			},
			lineHeight: {
				'103': '103%',
			},
			fontFamily: {
				helvetica: ['Helvetica', 'Arial', 'sans-serif'],
				openSans: ['Open Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
export default config;
