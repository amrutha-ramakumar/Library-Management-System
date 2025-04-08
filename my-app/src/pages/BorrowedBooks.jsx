import React, { useEffect, useState } from "react";
import { getBorrowedBooks, returnBook } from "../services/borrowService";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const data = await getBorrowedBooks(token);
        setBorrowedBooks(data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (transactionId, title) => {
    const result = await Swal.fire({
      title: `Return "${title}"?`,
      text: "Are you sure you want to return this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, return it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await returnBook(token, transactionId);
        Swal.fire("Success!", "Book returned successfully!", "success");

        // Update book list after returning
        setBorrowedBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== transactionId)
        );
      } catch (error) {
        Swal.fire("Error", "Failed to return book", "error");
        console.error("Error returning book:", error);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Borrowed Books</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Borrowed Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book, index) => (
                <tr
                  key={book.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="p-3">{book.book.title}</td>
                  <td className="p-3">{book.book.author}</td>
                  <td className="p-3">{new Date(book.borrowDate).toLocaleDateString()}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleReturn(book.id, book.title)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg font-medium transition duration-300"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-5 text-center text-gray-500">
                  No borrowed books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowedBooks;
