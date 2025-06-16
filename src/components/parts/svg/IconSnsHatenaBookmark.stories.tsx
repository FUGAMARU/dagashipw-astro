import { IconSnsHatenaBookmark } from "@/components/parts/svg/IconSnsHatenaBookmark"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconSnsHatenaBookmark> = {
  component: IconSnsHatenaBookmark,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <div style={{ width: 128, height: 128 }}>
      <IconSnsHatenaBookmark />
    </div>
  )
}
