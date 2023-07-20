import React, { useContext } from 'react';
import planetContext from '../Context/Context';

function Filters() {
  const {
    filters,
    setFilters,
    columns,
    setColumns,
    selectFilter,
    setSelectFilter,
  } = useContext(planetContext);

  const { filterByName: { name }, filterByNumericValues } = filters;
  const { column, comparison, value } = selectFilter;

  const handleChange = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: { name: target.value },
    });
  };

  function handleSelect({ target }) {
    setSelectFilter({
      ...selectFilter,
      [target.name]: target.value,
    });
  }

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          ...selectFilter,
        }],
    });
    setColumns(columns.filter((selectedColumn) => column !== selectedColumn));
  }

  return (
    <section>
      <div className="filterInput">
        <input
          type="text"
          data-testid="name-filter"
          onChange={ handleChange }
          value={ name }
        />
      </div>
      <select
        name="column"
        data-testid="column-filter"
        value={ column }
        onChange={ handleSelect }
      >
        {columns.map((option, index) => (
          <option key={ index }>{option}</option>
        ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ handleSelect }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        data-testid="value-filter"
        value={ value }
        onChange={ handleSelect }
        type="number"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </section>
  );
}

export default Filters;
