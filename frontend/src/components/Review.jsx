import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Review() {
  // Access the state passed from the previous page
  const location = useLocation();
  const { predictions, prediction_probs, graph, pie, finaldf, pie2 } = location.state || {};

  const [chartData, setChartData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null); // Track the selected filter

  // Define filter categories and their corresponding values
  const filters = {
    Gender: [0, 1], // 0: Female, 1: Male
    SeniorCitizen: [0, 1], // 0: No, 1: Yes
    Partner: [0, 1], // 0: No, 1: Yes
    Dependents: [0, 1], // 0: No, 1: Yes
    PhoneService: [0, 1], // 0: No, 1: Yes
    MultipleLines: [0, 1, 2], // 0: No, 1: Yes, 2: No Phone
    InternetService: [0, 1, 2], // 0: DSL, 1: Fiber Optics, 2: No
    OnlineSecurity: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    OnlineBackup: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    DeviceProtection: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    TechSupport: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    StreamingTV: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    StreamingMovies: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    Contract: [0, 1, 2], // 0: Month to Month, 1: One Year, 2: Two Year
    PaperlessBilling: [0, 1], // 0: No, 1: Yes
    PaymentMethod: [0, 1, 2, 3] // 0: Bank Transfer, 1: Credit Card, 2: Mailed Check, 3: Electronic Check
  };

  // Handle filter button click
  const handleFilterClick = async (filter) => {
    const value = filters[filter]; // Get the values for the selected filter
    
    setSelectedFilter(filter); // Update selected filter

    try {
      const response = await axios.post('http://127.0.0.1:5000/get-chart', { filter, value, finaldf });
      setChartData(response.data.pie2); // Set the received chart data
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setChartData(null);
    }
  };

  // Reset selected filter and chart data
  const handleReset = () => {
    setSelectedFilter(null);
    setChartData(null);
  };

  return (
    <div className="container">
      <h2>Prediction Results</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customer Index</th>
            <th>Prediction</th>
            <th>Probability</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{prediction === 1 ? 'Churned' : 'Not Churned'}</td>
              <td>{(prediction_probs[index] * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Churn Distribution</h2>
      {pie && (
        <img
          src={`data:image/png;base64,${pie}`}
          alt="Churn Distribution Pie Chart"
          style={{ width: '50%', marginTop: '20px' }}
        />
      )}

      {graph && (
        <div>
          <h2>Additional Analysis</h2>
          <img
            src={`data:image/png;base64,${graph}`}
            alt="Graph Analysis"
            style={{ width: '80%', marginTop: '20px' }}
          />
        </div>
      )}

      <div>
        <h2>Churn Distribution Chart</h2>
        {Object.keys(filters).map((filter) => (
          <button 
            key={filter} 
            onClick={() => handleFilterClick(filter)}
            style={{ margin: '5px' }}>
            {filter}
          </button>
        ))}

        

        {chartData ? (
          <div>
            <h3>Distribution for {selectedFilter}</h3>
            <img src={`data:image/png;base64,${chartData}`} alt={`Churn Distribution for ${selectedFilter}`} />
          </div>
        ) : (
          !selectedFilter && <p>Select a filter to view the chart.</p>
        )}
      </div>
    </div>
  );
}

export default Review;
