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
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="w-full max-w-4xl p-8 mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-green-800 sm:text-5xl">Library Management System</h1>
        </div>

        <p className="max-w-2xl mx-auto mt-4 text-lg text-green-700">
          Your digital gateway to knowledge and resources. Manage books, track loans, and discover new reads.
        </p>

        <div className="relative mt-10 overflow-hidden rounded-lg bg-white/30 p-8 shadow-xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-green-100/40 backdrop-blur-sm -z-10"></div>
          <h2 className="mb-6 text-2xl font-semibold text-green-800">Get Started</h2>
          <p className="mb-8 text-green-700">
            Access your account to browse our collection, reserve books, or manage your loans.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Login to Account
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-green-700 transition-all bg-white border border-green-600 rounded-md shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create New Account
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-3">
          <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="mb-2 text-lg font-medium text-green-800">Browse Collection</h3>
            <p className="text-green-600">Explore thousands of books across various genres and topics.</p>
          </div>
          <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="mb-2 text-lg font-medium text-green-800">Easy Reservations</h3>
            <p className="text-green-600">Reserve books online and pick them up at your convenience.</p>
          </div>
          <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="mb-2 text-lg font-medium text-green-800">Digital Resources</h3>
            <p className="text-green-600">Access e-books, journals, and research materials from anywhere.</p>
          </div>
        </div>

        <footer className="mt-16 text-sm text-green-600">
          © {new Date().getFullYear()} Library Management System. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Home

