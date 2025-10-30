import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { login } from '../services/api';
import { handleApiError } from '../utils/errorUtils';

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(formData);
      localStorage.setItem('token', res.data.token);
      authLogin(res.data.data);
      
      // Redirect based on user role
      if (res.data.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/public-dashboard');
      }
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Welcome Back</h2>
        <p>Please sign in to access your health dashboard</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>
        <p className="text-center" style={{ marginTop: '20px' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;