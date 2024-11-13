import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavigationProps } from 'types';
import styles from './NavigationPopup.module.scss';

import ArrowIcon from 'components/icons/Arrow';
import FacebookIcon from 'components/icons/Facebook';
import TiktokIcon from 'components/icons/Tiktok';
import XIcon from 'components/icons/X';
import InstagramIcon from 'components/icons/Instagram';
import YoutubeIcon from 'components/icons/Youtube';
import LinkedinIcon from 'components/icons/Linkedin';
import MailIcon from 'components/icons/Mail';
import MapIcon from 'components/icons/Map';
import PhoneIcon from 'components/icons/Phone';
import ThreadsIcon from 'components/icons/Threads';

const NavigationPopup = ({ isNavOpen, setNavOpen }: NavigationProps) => {
  const router = useRouter();
  const [activeSubmenu, setActiveSubmenu] = useState<
    { text: string; path: string }[] | null
  >(null);

  const links = [
    { path: '/armored-rentals', text: 'Vehicles Ready to Rent Now' },
    { path: '/contact', text: 'Contact' },
  ];

  const closeNavAndSubmenu = () => {
    setNavOpen(false);
    setActiveSubmenu(null);
  };

  useEffect(() => {
    if (!isNavOpen) {
      setActiveSubmenu(null);
    }
  }, [isNavOpen]);

  const handleBackClick = () => {
    setActiveSubmenu(null);
  };

  return (
    <nav
      className={`${styles.navigationPopup} ${
        isNavOpen ? styles.navigationPopup_open : ''
      }`}
      id="navigationPopup"
    >
      <div className={`${styles.navigationPopup_inner} container`}>
        <div className={`${styles.navigationPopup_nav}`}>
          {!activeSubmenu && (
            <>
              <ul
                className={`${styles.navigationPopup_list_left} ${styles.navigationPopup_list}`}
              >
                {links.map((link, index) => (
                  <li
                    key={index}
                    className={`
                      ${styles.navigationPopup_item} 
                      ${
                        router.asPath === link.path
                          ? `${styles.navigationPopup_item_active}`
                          : ''
                      }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {link.path ? (
                      <Link
                        className={`${styles.navigationPopup_link}`}
                        href={link.path}
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <span className={`${styles.navigationPopup_link}`}>
                        {link.text}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeSubmenu && (
            <ul className={`${styles.navigationPopup_submenu}`}>
              <div
                className={`${styles.navigationPopup_submenu_back}`}
                onClick={handleBackClick}
              >
                <ArrowIcon />
              </div>
              {activeSubmenu.map((item, index) => (
                <li
                  key={index}
                  className={`
                    ${styles.navigationPopup_item} 
                    ${
                      router.asPath === item.path
                        ? `${styles.navigationPopup_item_active}`
                        : ''
                    }`}
                >
                  <Link
                    href={item.path}
                    className={`${styles.navigationPopup_link}`}
                    onClick={closeNavAndSubmenu}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`${styles.navigationPopup_info}`}>
          <div className={`${styles.navigationPopup_contact}`}>
            <Link
              href="tel:+17034710002"
              className={`${styles.navigationPopup_contact_item}`}
            >
              <PhoneIcon />
              1.703.471.0002
            </Link>
            <Link
              href="mailto:sales@alpineco.com"
              className={`${styles.navigationPopup_contact_item}`}
            >
              <MailIcon />
              Sales@AlpineCo.com
            </Link>

            <div className={`${styles.navigationPopup_contact_item}`}>
              <MapIcon />
              Chantilly, Virginia, USA
            </div>
          </div>

          <ul className={`${styles.navigationPopup_socials}`}>
            <li className={`${styles.navigationPopup_socials_item}`}>
              <Link
                href="https://www.youtube.com/c/AlpineArmoring"
                target="_blank"
              >
                <YoutubeIcon color="white" />
              </Link>
            </li>
            <li className={`${styles.navigationPopup_socials_item}`}>
              <Link
                href="https://www.instagram.com/alpinearmoring/"
                target="_blank"
              >
                <InstagramIcon color="white" />
              </Link>
            </li>
            <li
              className={`${styles.navigationPopup_socials_item} ${styles.navigationPopup_socials_item_x}`}
            >
              <Link href="https://x.com/AlpineArmoring" target="_blank">
                <XIcon color="white" />
              </Link>
            </li>
            <li className={`${styles.navigationPopup_socials_item}`}>
              <Link
                href="https://www.facebook.com/AlpineArmoring/"
                target="_blank"
              >
                <FacebookIcon color="white" />
              </Link>
            </li>
            <li
              className={`${styles.navigationPopup_socials_item} ${styles.navigationPopup_socials_item_tiktok}`}
            >
              <Link
                href="https://www.tiktok.com/@alpinearmoring"
                target="_blank"
              >
                <TiktokIcon color="white" />
              </Link>
            </li>
            <li className={`${styles.navigationPopup_socials_item}`}>
              <Link
                href="https://www.linkedin.com/company/alpinearmoring/"
                target="_blank"
              >
                <LinkedinIcon color="white" />
              </Link>
            </li>
            <li
              className={`${styles.navigationPopup_socials_item} ${styles.navigationPopup_socials_item_threads}`}
            >
              <Link
                href="https://www.threads.net/@alpinearmoring/"
                target="_blank"
              >
                <ThreadsIcon color="white" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationPopup;
