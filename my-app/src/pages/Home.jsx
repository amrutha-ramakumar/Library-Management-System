// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
//           <h1 className="text-3xl font-bold text-green-700">Welcome to the Library Management System</h1>
//           <div className="mt-6">
//             <Link className="px-4 py-2 mx-2 text-white bg-green-500 rounded" to="/login">Login</Link>
//             <Link className="px-4 py-2 mx-2 text-white bg-green-700 rounded" to="/register">Register</Link>
//           </div>
//         </div>
//       );
//     };
// export default Home;
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-800">Library Management System</h1>
      <p className="mt-4 text-green-700">Manage books, track loans, and explore resources.</p>
      
      <div className="mt-6 space-x-4">
        <Link to="/login" className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
          Login
        </Link>
        <Link to="/register" className="px-4 py-2 text-green-700 bg-white border border-green-600 rounded hover:bg-green-50">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
