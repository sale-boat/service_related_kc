import React from 'react';

const starPoints = `M 9.000 13.000
  L 13.702 15.472
  L 12.804 10.236
  L 16.608 6.528
  L 11.351 5.764
  L 9.000 1.000
  L 6.649 5.764
  L 1.392 6.528
  L 5.196 10.236
  L 4.298 15.472
  L 9.000 13.000`;

const starOutline = (
  <path
    d={starPoints}
    fill="none"
    stroke="#a8863c"
    strokeWidth="1"
  />
);

const gradient = (
  <linearGradient id="star-fill" gradientTransform="rotate(90)">
    <stop offset="25%" stopColor="#ffce00" />
    <stop offset="100%" stopColor="#ffa700" />
  </linearGradient>
);

const starFill = (
  <path
    d={starPoints}
    fill="url(#star-fill)"
  />
);

const halfStarPoints = `M 9.000 1.000
  L 6.649 5.764
  L 1.392 6.528
  L 5.196 10.236
  L 4.298 15.472
  L 9.000 13.000`;

const halfFill = (
  <path
    d={halfStarPoints}
    fill="url(#star-fill)"
  />
);

const Rating = ({ avgReview }) => {
  const stars = [];
  const fullStars = Math.floor(avgReview);
  for (let i = 0; i < Math.floor(fullStars); i += 1) {
    stars.push(
      <svg height="20" width="20">
        {gradient}
        {starFill}
        {starOutline}
      </svg>,
    );
  }
  const halfStars = Math.ceil(avgReview % 1);
  for (let i = 0; i < halfStars; i += 1) {
    stars.push(
      <svg height="20" width="20">
        {gradient}
        {halfFill}
        {starOutline}
      </svg>,
    );
  }
  const emptyStars = 5 - (fullStars + halfStars);
  for (let i = 0; i < emptyStars; i += 1) {
    stars.push(
      <svg height="20" width="20">
        {starOutline}
      </svg>,
    );
  }
  return (
    <div>
      {stars}
    </div>
  );
};

export default Rating;
