import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import {
	FilledButton,
	OutlinedButton,
	Button,
	TextButton,
	ElevatedButton,
	TonalButton,
} from "../Button"

import { Icon } from "../Icon"

export default {
	title: "Button",
} as ComponentMeta<Button>

export const WithoutIcon: ComponentStory<Button> = (args) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			gap: "0.8rem",
		}}
	>
		{[
			<FilledButton {...args}>{args.children} Filled</FilledButton>,
			<OutlinedButton {...args}>{args.children} Outlined</OutlinedButton>,
			<TextButton {...args}>{args.children} Text</TextButton>,
			<ElevatedButton {...args}>{args.children} Elevated</ElevatedButton>,
			<TonalButton {...args}>{args.children} Tonal</TonalButton>,
		].map((Btn, index) => (
			<div key={index} style={{ width: "max-width" }}>
				{Btn}
			</div>
		))}
	</div>
)

WithoutIcon.args = {
	children: "Button",
	disabled: false,
}

export const WithIcon: ComponentStory<Button> = (args) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			gap: "0.8rem",
		}}
	>
		{[
			<FilledButton {...args}>
				<Icon className="material_icon material-symbols-outlined">check</Icon>
				{args.children} Filled
			</FilledButton>,
			<OutlinedButton {...args}>
				<Icon className="material_icon material-symbols-outlined">check</Icon>
				{args.children} Outlined
			</OutlinedButton>,
			<TextButton {...args}>
				<Icon className="material_icon material-symbols-outlined">check</Icon>
				{args.children} Text
			</TextButton>,
			<ElevatedButton {...args}>
				<Icon className="material_icon material-symbols-outlined">check</Icon>
				{args.children} Elevated
			</ElevatedButton>,
			<TonalButton {...args}>
				<Icon className="material_icon material-symbols-outlined">check</Icon>
				{args.children} Tonal
			</TonalButton>,
		].map((Btn, index) => (
			<div key={index} style={{ width: "max-width" }}>
				{Btn}
			</div>
		))}
	</div>
)

WithIcon.args = {
	children: "Button with icon",
	disabled: false,
	icon: true,
}
