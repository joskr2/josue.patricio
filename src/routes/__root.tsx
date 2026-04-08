import { createRootRoute, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BlurProvider } from '@/contexts/BlurContext'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { getLocaleFromCookie } from '@/lib/i18n-cookie'
import { defaultLocale } from '@/lib/i18n'
import appCss from '../styles/tailwind.css?url'

export const Route = createRootRoute({
  loader: async (loaderContext: { context: { request?: Request } }) => {
    // Server-side: read locale from cookie header
    const request = loaderContext.context.request
    const cookieHeader = request?.headers.get('cookie')
    const locale = cookieHeader ? getLocaleFromCookie(cookieHeader) : defaultLocale
    return { locale }
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Josue Patricio - Software Engineer' },
      { name: 'description', content: 'Software Engineer specialized in React and .NET' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const { locale } = Route.useLoaderData()

  return (
    <LocaleProvider initialLocale={locale}>
      <BlurProvider>
        <RootDocument>
          <Header />
          <main className="flex-1 pt-16">
            <Outlet />
          </main>
          <Footer />
        </RootDocument>
      </BlurProvider>
    </LocaleProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
