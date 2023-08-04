import { useMemo } from "react";

import Form from "../components/Form";

const SignUp = () => {
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
