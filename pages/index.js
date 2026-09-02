import { getPageData } from 'hooks/api';
import useAnimationObserver from 'hooks/useAnimationObserver';
import Head from 'next/head';

// import { BannerFull } from '@este93/shared-components';
import HPBanner from 'components/hp-banner/HPBanner';
import FillingText from 'components/global/filling-text/FillingText';
import FeaturedVehicles from 'components/global/featured-vehicles/FeaturedVehicles';
import Benefits from 'components/global/benefits/Benefits';

function Home(props) {
  const data = props.homepageData.data?.attributes;

  const getOrganizationStructuredData = () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      image:
        'https://assets.alpineco.com/medium_About_us_hompage_thumbnail_1_ea1c33f592.JPG',
      url: 'https://www.armoredautos.com/',
      sameAs: ['https://www.alpineco.com/'],
      logo: 'https://www.alpineco.com/assets/Alpine-Armoring-Armored-Vehicles.png',
      name: 'Alpine Armoring Rentals',
      description:
        'The largest collection of high-end, luxury armored sedans and SUVs available for rental in the US.',
      email: 'rental@armoredautos.com',
      telephone: '+1 703 471 0002',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4170 Lafayette Center Drive #100',
        addressLocality: 'Chantilly',
        addressCountry: 'US',
        addressRegion: 'Virginia',
        postalCode: '20151',
      },
    };

    return JSON.stringify(structuredData);
  };

  const topBanner = {
    title: data?.topBannerTitle,
    description: data?.topBannerDescription,
    video: data?.bannerVideo,
    white: true,
  };

  const quote = data?.quote;

  const featuredVehiclesData = {
    title: data?.featuredVehiclesTitle,
    items: data?.featuredRentalVehicles?.data,
  };

  const benefitsData = {
    section1Title: data?.section1Title,
    section1Text: data?.section1Text,
    section1List: data?.section1List,
    section1Text2: data?.section1text2,
    section2Title: data?.section2title,
    section2Text: data?.section2text,
  };

  // Animations
  useAnimationObserver();

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getOrganizationStructuredData() }}
          key="organization-jsonld"
        />
      </Head>

      {topBanner ? <HPBanner props={topBanner} /> : null}

      {quote ? <FillingText small dark data={quote} /> : null}

      <FeaturedVehicles data={featuredVehiclesData} />

      <Benefits data={benefitsData} />
    </>
  );
}

export async function getStaticProps() {
  // Targeted populate instead of `deep`: the homepage only renders a handful of
  // fields, but `featuredRentalVehicles` is a relation to the full vehicle
  // collection. `deep` pulled every vehicle's galleries/videos/seo/faqs,
  // ballooning the static payload past Vercel's ~19 MB ISR limit and breaking
  // deploys. Keep this in sync with what the components below actually read.
  const homepageQuery = [
    'populate[bannerVideo][populate][video_webm][fields][0]=url',
    'populate[bannerVideo][populate][video_webm][fields][1]=mime',
    'populate[bannerVideo][populate][video_mp4][fields][0]=url',
    'populate[bannerVideo][populate][video_mp4][fields][1]=mime',
    'populate[quote][fields][0]=text',
    'populate[quote][fields][1]=title',
    'populate[featuredRentalVehicles][fields][0]=slug',
    'populate[featuredRentalVehicles][fields][1]=title',
    'populate[featuredRentalVehicles][populate][transparentImage][fields][0]=url',
    'populate[featuredRentalVehicles][populate][transparentImage][fields][1]=alternativeText',
    'populate[featuredRentalVehicles][populate][transparentImage][fields][2]=formats',
    'populate[section1List][populate][image][fields][0]=url',
    'populate[seo][populate][metaImage][fields][0]=url',
    'populate[seo][populate][metaImage][fields][1]=formats',
    'populate[seo][populate][metaSocial][populate][image][fields][0]=url',
    'populate[seo][populate][metaSocial][populate][image][fields][1]=formats',
  ].join('&');

  const homepageData = await getPageData({
    route: 'rentals-homepage',
    custom: homepageQuery,
  });

  const seoData = homepageData.data?.attributes.seo || null;

  return {
    props: { homepageData, seoData },
  };
}

export default Home;
