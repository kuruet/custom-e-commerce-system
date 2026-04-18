import { useState, useEffect, useCallback } from "react";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "../services/wishlist.api.js";

const isLoggedIn = () => !!localStorage.getItem("userToken");

export function useWishlist() {
  const [items, setItems] = useState([]);  // array of product objects
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!isLoggedIn()) return;
    try {
      setLoading(true);
      const res = await fetchWishlist();
      setItems(res.data?.products || []);
    } catch (_) {
      // silent fail — wishlist is non-critical
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = useCallback(async (productId) => {
    if (!isLoggedIn()) return;
    const already = items.some(p => (p._id || p) === productId);
    try {
      if (already) {
        await removeFromWishlist(productId);
        setItems(prev => prev.filter(p => (p._id || p) !== productId));
      } else {
        const res = await addToWishlist(productId);
        setItems(res.data?.products || []);
      }
    } catch (_) {
      // silent fail
    }
  }, [items]);

  const isWishlisted = useCallback(
    (productId) => items.some(p => (p._id || p) === productId),
    [items]
  );

  return { items, loading, toggle, isWishlisted, reload: load };
}
