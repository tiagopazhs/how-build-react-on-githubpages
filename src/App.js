import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import Home from './screens/Home';
import Printer from './screens/Printer';
import Reader from './screens/Reader';
import ThreeRopes from './screens/ThreeRopes';

function App () {
  return (
    <HashRouter basename='/ct-stock'>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/Printer-Customizer" element={<Printer />}/>
        <Route path="/Three-Ropes" element={<ThreeRopes />}/>
        <Route path="/Validation-Order" element={<Reader />}/>
      </Routes>
      </HashRouter>
  )
}

export default App;