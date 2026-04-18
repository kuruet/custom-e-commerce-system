import { useState, useCallback } from "react";
import { subscribeEmail } from "../services/email.api.js";

export function useEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const subscribe = useCallback(async (email) => {
    try {
      console.log("SUBMIT EMAIL:", email);
      setLoading(true);
      setError(null);
      await subscribeEmail(email);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to subscribe");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { subscribe, loading, error, success };
}
