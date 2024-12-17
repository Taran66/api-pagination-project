import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './Table';

const App: React.FC = () => {
    return (
      
        <Router>
            <Routes>
                <Route path="/artworks/page/:pageNumber" element={<Table />} />
                <Route path="/" element={<Table />} />
            </Routes>
        </Router>
    );
};

export default App;
