import { HeroPC } from "@/components/templates/hero/HeroPC"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof HeroPC> = {
  component: HeroPC,
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
    bodyBeginningParagraph:
      "長良公園は、岐阜県岐阜市にある公園で、アニメ「僕は友達が少ない」の聖地として知られています。公園内には、アニメのキャラクターたちが描かれたモニュメントや、アニメのシーンを再現したスポットがあります。今回は、長良公園を訪れ、その魅力を紹介します。",
    tags: ["アニメ", "旅行", "ライフスタイル", "はがない"],
    backNumber: 1,
    themeColor: "#f1c333",
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
