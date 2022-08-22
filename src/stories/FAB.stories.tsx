import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { ExpandedFAB, FAB, FABGroup, FABType, LargeFAB, SmallFAB } from "../FAB"
import { Icon } from "../Icon"

export default {
	title: "FAB",
} as ComponentMeta<FABType>

export const SmallAndNormal: ComponentStory<FABType> = (args) => (
	<>
		<FABGroup>
			<SmallFAB {...args}>1</SmallFAB>
			<SmallFAB {...args}>2</SmallFAB>
			<SmallFAB {...args}>3</SmallFAB>
		</FABGroup>
		<FAB {...args}>
			<Icon className="material_icon material-symbols-outlined">check</Icon>
		</FAB>
	</>
)

SmallAndNormal.args = {
	color: "surface",
	lowered: false,
}

export const Large: ComponentStory<FABType> = (args) => (
	<LargeFAB {...args}>
		<Icon className="material_icon material-symbols-outlined">check</Icon>
	</LargeFAB>
)

Large.args = {
	color: "surface",
	lowered: false,
}

export const Expanded: ComponentStory<FABType> = (args) => (
	<>
		<ExpandedFAB {...args}>
			<Icon className="material_icon material-symbols-outlined">check</Icon>
			{args.children}
		</ExpandedFAB>
		<ExpandedFAB {...args} style={{ marginRight: "400px" }}></ExpandedFAB>
	</>
)

Expanded.args = {
	color: "surface",
	lowered: false,
	children: "This is an awesome FAB",
}
