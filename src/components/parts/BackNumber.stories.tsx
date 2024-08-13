import BackNumber from "@/components/parts/BackNumber"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof BackNumber> = {
  component: BackNumber,
  tags: ["autodocs"],
  args: { backNumber: undefined, isShiftLeft: undefined },
  argTypes: { backNumber: { control: "number" }, isShiftLeft: { control: "boolean" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { backNumber: 31 }
}
