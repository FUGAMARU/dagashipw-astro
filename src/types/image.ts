/**
 * @file 画像に関する型定義
 */

/** 画像のURLセット */
export type ImageSources = {
  /** 標準サイズ */
  normal: {
    /** PC 1倍 */
    pc1x: string
    /** PC 2倍 */
    pc2x: string
    /** SP 1倍 */
    sp1x: string
    /** SP 2倍 */
    sp2x: string
  }
  /** 小さめサイズ */
  smaller: {
    /** PC 1倍 */
    pc1x: string
    /** PC 2倍 */
    pc2x: string
    /** SP 1倍 */
    sp1x: string
    /** SP 2倍 */
    sp2x: string
  }
}

/** 画像のサイズタイプの一覧 */
export type ImageSizeType = "normal" | "smaller"

/** imgproxy側で用意しているプリセットの一覧 */
export type ImgproxyPresets =
  | "normal-pc"
  | "normal-pc-2x"
  | "normal-sp"
  | "normal-sp-2x"
  | "smaller-pc"
  | "smaller-pc-2x"
  | "smaller-sp"
  | "smaller-sp-2x"
