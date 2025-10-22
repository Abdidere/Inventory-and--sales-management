import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import ProductCard from '../components/ProductCard';
import Reports from '../components/Reports';
import '../styles/Admin.css';
import '../styles/Products.css';
import '../styles/Reports.css';

const AdminDashboard = ({ 
  products, 
  setProducts, 
  categories, 
  setCategories, 
  salesHistory, 
  setSalesHistory,
  searchQuery,
  onSearch,
  onAddProduct,
  onDeleteProduct,
  onRecordSale,
  onAddCategory,
  onDeleteCategory,
  getFilteredProducts
}) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    specs: '',
    model: '',
    price: '',
    amount: '',
    image: ''
  });
  const [newCategory, setNewCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ownerName = "John Owner";

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && sidebarOpen) {
        if (!event.target.closest('.admin-sidebar') && !event.target.closest('.sidebar-toggle')) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setNewProduct({
      name: '',
      category: '',
      specs: '',
      model: '',
      price: '',
      amount: '',
      image: ''
    });
    alert('Product added successfully!');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (onAddCategory(newCategory)) {
      setNewCategory('');
      alert('Category added successfully!');
    }
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete category "${category}"?`)) {
      onDeleteCategory(category);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(productId);
    }
  };

  const handleSellProduct = (product) => {
    setSelectedProduct(product);
  };

  const confirmSale = () => {
    if (selectedProduct && onRecordSale(selectedProduct.id, sellQuantity)) {
      setSelectedProduct(null);
      setSellQuantity(1);
      alert('Sale recorded successfully!');
    }
  };

  const filteredProducts = getFilteredProducts ? getFilteredProducts({}) : products;

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <div className="admin-grid">
              <div className="admin-card">
                <h3><i className="fas fa-boxes"></i> Total Products</h3>
                <p className="stat-value">{products.length}</p>
              </div>
              <div className="admin-card">
                <h3><i className="fas fa-exclamation-triangle"></i> Low Stock</h3>
                <p className="stat-value" style={{color: '#e74c3c'}}>
                  {products.filter(p => p.amount < 5).length}
                </p>
              </div>
              <div className="admin-card">
                <h3><i className="fas fa-tags"></i> Categories</h3>
                <p className="stat-value">{categories.length}</p>
              </div>
              <div className="admin-card">
                <h3><i className="fas fa-shopping-cart"></i> Total Sales</h3>
                <p className="stat-value">{salesHistory.length}</p>
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div>
            <h2>Inventory Management</h2>
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} style={{position: 'relative'}}>
                  <ProductCard 
                    product={product} 
                    onClick={() => {}} 
                    isAdmin={true}
                    onSell={handleSellProduct}
                  />
                  <button 
                    className="btn btn-danger" 
                    style={{position: 'absolute', top: '10px', right: '10px'}}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'add-product':
        return (
          <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct} className="welcome-message">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="form-control"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Specifications</label>
                <textarea 
                  className="form-control" 
                  value={newProduct.specs}
                  onChange={(e) => setNewProduct({...newProduct, specs: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newProduct.model}
                  onChange={(e) => setNewProduct({...newProduct, model: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Price (Birr)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={newProduct.amount}
                  onChange={(e) => setNewProduct({...newProduct, amount: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
          </div>
        );

      case 'categories':
        return (
          <div>
            <h2>Category Management</h2>
            
            <div className="welcome-message" style={{marginBottom: '2rem'}}>
              <h3>Add New Category</h3>
              <form onSubmit={handleAddCategory} style={{display: 'flex', gap: '1rem'}}>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                  required
                />
                <button type="submit" className="btn btn-primary">Add Category</button>
              </form>
            </div>

            <div className="welcome-message">
              <h3>Existing Categories</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem'}}>
                {categories.map(category => (
                  <div key={category} style={{
                    padding: '1rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>{category}</span>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'reports':
        return <Reports products={products} salesHistory={salesHistory} />;

      case 'sales':
        return (
          <div>
            <h2>Sales History</h2>
            <div className="welcome-message">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salesHistory.map((sale, index) => (
                    <tr key={index}>
                      <td>{new Date(sale.timestamp).toLocaleString()}</td>
                      <td>{sale.productName}</td>
                      <td>{sale.quantity}</td>
                      <td>{sale.price} Birr</td>
                      <td>{sale.price * sale.quantity} Birr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        ownerName={ownerName}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="admin-main">
        {renderSection()}
      </div>

      {/* Sell Product Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '500px'
          }}>
            <h3>Sell {selectedProduct.name}</h3>
            <p>Available: {selectedProduct.amount}</p>
            
            <div className="form-group">
              <label>Quantity to Sell</label>
              <input 
                type="number" 
                className="form-control" 
                value={sellQuantity}
                onChange={(e) => setSellQuantity(parseInt(e.target.value))}
                min="1"
                max={selectedProduct.amount}
              />
            </div>
            
            <div style={{marginTop: '1rem'}}>
              <strong>Total: {selectedProduct.price * sellQuantity} Birr</strong>
            </div>
            
            <div style={{marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
              <button 
                className="btn" 
                onClick={() => {
                  setSelectedProduct(null);
                  setSellQuantity(1);
                }}
                style={{backgroundColor: '#95a5a6', color: 'white'}}
              >
                Cancel
              </button>
              <button 
                className="btn btn-success" 
                onClick={confirmSale}
                disabled={sellQuantity < 1 || sellQuantity > selectedProduct.amount}
              >
                Confirm Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;