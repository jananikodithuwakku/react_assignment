import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Assignment_1 from "./assignments/Assignment_1.jsx";
import Assignment_2 from "./assignments/Assignment_2.jsx";
import Assignment_3 from "./assignments/Assignment_3.jsx";
import Assignment_4 from "./assignments/Assignment_4.jsx";
import Assignment_5 from "./assignments/Assignment_5.jsx";
import Assignment_6 from "./assignments/Assignment_6.jsx";
import Assignment_7 from "./assignments/Assignment_7.jsx";
import Assignment_8 from "./assignments/Assignment_8.jsx";
import Assignment_9 from "./assignments/Assignment_9.jsx";
import Assignment_10 from "./assignments/Assignment_10.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/assignment_1" element={<Assignment_1 />} />
        <Route path="/assignment_2" element={<Assignment_2 />} />
        <Route path="/assignment_3" element={<Assignment_3 />} />
        <Route path="/assignment_4" element={<Assignment_4 />} />
        <Route path="/assignment_5" element={<Assignment_5 />} />
        <Route path="/assignment_6" element={<Assignment_6 />} />
        <Route path="/assignment_7" element={<Assignment_7 />} />
        <Route path="/assignment_8" element={<Assignment_8 />} />
        <Route path="/assignment_9" element={<Assignment_9 />} />
        <Route path="/assignment_10" element={<Assignment_10 />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
