import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stations, setStations] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/trains/stations');
      setStations(res.data);
    } catch (err) {
      console.error("Error fetching stations", err);
    }
  };

  const searchTrains = async () => {
    if (source === destination || !source || !destination) {
      alert("Please select valid source and destination.");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/trains/search`, {
        params: { source, destination }
      });
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching trains", err);
    }
  };

  const sortedResults = () => {
    if (sortBy === 'price') {
      return [...results].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'time') {
      return [...results].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }
    return results;
  };

  // Styles
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)', // smooth purple-blue gradient
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '720px',
    borderRadius: '15px',
    padding: '30px 40px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
    color: '#333',
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '40px',
    color: '#4a4a4a',
  };

  const searchContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  };

  const selectStyle = {
    width: '180px',
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1.8px solid #667eea',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
  };

  const buttonStyle = {
    padding: '12px 35px',
    fontSize: '16px',
    borderRadius: '10px',
    border: 'none',
    background: '#764ba2',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(118, 75, 162, 0.4)',
    transition: 'background 0.3s ease',
  };

  const buttonHoverStyle = {
    background: '#5e3b8c',
  };

  const sortContainerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const trainCardStyle = {
    backgroundColor: '#f9f9ff',
    borderRadius: '12px',
    padding: '20px 25px',
    marginBottom: '15px',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.1)',
    borderLeft: '6px solid #764ba2',
  };

  const trainTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#44356e',
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={headerStyle}>Train Search Application</h1>

        <div style={searchContainer}>
          <select
            style={selectStyle}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="">-- Select Source --</option>
            {stations.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>

          <select
            style={selectStyle}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">-- Select Destination --</option>
            {stations.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>

          <button
            style={{ ...buttonStyle, ...(btnHover ? buttonHoverStyle : {}) }}
            onClick={searchTrains}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            Search
          </button>
        </div>

        {results.length > 0 && (
          <div style={sortContainerStyle}>
            <label style={{ marginRight: '10px', fontWeight: '600', color: '#4a4a4a' }}>Sort by:</label>
            <select
              style={{ ...selectStyle, width: '150px', display: 'inline-block' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">None</option>
              <option value="price">Price</option>
              <option value="time">Departure Time</option>
            </select>
          </div>
        )}

        <div>
          {sortedResults().length > 0 ? (
            sortedResults().map((train, idx) => (
              <div key={idx} style={trainCardStyle}>
                <div style={trainTitleStyle}>{train.trainName}</div>
                <p><strong>Departure:</strong> {train.departureTime}</p>
                <p><strong>Arrival:</strong> {train.arrivalTime}</p>
                <p><strong>Distance:</strong> {train.distance} km</p>
                <p><strong>Price:</strong> ₹{train.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '30px' }}>
              No trains found. Please try a different route.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
