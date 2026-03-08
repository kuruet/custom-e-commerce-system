import { useState } from "react";
import { useNavigate , useSearchParams} from "react-router-dom";
import API from "../services/api";

const Signup = ({ modalMode = false, onSuccess }) => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(false);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/shopping-cart";

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/signup", {
        name,
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

      const message = error.response?.data?.message || "Signup failed";

      console.error("Signup failed:", message);

      if (message === "User already exists") {
        setUserExists(true);
      } else {
        alert(message);
      }
    }
  };

  return (
    <div className={modalMode ? "" : "min-h-screen flex items-center justify-center bg-gray-50 px-6"}>

      <div className={modalMode ? "" : "bg-white shadow-lg rounded-2xl p-10 max-w-md w-full"}>

        {!modalMode && (
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Your Account
          </h1>
        )}

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

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
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Create Account
          </button>

          {userExists && (
            <div className="mt-4 p-4 border border-yellow-300 bg-yellow-50 rounded-lg text-center">
              <p className="text-sm text-gray-700 mb-2">
                This email already has an account.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-black font-semibold underline"
              >
                Login Instead
              </button>
            </div>
          )}

        </form>

      </div>

    </div>
  );
};

export default Signup;