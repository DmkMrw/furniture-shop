import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toggleCompareProduct } from '../../../redux/productsRedux';
import styles from './ComparedProductCard.module.scss';

import { comparedProductsState } from '../../../recoil/productComparatorAtom';
import { useRecoilValue, useRecoilState } from 'recoil';

const ComparedProductCard = ({ id, image }) => {
  const dispatch = useDispatch();

  const [comparedProduct, setComparedProduct] = useRecoilState(comparedProductsState);

  const payload = {
    id: id,
    image: image,
  };

  const removeCompare = e => {
    e.preventDefault();
    dispatch(toggleCompareProduct(id));
    setComparedProduct({
      ...comparedProduct,
      products: comparedProduct.products.filter(product => product.id !== payload.id),
    });
  };

  const comparedProducts = useRecoilValue(comparedProductsState);
  console.log('comparedProducts', comparedProducts.products);

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
