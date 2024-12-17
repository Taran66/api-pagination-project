import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './Table';
import Table2 from './Table2';

const App: React.FC = () => {
    return (
      
        <Router>
            <Routes>
                <Route path="/artworks/page/:pageNumber" element={<Table2 />} />
                <Route path="/" element={<Table2 />} />
            </Routes>
        </Router>
    );
};

export default App;
