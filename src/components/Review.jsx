import React from 'react';

const Review = ({ position, name, image, title, quote }) => {
  // const { name, image, title, quote } = review;
  // console.log(review);
  return (
    <article className={position}>
      <img src={image} alt={name} className="person-img" />
      <h4>{name}</h4>
      <p className="title">{title}</p>
      <p className="text">{quote}</p>
    </article>
  );
};

export default Review;
