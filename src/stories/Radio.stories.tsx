import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Radio } from "../Radio"

export default {
	title: "Radio",
	component: Radio,
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />

export const Primary: ComponentStory<typeof Radio> = Template.bind({})

Primary.args = {
	disabled: false,
}
