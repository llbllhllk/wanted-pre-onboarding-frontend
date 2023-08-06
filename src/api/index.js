const fetchData = async (api, config) => {
  const url = `https://www.pre-onboarding-selection-task.shop${api}`;

  try {
    const res = await fetch(url, config);
    return res;
  } catch (err) {
    console.error(err);
  }
}

export default fetchData;
