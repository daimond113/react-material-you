import type { Theme } from "@emotion/react"
import type { Scheme } from "@material/material-color-utilities"

function pxToRem(px: `${number}px` | number, baseSize = 16): `${number}rem` {
	const num = typeof px === "number" ? px : parseFloat(px)
	return `${num / baseSize}rem`
}

export const defaultTheme: Theme = {
	typescale: {
		display: {
			large: {
				lineHeight: pxToRem(64),
				size: pxToRem(57),
				tracking: "0",
				weight: 400,
			},
			medium: {
				lineHeight: pxToRem(52),
				size: pxToRem(45),
				tracking: "0",
				weight: 400,
			},
			small: {
				lineHeight: pxToRem(44),
				size: pxToRem(36),
				tracking: "0",
				weight: 400,
			},
		},
		headline: {
			large: {
				lineHeight: pxToRem(40),
				size: pxToRem(32),
				tracking: "0",
				weight: 400,
			},
			medium: {
				lineHeight: pxToRem(36),
				size: pxToRem(28),
				tracking: "0",
				weight: 400,
			},
			small: {
				lineHeight: pxToRem(32),
				size: pxToRem(24),
				tracking: "0",
				weight: 400,
			},
		},
		title: {
			large: {
				lineHeight: pxToRem(28),
				size: pxToRem(22),
				tracking: "0",
				weight: 400,
			},
			medium: {
				lineHeight: pxToRem(24),
				size: pxToRem(16),
				tracking: pxToRem(0.15),
				weight: 500,
			},
			small: {
				lineHeight: pxToRem(20),
				size: pxToRem(14),
				tracking: pxToRem(0.1),
				weight: 500,
			},
		},
		label: {
			large: {
				lineHeight: pxToRem(20),
				size: pxToRem(14),
				tracking: pxToRem(0.1),
				weight: 500,
			},
			medium: {
				lineHeight: pxToRem(16),
				size: pxToRem(12),
				tracking: pxToRem(0.5),
				weight: 500,
			},
			small: {
				lineHeight: pxToRem(16),
				size: pxToRem(11),
				tracking: pxToRem(0.5),
				weight: 500,
			},
		},
		body: {
			large: {
				lineHeight: pxToRem(24),
				size: pxToRem(16),
				tracking: pxToRem(0.5),
				weight: 400,
			},
			medium: {
				lineHeight: pxToRem(20),
				size: pxToRem(14),
				tracking: pxToRem(0.25),
				weight: 400,
			},
			small: {
				lineHeight: pxToRem(16),
				size: pxToRem(12),
				tracking: pxToRem(0.4),
				weight: 400,
			},
		},
	},
	pxToRem,
	fontFamily: "Roboto Flex, sans-serif",
	breakpoints: {
		extraSmall: "0px",
		small: "600px",
		medium1: "905px",
		medium2: "1240px",
		large: "1440px",
	},
	schemes: {
		light: {} as never,
		dark: {} as never,
	},
	mode: "light",
	shapes: {
		elevation: {
			1: {
				alpha: 0.05,
				shadow: (mode) =>
					mode === "light"
						? "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)"
						: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)",
			},
			2: {
				alpha: 0.08,
				shadow: (mode) =>
					mode === "light"
						? "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)"
						: "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)",
			},
			3: {
				alpha: 0.11,
				shadow: () =>
					"0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
			},
			4: {
				alpha: 0.12,
				shadow: () =>
					"0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)",
			},
			5: {
				alpha: 0.14,
				shadow: () =>
					"0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)",
			},
		},
		radius: {
			full: "9999px",
		},
		iconSize: pxToRem(18),
	},
}

type TypeScaleItemValue = {
	/**
	 * The line height of the text.
	 */
	lineHeight: string
	/**
	 * the font size of the text.
	 */
	size: string
	/**
	 * the tracking (letter spacing) of the text.
	 */
	tracking: string
	/**
	 * the weight of the text.
	 */
	weight: number
}

type TypeScaleItem = {
	large: TypeScaleItemValue
	medium: TypeScaleItemValue
	small: TypeScaleItemValue
}

type ElevationItemValue = {
	alpha: number
	shadow: (mode: "light" | "dark") => string
}

declare module "@emotion/react" {
	export interface Theme {
		/**
		 * The typescale of the theme.
		 */
		typescale: {
			display: TypeScaleItem
			headline: TypeScaleItem
			title: TypeScaleItem
			label: TypeScaleItem
			body: TypeScaleItem
		}
		/**
		 * A utility function to convert a pixel value to a rem value.
		 */
		pxToRem: typeof pxToRem
		/**
		 * The font family to use.
		 * @default "Roboto Flex, sans-serif"
		 */
		fontFamily: string
		/**
		 * Breakpoints for responsive design.
		 */
		breakpoints: {
			extraSmall: string
			small: string
			medium1: string
			medium2: string
			large: string
		}
		/**
		 * Palette schemes (light and dark) for the theme.
		 */
		schemes: {
			light: ReturnType<Scheme["toJSON"]>
			dark: ReturnType<Scheme["toJSON"]>
		}
		/**
		 * The color scheme to use.
		 * @defaultValue "light"
		 */
		mode: "light" | "dark"
		/**
		 * Settings for shapes.
		 */
		shapes: {
			/**
			 * The sheet's elevation properties.
			 */
			elevation: {
				1: ElevationItemValue
				2: ElevationItemValue
				3: ElevationItemValue
				4: ElevationItemValue
				5: ElevationItemValue
			}
			/**
			 * Possible border radius values.
			 */
			radius: {
				/**
				 * @defaultValue "9999px"
				 */
				full: string
			}
			/**
			 * How big an icon in a button should be.
			 */
			iconSize: string
		}
	}
}
