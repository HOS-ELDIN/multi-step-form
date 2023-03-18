/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.{html,js}"],
	theme: {
		fontFamily: {
			serif: ["Ubuntu", "sans-serif"],
		},

		extend: {
			colors: {
				// ### Primary

				marineBlue: " hsl(213, 96%, 18%)", // buttons and main text
				purplishBlue: " hsl(243, 100%, 62%)", // sidebar bg
				pastelBlue: " hsl(228, 100%, 84%)", // marker on numbers
				lightBlue: " hsl(206, 94%, 87%)", // body i think
				strawberryRed: " hsl(354, 84%, 57%)",

				// ### Neutral

				coolGray: " hsl(231, 11%, 63%)", // maybe text
				lightGray: " hsl(229, 24%, 87%)", // text
				magnolia: "hsl(217, 100%, 97%)", // body bg sure
				alabaster: "hsl(231, 100%, 99%)", // hover and selection i think
				white: "hsl(0, 0%, 100%)",
			},
			backgroundImage:{
				desk:'url(../images/bg-sidebar-desktop.svg)',
				mobile:'url(../images/bg-sidebar-mobile.svg)',
			}
		},
	},
	plugins: [],
};
