import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from 'components/global/button/Button';
import useAnimationObserver from 'hooks/useAnimationObserver';
import styles from './AboutUs.module.scss';

const keyFacts = [
  {
    label: 'Founded',
    value: '1993, Chantilly, Virginia (25 miles from Washington, D.C.)',
  },
  {
    label: 'Penetrations',
    value: '0 across thousands of vehicles delivered worldwide',
  },
  {
    label: 'Protection Level',
    value: 'Alpine A9 (CEN B6+ / NIJ RF2)',
  },
  {
    label: 'Certifications',
    value:
      'VR7, Beschussamt München (Germany); U.S. Army Aberdeen Proving Ground',
  },
  {
    label: 'Government Status',
    value: 'Long-term GSA contract holder',
  },
  {
    label: 'Manufacturing',
    value:
      '150,000+ sq ft facility, up to 30 vehicles per month, built in-house',
  },
  {
    label: 'Clients Served',
    value:
      'U.S. government agencies, U.S. military, the United Nations, embassies, NGOs, 75+ foreign governments',
  },
  {
    label: 'Rental Delivery',
    value: 'Any city in the 48 contiguous United States',
  },
];

const features = [
  {
    eyebrow: 'Clientele',
    title: 'Who Rents From Us',
    body: (
      <p>
        Our rental clients include private individuals, high-net-worth
        individuals (HNWI), executives, celebrities from entertainment and
        professional sports, and dignitaries, alongside security outfits,
        embassies, consulates, limousine operators, and brokers. Many of our
        rentals are designated for the United Nations General Assembly,
        presidential requirements, the U.S. Secret Service, various government
        agencies, and NGOs.
      </p>
    ),
    imageAlt:
      'Executive protection detail escorting a client to an armored Alpine Armoring rental vehicle',
    imagePlaceholder:
      'Placeholder — protection detail escorting a client to the vehicle',
    todoSrc: '/assets/about/clientele.jpg',
  },
  {
    eyebrow: 'Protection',
    title: 'How Our Rental Fleet Is Protected',
    body: (
      <>
        <p>
          Every rental vehicle, at minimum, is equipped with our Level A9
          protection, equivalent to CEN B6+ and NIJ RF2. The A9 level typically
          protects against AR-15 rifles, including 7.62 x 39, 7.62 x 51, and
          5.56 x 45 rounds, as well as M80 ball ammunition. The floor is
          protected against two DM51 hand grenades and fragmentation. View the
          full threat ballistic table on our{' '}
          <Link href="/ballistic-chart">Ballistic Chart</Link>.
        </p>
        <p>
          Our A9 level builds use certified AR500, AR550, and AR600 ballistic
          steel at 1/4 inch or 5/16 inch thick, installed with a full overlap
          system at the doors, pillars, and body panels so no gaps remain. We
          remove all OEM glass and replace it with no-spall, multi-layered
          bullet-resistant glass. The final conversion package includes run-flat
          inserts, protected fuel tanks, battery and ECM shielding,
          anti-sabotage exhaust protection, heavy-duty suspension and braking,
          and a PA and multi-siren system with hidden LED strobes.
        </p>
      </>
    ),
    imageAlt:
      'Detail shot of layered ballistic steel and multi-layered bullet-resistant glass on an Alpine Armoring conversion',
    imagePlaceholder:
      'Placeholder — ballistic door panel / glass layering detail',
    todoSrc: '/assets/about/protection.jpg',
    bgTint: true,
    reverse: true,
  },
  {
    eyebrow: 'Logistics',
    title: 'How the Vehicle Reaches You',
    body: (
      <>
        <p>
          Our Logistics Department can handle rental delivery to any city in the
          48 contiguous states. Upon request and on a case-by-case basis,
          vehicles are carried in an enclosed carrier, open carrier, or flatbed
          through a network of vetted professional drivers.
        </p>
        <p>
          We guarantee every vehicle arriving at the agreed location on the
          exact promised date and time, in perfect condition. Clients in
          Washington, D.C. can often receive same-day delivery. For
          documentation and insurance requirements, see our{' '}
          <Link href="/rental-policy">Rental Policy</Link>. For city coverage,
          see <Link href="/locations-we-rent">Locations We Rent</Link>.
        </p>
        <p>
          Our rental team answers Monday through Friday, 8:30 AM to 5:00 PM EST,
          at{' '}
          <Link href="tel:+17034710002" rel="nofollow noreferrer noopener">
            1.703.471.0002
          </Link>{' '}
          or{' '}
          <Link
            href="mailto:rental@armoredautos.com"
            rel="nofollow noreferrer noopener"
          >
            Rental@ArmoredAutos.com
          </Link>
          .
        </p>
      </>
    ),
    imageAlt: 'Enclosed transport carrier delivering an armored rental vehicle',
    imagePlaceholder: 'Placeholder — enclosed transport carrier on delivery',
    todoSrc: '/assets/about/logistics.jpg',
  },
];

