import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Add } from "./pages/Add/Add";
import { Menu } from "./pages/Menu/Menu";
import { Contact } from "./pages/Contact/Contact";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllUsers } from "./pages/AllUsers/AllUsers";
import ViewAllOrders from "./pages/ViewAllOrders/ViewAllOreder";
import Special from "./pages/Special/Special";
import Deals from "./pages/Deals/Deals";
import ScheduleOrder from "./pages/Schedule Order/ScheduleOrder";
import Logout from "./pages/AdminLogin/Logout";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import { Navbar } from './components/Navbar/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />  {/* Now inside BrowserRouter */}
      <ToastContainer />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/add" element={<Add />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/special" element={<Special />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/scheduleorder" element={<ScheduleOrder />} />
          <Route path="/viewOrders" element={<ViewAllOrders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
