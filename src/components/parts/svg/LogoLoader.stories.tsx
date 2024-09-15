import { LogoLoader } from "@/components/parts/svg/LogoLoader"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LogoLoader> = {
  component: LogoLoader,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: 297.28,
    height: 60
  }
}
