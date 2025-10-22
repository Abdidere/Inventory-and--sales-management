import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About JO Electronic Shop</h1>
      <div className="welcome-message">
        <h2>Our Story</h2>
        <p>
          JO Electronic Shop has been serving the Ethiopian community with quality electronics 
          since 2010. We pride ourselves on offering the latest technology at competitive prices 
          with excellent customer service.
        </p>
        
        <h3>Why Choose Us?</h3>
        <ul style={{paddingLeft: '2rem', marginTop: '1rem'}}>
          <li>Wide selection of genuine products</li>
          <li>Competitive prices in Ethiopian Birr</li>
          <li>Knowledgeable and friendly staff</li>
          <li>Physical store location for hands-on experience</li>
          <li>Regular new arrivals of latest technology</li>
        </ul>
        
        <h3>Visit Our Store</h3>
        <p>
          Come visit our physical store to see our products in person. Our knowledgeable staff 
          will help you find the perfect electronic device for your needs.
        </p>
        
        <p style={{fontWeight: 'bold', marginTop: '2rem'}}>
          Note: All purchases must be made in-person at our physical store location.
        </p>
      </div>
    </div>
  );
};

export default About;