import styles from "@/components/article/originals/TableWithoutHeader.module.css"

/** Props */
type Props = {
  /** テーブル */
  table: string
}

/** ヘッダー無しテーブルコンポーネント */
export const TableWithoutHeader = ({ table }: Props) => {
  const parsedData = JSON.parse(table) as Array<Array<string>>

  return (
    <div className={styles.tableWithoutHeader}>
      <table className={styles.main}>
        <tbody>
          {parsedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map(cell => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
