import React from 'react';

export default ({ data }) => {
  return data ? (
    <div>
      <h2>{data.country}</h2>
      <h3>{data.name}</h3>
    </div>
  ) : (
    <h2>No Results</h2>
  );
};
