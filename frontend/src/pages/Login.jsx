import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import API from "../services/api";

const Login = ({ modalMode = false, onSuccess }) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || "/shopping-cart";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("userToken", token);

      /* Modal mode */
      if (modalMode) {
        if (onSuccess) onSuccess();
        return;
      }

      /* Normal page mode */
      navigate(redirect);

  } catch (error) {

  console.error("Login failed:", error);
  alert("Invalid email or password");

} finally {
  setLoading(false);
}
  };

  return (
    <div className={modalMode ? "" : "min-h-screen flex items-center justify-center bg-gray-50 px-6"}>

      <div className={modalMode ? "" : "bg-white shadow-lg rounded-2xl p-10 max-w-md w-full"}>

        {!modalMode && (
          <h1 className="text-2xl font-bold mb-6 text-center">
            Login to Your Account
          </h1>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

        <button
  type="submit"
  disabled={loading}
  className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
>
  {loading ? (
    <>
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Signing in...
    </>
  ) : (
    "Login"
  )}
</button>

        </form>

        {!modalMode && (
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-medium underline">
              Create one
            </Link>
          </p>
        )}

      </div>

    </div>
  );
};

export default Login;