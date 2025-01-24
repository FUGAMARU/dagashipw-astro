import styles from "@/components/article/originals/iframe/Spotify.module.css"

/** Props */
type Props = {
  /** 楽曲ID */
  trackId: string
}

/** Spotify埋め込み用コンポーネント */
export const Spotify = ({ trackId }: Props) => {
  return (
    <iframe
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      className={styles.spotifyIframe}
      height="152"
      loading="lazy"
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
      width="100%"
    />
  )
}
