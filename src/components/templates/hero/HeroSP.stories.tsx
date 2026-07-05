import { HeroSP } from "@/components/templates/hero/HeroSP"

import type { Meta, StoryObj } from "@storybook/react-vite"

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
    articleUrlId: "nagara-park",
    createdAt: "2023/11/24",
    updatedAt: "2023/11/25",
    title: "はがないの聖地、岐阜県「長良公園」に行ってみた！",
    tags: ["アニメ", "旅行", "ライフスタイル", "はがない"],
    backNumber: 1,
    thumbnail: {
      normal: {
        pc1x: "/dummy-images/nagara-park.jpg",
        pc2x: "/dummy-images/nagara-park.jpg",
        sp1x: "/dummy-images/nagara-park.jpg",
        sp2x: "/dummy-images/nagara-park.jpg"
      },
      smaller: {
        pc1x: "/dummy-images/nagara-park.jpg",
        pc2x: "/dummy-images/nagara-park.jpg",
        sp1x: "/dummy-images/nagara-park.jpg",
        sp2x: "/dummy-images/nagara-park.jpg"
      }
    }
  }
}
