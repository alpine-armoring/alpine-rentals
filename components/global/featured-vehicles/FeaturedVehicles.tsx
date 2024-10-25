import styles from './FeaturedVehicles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useState, useEffect } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import Button from 'components/global/button/Button';

const FeaturedVehicles = (props) => {
  console.log(props);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = {
    dragFree: false,
    loop: true,
  };

  const [sliderRef, emblaMainApi] = useEmblaCarousel(options);

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;

    onSelect();
    emblaMainApi.on('select', onSelect);

    return () => {
      emblaMainApi.off('select', onSelect);
    };
  }, [emblaMainApi, onSelect]);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaMainApi) return;
    emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaMainApi) return;
    emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  return (
    <div className={`${styles.featuredVehicles_container}`}>
      {props.data && props.data.length > 0 ? (
        <div className={`${styles.featuredVehicles_slider}`} ref={sliderRef}>
          <div className={`${styles.featuredVehicles_slider_container}`}>
            {props.data.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.featuredVehicles_slider_item} ${
                  selectedIndex === index ? styles.active : ''
                }`}
              >
                {item.attributes.transparentImage.data ? (
                  <div className={`${styles.featuredVehicles_slider_image}`}>
                    <Image
                      src={`${
                        item.attributes.transparentImage.data.attributes.formats
                          .medium.url ||
                        item.attributes.transparentImage.data.attributes.url
                      }`}
                      alt={
                        item.attributes.transparentImage.data.attributes
                          .alternativeText || 'Alpine Armoring'
                      }
                      width={750}
                      height={400}
                      priority={index === 0}
                      // sizes="(max-width: 1600px) 50vw, 30vw"
                    />
                  </div>
                ) : null}

                <Link
                  href={`/armored-rentals/${item.attributes.slug}`}
                  className={`${styles.featuredVehicles_slider_item_content}`}
                >
                  <h3
                    className={`${styles.featuredVehicles_slider_item_title}`}
                    dangerouslySetInnerHTML={{
                      __html: item.attributes.title,
                    }}
                  ></h3>

                  <Button
                    className={`${styles.featuredVehicles_slider_item_button} primary rounded`}
                    button
                  >
                    View vehicle
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className={`${styles.lightbox_slider_arrows}`}>
        <button
          onClick={onPrevButtonClick}
          className={`${styles.lightbox_slider_arrow}`}
        >
          <svg viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            />
          </svg>
        </button>

        <button
          onClick={onNextButtonClick}
          className={`${styles.lightbox_slider_arrow} ${styles.lightbox_slider_arrow_next}`}
        >
          <svg viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeaturedVehicles;