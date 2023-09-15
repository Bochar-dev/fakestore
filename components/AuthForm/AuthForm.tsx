"use client";

import "./style.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { authSelector } from "@/store/slices/auth/selectors";
import { loginAction } from "@/store/slices/auth/api-actions";
import { clearError } from "@/store/slices/auth/reducer";

import { useForm } from "react-hook-form";
import { AuthData } from "@/types/auth-data";

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const { isSucces, error, isLoading } = useAppSelector(authSelector);

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();

  const formSubmitHandler = handleSubmit((data) => {
    dispatch(loginAction(data));
  });

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
        <div className="form-element">
          {errors.username && (
            <span className="form-element__error">
              {errors.username.message}
            </span>
          )}
          <input
            className="form-element__field"
            type="text"
            placeholder="Введите логин"
            {...register("username", { required: "Это обязательное поле" })}
            disabled={isLoading}
          />
        </div>
        <div className="form-element">
          {errors?.password && (
            <span className="form-element__error">
              {errors.password.message}
            </span>
          )}
          <input
            className="form-element__field"
            type="password"
            placeholder="Введите пароль"
            {...register("password", { required: "Это обязательное поле" })}
            disabled={isLoading}
          />
        </div>
        <button className="button" disabled={isLoading}>
          Войти{isLoading && "..."}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
