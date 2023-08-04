import { useState, useEffect } from "react";

function useAsync(asyncFunction) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  s;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await asyncFunction();
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [asyncFunction]);

  return { data, error, loading };
}

export default useAsync;
