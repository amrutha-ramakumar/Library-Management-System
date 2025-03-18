import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", role: "USER" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-700">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded" type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="w-full p-2 border rounded" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full p-2 border rounded" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input className="w-full p-2 border rounded" type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
          <select className="w-full p-2 border rounded" name="role" onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="w-full p-2 bg-green-500 text-white rounded" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};
export default Register;