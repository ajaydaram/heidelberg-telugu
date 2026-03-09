import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'క్రైస్తవ విశ్వాస ప్రమాణాలు',
    short_name: 'జ్ఞాన నిధి',
    description: 'క్రైస్తవ విశ్వాస ప్రమాణాల గ్రంథాలయం - తెలుగు అనువాదం',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#334155',
    icons: [
      {
        src: 'https://picsum.photos/seed/cross/192/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://picsum.photos/seed/cross/512/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
