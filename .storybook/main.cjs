const react = require("@vitejs/plugin-react")

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-actions",
		"@storybook/addon-backgrounds",
		"@storybook/addon-controls",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-links",
		"@storybook/addon-measure",
		"@storybook/addon-outline",
		"@storybook/addon-viewport",
		"storybook-dark-mode",
	],
	framework: "@storybook/react",
	core: {
		builder: "@storybook/builder-vite",
	},
	features: {
		storyStoreV7: true,
	},
	async viteFinal(config) {
		config.plugins = config.plugins.filter(
			(plugin) =>
				!(Array.isArray(plugin) && plugin[0]?.name.includes("vite:react"))
		)

		config.plugins.push(
			react({
				exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
				jsxImportSource: "@emotion/react",
				babel: {
					plugins: ["@emotion/babel-plugin"],
				},
			})
		)

		return config
	},
}
