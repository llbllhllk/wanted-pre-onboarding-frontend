import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import fetchData from "../api";

const Form = ({ formProps }) => {
  const { page, buttonTestId, path } = formProps;

  const navigate = useNavigate();

  const [input, setInput] = useState({ email: "", password: "" });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [storedValue, setValue] = useLocalStorage("access_token", "");

  useEffect(() => {
    return input.email.includes("@") && input.password.length >= 8
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [input.email, input.password]);

  const handleChange = (e) => {
    setIsDuplicated(false);
    setIsWrong(false);

    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleRequest = async () => {
    const api = `/auth/${page}`;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    };

    const res = await fetchData(api, config);
    if (page === "signup") {
      res.ok ? navigate(path) : setIsDuplicated(true);
    } else {
      if (res.status === 404) {
        setIsWrong(true);
      } else {
        const jsonData = await res.json();
        const access_token = jsonData.access_token;
        setValue(access_token);
        navigate(path);
      }
    }
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
      {page === "signin" && (
        <button type="button" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      )}
      <strong>
        {isDuplicated &&
          "입력하신 아이디와 비밀번호가 중복되었습니다. 다시 입력해주세요."}
        {isWrong && "해당 사용자가 존재하지 않습니다."}
      </strong>
    </form>
  );
};

export default Form;
