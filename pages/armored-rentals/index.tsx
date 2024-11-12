import React from 'react';
import { getPageData } from 'hooks/api';
import styles from '/components/listing/Listing.module.scss';
import InventoryItem from 'components/listing/listing-item/ListingItem';

function Home(props) {
  return (
    <>
      <div className={`${styles.listing}`}>
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

      <div className={`observe bottomObserver`}></div>

      <div className="shape-before shape-before-white"></div>
    </>
  );
}

export async function getServerSideProps(context) {
  let query = `filters[categories][slug][$eq]=armored-rental`;
  const q = context.query.q;
  if (q) {
    query += (query ? '&' : '') + `filters[slug][$notNull]=true`;
  }

  const vehicles = await getPageData({
    route: 'inventories',
    params: query,
    sort: 'order',
    //   populate: 'featuredImage',
    //   fields:
    //     'fields[0]=VIN&fields[1]=armor_level&fields[2]=vehicleID&fields[3]=engine&fields[4]=title&fields[5]=slug&fields[6]=flag&fields[7]=label&fields[8]=ownPage&fields[9]=hide',
    pageSize: 100,
  });

  const filteredVehicles = {
    ...vehicles,
    data: vehicles.data?.filter((vehicle) => {
      if (vehicle.attributes.hide === true) return false;
      if (!q) return true;

      const searchTerms = q.toLowerCase().replace(/[-\s]/g, '');
      const slug = vehicle.attributes.slug.toLowerCase().replace(/[-\s]/g, '');

      return slug.includes(searchTerms);
    }),
  };

  // Fetching Types for the Filters
  const type = await getPageData({
    route: 'categories',
    custom: `populate[inventory_vehicles][fields][0]=''&populate[inventoryBanner][populate][media][fields][0]=url&populate[inventoryBanner][populate][media][fields][1]=mime&populate[inventoryBanner][populate][media][fields][2]=alternativeText&populate[inventoryBanner][populate][media][fields][3]=width&populate[inventoryBanner][populate][media][fields][4]=height&populate[inventoryBanner][populate][media][fields][5]=formats&populate[inventoryBanner][populate][mediaMP4][fields][0]=url&populate[inventoryBanner][populate][mediaMP4][fields][1]=mime&populate[seo][populate][metaImage][fields][0]=url&populate[seo][populate][metaSocial][fields][0]=url&sort=order:asc&fields[0]=title&fields[1]=slug&populate[inventoryBanner][populate][imageMobile][fields][0]=url&populate[inventoryBanner][populate][imageMobile][fields][1]=mime&populate[inventoryBanner][populate][imageMobile][fields][2]=alternativeText&populate[inventoryBanner][populate][imageMobile][fields][3]=width&populate[inventoryBanner][populate][imageMobile][fields][4]=height&populate[inventoryBanner][populate][imageMobile][fields][5]=formats`,
  }).then((response) => response.data);

  const filters = type ? { type } : {};

  let seoData = filters.type?.find(
    (item) => item.attributes.slug === context.query.type
  );

  seoData = seoData?.attributes?.seo ?? null;

  return {
    props: {
      vehicles: filteredVehicles,
      // filters,
      // query: context.query.type,
      seoData,
    },
  };
}

export default Home;
