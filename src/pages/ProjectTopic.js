import React, { useState } from 'react';

const ProjectTopic = () => {
  const [activeTab, setActiveTab] = useState('diet');

  return (
    <div className="container">
      <h2>Health & Wellness Topics</h2>
      <div className="topic-section">
        <div className="tabs">
          <button 
            className={activeTab === 'diet' ? 'btn btn-primary' : 'btn'}
            onClick={() => setActiveTab('diet')}
          >
            Healthy Diet
          </button>
          <button 
            className={activeTab === 'care' ? 'btn btn-primary' : 'btn'}
            onClick={() => setActiveTab('care')}
          >
            Health Care
          </button>
          <button 
            className={activeTab === 'records' ? 'btn btn-primary' : 'btn'}
            onClick={() => setActiveTab('records')}
          >
            Health Records
          </button>
        </div>

        {activeTab === 'diet' && (
          <div className="tab-content">
            <h3>Healthy Diet Guidelines</h3>
            <div className="health-record">
              <h4>Balanced Nutrition</h4>
              <p>A balanced diet includes foods from all the major food groups: fruits, vegetables, grains, protein, and dairy. The key is to eat a variety of foods in the right proportions. Focus on whole foods rather than processed ones, and limit added sugars, sodium, and unhealthy fats. The Harvard Healthy Eating Plate recommends filling half your plate with vegetables and fruits, one-quarter with whole grains, and one-quarter with healthy proteins.</p>
            </div>
            <div className="health-record">
              <h4>Portion Control</h4>
              <p>Understanding portion sizes can help you maintain a healthy weight and prevent overeating. Use your hand as a guide: a fist-sized portion for vegetables, a palm-sized portion for protein, a cupped hand for carbs, and a thumb-sized portion for fats. Eating slowly and mindfully also helps with portion control, as it takes about 20 minutes for your brain to register that you're full.</p>
            </div>
            <div className="health-record">
              <h4>Hydration</h4>
              <p>Drinking enough water is essential for almost every function in your body. Aim for 8-10 glasses of water daily, more if you're active or in a hot climate. Water helps regulate body temperature, transport nutrients, and flush out toxins. Herbal teas, water-rich fruits, and vegetables also contribute to hydration. Limit sugary drinks and excessive caffeine.</p>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="tab-content">
            <h3>Health Care Tips</h3>
            <div className="health-record">
              <h4>Regular Checkups</h4>
              <p>Schedule regular health checkups to catch potential problems early. Adults should have annual physical exams, dental checkups twice a year, and eye exams every 1-2 years. Keep track of your family medical history and discuss risk factors with your doctor. Preventive care is more effective and less expensive than treating diseases after they develop.</p>
            </div>
            <div className="health-record">
              <h4>Exercise Regularly</h4>
              <p>Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening exercises twice a week. Find activities you enjoy - walking, swimming, dancing, or cycling. Exercise boosts mood, energy levels, and immune function while reducing the risk of chronic diseases. Start slowly and gradually increase intensity.</p>
            </div>
            <div className="health-record">
              <h4>Mental Health</h4>
              <p>Prioritize your mental health by managing stress and maintaining social connections. Practice relaxation techniques like deep breathing, meditation, or yoga. Get adequate sleep (7-9 hours), maintain a support network, and seek professional help when needed. Mental health is just as important as physical health and affects your overall well-being.</p>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="tab-content">
            <h3>Health Record Management</h3>
            <div className="health-record">
              <h4>Track Your Progress</h4>
              <p>Keep records of your health metrics to monitor improvements over time. Track weight, blood pressure, cholesterol levels, exercise frequency, and dietary habits. Use apps or journals to record symptoms, medications, and doctor visits. This information helps you and your healthcare providers make informed decisions about your care.</p>
            </div>
            <div className="health-record">
              <h4>Medication Schedule</h4>
              <p>Maintain a log of your medications and when to take them. Include prescription drugs, over-the-counter medications, and supplements. Note dosages, frequency, and any side effects. Use pill organizers, alarms, or apps to help you stay on schedule. Always inform healthcare providers of all medications you're taking to avoid interactions.</p>
            </div>
            <div className="health-record">
              <h4>Medical History</h4>
              <p>Keep an updated record of your medical history and allergies. Include surgeries, hospitalizations, chronic conditions, immunizations, and family medical history. Maintain a list of all healthcare providers with contact information. Carry a summary card with essential information for emergencies. This ensures continuity of care and helps in emergencies.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTopic;