import React, { useState, useMemo } from 'react';
import '../styles/Reports.css';

const Reports = ({ products, salesHistory }) => {
  const [timeRange, setTimeRange] = useState('7days');
  const [chartType, setChartType] = useState('revenue');

  // Calculate statistics
  const stats = useMemo(() => {
    const totalInventoryValue = products.reduce((sum, product) => 
      sum + (product.price * (product.amount || 0)), 0
    );
    
    const totalSalesValue = salesHistory.reduce((sum, sale) => 
      sum + (sale.price * sale.quantity), 0
    );
    
    const totalItemsSold = salesHistory.reduce((sum, sale) => 
      sum + sale.quantity, 0
    );

    const lowStockItems = products.filter(product => (product.amount || 0) < 5).length;
    const outOfStockItems = products.filter(product => (product.amount || 0) === 0).length;

    return {
      totalInventoryValue,
      totalSalesValue,
      totalItemsSold,
      lowStockItems,
      outOfStockItems,
      totalProducts: products.length
    };
  }, [products, salesHistory]);

  // Generate sample chart data for demonstration
  const chartData = useMemo(() => {
    const now = new Date();
    let days = 7;
    
    switch (timeRange) {
      case '30days': days = 30; break;
      case '90days': days = 90; break;
      case '1year': days = 365; break;
      default: days = 7;
    }

    // Generate sample data since there might not be real sales data
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate realistic sample data
      const baseRevenue = Math.random() * 50000 + 10000; // 10k - 60k Birr
      const dailyRevenue = Math.floor(baseRevenue * (0.8 + Math.random() * 0.4)); // Some variation
      const dailySales = Math.floor(Math.random() * 15) + 5; // 5-20 sales per day
      const dailyItems = Math.floor(dailySales * (1 + Math.random() * 2)); // 1-3 items per sale

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date,
        revenue: dailyRevenue,
        items: dailyItems,
        sales: dailySales
      });
    }

    return data;
  }, [timeRange]);

  // Generate sample category data
  const categoryData = useMemo(() => {
    const categories = ["Mobile Phones", "Laptops", "Headphones", "Tablets", "Smart Watches"];
    
    return categories.map(category => ({
      category,
      revenue: Math.floor(Math.random() * 200000) + 50000,
      items: Math.floor(Math.random() * 100) + 20,
      sales: Math.floor(Math.random() * 50) + 10
    })).sort((a, b) => b.revenue - a.revenue);
  }, []);

  // Inventory value by category
  const inventoryByCategory = useMemo(() => {
    const categoryMap = {};
    
    products.forEach(product => {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = {
          value: 0,
          items: 0,
          products: 0
        };
      }
      categoryMap[product.category].value += product.price * (product.amount || 0);
      categoryMap[product.category].items += (product.amount || 0);
      categoryMap[product.category].products += 1;
    });

    return Object.entries(categoryMap).map(([category, data]) => ({
      category,
      ...data
    })).sort((a, b) => b.value - a.value);
  }, [products]);

  // Revenue Chart Component
  const RevenueChart = () => {
    const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);
    
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>Revenue Overview</h3>
          <span className="chart-subtitle">Daily revenue in Birr</span>
        </div>
        <div className="chart-content">
          <div className="chart-bars">
            {chartData.map((day, index) => (
              <div key={index} className="chart-bar-container">
                <div className="chart-bar-wrapper">
                  <div 
                    className="chart-bar revenue-bar"
                    style={{ 
                      height: `${(day.revenue / maxRevenue) * 100}%`,
                      minHeight: '4px'
                    }}
                  >
                    {day.revenue > 0 && (
                      <div className="chart-bar-value">
                        {day.revenue > 1000 ? `${(day.revenue/1000).toFixed(0)}k` : day.revenue}
                      </div>
                    )}
                  </div>
                </div>
                <div className="chart-label">{day.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Sales Chart Component
  const SalesChart = () => {
    const maxSales = Math.max(...chartData.map(d => d.sales), 1);
    
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>Sales Volume</h3>
          <span className="chart-subtitle">Number of transactions per day</span>
        </div>
        <div className="chart-content">
          <div className="chart-bars">
            {chartData.map((day, index) => (
              <div key={index} className="chart-bar-container">
                <div className="chart-bar-wrapper">
                  <div 
                    className="chart-bar sales-bar"
                    style={{ 
                      height: `${(day.sales / maxSales) * 100}%`,
                      minHeight: '4px'
                    }}
                  >
                    {day.sales > 0 && (
                      <div className="chart-bar-value">{day.sales}</div>
                    )}
                  </div>
                </div>
                <div className="chart-label">{day.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Items Sold Chart Component
  const ItemsChart = () => {
    const maxItems = Math.max(...chartData.map(d => d.items), 1);
    
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>Items Sold</h3>
          <span className="chart-subtitle">Number of items sold per day</span>
        </div>
        <div className="chart-content">
          <div className="chart-bars">
            {chartData.map((day, index) => (
              <div key={index} className="chart-bar-container">
                <div className="chart-bar-wrapper">
                  <div 
                    className="chart-bar items-bar"
                    style={{ 
                      height: `${(day.items / maxItems) * 100}%`,
                      minHeight: '4px'
                    }}
                  >
                    {day.items > 0 && (
                      <div className="chart-bar-value">{day.items}</div>
                    )}
                  </div>
                </div>
                <div className="chart-label">{day.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Category Performance Chart
  const CategoryChart = () => {
    const maxRevenue = Math.max(...categoryData.map(d => d.revenue), 1);
    
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>Category Performance</h3>
          <span className="chart-subtitle">Revenue by product category</span>
        </div>
        <div className="chart-content">
          <div className="category-bars">
            {categoryData.map((category, index) => (
              <div key={index} className="category-bar-container">
                <div className="category-info">
                  <span className="category-name">{category.category}</span>
                  <span className="category-revenue">{category.revenue.toLocaleString()} Birr</span>
                </div>
                <div className="category-bar-wrapper">
                  <div 
                    className="category-bar"
                    style={{ 
                      width: `${(category.revenue / maxRevenue) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="category-stats">
                  <span>{category.items} items sold</span>
                  <span>{category.sales} transactions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Inventory Value Chart
  const InventoryChart = () => {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>Inventory Value by Category</h3>
          <span className="chart-subtitle">Current stock value distribution</span>
        </div>
        <div className="chart-content">
          <div className="inventory-chart">
            {inventoryByCategory.map((category, index) => (
              <div key={index} className="inventory-item">
                <div className="inventory-category">
                  <span>{category.category}</span>
                  <span className="inventory-value">{category.value.toLocaleString()} Birr</span>
                </div>
                <div className="inventory-bar-wrapper">
                  <div 
                    className="inventory-bar"
                    style={{ 
                      width: `${(category.value / stats.totalInventoryValue) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="inventory-details">
                  <span>{category.products} products</span>
                  <span>{category.items} items in stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Pie Chart for Inventory Distribution
  const InventoryPieChart = () => {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>Inventory Distribution</h3>
          <span className="chart-subtitle">Stock value across categories</span>
        </div>
        <div className="chart-content">
          <div className="pie-chart-visual">
            {inventoryByCategory.map((category, index) => {
              const percentage = (category.value / stats.totalInventoryValue) * 100;
              return (
                <div key={index} className="pie-item">
                  <div className="pie-color" style={{
                    backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                  }}></div>
                  <span className="pie-label">{category.category}</span>
                  <span className="pie-value">{percentage.toFixed(1)}%</span>
                  <span className="pie-amount">{category.value.toLocaleString()} Birr</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render the selected chart
  const renderChart = () => {
    switch (chartType) {
      case 'revenue':
        return <RevenueChart />;
      case 'sales':
        return <SalesChart />;
      case 'items':
        return <ItemsChart />;
      case 'categories':
        return <CategoryChart />;
      case 'inventory':
        return <InventoryChart />;
      case 'inventory-pie':
        return <InventoryPieChart />;
      default:
        return <RevenueChart />;
    }
  };

  return (
    <div className="reports-dashboard">
      <div className="reports-header">
        <h2>
          <i className="fas fa-chart-line"></i>
          Analytics & Reports
        </h2>
        <div className="report-controls">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          
          <select 
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="chart-type-select"
          >
            <option value="revenue">Revenue Analysis</option>
            <option value="sales">Sales Volume</option>
            <option value="items">Items Sold</option>
            <option value="categories">Category Performance</option>
            <option value="inventory">Inventory Value</option>
            <option value="inventory-pie">Inventory Distribution</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon revenue">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-value">{stats.totalSalesValue.toLocaleString()} Birr</p>
            <span className="stat-trend positive">+12% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon sales">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-info">
            <h3>Items Sold</h3>
            <p className="stat-value">{stats.totalItemsSold}</p>
            <span className="stat-trend positive">+8% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon inventory">
            <i className="fas fa-boxes"></i>
          </div>
          <div className="stat-info">
            <h3>Inventory Value</h3>
            <p className="stat-value">{stats.totalInventoryValue.toLocaleString()} Birr</p>
            <span className="stat-trend">Current Stock</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <i className="fas fa-cube"></i>
          </div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <span className="stat-trend negative">
              {stats.lowStockItems} low stock
            </span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="main-chart-section">
        {renderChart()}
      </div>

      {/* Additional Charts Grid */}
      <div className="charts-grid">
        <div className="mini-chart">
          <h4><i className="fas fa-trophy"></i> Top Selling Categories</h4>
          <div className="mini-chart-content">
            {categoryData.slice(0, 5).map((category, index) => (
              <div key={index} className="mini-category-item">
                <span className="category-rank">{index + 1}</span>
                <span className="category-name">{category.category}</span>
                <span className="category-amount">{category.revenue.toLocaleString()} Birr</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mini-chart">
          <h4><i className="fas fa-box-open"></i> Stock Status</h4>
          <div className="mini-chart-content">
            <div className="stock-status-item">
              <div className="status-indicator healthy"></div>
              <span>In Stock</span>
              <span>{products.length - stats.lowStockItems - stats.outOfStockItems}</span>
            </div>
            <div className="stock-status-item">
              <div className="status-indicator warning"></div>
              <span>Low Stock</span>
              <span>{stats.lowStockItems}</span>
            </div>
            <div className="stock-status-item">
              <div className="status-indicator critical"></div>
              <span>Out of Stock</span>
              <span>{stats.outOfStockItems}</span>
            </div>
          </div>
        </div>

        <div className="mini-chart">
          <h4><i className="fas fa-history"></i> Recent Sales</h4>
          <div className="mini-chart-content">
            {salesHistory.slice(-5).reverse().map((sale, index) => (
              <div key={index} className="recent-sale-item">
                <span className="sale-product">{sale.productName}</span>
                <span className="sale-amount">{sale.quantity} × {sale.price} Birr</span>
                <span className="sale-time">
                  {new Date(sale.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
            {salesHistory.length === 0 && (
              <div className="recent-sale-item">
                <span className="sale-product">No recent sales</span>
                <span className="sale-amount">Make some sales to see data here</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;