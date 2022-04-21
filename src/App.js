import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import EmpresaDetail from "./components/EmpresaDetail/EmpresaDetail";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/empresas" element={<Home />} />
        <Route path="/empresas/:id" element={<EmpresaDetail />}/>
      </Routes>
    </>
  );
}

export default App;
