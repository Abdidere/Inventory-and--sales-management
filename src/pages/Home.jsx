import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';
import '../styles/Products.css';

const Home = ({ 
  products, 
  searchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  onProductClick,
  filteredProducts 
}) => {
  
  // Add debugging
  useEffect(() => {
    console.log('Home Component - Debug Info:');
    console.log('All products:', products);
    console.log('Filtered products:', filteredProducts);
    console.log('Search query:', searchQuery);
    console.log('Selected category:', selectedCategory);
    console.log('Categories:', categories);
  }, [products, filteredProducts, searchQuery, selectedCategory, categories]);

  return (
    <div>
      {/* Debug info - remove this after fixing */}
      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '5px',
        padding: '1rem',
        marginBottom: '1rem',
        fontSize: '0.8rem',
        fontFamily: 'monospace'
      }}>
        <strong>Debug Info:</strong><br />
        Total Products: {products.length} | 
        Filtered Products: {filteredProducts.length} | 
        Search: "{searchQuery}" | 
        Category: {selectedCategory}
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>JO Electronic Shop</h1>
          <p>Discover the latest electronics at the best prices in Ethiopia. Premium quality, genuine products, expert service.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{products.length}+</span>
              <span className="hero-stat-label">Products</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">{categories.length}</span>
              <span className="hero-stat-label">Categories</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">2010</span>
              <span className="hero-stat-label">Since</span>
            </div>
          </div>
        </div>
      </div>

      <div className="filters">
        <select 
          className="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <div className="results-count">
          Showing {filteredProducts.length} products
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick}
            />
          ))
        ) : products.length > 0 ? (
          // Fallback to show all products if filtered is empty but products exist
          products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick}
            />
          ))
        ) : (
          <div className="empty-state">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>No products available</h3>
            <p>Please check if the products data is loaded correctly</p>
          </div>
        )}
      </div>
      
      {filteredProducts.length === 0 && products.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-search"></i>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Home;