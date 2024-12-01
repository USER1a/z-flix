import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
// import { TrpcProvider } from '@/client/trpc-provider';
import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@/components/analytics';
import { siteConfig } from '@/configs/site';
import { env } from '@/env.mjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export const runtime = 'edge';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Font files can be colocated inside of `pages`
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
    template: `%s - StreamVerse - Watch TV Shows Online, Watch Movies Online`,
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
      <body
        className={cn(
          'overlflow-y-auto min-h-screen overflow-x-hidden bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {/* <TrpcProvider> */}
          {children}
          <TailwindIndicator />
          <Analytics />
          <SpeedInsights />
          {/* </TrpcProvider> */}
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
          <script defer src="https://cloud.umami.is/script.js" data-website-id="f442e6bb-9667-4262-9abd-73a77381c170"></script>
          <script type="text/javascript" data-cfasync="false">
/*<![CDATA[/* */
(function(){var c=window,d="c45fdd13b81808e704f8cec79d2fdcd7",a=[["siteId",413+416-266+744*347+4896082],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],m=["d3d3LmRpc3BsYXl2ZXJ0aXNpbmcuY29tL2Rqcy15YW1sLm1pbi5jc3M=","ZDNtem9rdHk5NTFjNXcuY2xvdWRmcm9udC5uZXQveXJSbG9SL3ZVUE5HLm1pbi5qcw=="],s=-1,h,t,q=function(){clearTimeout(t);s++;if(m[s]&&!(1758996414000<(new Date).getTime()&&1<s)){h=c.document.createElement("script");h.type="text/javascript";h.async=!0;var k=c.document.getElementsByTagName("script")[0];h.src="https://"+atob(m[s]);h.crossOrigin="anonymous";h.onerror=q;h.onload=function(){clearTimeout(t);c[d.slice(0,16)+d.slice(0,16)]||q()};t=setTimeout(q,5E3);k.parentNode.insertBefore(h,k)}};if(!c[d]){try{Object.freeze(c[d]=a)}catch(e){}q()}})();
/*]]>/* */
</script>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
