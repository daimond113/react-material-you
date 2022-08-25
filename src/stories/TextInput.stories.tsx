import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { TextInput, FilledTextInput, OutlinedTextInput } from "../TextInput"
import { Icon } from "../Icon"

export default {
	title: "TextInput",
} as ComponentMeta<TextInput>

export const WithIcon: ComponentStory<TextInput> = (args) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			gap: "2rem",
		}}
	>
		<FilledTextInput {...args} />
		<FilledTextInput
			{...args}
			leadingIcon={
				<Icon className="material_icon material-symbols-outlined">check</Icon>
			}
			trailingIcon={
				<Icon className="material_icon material-symbols-outlined">block</Icon>
			}
			prefix="$"
		/>
		<FilledTextInput
			{...args}
			leadingIcon={
				<Icon className="material_icon material-symbols-outlined">check</Icon>
			}
			trailingIcon={
				<Icon className="material_icon material-symbols-outlined">block</Icon>
			}
			suffix="@gmail.com"
		/>
		<OutlinedTextInput {...args} />
		<OutlinedTextInput
			{...args}
			leadingIcon={
				<Icon className="material_icon material-symbols-outlined">check</Icon>
			}
			trailingIcon={
				<Icon className="material_icon material-symbols-outlined">block</Icon>
			}
			prefix="$"
		/>
		<OutlinedTextInput
			{...args}
			leadingIcon={
				<Icon className="material_icon material-symbols-outlined">check</Icon>
			}
			trailingIcon={
				<Icon className="material_icon material-symbols-outlined">block</Icon>
			}
			suffix="@gmail.com"
		/>
	</div>
)

WithIcon.args = {
	label: "Label",
	disabled: false,
	supportingText: "",
	type: "text",
	error: false,
}
