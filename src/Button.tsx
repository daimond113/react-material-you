import styled from "@emotion/styled"
import { hexFromArgb, overlapTwoColors, rgbFromArgb } from "./utils/colors"

interface ButtonProps {
	icon?: boolean
}

const BaseButton = styled.button<ButtonProps>`
	border: none;
	border-radius: ${(props) => props.theme.shapes.radius.full};
	font-family: ${(props) => props.theme.fontFamily};
	font-size: ${(props) => props.theme.typescale.label.large.size};
	font-weight: ${(props) => props.theme.typescale.label.large.weight};
	letter-spacing: ${(props) => props.theme.typescale.label.large.tracking};
	line-height: ${(props) => props.theme.typescale.label.large.lineHeight};
	display: flex;
	align-items: center;

	&:disabled {
		color: ${(props) => {
			const [r, g, b] = rgbFromArgb(
				props.theme.schemes[props.theme.mode].onSurface
			)
			return `rgba(${r}, ${g}, ${b}, 0.38)`
		}};
	}

	&:not(:disabled) {
		cursor: pointer;
	}

	& > .material_icon {
		margin-right: 8px;
		width: ${(props) => props.theme.componentStyles.button.iconSize};
		height: ${(props) => props.theme.componentStyles.button.iconSize};
	}
`

export type Button = typeof BaseButton

export const FilledButton = styled(BaseButton)`
	padding: 10px 24px 10px ${(props) => (props.icon ? "16px" : "24px")};
	background: ${(props) =>
		hexFromArgb(props.theme.schemes[props.theme.mode].primary)};
	color: ${(props) =>
		hexFromArgb(props.theme.schemes[props.theme.mode].onPrimary)};

	&:hover:not(:disabled) {
		box-shadow: ${(props) =>
			props.theme.shapes.elevation[1].shadow(props.theme.mode)};
		background: ${(props) =>
			overlapTwoColors(
				props.theme.mode === "light"
					? `rgba(255, 255, 255, ${props.theme.componentStates.hoverOpacity})`
					: `rgba(208, 188, 255, ${props.theme.componentStates.hoverOpacity})`,
				hexFromArgb(props.theme.schemes[props.theme.mode].primary)
			)};
	}

	&:active:not(:disabled) {
		box-shadow: none;
		background: ${(props) =>
			overlapTwoColors(
				props.theme.mode === "light"
					? `rgba(255, 255, 255, ${props.theme.componentStates.pressedOpacity})`
					: `rgba(208, 188, 255, ${props.theme.componentStates.pressedOpacity})`,
				hexFromArgb(props.theme.schemes[props.theme.mode].primary)
			)};
	}

	&:disabled {
		background: ${(props) =>
			props.theme.mode === "light"
				? `rgba(31, 31, 31, ${props.theme.componentStates.pressedOpacity})`
				: `rgba(227, 227, 227, ${props.theme.componentStates.pressedOpacity})`};
	}
`

export const TextButton = styled(BaseButton)`
	padding: 10px ${(props) => (props.icon ? "16px" : "12px")} 10px
		${(props) => (props.icon ? "16px" : "12px")};
	color: ${(props) =>
		hexFromArgb(props.theme.schemes[props.theme.mode].primary)};
	background: transparent;

	&:hover:not(:disabled) {
		background: ${(props) => {
			const [r, g, b] = rgbFromArgb(
				props.theme.schemes[props.theme.mode].primary
			)
			return `rgba(${r}, ${g}, ${b}, ${props.theme.componentStates.hoverOpacity})`
		}};
	}

	&:active:not(:disabled) {
		background: ${(props) => {
			const [r, g, b] = rgbFromArgb(
				props.theme.schemes[props.theme.mode].primary
			)
			return `rgba(${r}, ${g}, ${b}, ${props.theme.componentStates.pressedOpacity})`
		}};
	}
`

export const OutlinedButton = styled(TextButton)`
	padding: 10px 24px 10px ${(props) => (props.icon ? "16px" : "24px")};
	border: 1px solid
		${(props) => hexFromArgb(props.theme.schemes[props.theme.mode].outline)};

	&:active:not(:disabled) {
		border-color: ${(props) =>
			hexFromArgb(props.theme.schemes[props.theme.mode].primary)};
	}

	&:disabled {
		border-color: ${(props) =>
			props.theme.mode === "light"
				? `rgba(31, 31, 31, ${props.theme.componentStates.pressedOpacity})`
				: `rgba(227, 227, 227, ${props.theme.componentStates.pressedOpacity})`};
	}
`

