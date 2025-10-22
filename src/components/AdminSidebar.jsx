import React from 'react';
import '../styles/Admin.css';

const AdminSidebar = ({ activeSection, setActiveSection, ownerName, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-bar' },
    { id: 'inventory', label: 'Inventory', icon: 'fas fa-boxes' },
    { id: 'add-product', label: 'Add Product', icon: 'fas fa-plus-circle' },
    { id: 'categories', label: 'Categories', icon: 'fas fa-tags' },
    { id: 'reports', label: 'Reports', icon: 'fas fa-chart-line' },
    { id: 'sales', label: 'Sales History', icon: 'fas fa-shopping-cart' }
  ];

  return (
    <>
      <button className="sidebar-toggle" onClick={onToggle}>
        <i className="fas fa-bars"></i>
      </button>
      
      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <h2>
          <i className="fas fa-cogs"></i>
          Admin Panel
        </h2>
        <p style={{textAlign: 'center', marginBottom: '2rem', color: '#bdc3c7'}}>
          Welcome, <strong>{ownerName}</strong>!
        </p>
        
        <ul>
          {menuItems.map(item => (
            <li
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => {
                setActiveSection(item.id);
                // Close sidebar on mobile after selection
                if (window.innerWidth <= 768) {
                  onToggle();
                }
              }}
            >
              <i className={item.icon}></i>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;