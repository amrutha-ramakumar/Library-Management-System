import axios from "axios";

const API_URL = "http://localhost:8080/api/profile";

// Function to get user profile details
export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Function to update user profile
export const updateProfile = async (token, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/update`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
