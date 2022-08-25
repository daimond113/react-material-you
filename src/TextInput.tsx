import { css } from "@emotion/react"
import styled from "@emotion/styled"
import type React from "react"
import {
	DetailedHTMLProps,
	InputHTMLAttributes,
	useEffect,
	useRef,
	useState,
} from "react"
import { hexFromArgb, overlapTwoColors, rgbFromArgb } from "./utils/colors"
import { useMutationObserver } from "./utils/hooks"

interface BaseTextInputProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label: string
	leadingIcon?: React.ReactNode
	trailingIcon?: React.ReactNode
	supportingText?: React.ReactNode
	prefix?: string
	suffix?: string
	error?: boolean
}

const InputWrapper = styled.label<{
	leadingIcon?: boolean
	trailingIcon?: boolean
	error: boolean
}>`
	position: relative;
	display: inline-flex;
	align-items: var(--wrapper-items, flex-end);

	height: ${56 - 16}px;
	padding: 8px ${(props) => (props.trailingIcon ? "12px" : "16px")} 8px
		${(props) => (props.leadingIcon ? "12px" : "16px")};

	color: ${(props) =>
		hexFromArgb(props.theme.schemes[props.theme.mode].onSurfaceVariant)};

	input:focus ~ .label,
	input:not(:placeholder-shown) ~ .label,
	input[data-should-expand="true"] ~ .label {
		transform: translate(var(--label-padding-x), var(--label-padding-y, 0));
		top: 8px;
		font-size: ${(props) => props.theme.typescale.body.small.size};
		line-height: ${(props) => props.theme.typescale.body.small.lineHeight};
		letter-spacing: ${(props) => props.theme.typescale.body.small.tracking};
		font-weight: ${(props) => props.theme.typescale.body.small.weight};
		color: ${(props) =>
			hexFromArgb(
				props.theme.schemes[props.theme.mode][props.error ? "error" : "primary"]
			)};
	}

	font-family: ${(props) => props.theme.fontFamily};
	font-size: ${(props) => props.theme.typescale.body.large.size};
	line-height: ${(props) => props.theme.typescale.body.large.lineHeight};
	letter-spacing: ${(props) => props.theme.typescale.body.large.tracking};
	font-weight: ${(props) => props.theme.typescale.body.large.weight};

	--label-padding-x: 0;

	.material_leading_icon ~ span {
		--label-padding-x: ${24 + 16}px;
	}
`

const BaseTextInput = ({
	leadingIcon,
	trailingIcon,
	label,
	supportingText,
	prefix,
	suffix,
	error,
	...props
}: BaseTextInputProps) => {
	return (
		<>
			{leadingIcon && (
				<span
					className="material_leading_icon"
					css={css`
						font-size: 20px;
						margin-right: 16px;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					`}
				>
					{leadingIcon}
				</span>
			)}
			<span
				css={css`
					margin-right: 4px;
				`}
			>
				{prefix}
			</span>
			<input
				data-should-expand={!!prefix || !!suffix}
				css={(theme) => css`
					width: 100%;
					padding: 0;
					color: ${hexFromArgb(theme.schemes[theme.mode].onSurface)};
					font-family: ${theme.fontFamily};
					font-size: ${theme.typescale.body.large.size};
					line-height: ${theme.typescale.body.large.lineHeight};
					letter-spacing: ${theme.typescale.body.large.tracking};
					font-weight: ${theme.typescale.body.large.weight};
					caret-color: ${hexFromArgb(theme.schemes[theme.mode].primary)};
					border: none;
					background-color: transparent;
					text-align: ${!!suffix ? "right" : "left"};

					&:focus {
						outline: none;
					}
				`}
				{...props}
				placeholder=" "
			/>
			<span>{suffix}</span>
			{trailingIcon && (
				<span
					css={(theme) => css`
						font-size: 20px;
						margin-left: 16px;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						color: ${hexFromArgb(
							theme.schemes[theme.mode][error ? "error" : "onSurfaceVariant"]
						)};
					`}
				>
					{trailingIcon}
				</span>
			)}
			<span
				className="label"
				css={css`
					position: absolute;
					top: 50%;
					transform: translate(var(--label-padding-x), -50%);
					display: inline-block;
					transition: 0.2s;
				`}
			>
				{label}
			</span>
		</>
	)
}

export type TextInput = typeof BaseTextInput

const SupportingText = styled.div<{ error: boolean }>`
	position: absolute;
	bottom: -21px;
	left: 0;
	width: calc(100% - 32px);
	padding: 4px 16px 0px 16px;
	display: flex;

	color: ${(props) =>
		hexFromArgb(
			props.theme.schemes[props.theme.mode][
				props.error ? "error" : "onSurfaceVariant"
			]
		)};
	font-family: ${(props) => props.theme.fontFamily};
	font-size: ${(props) => props.theme.typescale.body.small.size};
	line-height: ${(props) => props.theme.typescale.body.small.lineHeight};
	letter-spacing: ${(props) => props.theme.typescale.body.small.tracking};
	font-weight: ${(props) => props.theme.typescale.body.small.weight};
`

