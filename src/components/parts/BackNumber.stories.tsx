import { BackNumber } from "@/components/parts/BackNumber"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof BackNumber> = {
  component: BackNumber,
  tags: ["autodocs"],
  args: { purpose: "articleCard", backNumber: undefined },
  argTypes: { purpose: { control: "select", options: ["articleCard", "hero"] } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { backNumber: 31 }
}
