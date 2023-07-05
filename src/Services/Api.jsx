const fetchPlanets = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  const { results } = data; // results é um array de objetos com as infos dos planetas
  return results;
};

export default fetchPlanets;
