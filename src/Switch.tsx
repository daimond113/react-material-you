import { css } from "@emotion/react"
import {
	DetailedHTMLProps,
	InputHTMLAttributes,
	useEffect,
	useRef,
} from "react"
import { Icon } from "./Icon"
import { hexFromArgb } from "./main"

interface SwitchProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	icon?: boolean
}

export function Switch({ icon, ...props }: SwitchProps) {
	const handleRef = useRef<HTMLSpanElement>(null)
	let oldShadow = useRef<string | null>(null)

	useEffect(() => {
		if (!handleRef.current) return
		oldShadow.current ??= handleRef.current.style.boxShadow
		if (props.disabled) {
			handleRef.current.style.boxShadow = "none"
		} else {
			handleRef.current.style.boxShadow = oldShadow.current
		}
	}, [props.disabled])

	return (
		<label
			css={(theme) => css`
				position: relative;
				display: inline-block;
				width: 52px;
				height: 32px;

				input:not(:checked):not(:disabled) ~ span:not(.handle) {
					background-color: ${hexFromArgb(
						theme.schemes[theme.mode].surfaceVariant
					)};
					outline: 2px solid ${hexFromArgb(theme.schemes[theme.mode].outline)};
				}

				input:not(:checked):not(:disabled) + .handle {
					background-color: ${hexFromArgb(theme.schemes[theme.mode].outline)};
					color: ${hexFromArgb(theme.schemes[theme.mode].surfaceVariant)};
				}

				input:checked:disabled + .handle {
					background-color: ${hexFromArgb(theme.schemes[theme.mode].surface)};
					--checkmark-display: ${theme.mode === "light" ? "none" : "block"};
					color: ${hexFromArgb(theme.schemes.dark.onSurface)};
				}

				input:checked:disabled ~ span:not(.handle) {
					opacity: 0.12;
					background-color: ${hexFromArgb(theme.schemes[theme.mode].onSurface)};
				}

				input:not(:checked):disabled + .handle {
					opacity: 0.38;
					background-color: ${hexFromArgb(theme.schemes[theme.mode].onSurface)};
					color: ${hexFromArgb(theme.schemes[theme.mode].surfaceVariant)};
				}

				input:not(:checked):disabled ~ span:not(.handle) {
					opacity: 0.12;
					background-color: ${hexFromArgb(theme.schemes[theme.mode].surface)};
					outline: 2px solid ${hexFromArgb(theme.schemes[theme.mode].outline)};
				}

				input:checked + .handle {
					--checkmark-display: block;
					--x-display: none;
				}

				input:disabled ~ span {
					--cursor: default;
				}

				input:not(:disabled) ~ span {
					--cursor: pointer;
				}

				--handle-size: 24px;
				--handle-bottom: 4px;
				--handle-x: ${icon ? "20px" : "16px"};

				input:checked + .handle {
					width: var(--handle-size);
					height: var(--handle-size);
					bottom: var(--handle-bottom);
					transform: translateX(var(--handle-x));
				}

				input:checked:disabled + .handle {
					width: 24px;
					height: 24px;
					bottom: 4px;
					transform: translateX(${icon ? "20px" : "16px"});
				}

				&:active {
					--handle-size: 28px;
					--handle-bottom: 2px;
					--handle-x: ${icon ? "18px" : "15px"};
				}

				--shadow-width: 0px;

				&:hover,
				&:focus {
					--shadow-width: 10px;
				}
			`}
		>
			<input
				type="checkbox"
				css={css`
					opacity: 0;
					width: 0;
					height: 0;
				`}
				{...props}
			/>
			<span
				css={(theme) => css`
					position: absolute;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					bottom: ${icon ? "4px" : "8px"};
					left: ${icon ? "3px" : "6px"};
					width: ${icon ? "24px" : "16px"};
					height: ${icon ? "24px" : "16px"};
					border-radius: ${theme.shapes.radius.full};
					transition: 0.3s;
					background-color: ${hexFromArgb(theme.schemes[theme.mode].onPrimary)};
					color: ${hexFromArgb(theme.schemes[theme.mode].onPrimaryContainer)};
					z-index: 10;
					cursor: var(--cursor);

					box-shadow: 0 0 0 var(--shadow-width) rgba(28, 27, 31, 0.08);

					--checkmark-display: none;
					--x-display: block;
				`}
				className="handle"
				ref={handleRef}
			>
				{icon && (
					<>
						<Icon
							className="material-symbols-outlined"
							css={css`
								display: var(--checkmark-display);
							`}
						>
							check
						</Icon>
						<Icon
							className="material-symbols-outlined"
							css={css`
								display: var(--x-display);
							`}
						>
							close
						</Icon>
					</>
				)}
			</span>
			<span
				css={(theme) => css`
					position: absolute;
					cursor: var(--cursor);
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					transition: 0.4s;
					border-radius: ${theme.shapes.radius.full};
					background-color: ${hexFromArgb(theme.schemes[theme.mode].primary)};
				`}
			/>
		</label>
	)
}
