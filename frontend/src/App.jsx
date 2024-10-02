import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Signin } from "./pages/Sign In/Signin";
import Logout from './pages/Sign In/Logout'
import { Cart } from "./pages/Cart/Cart";
import { Menu } from "./pages/Menu/Menu";
import Search from "./components/SearchBar/Search";
import OtherMenu from "./pages/Menu Other/OtherMenu";
import SchedulePage from "./components/SchedulePage/SchedulePage";
import { ScheduleSummary } from "./components/ScheduleSummary/ScheduleSummary";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/search" element={<Search />} />
          <Route path="/othermenu" element={<OtherMenu />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/scheduleSummary" element={<ScheduleSummary />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
