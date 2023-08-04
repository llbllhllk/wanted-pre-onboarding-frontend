const fetchData = async (api, config) => {
  const url = `https://pre-onboarding-selection-task.shop${api}`;

  const res = await fetch(url, config);
  const jsonData = await res.json();

  return jsonData;
};

export default fetchData;
