import React from 'react';
import './App.css';
import Table from './Components/Table';
import Provider from './Context/Provider';
import NumericFilters from './Components/NumericFilters';
// import NameFilter from './Components/NameFilter';
import SelectedFilters from './Components/SelectedFilters';

function App() {
  return (
    <Provider>
      {/* <NameFilter /> */}
      <NumericFilters />
      <SelectedFilters />
      <Table />
    </Provider>
  );
}

export default App;
