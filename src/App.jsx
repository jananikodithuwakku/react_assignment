import { HashRouter, Route, Routes, Link } from "react-router-dom"
import "./App.css"

import Assignment from "./assignments/Assignment_1"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/" element={<><h2>Navigation Menu</h2>
              <ul>
                <li><Link to="/assignment_1">Assignment 01</Link></li>
                
              </ul>
            </>}/>
        <Route path="/assignment_1" element={<Assignment />} />
        
      </Routes>
    </HashRouter>
  )
}

export default App
