import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Rizki Revandita Pratama — Web Developer & Designer</title>
        <meta name="description" content="Portfolio Rizki Revandita Pratama (Vann) — Web Developer & Designer" />
        <meta property="og:title" content="Rizki Revandita Pratama — Web Developer & Designer" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
