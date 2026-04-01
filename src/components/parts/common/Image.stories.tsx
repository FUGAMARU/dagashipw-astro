import { Image } from "@/components/parts/common/Image"

import type { ImageSources } from "@/types/image"
import type { Meta, StoryObj } from "@storybook/react"

const dummySources: ImageSources = {
  normal: {
    pc1x: "/sea-candle.jpg",
    pc2x: "/sea-candle.jpg",
    sp1x: "/sea-candle.jpg",
    sp2x: "/sea-candle.jpg"
  },
  smaller: {
    pc1x: "/sea-candle.jpg",
    pc2x: "/sea-candle.jpg",
    sp1x: "/sea-candle.jpg",
    sp2x: "/sea-candle.jpg"
  }
}

const nagaraParkSources: ImageSources = {
  normal: {
    pc1x: "/nagara-park.jpg",
    pc2x: "/nagara-park.jpg",
    sp1x: "/nagara-park.jpg",
    sp2x: "/nagara-park.jpg"
  },
  smaller: {
    pc1x: "/nagara-park.jpg",
    pc2x: "/nagara-park.jpg",
    sp1x: "/nagara-park.jpg",
    sp2x: "/nagara-park.jpg"
  }
}

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    sources: dummySources,
    imageSize: "normal"
  }
}

export const HasCaption: Story = {
  args: {
    sources: nagaraParkSources,
    imageSize: "normal",
    caption: "長良公園は、岐阜県岐阜市にある公園である。"
  }
}

export const HasCaptionLink: Story = {
  args: {
    sources: nagaraParkSources,
    imageSize: "normal",
    caption: "長良公園は、岐阜県岐阜市にある公園である。",
    captionLinkTexts: "長良公園,岐阜県岐阜市",
    captionLinks: "http://www.nagarakouen.jp/,https://www.city.gifu.lg.jp/"
  }
}
