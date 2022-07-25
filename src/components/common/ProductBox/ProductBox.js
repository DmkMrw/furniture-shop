import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ProductBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import StarRating from '../../features/StarRating/StarRating';
import Timer from '../Timer/Timer';
import { Link } from 'react-router-dom';
import ProductPopup from '../../features/ProductPopup/ProductPopup';
import { productsState } from '../../../recoil/productsAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  comparedProductsState,
  comparedProductsCounter,
} from '../../../recoil/productComparatorAtom';
import { comparedProductsLimit } from '../../../constants';
import { toast } from 'react-toastify';

const ProductBox = ({
  name,
  price,
  oldPrice,
  promo,
  stars,
  id,
  isFeatured,
  isFavorite,
  isCompared,
  image,
  ownStars,
}) => {
  const [productsData, setProductsData] = useRecoilState(productsState);
  const [comparedProduct, setComparedProduct] = useRecoilState(comparedProductsState);
  const count = useRecoilValue(comparedProductsCounter);

  const payload = {
    id: id,
    image: image,
  };

  const toggleFavorite = e => {
    e.preventDefault();
    setProductsData(
      productsData.map(product =>
        product.id === id ? { ...product, isFavorite: !isFavorite } : product
      )
    );
  };

  const toggleCompare = e => {
    e.preventDefault();
    if (count < comparedProductsLimit) {
      setProductsData(
        productsData.map(product =>
          product.id === id ? { ...product, isCompared: !isCompared } : product
        )
      );
      if (!isCompared) {
        setComparedProduct({
          ...comparedProduct,
          products: [...comparedProduct.products, payload],
        });
      } else {
        setComparedProduct({
          ...comparedProduct,
          products: comparedProduct.products.filter(
            product => product.id !== payload.id
          ),
        });
      }
    } else {
      toast.error(`Compared products limit is ${comparedProductsLimit}.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        {promo && !isFeatured && <div className={styles.sale}>{promo}</div>}
        <Link to={'/product/' + id}>
          <img
            className={styles.image}
            src={`${process.env.PUBLIC_URL}/images/image${image}.png`}
            alt='product'
          />
        </Link>
        {isFeatured && (
          <div className={styles.additionalInfo}>
            <Button onClick={() => {}} variant='medium'>
              <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> ADD TO CART
            </Button>
            <div className={styles.timerLayout}>
              <Timer />
            </div>
          </div>
        )}
        {!isFeatured && (
          <div className={styles.buttons}>
            <Button variant='small' onClick={togglePopup}>
              Quick View
            </Button>
            <Button variant='small'>
              <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> ADD TO CART
            </Button>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <Link to={'/product/' + id} className={styles.link}>
          <h5>{name}</h5>
        </Link>
        <div className={styles.stars}>
          <StarRating id={id} ownStars={ownStars} stars={stars} />
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.actions}>
        <div className={styles.outlines}>
          {isFeatured && (
            <Button variant='outline'>
              <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
            </Button>
          )}
          <Button
            onClick={toggleFavorite}
            className={clsx(styles.buttonHover, isFavorite && styles.isActive)}
            variant='outline'
          >
            <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
          </Button>
          <Button
            onClick={toggleCompare}
            className={clsx(styles.buttonHover, isCompared && styles.isActive)}
            variant='outline'
          >
            <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
          </Button>
        </div>
        <div className={styles.price}>
          <Button
            noHover
            variant='small'
            className={clsx(styles.oldPrice, !oldPrice && styles.hidden)}
          >
            $ {Number.parseFloat(oldPrice).toFixed(2)}
          </Button>
          <Button noHover variant='small'>
            $ {Number.parseFloat(price).toFixed(2)}
          </Button>
        </div>
      </div>
      {isOpen && (
        <ProductPopup
          image={`/images/image${image}.png`}
          name={name}
          price={price}
          id={id}
          ownStars={ownStars}
          stars={stars}
          oldPrice={oldPrice}
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

ProductBox.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  price: PropTypes.number,
  oldPrice: PropTypes.number,
  promo: PropTypes.string,
  stars: PropTypes.number,
  id: PropTypes.string,
  isFavorite: PropTypes.bool,
  isFeatured: PropTypes.bool,
  isCompared: PropTypes.bool,
  image: PropTypes.number,
  ownStars: PropTypes.number,
};

export default ProductBox;
