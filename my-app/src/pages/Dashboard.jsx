// import React from "react";
// import { useSelector } from "react-redux";

// const Dashboard = () => {
//   const { role, user } = useSelector((state) => state.auth);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
//       <p className="text-lg">Welcome, {user}!</p>

//       {role === "ADMIN" ? (
//         <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//           <h2 className="text-2xl font-semibold">Admin Panel</h2>
//           <p>Manage books, view users, and track transactions.</p>
//         </div>
//       ) : (
//         <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//           <h2 className="text-2xl font-semibold">User Panel</h2>
//           <p>Browse and borrow books. View your borrowed book history.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { role, user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Welcome, {user || "User"}!</p>

      {role === "ADMIN" ? (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
          <p>Manage books, view users, and track transactions.</p>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold">User Panel</h2>
          <p>Browse and borrow books. View your borrowed book history.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
