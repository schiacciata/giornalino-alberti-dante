import svgToDataUri from "mini-svg-data-uri";
import type { Config } from "tailwindcss";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

type ExtractPluginFn<T> = T extends (...args: unknown[]) => unknown
	? never
	: T extends { handler: infer H }
		? H
		: T extends (...args: unknown[]) => infer R
			? R
			: never;

type TailwindPlugin = ExtractPluginFn<NonNullable<Config["plugins"]>[number]>;

const addVariablesForColors: TailwindPlugin = ({ addBase, theme }) => {
	const allColors = flattenColorPalette(theme("colors"));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, `${val}`]),
	);

	addBase({
		":root": newVars,
	});
};

const backgroundsPlugin: TailwindPlugin = ({ matchUtilities, theme }) => {
	matchUtilities(
		{
			"bg-grid": (value) => ({
				backgroundImage: `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
				)}")`,
			}),
			"bg-grid-small": (value) => ({
				backgroundImage: `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
				)}")`,
			}),
			"bg-dot": (value) => ({
				backgroundImage: `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
				)}")`,
			}),
		},
		{
			values: flattenColorPalette(theme("backgroundColor")),
			type: "color",
		},
	);
};

const config = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				shimmer: "shimmer 2s linear infinite",
				"meteor-effect": "meteor 5s linear infinite",
				first: "moveVertical 30s ease infinite",
				second: "moveInCircle 20s reverse infinite",
				third: "moveInCircle 40s linear infinite",
				fourth: "moveHorizontal 40s ease infinite",
				fifth: "moveInCircle 20s ease infinite",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/aspect-ratio"),
		addVariablesForColors,
		backgroundsPlugin,
	],
} satisfies Config;

export default config;
