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
  // The CV PDFs were renamed. Keep the URLs the site served until then alive
  // for anyone holding a direct link.
  async redirects() {
    return [
      {
        source:
          '/josue-patricio-retamozo-vargas-desarrollador-software-por-defecto.pdf',
        destination: '/CV_Josue_Retamozo_Espanol.pdf',
        permanent: true,
      },
      {
        source:
          '/josue-patricio-retamozo-vargas-software-developer-english-default.pdf',
        destination: '/CV_Josue_Retamozo_English.pdf',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
