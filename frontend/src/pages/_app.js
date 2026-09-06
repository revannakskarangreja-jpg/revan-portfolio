import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Rizki Revandita Pratama — Web Developer & Designer</title>
        <meta name="description" content="Portfolio Rizki Revandita Pratama (Vann) — Web Developer & Designer" />
        <meta property="og:title" content="Rizki Revandita Pratama — Web Developer & Designer" />
        <meta property="og:description" content="Portfolio Rizki Revandita Pratama (Vann) — Web Developer & Designer" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
