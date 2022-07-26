/* eslint-disable indent */
import React, { useEffect, useState, useContext } from 'react';
import CarouselButton from '../CarouselButton/CarouselButton';
import styles from './Carousel.module.scss';
import PropTypes from 'prop-types';
import Swipeable from '../Swipeable/Swipeable';
import clsx from 'clsx';
import { WidthContext } from '../../layout/MainLayout/MainLayout';
import {
  fadeDurationInMs,
  contentRefreshDelayInMs,
  smallMobileBreakpoint,
  desktopBreakpoint,
  mobileItemsPerPage,
  tabletItemsPerPage,
  desktopItemsPerPage,
} from '../../../constants';

const Carousel = ({ products, action, parentFade, handleParentFade }) => {
  const windowWidth = useContext(WidthContext);
  const [productsPerPage, setProductsPerPage] = useState(desktopItemsPerPage);
  const pagesNumber = Math.ceil(products.length / productsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const [fade, setFade] = useState(false);

  const detectScreenWidth = width => {
    width <= smallMobileBreakpoint
      ? setProductsPerPage(mobileItemsPerPage)
      : width <= desktopBreakpoint
      ? setProductsPerPage(tabletItemsPerPage)
      : setProductsPerPage(desktopItemsPerPage);
  };

  const handleFade = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, fadeDurationInMs);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [products]);

  useEffect(() => {
    detectScreenWidth(windowWidth);
    if (pagesNumber - 1 < currentPage) {
      setCurrentPage(pagesNumber - 1);
    }
  }, [windowWidth, pagesNumber, currentPage]);

  return (
    <div className='d-flex flex-row justify-content-between'>
      <CarouselButton
        parentFade={fade}
        handleParentFade={handleFade}
        action={setCurrentPage}
        currentPage={currentPage}
        lastPageIndex={pagesNumber - 1}
        direction={'left'}
      />
      <Swipeable action={setCurrentPage} page={currentPage} pagesNumber={pagesNumber}>
        <div className={clsx(styles.images, fade && styles.fade)}>
          {products
            .slice(productsPerPage * currentPage, productsPerPage * (currentPage + 1))
            .map(elem => {
              if (action) {
                return (
                  <button
                    onClick={() => {
                      handleParentFade();
                      setTimeout(() => {
                        action(elem.id);
                      }, contentRefreshDelayInMs);
                    }}
                    disabled={parentFade || !action}
                    className={styles.imageContainer}
                    key={elem.id}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/image${elem.image}.png`}
                      alt='carousel-preview'
                    />
                  </button>
                );
              }
              return (
                <div className={styles.imageContainer} key={elem.id}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/image${elem.image}.png`}
                    alt='carousel-preview'
                  />
                </div>
              );
            })}
        </div>
      </Swipeable>
      <CarouselButton
        parentFade={fade}
        handleParentFade={handleFade}
        action={setCurrentPage}
        currentPage={currentPage}
        lastPageIndex={pagesNumber - 1}
        direction={'right'}
      />
    </div>
  );
};

Carousel.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.func || undefined,
  parentFade: PropTypes.bool,
  handleParentFade: PropTypes.func,
};

export default Carousel;
