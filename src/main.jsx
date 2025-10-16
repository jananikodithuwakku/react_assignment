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
import Assignment_11 from "./assignments/Assignment_11.jsx";
import Assignment_12 from "./assignments/Assignment_12.jsx";
import Assignment_13 from "./assignments/Assignment_13.jsx";
import Assignment_14 from "./assignments/Assignment_14.jsx";
import Assignment_15 from "./assignments/Assignment_15.jsx";
import Assignment_16 from "./assignments/Assignment_16.jsx";
import Assignment_17 from "./assignments/Assignment_17.jsx";
import Assignment_18 from "./assignments/Assignment_18.jsx";
import Assignment_19 from "./assignments/Assignment_19.jsx";
import Assignment_20 from "./assignments/Assignment_20.jsx";
import Assignment_21 from "./assignments/Assignment_21.jsx";
import Assignment_21_i from "./assignments/Assignment_21_i.jsx";
import Assignment_22 from "./assignments/Assignment_22.jsx";
import Assignment_23 from "./assignments/Assignment_23.jsx";
import Assignment_24 from "./assignments/Assignment_24.jsx";
import Assignment_25 from "./assignments/Assignment_25.jsx";
import Assignment_26 from "./assignments/Assignment_26.jsx";
import Assignment_27 from "./assignments/Assignment_27.jsx";
import Assignment_28 from "./assignments/Assignment_28.jsx";
import Assignment_29 from "./assignments/Assignment_29.jsx";


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
        <Route path="/assignment_11" element={<Assignment_11 />} />
        <Route path="/assignment_12" element={<Assignment_12 />} />
        <Route path="/assignment_13" element={<Assignment_13 />} />
        <Route path="/assignment_14" element={<Assignment_14 />} />
        <Route path="/assignment_15" element={<Assignment_15 />} />
        <Route path="/assignment_16" element={<Assignment_16 />} />
        <Route path="/assignment_17" element={<Assignment_17 />} />
        <Route path="/assignment_18" element={<Assignment_18 />} />
        <Route path="/assignment_19" element={<Assignment_19 />} />
        <Route path="/assignment_20" element={<Assignment_20 />} />
        <Route path="/assignment_21" element={<Assignment_21 />} />
        <Route path="/assignment_21_i" element={<Assignment_21_i />} />
        <Route path="/assignment_22" element={<Assignment_22 />} />
        <Route path="/assignment_23" element={<Assignment_23 />} />
        <Route path="/assignment_24" element={<Assignment_24 />} />
        <Route path="/assignment_25" element={<Assignment_25 />} />
        <Route path="/assignment_26" element={<Assignment_26 />} />
        <Route path="/assignment_27" element={<Assignment_27 />} />
        <Route path="/assignment_28" element={<Assignment_28 />} />
        <Route path="/assignment_29" element={<Assignment_29 />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
