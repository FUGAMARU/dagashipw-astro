import { IconNotByAi } from "@/components/parts/svg/IconNotByAi"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconNotByAi> = {
  component: IconNotByAi,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 131, height: 42 }}>
      <IconNotByAi />
    </div>
  )
}
