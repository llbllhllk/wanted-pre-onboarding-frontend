import { useMemo } from "react";

import Form from "../components/Form";

const SignUp = () => {
  const formProps = useMemo(() => {
    return {
      buttonType: "회원가입",
      buttonTestId: "signup-button",
    };
  }, []);

  return <Form formProps={formProps} />;
};

export default SignUp;
