import type { Theme } from "@emotion/react"
import styled from "@emotion/styled"

interface TypographyProps {
	variant?: keyof Theme["typescale"]
	size?: keyof Theme["typescale"][keyof Theme["typescale"]]
}

const defaultVariant: TypographyProps["variant"] = "body"
const defaultSize: TypographyProps["size"] = "small"

export const Typography = styled.div<TypographyProps>`
	font-family: ${(props) => props.theme.fontFamily};
	line-height: ${(props) =>
		props.theme.typescale[props.variant ?? defaultVariant][
			props.size ?? defaultSize
		].lineHeight};
	font-size: ${(props) =>
		props.theme.typescale[props.variant ?? defaultVariant][
			props.size ?? defaultSize
		].size};
	letter-spacing: ${(props) =>
		props.theme.typescale[props.variant ?? defaultVariant][
			props.size ?? defaultSize
		].tracking};
	font-weight: ${(props) =>
		props.theme.typescale[props.variant ?? defaultVariant][
			props.size ?? defaultSize
		].weight};
`
