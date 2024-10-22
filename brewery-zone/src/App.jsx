import { useState, useEffect } from 'react';
import Table from './components/Table';
import Header from './components/Header';
import './App.css'; // For adding styles

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [mostFrequentType, setMostFrequentType] = useState("");
  const [breweryCount, setBreweryCount] = useState(0); // State to hold the count of breweries
  const [searchQuery, setSearchQuery] = useState(''); // State for search query


  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?by_state=florida');
        const data = await response.json();
        setBreweries(data);

        setBreweryCount(data.length);

        // Get unique brewery types
        const uniqueTypes = [...new Set(data.map(brewery => brewery.brewery_type))];

        // Count occurrences for each unique type
        const typeCounts = uniqueTypes.map(type => ({
          type,
          count: data.filter(brewery => brewery.brewery_type === type).length
        }));

        // Determine the most frequent type
        const mostFrequent = typeCounts.reduce((prev, current) => 
          (prev.count > current.count) ? prev : current
        );

        setMostFrequentType(mostFrequent.type);

      } catch (error) {
        console.error('Error fetching the brewery data:', error);
      }
    };

    fetchBreweries();
  }, []);

  const filteredBreweries = breweries.filter((brewery) => {
    const matchesType = filterType ? brewery.brewery_type === filterType : true;
    const matchesSearch = brewery.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="app-container">

      <div className='row'>
        {/* Check if breweries has at least one item before accessing state and country */}
        {breweries.length > 0 && (
          <Header 
            state={breweries[0].state} 
            country={breweries[0].country} 
            count={breweryCount} 
            most_type={mostFrequentType} 
          />
        )}
      </div>

      <div className='row'>
        {/* Search Bar for brewery name */}
        <div className='filter-box'>
          <h4>Search by Brewery Name:</h4>
          <input
            type="text"
            placeholder="Enter brewery name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className='filter-box'>
          <h4>Filter by Beer Type:</h4>
          <select className="filter-dropdown" onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All</option>
            <option value="micro">Micro</option>
            <option value="nano">Nano</option>
            <option value="brewpub">Brewpub</option>
            <option value="regional">Regional</option>
            <option value="large">Large</option>
            <option value="bar">Bar</option>
            <option value="contract">Contract</option>
            <option value="planning">Planning</option>
            <option value="proprietor">Proprietor</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <h1>BREWERY LIST</h1>

      {/* Render Table with breweries */}
      {filteredBreweries.length > 0 ? (
        <table className="brewery-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone #</th>
              <th>Postal Code</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {filteredBreweries.map((brewery) => (
              <Table
                key={brewery.id}
                name={brewery.name}
                phone={brewery.phone}
                postal={brewery.postal_code}
                url={brewery.website_url}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No breweries found</p>
      )}
    </div>
  );
}

export default App;
