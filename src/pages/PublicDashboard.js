import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHealthRecords, createHealthRecord, deleteHealthRecord } from '../services/api';
import { handleApiError } from '../utils/errorUtils';

const PublicDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general'
  });

  const { title, description, category } = formData;

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const res = await getHealthRecords();
      setRecords(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(handleApiError(err));
      setLoading(false);
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await createHealthRecord(formData);
      setRecords([...records, res.data.data]);
      setFormData({
        title: '',
        description: '',
        category: 'general'
      });
      setShowForm(false);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const handleDeleteRecord = async id => {
    try {
      await deleteHealthRecord(id);
      setRecords(records.filter(record => record._id !== id));
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  if (loading) {
    return <div className="container"><h2>Loading your health data...</h2></div>;
  }

  return (
    <div className="container">
      <h2>Public User Dashboard</h2>
      <p className="text-center" style={{ marginBottom: '30px', color: '#7f8c8d' }}>
        Manage your personal health records and track your wellness journey
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="dashboard">
        <div className="sidebar">
          <h3>Your Health Hub</h3>
          <ul>
            <li><button onClick={() => setActiveTab('records')}>My Health Records</button></li>
            <li><button onClick={() => setActiveTab('profile')}>My Profile</button></li>
            <li><button onClick={() => navigate('/')}>Home</button></li>
          </ul>
        </div>
        <div className="main-content">
          {activeTab === 'records' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3>My Health Records</h3>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                  {showForm ? 'Cancel' : '➕ Add New Record'}
                </button>
              </div>
              
              {showForm && (
                <div className="card">
                  <h3>Add New Health Record</h3>
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label htmlFor="title">Record Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                        placeholder="e.g., Blood Pressure Reading, Workout Session"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={description}
                        onChange={onChange}
                        required
                        placeholder="Describe your health record in detail..."
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={onChange}
                      >
                        <option value="general">General Health</option>
                        <option value="diet">Diet & Nutrition</option>
                        <option value="exercise">Exercise & Fitness</option>
                        <option value="medicine">Medication</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success">Save Record</button>
                  </form>
                </div>
              )}
              
              <div>
                {records.length === 0 ? (
                  <div className="card text-center">
                    <h4>No health records yet</h4>
                    <p>Start tracking your health by adding your first record!</p>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                      Add Your First Record
                    </button>
                  </div>
                ) : (
                  records.map(record => (
                    <div key={record._id} className="health-record">
                      <h4>{record.title}</h4>
                      <p>{record.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <span><strong>Category:</strong> {record.category}</span>
                        <span><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</span>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleDeleteRecord(record._id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div>
              <h3>My Profile</h3>
              <div className="card">
                <h4>John Doe</h4>
                <p><strong>📧 Email:</strong> john@example.com</p>
                <p><strong>👤 Role:</strong> Public User</p>
                <p><strong>📅 Member Since:</strong> October 2025</p>
                <p><strong>📊 Health Records:</strong> {records.length} records</p>
                <div style={{ marginTop: '20px' }}>
                  <button className="btn btn-primary">Edit Profile</button>
                  <button className="btn btn-danger" style={{ marginLeft: '10px' }}>Change Password</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicDashboard;