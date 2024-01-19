import "./App.css";
import Homepage from "./hompage";
import Dashboard from "./dashboard";
import Plan from "./plan";
import Account from "./account";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard/:username" element={<Dashboard />} />
        <Route path="/plan/:username" element={<Plan/>} />
        <Route path="/account/:username" element={<Account/>} />
      </Routes>
    </div>
  );
}

export default App;
