import React from 'react';
import clsx from 'clsx';
import Button from '../../common/Button/Button';
import ComparedProductCard from '../../features/ComparedProductCard/ComparedProductCard';

import styles from './ProductComparator.module.scss';

import {
  comparedProductsState,
  comparedProductsCounter,
} from '../../../recoil/productComparatorAtom';
import { useRecoilValue } from 'recoil';

const ProductComparator = () => {
  const comparedProducts = useRecoilValue(comparedProductsState);
  const comparedProductsCount = useRecoilValue(comparedProductsCounter);

  return (
    <div className={clsx(styles.root, !comparedProductsCount && styles.hidden)}>
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
