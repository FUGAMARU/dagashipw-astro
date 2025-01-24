import { Image } from "@/components/parts/common/Image"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ["autodocs"],
  args: {
    objectFitCover: undefined,
    caption: undefined,
    captionLinkTexts: undefined,
    captionLinks: undefined,
    figureClassName: undefined,
    imgClassName: undefined
  },
  argTypes: {
    objectFitCover: { control: "boolean" },
    caption: { control: "text" },
    figureClassName: { control: "text" },
    imgClassName: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    src: "/sea-candle.jpg"
  }
}

export const HasCaption: Story = {
  args: {
    src: "/nagara-park.jpg",
    caption: "長良公園は、岐阜県岐阜市にある公園である。"
  }
}

export const HasCaptionLink: Story = {
  args: {
    src: "/nagara-park.jpg",
    caption: "長良公園は、岐阜県岐阜市にある公園である。",
    captionLinkTexts: ["長良公園", "岐阜県岐阜市"],
    captionLinks: ["http://www.nagarakouen.jp/", "https://www.city.gifu.lg.jp/"]
  }
}
