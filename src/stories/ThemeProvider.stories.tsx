import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { ThemeProvider } from "../ThemeProvider"

export default {
	title: "ThemeProvider",
	component: ThemeProvider,
} as ComponentMeta<typeof ThemeProvider>

export const WithURL: ComponentStory<typeof ThemeProvider> = (args) => (
	<ThemeProvider {...args}>Hello world!</ThemeProvider>
)

WithURL.args = {
	fromURL: "https://avatars.githubusercontent.com/u/72147841?v=4",
}

export const WithColor: ComponentStory<typeof ThemeProvider> = (args) => (
	<ThemeProvider {...args}>Hello world!</ThemeProvider>
)

WithColor.args = {
	sourceColor: "#ffffff",
}
