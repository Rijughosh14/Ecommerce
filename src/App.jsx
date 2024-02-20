import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from './pages/Index';
import { Privatelogin, PrivateRoute  } from "./PrivateRoute/PrivateRoute";



function App() {

  return (
    <>
    <Routes>
      <Route index element={<Privatelogin><Index/></Privatelogin>}/>
      <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
    </Routes>
    </>
  )
}

export default App
