import { HeroSP } from "@/components/templates/hero/HeroSP"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof HeroSP> = {
  component: HeroSP,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    thumbnailUrl: "/nagara-park.jpg",
    backNumber: 1,
    title: "はがないの聖地「長良公園」に行ってきた！",
    createdAt: "2021/01/01",
    updatedAt: "2021/01/02",
    commentCount: 1,
    tags: ["タグ1", "タグ2"]
  }
}
