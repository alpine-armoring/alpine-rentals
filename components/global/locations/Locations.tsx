import Link from 'next/link';
import styles from './Locations.module.scss';
import React from 'react';

const Article = (props) => {
  const posts = props?.props;

  return (
    <div className={`${styles.locations_wrap}`}>
      {posts.length > 0 && (
        <div className={`${styles.locations_category}`}>
          <div className={`${styles.locations_list}`}>
            {posts.map((item, index) => (
              <React.Fragment key={`city-${index}`}>
                <Link
                  className={`${styles.locations_card} observe fade-in-up`}
                  href={`locations-we-rent/${item.attributes.slug}`}
                >
                  <div className={`${styles.locations_card_country}`}>
                    <h3>{item.attributes.excerpt}</h3>
                  </div>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
