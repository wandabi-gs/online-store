import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchLatestProducts } from '../query/product';
import { MEDIA_URL } from '../backend';

function Home() {
  const { data: products, error, isLoading } = useQuery('latestProducts', fetchLatestProducts);

  const [inverseMotion, setInversMotion] = useState(true)

  const [currentSlide, setCurrentSlide] = useState(0);
  const numSlides = products ? products.length : 1;

  const handleNextSlide = () => {
    setInversMotion(!inverseMotion)
    setCurrentSlide((prevSlide) => (prevSlide + 1) % numSlides);
  };

  const handlePrevSlide = () => {
    setInversMotion(!inverseMotion)
    setCurrentSlide((prevSlide) => (prevSlide - 1 + numSlides) % numSlides);
  };


  const slideVariants = {
    enter: { x: 0 },
    exit: { x: currentSlide === 0 ? '-100%' : '100%' },
  };

  const variants = {
    hidden: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0 },
  };

  const in_variants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
  };

  const x_variants = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };

  const x_in_variants = {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0 },
  };

  const durations = {
    caruosel: 1,
    fadeIn: 1.5
  }

  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (!isCarouselPaused) {
      interval = setInterval(handleNextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [inverseMotion, isCarouselPaused]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="overflow-hidden min-h-screen flex flex-col justify-center relative -mt20">
      <button onClick={handlePrevSlide} className='absolute left-0 top-1/2 ml-10'>
        <FontAwesomeIcon icon="chevron-circle-left" className='text-4xl text-indigo-800' />
      </button>
      <button onClick={handleNextSlide} className='absolute right-0 top-1/2 mr-10'>
        <FontAwesomeIcon icon="chevron-circle-right" className='text-4xl text-indigo-800' />
      </button>
      <motion.div
        key={currentSlide}
        custom={currentSlide}
        initial="enter"
        animate="enter"
        exit="exit"
        variants={slideVariants}
        transition={{ ease: 'easeInOut', duration: durations.caruosel }}
        className="carousel-slide"
      >
        <div>
          <div className="p-6 mx-6 flex justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={inverseMotion ? variants : x_in_variants}
              transition={{ duration: durations.fadeIn }}
              className='flex flex-col mr-10 justify-center space-y-4 bg-gradient-to-l from-red-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent'
            >
              <p className='text-8xl'>New Arrival</p>
              <p className="text-6xl">{products[currentSlide].name}</p>
              <div>
                <Link
                  onMouseEnter={() => setIsCarouselPaused(true)}
                  onMouseLeave={() => setIsCarouselPaused(false)}
                  className="p-2 border border-blue-600">Buy Now</Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={inverseMotion ? x_variants : in_variants}
              transition={{ duration: durations.fadeIn }}
              className="ml-10"
            >
              <img src={MEDIA_URL + "/" + products[currentSlide].image} alt="" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );

}

export default Home