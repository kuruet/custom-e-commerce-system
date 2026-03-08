import { useState } from "react";
import { useNavigate , useSearchParams} from "react-router-dom";

import API from "../services/api";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    navigate(redirect);

  } catch (error) {

    console.error("Signup failed:", error);

    alert("Signup failed. Please try again.");

  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h1>

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

        </form>

      </div>

    </div>
  );
};

export default Signup;