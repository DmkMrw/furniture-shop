/* eslint-disable indent */
import React, { useState, useContext, useEffect } from 'react';

import styles from './NewFurniture.module.scss';
import ProductBox from '../../common/ProductBox/ProductBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Swipeable from '../../common/Swipeable/Swipeable';
import { WidthContext } from '../../layout/MainLayout/MainLayout';
import clsx from 'clsx';

import SliderDots from '../../common/SliderDots/SliderDots';
import { useRecoilValue } from 'recoil';
import { productsState } from '../../../recoil/productsAtom';
import { categoriesState } from '../../../recoil/categoriesAtom';
import {
  mobileBreakpoint,
  tabletBreakpoint,
  desktopBreakpoint,
  productsPerPageDesktop,
  productsPerPageLaptop,
  productsPerPageMobile,
  productsPerPageTablet,
  fadeDurationInMs,
  contentRefreshDelayInMs,
} from '../../../constants';

const NewFurniture = () => {
  const categories = useRecoilValue(categoriesState);
  const products = useRecoilValue(productsState);
  const [activePage, setActivePage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [isFaded, setIsFaded] = useState(false);
  const windowWidth = useContext(WidthContext);
  const [productsPerPage, setProductsPerPage] = useState(productsPerPageDesktop);
  const categoryProducts = products.filter(item => item.category === activeCategory);
  const pagesCount = Math.ceil(categoryProducts.length / productsPerPage);

  useEffect(() => {
    detectScreenWidth(windowWidth);
    if (pagesCount - 1 < activePage) {
      setActivePage(pagesCount - 1);
    }
  }, [windowWidth, activePage, pagesCount]);

  const detectScreenWidth = width => {
    width <= mobileBreakpoint
      ? setProductsPerPage(productsPerPageMobile)
      : width <= tabletBreakpoint
      ? setProductsPerPage(productsPerPageTablet)
      : width <= desktopBreakpoint
      ? setProductsPerPage(productsPerPageLaptop)
      : setProductsPerPage(productsPerPageDesktop);
  };

  const handleFade = () => {
    setIsFaded(true);
    setTimeout(() => setIsFaded(false), fadeDurationInMs);
  };

  const handlePageChange = pageToSet => {
    handleFade();
    setTimeout(() => setActivePage(pageToSet), contentRefreshDelayInMs);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.panelBar}>
          <div className='row no-gutters flex-column flex-wrap justify-space-between flex-md-row align-items-end'>
            <div className={'col-auto ' + styles.heading}>
              <h3>New furniture</h3>
            </div>
            <div className={'col ' + styles.dropdownLayout}>
              <div className={'col ' + styles.menu}>
                <input id='categoryDropdown' type='checkbox' />
                <ul>
                  {categories.map(item => (
                    <li key={item.id}>
                      <button
                        className={clsx(
                          item.id === activeCategory && styles.active,
                          isFaded && styles.disabled
                        )}
                        onClick={() => {
                          handleFade();
                          setTimeout(
                            () => setActiveCategory(item.id),
                            contentRefreshDelayInMs
                          );
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.dotsLayout}>
                <SliderDots
                  currentPage={activePage}
                  action={handlePageChange}
                  isFaded={isFaded}
                  pagesNumber={pagesCount}
                />
                <label className={styles.dropdownButton} htmlFor='categoryDropdown'>
                  <FontAwesomeIcon icon={faBars} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <Swipeable action={setActivePage} page={activePage} pagesNumber={pagesCount}>
          <div className={clsx('row', isFaded && styles.faded)}>
            {categoryProducts
              .slice(activePage * productsPerPage, (activePage + 1) * productsPerPage)
              .map(item => (
                <div key={item.id} className='col-12 col-sm-6 col-lg-4 col-xl-3'>
                  <ProductBox {...item} />
                </div>
              ))}
          </div>
        </Swipeable>
      </div>
    </div>
  );
};

export default NewFurniture;
