import { useMemo, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

import Form from "../components/Form";

const SignIn = () => {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage("access_token");

  useEffect(() => {
    storedValue !== undefined && navigate("/todo");
  }, [storedValue, navigate]);

  const formProps = useMemo(() => {
    return {
      page: "signin",
      buttonTestId: "signin-button",
      path: "/todo",
    };
  }, []);

  return <Form formProps={formProps} />;
};

export default SignIn;
