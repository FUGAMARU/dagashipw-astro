import { StaleContentWarning } from "@/components/templates/StaleContentWarning"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof StaleContentWarning> = {
  component: StaleContentWarning,
  tags: ["autodocs"],
  args: { articleDate: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { articleDate: new Date("2015/12/31") }
}
