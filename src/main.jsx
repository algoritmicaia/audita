import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IluminationPage from "./components/Pages/IluminationPage/IluminationPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretUp, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Home } from "./components/Pages/Home/Home";

// Configurar los iconos que vamos a usar
library.add(faCaretUp, faMinus);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ilumination-protocol" element={<IluminationPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
