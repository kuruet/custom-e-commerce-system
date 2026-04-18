import { useState, useEffect, useCallback } from "react";
import { fetchRecommendations } from "../services/recommendation.api.js";

export function useRecommendations(cartIds = []) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchRecommendations(cartIds);
      setProducts(res.data || []);
    } catch (_) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [cartIds.join(",")]); // eslint-disable-line

  useEffect(() => { load(); }, [load]);

  return { products, loading };
}
