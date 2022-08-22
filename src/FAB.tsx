import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	useEffect,
	useRef,
	useState,
} from "react"
import { useRipple } from "react-use-ripple"
import { hexFromArgb, overlapTwoColors, rgbFromArgb } from "./utils/colors"

interface BaseFABProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	color?: "surface" | "secondary" | "tertiary"
	lowered?: boolean
}

const capitalize = <S extends string>(str: S): Capitalize<S> =>
	(str.charAt(0).toUpperCase() + str.slice(1)) as never

function BaseFAB({ color = "surface", lowered, ...props }: BaseFABProps) {
	const theme = useTheme()
	const [rippleColor, setRippleColor] = useState("")
	const buttonRef = useRef<HTMLButtonElement>(null)
	useRipple(buttonRef, {
		rippleColor,
	})

	const backgroundColor =
		theme.schemes[theme.mode][
			color === "surface" ? "primaryContainer" : (`${color}Container` as const)
		]
	const textColor =
		theme.schemes[theme.mode][
			color === "surface"
				? "onPrimaryContainer"
				: (`on${capitalize(color)}Container` as const)
		]
	const overlapBackgroundColor =
		theme.schemes[theme.mode][
			color === "surface"
				? `onPrimaryContainer`
				: (`on${capitalize(color)}Container` as const)
		]

	useEffect(() => {
		const [r, g, b] = rgbFromArgb(textColor)
		setRippleColor(
			`rgba(${r}, ${g}, ${b}, ${theme.componentStates.pressedOpacity})`
		)
	}, [theme])

	return (
		<button
			css={(theme) => css`
				border: none;
				display: flex;
				justify-content: center;
				align-items: center;
				background: ${hexFromArgb(backgroundColor)};
				color: ${hexFromArgb(textColor)};
				box-shadow: ${theme.shapes.elevation[lowered ? 1 : 3].shadow(
					theme.mode
				)};
				cursor: pointer;
				font-family: ${theme.fontFamily};
				font-size: ${theme.typescale.label.large.size};
				font-weight: ${theme.typescale.label.large.weight};
				line-height: ${theme.typescale.label.large.lineHeight};
				letter-spacing: ${theme.typescale.label.large.tracking};

				&:hover {
					box-shadow: ${theme.shapes.elevation[lowered ? 2 : 4].shadow(
						theme.mode
					)};

					background: ${(() => {
						const [r, g, b] = rgbFromArgb(overlapBackgroundColor)
						return overlapTwoColors(
							`rgba(${r}, ${g}, ${b}, ${theme.componentStates.hoverOpacity})`,
							hexFromArgb(backgroundColor)
						)
					})()};
				}

				&:active {
					box-shadow: ${theme.shapes.elevation[lowered ? 1 : 3].shadow(
						theme.mode
					)};

					background: ${(() => {
						const [r, g, b] = rgbFromArgb(overlapBackgroundColor)
						return overlapTwoColors(
							`rgba(${r}, ${g}, ${b}, ${theme.componentStates.pressedOpacity})`,
							hexFromArgb(backgroundColor)
						)
					})()};
				}
			`}
			{...props}
			ref={buttonRef}
		></button>
	)
}

export type FABType = typeof BaseFAB

export const FAB = styled(BaseFAB)`
	width: 56px;
	height: 56px;
	border-radius: 16px;
	padding: 16px;
	position: absolute;
	bottom: 16px;
	right: 16px;

	& > .material_icon {
		font-size: 24px;
	}
`

export const SmallFAB = styled(BaseFAB)`
	width: 40px;
	height: 40px;
	border-radius: 12px;

	& > .material_icon {
		font-size: 24px;
	}
`

export const LargeFAB = styled(BaseFAB)`
	width: 96px;
	height: 96px;
	border-radius: 28px;
	padding: 16px;
	position: absolute;
	bottom: 16px;
	right: 16px;

	& > .material_icon {
		font-size: 36px;
	}
`

export const FABGroup = styled.div`
	// 56px (fab size) + 24px (spec padding between) = 80px
	margin-bottom: 80px;
	width: 56px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	bottom: 16px;
	right: 16px;

	button {
		margin-top: 16px;
	}
`

export const ExpandedFAB = styled(BaseFAB)`
	position: absolute;
	bottom: 16px;
	right: 16px;
	min-width: 80px;
	height: 56px;
	padding: 16px;
	border-radius: 16px;

	& > .material_icon {
		font-size: 24px;
		margin-right: 12px;
	}
`
