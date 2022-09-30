import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/footer/Footer";
import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import useApi from "./components/hooks/useApi";

function App() {

  return (
    <div className="container py-3">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