export const ElevatedButton = styled(BaseButton)`
	padding: 10px 24px 10px ${(props) => (props.icon ? "16px" : "24px")};
	box-shadow: ${(props) =>
		props.theme.shapes.elevation[1].shadow(props.theme.mode)};
	color: ${(props) =>
		hexFromArgb(props.theme.schemes[props.theme.mode].primary)};
	background: ${(props) => {
		const [r, g, b] = rgbFromArgb(props.theme.schemes[props.theme.mode].primary)
		return overlapTwoColors(
			`rgba(${r}, ${g}, ${b}, ${props.theme.shapes.elevation[1].alpha})`,
			hexFromArgb(props.theme.schemes[props.theme.mode].surface)
		)
	}};

	&:hover:not(:disabled) {
		box-shadow: ${(props) =>
			props.theme.shapes.elevation[2].shadow(props.theme.mode)};
		background: ${(props) => {
			const [r, g, b] = rgbFromArgb(
				props.theme.schemes[props.theme.mode].primary
			)
			return overlapTwoColors(
				`rgba(${r}, ${g}, ${b}, ${props.theme.componentStates.hoverOpacity})`,
				hexFromArgb(props.theme.schemes[props.theme.mode].surface)
			)
		}};
	}

	&:active:not(:disabled) {
		box-shadow: ${(props) =>
			props.theme.shapes.elevation[1].shadow(props.theme.mode)};
		background: ${(props) => {
			const [r, g, b] = rgbFromArgb(
				props.theme.schemes[props.theme.mode].primary
			)
			return overlapTwoColors(
				`rgba(${r}, ${g}, ${b}, ${props.theme.componentStates.pressedOpacity})`,
				hexFromArgb(props.theme.schemes[props.theme.mode].surface)
			)
		}};
	}

	&:disabled {
		box-shadow: none;
		background: ${(props) =>
			props.theme.mode === "light"
				? `rgba(31, 31, 31, ${props.theme.componentStates.pressedOpacity})`
				: `rgba(227, 227, 227, ${props.theme.componentStates.pressedOpacity})`};
	}
`

export const TonalButton = styled(BaseButton)`
	padding: 10px 24px 10px ${(props) => (props.icon ? "16px" : "24px")};
	background: ${(props) =>
		hexFromArgb(
			props.theme.mode === "light"
				? props.theme.schemes.dark.onSecondaryContainer
				: props.theme.schemes.dark.secondaryContainer
		)};
	color: ${(props) =>
		hexFromArgb(props.theme.schemes[props.theme.mode].onSecondaryContainer)};

	&:hover:not(:disabled) {
		box-shadow: ${(props) =>
			props.theme.shapes.elevation[1].shadow(props.theme.mode)};
		background: ${(props) => {
			const [r, g, b] = rgbFromArgb(
				props.theme.schemes[props.theme.mode].primary
			)
			return overlapTwoColors(
				`rgba(${r}, ${g}, ${b}, ${props.theme.componentStates.hoverOpacity})`,
				hexFromArgb(
					props.theme.mode === "light"
						? props.theme.schemes.dark.onSecondaryContainer
						: props.theme.schemes.dark.secondaryContainer
				)
			)
		}};
	}

	&:active:not(:disabled) {
		box-shadow: none;
		background: ${(props) => {
			const [r, g, b] = rgbFromArgb(
				props.theme.schemes[props.theme.mode].primary
			)
			return overlapTwoColors(
				`rgba(${r}, ${g}, ${b}, ${props.theme.componentStates.pressedOpacity})`,
				hexFromArgb(
					props.theme.mode === "light"
						? props.theme.schemes.dark.onSecondaryContainer
						: props.theme.schemes.dark.secondaryContainer
				)
			)
		}};
	}

	&:disabled {
		box-shadow: none;
		background: ${(props) =>
			props.theme.mode === "light"
				? `rgba(31, 31, 31, ${props.theme.componentStates.pressedOpacity})`
				: `rgba(227, 227, 227, ${props.theme.componentStates.pressedOpacity})`};
	}
`
