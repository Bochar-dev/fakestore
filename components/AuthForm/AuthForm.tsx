"use client";

import "./style.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { authSelector } from "@/store/slices/auth/selectors";
import { loginAction } from "@/store/slices/auth/api-actions";
import { clearError } from "@/store/slices/auth/reducer";

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { error, isLoading, isSucces } = useAppSelector(authSelector);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setLogin(evt.target.value);
  };

  const passwordChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const formSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(
      loginAction({
        login: login,
        password: password,
      })
    );
  };

  useEffect(() => {
    if (isSucces) {
      router.push("/");
      dispatch(clearError());
    }

    if (error) {
      setErrorMessage(error);
    }
  }, [isSucces, router, error, dispatch]);

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={formSubmitHandler}>
        {errorMessage && (
          <span className="auth__form-error-text">{errorMessage}</span>
        )}
        <div className="auth__form-inner">
          <FormInput
            value={login}
            onChange={loginChangeHandler}
            placeholder="Логин"
            required
            type="text"
            disabled={isLoading}
          />
          <FormInput
            value={password}
            onChange={passwordChangeHandler}
            placeholder="Пароль"
            required
            type="password"
            disabled={isLoading}
          />
          <Button
            className="auth__form-button"
            type="submit"
            disabled={isLoading}
          >
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
