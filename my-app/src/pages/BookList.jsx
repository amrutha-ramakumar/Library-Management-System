
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBooks, addBook, editBook, getBookById } from "../services/bookService";

const BookList = () => {
  const token = useSelector((state) => state.auth.token);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "", isbn: "", quantity: 1, id: null });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks(token);
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
        console.log(error)
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  // const handleAddBook = async () => {
  //   try {
  //     await addBook(token, formData);
  //     fetchBooks();
  //     resetForm();
  //   } catch (error) {
  //       console.log(error)

  //     setError("Failed to add book");
  //   }
  // };
  const handleAddBook = async () => {
    try {
      await addBook(token, formData);
      fetchBooks();
      resetForm();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add book";
      setError(message);
  
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  
  const handleEditBook = async (bookId) => {
    try {
      const bookData = await getBookById(token, bookId);
      setFormData(bookData); 
      setShowForm(true);
    } catch (error) {
        console.log(error)

      setError("Failed to fetch book details");
    }
  };

  // const handleUpdateBook = async () => {
  //   try {
  //     await editBook(token, formData.id, formData);
  //     fetchBooks();
  //     resetForm();
  //   } catch (error) {
  //       console.log(error)

  //     setError("Failed to update book");
  //   }
  // };
  const handleUpdateBook = async () => {
    try {
      await editBook(token, formData.id, formData);
      fetchBooks();
      resetForm();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update book";
      setError(message);
  
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  
  const resetForm = () => {
    setFormData({ title: "", author: "", isbn: "", quantity: 1, id: null });
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Library Books</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-600">Loading books...</p>
      ) : (
        <>
          {books.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500">No books found.</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => setShowForm(true)}>
                Add Book
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left border">Title</th>
                    <th className="p-3 text-left border">Author</th>
                    <th className="p-3 text-left border">ISBN</th>
                    <th className="p-3 text-left border">Quantity</th>
                    <th className="p-3 text-center border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="border">
                      <td className="p-3">{book.title}</td>
                      <td className="p-3">{book.author}</td>
                      <td className="p-3">{book.isbn}</td>
                      <td className="p-3 text-center">{book.quantity}</td>
                      <td className="p-3 text-center">
                        <button className="px-3 py-1 bg-yellow-500 text-white rounded-md mr-2" onClick={() => handleEditBook(book.id)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={() => setShowForm(true)}>
                  Add New Book
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {showForm && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-md">
          <h3 className="text-lg font-semibold mb-2">{formData.id ? "Edit Book" : "Add New Book"}</h3>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Title"
              className="p-2 border rounded-md"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              className="p-2 border rounded-md"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <input
              type="text"
              placeholder="ISBN"
              className="p-2 border rounded-md"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="p-2 border rounded-md"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={formData.id ? handleUpdateBook : handleAddBook}>
              {formData.id ? "Update" : "Save"}
            </button>
            <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
