import React, { useEffect, useState } from 'react';
import SectionHeading from '../../common/SectionHeading/SectionHeading';
import styles from './FurnitureGallery.module.scss';
import Button from '../../common/Button/Button';
import Carousel from '../../common/Carousel/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons';
import { faExchangeAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getGallerySetById } from '../../../recoil/galleryAtom';
import {
  getProductById,
  getProductsGroup,
  productsState,
} from '../../../recoil/productsAtom';
import StarRating from '../StarRating/StarRating';
import {
  contentRefreshDelayInMs,
  fadeDurationInMs,
  comparedProductsLimit,
} from '../../../constants';
import {
  comparedProductsCounter,
  comparedProductsState,
} from '../../../recoil/productComparatorAtom';

const FurnitureGallery = () => {
  const galleryNavHeadings = ['Featured', 'Top Seller', 'Sale off', 'Top rated'];
  const [currentPageId, setCurrentPageId] = useState(1);
  const productIds = useRecoilValue(getGallerySetById(currentPageId));
  const [currentProduct, setCurrentProduct] = useState(productIds[0]);
  const {
    id,
    image,
    name,
    price,
    oldPrice,
    isFavorite,
    isCompared,
    ownStars,
    stars,
  } = useRecoilValue(getProductById(currentProduct));
  const productsToDisplay = useRecoilValue(getProductsGroup(productIds));

  const [productsData, setProductsData] = useRecoilState(productsState);
  const [comparedProducts, setComparedProducts] = useRecoilState(comparedProductsState);

  useEffect(() => {
    setCurrentProduct(productIds[0]);
  }, [productIds]);

  const [fade, setFade] = useState(false);

  const handleFade = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, fadeDurationInMs);
  };

  const toggleFavorite = e => {
    e.preventDefault();
    setProductsData(
      productsData.map(product =>
        product.id === id ? { ...product, isFavorite: !isFavorite } : product
      )
    );
  };

  const payload = {
    id: id,
    image: image,
  };

  const comparedCount = useRecoilValue(comparedProductsCounter);

  const toggleCompare = e => {
    e.preventDefault();
    if (comparedCount < comparedProductsLimit) {
      setProductsData(
        productsData.map(product =>
          product.id === id ? { ...product, isCompared: !isCompared } : product
        )
      );
      if (!isCompared) {
        setComparedProducts({
          ...comparedProducts,
          products: [...comparedProducts.products, payload],
        });
      } else {
        setComparedProducts({
          ...comparedProducts,
          products: comparedProducts.products.filter(
            product => product.id !== payload.id
          ),
        });
      }
    } else {
      // toast.error(`Compared products limit is ${comparedProductsLimit}.`, {
      //   position: 'top-center',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      //uncomment after merging task 70
    }
  };

  return (
    <div className={styles.root}>
      <div className='container row m-auto'>
        <div className='col-12 col-md-9 col-lg-6 px-0 pr-md-3'>
          <SectionHeading text={'Furniture gallery'} />
          <div>
            <div className={styles.galleryNav}>
              {galleryNavHeadings.map((heading, idx) => {
                return (
                  <button
                    type='button'
                    onClick={() => {
                      handleFade();
                      setTimeout(() => {
                        setCurrentPageId(idx);
                      }, contentRefreshDelayInMs);
                    }}
                    disabled={fade}
                    key={idx}
                    className={clsx(currentPageId === idx && styles.active)}
                  >
                    {heading}
                  </button>
                );
              })}
            </div>
            <div className={clsx(styles.galleryContent, fade && styles.fade)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/image${image}.png`}
                alt='chair'
              />
              <div className={styles.buttonLayout}>
                <Button
                  onClick={toggleFavorite}
                  active={isFavorite}
                  variant='outline'
                  extraInfo={'Add to favorites'}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </Button>
                <Button
                  onClick={toggleCompare}
                  active={isCompared}
                  variant='outline'
                  extraInfo={'Compare'}
                >
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </Button>
                <Button variant='outline' extraInfo={'See more'}>
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button variant='outline' extraInfo={'Add to cart'}>
                  <FontAwesomeIcon icon={faShoppingBasket} />
                </Button>
              </div>
              <div className={styles.productData}>
                <div className={styles.promotionInfo}>
                  <p>{price}.00$</p>
                  {oldPrice && <p>{oldPrice}.00$</p>}
                </div>
                <h5>{name}</h5>
                <StarRating id={id} stars={stars} ownStars={ownStars} />
              </div>
            </div>
            <div className={clsx('col-12 px-0', fade && styles.fade)}>
              <Carousel
                products={productsToDisplay}
                action={setCurrentProduct}
                handleParentFade={handleFade}
                parentFade={fade}
              />
            </div>
          </div>
        </div>
        <div className={`col-3 col-lg-6 ${styles.promoSection}`}>
          <div className={styles.promoSectionContent}>
            <h2>
              <span>From </span>$50.80
            </h2>
            <h2>Bedroom Bed</h2>
            <Button variant='small' className={`rounded ${styles.button}`}>
              Shop now
            </Button>
          </div>
          <div className={styles.staticImageBox}>
            <img
              className={styles.image}
              src={`${process.env.PUBLIC_URL}/images/furniture_static.png`}
              alt='bed'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureGallery;
