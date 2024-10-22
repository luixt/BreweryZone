import React from "react";

const Table = ({ name, phone, postal, url }) => {


  return (
    <tr>
      <td>{name}</td>
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
