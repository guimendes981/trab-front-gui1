import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Listagem from './pages/List';
import Detalhes from './pages/Detail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listagem />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
      </Routes>
    </Router>
  );
};

export default App;
