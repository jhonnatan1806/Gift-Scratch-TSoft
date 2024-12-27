/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
            backgroundImage: {
				// Agrega patrones personalizados
				'pattern-snowflake': `url(./snowflake.png)`,
			},
			backgroundSize: {
				'pattern-small': '400px 400px',
			},
        },
	},
	plugins: [],
};
