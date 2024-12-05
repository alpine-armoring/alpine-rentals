import { useEffect } from 'react';
import { getPageData } from 'hooks/api';
import styles from '/components/listing/Listing.module.scss';
import InventoryItem from 'components/listing/listing-item/ListingItem';
import Banner from 'components/global/banner/Banner';

function Home(props) {
  const topBanner = { ...props?.pageData?.attributes?.inventoryBanner };
  const topBannerSubtitle =
    props?.pageData?.attributes?.inventoryBanner.subtitle;
  topBanner.subtitle = null;

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
      <div className={`${styles.listing}`}>
        {topBanner.title && <Banner props={topBanner} shape="white" />}

        {topBannerSubtitle ? (
          <p className={`${styles.listing_heading} center container`}>
            {topBannerSubtitle}
          </p>
        ) : null}

        <div
          className={`${styles.listing_wrap} ${styles.listing_wrap_inventory} container mt0`}
        >
          {props.vehicles.data && props.vehicles.data.length > 0 ? (
            <div className={`${styles.listing_list}`}>
              {props.vehicles.data.map((item, index) => (
                <InventoryItem key={item.id} props={item} index={index} />
              ))}
            </div>
          ) : (
            <div className={`${styles.listing_list_error}`}>
              No Vehicles Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const query = `filters[categories][slug][$eq]=armored-rental`;

  const vehicles = await getPageData({
    route: 'inventories',
    params: query,
    sort: 'order',
    populate: 'rentalsFeaturedImage',
    fields:
      'fields[0]=rentalsVehicleID&fields[1]=armor_level&fields[2]=engine&fields[3]=engine&fields[4]=title&fields[5]=slug&fields[6]=trans',
    pageSize: 100,
  });

  // Fetching Types for the Filters
  let pageData = await getPageData({
    route: 'categories',
    params: `filters[slug][$eq]=armored-rental&populate[inventoryBanner][populate][media]=*&populate[inventoryBanner][populate][mediaMP4]=*&populate[inventoryBanner][populate][imageMobile]=*`,
    populate: 'inventoryBanner, seo',
  }).then((response) => response.data);

  pageData = pageData ? pageData[0] : null;

  const seoData = pageData?.attributes?.seo ?? null;

  return {
    props: {
      pageData,
      vehicles,
      seoData,
    },
  };
}

export default Home;
