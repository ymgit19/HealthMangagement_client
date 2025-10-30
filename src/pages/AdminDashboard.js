import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHealthRecords, deleteHealthRecord, getContacts } from '../services/api';
import { handleApiError } from '../utils/errorUtils';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const recordsRes = await getHealthRecords();
      const contactsRes = await getContacts();
      setRecords(recordsRes.data.data);
      setContacts(contactsRes.data.data);
      setLoading(false);
    } catch (err) {
      setError(handleApiError(err));
      setLoading(false);
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

  const handleDeleteContact = async id => {
    try {
      // In a real app, you would implement delete contact functionality
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  if (loading) {
    return <div className="container"><h2>Loading administrative data...</h2></div>;
  }

  return (
    <div className="container">
      <h2>Administrator Dashboard</h2>
      <p className="text-center" style={{ marginBottom: '30px', color: '#7f8c8d' }}>
        Manage all health records, user inquiries, and system settings
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="dashboard">
        <div className="sidebar">
          <h3>Admin Panel</h3>
          <ul>
            <li><button onClick={() => setActiveTab('records')}>All Health Records</button></li>
            <li><button onClick={() => setActiveTab('contacts')}>Contact Inquiries</button></li>
            <li><button onClick={() => setActiveTab('users')}>User Management</button></li>
            <li><button onClick={() => navigate('/')}>Home</button></li>
          </ul>
        </div>
        <div className="main-content">
          {activeTab === 'records' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3>All Health Records</h3>
                <div>
                  <span className="btn" style={{ background: '#f8f9fa', color: '#2c3e50', cursor: 'default' }}>
                    Total Records: {records.length}
                  </span>
                </div>
              </div>
              <div>
                {records.length === 0 ? (
                  <div className="card text-center">
                    <h4>No health records found</h4>
                    <p>There are currently no health records in the system.</p>
                  </div>
                ) : (
                  records.map(record => (
                    <div key={record._id} className="health-record">
                      <h4>{record.title}</h4>
                      <p>{record.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <span><strong>User:</strong> {record.user?.name || 'Unknown'}</span>
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
          
          {activeTab === 'contacts' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3>Contact Inquiries</h3>
                <div>
                  <span className="btn" style={{ background: '#f8f9fa', color: '#2c3e50', cursor: 'default' }}>
                    Total Inquiries: {contacts.length}
                  </span>
                </div>
              </div>
              <div>
                {contacts.length === 0 ? (
                  <div className="card text-center">
                    <h4>No contact inquiries</h4>
                    <p>There are currently no contact inquiries in the system.</p>
                  </div>
                ) : (
                  contacts.map(contact => (
                    <div key={contact._id} className="health-record">
                      <h4>{contact.subject}</h4>
                      <p><strong>From:</strong> {contact.name} ({contact.email})</p>
                      <p>{contact.message}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <span><strong>Date:</strong> {new Date(contact.createdAt).toLocaleDateString()}</span>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleDeleteContact(contact._id)}
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
          
          {activeTab === 'users' && (
            <div>
              <h3>User Management</h3>
              <div className="card">
                <h4>Manage Users</h4>
                <p>Admin can view, edit, and delete user accounts here.</p>
                <div className="health-record">
                  <h4>John Doe</h4>
                  <p><strong>📧 Email:</strong> john@example.com</p>
                  <p><strong>👤 Role:</strong> Public User</p>
                  <p><strong>📅 Member Since:</strong> October 2025</p>
                  <p><strong>📊 Health Records:</strong> 5 records</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button className="btn btn-primary">✏️ Edit</button>
                    <button className="btn btn-danger">🗑️ Delete</button>
                  </div>
                </div>
                <div className="health-record">
                  <h4>Jane Smith</h4>
                  <p><strong>📧 Email:</strong> jane@example.com</p>
                  <p><strong>👤 Role:</strong> Public User</p>
                  <p><strong>📅 Member Since:</strong> October 2025</p>
                  <p><strong>📊 Health Records:</strong> 3 records</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button className="btn btn-primary">✏️ Edit</button>
                    <button className="btn btn-danger">🗑️ Delete</button>
                  </div>
                </div>
                <div className="health-record">
                  <h4>Admin User</h4>
                  <p><strong>📧 Email:</strong> admin@example.com</p>
                  <p><strong>👤 Role:</strong> Administrator</p>
                  <p><strong>📅 Member Since:</strong> October 2025</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button className="btn btn-primary">✏️ Edit</button>
                    <button className="btn btn-danger">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;