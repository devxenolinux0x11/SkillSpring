import { useState } from 'react';
import CourseCard from '../components/courses/CourseCard';
import { Form, Row, Col, Button } from 'react-bootstrap';

function Courses() {
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const courses = [
    {
      id: 1,
      title: "Web Development Mastery",
      description: "Master full-stack web development with real-world projects.",
      thumbnail: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221222184908/web-development1.png",
      category: "Web Dev",
      duration: "10 weeks",
      price: 99.99,
      rating: 4.9,
      reviewsCount: 1500,
      instructor: { name: "Alex Reed", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    },
    {
      id: 2,
      title: "Data Science Pro",
      description: "Unlock the power of data with advanced analytics.",
      thumbnail: "https://cdn.prod.website-files.com/63ccf2f0ea97be12ead278ed/644a18b637053fa3709c5ba2_what-is-data-science-p-800.jpg",
      category: "Data Science",
      duration: "8 weeks",
      price: 89.99,
      rating: 4.8,
      reviewsCount: 1200,
      instructor: { name: "Maya Patel", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Design user-friendly interfaces that captivate.",
      thumbnail: "https://www.aceinfoway.com/blog/wp-content/uploads/2020/05/uiux_2.jpg",
      category: "Design",
      duration: "6 weeks",
      price: 79.99,
      rating: 4.7,
      reviewsCount: 900,
      instructor: { name: "Liam Brooks", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
    },
    {
      id: 4,
      title: "Python for Beginners",
      description: "Kickstart your coding journey with Python.",
      thumbnail: "https://notes.edureify.com/wp-content/uploads/2024/10/python3.png",
      category: "Programming",
      duration: "4 weeks",
      price: 59.99,
      rating: 4.6,
      reviewsCount: 800,
      instructor: { name: "Sophie Kim", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
    },
  ];

  const categories = ["Web Dev", "Data Science", "Design", "Programming"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleWishlist = (courseId) => {
    setWishlist((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <section className="courses-page">
      <div className="courses-page__header">
        <h1 className="courses-page__title">Discover Our Courses</h1>
        <p className="courses-page__subtitle">Explore a variety of courses to boost your skills</p>
      </div>
      <div className="courses-page__container">
        <div className="courses-page__filter-section">
          <Form className="courses-page__filter-form">
            <Row className="courses-page__filter-row align-items-end">
              <Col md={6} xs={12}>
                <Form.Group>
                  <Form.Label className="courses-page__filter-label">Search Courses</Form.Label>
                  <Form.Control
                    type="search"
                    placeholder="Search by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="courses-page__search-input"
                  />
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group>
                  <Form.Label className="courses-page__filter-label">Category</Form.Label>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="courses-page__category-select"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2} xs={12}>
                <Button
                  className="courses-page__reset-btn"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Row className="courses-page__grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Col key={course.id} xs={12} sm={6} md={4} lg={3} className="courses-page__grid-item">
                <CourseCard
                  course={course}
                  onToggleWishlist={handleToggleWishlist}
                  isInWishlist={wishlist.includes(course.id)}
                />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p className="courses-page__no-results">No courses found. Try adjusting your filters.</p>
            </Col>
          )}
        </Row>
      </div>
    </section>
  );
}

export default Courses;