import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import planetContext from './Context';
import fetchPlanets from '../Services/Api';

function Provider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [filtersList, setFiltersList] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredNumber, setFilteredNumber] = useState([]);
  const [filters, setFilters] = useState({
    column: 'population',
    comparision: 'maior que',
    value: 0,
    order: { column: 'population', sort: '' },
  });

  useEffect(() => {
    const planetsData = async () => {
      const response = await fetchPlanets();
      console.log(response);
      setApiData(response);
      setFilteredNumber(response);
    };
    planetsData();
  }, []);

  const globalStore = useMemo(() => ({
    apiData,
    setApiData,
    search,
    setSearch,
    filteredNumber,
    setFilteredNumber,
    filtersList,
    setFiltersList,
    filters,
    setFilters,
  }), [apiData, search, filteredNumber, filtersList, filters]);

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
