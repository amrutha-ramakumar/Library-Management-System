import React from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
// import BorrowedBooks from "./pages/BorrowedBooks";
// import AdminBooks from "./pages/AdminBooks";
// import UserList from "./pages/UserList";
// import Transactions from "./pages/Transactions";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Shared Dashboard for Both Roles */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role={["ADMIN", "USER"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile for Both ADMIN & USER */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute role={["ADMIN", "USER"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* USER-specific Route */}
          {/* <Route
            path="/borrowed-books"
            element={
              <ProtectedRoute role={["USER"]}>
                <BorrowedBooks />
              </ProtectedRoute>
            }
          /> */}

          {/* ADMIN-specific Routes */}
          {/* <Route
            path="/books"
            element={
              <ProtectedRoute role={["ADMIN"]}>
                <AdminBooks />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/users"
            element={
              <ProtectedRoute role={["ADMIN"]}>
                <UserList />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/transactions"
            element={
              <ProtectedRoute role={["ADMIN"]}>
                <Transactions />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
