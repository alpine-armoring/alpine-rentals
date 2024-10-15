import React from 'react';
import { getPageData } from 'hooks/api';

import { BannerFull } from '@este93/shared-components';

function Home(props) {
  const data = props.homepageData.data?.attributes;

  const topBanner = {
    title: data?.topBannerTitle,
    description: data?.topBannerDescription,
    video: data?.bannerVideo,
  };

  console.log(props);

  return <>{topBanner ? <BannerFull props={topBanner} /> : null}</>;
}

export async function getStaticProps() {
  const homepageData = await getPageData({
    route: 'rentals-website',
    populate: 'deep',
  });

  const seoData = homepageData.data?.attributes.seo || null;

  return {
    props: { homepageData, seoData },
  };
}

export default Home;
