import { ChatMessage } from "@/components/article/originals/ChatMessage"

import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"

const meta: Meta<typeof ChatMessage> = {
  component: ChatMessage,
  tags: ["autodocs"],
  args: { role: "me", icon: undefined, name: undefined, text: undefined, isFullWidth: undefined },
  argTypes: {
    role: { control: "select", options: ["me", "opponent"] },
    icon: { control: "text" },
    name: { control: "text" },
    text: { control: "text" },
    isFullWidth: { control: "boolean" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const commonProps = {
  icon: "/dummy-images/windows-user-icon.jpg",
  text: "雨はね一人にだけ降るのではないのよね。誰にでも平等に降るわけ。自分だけ不幸だと思わない、あなたが苦しんでいる数だけみんなも苦しんでんのよ。逃げないで向き合う。試練だと思えば楽しくなるかもよ"
} as const satisfies Partial<ComponentProps<typeof ChatMessage>>

/** 自分の発言 */
export const Me: Story = {
  args: {
    role: "me",
    name: "美川憲一",
    ...commonProps
  }
}

/** 相手の発言 */
export const Opponent: Story = {
  args: {
    role: "opponent",
    name: "美川憲一",
    ...commonProps
  }
}

/** 名前なし */
export const NoName: Story = {
  args: {
    role: "me",
    ...commonProps
  }
}

/** 横幅いっぱい */
export const FullWidth: Story = {
  args: {
    role: "me",
    name: "美川憲一",
    isFullWidth: true,
    ...commonProps
  }
}
