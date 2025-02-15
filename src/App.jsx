// import { useState } from 'react'
import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update/:id" element={<Update />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
