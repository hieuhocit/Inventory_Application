import React, { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import { themeMode } from './store/theme/themeSelector';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const mode = useSelector(themeMode);
  const isDark = mode === 'dark';

  const navigation = useNavigation();

  useEffect(() => {
    const isQuery = navigation.location?.search.includes('?query=');
    if (
      (!isQuery && navigation.state === 'loading') ||
      navigation.state === 'submitting'
    ) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state, navigation.location?.search]);

  return (
    <>
      <Header />
      <Nav />
      <main className={isDark ? 'dark' : 'light'}>{children}</main>
    </>
  );
};

export default RootLayout;
