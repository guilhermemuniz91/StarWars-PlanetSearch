import React, { useContext } from 'react';
import planetContext from '../Context/Context';

export default function Table() {
  const { search, filtersList,
    apiData,
    filters,
  } = useContext(planetContext);
  let planetList = apiData;

  const filterByNumericValues = (planetsFilter, filter) => {
    const { column, comparision, value } = filter;
    if (comparision === 'maior que') {
      return planetsFilter.filter((planet) => Number(planet[column]) > Number(value));
    }
    if (comparision === 'menor que') {
      return planetsFilter.filter((planet) => Number(planet[column]) < Number(value));
    }
    return planetsFilter.filter((planet) => Number(planet[column]) === Number(value));
  };

  const magicNumber = -1;
  planetList.sort((a, b) => {
    switch (filters.order.sort) {
    case 'ASC':
      return b[filters.order.column] === 'unknown'
        ? magicNumber
        : Number(a[filters.order.column]) - Number(b[filters.order.column]);
    case 'DESC':
      return b[filters.order.column] === 'unknown'
        ? magicNumber
        : Number(b[filters.order.column]) - Number(a[filters.order.column]);
    default:
      return 0;
    }
  });

  filtersList.forEach((filter) => {
    planetList = filterByNumericValues(planetList, filter);
  });

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetList
            .filter((planetFilter) => planetFilter.name.includes(search.toLowerCase()))
            .map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
