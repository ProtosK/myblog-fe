import { Container } from "react-bootstrap";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Pages/Header";
import Footer from "./components/Pages/Footer";
import Home from "./components/Pages/Home";
import TableUsers from "./components/User/TableUsers";
import Login from "./components/Manage/Login";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, [loginContext]);

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<TableUsers />} />
          </Routes>
        </Container>
        <Footer />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
