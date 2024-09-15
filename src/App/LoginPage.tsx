import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Bg from "../assets/Login/bg.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // Simulating authentication
    login(username); // Pass the username to the login function
    navigate("/"); // Navigate to home page after login
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className="max-w-md w-full bg-sky-200 shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-500 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
