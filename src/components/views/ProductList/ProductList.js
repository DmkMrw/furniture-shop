import React from 'react';
// import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';

const ProductList = () => {
  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.banner}>
          <p className={styles.bannerTop}>
            BEDROOM <span>FURNITURE</span>
          </p>
          <p className={styles.bannerBottom}>
            ALWAYS <span>25%</span> OFF OR MORE
          </p>
        </div>
        <div className={styles.navigation}>
          <div className={styles.navWrapper}>
            <a href='Home'>Home</a>
            <span>&gt;</span>
            <a href='Furniture'>Furniture</a>
          </div>
        </div>
        <div className='row'>
          <div className='col-9'>
            <div className={styles.productList}>
              <h3>Product List</h3>
            </div>
          </div>
          <div className='col-3'>
            <div className={styles.filters}>
              <h3>Filters</h3>
            </div>
          </div>
        </div>
        <div className={styles.brands}>
          <h2>Brands</h2>
        </div>
      </div>
    </div>
  );
};

// ProductList.propTypes = {};

export default ProductList;
