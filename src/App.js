import { Container } from "react-bootstrap";
import "./App.scss";
import { ToastContainer } from "react-toastify";

import Header from "./components/Pages/Header";
import Footer from "./components/Pages/Footer";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";

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
          <AppRoutes />
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
