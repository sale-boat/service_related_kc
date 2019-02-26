import React from 'react';
import propTypes from 'prop-types';
import { box, arrow } from './Button.css';

const Button = ({ direction, scroll }) => (
  <button className={box} type="button" onClick={() => scroll(direction)}>
    <div className={arrow}>
      {direction === 'left'
        ? '<'
        : '>'}
    </div>
  </button>
);

Button.propTypes = {
  direction: propTypes.string.isRequired,
  scroll: propTypes.func.isRequired,
};

export default Button;
