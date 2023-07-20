const fetchPlanets = async () => {
  const apiURL = 'https://swapi.dev/api/planets';
  const response = await fetch(apiURL);
  const data = await response.json();
  const { results } = data;
  results.filter((planet) => delete planet.residents);
  return results;
};

export default fetchPlanets;
