import { AccordionInfo } from "@/components/article/originals/AccordionInfo"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof AccordionInfo> = {
  component: AccordionInfo,
  tags: ["autodocs"],
  args: { title: undefined, body: undefined },
  argTypes: { title: { control: "text" }, body: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: "甘城ブリリアントパークのあらすじ",
    body: "謎の美少女転校生・千斗いすずから強引に遊園地デートの誘いを受けた可児江西也。わけもわからず連れて来られたのは、さびれたアトラクション、ダメダメなサービスの日本一残念な遊園地・甘城ブリリアントパーク。その支配人だという“本物の”お姫様・ラティファに引き合わされた西也は、なぜか突然、閉園の危機にあるパークの再建を託されてしまう。そして、そこはただの遊園地ではなく――！？"
  }
}
