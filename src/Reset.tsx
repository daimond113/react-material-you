import { css, Global } from "@emotion/react"
import emotionNormalize from "emotion-normalize"

export const Reset = () => (
	<Global
		styles={css`
			${emotionNormalize}
			html,
    body {
				padding: 0;
				margin: 0;
				min-height: 100%;
			}
		`}
	/>
)
