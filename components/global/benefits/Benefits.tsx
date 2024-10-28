import styles from './Benefits.module.scss';
import Image from 'next/image';

const Benefits = () => {
  return (
    <div className={`${styles.benefits} container_small`}>
      <h2 className="c-title">The Alpine Armoring Difference</h2>
      <p>
        Alpine Armoring strives to make renting armored vehicles easier for our
        customers by providing a personalized and hassle-free experience, be it
        a short-term rental or a long-term lease. Our experienced team is
        committed to delivering a seamless experience, tailoring each rental to
        the specific requirements of our clientele.
      </p>

      <div className={`${styles.benefits_list}`}>
        <div className={`${styles.benefits_item}`}>
          <div className={`${styles.benefits_item_heading}`}>
            <Image
              src="/assets/dollar.svg"
              alt="armored vehicles"
              width={40}
              height={40}
              className={`${styles.benefits_item_icon}`}
            />
            <h3 className={`${styles.benefits_item_title}`}>
              Competitive Pricing
            </h3>
          </div>
          <p className={`${styles.benefits_item_text}`}>
            Our customers can be rest assured that they will be provided with
            competitive pricing with special incentives for bulk rentals or
            long-term leases.
          </p>
        </div>
        <div className={`${styles.benefits_item}`}>
          <div className={`${styles.benefits_item_heading}`}>
            <Image
              src="/assets/US.svg"
              alt="armored vehicles"
              width={40}
              height={40}
              className={`${styles.benefits_item_icon}`}
            />
            <h3 className={`${styles.benefits_item_title}`}>
              Shipping to anywhere in the US
            </h3>
          </div>
          <p className={`${styles.benefits_item_text}`}>
            For your convenience we provide an option to have the vehicle
            delivered to the location of your choice anywhere in the US.
          </p>
        </div>
        <div className={`${styles.benefits_item}`}>
          <div className={`${styles.benefits_item_heading}`}>
            <Image
              src="/assets/fast.png"
              alt="armored vehicles"
              width={40}
              height={40}
              className={`${styles.benefits_item_icon}`}
            />
            <h3 className={`${styles.benefits_item_title}`}>
              Guaranteed on Time Delivery
            </h3>
          </div>
          <p className={`${styles.benefits_item_text}`}>
            We guarantee that the rental vehicle will be delivered at the agreed
            location on the date promised in a clean/ perfect condition.
          </p>
        </div>
      </div>

      <p>
        With our extensive experience assisting numerous embassies and
        government officials, we understand the importance of discretion and
        precision, making us the trusted choice for armored transportation
        solutions.
      </p>
    </div>
  );
};

export default Benefits;
