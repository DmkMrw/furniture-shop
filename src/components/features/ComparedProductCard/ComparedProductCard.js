import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import styles from './ComparedProductCard.module.scss';

import { comparedProductsState } from '../../../recoil/productComparatorAtom';
import { useRecoilState } from 'recoil';
import { productsState } from '../../../recoil/productsAtom';

const ComparedProductCard = ({ id, image }) => {
  const [comparedProduct, setComparedProduct] = useRecoilState(comparedProductsState);
  const [productsData, setProductsData] = useRecoilState(productsState);

  const removeCompare = e => {
    e.preventDefault();
    setProductsData(
      productsData.map(product =>
        product.id === id ? { ...product, isCompared: !product.isCompared } : product
      )
    );
    setComparedProduct({
      ...comparedProduct,
      products: comparedProduct.products.filter(product => product.id !== id),
    });
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/images/image${image}.png`}
        alt='product'
      />
      <div className={styles.buttons}>
        <Button variant='outline' onClick={removeCompare}>
          <FontAwesomeIcon icon={faWindowClose} />
        </Button>
      </div>
    </div>
  );
};

ComparedProductCard.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.node,
};

export default ComparedProductCard;
