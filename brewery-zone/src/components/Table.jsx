import React from "react";
import { Link } from 'react-router-dom';

const Table = ({ id, name, phone, postal, url }) => {
  return (
    <tr>
      <td><Link to={`/brewery/${id}`}>{name}</Link></td>
      <td>{phone}</td>
      <td>{postal}</td>
      <td>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ) : (
          'No website'
        )}
      </td>
    </tr>
  );
};

export default Table;