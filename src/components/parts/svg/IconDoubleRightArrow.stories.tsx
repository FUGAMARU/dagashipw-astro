import type { Meta, StoryObj } from "@storybook/react"

import { IconDoubleRightArrow } from "./IconDoubleRightArrow"

const meta: Meta<typeof IconDoubleRightArrow> = {
  title: "components/IconDoubleRightArrow",
  component: IconDoubleRightArrow,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
