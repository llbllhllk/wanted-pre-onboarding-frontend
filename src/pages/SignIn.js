import { useMemo } from "react";

import Form from "../components/Form";

const SignIn = () => {
  const formProps = useMemo(() => {
    return {
      page: 'signin',
      buttonTestId: "signin-button",
      path: "/todo",
    };
  }, []);

  return <Form formProps={formProps} />;
};

export default SignIn;
