import React from 'react';
import '../styles/Products.css';

const ProductCard = ({ product, onClick, isAdmin = false, onSell }) => {
  
  // Add debugging
  console.log('ProductCard rendering:', product);

  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/300x300/2c3e50/ffffff?text=${encodeURIComponent(product.name)}`;
  };

  const handleClick = () => {
    if (onClick && product) {
      onClick(product);
    }
  };

  if (!product) {
    return (
      <div className="product-card">
        <div className="product-content">
          <h3>Product not available</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          onError={handleImageError}
        />
        <div className="product-overlay">
          <span>View Details</span>
        </div>
      </div>
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="category-badge">{product.category}</span>
        </div>
        <p className="product-specs">{product.specs}</p>
        <p className="product-model">Model: {product.model}</p>
        <div className="product-footer">
          <span className="product-price">{product.price?.toLocaleString()} Birr</span>
          <button className="btn-view">
            <i className="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;