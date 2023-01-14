import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <Script src="/noFlash.js" strategy="beforeInteractive" />
      </Head>
      <body className="bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
