import React from 'react';
import styles from './Banner.module.scss';

const Banner = () => {
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
          <a href='Home'>Home</a>
          <span>&gt;</span>
          <a href='Furniture'>Furniture</a>
        </div>
      </div>
    </>
  );
};

export default Banner;
