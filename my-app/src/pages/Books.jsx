// import React, { useEffect, useState } from "react";
// import { getAvailableBooks, borrowBook } from "../services/borrowService";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";

// const Books = () => {
//   const [books, setBooks] = useState([]);
//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const data = await getAvailableBooks(token);
//         setBooks(data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };
//     fetchBooks();
//   }, []);

//   const handleBorrow = async (bookId, title) => {
//     const result = await Swal.fire({
//       title: `Borrow "${title}"?`,
//       text: "Are you sure you want to borrow this book?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, borrow it!",
//       cancelButtonText: "No, cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         await borrowBook(token, bookId);
//         Swal.fire("Success!", "Book borrowed successfully!", "success");

//         // Update book list after borrowing
//         setBooks((prevBooks) =>
//           prevBooks.map((book) =>
//             book.id === bookId ? { ...book, available: book.available - 1 } : book
//           )
//         );
//       } catch (error) {
//         Swal.fire("Error", "Failed to borrow book", "error");
//         console.error("Error borrowing book:", error);
//       }
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-10">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Available Books</h1>
//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-green-600 text-white">
//               <th className="p-3 text-left">Title</th>
//               <th className="p-3 text-left">Author</th>
//               <th className="p-3 text-left">Available Copies</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.length > 0 ? (
//               books.map((book, index) => (
//                 <tr
//                   key={book.id}
//                   className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
//                 >
//                   <td className="p-3">{book.title}</td>
//                   <td className="p-3">{book.author}</td>
//                   <td className="p-3">{book.available}</td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleBorrow(book.id, book.title)}
//                       disabled={book.available === 0}
//                       className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
//                         book.available > 0
//                           ? "bg-green-500 hover:bg-green-700 text-white"
//                           : "bg-gray-400 text-gray-700 cursor-not-allowed"
//                       }`}
//                     >
//                       {book.available > 0 ? "Borrow" : "Out of Stock"}
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-5 text-center text-gray-500">
//                   No available books
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Books;

import React, { useEffect, useState } from "react";
import { getAvailableBooks, borrowBook } from "../services/borrowService"; // API calls
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Books = () => {
  const [books, setBooks] = useState([]);
  const token = useSelector((state) => state.auth.token); // Get token from Redux store

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAvailableBooks(token); // Get available books
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [token]);

  // Handle borrowing of a book
  const handleBorrow = async (bookId, title) => {
    const result = await Swal.fire({
      title: `Borrow "${title}"?`,
      text: "Are you sure you want to borrow this book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, borrow it!",
      cancelButtonText: "No, cancel",
    });
  
    if (result.isConfirmed) {
      try {
        await borrowBook(token, bookId); // Attempt to borrow the book
        Swal.fire("Success!", "Book borrowed successfully!", "success");
  
        // Update the book list after borrowing
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId ? { ...book, available: book.available - 1 } : book
          )
        );
      } catch (error) {
        // Display error message from backend
        const errorMsg = error.message || "Something went wrong. Please try again.";
        Swal.fire("Error", errorMsg, "error");
        console.error("Error borrowing book:", error);
      }
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Available Books</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Available Copies</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr
                  key={book.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="p-3">{book.title}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3">{book.available}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleBorrow(book.id, book.title)}
                      disabled={book.available === 0}
                      className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                        book.available > 0
                          ? "bg-green-500 hover:bg-green-700 text-white"
                          : "bg-gray-400 text-gray-700 cursor-not-allowed"
                      }`}
                    >
                      {book.available > 0 ? "Borrow" : "Out of Stock"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-5 text-center text-gray-500">
                  No available books
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;

