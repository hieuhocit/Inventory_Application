import { useState } from 'react';

import styles from './Nav.module.scss';

import { Link, NavLink } from 'react-router-dom';
import { IoLogoBuffer } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';
import { TbBrandProducthunt } from 'react-icons/tb';
import { MdManageAccounts } from 'react-icons/md';

export default function Nav() {
  const [indexOpen, setIndexOpen] = useState<number | null>(null);
  const mode = useSelector(themeMode);

  const isDark = mode === 'dark';

  function handleOpen(index: number) {
    if (indexOpen === index) setIndexOpen(null);
    else {
      setIndexOpen(index);
    }
  }

  return (
    <aside className={`${styles.sidebar} ${isDark ? styles.darkMode : ''}`}>
      <Link to='/categories' className={styles.logo}>
        <IoLogoBuffer className={styles.iconLogo} />
        <div>Inventory App</div>
      </Link>

      <div className={styles.nav}>
        <NavLink
          to='/categories'
          className={({ isActive }) =>
            isActive ? `${styles.active} ${styles.link}` : styles.link
          }
        >
          <BiCategory className={styles.icon} />
          <p>Categories</p>
        </NavLink>

        <div className={styles.dropdown}>
          <div className={styles.head} onClick={() => handleOpen(0)}>
            <div>
              <MdManageAccounts className={styles.icon} />
              <p>Management</p>
            </div>
            {indexOpen === 0 ? (
              <FaAngleUp className={styles.angleIcon} />
            ) : (
              <FaAngleDown className={styles.angleIcon} />
            )}
          </div>
          <div
            className={
              styles.body +
              ' ' +
              (indexOpen === 0 ? styles.opened : styles.closed)
            }
          >
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  to='/item-management'
                >
                  <TbBrandProducthunt />
                  <span>Item Management</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/category-management'
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  <MdOutlineCategory />
                  <span>Category Management</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
