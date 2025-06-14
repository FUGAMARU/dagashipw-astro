import { LogoFull } from "@/components/parts/svg/LogoFull"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LogoFull> = {
  component: LogoFull,
  tags: ["autodocs"],
  args: { isPC: true, className: undefined },
  argTypes: { isPC: { control: "boolean" }, className: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: 297.28,
    height: 60
  }
}
