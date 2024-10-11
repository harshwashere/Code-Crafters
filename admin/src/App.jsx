import { Navbar } from "./components/Navbar/Navbar"
import { Sidebar } from "./components/sidebar/Sidebar"
import { Route, Routes } from "react-router-dom"
import { Add } from "./pages/Add/Add"
import { Menu } from "./pages/List/Menu"
import { Contact } from "./pages/Order/Contact"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllUsers } from "./pages/AllUsers/AllUsers"
import ViewAllOrders from "./pages/ViewAllOrders/ViewAllOreder"


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/' element={< Add />} />
          <Route path='/menu' element={< Menu />} />
          <Route path='/contact' element={< Contact />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/viewOrders" element={<ViewAllOrders />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
