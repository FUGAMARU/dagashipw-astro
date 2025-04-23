import * as Dialog from "@radix-ui/react-dialog"

import styles from "@/components/parts/Modal.module.css"
import { SectionTitle } from "@/components/parts/SectionTitle"

import type { ComponentProps, ReactNode } from "react"

/** Props */
type Props = {
  /** 開閉状態 */
  isOpen: boolean
  /** トリガー要素 */
  triggerElement: ReactNode
  /** モーダルを閉じる時の処理 */
  onClose: () => void
} & ComponentProps<typeof SectionTitle>

/** モーダルコンポーネント */
export const Modal = ({
  isOpen,
  triggerElement,
  onClose: handleClose,
  ...sectionTitleProps
}: Props) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger>{triggerElement}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title>
            <SectionTitle {...sectionTitleProps} />
          </Dialog.Title>
          <Dialog.Description>
            <span className={styles.modalDescription}>モーダルのコンテンツがここに入ります</span>
          </Dialog.Description>
          <Dialog.Close asChild>
            <button onClick={handleClose} type="button">
              閉じるボタン
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
