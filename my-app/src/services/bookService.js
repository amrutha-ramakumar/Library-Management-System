import axios from "axios";

const API_URL = "http://localhost:8080/api/books";

// Function to fetch all books
export const getBooks = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

// Function to add a new book
export const addBook = async (token, bookData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};


export const getBookById = async (token, bookId) => {
    try {
      const response = await axios.get(`${API_URL}/${bookId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching book details:", error);
      throw error;
    }
  };
  export const editBook = async (token, bookId, bookData) => {
    try {
      const response = await axios.put(`${API_URL}/edit/${bookId}`, bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  };