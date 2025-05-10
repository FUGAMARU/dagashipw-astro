import { AccordionInfo } from "@/components/article/originals/AccordionInfo"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof AccordionInfo> = {
  component: AccordionInfo,
  tags: ["autodocs"],
  args: { displayType: undefined, title: undefined, body: undefined },
  argTypes: { title: { control: "text" }, body: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Tips: Story = {
  args: {
    displayType: "tips",
    title: "「甘城ブリリアントパーク」のあらすじ",
    body: "謎の美少女転校生・千斗いすずから強引に遊園地デートの誘いを受けた可児江西也。わけもわからず連れて来られたのは、さびれたアトラクション、ダメダメなサービスの日本一残念な遊園地・甘城ブリリアントパーク。その支配人だという“本物の”お姫様・ラティファに引き合わされた西也は、なぜか突然、閉園の危機にあるパークの再建を託されてしまう。そして、そこはただの遊園地ではなく――！？"
  }
}

export const Warning: Story = {
  args: {
    displayType: "warning",
    title: "「ぼくらの」のあらすじ",
    body: "夏休み――自然学校にやってきた15人の少年少女。 そこで、小学生の宇白可奈を除く14人の中学1年生は、ココペリと名乗る謎の人物と突然、契約を結ぶ。 その契約は戦いに負けたり、勝負がつかず48時間経過すると、地球は破壊され、全人類のみならず地上の全生物が死滅する。 操縦者は、事前に契約した者の中から選ばれた1名がなる。"
  }
}
