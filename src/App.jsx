import "./index.css";
import "../public/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

import LoginPage from "./pages/LoginPage";
import UserContextProvider from "./UserContext/UserContextProvider";
import { ItemsContextProvider } from "./ListItemsContext/ItemsContextProvider";
import Layout from "./pages/Layout";

function App() {
  return (
    <UserContextProvider>
      <ItemsContextProvider>
        <Router>
          <div className="h-svh md:h-fit flex flex-col">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </ItemsContextProvider>
    </UserContextProvider>
  );
}

export default App;
