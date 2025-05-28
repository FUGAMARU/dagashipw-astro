import { IconSpinner } from "@/components/parts/svg/IconSpinner"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconSpinner> = {
  component: IconSpinner,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: 128,
    height: 128
  }
}
