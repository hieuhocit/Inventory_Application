import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import styles from './Header.module.scss';
import { themeMode } from '@/store/theme/themeSelector';

import { MdDarkMode } from 'react-icons/md';
import { IoMdSunny } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';

import { toggleMode } from '@/store/theme/themeSlice';
import { Form, Link } from 'react-router-dom';
import { IItem } from '@/types/definitions';
import { getItemsByName } from '@/utils/apis';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Header() {
  const [searchResults, setSearchResults] = useState<IItem[] | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const searchContainer = useRef<HTMLDivElement | null>(null);
  const idTimeoutRef = useRef<number | null>(null);

  const mode = useSelector(themeMode);
  const dispatch = useDispatch();
  const isDark = mode === 'dark';

  useEffect(() => {
    async function loadData(query: string) {
      if (idTimeoutRef.current) clearTimeout(idTimeoutRef.current);

      idTimeoutRef.current = window.setTimeout(async () => {
        const data = await getItemsByName(query);
        setSearchResults(data);
        setLoading(false);
      }, 300);
    }

    function setShow(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!searchContainer.current?.contains(target)) {
        setShowSearchResults(false);
      }
    }

    setLoading(true);
    loadData(query);
    document.addEventListener('click', setShow);

    return () => {
      document.removeEventListener('click', setShow);
    };
  }, [query]);

  function handleSwitchMode() {
    dispatch(toggleMode());
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const query = e.target.value;
    setQuery(query);
    setShowSearchResults(true);
  }

  return (
    <header className={`${isDark ? styles.darkMode : ''} ${styles.header}`}>
      <div className={styles.right}>
        <div className={styles.actions}>
          <div className={styles.mode} onClick={handleSwitchMode}>
            {isDark ? (
              <IoMdSunny className={styles.icon} />
            ) : (
              <MdDarkMode className={styles.icon} />
            )}
          </div>
        </div>

        <div className={styles.searchContainer} ref={searchContainer}>
          <Form onSubmit={(e) => e.preventDefault()} className={styles.search}>
            <button type='submit' className={styles.submit}>
              <CiSearch className={styles.icon} />
            </button>
            <input
              value={query}
              type='search'
              name='query'
              placeholder='Enter your favorite items'
              autoComplete='off'
              onChange={handleOnChange}
              onPointerDown={() =>
                query.trim() !== '' && setShowSearchResults(true)
              }
            />
          </Form>

          {showSearchResults && (
            <div className={styles.result}>
              {loading && (
                <div className={styles.loading}>
                  <AiOutlineLoading3Quarters className={styles.icon} />
                </div>
              )}
              {!loading && searchResults && searchResults.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '12px' }}>
                  Not found items...
                </p>
              )}
              {!loading &&
                searchResults &&
                searchResults.map((item) => (
                  <Link
                    onClick={() => {
                      setQuery('');
                      setShowSearchResults(false);
                    }}
                    key={item.id}
                    to={`/categories/${item.category_id}/items/${item.id}`}
                    className={styles.item}
                  >
                    <div className={styles.imageContainer}>
                      <img src={item.image ?? ''} alt={item.name} />
                    </div>
                    <div className={styles.about}>
                      <p>{item.name}</p>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
