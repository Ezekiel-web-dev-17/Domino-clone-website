import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Contact from "./components/Contact.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import { ApiProvider } from "./Axios.jsx";

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
