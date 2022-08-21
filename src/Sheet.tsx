import styled from "@emotion/styled"
import { hexFromArgb, overlapTwoColors, rgbFromArgb } from "./utils/colors"

interface SheetProps {
	container?: boolean
	elevation?: 1 | 2 | 3 | 4 | 5
}

export const Sheet = styled.div<SheetProps>`
	background: ${(props) => {
		const theme = props.theme.schemes[props.theme.mode]
		if (!props.elevation) return hexFromArgb(theme.surface)
		const [r, g, b] = rgbFromArgb(theme.primary)
		return overlapTwoColors(
			`rgba(${r}, ${g}, ${b}, ${
				props.theme.shapes.elevation[props.elevation].alpha
			})`,
			hexFromArgb(theme.surface)
		)
	}};
	color: ${(props) =>
		hexFromArgb(props.theme.schemes[props.theme.mode].onSurface)};
	box-shadow: ${(props) =>
		props.elevation &&
		props.theme.shapes.elevation[props.elevation].shadow(props.theme.mode)};
`
