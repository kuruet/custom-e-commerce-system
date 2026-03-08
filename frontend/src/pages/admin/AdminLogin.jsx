import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post("/admin/login", {
        email,
        password
      });

      localStorage.setItem("adminToken", response.data.token);

      navigate("/admin");

    } catch (error) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:opacity-90"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}