import React, { useEffect, useState } from "react";
import { fetchUsersByRole } from "../services/profileService";
import { useSelector } from "react-redux";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      loadUsers(page, token);
    }
  }, [page, token]);

  const loadUsers = async (page, token) => {
    try {
      const data = await fetchUsersByRole(page, 5, token);
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2 ">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white mx-2 disabled:opacity-50"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page + 1} of {totalPages}</span>
        <button 
          className="px-4 py-2 bg-blue-500 text-white mx-2 disabled:opacity-50"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