function FeatureSection({
  eyebrow,
  title,
  body,
  imageAlt,
  imagePlaceholder,
  todoSrc,
  bgTint,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: ReactNode;
  imageAlt: string;
  imagePlaceholder: string;
  todoSrc: string;
  bgTint?: boolean;
  reverse?: boolean;
}) {
  return (
    <section
      className={`${styles.aboutUs_feature} ${
        bgTint ? styles.aboutUs_feature_bgTint : styles.aboutUs_feature_bgWhite
      } ${reverse ? styles.aboutUs_feature_reverse : ''}`}
    >
      <div className={`${styles.aboutUs_feature_row} container_small`}>
        <div className={styles.aboutUs_feature_text}>
          <span
            className={`${styles.aboutUs_feature_eyebrow} observe fade-in-up`}
          >
            {eyebrow}
          </span>
          <h2 className={`${styles.aboutUs_feature_title} observe fade-in-up`}>
            {title}
          </h2>
          <div className="static">{body}</div>
        </div>
        <div className={`${styles.aboutUs_feature_image} observe fade-in-up`}>
          {/*
            TODO: swap this placeholder for a real <Image fill
            style={{ objectFit: 'cover' }} /> using the suggested src/alt below.
          */}
          <div className={styles.imageSlot} data-suggested-src={todoSrc}>
            <span title={imageAlt}>{imagePlaceholder}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const ORGANIZATION_STRUCTURED_DATA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.armoredautos.com/#organization',
  name: 'Alpine Armoring Rentals',
  alternateName: 'ArmoredAutos.com',
  url: 'https://www.armoredautos.com/',
  logo: 'https://www.alpineco.com/assets/Alpine-Armoring-Armored-Vehicles.png',
  image:
    'https://assets.alpineco.com/medium_About_us_hompage_thumbnail_1_ea1c33f592.JPG',
  description:
    'Armored vehicle rental division of Alpine Armoring Inc., founded in 1993 in Chantilly, Virginia. Renting new, luxury A9-level armored SUVs and sedans, with delivery available to any city in the 48 contiguous United States.',
  foundingDate: '1993',
  telephone: '+1-703-471-0002',
  email: 'rental@armoredautos.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4170 Lafayette Center Drive #100',
    addressLocality: 'Chantilly',
    addressRegion: 'Virginia',
    postalCode: '20151',
    addressCountry: 'US',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '17:00',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'Alpine Armoring Inc.',
    url: 'https://www.alpineco.com',
  },
  memberOf: {
    '@type': 'Organization',
    name: 'ArmoredVehicles.com',
    url: 'https://www.armoredvehicles.com',
  },
  award: [
    'VR7 certified (Germany)',
    'Beschussamt München certified (Germany)',
    'U.S. Army Aberdeen Proving Ground certified',
  ],
  sameAs: ['https://www.alpineco.com/'],
});

const BREADCRUMB_STRUCTURED_DATA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.armoredautos.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About Us',
      item: 'https://www.armoredautos.com/about-us',
    },
  ],
});

