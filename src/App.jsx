import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import { ApiProvider } from "./Axios.jsx";
import Error from "./pages/Error";

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
