import React, { useState, useMemo, useRef } from 'react';
import '../styles/Reports.css';

const Reports = ({ products, salesHistory }) => {
  const [timeRange, setTimeRange] = useState('7days');
  const [tooltip, setTooltip] = useState({
    visible: false,
    category: '',
    percentage: '',
    value: '',
    description: '',
    color: '',
    x: 0,
    y: 0
  });

  const chartRef = useRef(null);

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

  // Generate comprehensive business data for the big pie chart
  const businessData = useMemo(() => {
    const data = [
      {
        category: "Mobile Phones",
        value: Math.floor(Math.random() * 200000) + 80000,
        color: "#3498db",
        description: "Smartphones & mobile devices",
        icon: "fas fa-mobile-alt"
      },
      {
        category: "Laptops & Computers",
        value: Math.floor(Math.random() * 180000) + 70000,
        color: "#9b59b6",
        description: "Laptops, desktops & accessories",
        icon: "fas fa-laptop"
      },
      {
        category: "Audio Devices",
        value: Math.floor(Math.random() * 120000) + 40000,
        color: "#e74c3c",
        description: "Headphones, speakers & audio gear",
        icon: "fas fa-headphones"
      },
      {
        category: "Smart Watches",
        value: Math.floor(Math.random() * 80000) + 30000,
        color: "#f39c12",
        description: "Wearable technology & smart watches",
        icon: "fas fa-clock"
      },
      {
        category: "Tablets",
        value: Math.floor(Math.random() * 100000) + 35000,
        color: "#2ecc71",
        description: "Tablets & e-readers",
        icon: "fas fa-tablet-alt"
      },
      {
        category: "Accessories",
        value: Math.floor(Math.random() * 60000) + 20000,
        color: "#1abc9c",
        description: "Cases, chargers & accessories",
        icon: "fas fa-plug"
      },
      {
        category: "Gaming",
        value: Math.floor(Math.random() * 90000) + 25000,
        color: "#e67e22",
        description: "Gaming consoles & accessories",
        icon: "fas fa-gamepad"
      },
      {
        category: "Cameras",
        value: Math.floor(Math.random() * 70000) + 20000,
        color: "#34495e",
        description: "Cameras & photography equipment",
        icon: "fas fa-camera"
      }
    ].sort((a, b) => b.value - a.value);

    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    
    // Calculate percentages and cumulative percentages for SVG
    let cumulativePercent = 0;
    return data.map(item => {
      const percentage = (item.value / totalValue) * 100;
      const startPercent = cumulativePercent;
      cumulativePercent += percentage;
      
      return {
        ...item,
        percentage: percentage.toFixed(1),
        startPercent,
        endPercent: cumulativePercent,
        formattedValue: item.value.toLocaleString() + " Birr"
      };
    });
  }, []);

  // Handle mouse move over pie segments
  const handleSegmentMouseMove = (event, item) => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      setTooltip({
        visible: true,
        category: item.category,
        percentage: item.percentage,
        value: item.formattedValue,
        description: item.description,
        color: item.color,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };

  const handleSegmentMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // Big Pie Chart Component
  const BigPieChart = () => {
    const size = 320;
    const radius = 120;
    const strokeWidth = 40;
    const center = size / 2;
    const totalValue = businessData.reduce((sum, item) => sum + item.value, 0);

    // Calculate SVG path for each segment
    const getPathData = (startPercent, endPercent) => {
      const startAngle = (startPercent / 100) * 360;
      const endAngle = (endPercent / 100) * 360;
      
      const start = polarToCartesian(center, center, radius, startAngle);
      const end = polarToCartesian(center, center, radius, endAngle);
      
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
      ].join(" ");
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    return (
      <div className="chart-container">
        <div className="chart-header">
          <h3>Business Revenue Distribution</h3>
          <span className="chart-subtitle">Total revenue breakdown by product categories</span>
        </div>
        <div className="chart-content">
          <div className="big-pie-chart-container">
            <div className="pie-chart-visualization" ref={chartRef}>
              <svg width={size} height={size} className="big-pie-chart">
                {businessData.map((item, index) => (
                  <path
                    key={index}
                    d={getPathData(item.startPercent, item.endPercent)}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="pie-segment"
                    onMouseMove={(e) => handleSegmentMouseMove(e, item)}
                    onMouseLeave={handleSegmentMouseLeave}
                  />
                ))}
                <circle
                  cx={center}
                  cy={center}
                  r={radius - strokeWidth / 2}
                  fill="var(--card-bg)"
                />
                <text
                  x={center}
                  y={center - 15}
                  textAnchor="middle"
                  className="pie-center-value"
                >
                  {`${(totalValue / 1000).toFixed(0)}K`}
                </text>
                <text
                  x={center}
                  y={center + 10}
                  textAnchor="middle"
                  className="pie-center-label"
                >
                  Total Revenue
                </text>
                <text
                  x={center}
                  y={center + 30}
                  textAnchor="middle"
                  className="pie-center-subtitle"
                >
                  in Birr
                </text>
              </svg>

              {/* Tooltip */}
              {tooltip.visible && (
                <div 
                  className={`pie-tooltip ${tooltip.visible ? 'visible' : ''}`}
                  style={{
                    left: tooltip.x + 20,
                    top: tooltip.y - 80
                  }}
                >
                  <div className="tooltip-header">
                    <div 
                      className="tooltip-color" 
                      style={{ backgroundColor: tooltip.color }}
                    ></div>
                    <span className="tooltip-category">{tooltip.category}</span>
                    <span className="tooltip-percentage">{tooltip.percentage}%</span>
                  </div>
                  <div className="tooltip-details">
                    <div className="tooltip-description">{tooltip.description}</div>
                    <div className="tooltip-value">{tooltip.value}</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pie-chart-legend">
              <h4>Category Legend</h4>
              <div className="legend-items">
                {businessData.map((item, index) => (
                  <div key={index} className="legend-item" data-category={item.category}>
                    <div className="legend-color-container">
                      <div 
                        className="legend-color" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <i className={item.icon}></i>
                    </div>
                    <div className="legend-content">
                      <div className="legend-main">
                        <span className="legend-category">{item.category}</span>
                        <span className="legend-percentage">{item.percentage}%</span>
                      </div>
                      <div className="legend-details">
                        <span className="legend-description">{item.description}</span>
                        <span className="legend-value">{item.formattedValue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="chart-summary">
                <div className="summary-item">
                  <span>Total Categories</span>
                  <span className="summary-value">{businessData.length}</span>
                </div>
                <div className="summary-item">
                  <span>Highest Revenue</span>
                  <span className="summary-value">{businessData[0]?.category}</span>
                </div>
                <div className="summary-item">
                  <span>Total Value</span>
                  <span className="summary-value">{totalValue.toLocaleString()} Birr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="reports-dashboard">
      <div className="reports-header">
        <h2>
          <i className="fas fa-chart-pie"></i>
          Business Overview Dashboard
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

      {/* Big Pie Chart */}
      <div className="main-chart-section">
        <BigPieChart />
      </div>

      {/* Additional Information Grid */}
      <div className="charts-grid">
        <div className="mini-chart">
          <h4><i className="fas fa-trophy"></i> Top Performing Categories</h4>
          <div className="mini-chart-content">
            {businessData.slice(0, 5).map((category, index) => (
              <div key={index} className="mini-category-item">
                <span className="category-rank">{index + 1}</span>
                <div className="category-info">
                  <span className="category-name">{category.category}</span>
                  <span className="category-percentage">{category.percentage}%</span>
                </div>
                <span className="category-amount">{category.formattedValue}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mini-chart">
          <h4><i className="fas fa-info-circle"></i> Color Guide</h4>
          <div className="mini-chart-content">
            <div className="color-guide-item">
              <div className="color-swatch" style={{backgroundColor: "#3498db"}}></div>
              <span>Mobile Phones - Primary revenue source</span>
            </div>
            <div className="color-guide-item">
              <div className="color-swatch" style={{backgroundColor: "#9b59b6"}}></div>
              <span>Laptops & Computers - High-value items</span>
            </div>
            <div className="color-guide-item">
              <div className="color-swatch" style={{backgroundColor: "#e74c3c"}}></div>
              <span>Audio Devices - Popular accessories</span>
            </div>
            <div className="color-guide-item">
              <div className="color-swatch" style={{backgroundColor: "#f39c12"}}></div>
              <span>Smart Watches - Growing segment</span>
            </div>
            <div className="color-guide-item">
              <div className="color-swatch" style={{backgroundColor: "#2ecc71"}}></div>
              <span>Tablets - Steady performance</span>
            </div>
          </div>
        </div>

        <div className="mini-chart">
          <h4><i className="fas fa-chart-line"></i> Performance Insights</h4>
          <div className="mini-chart-content">
            <div className="insight-item positive">
              <i className="fas fa-arrow-up"></i>
              <span>Mobile category leads with {businessData[0]?.percentage}% revenue share</span>
            </div>
            <div className="insight-item positive">
              <i className="fas fa-arrow-up"></i>
              <span>Electronics show consistent growth across all segments</span>
            </div>
            <div className="insight-item neutral">
              <i className="fas fa-minus"></i>
              <span>Accessories maintain stable market position</span>
            </div>
            <div className="insight-item positive">
              <i className="fas fa-arrow-up"></i>
              <span>Smart devices showing increasing demand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;