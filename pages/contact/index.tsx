import styles from './Contact.module.scss';
import { getPageData } from 'hooks/api';
import { useEffect } from 'react';
import Banner from 'components/global/banner/Banner';
import Form from 'components/global/form/Form';
import Accordion from 'components/global/accordion/Accordion';

function Contact(props) {
  const faqs = props?.pageData?.rentals_faqs;

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
      <div className={`${styles.contact}`}>
        {props.pageData?.banner ? (
          <Banner props={props.pageData.banner} shape="white" />
        ) : null}
        <div className={`${styles.contact_main} container_small`}>
          <div className={`${styles.contact_main_left}`}>
            <Form />
          </div>

          <div className={`${styles.contact_main_right}`}>
            <div className={`${styles.contact_main_right_boxes}`}>
              <div className={`${styles.contact_main_right_column}`}>
                <h3 className={`${styles.contact_main_right_title}`}>
                  Our rental support team is available on:
                </h3>
                <p>
                  <strong>Monday - Friday</strong> <br /> 8:30 AM - 5:00 PM EST.
                </p>
                <p>
                  <strong>Toll Free:</strong>
                  <a
                    href="tel:+18009927667"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    1-800-99ARMOR (1-800-992-7667)
                  </a>
                </p>
                <p>
                  <strong>Tel:</strong>
                  <a
                    href="tel:+7034710002"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    703-471-0002
                  </a>
                </p>
                <p>
                  <strong>Fax:</strong>
                  <a
                    href="tel:+7034710202"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    703-471-0202
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:rental@armoredautos.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rental@ArmoredAutos.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {faqs?.data.length > 0 ? (
          <Accordion
            items={faqs.data}
            title="Frequently asked questions"
            button
          />
        ) : null}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let pageData = await getPageData({
    route: 'contact-page',
    populate: 'deep',
  });
  pageData = pageData.data?.attributes || null;

  const seoData = pageData?.seo ?? null;

  return {
    props: { pageData, seoData },
  };
}

export default Contact;
