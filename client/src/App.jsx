import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedPage from "./components/ProtectedPage";
import { ToastContainer } from "react-toastify";




function App() {

  return (
    <>
     <div>
      <BrowserRouter>
      <Routes>
       <Route path="/" element={<ProtectedPage><Home/></ProtectedPage>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/signup"element={<Register/>}/>
      </Routes>
      </BrowserRouter>
     
     </div>
     <ToastContainer/>
      
    </>
  )
}

export default App
