import React from 'react';
// import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import Banner from '../Banner/Banner';

const ProductList = () => {
  return (
    <div className={styles.root}>
      <div className='container'>
        <Banner />
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
