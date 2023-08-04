import { useEffect, useState } from "react";

const Form = ({ formProps }) => {
  const { buttonType, buttonTestId } = formProps;

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    return input.email.includes("@") && input.password.length >= 8
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [input.email, input.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // /signin 경로로 이동
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">이메일</label>
      <input
        type="text"
        data-testid="email-input"
        id="email"
        name="email"
        value={input.email}
        onChange={handleChange}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        data-testid="password-input"
        id="password"
        name="password"
        value={input.password}
        onChange={handleChange}
      />
      <button type="submit" data-testid={buttonTestId} disabled={isDisabled}>
        {buttonType}
      </button>
    </form>
  );
};

export default Form;
