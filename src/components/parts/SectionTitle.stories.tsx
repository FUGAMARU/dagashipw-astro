import { SectionTitle } from "@/components/parts/SectionTitle"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof SectionTitle> = {
  component: SectionTitle,
  tags: ["autodocs"],
  args: { icon: undefined, title: undefined },
  argTypes: { title: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    icon: {
      name: "commentWithPen",
      coloringMethod: "fill"
    },
    title: "この記事に寄せられたコメント"
  }
}
