const fetchData = async (api, config) => {
  const url = `https://www.pre-onboarding-selection-task.shop${api}`;

  const res = await fetch(url, config);
  const jsonData = await res.json();

  console.log(jsonData);

  return jsonData;
};

export default fetchData;
