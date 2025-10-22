import React from 'react';
import ProductCard from '../components/ProductCard';

const Home = ({ 
  products, 
  searchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  onProductClick,
  filteredProducts 
}) => {
  return (
    <div>
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
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onProductClick}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
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