export function FilledTextInput({
	error = false,
	...props
}: BaseTextInputProps) {
	const containerRef = useRef<HTMLLabelElement>(null)
	const [style, setStyle] = useState({
		opacity: "1",
		disabled: props.disabled ?? false,
	})
	useMutationObserver(
		containerRef,
		() => {
			if (!containerRef.current) return

			const inputNode = Array.from(containerRef.current.childNodes).find(
				(node) => node.nodeName === "INPUT"
			) as HTMLInputElement | undefined

			if (!inputNode) return

			setStyle({
				disabled: inputNode.disabled,
				opacity: inputNode.disabled ? "0.38" : "1",
			})
		},
		{
			childList: true,
			attributeFilter: ["disabled"],
			attributes: true,
			subtree: true,
			characterData: false,
		}
	)

	return (
		<InputWrapper
			leadingIcon={!!props.leadingIcon}
			trailingIcon={!!props.trailingIcon}
			error={error}
			css={(theme) => css`
				border: none;
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				background: ${hexFromArgb(theme.schemes[theme.mode].surfaceVariant)};
				color: ${hexFromArgb(theme.schemes[theme.mode].onSurfaceVariant)};
				border-bottom: ${error ? 2 : 1}px solid
					${hexFromArgb(
						theme.schemes[theme.mode][error ? "error" : "onSurface"]
					)};

				&:focus-within {
					border-bottom: 2px solid
						${hexFromArgb(
							theme.schemes[theme.mode][error ? "error" : "primary"]
						)};
				}

				opacity: ${style.opacity};

				${!style.disabled
					? css`
							&:hover {
								background: ${(() => {
									const [r, g, b] = rgbFromArgb(
										theme.schemes[theme.mode].onSurface
									)
									return overlapTwoColors(
										`rgba(${r}, ${g}, ${b}, ${theme.componentStates.hoverOpacity})`,
										hexFromArgb(theme.schemes[theme.mode].surfaceVariant)
									)
								})()};
							}
					  `
					: ""}
			`}
			ref={containerRef}
		>
			<BaseTextInput {...props} error={error} />
			{props.supportingText && (
				<SupportingText error={error}>{props.supportingText}</SupportingText>
			)}
		</InputWrapper>
	)
}

export function OutlinedTextInput({
	error = false,
	...props
}: BaseTextInputProps) {
	const containerRef = useRef<HTMLLabelElement>(null)
	const [style, setStyle] = useState({
		opacity: "1",
		disabled: props.disabled ?? false,
	})
	const [isExpanded, setIsExpanded] = useState(false)

	useMutationObserver(
		containerRef,
		() => {
			if (!containerRef.current) return

			const children = Array.from(containerRef.current.childNodes)

			const inputNode = children.find((node) => node.nodeName === "INPUT") as
				| HTMLInputElement
				| undefined

			if (!inputNode) return

			setStyle({
				disabled: inputNode.disabled,
				opacity: inputNode.disabled ? "0.38" : "1",
			})
		},
		{
			childList: true,
			attributeFilter: ["disabled"],
			attributes: true,
			subtree: true,
			characterData: false,
		}
	)

	useEffect(() => {
		if (!containerRef.current) return
		const shouldExpand =
			Array.from(containerRef.current.children)
				.find((node) => node.nodeName === "INPUT")
				?.getAttribute("data-should-expand") === "true"
		if (shouldExpand) {
			setIsExpanded(true)
		}
	}, [containerRef])

	return (
		<InputWrapper
			error={error}
			css={(theme) => css`
				opacity: ${style.opacity};

				${props.disabled ? "" : "&:hover,"}
				&:focus-within {
					--border-color: ${hexFromArgb(theme.schemes[theme.mode].onSurface)};
				}
				--label-padding-y: -16px;
				--wrapper-items: center;

				span {
					--label-padding-x: 0px !important;
				}
			`}
			ref={containerRef}
		>
			<BaseTextInput
				{...props}
				onFocus={(e) => {
					setIsExpanded(true)
					props.onFocus?.(e)
				}}
				onBlur={(e) => {
					setIsExpanded(
						e.target.value.length > 0 ||
							e.target.getAttribute("data-should-expand") === "true"
					)
					props.onBlur?.(e)
				}}
			/>

			{props.supportingText && (
				<SupportingText error={error}>{props.supportingText}</SupportingText>
			)}

			<fieldset
				css={(theme) => css`
					background-color: transparent;
					border-radius: 4px;
					border: ${error ? 2 : 1}px solid
						var(
							--border-color,
							${hexFromArgb(
								theme.schemes[theme.mode][error ? "error" : "outline"]
							)}
						);
					position: absolute;
					top: -10px;
					left: 0;
					right: 0;
					bottom: 0;
					padding: 0 9px;
				`}
				aria-hidden
			>
				<legend
					css={(theme) => css`
						display: block;
						visibility: hidden;
						opacity: 0;
						font-family: ${theme.fontFamily};
						font-size: ${theme.typescale.body.small.size};
						line-height: ${theme.typescale.body.small.lineHeight};
						letter-spacing: ${theme.typescale.body.small.tracking};
						font-weight: ${theme.typescale.body.small.weight};
						padding: 0;
						white-space: nowrap;
						overflow: hidden;
						width: auto;
						max-width: ${isExpanded ? "100%" : "0"};
					`}
				>
					<span
						css={css`
							padding: 0 4px;
						`}
					>
						{props.label}
					</span>
				</legend>
			</fieldset>
		</InputWrapper>
	)
}
