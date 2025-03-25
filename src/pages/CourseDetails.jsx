import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import courseVideos from '../data/videos';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  const courses = {
    1: {
      id: 1,
      title: "Web Development Mastery",
      description: "Build modern web applications with hands-on projects.",
      thumbnail: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221222184908/web-development1.png",
      category: "Web Dev",
      duration: "10 weeks",
      price: 99.99,
      rating: 4.9,
      reviewsCount: 1500,
      instructor: { name: "Alex Reed", avatar: "https://randomuser.me/api/portraits/men/5.jpg", bio: "10+ years in web development" },
      curriculum: [
        { title: "Basics", lessons: ["HTML", "CSS", "JS"] },
        { title: "Advanced", lessons: ["React", "Node.js", "APIs"] },
      ],
    },
    2: {
      id: 2,
      title: "Data Science Pro",
      description: "Unlock the power of data with advanced analytics.",
      thumbnail: "https://cdn.prod.website-files.com/63ccf2f0ea97be12ead278ed/644a18b637053fa3709c5ba2_what-is-data-science-p-800.jpg",
      category: "Data Science",
      duration: "8 weeks",
      price: 89.99,
      rating: 4.8,
      reviewsCount: 1200,
      instructor: { name: "Maya Patel", avatar: "https://randomuser.me/api/portraits/women/5.jpg", bio: "Data scientist with 8+ years" },
      curriculum: [
        { title: "Fundamentals", lessons: ["Statistics", "Python", "SQL"] },
        { title: "Advanced", lessons: ["Machine Learning", "Visualization"] },
      ],
    },
    3: {
      id: 3,
      title: "UI/UX Design",
      description: "Design user-friendly interfaces that captivate.",
      thumbnail: "https://www.aceinfoway.com/blog/wp-content/uploads/2020/05/uiux_2.jpg",
      category: "Design",
      duration: "6 weeks",
      price: 79.99,
      rating: 4.7,
      reviewsCount: 900,
      instructor: { name: "Liam Brooks", avatar: "https://randomuser.me/api/portraits/men/6.jpg", bio: "UI/UX expert with 7+ years" },
      curriculum: [
        { title: "Core Concepts", lessons: ["Wireframing", "Prototyping"] },
        { title: "Tools", lessons: ["Figma", "Adobe XD"] },
      ],
    },
    4: {
      id: 4,
      title: "Python for Beginners",
      description: "Kickstart your coding journey with Python.",
      thumbnail: "https://notes.edureify.com/wp-content/uploads/2024/10/python3.png",
      category: "Programming",
      duration: "4 weeks",
      price: 59.99,
      rating: 4.6,
      reviewsCount: 800,
      instructor: { name: "Sophie Kim", avatar: "https://randomuser.me/api/portraits/women/6.jpg", bio: "Python educator with 5+ years" },
      curriculum: [
        { title: "Basics", lessons: ["Syntax", "Variables"] },
        { title: "Projects", lessons: ["Simple Apps", "Automation"] },
      ],
    },
  };

  const course = courses[id] || courses[1];

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsEnrolling(true);
    setTimeout(() => {
      setIsEnrolling(false);
      navigate('/profile');
    }, 1500);
  };

  const handleMarkComplete = (lesson) => {
    if (!completedLessons.includes(lesson)) {
      setCompletedLessons([...completedLessons, lesson]);
      toast.success(`Lesson "${lesson}" marked as complete!`, { theme: "colored" });
    } else {
      toast.info(`Lesson "${lesson}" is already completed.`, { theme: "colored" });
    }
  };

  return (
    <div className="course-details container my-5">
      <Card className="course-details__card">
        <Card.Img variant="top" src={course.thumbnail} className="course-details__image" />
        <Card.Body>
          <h1 className="course-details__title">{course.title}</h1>
          <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem', opacity: 0.9 }}>{course.description}</p>
          <div className="d-flex flex-wrap gap-3 mb-4">
            <Badge bg="" style={{ background: 'var(--secondary)', color: 'var(--text-light)' }}>{course.category}</Badge>
            <span style={{ color: 'var(--text-dark)' }}>{course.duration}</span>
            <span style={{ color: 'var(--text-dark)' }}>★ {course.rating} ({course.reviewsCount} reviews)</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: courseVideos[course.id] }} className="mb-4" style={{ borderRadius: '10px', overflow: 'hidden' }} />
          <hr />

          {/* Grid Layout for Instructor and Fee/Enroll */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Instructor Column */}
            <div>
              <h2 style={{ color: 'var(--text-dark)', fontSize: '1.8rem' }}>Instructor</h2>
              <div className="d-flex align-items-center mb-4">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name} 
                  className="rounded-circle me-3" 
                  style={{ width: '60px', height: '60px' }} 
                />
                <div>
                  <h5 style={{ color: 'var(--text-dark)', fontSize: '1.3rem' }}>{course.instructor.name}</h5>
                  <p style={{ color: 'var(--text-dark)', opacity: 0.8, fontSize: '0.95rem' }}>{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Fee and Enroll Column */}
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ color: 'var(--text-dark)', fontSize: '1.8rem' }}>Course Fee</h2>
              <h3 style={{ color: 'var(--primary)', fontSize: '2rem', margin: '1rem 0' }}>${course.price}</h3>
              <p style={{ color: 'var(--text-dark)', opacity: 0.8, fontSize: '0.9rem', marginBottom: '1rem' }}>
                One-time payment • Lifetime access
              </p>
              <Button 
                style={{ 
                  background: 'var(--primary)', 
                  border: 'none', 
                  borderRadius: '25px', 
                  padding: '0.8rem 2rem', 
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }} 
                onClick={handleEnroll} 
                disabled={isEnrolling}
                className="hero-section__button"
              >
                {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
              </Button>
            </div>
          </div>
          <hr />

          <h2 style={{ color: 'var(--text-dark)', fontSize: '1.8rem' }}>What You'll Learn</h2>
          <ListGroup variant="flush" className="mb-4">
            {course.curriculum.flatMap(section => section.lessons).map((lesson, index) => (
              <ListGroup.Item 
                key={index} 
                style={{ background: 'transparent', color: 'var(--text-dark)', fontSize: '0.95rem' }}
              >
                ✅ {lesson}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <hr />

          <h2 style={{ color: 'var(--text-dark)', fontSize: '1.8rem' }}>Curriculum</h2>
          {course.curriculum.map((section, index) => (
            <Card 
              key={index} 
              className="mb-3" 
              style={{ 
                background: 'var(--glass-bg)', 
                backdropFilter: 'var(--glass-blur)', 
                border: '1px solid rgba(255, 255, 255, 0.2)', 
                borderRadius: '12px' 
              }}
            >
              <Card.Header style={{ color: 'var(--text-dark)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {section.title}
              </Card.Header>
              <ListGroup variant="flush">
                {section.lessons.map((lesson, lessonIndex) => (
                  <ListGroup.Item 
                    key={lessonIndex} 
                    className="d-flex justify-content-between align-items-center" 
                    style={{ color: 'var(--text-dark)', background: 'transparent', fontSize: '0.95rem' }}
                  >
                    📚 {lesson}
                    <Button
                      variant={completedLessons.includes(lesson) ? "success" : "outline-primary"}
                      size="sm"
                      onClick={() => handleMarkComplete(lesson)}
                      disabled={!user}
                      style={{ borderRadius: '15px', padding: '0.3rem 1rem' }}
                    >
                      {completedLessons.includes(lesson) ? "Completed" : "Mark Complete"}
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CourseDetails;
