import React, { useRef, useEffect, useState } from 'react';
import styles from './Form.module.scss';
import ChevronIcon from 'components/icons/Chevron';

const Dropdown = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
  isActive,
  setIsActive,
}) => {
  const dropdownRef = useRef(null);
  const submenuRef = useRef(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  // Touch devices fire `mouseenter` on tap right before `click`, which would
  // open then instantly re-close the submenu. Drive it by hover only where
  // hover actually exists; everywhere else it's click-to-toggle. Only gates
  // event handlers, never markup, so computing it at first render is safe.
  const [hoverCapable] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover)').matches
  );

  useEffect(() => {
    if (!isActive) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, setIsActive]);

  useEffect(() => {
    if (!isActive) setOpenSubmenu(null);
  }, [isActive]);

  // The submenu is `position: fixed` and anchored to the row's top, so a long
  // list near the bottom of the viewport would spill off-screen. Pull it back up
  // by however much it overflows once it has rendered and been measured.
  useEffect(() => {
    const el = submenuRef.current;
    if (openSubmenu === null || !el) return;
    const margin = 8;
    const overflowBottom =
      el.getBoundingClientRect().bottom - (window.innerHeight - margin);
    if (overflowBottom > 0) {
      setSubmenuPosition((pos) => ({
        ...pos,
        top: Math.max(margin, pos.top - overflowBottom),
      }));
    }
  }, [openSubmenu]);

  const selectOption = (value) => {
    setSelectedOption(value);
    setIsActive(false);
    setOpenSubmenu(null);
  };

  const openSubmenuAt = (event, index) => {
    const rowRect = event.currentTarget.getBoundingClientRect();
    // The row itself stretches to the full width of the select, so anchor
    // to the arrow icon instead — that's the visual end of the label.
    const arrow = event.currentTarget.querySelector(
      `.${styles.form_select_option_arrow}`
    );
    const anchorRight = arrow
      ? arrow.getBoundingClientRect().right
      : rowRect.right;
    // On mobile there's no room beside the row, so drop `left` and let the
    // stylesheet pin the submenu to the right viewport edge instead.
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
    setSubmenuPosition({
      top: rowRect.top,
      left: isMobile ? undefined : anchorRight + 8,
    });
    setOpenSubmenu(index);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.form_select} ${styles.form_input} ${
        isActive ? styles.form_select_active : ''
      }`}
      onClick={() => setIsActive(!isActive)}
    >
      <button className={`${styles.form_select_selected}`}>
        <span>
          {selectedOption || (
            <span className={`${styles.form_select_placeholder}`}>{label}</span>
          )}
        </span>
        <ChevronIcon />
      </button>
      <div
        className={`${styles.form_select_list} ${
          isActive ? styles.form_select_list_active : ''
        }`}
      >
        {options.map((rawOption, index) => {
          const { label: optionLabel, subOptions } =
            typeof rawOption === 'string'
              ? { label: rawOption, subOptions: undefined }
              : rawOption;

          if (subOptions) {
            return (
              <div
                key={index}
                className={`${styles.form_select_option} ${
                  styles.form_select_option_parent
                } ${
                  openSubmenu === index
                    ? styles.form_select_option_parent_active
                    : ''
                }`}
                onMouseEnter={
                  hoverCapable ? (e) => openSubmenuAt(e, index) : undefined
                }
                onMouseLeave={
                  hoverCapable ? () => setOpenSubmenu(null) : undefined
                }
                onClick={(e) => {
                  e.stopPropagation();
                  if (hoverCapable) return;
                  if (openSubmenu === index) {
                    setOpenSubmenu(null);
                  } else {
                    openSubmenuAt(e, index);
                  }
                }}
              >
                <span>{optionLabel}</span>
                <ChevronIcon className={`${styles.form_select_option_arrow}`} />
                {openSubmenu === index && (
                  <div
                    ref={submenuRef}
                    className={`${styles.form_select_submenu}`}
                    style={{
                      top: submenuPosition.top,
                      left: submenuPosition.left,
                    }}
                  >
                    {subOptions.map((subOption, subIndex) => (
                      <button
                        key={subIndex}
                        className={`${styles.form_select_option}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectOption(`${optionLabel} - ${subOption}`);
                        }}
                      >
                        {subOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={index}
              className={`${styles.form_select_option}`}
              onClick={() => selectOption(optionLabel)}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
