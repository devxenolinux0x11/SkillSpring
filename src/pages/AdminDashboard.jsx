import { Card, Button, Row, Col } from 'react-bootstrap';

function AdminDashboard() {
  return (
    <div className="admin-dashboard container my-5">
      <h1 className="course-carousel__title mb-4">Admin Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card className="admin-dashboard__card mb-4">
            <Card.Body>
              <h3 style={{ color: 'var(--text-dark)' }}>Users</h3>
              <Button style={{ background: 'var(--primary)', border: 'none' }}>Manage Users</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="admin-dashboard__card mb-4">
            <Card.Body>
              <h3 style={{ color: 'var(--text-dark)' }}>Courses</h3>
              <Button style={{ background: 'var(--primary)', border: 'none' }}>Manage Courses</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="admin-dashboard__card mb-4">
            <Card.Body>
              <h3 style={{ color: 'var(--text-dark)' }}>Enrollments</h3>
              <Button style={{ background: 'var(--primary)', border: 'none' }}>Manage Enrollments</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashboard;
