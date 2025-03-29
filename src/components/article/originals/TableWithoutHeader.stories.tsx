import { TableWithoutHeader } from "@/components/article/originals/TableWithoutHeader"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TableWithoutHeader> = {
  component: TableWithoutHeader,
  tags: ["autodocs"],
  args: { table: undefined },
  argTypes: { table: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    table:
      '[\
         ["ブレンド・S", "中山幸", "益山亮司", "A-1 Pictures"],\
         ["甘城ブリリアントパーク", "賀東招二", "武本康弘", "京都アニメーション"],\
         ["僕は友達が少ない", "平坂読", "喜多幡徹", "AIC Build"],\
         ["サクラクエスト", "Alexandre S. D. Celibidache", "増井壮一", "P.A.WORKS"],\
         ["邪神ちゃんドロップキック", "ユキヲ", "夏目公一朗", "ノーマッド"]\
      ]'
  }
}
