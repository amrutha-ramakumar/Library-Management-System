
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [page, setPage] = useState(0);
//   const [search, setSearch] = useState("");
//   const [totalPages, setTotalPages] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchTransactions();
//   }, [page, search]);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     setError(""); // Reset error before fetching

//     try {
//       const url = search
//         ? `/api/transactions/search?bookTitle=${search}&page=${page}&size=${10}`
//         : `/api/transactions?page=${page}&size=${10}`;
      
//       const response = await axios.get(url);

//       // Ensure `content` is an array, fallback to an empty array if undefined
//       setTransactions(response.data?.content || []);
//       setTotalPages(response.data?.totalPages || 0);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setError("Failed to load transactions. Please try again.");
//       setTransactions([]); // Prevent undefined transactions state
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Transactions</h2>
      
//       <input
//         type="text"
//         placeholder="Search by book title..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="mb-4 border p-2 w-full"
//       />

//       {loading && <p>Loading transactions...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && transactions.length === 0 && (
//         <p className="text-gray-500">No transactions found.</p>
//       )}

//       {!loading && !error && transactions.length > 0 && (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">ID</th>
//               <th className="border border-gray-300 p-2">User</th>
//               <th className="border border-gray-300 p-2">Book</th>
//               <th className="border border-gray-300 p-2">Borrow Date</th>
//               <th className="border border-gray-300 p-2">Return Date</th>
//               <th className="border border-gray-300 p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction) => (
//               <tr key={transaction?.id}>
//                 <td className="border border-gray-300 p-2">{transaction?.id}</td>
//                 <td className="border border-gray-300 p-2">{transaction?.user?.name || "N/A"}</td>
//                 <td className="border border-gray-300 p-2">{transaction?.book?.title || "N/A"}</td>
//                 <td className="border border-gray-300 p-2">{transaction?.borrowDate || "N/A"}</td>
//                 <td className="border border-gray-300 p-2">{transaction?.returnDate || "N/A"}</td>
//                 <td className="border border-gray-300 p-2">{transaction?.status || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="flex justify-between mt-4">
//         <button
//           disabled={page === 0}
//           onClick={() => setPage(page - 1)}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {page + 1} of {totalPages}
//         </span>
//         <button
//           disabled={page + 1 === totalPages}
//           onClick={() => setPage(page + 1)}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Transactions;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getAllBorrowedBooks } from "../services/borrowService";

export default function BorrowedBooks() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchBorrowedBooks(page);
  }, [page]);

  const fetchBorrowedBooks = async (page) => {
    try {
      const data = await getAllBorrowedBooks(token, page, 10);
      setBooks(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Borrowed Books</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Borrow Date</th>
            <th className="border p-2">Return Date</th>
            <th className="border p-2">User Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((transaction) => (
              <tr key={transaction.id} className="text-center">
                <td className="border p-2">{transaction.book.title}</td>
                <td className="border p-2">{transaction.book.author}</td>
                <td className="border p-2">{new Date(transaction.borrowDate).toLocaleString()}</td>
                <td className="border p-2">{transaction.returnDate ? new Date(transaction.returnDate).toLocaleString() : "Not returned"}</td>
                <td className="border p-2">{transaction.user.name}</td>
                <td className="border p-2">{transaction.user.phone}</td>
                <td className="border p-2">{transaction.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center">No borrowed books found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center gap-2">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page + 1} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}