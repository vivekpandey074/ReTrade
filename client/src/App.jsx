import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedPage from "./components/ProtectedPage";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";

import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";

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
              path="/profile"
              element={
                <ProtectedPage>
                  <Profile />
                </ProtectedPage>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
