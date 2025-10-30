import React from 'react';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h2>Your Health, Our Priority</h2>
          <p>Track, manage, and improve your health with our comprehensive health monitoring platform</p>
          <button className="btn btn-primary">Get Started Today</button>
        </div>
      </section>

      <div className="container">
        <section className="features">
          <div className="feature-card">
            <i>🩺</i>
            <h3>Health Tracking</h3>
            <p>Monitor your vital signs and health metrics with our advanced tracking system. Keep detailed records of your health journey.</p>
          </div>
          <div className="feature-card">
            <i>🥗</i>
            <h3>Nutrition Guide</h3>
            <p>Get personalized nutrition recommendations based on your health goals. Discover healthy recipes and meal plans.</p>
          </div>
          <div className="feature-card">
            <i>💊</i>
            <h3>Remedy Suggestions</h3>
            <p>Discover natural remedies and health solutions for common ailments. Get expert advice on wellness and prevention.</p>
          </div>
        </section>

        <section className="topic-section">
          <h3>Featured Health Articles</h3>
          <div className="health-record">
            <h4>Benefits of Mediterranean Diet</h4>
            <p>The Mediterranean diet is widely regarded as one of the healthiest diets in the world. Rich in fruits, vegetables, whole grains, and healthy fats, it has been linked to reduced risks of heart disease, stroke, and certain cancers. Studies show it can also improve brain health and extend lifespan.</p>
          </div>
          <div className="health-record">
            <h4>10 Natural Ways to Boost Immunity</h4>
            <p>Strengthen your immune system with these simple lifestyle changes: get adequate sleep (7-9 hours), stay hydrated, exercise regularly, manage stress through meditation or yoga, eat colorful fruits and vegetables, and consider supplements like vitamin D and zinc after consulting your doctor.</p>
          </div>
          <div className="health-record">
            <h4>Understanding Blood Pressure Readings</h4>
            <p>Blood pressure is the force of blood pushing against the walls of your arteries. Normal reading is less than 120/80 mmHg. Elevated is 120-129 systolic and less than 80 diastolic. High blood pressure (hypertension) is 130/80 mmHg or higher. Regular monitoring is essential for heart health.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;