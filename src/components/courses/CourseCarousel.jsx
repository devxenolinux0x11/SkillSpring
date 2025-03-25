import { useState } from 'react';
import Slider from 'react-slick';
import CourseCard from './CourseCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CourseCarousel({ title, courses, onToggleWishlist, wishlist }) {
  const [sliderRef, setSliderRef] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="course-carousel">
      <h2 className="course-carousel__title">{title}</h2>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button onClick={() => sliderRef?.slickPrev()} className="btn me-2" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%' }}>
          <ChevronLeftIcon style={{ width: '24px', color: 'var(--text-dark)' }} />
        </button>
        <button onClick={() => sliderRef?.slickNext()} className="btn" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%' }}>
          <ChevronRightIcon style={{ width: '24px', color: 'var(--text-dark)' }} />
        </button>
      </div>
      <Slider ref={setSliderRef} {...settings}>
        {courses.map((course) => (
          <div key={course.id}>
            <CourseCard course={course} onToggleWishlist={onToggleWishlist} isInWishlist={wishlist.includes(course.id)} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CourseCarousel;
