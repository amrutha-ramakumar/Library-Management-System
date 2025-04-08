// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const API_URL = "http://localhost:8080/api/books";

// const BookManager = () => {
//   const [books, setBooks] = useState([]);
//   const [newBook, setNewBook] = useState({ title: "", author: "" });
//   const [editingBook, setEditingBook] = useState(null);
//   const token = useSelector((state) => state.auth.token);

//   // Fetch books
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/list`);
//       setBooks(response.data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewBook({ ...newBook, [name]: value });
//   };

//   // Add book
//   const addBook = async () => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/add`,
//         newBook,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setBooks([...books, response.data]);
//       setNewBook({ title: "", author: "" }); // Clear form
//     } catch (error) {
//       console.error("Error adding book:", error);
//     }
//   };

//   // Edit book
//   const editBook = async () => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/edit/${editingBook.id}`,
//         editingBook,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setBooks(books.map(book => (book.id === editingBook.id ? response.data : book)));
//       setEditingBook(null);
//     } catch (error) {
//       console.error("Error editing book:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Manage Books</h2>

//       {/* Add Book Form */}
//       <div className="mb-6">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={newBook.title}
//           onChange={handleInputChange}
//           className="p-2 border rounded mr-2"
//         />
//         <input
//           type="text"
//           name="author"
//           placeholder="Author"
//           value={newBook.author}
//           onChange={handleInputChange}
//           className="p-2 border rounded mr-2"
//         />
//         <button onClick={addBook} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Book
//         </button>
//       </div>

//       {/* Book List */}
//       <ul className="bg-white shadow-md rounded p-4">
//         {books.map((book) => (
//           <li key={book.id} className="p-2 border-b flex justify-between items-center">
//             {editingBook && editingBook.id === book.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editingBook.title}
//                   onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
//                   className="p-1 border rounded"
//                 />
//                 <input
//                   type="text"
//                   value={editingBook.author}
//                   onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
//                   className="p-1 border rounded ml-2"
//                 />
//                 <button onClick={editBook} className="bg-green-500 text-white px-3 py-1 rounded ml-2">
//                   Save
//                 </button>
//               </>
//             ) : (
//               <>
//                 <span className="font-medium">{book.title} - {book.author}</span>
//                 <button onClick={() => setEditingBook(book)} className="bg-yellow-500 text-white px-3 py-1 rounded">
//                   Edit
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BookManager;
