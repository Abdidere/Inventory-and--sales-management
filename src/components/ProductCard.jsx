import React from 'react';

const ProductCard = ({ product, onClick, isAdmin = false, onSell }) => {
  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/300x300/2c3e50/ffffff?text=${encodeURIComponent(product.name)}`;
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  console.log('Rendering product card:', product);

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
        
        {isAdmin && (
          <div className="admin-controls">
            <p className="product-stock">In Stock: {product.amount}</p>
            <button 
              className="btn btn-success" 
              onClick={(e) => {
                e.stopPropagation();
                if (onSell) onSell(product);
              }}
              disabled={!product.amount || product.amount === 0}
            >
              Sell Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;