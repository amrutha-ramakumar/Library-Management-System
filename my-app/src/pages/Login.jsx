import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role, token } = useSelector((state) => state.auth); // Get role and token from Redux

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Redirect after login based on role
  useEffect(() => {
    if (token) {
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [role, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full p-2 border rounded" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button className="w-full p-2 bg-green-500 text-white rounded" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
