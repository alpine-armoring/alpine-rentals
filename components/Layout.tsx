import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import localFont from 'next/font/local';
import dynamic from 'next/dynamic';
// import Script from 'next/script';

import Header from './global/header/Header';
import Footer from './global/footer/Footer';
const NavigationPopup = dynamic(
  () => import('components/global/navigation/NavigationPopup'),
  {
    ssr: false,
  }
);
const ScrollToTopButton = dynamic(
  () => import('components/global/scroll-to-top-button/ScrollToTopButton'),
  {
    ssr: false,
  }
);

const termina = localFont({
  src: [
    {
      path: '../public/fonts/Termina-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Termina-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Termina-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Termina-Demi.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

const Layout = ({ children }) => {
  const router = useRouter();

  const pathsDarkMode = [
    '/available-now',
    '/rental-vehicles',
    '/manufacturing',
    '/sold-vehicles',
    '/ballistic-testing',
  ];
  const pathsDarkFooter = ['/manufacturing', '/ballistic-testing'];
  const pathsPadding0 = ['/news/', '/ballistic-testing'];

  const isDarkMode = pathsDarkMode.some((path) =>
    router.pathname.startsWith(path)
  );
  const isDarkFooter = pathsDarkFooter.some((path) =>
    router.pathname.startsWith(path)
  );
  const isHomepage = router.pathname === '/';

  const pathsHeaderTransparent = ['/ballistic-testing'];
  const isHeaderGray = pathsHeaderTransparent.some(
    (path) => router.pathname.startsWith(path) || isHomepage
  );

  const isPadding0 = pathsPadding0.some((path) =>
    router.pathname.startsWith(path)
  );

  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {isDarkMode && (
          <style>{`
              body {
                background: #101010 url(/assets/noise4.png) !important;
                background-size: 30px !important;
              }
              .navigation_submenu{
                background-color: rgba(23, 23, 23, 0.8) !important;
                backdrop-filter: blur(10px) !important;
              }
              .navigation_submenu a{
                color: white;
              }
              .header_logo_gold{
                display: block !important;
              }
              .header_logo_black{
                display: none;
              }
            `}</style>
        )}
        {(isPadding0 || isHomepage) && (
          <style>{`
              body {
                padding-top: 0 !important;
              }
            `}</style>
        )}
        {isHeaderGray && (
          <style>{`
              header,
              .navigation_submenu{
                background-color: rgba(23, 23, 23, 0.8) !important;
                backdrop-filter: blur(10px) !important;
              }
              .navigation_submenu a{
                color: white;
              }
              .header_logo_gold{
                display: block !important;
              }
              .header_logo_black{
                display: none;
              }
            `}</style>
        )}
      </Head>

      {/* Google Tag Manager */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HQE6WWZ9E4"
        strategy="afterInteractive"
      />
      <Script
        id="ga-setup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HQE6WWZ9E4', { page_path: window.location.pathname });
          `,
        }}
      /> */}

      <div className={termina.className}>
        <Header
          isDarkMode={isDarkMode}
          setNavOpen={setNavOpen}
          isNavOpen={isNavOpen}
          isHeaderGray={isHeaderGray}
        />

        <NavigationPopup isNavOpen={isNavOpen} setNavOpen={setNavOpen} />

        {children}

        <ScrollToTopButton />

        <Footer isDarkMode={isDarkFooter} />
      </div>
    </>
  );
};

export default Layout;
