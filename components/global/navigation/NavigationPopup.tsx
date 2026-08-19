import { useRouter } from 'next/router';
import Link from 'next/link';
import { NavigationProps } from 'types';
import styles from './NavigationPopup.module.scss';

const links = [
  { path: '/armored-rentals', text: 'Ready to Rent' },
  { path: '/about-us', text: 'About Us' },
  { path: '/locations-we-rent', text: 'Locations We Rent' },
  { path: '/ballistic-chart', text: 'Ballistic Chart' },
  { path: '/faqs', text: 'FAQ' },
  { path: '/contact', text: 'Contact' },
];

const NavigationPopup = ({ isNavOpen, setNavOpen }: NavigationProps) => {
  const router = useRouter();

  return (
    <nav
      className={`${styles.navigationPopup} ${
        isNavOpen ? styles.navigationPopup_open : ''
      }`}
      id="navigationPopup"
    >
      <ul className={styles.navigationPopup_list}>
        {links.map((link) => (
          <li
            key={link.path}
            className={`${styles.navigationPopup_item} ${
              router.asPath === link.path
                ? styles.navigationPopup_item_active
                : ''
            }`}
          >
            <Link
              className={styles.navigationPopup_link}
              href={link.path}
              onClick={() => setNavOpen(false)}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationPopup;
