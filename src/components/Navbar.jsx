import React from 'react';

const Navbar = ({ theme, toggleTheme, searchQuery, setSearchQuery, currentView, setCurrentView }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-laptop"></i>
        JO Electronic Shop
      </div>
      
      <ul className="navbar-nav">
        <li>
          <a href="#home" onClick={() => setCurrentView('home')}>
            <i className="fas fa-home"></i>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => setCurrentView('about')}>
            <i className="fas fa-info-circle"></i>
            About Us
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setCurrentView('contact')}>
            <i className="fas fa-phone"></i>
            Contact
          </a>
        </li>
        {currentView === 'admin' && (
          <li>
            <a href="#user-view" onClick={() => setCurrentView('home')}>
              <i className="fas fa-store"></i>
              User View
            </a>
          </li>
        )}
      </ul>
      
      <div className="navbar-controls">
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;