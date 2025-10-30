import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { register } from '../services/api';
import { handleApiError } from '../utils/errorUtils';

const Register = () => {
  const navigate = useNavigate();
  const { register: authRegister } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  const { name, email, password, password2, role } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await register(formData);
      localStorage.setItem('token', res.data.token);
      authRegister(res.data.data);
      
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
        <h2>Create Your Account</h2>
        <p>Join our health monitoring platform to track and improve your wellness</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email address"
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
              placeholder="Create a strong password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">User Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={onChange}
            >
              <option value="user">Public User (Track personal health)</option>
              <option value="admin">Administrator (Manage system)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Create Account
          </button>
        </form>
        <p className="text-center" style={{ marginTop: '20px' }}>
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;