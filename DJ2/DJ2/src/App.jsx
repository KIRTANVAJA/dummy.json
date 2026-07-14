import { Routes, Route } from "react-router-dom";

import Home from "./home";
import Cart from "./cart";
import Login from "./login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
