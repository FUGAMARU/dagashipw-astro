import { Tag } from "@/components/parts/Tag"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ["autodocs"],
  args: { text: undefined, href: undefined },
  argTypes: { text: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: "タグ",
    href: "/"
  }
}
