import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage("access_token");

  useEffect(() => {
    storedValue === undefined && navigate("/signin");
  }, []);

  return <div></div>;
};

export default Todo;
