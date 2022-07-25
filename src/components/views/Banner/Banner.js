import React from 'react';
import styles from './Banner.module.scss';
import PropTypes from 'prop-types';

const Banner = ({ categoryId }) => {
  return (
    <>
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
          <span>Home</span>
          <span>&gt;</span>
          <a href=''>{categoryId}</a>
        </div>
      </div>
    </>
  );
};

Banner.propTypes = {
  categoryId: PropTypes.string,
};

export default Banner;
