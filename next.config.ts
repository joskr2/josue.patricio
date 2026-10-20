import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    // Allow images from public folder
    unoptimized: false,
  },
  // The CV PDFs moved to stable names; updating them now means overwriting
  // the file, so this list should never grow again. Every URL the site has
  // ever served a CV from stays alive for anyone holding a direct link.
  async redirects() {
    return [
      {
        source:
          '/josue-patricio-retamozo-vargas-desarrollador-software-por-defecto.pdf',
        destination: '/cv-es.pdf',
        permanent: true,
      },
      {
        source:
          '/josue-patricio-retamozo-vargas-software-developer-english-default.pdf',
        destination: '/cv-en.pdf',
        permanent: true,
      },
      {
        source: '/CV_Josue_Retamozo_Espanol.pdf',
        destination: '/cv-es.pdf',
        permanent: true,
      },
      {
        source: '/CV_Josue_Retamozo_English.pdf',
        destination: '/cv-en.pdf',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
