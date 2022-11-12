import React from 'react';
import { Route, Routes } from "react-router-dom"

import TestTablaInmultirii from './components/test-tabla-inmultirii';
import TablaInmultiriiPage from './pages/table-inmultirii-page';
import ApplicationLayout from './components/layout/application-layout';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<TestTablaInmultirii />} />
        <Route path='/help' element={<TablaInmultiriiPage />} />
      </Routes>
      <ApplicationLayout />
    </div>
  );
}

export default App;
