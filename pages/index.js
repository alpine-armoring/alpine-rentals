import { useEffect } from 'react';
import { getPageData } from 'hooks/api';

import { BannerFull } from '@este93/shared-components';
import FillingText from 'components/global/filling-text/FillingText';
import FeaturedVehicles from 'components/global/featured-vehicles/FeaturedVehicles';
import Benefits from 'components/global/benefits/Benefits';

function Home(props) {
  const data = props.homepageData.data?.attributes;

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
  useEffect(() => {
    const targets = document.querySelectorAll('.observe');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.toggle('in-view', entry.isIntersecting);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    targets.forEach((item) => observer.observe(item));

    return () => {
      targets.forEach((item) => observer.unobserve(item));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {topBanner ? <BannerFull props={topBanner} /> : null}

      {quote ? <FillingText small dark data={quote} /> : null}

      <FeaturedVehicles data={featuredVehiclesData} />

      <Benefits data={benefitsData} />
    </>
  );
}

export async function getStaticProps() {
  const homepageData = await getPageData({
    route: 'rentals-homepage',
    populate: 'deep',
  });

  const seoData = homepageData.data?.attributes.seo || null;

  return {
    props: { homepageData, seoData },
  };
}

export default Home;
