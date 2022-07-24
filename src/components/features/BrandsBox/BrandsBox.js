import React from 'react';
import styles from './BrandsBox.module.scss';
import Carousel from '../../common/Carousel/Carousel';
import clsx from 'clsx';
import { useState } from 'react';
import SectionHeading from '../../common/SectionHeading/SectionHeading';
import { contentRefreshDelayInMs } from '../../../constants';
import { allBrands } from '../../../recoil/brandsAtom';
import { useRecoilValue } from 'recoil';

const BrandsBox = () => {
  const [fade, setFade] = useState(false);
  const brands = useRecoilValue(allBrands);

  const handleFade = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, contentRefreshDelayInMs);
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
