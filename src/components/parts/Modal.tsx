import * as Dialog from "@radix-ui/react-dialog"

import styles from "@/components/parts/Modal.module.css"
import { SectionTitle } from "@/components/parts/SectionTitle"
import { SvgLoader } from "@/components/parts/svg/SvgLoader"

import type { Children } from "@/types/children"
import type { ComponentProps, ReactNode } from "react"

/** Props */
type Props = {
  /** 開閉状態 */
  isOpen: boolean
  /** トリガー要素 */
  triggerElement?: ReactNode
  /** モーダルを閉じる時の処理 */
  onClose: () => void
} & ComponentProps<typeof SectionTitle> &
  Children

/** モーダルコンポーネント */
export const Modal = ({
  isOpen,
  triggerElement,
  onClose: handleClose,
  children,
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
      <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content aria-describedby={undefined} className={styles.dialogContent}>
          <Dialog.Title>
            <div className={styles.dialogTitle}>
              <SectionTitle {...sectionTitleProps} />
              <Dialog.Close asChild>
                <button onClick={handleClose} type="button">
                  <SvgLoader className={styles.closeIcon} name="cross" />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
