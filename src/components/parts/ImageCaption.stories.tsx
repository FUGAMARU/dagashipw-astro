import { ImageCaption } from "@/components/parts/ImageCaption"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ImageCaption> = {
  component: ImageCaption,
  tags: ["autodocs"],
  args: { caption: undefined, captionLinkTexts: undefined, captionLinks: undefined },
  argTypes: {
    caption: { control: "text" },
    captionLinkTexts: { control: "text" },
    captionLinks: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    caption:
      "ヘアメイクアップアーティストでタレントのIKKOこと豊田一幸は2017年10月24日～10月28日の間に全くの他人と入れ替わっている。"
  }
}

export const HasCaptionLink: Story = {
  args: {
    caption:
      "ヘアメイクアップアーティストでタレントのIKKOこと豊田一幸は2017年10月24日～10月28日の間に全くの他人と入れ替わっている。",
    captionLinkTexts: "IKKOこと豊田一幸",
    captionLinks: "https://ja.wikipedia.org/wiki/IKKO"
  }
}
