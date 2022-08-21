import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Typography } from "../Typography"

export default {
	title: "Typography",
	component: Typography,
} as ComponentMeta<typeof Typography>

const Template: ComponentStory<typeof Typography> = (args) => (
	<Typography {...args} />
)

export const Primary: ComponentStory<typeof Typography> = Template.bind({})

Primary.args = {
	size: "medium",
	variant: "body",
	children: "Hello world!",
}
