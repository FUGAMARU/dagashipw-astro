import { LogoFullGrayScale } from "@/components/parts/svg/LogoFullGrayScale"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LogoFullGrayScale> = {
  component: LogoFullGrayScale,
  tags: ["autodocs"],
  args: { className: undefined },
  argTypes: { className: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 474.61, height: 95.79 }}>
      <LogoFullGrayScale className="" />
    </div>
  )
}
