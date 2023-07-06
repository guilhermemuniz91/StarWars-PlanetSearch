import React from 'react';
import './App.css';
import Table from './Components/Table';
import Provider from './Context/Provider';
import Filters from './Components/Filters';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
