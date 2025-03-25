import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import CourseCard from '../components/courses/CourseCard';

function Profile() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const enrolledCourses = [
    { id: 1, title: "Web Development Mastery", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", progress: 75, category: "Web Dev", duration: "10 weeks", price: 99.99, rating: 4.9, reviewsCount: 1500, instructor: { name: "Alex Reed", avatar: "https://randomuser.me/api/portraits/men/5.jpg" } },
    { id: 2, title: "Data Science Pro", thumbnail: "https://images.unsplash.com/photo-1527474305487-b87b222841cc", progress: 40, category: "Data Science", duration: "8 weeks", price: 89.99, rating: 4.8, reviewsCount: 1200, instructor: { name: "Maya Patel", avatar: "https://randomuser.me/api/portraits/women/5.jpg" } },
  ];

  const handleToggleWishlist = (courseId) => {
    setWishlist((prev) => prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]);
  };

  return (
    <div className="profile container my-5">
      <Card className="profile__card mb-4">
        <Card.Body className="d-flex align-items-center">
          <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="User" className="rounded-circle me-3" style={{ width: '80px', height: '80px' }} />
          <div>
            <h2 style={{ color: 'var(--text-dark)' }}>Welcome, {user?.name || user?.email || 'User'}!</h2>
            <p style={{ color: 'var(--text-dark)', opacity: 0.8 }}>Keep learning and growing!</p>
          </div>
        </Card.Body>
      </Card>
      <h3 className="course-carousel__title mb-4">Enrolled Courses</h3>
      <Row>
        {enrolledCourses.map((course) => (
          <Col key={course.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="course-card">
              <Card.Img variant="top" src={course.thumbnail} className="course-card__image" />
              <Card.Body>
                <Card.Title className="course-card__title">{course.title}</Card.Title>
                <ProgressBar now={course.progress} label={`${course.progress}%`} variant="success" className="mb-2" />
                <Button style={{ background: 'var(--primary)', border: 'none' }} className="w-100">Continue</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h3 className="course-carousel__title mb-4">Wishlist</h3>
      <Row>
        {wishlist.length === 0 ? (
          <p style={{ color: 'var(--text-dark)' }}>Your wishlist is empty.</p>
        ) : (
          wishlist.map((courseId) => {
            const course = enrolledCourses.find((c) => c.id === courseId);
            return course ? (
              <Col key={course.id} xs={12} md={6} lg={4} className="mb-4">
                <CourseCard course={course} onToggleWishlist={handleToggleWishlist} isInWishlist={true} />
              </Col>
            ) : null;
          })
        )}
      </Row>
    </div>
  );
}

export default Profile;
