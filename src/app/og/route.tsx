import { ImageResponse } from 'next/og'

import { personalInfo, skills } from '@/lib/personal-data'

export const size = { width: 1200, height: 630 }

// Prerendered at build time: the card is fixed content, so there is no reason
// to pay a function invocation per share.
export const dynamic = 'force-static'

const stack = [
  ...skills.highlights.frontend.slice(0, 4),
  ...skills.highlights.backend.slice(0, 3),
]

export function GET() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#09090b',
        padding: '72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 99,
            background: '#0d9488',
            color: '#ffffff',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          JP
        </div>
        <div style={{ display: 'flex', color: '#a1a1aa', fontSize: 24 }}>
          josue-patricio.vercel.app
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            color: '#fafafa',
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          {personalInfo.name}
        </div>
        <div style={{ display: 'flex', color: '#2dd4bf', fontSize: 36 }}>
          {personalInfo.title.en} · React · React Native · .NET
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {stack.map((tech) => (
          <div
            key={tech}
            style={{
              display: 'flex',
              border: '1px solid #3f3f46',
              borderRadius: 999,
              padding: '8px 18px',
              color: '#d4d4d8',
              fontSize: 22,
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>,
    size,
  )
}
