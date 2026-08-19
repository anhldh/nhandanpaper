import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPaper from "./components/layout-paper";
import JourneyPaper from "./journey/JourneyPaper";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JourneyPaper />} />
        <Route path="/nhandan" element={<LayoutPaper />} />
      </Routes>
    </BrowserRouter>
  );
}
