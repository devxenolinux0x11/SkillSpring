// Home.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import Slider from 'react-slick';
import { Row, Col, Button } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const featuredCourses = [
    { 
      id: 1, 
      title: "Web Development Mastery", 
      description: "Master full-stack web development with real-world projects.", 
      thumbnail: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221222184908/web-development1.png", 
      category: "Web Dev",
      price: 99.99, 
      rating: 4.9, 
      reviewsCount: 1500, 
      instructor: { name: "Alex Reed", avatar: "https://randomuser.me/api/portraits/men/5.jpg" }
    },
    { 
      id: 2, 
      title: "Data Science Pro", 
      description: "Unlock the power of data with advanced analytics.", 
      thumbnail: "https://cdn.prod.website-files.com/63ccf2f0ea97be12ead278ed/644a18b637053fa3709c5ba2_what-is-data-science-p-800.jpg",
      category: "Data Science",
      price: 89.99, 
      rating: 4.8, 
      reviewsCount: 1200, 
      instructor: { name: "Maya Patel", avatar: "https://randomuser.me/api/portraits/women/5.jpg" }
    },
    { 
      id: 3, 
      title: "UI/UX Design", 
      description: "Design user-friendly interfaces that captivate.", 
      thumbnail: "https://www.aceinfoway.com/blog/wp-content/uploads/2020/05/uiux_2.jpg", 
      category: "Design",
      price: 79.99, 
      rating: 4.7, 
      reviewsCount: 900, 
      instructor: { name: "Liam Brooks", avatar: "https://randomuser.me/api/portraits/men/6.jpg" }
    },
    { 
      id: 4, 
      title: "Mobile App Development", 
      description: "Build cross-platform mobile apps with React Native.", 
      thumbnail: "https://cdn.prod.website-files.com/6349395c9738c5d053d3ceba/64a55abc0bf10e2cd3ac59d1_Cross-Platform%20Mobile%20App%20Development_%20All%20You%20Need%20to%20Know-p-1080.png", 
      category: "Mobile Dev",
      price: 89.99, 
      rating: 4.8, 
      reviewsCount: 1100, 
      instructor: { name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/6.jpg" }
    },
    { 
      id: 5, 
      title: "Cloud Computing Basics", 
      description: "Learn AWS, Azure, and cloud infrastructure.", 
      thumbnail: "https://webandcrafts.com/_next/image?url=https%3A%2F%2Fadmin.wac.co%2Fuploads%2FCloud_Computing_1_31d34f52bb.png&w=1200&q=90", 
      category: "Cloud",
      price: 69.99, 
      rating: 4.6, 
      reviewsCount: 850, 
      instructor: { name: "Mike Torres", avatar: "https://randomuser.me/api/portraits/men/7.jpg" }
    },
  ];

  const features = [
    { icon: "🚀", title: "Interactive Learning", description: "Engage with hands-on projects." },
    { icon: "🎓", title: "Expert Instructors", description: "Learn from industry leaders." },
    { icon: "🌐", title: "Global Community", description: "Connect with learners worldwide." },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20px',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          centerPadding: '15px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px'
        }
      }
    ]
  };

  const handleToggleWishlist = (courseId) => {
    setWishlist((prev) => 
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="home">
      <HeroSection />
      <div className="features-section container my-5">
        <h2 className="features-section__title">Why SkillSpring?</h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={4} xs={12}>
              <div className="feature-card text-center">
                <span className="feature-card__icon">{feature.icon}</span>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="course-carousel-section container">
        <div className="course-carousel mb-5">
          <h2 className="course-carousel__title">Featured Courses</h2>
          <Slider {...carouselSettings}>
            {featuredCourses.map((course) => (
              <div key={course.id} className="carousel-item-wrapper">
                <div 
                  className="course-card"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="course-card__image-wrapper">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="course-card__image"
                    />
                    <button
                      className="wishlist-btn glass-wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(course.id);
                      }}
                    >
                      <span className={wishlist.includes(course.id) ? "hearted" : ""}>
                        ♥
                      </span>
                    </button>
                  </div>
                  <div className="course-card__body">
                    <h5 className="course-card__title">{course.title}</h5>
                    <p className="course-card__description">{course.description}</p>
                    <div className="course-card__meta">
                      ★ {course.rating} ({course.reviewsCount}) | ${course.price}
                    </div>
                    <div className="course-card__actions">
                      <Button
                        as={Link}
                        to={`/course/${course.id}`}
                        variant="primary"
                        className="course-details-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Home;