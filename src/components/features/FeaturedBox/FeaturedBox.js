import React, { useState, useEffect, useCallback } from 'react';
import ProductBox from '../../common/ProductBox/ProductBox';
import styles from './FeaturedBox.module.scss';
import Button from '../../common/Button/Button';
import clsx from 'clsx';
import Swipeable from '../../common/Swipeable/Swipeable';
import CarouselButton from '../../common/CarouselButton/CarouselButton';
import SliderDots from '../../common/SliderDots/SliderDots';
import { useRecoilValue } from 'recoil';
import { getAllFeatured } from '../../../recoil/featuredAtom';
import { getProductById } from '../../../recoil/productsAtom';
import {
  fadeDurationInMs,
  contentRefreshDelayInMs,
  slideChangeDelayInMs,
  autoplayPauseInMs,
} from '../../../constants';

const FeaturedBox = () => {
  const featuredProductIds = useRecoilValue(getAllFeatured);
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const promoImageIdxs = [1, 2];
  const currentProduct = useRecoilValue(
    getProductById(featuredProductIds[currentFeatured])
  );
  const lastPromoPageIdx = promoImageIdxs.length - 1;
  const featuredPages = featuredProductIds.length;
  const [featuredFade, setFeaturedFade] = useState(false);
  const [promoFade, setPromoFade] = useState(false);
  const [autoplayStatus, setAutoplayStatus] = useState(true);
  const [currentPromoImg, setCurrentPromoImg] = useState(0);

  const changeSlide = useCallback(() => {
    const lastItemIndex = featuredPages - 1;
    if (autoplayStatus) {
      setFeaturedFade(true);
      setTimeout(() => {
        setFeaturedFade(false);
      }, fadeDurationInMs);
      setTimeout(() => {
        setCurrentFeatured(currentProduct => {
          if (currentProduct === lastItemIndex) {
            setCurrentFeatured(0);
          }
          return (currentProduct += 1);
        });
      }, contentRefreshDelayInMs);
    }
  }, [autoplayStatus, featuredPages]);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide();
    }, slideChangeDelayInMs);

    return () => {
      clearInterval(interval);
    };
  }, [autoplayStatus, changeSlide]);

  const manageAutoplay = () => {
    setAutoplayStatus(false);
    setTimeout(() => setAutoplayStatus(true), autoplayPauseInMs);
  };

  const manageFeaturedFade = () => {
    setFeaturedFade(true);
    setTimeout(() => {
      setFeaturedFade(false);
    }, fadeDurationInMs);
  };

  const managePromoFade = () => {
    setPromoFade(true);
    setTimeout(() => {
      setPromoFade(false);
    }, fadeDurationInMs);
  };

  const handleDot = elem => {
    manageAutoplay();
    manageFeaturedFade();
    setTimeout(() => {
      setCurrentFeatured(elem);
    }, contentRefreshDelayInMs);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className='row'>
          <div className={`col-4 ${styles.featuredProductBox}`}>
            <div className={styles.heading}>
              <h5>Hot deals</h5>
              <SliderDots
                pagesNumber={featuredPages}
                action={handleDot}
                currentPage={currentFeatured}
                isFaded={featuredFade}
              />
            </div>
            <div
              onTouchStart={() => manageAutoplay()}
              className={clsx(featuredFade && styles.fade)}
            >
              <Swipeable
                page={currentFeatured}
                action={setCurrentFeatured}
                pagesNumber={featuredPages}
              >
                <ProductBox {...currentProduct} isFeatured />
              </Swipeable>
            </div>
          </div>

          <div className={clsx('col-12 col-lg-8', styles.carouselLayout)}>
            <Swipeable>
              <div className={clsx(styles.image, promoFade && styles.fade)}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/featureBox${promoImageIdxs[currentPromoImg]}.jpg`}
                  alt='sofa'
                />
              </div>
              <div className={clsx(styles.promoBanner, promoFade && styles.fade)}>
                <h2>
                  <span>Indoor</span> Furniture
                </h2>
                <h3>Save up to 50% of all furniture</h3>
                <Button className={`btn-light rounded ${styles.bannerButton}`}>
                  Shop now
                </Button>
              </div>
            </Swipeable>
            <div className={styles.buttons}>
              <CarouselButton
                action={setCurrentPromoImg}
                parentFade={promoFade}
                handleParentFade={managePromoFade}
                lastPageIndex={lastPromoPageIdx}
                currentPage={currentPromoImg}
                infinite
                direction='left'
              />
              <CarouselButton
                direction='right'
                action={setCurrentPromoImg}
                parentFade={promoFade}
                handleParentFade={managePromoFade}
                lastPageIndex={lastPromoPageIdx}
                infinite
                currentPage={currentPromoImg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBox;
