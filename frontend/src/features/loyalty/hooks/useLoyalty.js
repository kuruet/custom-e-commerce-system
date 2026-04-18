import { useState, useEffect, useCallback } from "react";
import { fetchLoyalty, redeemPoints as apiRedeem } from "../services/loyalty.api.js";

const isLoggedIn = () => !!localStorage.getItem("userToken");

export function useLoyalty() {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!isLoggedIn()) return;
    try {
      setLoading(true);
      const res = await fetchLoyalty();
      setPoints(res.data?.points || 0);
      setHistory(res.data?.history || []);
    } catch (_) {
      // non-critical
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const redeem = useCallback(async (amount) => {
    setError(null);
    try {
      const res = await apiRedeem(amount);
      setPoints(res.data?.pointsRemaining ?? 0);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Redemption failed";
      setError(msg);
      throw new Error(msg);
    }
  }, []);

  return { points, history, loading, error, redeem, reload: load };
}
