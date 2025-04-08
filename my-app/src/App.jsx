// import React from "react";
// import "./index.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Shared Dashboard for Both Roles */}
//           <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/profile" element={<Profile />} />
//           </Route>

//           {/* User-Specific Route */}
//           {/* <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
//             <Route path="/borrowed-books" element={<BorrowedBooks />} />
//           </Route> */}

//           {/* Admin-Specific Routes */}
//           {/* <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
//             <Route path="/books" element={<AdminBooks />} />
//             <Route path="/users" element={<UserList />} />
//             <Route path="/transactions" element={<Transactions />} />
//           </Route> */}
//         </Routes>
//       </Router>
//     </Provider>
//   );
// }

// export default App;
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
import ProtectedRoute from "./components/ProtectedRoute";
import BookList from "./pages/BookList";
import UserList from "./pages/UserList";
import Books from "./pages/Books";
import BorrowedBooks from "./pages/BorrowedBooks";
import Transactions from "./pages/Transaction";

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
          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* User-Specific Route */}
          <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route path="/books" element={<Books />} />

            <Route path="/borrowed-books" element={<BorrowedBooks />} />
          </Route>

          {/* Admin-Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/allbooks" element={<BookList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
