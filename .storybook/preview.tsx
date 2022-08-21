import { DecoratorFn } from "@storybook/react"
import React from "react"
import { ThemeProvider } from "../src/ThemeProvider"
import { Reset } from "../src/Reset"
import { useDarkMode } from "storybook-dark-mode"

export const decorators: DecoratorFn[] = [
	(Story) => {
		const isDarkMode = useDarkMode()
		return (
			<>
				<Reset />
				<ThemeProvider
					sourceColor="#67c96c"
					theme={{ mode: isDarkMode ? "dark" : "light" }}
				>
					<Story />
				</ThemeProvider>
			</>
		)
	},
]

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}
