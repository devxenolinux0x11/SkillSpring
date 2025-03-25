import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function Register() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: '',
      country: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      gender: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await register(values.email, values.password, values.name, values.gender, values.country);
        navigate('/profile');
      } catch (err) {
        setError('Registration failed');
      }
    },
  });

  return (
    <div className="register d-flex align-items-center justify-content-center min-vh-100">
      <Card className="auth__card" style={{ maxWidth: '450px' }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: 'var(--primary)' }}>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-dark)' }}>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                {...formik.getFieldProps('name')}
                isInvalid={formik.touched.name && formik.errors.name}
                className="auth__input"
              />
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-dark)' }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                {...formik.getFieldProps('email')}
                isInvalid={formik.touched.email && formik.errors.email}
                className="auth__input"
              />
              <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-dark)' }}>Gender</Form.Label>
              <Form.Select
                name="gender"
                {...formik.getFieldProps('gender')}
                isInvalid={formik.touched.gender && formik.errors.gender}
                className="auth__input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.gender}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-dark)' }}>Country</Form.Label>
              <Form.Select
                name="country"
                {...formik.getFieldProps('country')}
                isInvalid={formik.touched.country && formik.errors.country}
                className="auth__input"
              >
                <option value="">Select Country</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="india">India</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-dark)' }}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                {...formik.getFieldProps('password')}
                isInvalid={formik.touched.password && formik.errors.password}
                className="auth__input"
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-dark)' }}>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                {...formik.getFieldProps('confirmPassword')}
                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                className="auth__input"
              />
              <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="auth__btn w-100">
              Sign Up
            </Button>
          </Form>
          <p className="text-center mt-3" style={{ color: 'var(--text-dark)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Sign in</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;