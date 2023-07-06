import React, { useContext } from 'react';
import planetContext from '../Context/Context';

function Filters() {
  const { setInputFilter } = useContext(planetContext);

  return (
    <label htmlFor="filterInput">
      <input
        type="text"
        id="filterInput"
        data-testid="name-filter"
        onChange={ ({ target }) => setInputFilter(target.value) }
      />
    </label>
  );
}

export default Filters;
