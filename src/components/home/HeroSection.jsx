import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="hero-section__title">SkillSpring</h1>
            <p className="hero-section__subtitle">
              Unleash Your Potential with Cutting-Edge Skills and Immersive Learning
            </p>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <Button
                as={Link}
                to="/courses"
                className="hero-section__button"
                style={{ background: 'var(--accent)', color: 'var(--text-dark)' }}
              >
                Explore Courses
              </Button>
              <Button
                as={Link}
                to="/register"
                className="hero-section__button"
                style={{ background: 'var(--primary)', color: 'var(--text-light)' }}
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
