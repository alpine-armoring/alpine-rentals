import { getPageData } from 'hooks/api';
import useAnimationObserver from 'hooks/useAnimationObserver';
import LocationsList from 'components/global/locations/Locations';
import CustomMarkdown from 'components/CustomMarkdown';
import styles from './Locations.module.scss';

function Locations(props) {
  const posts = props?.posts;

  // Animations
  useAnimationObserver({
    dependencies: [props.pageData],
  });

  return (
    <>
      <div className={`${styles.locations}`}>
        <div className={`${styles.locations_inner} container_small`}>
          <div className={`${styles.locations_heading}`}>
            <h1 className={`${styles.locations_title} block-reveal observe`}>
              Locations We Rent
            </h1>
            {props.pageData?.defaultText ? (
              <div className={`${styles.locations_description}`}>
                <CustomMarkdown>{props.pageData?.defaultText}</CustomMarkdown>
              </div>
            ) : null}
          </div>

          {posts ? <LocationsList props={posts} /> : null}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let pageData = await getPageData({
    route: 'rentals-locations-page',
    populate: 'deep',
  });
  pageData = pageData?.data?.attributes || null;

  const pageSize = 100;
  let allPosts = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await getPageData({
      route: 'locations-rentals',
      populate: 'seo',
      sort: 'excerpt',
      fields: 'fields[0]=excerpt&fields[1]=slug&fields[2]=title',
      pageSize: pageSize,
      page: page,
    });
    const posts = response?.data || [];
    allPosts = [...allPosts, ...posts];
    totalPages = response?.meta?.pagination?.pageCount || 1;
    page++;
  }

  const seoData = {
    ...(pageData?.seo || {}),
  };

  return {
    props: { pageData, posts: allPosts, seoData },
  };
}

export default Locations;
