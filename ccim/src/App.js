import logo from './logo.svg';
import './App.css';
import About from './Containers/About.js';
import Home from './Containers/Home.js'

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
 <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>

        </header>
      </div>
    </Router>
    </div>
  );
}

export default App;