function AboutUs() {
  // Animations
  useAnimationObserver();

  return (
    <div className={styles.aboutUs}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ORGANIZATION_STRUCTURED_DATA }}
          key="organization-jsonld"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: BREADCRUMB_STRUCTURED_DATA }}
          key="breadcrumb-jsonld"
        />
      </Head>

      {/* ---------------------------------------------------------- Hero */}
      <div className={styles.aboutUs_hero}>
        <div className={`${styles.aboutUs_hero_row} container_small`}>
          <div className={styles.aboutUs_hero_text}>
            <span
              className={`${styles.aboutUs_hero_eyebrow} observe fade-in-up`}
            >
              Armored Vehicle Rentals &middot; Est. 1993
            </span>
            <h1 className="observe fade-in-up">About Alpine Armoring</h1>
            <p className={`${styles.aboutUs_hero_lead} observe fade-in-up`}>
              Alpine Armoring Inc., headquartered in a suburb of Washington,
              D.C., has spent over thirty years designing, manufacturing, and
              supplying civilian armored vehicles for the commercial and law
              enforcement sectors in the United States and worldwide. Our rental
              division maintains a large inventory of new, luxury high-level A9
              SUVs (Cadillac Escalade, Escalade ESV, Chevrolet Suburban) and
              sedans (Mercedes S-Class and Maybach), typically available on
              short notice for customers&rsquo; urgent rental needs.
            </p>
            <div className={`${styles.aboutUs_hero_cta} observe fade-in-up`}>
              <Button
                href="/armored-rentals"
                className="white rounded uppercase"
              >
                View Our Rental Fleet
              </Button>
            </div>
          </div>

          <div className={`${styles.aboutUs_hero_image} observe fade-in-up`}>
            {/*
              TODO: swap for real photography. Suggested markup:
              <Image
                src="/assets/about/hero-escalade.jpg"
                alt="Armored Cadillac Escalade ESV from the Alpine Armoring rental fleet, three-quarter exterior view"
                fill
                style={{ objectFit: 'cover' }}
              />
            */}
            <div className={`${styles.imageSlot} ${styles.imageSlot_onDark}`}>
              <span>
                Hero photo placeholder &mdash; armored Escalade ESV,
                three-quarter exterior view
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- Credentials */}
      <div className={styles.aboutUs_credentials}>
        <div className={styles.aboutUs_credentials_row}>
          <span
            className={`${styles.aboutUs_credentials_eyebrow} observe fade-in-up`}
          >
            Credentials
          </span>
          <h2
            className={`${styles.aboutUs_credentials_title} observe fade-in-up`}
          >
            Key Facts
          </h2>
          <div className={styles.aboutUs_facts}>
            {keyFacts.map((fact) => (
              <div
                className={`${styles.aboutUs_facts_item} observe fade-in-up`}
                key={fact.label}
              >
                <span className={styles.aboutUs_facts_label}>{fact.label}</span>
                <span className={styles.aboutUs_facts_value}>{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- Feature sections */}
      {features.map((feature) => (
        <FeatureSection key={feature.eyebrow} {...feature} />
      ))}

      {/* ---------------------------------------------------------- Closing */}
      <div className={styles.aboutUs_closing}>
        <div className="container_small">
          <div className={`${styles.aboutUs_cta} center`}>
            <Button
              href="/armored-rentals"
              className="primary rounded uppercase"
            >
              View Our Rental Fleet
            </Button>
            <Button href="/contact" className="border rounded uppercase">
              Contact Us
            </Button>
          </div>

          <div className={`${styles.aboutUs_flag} static`}>
            <p>
              ArmoredAutos.com is the rental division of Alpine Armoring Inc. (
              <Link
                href="https://www.alpineco.com"
                target="_blank"
                rel="nofollow noreferrer noopener"
                className="external-link"
              >
                AlpineCo.com
              </Link>
              ) and belongs to the group of companies at{' '}
              <Link
                href="https://www.armoredvehicles.com"
                target="_blank"
                rel="nofollow noreferrer noopener"
                className="external-link"
              >
                ArmoredVehicles.com
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const seoData = {
    metaTitle: 'About Alpine Armoring | Bulletproof Car Rentals in the US',
    metaDescription:
      'We build every vehicle in our US rental fleet. Founded in 1993, GSA contract holder, zero penetrations across thousands of units delivered worldwide.',
  };

  return {
    props: { seoData },
  };
}

export default AboutUs;
