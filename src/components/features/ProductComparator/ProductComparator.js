import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  getCountOfCompared,
  getAllCompared,
} from '../../../redux/comparedProductsRedux';
import Button from '../../common/Button/Button';
import ComparedProductCard from '../../features/ComparedProductCard/ComparedProductCard';

import styles from './ProductComparator.module.scss';

import { comparedProductsState } from '../../../recoil/productComparatorAtom';
import { comparedProductsCounter } from '../../../recoil/productComparatorAtom';
import { useRecoilValue } from 'recoil';

const ProductComparator = () => {
  // const comparedProductsCount = useSelector(state => getCountOfCompared(state));
  // const comparedProducts = useSelector(state => getAllCompared(state));

  const comparedProductsCount = useRecoilValue(comparedProductsCounter);
  const comparedProducts = useRecoilValue(comparedProductsState);

  console.log('comparedProductsCount', comparedProductsCount);
  console.log('comparedProducts', comparedProducts.products);

  return (
    <div className={clsx(styles.root, comparedProductsCount < 2 && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.comparedCards}>
          {comparedProducts.products.map(product => (
            <ComparedProductCard
              key={product.id}
              id={product.id}
              image={product.image}
            />
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant='main'>Compare</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductComparator;
