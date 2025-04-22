import styles from "@/components/layout/LogoWrapper.module.css"
import { Link } from "@/components/parts/common/Link"
import { LogoFull } from "@/components/parts/svg/LogoFull"
import { PAGE_PATH } from "@/constants/page"

import type { ComponentProps } from "react"

/** Props */
type Props = Pick<ComponentProps<typeof LogoFull>, "isPC">

/** ブログロゴのラッパーコンポーネント (リンクや背景色の指定) */
export const LogoWrapper = ({ isPC }: Props) => {
  return (
    <Link className={styles.logoWrapper} href={PAGE_PATH.TOP}>
      <LogoFull height={isPC ? 60 : 40} isPC={isPC} width={isPC ? 297.28 : 198.19} />
    </Link>
  )
}
