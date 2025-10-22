import React, { useState, useEffect } from 'react';
import UserApp from './components/UserApp';
import AdminDashboard from './pages/AdminDashboard';
import { initialProducts, categories as initialCategories } from './data/products';
import './styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('user');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log('Initializing data...');
    
   
    const savedTheme = localStorage.getItem('jo-electronics-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load data from localStorage or use initial data
    try {
      const savedProducts = localStorage.getItem('jo-electronics-products');
      const savedCategories = localStorage.getItem('jo-electronics-categories');
      const savedSales = localStorage.getItem('jo-electronics-sales');

      console.log('Saved products from localStorage:', savedProducts);
      
      if (savedProducts && savedProducts !== 'undefined') {
        setProducts(JSON.parse(savedProducts));
      } else {
        console.log('Using initial products:', initialProducts);
        setProducts(initialProducts);
      }

      if (savedCategories && savedCategories !== 'undefined') {
        setCategories(JSON.parse(savedCategories));
      } else {
        setCategories(initialCategories);
      }

      if (savedSales && savedSales !== 'undefined') {
        setSalesHistory(JSON.parse(savedSales));
      } else {
        setSalesHistory([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to initial data
      setProducts(initialProducts);
      setCategories(initialCategories);
      setSalesHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('jo-electronics-products', JSON.stringify(products));
    }
    localStorage.setItem('jo-electronics-categories', JSON.stringify(categories));
    localStorage.setItem('jo-electronics-sales', JSON.stringify(salesHistory));
    localStorage.setItem('jo-electronics-theme', theme);
  }, [products, categories, salesHistory, theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to filter products
  const getFilteredProducts = (filters = {}) => {
    console.log('Filtering products:', products.length, 'available');
    
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !filters.category || filters.category === 'all' || 
                             product.category === filters.category;
      
      return matchesSearch && matchesCategory;
    });

    if (filters.lowStock) {
      filtered = filtered.filter(product => product.amount < 5);
    }

    console.log('Filtered products:', filtered.length);
    return filtered;
  };

  // Function to add a new product
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Date.now(),
      price: parseInt(newProduct.price),
      amount: parseInt(newProduct.amount)
    };
    setProducts(prev => [...prev, product]);
  };

  // Function to delete a product
  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  // Function to record a sale
  const recordSale = (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (product && product.amount >= quantity) {
      // Update product quantity
      setProducts(prev => 
        prev.map(p => 
          p.id === productId ? { ...p, amount: p.amount - quantity } : p
        )
      );

      // Add to sales history
      const sale = {
        productId,
        productName: product.name,
        quantity,
        price: product.price,
        timestamp: new Date().toISOString()
      };
      setSalesHistory(prev => [...prev, sale]);
      return true;
    }
    return false;
  };

  // Function to add a category
  const addCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory]);
      return true;
    }
    return false;
  };

  // Function to delete a category
  const deleteCategory = (categoryToDelete) => {
    setCategories(prev => prev.filter(category => category !== categoryToDelete));
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading JO Electronic Shop...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {currentView === 'user' ? (
        <UserApp 
          products={products}
          categories={categories}
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          theme={theme}
          toggleTheme={toggleTheme}
          getFilteredProducts={getFilteredProducts}
        />
      ) : (
        <AdminDashboard 
          products={products}
          setProducts={setProducts}
          categories={categories}
          setCategories={setCategories}
          salesHistory={salesHistory}
          setSalesHistory={setSalesHistory}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onAddProduct={addProduct}
          onDeleteProduct={deleteProduct}
          onRecordSale={recordSale}
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
          getFilteredProducts={getFilteredProducts}
        />
      )}
      
      {/* Quick access buttons */}
      <div className="quick-access-buttons">
        {currentView === 'user' ? (
          <button 
            onClick={() => setCurrentView('admin')}
            className="access-button admin-access"
            title="Admin Access"
          >
            <i className="fas fa-cog"></i>
            Admin
          </button>
        ) : (
          <button 
            onClick={() => setCurrentView('user')}
            className="access-button user-access"
            title="User View"
          >
            <i className="fas fa-store"></i>
            Shop View
          </button>
        )}
        
        <button 
          onClick={toggleTheme}
          className="access-button theme-access"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </div>
  );
}

export default App;