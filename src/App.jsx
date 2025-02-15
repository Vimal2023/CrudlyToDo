// import { useState } from 'react'
import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./components/Read";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
