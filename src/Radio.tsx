import styled from "@emotion/styled"
import { hexFromArgb, rgbFromArgb } from "./utils/colors"

export const Radio = styled.input`
	appearance: none;
	margin: 0;
	width: 20px;
	height: 20px;
	border-radius: ${(props) => props.theme.shapes.radius.full};
	border: 2px solid
		${(props) =>
			hexFromArgb(props.theme.schemes[props.theme.mode].onSurfaceVariant)};
	position: relative;
	transition: box-shadow 0.1s;
	background: transparent;
	opacity: ${(props) => (props.disabled ? "0.38" : "1")};
	--before-display: none;
	--before-bg: ${(props) =>
		hexFromArgb(props.theme.schemes[props.theme.mode].onSurfaceVariant)};
	--shadow-color: ${(props) => {
		const [r, g, b] = rgbFromArgb(props.theme.schemes[props.theme.mode].primary)
		return `rgba(${r}, ${g}, ${b}, ${props.theme.componentStates.hoverOpacity})`
	}};

	&:disabled {
		--shadow-color: ${(props) => {
			const [r, g, b] = rgbFromArgb(
				props.theme.schemes[props.theme.mode].onSurface
			)
			return `rgba(${r}, ${g}, ${b}, ${props.theme.componentStates.hoverOpacity})`
		}};
	}

	&:not(:disabled):hover {
		box-shadow: 0 0 0 15px var(--shadow-color);
	}

	&::before {
		content: "";
		width: 10px;
		height: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: ${(props) => props.theme.shapes.radius.full};
		display: var(--before-display);
		background-color: var(--before-bg);
	}

	&:not(:disabled):checked {
		--before-bg: ${(props) =>
			hexFromArgb(props.theme.schemes[props.theme.mode].primary)};
		border-color: ${(props) =>
			hexFromArgb(props.theme.schemes[props.theme.mode].primary)};
	}

	&:checked {
		--before-display: block;
	}

	&:not(:disabled):not(:checked):hover,
	&:not(:disabled):not(:checked):active {
		border-color: ${(props) =>
			hexFromArgb(props.theme.schemes[props.theme.mode].onSurface)};
	}
`

Radio.defaultProps = {
	type: "radio",
}
