import { getPageData } from 'hooks/api';
import useAnimationObserver from 'hooks/useAnimationObserver';

import Banner from 'components/global/banner/Banner';
import BallisticChart from 'components/global/ballistic-chart/BallisticChart';
import BallisticChartBottom from 'components/global/ballistic-chart/BallisticChartBottom';

function Ballistic(props) {
  // Animations
  useAnimationObserver();

  return (
    <>
      {props.pageData?.banner ? (
        <Banner props={props.pageData.banner} shape="white" />
      ) : null}

      <BallisticChart />

      <BallisticChartBottom
        BallisticStandards={props?.pageData?.BallisticStandards}
        bulletPoster={props?.pageData?.bulletPoster?.data?.attributes}
        ammunitionChartPDF={
          props?.pageData?.ammunitionChartPDF.data?.attributes
        }
      />
    </>
  );
}

export async function getStaticProps() {
  let pageData = await getPageData({
    route: 'ballistic-chart',
    populate: 'deep',
  });
  pageData = pageData.data?.attributes || null;

  const seoData = pageData?.seo || null;
  if (seoData) {
    seoData.metaTitle = `Alpine Armoring Rentals Ballistic Chart`;
  }

  return {
    props: { pageData, seoData },
  };
}

export default Ballistic;
