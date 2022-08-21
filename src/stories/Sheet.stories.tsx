import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Sheet } from "../Sheet"

export default {
	title: "Sheet",
	component: Sheet,
} as ComponentMeta<typeof Sheet>

const Template: ComponentStory<typeof Sheet> = (args) => (
	<Sheet {...args}>Hello world!</Sheet>
)

export const Primary: ComponentStory<typeof Sheet> = Template.bind({})
