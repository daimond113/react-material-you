import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Switch } from "../Switch"

export default {
	title: "Switch",
	component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Primary: ComponentStory<typeof Switch> = Template.bind({})
Primary.args = {
	icon: false,
	disabled: false,
}
