import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      
      <div className="welcome-message">
        <h2>Get in Touch</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem'}}>
          <div>
            <h3>Store Information</h3>
            <p><strong>Address:</strong> Bole Road, Addis Ababa, Ethiopia</p>
            <p><strong>Phone:</strong> +251 11 123 4567</p>
            <p><strong>Email:</strong> info@jo-electronics.com</p>
            <p><strong>Store Hours:</strong></p>
            <ul>
              <li>Monday - Friday: 8:30 AM - 7:00 PM</li>
              <li>Saturday: 9:00 AM - 6:00 PM</li>
              <li>Sunday: 10:00 AM - 4:00 PM</li>
            </ul>
          </div>
          
          <div>
            <h3>Send Us a Message</h3>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows="4"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;