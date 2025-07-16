import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import Footer from './components/Footer';
import Home from './components/Home';
import Error from './components/Error';
import Prediction from './components/Prediction';
import Review from './components/Review';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={ <Prediction /> }/>
          <Route path="/review" element={ <Review /> }/>
          <Route path="*" element={<Error />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
