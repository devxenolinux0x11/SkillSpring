import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

function CourseCard({ course, onToggleWishlist, isInWishlist }) {
  return (
    <Card className="course-card">
      <div className="course-card__image-wrapper">
        <Link to={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
          <Card.Img variant="top" src={course.thumbnail} className="course-card__image" />
        </Link>
        <button
          className="glass-wishlist"
          onClick={() => onToggleWishlist(course.id)}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? (
            <HeartIcon className="course-card__wishlist-icon course-card__wishlist-icon--hearted" />
          ) : (
            <HeartOutlineIcon className="course-card__wishlist-icon" />
          )}
        </button>
      </div>
      <Card.Body className="course-card__body">
        <div className="course-card__header">
          <span className="course-card__category">{course.category}</span>
        </div>
        <Link to={`/course/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Title className="course-card__title">{course.title}</Card.Title>
          <Card.Text className="course-card__description">{course.description}</Card.Text>
        </Link>
        <div className="course-card__meta">
          <span>{course.instructor.name} • </span>
          <span>{course.duration} • </span>
          <span>★ {course.rating} ({course.reviewsCount})</span>
        </div>
        <div className="course-card__footer">
          <span className="course-card__price">${course.price}</span>
          <Button
            as={Link}
            to={`/course/${course.id}`}
            className="course-details-btn"
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;