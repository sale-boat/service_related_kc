import React from 'react';
import propTypes from 'prop-types';
import product from './Product.css';
import Rating from './Rating/Rating.jsx';

const primeSprite = 'https://res.cloudinary.com/dcywbu46z/image/upload/h_20,f_auto/v1550951658/amazon-FEC/prime.png';

const concatUrl = id => `https://res.cloudinary.com/dcywbu46z/image/upload/w_160,h_160,f_auto/v1550899094/amazon-FEC/item-${id}.jpg`;

const Product = ({
  product: {
    id, name, avgReview, price, isPrime, reviewCount,
  },
}) => (
  <div className={product.column}>
    <a href={`/products/${id}`}>
      <div className={product.ad_image}>
        <div style={{ background: `url(${concatUrl(id)}`, backgroundSize: 'cover', height: '160px' }} alt="product was here" />
      </div>
    </a>
    <a href={`/products/${id}`} className={product.name}>{name}</a>
    <div className={product.row}>
      <Rating avgReview={avgReview} />
      <span className={product.review_count}>
        {reviewCount}
      </span>
    </div>
    <div className={product.row}>
      <span className={product.price}>{`$${price}`}</span>
      <span>
        {isPrime === true
          ? <img className={product.prime} src={primeSprite} alt="" />
          : null }
      </span>
    </div>
  </div>
);

Product.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    avgReview: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    isPrime: propTypes.bool.isRequired,
    reviewCount: propTypes.number.isRequired,
    category: propTypes.string.isRequired,
  }).isRequired,
};

export default Product;
