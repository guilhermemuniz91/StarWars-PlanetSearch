import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetContext from './Context';
import fetchPlanets from '../Services/Api';

function Provider({ children }) {
  // estado para armazenar a lista de planetas
  const [planetList, setPlanetList] = useState([]);

  // estado para armazenar o filtro de texto
  const [inputFilter, setInputFilter] = useState('');

  const excludeResidents = (results) => {
    const newResults = [];
    results.forEach((result) => {
      const newResult = { ...result };
      delete newResult.residents;
      newResults.push(newResult);
    });
    return newResults;
  };

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/')
      .then((data) => {
        const results = data;
        setPlanetList(excludeResidents(results));
      });
  }, []);

  const globalStore = {
    planetList,
    inputFilter,
    setInputFilter,
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
