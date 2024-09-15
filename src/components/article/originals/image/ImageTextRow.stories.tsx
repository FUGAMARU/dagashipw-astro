import { ImageTextRow } from "@/components/article/originals/image/ImageTextRow"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ImageTextRow> = {
  component: ImageTextRow,
  tags: ["autodocs"],
  args: { imageUrl: undefined, imageHeight: undefined, text: undefined },
  argTypes: {
    imageUrl: { control: "text" },
    imageHeight: { control: "text" },
    text: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    imageUrl: "/dummy-images/mouse.jpg",
    text: "「真夜中なのにおっはよー！真夜中ぱんチです！」世界でもっとも見られている動画投稿サイト「NewTube」。3人組NewTuber「はりきりシスターズ」の「まさ吉」こと真咲は、生配信中の問題行動が炎上し、チャンネルをクビになってしまう。起死回生を狙う真咲の前に現れたのは、なぜか彼女に運命を感じたヴァンパイアのりぶ。その超人的な能力があれば、目標のチャンネル登録100万人だって夢じゃない!? 真咲は、自分の血に惹かれるりぶに動画出演を依頼。対価として差し出したのは……。「100万人が達成できたら、いいよ。私を食べて」りぶの暮らす晩杯荘の仲間たちを巻き込み、絶対夢を叶えたい動画投稿少女×絶対食べたいヴァンパイアの決死の動画撮影が始まる!! 現代人共感必至!? 「パリピ孔明」スタッフが贈る、ワケあり動画投稿者たちのハイテンション・ガールズ”再生”ストーリー！"
  }
}
