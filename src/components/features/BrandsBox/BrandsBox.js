import React from 'react';
import styles from './BrandsBox.module.scss';
import Carousel from '../../common/Carousel/Carousel';
import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllBrands } from '../../../redux/brandsRedux';
import SectionHeading from '../../common/SectionHeading/SectionHeading';

const BrandsBox = () => {
  const [fade, setFade] = useState(false);
  const brands = useSelector(state => getAllBrands(state));

  const handleFade = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 500);
  };
  return (
    <div className={styles.root}>
      <div className='container'>
        <SectionHeading text={'Brands'} />
        <div className={clsx('col-12 px-0', fade && styles.fade)}>
          <Carousel products={brands} handleParentFade={handleFade} parentFade={fade} />
        </div>
      </div>
    </div>
  );
};

export default BrandsBox;
