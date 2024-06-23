import HeaderPC from "@/components/layout/sidebar/HeaderPC"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof HeaderPC> = {
  component: HeaderPC,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
