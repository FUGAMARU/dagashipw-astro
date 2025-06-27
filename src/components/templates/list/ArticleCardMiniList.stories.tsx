import { ArticleCardMiniList } from "@/components/templates/list/ArticleCardMiniList"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ArticleCardMiniList> = {
  component: ArticleCardMiniList,
  tags: ["autodocs"],
  args: { cards: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    cards: [
      {
        articleUrlId: "sea-candle",
        createdAt: "2022-12-30T00:00:00Z",
        updatedAt: "2022-12-31T00:00:00Z",
        thumbnail: {
          normal: {
            pc1x: "/dummy-images/sea-candle.jpg",
            pc2x: "/dummy-images/sea-candle.jpg",
            sp1x: "/dummy-images/sea-candle.jpg",
            sp2x: "/dummy-images/sea-candle.jpg"
          },
          smaller: {
            pc1x: "/dummy-images/sea-candle.jpg",
            pc2x: "/dummy-images/sea-candle.jpg",
            sp1x: "/dummy-images/sea-candle.jpg",
            sp2x: "/dummy-images/sea-candle.jpg"
          }
        },
        themeColor: "#6b33bf",
        title: "江ノ島シーキャンドル"
      },
      {
        articleUrlId: "nagara-park",
        createdAt: "2023-11-24T00:00:00Z",
        updatedAt: "2023-11-25T00:00:00Z",
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
        },
        themeColor: "#f1c333",
        title: "長良公園"
      },
      {
        articleUrlId: "zn6",
        createdAt: "2024-12-28T00:00:00Z",
        updatedAt: "2024-12-29T00:00:00Z",
        thumbnail: {
          normal: {
            pc1x: "/dummy-images/zn6.jpg",
            pc2x: "/dummy-images/zn6.jpg",
            sp1x: "/dummy-images/zn6.jpg",
            sp2x: "/dummy-images/zn6.jpg"
          },
          smaller: {
            pc1x: "/dummy-images/zn6.jpg",
            pc2x: "/dummy-images/zn6.jpg",
            sp1x: "/dummy-images/zn6.jpg",
            sp2x: "/dummy-images/zn6.jpg"
          }
        },
        themeColor: "#df3850",
        title: "トヨタ86"
      },
      {
        articleUrlId: "kamakura",
        createdAt: "2025-01-30T00:00:00Z",
        updatedAt: "2025-01-30T00:00:00Z",
        thumbnail: {
          normal: {
            pc1x: "/dummy-images/kamakura.jpg",
            pc2x: "/dummy-images/kamakura.jpg",
            sp1x: "/dummy-images/kamakura.jpg",
            sp2x: "/dummy-images/kamakura.jpg"
          },
          smaller: {
            pc1x: "/dummy-images/kamakura.jpg",
            pc2x: "/dummy-images/kamakura.jpg",
            sp1x: "/dummy-images/kamakura.jpg",
            sp2x: "/dummy-images/kamakura.jpg"
          }
        },
        themeColor: "#efab4a",
        title: "鎌倉から望む太平洋"
      }
    ]
  }
}

export const Fallback: Story = {
  args: {
    isFallback: true
  }
}
