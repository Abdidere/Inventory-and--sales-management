import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
// import products from '../data/products';
const UserApp = ({ 
  products, 
  categories, 
  setCurrentView, 
  searchQuery, 
  onSearch,
  theme,
  toggleTheme,
  getFilteredProducts 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const filteredProducts = getFilteredProducts ? getFilteredProducts({
    category: selectedCategory
  }) : products;

  const similarProducts = selectedProduct 
    ? products.filter(p => 
        p.category === selectedProduct.category && 
        p.id !== selectedProduct.id
      ).slice(0, 4)
    : [];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            products={products}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            onProductClick={handleProductClick}
            filteredProducts={filteredProducts}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home 
            products={products}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            onProductClick={handleProductClick}
            filteredProducts={filteredProducts}
          />
        );
    }
  };

  return (
    <div className="app">
      <Navbar 
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={onSearch}
        currentView="user"
        setCurrentView={setCurrentPage}
      />
      
      <main className="main-content">
        {selectedProduct ? (
          <ProductDetailView 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)}
            similarProducts={similarProducts}
            onProductClick={handleProductClick}
          />
        ) : (
          renderPage()
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Product Detail Component
const ProductDetailView = ({ product, onBack, similarProducts, onProductClick }) => (
  <div className="product-detail-page">
    <button className="btn btn-back" onClick={onBack}>
      <i className="fas fa-arrow-left"></i>
      Back to Products
    </button>
    
    <div className="product-detail-container">
      <div className="product-image-section">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-detail-image"
        />
        <div className="image-badge">Hot Item</div>
      </div>
      
      <div className="product-info-section">
        <div className="product-header">
          <h1>{product.name}</h1>
          <span className="category-badge">{product.category}</span>
        </div>
        
        <div className="product-meta">
          <p className="product-model">
            <i className="fas fa-tag"></i>
            Model: {product.model}
          </p>
          <p className="product-specs">
            <i className="fas fa-list"></i>
            {product.specs}
          </p>
        </div>
        
        <div className="product-price-section">
          <span className="product-price-large">{product.price.toLocaleString()} Birr</span>
          <div className="price-breakdown">
            <span className="tax-info">Incl. VAT</span>
          </div>
        </div>
        
        <div className="store-visit-section">
          <div className="store-info">
            <h3>
              <i className="fas fa-store"></i>
              Visit Our Store
            </h3>
            <p>Come to our physical location to see this product in person and make your purchase. Our expert staff will help you choose the perfect device.</p>
          </div>
          
          <div className="store-features">
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Hands-on Experience</span>
            </div>
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Expert Assistance</span>
            </div>
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Immediate Pickup</span>
            </div>
          </div>
          
          <button className="btn btn-primary btn-large">
            <i className="fas fa-map-marker-alt"></i>
            Get Directions to Store
          </button>
        </div>
      </div>
    </div>
    
    {similarProducts.length > 0 && (
      <div className="similar-products-section">
        <h2 className="section-title">
          <i className="fas fa-th-large"></i>
          Similar Products
        </h2>
        <div className="products-grid">
          {similarProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => onProductClick(product)}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <span>View Details</span>
                </div>
              </div>
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-specs">{product.specs}</p>
                <p className="product-model">Model: {product.model}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price.toLocaleString()} Birr</span>
                  <button className="btn-view">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default UserApp;