import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Customer from "./components/customer/Customer";
import ItemsCards from "./pages/Items/ItemsCards";
import Home from "./components/home/Home";
import MyOrder from "./pages/myOrder/MyOrder";
import Manager from "./components/manager/Manager";
import OrderList from "./pages/customerOrderAll/OrderList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

        <Route path="/customer" element={<Home />} />
        <Route path="/cards" element={<ItemsCards />} />
        <Route path="/myorder" element={<MyOrder/>}/>
        <Route path="/manager" element={<Manager/>}/>
        <Route path="/orderList" element={<OrderList/>}/>
      </Routes>
    </div>
  );
}

export default App;
