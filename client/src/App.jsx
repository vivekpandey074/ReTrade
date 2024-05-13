import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedPage from "./components/ProtectedPage";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";

import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import MyBids from "./components/MyBids";
import NotFound from "./components/NotFound";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      <div>
        {loading && <Spinner />}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedPage>
                  <Home />
                </ProtectedPage>
              }
            />
            <Route
              path="/Product"
              element={
                <ProtectedPage>
                  <Profile />
                </ProtectedPage>
              }
            />
            <Route
              path="/MyBids"
              element={
                <ProtectedPage>
                  <MyBids />
                </ProtectedPage>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedPage>
                  <ProductDetail />
                </ProtectedPage>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedPage>
                  <Admin />
                </ProtectedPage>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedPage>
                  <About />
                </ProtectedPage>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedPage>
                  <Contact />
                </ProtectedPage>
              }
            />
            <Route
              path="/paymentsuccess"
              element={
                <ProtectedPage>
                  <PaymentSuccess />
                </ProtectedPage>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
