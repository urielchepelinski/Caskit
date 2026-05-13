interface MetaTagsProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
}

const DEFAULTS = {
  title: 'Caskit — Whiskey Discovery',
  description: 'Scan any whiskey bottle to discover its story, scores, and flavors.',
  image: '/og-image.png',
  url: 'https://caskit.app',
  type: 'website' as const,
}

export function MetaTags({
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  image = DEFAULTS.image,
  url = DEFAULTS.url,
  type = DEFAULTS.type,
}: MetaTagsProps) {
  const fullTitle = title === DEFAULTS.title ? title : `${title} | Caskit`

  return (
    <>
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Caskit" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
