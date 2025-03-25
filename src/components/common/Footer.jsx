// Footer.js
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-4">
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <h3 className="footer__brand">LearnSphere</h3>
            <p className="footer__tagline">Empower your future with knowledge.</p>
          </Col>
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <h3 className="footer__title">Quick Links</h3>
            <ul className="list-unstyled footer__links">
              <li><Link to="/courses" className="footer__link">Courses</Link></li>
              <li><Link to="/about" className="footer__link">About</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
            </ul>
          </Col>
          <Col md={4} className="footer-section">
            <h3 className="footer__title">Contact Us</h3>
            <ul className="list-unstyled footer__contact">
              <li>
                <span className="footer__contact-icon">✉️</span>
                <a href="mailto:support@learnsphere.com" className="footer__contact-link">
                  support@learnsphere.com
                </a>
              </li>
              <li>
                <span className="footer__contact-icon">📞</span>
                <a href="tel:+15551234567" className="footer__contact-link">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="footer__divider" />
        <div className="footer__bottom text-center py-3">
          <p className="mb-0">© {new Date().getFullYear()} LearnSphere. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;