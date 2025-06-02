import { CommentList } from "@/components/templates/list/CommentList"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CommentList> = {
  component: CommentList,
  tags: ["autodocs"],
  args: { articleUrlId: undefined, comments: undefined },
  argTypes: { articleUrlId: { control: "text" } }
}

export default meta
type Story = StoryObj<typeof meta>

export const HasNoReplies: Story = {
  args: {
    articleUrlId: "example-article-id",
    comments: [
      {
        commentId: 1,
        userName: "田中 太郎",
        submittedAt: "2024/04/28 10:15:30",
        body: "この記事、とても参考になりました！特に〇〇の部分が分かりやすかったです。",
        replies: []
      },
      {
        commentId: 2,
        userName: "佐藤 花子",
        submittedAt: "2024/04/28 11:05:00",
        body: "私も同じように感じていました。\n△△についても、もっと詳しく知りたいです。",
        replies: []
      },
      {
        commentId: 3,
        userName: "鈴木 一郎",
        submittedAt: "2024/04/29 09:00:15",
        body: "素晴らしい分析ですね。\n今後の展開も楽しみにしています。",
        replies: []
      }
    ]
  }
}

export const HasReplies: Story = {
  args: {
    articleUrlId: "example-article-id",
    comments: [
      {
        commentId: 10,
        userName: "山田 健太",
        submittedAt: "2024/04/29 14:20:05",
        body: "この方法を試してみようと思います。\nありがとうございます！",
        replies: [
          {
            commentId: 11,
            userName: "田中 太郎",
            submittedAt: "2024/04/29 15:00:40",
            body: "どういたしまして！\nもしよければ結果も教えてくださいね。"
          }
        ]
      },
      {
        commentId: 12,
        userName: "伊藤 さくら",
        submittedAt: "2024/04/29 16:55:10",
        body: "□□の部分について、もう少し具体的な例を挙げていただけますか？",
        replies: [
          {
            commentId: 13,
            userName: "記事の著者",
            submittedAt: "2024/04/29 17:25:30",
            body: "ご質問ありがとうございます。\n例えば、〜〜のようなケースが考えられます。\n\n具体的には、\n1. Aという状況で\n2. Bという手順を踏むと\n3. Cのような結果が得られる\nといった具合です。\n\n詳細はこちらのドキュメントもご参照ください。"
          }
        ]
      },
      {
        commentId: 14,
        userName: "渡辺 雄介",
        submittedAt: "2024/04/30 08:30:00",
        body: "いつも役立つ情報ありがとうございます。",
        replies: []
      }
    ]
  }
}

export const HasMultipleReplies: Story = {
  args: {
    articleUrlId: "example-article-id",
    comments: [
      {
        commentId: 20,
        userName: "中村 美咲",
        submittedAt: "2024/05/01 11:00:00",
        body: "〇〇のツール、便利そうですね！\nちょうど今、似たような課題を抱えていて、解決策を探していました。\n\n特にXX機能が現在のワークフローにうまく組み込めそうな気がします。\n早速、無料プランから試してみようと思います。\n\n導入事例などもあれば、ぜひ参考にしたいです。",
        replies: [
          {
            commentId: 21,
            userName: "小林 大輔",
            submittedAt: "2024/05/01 13:45:20",
            body: "私も使っていますが、かなり作業効率が上がりましたよ！\n以前は手作業で半日かかっていた処理が、このツールを使うと1時間程度で終わるようになりました。\n\n特にバッチ処理機能が強力で、定型業務の自動化に大きく貢献しています。"
          },
          {
            commentId: 22,
            userName: "加藤 愛",
            submittedAt: "2024/05/01 18:10:55",
            body: "使い方のコツとかありますか？\nドキュメントは一通り読んだのですが、もし実践的なアドバイスがあれば教えてほしいです。\n例えば、YYの設定項目が少し分かりにくくて…"
          }
        ]
      },
      {
        commentId: 23,
        userName: "吉田 拓也",
        submittedAt: "2024/05/02 09:15:00",
        body: "この記事を読んで、新しい視点が得られました。\nこれまで当たり前だと思っていた前提が、実はそうではなかったことに気づかされました。\n\n特に、後半で述べられている「□□□」という考え方は、今後のプロジェクトを進める上で非常に重要な示唆を与えてくれるものだと感じています。",
        replies: [
          {
            commentId: 24,
            userName: "山本 直樹",
            submittedAt: "2024/05/02 10:30:10",
            body: "同感です。\n特に後半の考察は興味深かったです。\n私も著者と同じような問題意識を持っていましたが、ここまで体系的に言語化されているのを読んで、頭の中が整理されました。"
          },
          {
            commentId: 25,
            userName: "森田 由美",
            submittedAt: "2024/05/02 14:05:45",
            body: "△△の参考文献も読んでみようと思います。\n\nこの記事で触れられていた理論的背景について、\nさらに深く理解を深めたいと考えています。\n\nご紹介いただきありがとうございます。"
          }
        ]
      },
      {
        commentId: 26,
        userName: "井上 誠",
        submittedAt: "2024/05/03 07:50:00",
        body: "次回の記事も期待しています！",
        replies: []
      }
    ]
  }
}
