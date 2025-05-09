import { ImageCore } from "@/components/parts/image/ImageCore"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ImageCore> = {
  component: ImageCore,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
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
    captionLinkTexts: "長良公園,岐阜県岐阜市",
    captionLinks: "http://www.nagarakouen.jp/,https://www.city.gifu.lg.jp/"
  }
}
