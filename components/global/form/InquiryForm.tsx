import styles from './InquiryForm.module.scss';
import Image from 'next/image';
import Form from 'components/global/form/Form';

const InquiryForm = (props) => {
  const vehicle = {
    data: [
      {
        attributes: {
          title: props.title,
          prefilled: true,
        },
      },
    ],
  };

  return (
    <div
      className={`${styles.inquiry_form_wrap} inquiryFormContainer observe`}
      id="request-a-quote"
    >
      <div
        className={`
                ${styles.inquiry_form}
                ${props.plain ? styles.inquiry_form_plain : ''}
            `}
      >
        <div className={`shapeCurved_leftBottom shapeCurved`}></div>

        <div className={`${styles.inquiry_form_inner} container_small`}>
          <div className={`${styles.inquiry_form_left}`}>
            <div className={`${styles.inquiry_form_heading}`}>
              You are inquiring about this <br /> ready-to-rent
              <p>
                <strong
                  dangerouslySetInnerHTML={{
                    __html: `${props?.title}`,
                  }}
                ></strong>
              </p>
            </div>

            {props?.featuredImage?.data ? (
              <Image
                src={
                  props.plain
                    ? props?.featuredImage?.data.attributes.formats?.medium
                        .url || props?.featuredImage?.data.attributes.url
                    : props?.featuredImage?.data.attributes.formats?.thumbnail
                        .url || props?.featuredImage?.data.attributes.url
                }
                alt={
                  props?.featuredImage?.data.attributes.alternativeText ||
                  'Alpine Armoring'
                }
                width={
                  props.plain
                    ? props?.featuredImage?.data.attributes.formats?.medium
                        .width
                    : 500
                }
                height={
                  props.plain
                    ? props?.featuredImage?.data.attributes.formats?.medium
                        .height
                    : 395
                }
              />
            ) : null}
            <div className={`${styles.inquiry_form_heading}`}>
              {!props.plain && props?.vehicleID ? (
                <span>
                  Vehicle ID: <strong>{props?.vehicleID}</strong>
                </span>
              ) : null}
            </div>
          </div>

          <Form vehicles={vehicle} />
        </div>

        <div className={`shapeCurved_rightBottom shapeCurved`}></div>
      </div>
    </div>
  );
};

export default InquiryForm;
