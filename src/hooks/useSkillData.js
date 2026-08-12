import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL;

// Simple in-memory cache so multiple components requesting the same
// endpoint in one session don't all trigger separate network requests.
const cache = {};

/**
 * Fetches skill data from the backend instead of a local JSON import,
 * so the frontend always reflects whatever data the backend actually has
 * (single source of truth — no more editing two copies of the same file).
 *
 * @param {"artisan" | "gathering" | "monsters" | "exp"} endpoint
 * @returns {{ data: object | null, isLoading: boolean, error: string | null }}
 */
const useSkillData = (endpoint) => {
  const [data, setData] = useState(cache[endpoint] || null);
  const [isLoading, setIsLoading] = useState(!cache[endpoint]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache[endpoint]) {
      setData(cache[endpoint]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    fetch(`${API_URL}/${endpoint}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => {
        cache[endpoint] = json;
        setData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Failed to load data");
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useSkillData;
