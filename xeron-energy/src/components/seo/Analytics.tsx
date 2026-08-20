import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set, so local development and
 * preview deployments stay out of your reporting. Set it in your host's
 * environment variables (Vercel → Settings → Environment Variables) once you
 * have created a GA4 property; the value looks like "G-XXXXXXXXXX".
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
