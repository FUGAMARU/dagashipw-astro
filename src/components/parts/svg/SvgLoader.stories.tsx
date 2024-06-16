import SvgLoader from "@/components/parts/svg/SvgLoader"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof SvgLoader> = {
  component: SvgLoader,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: "search",
    width: 128,
    height: 128
  }
}
