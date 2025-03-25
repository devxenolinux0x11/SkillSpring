import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/profile');
      } catch (err) {
        setError('Invalid email or password');
      }
    },
  });

  return (
    <div className="login d-flex align-items-center justify-content-center min-vh-100">
      <Card className="auth__card" style={{ maxWidth: '450px' }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: 'var(--primary)' }}>Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-dark)' }}>Email</Form.Label>
              <Form.Control type="email" name="email" {...formik.getFieldProps('email')} isInvalid={formik.touched.email && formik.errors.email} style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
              <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-dark)' }}>Password</Form.Label>
              <Form.Control type="password" name="password" {...formik.getFieldProps('password')} isInvalid={formik.touched.password && formik.errors.password} style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-between mb-3">
              <Form.Check label="Remember me" style={{ color: 'var(--text-dark)' }} />
              <Link to="#" style={{ color: 'var(--primary)' }}>Forgot Password?</Link>
            </div>
            <Button style={{ background: 'var(--primary)', border: 'none' }} type="submit" className="w-100">Sign In</Button>
          </Form>
          <p className="text-center mt-3" style={{ color: 'var(--text-dark)' }}>Need an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Sign up</Link></p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
