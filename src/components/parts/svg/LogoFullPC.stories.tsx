import LogoFullPC from "@/components/parts/svg/LogoFullPC"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LogoFullPC> = {
  component: LogoFullPC,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    width: 435,
    height: 87.79
  },
  render(args) {
    return (
      <div style={{ backgroundColor: "#222425" }}>
        <LogoFullPC {...args} />
      </div>
    )
  }
}
