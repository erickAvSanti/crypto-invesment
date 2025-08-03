import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { HistoryPage } from "./pages/history.page";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/historial">Historial</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/historial" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
