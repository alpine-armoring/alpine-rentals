import styles from './InventoryVehicle.module.scss';
import { getPageData } from 'hooks/api';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const InfoIcon = dynamic(() => import('components/icons/Info'));
import Link from 'next/link';
import Button from 'components/global/button/Button';
import Carousel from 'components/global/carousel/Carousel';
import LightboxCustom from 'components/global/lightbox/LightboxCustom';
import PlayIcon from 'components/icons/Play2';
import InquiryForm from 'components/global/form/InquiryForm';
import VideoScale, {
  animateVideo,
} from 'components/global/video-scale/VideoScale';
import { useMarkdownToHtml } from 'hooks/useMarkdownToHtml';

function InventoryVehicle(props) {
  const data =
    props && props.data && props.data.data[0] && props.data.data[0].attributes;
  const topGallery = data?.rentalsGallery?.data;
  const mainText = data?.rentalsDescription;
  const videoWebm = data?.video?.data?.attributes;
  const videoMP4 = data?.videoMP4?.data?.attributes;

  const convertMarkdown = useMarkdownToHtml();

  const sliderTopOptions = {
    dragFree: false,
    loop: true,
    thumbs: true,
  };

  const vehicleDetailsMain = {
    Level: 'armor_level',
    'Vehicle ID': 'rentalsVehicleID',
    'Engine & Power': 'engine',
    Trans: 'trans',
    Drivetrain: 'driveTrain',
    'Color (Exterior)': 'color_ext',
    'Color (Interior)': 'color_int',
  };

  const formData = {
    title: data?.title.replaceAll(/luxury/gi, ''),
    vehicleID: data?.rentalsVehicleID,
    featuredImage: data?.rentalsFeaturedImage,
  };

  const scroll = () => {
    const element = document.getElementById('request-a-quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const setupObserver = () => {
      const targets = document.querySelectorAll('.observe');
      if (targets.length < 1) {
        setTimeout(setupObserver, 100);
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.toggle('in-view', entry.isIntersecting);
            // observer.unobserve(entry.target);

            // VideoScale
            if (entry.target.classList.contains('videoScaleContainer')) {
              window.addEventListener(
                'scroll',
                () => animateVideo(entry.target),
                { passive: true }
              );
            }
          } else {
            if (entry.target.classList.contains('videoScaleContainer')) {
              window.removeEventListener('scroll', () =>
                animateVideo(entry.target)
              );
            }
          }
        });
      });

      targets.forEach((item) => observer.observe(item));

      return () => {
        targets.forEach((item) => observer.unobserve(item));
        observer.disconnect();
      };
    };

    setupObserver();
  }, []);

  // Lightbox
  const [selectedTitle, setSelectedTitle] = useState('');
  const [contentType, setContentType] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [isLightboxPopupOpen, setLightboxPopupOpen] = useState(false);

  const handleLightboxOpen = (title, location, contentType, url = null) => {
    setSelectedTitle(title);
    setContentType(contentType);
    if (contentType === 'video') {
      setVideoSrc(url);
    }
    setLightboxPopupOpen(true);
  };

  const lightboxData = {
    title: selectedTitle,
    contentType: contentType,
    videoSrc: videoSrc,
  };

  return (
    <div className={`${styles.inventory}`}>
      <div className={`${styles.inventory_main}`}>
        <div className={`${styles.inventory_heading}`}>
          <div className={`${styles.inventory_heading_title}`}>
            {data?.title ? (
              <h1
                dangerouslySetInnerHTML={{
                  __html: `Rental ${data.title.replaceAll(/luxury/gi, '')}`,
                }}
              ></h1>
            ) : null}
          </div>

          {data?.flag !== 'sold' ? (
            <div className={`${styles.inventory_heading_description}`}>
              <InfoIcon />
              <p>
                This {data?.title.replaceAll(/luxury/gi, '')} is now available
                for rental
              </p>
            </div>
          ) : null}
        </div>

        <div className={`${styles.inventory_top}`}>
          <div className={`${styles.inventory_top_gallery}`}>
            <div
              className={`
              ${styles.inventory_top_gallery_wrap}              
              ${data?.flag == 'sold' ? styles.inventory_top_gallery_wrap_sold : ''} 
            `}
            >
              {topGallery ? (
                <Carousel slides={topGallery} options={sliderTopOptions} />
              ) : null}

              {data?.flag == 'sold' ? (
                <div
                  className={`${styles.inventory_top_gallery_wrap_sold_label}`}
                >
                  <span>Sold</span>
                </div>
              ) : null}

              {data?.armor_level || data?.videoURL ? (
                <div className={`${styles.inventory_info}`}>
                  {data?.armor_level ? (
                    <Link
                      href="/ballistic-chart"
                      className={`${styles.inventory_armor}`}
                    >
                      <div className={`${styles.inventory_armor_box}`}>
                        Armor
                        <span>Level</span>
                      </div>
                      <strong>{data?.armor_level}</strong>
                    </Link>
                  ) : null}
                  {data?.videoURL ? (
                    <div
                      onClick={() =>
                        handleLightboxOpen(
                          data.title,
                          '',
                          'video',
                          data.videoURL
                        )
                      }
                      className={`${styles.inventory_armor}`}
                    >
                      <div className={`${styles.inventory_armor_box}`}>
                        Watch
                        <span>Video</span>
                      </div>
                      <PlayIcon />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div
              className={`${styles.inventory_top_shape} shape-before shape-before-dark mobile-only`}
            ></div>
          </div>

          <div className={`${styles.inventory_details}`}>
            <ul className={`${styles.inventory_details_list}`}>
              {Object.entries(vehicleDetailsMain).map(([key, value]) => {
                let dimensionValue = null;

                if (
                  data &&
                  data[value] != null &&
                  data[value] != '' &&
                  data[value] != ' '
                ) {
                  if (key === 'Weight (Armored)') {
                    // Apply thousands separator to the pounds value if it's in the thousands
                    const poundsValue =
                      parseInt(data[value]) >= 1000
                        ? parseInt(data[value]).toLocaleString()
                        : parseInt(data[value]);
                    // Convert pounds to kilograms and round to the nearest whole number
                    const weightInKg = Math.round(data[value] * 0.45359237);
                    // Apply thousands separator to the kilograms value if it's in the thousands
                    const kilogramsValue =
                      weightInKg >= 1000
                        ? weightInKg.toLocaleString()
                        : weightInKg;
                    dimensionValue = `${poundsValue} lbs (${kilogramsValue} kg)`;
                  } else if (
                    ['Height', 'Length', 'Width', 'Wheelbase'].includes(key)
                  ) {
                    // Convert inches to centimeters
                    dimensionValue = `${data[value]} in. (${Math.round(
                      data[value] * 2.54
                    )} cm)`;
                  } else {
                    dimensionValue = data[value];
                  }
                }

                return (
                  data &&
                  data[value] != null &&
                  data[value] != '' &&
                  data[value] != ' ' && (
                    <li
                      key={key}
                      className={`${styles.inventory_details_list_item}`}
                    >
                      {`${key}:`}
                      <span>{dimensionValue}</span>
                    </li>
                  )
                );
              })}
            </ul>

            {data?.rentalsShortDescription ? (
              <div
                className={`${styles.inventory_details_description}`}
                dangerouslySetInnerHTML={{
                  __html: convertMarkdown(data?.rentalsShortDescription),
                }}
              ></div>
            ) : null}

            <div className={`${styles.inventory_cta_wrap}`}>
              <Button
                onClick={scroll}
                button={true}
                className={`${styles.inventory_cta} primary attention`}
                attention
              >
                Request a quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {mainText ? (
        <div
          className={`${styles.inventory_description} container_small`}
          dangerouslySetInnerHTML={{ __html: convertMarkdown(mainText) }}
        ></div>
      ) : null}

      {videoWebm || videoMP4 ? (
        <VideoScale videoWebm={videoWebm} videoMP4={videoMP4} />
      ) : null}

      {formData ? <InquiryForm {...formData} className={`formCTA`} /> : null}

      {isLightboxPopupOpen ? (
        <LightboxCustom
          isLightboxPopupOpen={isLightboxPopupOpen}
          lightboxData={lightboxData}
          setLightboxPopupOpen={setLightboxPopupOpen}
        />
      ) : null}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const data = await getPageData({
//     route: 'inventories',
//     params: `filters[slug][$eq]=${context.params.slug}`,
//   });

//   const seoData = data?.data?.[0]?.attributes?.seo ?? null;

//   if (!data || !data.data || data.data.length === 0) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { data, seoData },
//   };
// }

export async function getStaticPaths() {
  try {
    const slugsResponse = await getPageData({
      route: 'inventories',
      fields: 'fields[0]=slug',
      populate: '/',
    });

    if (!Array.isArray(slugsResponse.data)) {
      throw new Error('Invalid data format');
    }

    const paths = slugsResponse.data.reduce((acc, item) => {
      if (item.attributes && item.attributes.slug) {
        acc.push({ params: { slug: item.attributes.slug } });
      }
      return acc;
    }, []);

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    // console.error('Error fetching slugs:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  const data = await getPageData({
    route: 'inventories',
    params: `filters[slug][$eq]=${params.slug}`,
  });

  const seoData = data?.data?.[0]?.attributes?.seo ?? null;
  if (seoData) {
    seoData.thumbnail =
      data?.data?.[0]?.attributes?.rentalsFeaturedImage?.data?.attributes ??
      null;
  }

  if (!data || !data.data || data.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, seoData },
  };
}

export default InventoryVehicle;
