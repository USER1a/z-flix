// app/layout.tsx

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
// import { TrpcProvider } from '@/client/trpc-provider'; // This line was commented out in your original code
import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@/components/analytics';
import { siteConfig } from '@/configs/site';
import { env } from '@/env.mjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script'; // Ensure this is imported

// REMOVED: export const runtime = 'edge';
// This line was causing the "Event handlers cannot be passed to Client Component props" error
// because it forced the RootLayout into the Edge Runtime, which doesn't support client-side
// interactivity or event handlers directly within its server-side rendering scope.

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Font files can be colocated inside of pages
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: 'StreamVerse - Watch TV Shows Online, Watch Movies Online',
    template: '%s - StreamVerse - Watch TV Shows Online, Watch Movies Online',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    images: siteConfig.ogImage,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author,
  },
  icons: {
    icon: '/favicon.ico',
  },
  other: { referrer: 'no-referrer-when-downgrade' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Adcash Integration using onLoad to ensure proper script execution order */}
      <Script
        id="aclib" // ID from Adcash instructions
        type="text/javascript" // Type from Adcash instructions
        src="//acscdn.com/script/aclib.js"
        strategy="beforeInteractive" // Loads the library early in <head>
        onLoad={() => {
          console.log('Adcash: aclib.js has loaded.');
          // Check if aclib and its method are available before calling
          // Using 'window as any' to bypass TypeScript type checking for global 'aclib'
          if (typeof (window as any).aclib !== 'undefined' && typeof (window as any).aclib.runAutoTag === 'function') {
            try {
              (window as any).aclib.runAutoTag({
                zoneId: '3wxrn4xx94', // Your Adcash Zone ID
              });
              console.log('Adcash: aclib.runAutoTag has been executed.');
            } catch (e) {
              console.error('Adcash: Error executing aclib.runAutoTag:', e);
            }
          } else {
            console.error('Adcash: aclib object or aclib.runAutoTag function is not defined after aclib.js loaded. The Adcash library might not have initialized correctly or as expected.');
          }
        }}
        onError={(e) => {
          // This will trigger if the aclib.js script itself fails to load (e.g., network error, 404)
          console.error('Adcash: Failed to load aclib.js script:', e);
        }}
      />
      {/* Note: The second Adcash <Script> tag for runAutoTag (from the previous attempt) is NOT needed here,
          as its JavaScript logic is now invoked directly and more safely via the onLoad callback above
          once aclib.js has successfully loaded. */}

      <body
        className={cn(
          'overflow-y-auto min-h-screen overflow-x-hidden bg-background font-sans antialiased', // Typo was already corrected
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <TrpcProvider> */} {/* This is commented out in your original code */}
          {children}
          <TailwindIndicator />
          <Analytics />
          <SpeedInsights />
          {/* </TrpcProvider> */}

          {/* Google Analytics */}
          {env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
            <>
              <Script
                id="_next-ga-init"
                dangerouslySetInnerHTML={{
                  __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', { cookie_flags: 'max-age=86400;secure;samesite=none' });`,
                }}
              />
              <Script
                id="_next-ga"
                src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              />
            </>
          )}

          {/* Statcounter Code Integration */}
          <Script
            id="statcounter"
            dangerouslySetInnerHTML={{
              __html: `
var sc_project=13061182;
var sc_invisible=1;
var sc_security="78c4c774";
`,
            }}
          />
          <Script
            src="https://www.statcounter.com/counter/counter.js"
            async
          />
          <noscript>
            <div className="statcounter">
              <a
                title="Web Analytics"
                href="https://statcounter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="statcounter"
                  src="https://c.statcounter.com/13061182/0/78c4c774/1/"
                  alt="Web Analytics"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>
          </noscript>

          {/* Umami Analytics */}
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="f442e6bb-9667-4262-9abd-73a77381c170"
          ></script>
        </ThemeProvider>
      </body>
    </html>
  );
}
