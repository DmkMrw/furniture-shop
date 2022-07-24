import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductPopup.module.scss';
import StarRating from '../StarRating/StarRating';

const ProductPopup = ({
  image,
  name,
  id,
  ownStars,
  stars,
  price,
  oldPrice,
  handleClose,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.popup_Box}>
        <div className={styles.box}>
          <div className='container row m-auto justify-content-center'>
            <div className='col-12 col-md-9 col-lg-6 px-0 pr-md-3'>
              <div>
                <div className={styles.galleryContent}>
                  <img src={`${process.env.PUBLIC_URL}` + image} alt='chair' />
                  <span className={styles.close_icon} onClick={handleClose}>
                    x
                  </span>
                  <div className={styles.productData}>
                    <div className={styles.promotionInfo}>
                      <p>{price}.00$</p>
                      {oldPrice && <p>{oldPrice}.00$</p>}
                    </div>
                    <h5>{name}</h5>
                    <StarRating id={id} stars={stars} ownStars={ownStars} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductPopup.propTypes = {
  image: PropTypes.string,
  handleClose: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  ownStars: PropTypes.number,
  stars: PropTypes.number,
  price: PropTypes.number,
  oldPrice: PropTypes.number,
};

export default ProductPopup;
