import { TableOfContentsWrapper } from "@/components/layout/sidebar/TableOfContentsWrapper"

import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta<typeof TableOfContentsWrapper> = {
  component: TableOfContentsWrapper,
  tags: ["autodocs"],
  args: { article: undefined },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    article: {
      articleUrlId: "example-article-id",
      backNumber: 1,
      title: "目次テスト記事",
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
      originalThumbnailUrl: "/dummy-images/nagara-park.jpg",
      themeColor: "#f1c333",
      tags: ["テスト"],
      bodyBeginningParagraph: "目次表示確認用の記事です。",
      body: [
        "## 見出し1",
        "### 見出し1-1",
        "#### 見出し1-1-1",
        "## 見出し2",
        "### 見出し2-1",
        "#### 見出し2-1-1",
        "### 見出し2-2",
        "## 見出し3",
        "### 見出し3-1",
        "## 見出し4"
      ].join("\n"),
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z"
    }
  }
}
