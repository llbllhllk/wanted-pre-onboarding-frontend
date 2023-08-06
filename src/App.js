import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Todo from "./pages/Todo";

function App() {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage("access_token");

  useEffect(() => {
    storedValue === undefined && navigate("/signin");
  }, []);

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
