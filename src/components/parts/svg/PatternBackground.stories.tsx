import PatternBackground from "@/components/parts/svg/PatternBackground"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof PatternBackground> = {
  component: PatternBackground,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
