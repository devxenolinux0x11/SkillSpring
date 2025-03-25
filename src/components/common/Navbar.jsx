import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar, Nav, Form, Button, Dropdown } from 'react-bootstrap';

function Navigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/courses?search=${searchQuery}`);
  };

  return (
    <Navbar expand="lg" className="navbar fixed-top">
      <div className="container">
        <Navbar.Brand as={Link} to="/" className="navbar__brand">SkillSpring</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-3">
            <Nav.Link as={Link} to="/" style={{ color: 'var(--text-dark)' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/courses" style={{ color: 'var(--text-dark)' }}>Courses</Nav.Link>
          </Nav>
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <Form.Control type="search" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="me-2" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '25px' }} />
          </Form>
          {user ? (
            <Dropdown>
              <Dropdown.Toggle style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'var(--text-dark)', borderRadius: '50%' }} id="dropdown-basic">
                <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="User" className="rounded-circle" style={{ width: '35px', height: '35px' }} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                {user.email === 'admin@example.com' && <Dropdown.Item as={Link} to="/admin">Admin</Dropdown.Item>}
                <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex gap-3">
              <Button as={Link} to="/login" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'var(--text-dark)', borderRadius: '25px' }}>Login</Button>
              <Button as={Link} to="/register" style={{ background: 'var(--primary)', border: 'none', borderRadius: '25px' }}>Sign Up</Button>
            </div>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navigation;
