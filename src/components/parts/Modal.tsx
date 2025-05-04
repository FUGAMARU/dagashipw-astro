import * as Dialog from "@radix-ui/react-dialog"

import styles from "@/components/parts/Modal.module.css"
import { SectionTitle } from "@/components/parts/SectionTitle"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"
import { isDefined } from "@/utils"

import type { Children } from "@/types/children"
import type { ComponentProps, ReactNode } from "react"

/** Props */
type Props = {
  /** 開閉状態 */
  isOpen: boolean
  /** トリガー要素 */
  triggerElement: ReactNode
  /** モーダルを閉じる時の処理 */
  onClose: () => void
  /** 投稿ボタン */
  submitButton?: ReactNode
} & ComponentProps<typeof SectionTitle> &
  Children

/** モーダルコンポーネント */
export const Modal = ({
  isOpen,
  triggerElement,
  onClose: handleClose,
  children,
  submitButton,
  ...sectionTitleProps
}: Props) => {
  return (
    <Dialog.Root
      onOpenChange={open => {
        if (!open) {
          handleClose()
        }
      }}
      open={isOpen}
    >
      <Dialog.Trigger>{triggerElement}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title>
            <div className={styles.dialogTitle}>
              <SectionTitle {...sectionTitleProps} />
              <Dialog.Close asChild>
                <button onClick={handleClose} type="button">
                  <SvgLoader height={20} name="cross" width={20} />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Title>
          <Dialog.Description className={styles.mainContents}>{children}</Dialog.Description>
          {isDefined(submitButton) && (
            <Dialog.Close className={styles.submitButton}>{submitButton}</Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
