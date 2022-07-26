import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './StarRating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import Button from '../../common/Button/Button';
import { useRecoilState } from 'recoil';
import { productsState } from '../../../recoil/productsAtom';

const StarRating = ({ id, ownStars, stars }) => {
  const [hover, setHover] = useState(0);
  const [productsData, setProductsData] = useRecoilState(productsState);

  const updateStars = ({ e, id, star }) => {
    e.preventDefault();
    if (ownStars === star) {
      setProductsData(
        productsData.map(product =>
          product.id === id ? { ...product, ownStars: null } : product
        )
      );
    } else {
      setProductsData(
        productsData.map(product =>
          product.id === id ? { ...product, ownStars: star } : product
        )
      );
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <Button key={star} onClick={e => updateStars({ e, id, star })}>
          <FontAwesomeIcon
            icon={star <= (hover || ownStars || stars) ? faStar : farStar}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={
              ownStars || hover === star || (hover && stars)
                ? styles.ownStars
                : styles.stars
            }
          ></FontAwesomeIcon>
        </Button>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  id: PropTypes.string,
  ownStars: PropTypes.number,
  stars: PropTypes.number,
};

export default StarRating;
