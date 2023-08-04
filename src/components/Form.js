import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../api";

const Form = ({ formProps }) => {
  const { page, buttonTestId, path } = formProps;

  const navigate = useNavigate();

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

  const handleRequest = async () => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    };

    const res = await fetchData(`/auth/${page}`, config);

    console.log(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRequest();
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
        {page === "signup" ? "회원가입" : "로그인"}
      </button>
    </form>
  );
};

export default Form;
