import {
	css,
	Global,
	type Theme,
	ThemeProvider as EmotionThemeProvider,
} from "@emotion/react"
import React from "react"
import {
	argbFromHex,
	themeFromSourceColor,
} from "@material/material-color-utilities"
import { mergeDeepRight as mergeDeep } from "ramda"
import { hexFromArgb, themeFromImage } from "./utils/colors"
import { defaultTheme } from "./utils/theme"

type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>
}

export function ThemeProvider({
	children,
	fromURL,
	sourceColor,
	theme: userTheme,
}: React.PropsWithChildren<
	{ theme?: DeepPartial<Theme> } & (
		| { fromURL: string; sourceColor?: never }
		| { sourceColor: `#${string | number}`; fromURL?: never }
	)
>) {
	const imgRef = React.useRef<HTMLImageElement>(null)
	const [localTheme, setLocalTheme] = React.useState<Partial<Theme>>({})

	React.useEffect(() => {
		if (!imgRef.current || !fromURL) return
		const img = imgRef.current
		img.src = fromURL
		themeFromImage(img).then(({ schemes }) => {
			setLocalTheme({
				schemes: {
					light: schemes.light.toJSON(),
					dark: schemes.dark.toJSON(),
				},
			})
		})
	}, [fromURL])

	React.useEffect(() => {
		if (!sourceColor) return
		const { schemes } = themeFromSourceColor(argbFromHex(sourceColor))
		setLocalTheme({
			schemes: {
				light: schemes.light.toJSON(),
				dark: schemes.dark.toJSON(),
			},
		})
	}, [sourceColor])

	return (
		<EmotionThemeProvider
			theme={
				mergeDeep(defaultTheme, mergeDeep(userTheme ?? {}, localTheme)) as Theme
			}
		>
			<Global
				styles={(theme) => css`
					body {
						font-family: ${theme.fontFamily};
						background-color: ${hexFromArgb(
							theme.schemes[theme.mode].background
						)};
						color: ${hexFromArgb(theme.schemes[theme.mode].onBackground)};
					}
				`}
			/>
			<img
				ref={imgRef}
				css={css`
					display: none;
				`}
				aria-hidden
				crossOrigin="anonymous"
			/>
			{children}
		</EmotionThemeProvider>
	)
}
