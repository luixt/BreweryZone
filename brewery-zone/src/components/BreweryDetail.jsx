// BreweryDetail.jsx
import { useParams } from 'react-router-dom';

function BreweryDetail({ breweries }) {
  const { id } = useParams();
  const brewery = breweries.find(brewery => brewery.id === id);

  if (!brewery) return <p>Brewery not found</p>;

  return (
    <div>
      <h2>{brewery.name}</h2>
      <p>Type: {brewery.brewery_type}</p>
      <p>Address: {brewery.address_1}, {brewery.city}, {brewery.state}</p>
      <p>Phone: {brewery.phone}</p>
      <p>
        {brewery.website_url ? (
            <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          ) : (
            'No Website'
          )}
      </p>
    </div>
  );
}

export default BreweryDetail;