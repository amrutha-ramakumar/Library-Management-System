import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/transactions"; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

// export const borrowBook = async (token, bookId) => {
//   const response = await api.post(`/borrow/${bookId}`, null, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };
export const borrowBook = async (token, bookId) => {
  try {
    const response = await api.post(`/borrow/${bookId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "Something went wrong.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const returnBook = async (token, transactionId) => {
  const response = await api.post(`/return/${transactionId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getBorrowedBooks = async (token) => {
  const response = await api.get(`/my-books`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAvailableBooks = async (token) => {
    try {
      const response = await api.get(`/available-books`,
        {
            headers: { Authorization: `Bearer ${token}` },
          }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching available books:", error);
      throw error;
    }
  };

  export const searchTransactions = async (token, bookTitle, page = 0, size = 10) => {
    try {
      const response = await api.get(`/search?bookTitle=${bookTitle}&page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching transactions:", error);
      throw error;
    }
  };
  export const getAllBorrowedBooks = async (token, page, size ) => {
    try {
      const response = await api.get(`/all?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
      throw error;
    }
  };