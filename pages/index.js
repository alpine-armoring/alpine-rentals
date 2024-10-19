import { useEffect } from 'react';
import { getPageData } from 'hooks/api';

import { BannerFull } from '@este93/shared-components';
import FillingText from 'components/global/filling-text/FillingText';

function Home(props) {
  const data = props.homepageData.data?.attributes;

  const topBanner = {
    title: data?.topBannerTitle,
    description: data?.topBannerDescription,
    video: data?.bannerVideo,
  };
  const quote = data?.quote;

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

      <div className="background-dark">
        {quote ? <FillingText className="padding" data={quote} /> : null}
      </div>
    </>
  );
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
