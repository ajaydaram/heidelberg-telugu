import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'జ్ఞాన బోధ - Heidelberg Catechism Telugu',
    short_name: 'జ్ఞాన బోధ',
    description: 'హీడెల్‌బర్గ్ కాటెకిజమ్ తెలుగు అనువాదం మరియు వివరణాత్మక అధ్యయన యాప్.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#334155',
    icons: [
      {
        src: 'https://picsum.photos/seed/cross/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/cross/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
