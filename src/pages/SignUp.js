import { useMemo, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

import Form from "../components/Form";

const SignUp = () => {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage("access_token");

  useEffect(() => {
    storedValue !== undefined && navigate("/todo");
  }, [storedValue, navigate]);

  const formProps = useMemo(() => {
    return {
      page: "signup",
      buttonTestId: "signup-button",
      path: "/signin",
    };
  }, []);

  return <Form formProps={formProps} />;
};

export default SignUp;
