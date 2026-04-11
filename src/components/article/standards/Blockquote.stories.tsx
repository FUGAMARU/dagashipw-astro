import { Blockquote } from "@/components/article/standards/Blockquote"
import { Paragraph } from "@/components/article/standards/Paragraph"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Blockquote> = {
  component: Blockquote,
  tags: ["autodocs"],
  args: {},
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <Paragraph>
        主人公、木春由乃（こはるよしの）は、田舎から上京し短大の卒業を間近に控えた、いわゆる普通の20歳の女の子。東京には何でもあって、きっと特別な何かになれるのではないかと夢みて、30社以上の面接を受けるも、未だに内定はない。銀行の残高は980円。このままでは、田舎帰って普通のおばさんになってしまう・・・と葛藤していたそんなある日、以前、一度だけ働いたことがある派遣事務所から、「地域の町おこしの一環で国王をやってほしい」との依頼がある。よくわからないが軽い気持ちで依頼先の間野山市に向かうことにした。一時的に日本中でブームになるも、バブル崩壊に合わせて今ではほとんど見ることの無くなったミニ独立国。間野山市は、今なおミニ独立国を続けている、廃れた残念観光地だった。そんなこんなで、由乃の”普通じゃない”お仕事生活がはじまった。
      </Paragraph>
    )
  }
}

/** 改行あり */
export const WithLineBreaks: Story = {
  args: {
    children: <Paragraph>{"最初の行\n\n次の段落\n最後の行"}</Paragraph>
  }
}

/** 長いURLあり */
export const WithLongUrl: Story = {
  args: {
    children: (
      <Paragraph>
        https://www.google.com/search?q=%E8%97%A4%E6%B2%A2%E9%A7%85&oq=%E8%97%A4%E6%B2%A2%E9%A7%85&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIGCAEQRRg7MgYIAhBFGDsyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyBwgHEAAYgAQyBwgIEAAYgAQyBwgJEAAYgATSAQgxMjM2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
      </Paragraph>
    )
  }
}
