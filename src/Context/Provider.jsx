import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetContext from './Context';
import fetchPlanets from '../Services/Api';

function Provider({ children }) {
  const [ApiData, setApiData] = useState([]);
  const [planetList, setPlanetList] = useState([]); // estado para armazenar a lista de planetas
  const [filters, setFilters] = useState({ // estado para armazenar os tipos de filtros
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });
  const [columns, setColumns] = useState([ // estado para armazenar as colunas que serão exibidas no select
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [selectFilter, setSelectFilter] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  useEffect(() => {
    const planetsData = async () => {
      const response = await fetchPlanets();
      console.log(response);
      setApiData(response);
    };
    planetsData();
  }, []);

  useEffect(() => {
    const {
      filterByName: { name },
      filterByNumericValues,
    } = filters;
    filterByNumericValues.forEach((filtros) => {
      const { column, comparison, value } = filtros;
      const filteredPlanetList = ApiData.filter((element) => {
        const planetName = element.name.includes(name);
        if (comparison === 'maior que') {
          return Number(element[column]) > Number(value) && planetName;
        } if (comparison === 'menor que') {
          return Number(element[column]) < Number(value) && planetName;
        } if (comparison === 'igual a') {
          return Number(element[column]) === Number(value) && planetName;
        }
        return planetName;
      });
      setPlanetList(filteredPlanetList);
    });
  }, [ApiData, filters]);

  const globalStore = {
    planetList,
    setPlanetList,
    filters,
    setFilters,
    columns,
    setColumns,
    ApiData,
    selectFilter,
    setSelectFilter,
  };

  return (
    <planetContext.Provider value={ globalStore }>
      { children }
    </planetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
