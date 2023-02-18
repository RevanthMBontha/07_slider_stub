import React, { useState, useEffect } from 'react';

import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

import Review from './components/Review';
import data from './data';

const url =
  'https://api-for-basic-projects.netlify.app/testimonials-project/testimonials_data.json';

function App() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    const response = await fetch(url);
    const reviewsData = await response.json();
    setReviews(reviewsData);
  };

  useEffect(() => {
    fetchReviews();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let slider = setInterval(() => {
      index === reviews.length - 1 ? setIndex(0) : setIndex(index + 1);
    }, 3000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  if (isLoading) {
    return (
      <section className="section">
        <div className="title">
          <h2>Tesimonials</h2>
        </div>
        <div className="section-center">
          <h2>...are loading</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="title">
        <h2>Testimonials</h2>
      </div>
      <div className="section-center">
        {reviews.map((review, personIndex) => {
          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === reviews.length - 1)
          ) {
            position = 'lastSlide';
          }
          return <Review key={review.id} {...review} position={position} />;
        })}
        <button
          className="prev"
          onClick={() =>
            index === 0 ? setIndex(reviews.length - 1) : setIndex(index - 1)
          }
        >
          <FaChevronLeft />
        </button>
        <button
          className="next"
          onClick={() =>
            index === reviews.length - 1 ? setIndex(0) : setIndex(index + 1)
          }
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
