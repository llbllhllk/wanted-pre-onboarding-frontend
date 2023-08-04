import { useMemo } from "react";

import Form from "../components/Form";

const SignIn = () => {
  const formProps = useMemo(() => {
    return {
      buttonType: "로그인",
      buttonTestId: "signin-button",
      path: "/todo",
    };
  }, []);

  return <Form formProps={formProps} />;
};

export default SignIn;
