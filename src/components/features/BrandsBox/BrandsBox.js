import React from 'react';
import styles from './BrandsBox.module.scss';

import Carousel from '../../common/Carousel/Carousel';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { getAllBrandsPics } from '../../../redux/brandsRedux';
import { useState } from 'react';

const BrandsBox = () => {
  const brands = useSelector(state => getAllBrandsPics(state));
  console.log('brands', brands);
  const [fade, setFade] = useState(false);

  const handleFade = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 500);
  };

  return (
    <div className='container'>
      <hr />
      <div className={styles.brandsWrapper}>
        {/* <div className={styles.button}>
          <span className={styles.arrow}>&lt;</span>
        </div> */}
        <div className={clsx('col-12 px-0', fade && styles.fade)}>
          <Carousel products={brands} handleParentFade={handleFade} parentFade={fade} />
        </div>
        {/* <div className={styles.imgSize}>

        {
          <img src={`${process.env.PUBLIC_URL + brands[0].picture}`} />


          <img src={`${process.env.PUBLIC_URL}/images/brand3.png`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand2.webp`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand3.png`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand1.webp`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand2.webp`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand3.png`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand2.webp`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand3.png`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand2.webp`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand3.png`} />
          <img src={`${process.env.PUBLIC_URL}/images/brand1.webp`} />
        </div>
        <div className={styles.button}>
          <span className={styles.arrow}>&gt;</span>
        </div> */}
      </div>
      <hr />
    </div>
  );
};

export default BrandsBox;
