import { TableOfContentsItem } from "@/components/templates/TableOfContentsItem"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TableOfContentsItem> = {
  component: TableOfContentsItem,
  tags: ["autodocs"],
  args: { title: undefined, href: undefined, isActive: undefined, itemNumber: undefined },
  argTypes: {
    title: { control: "text" },
    href: { control: "text" },
    isActive: { control: "boolean" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { title: "コンテンツの見出しテキスト", isActive: false, itemNumber: "1", href: "#" }
}

/** アクティブ */
export const Active: Story = {
  args: { title: "コンテンツの見出しテキスト", isActive: true, itemNumber: "1", href: "#" }
}
