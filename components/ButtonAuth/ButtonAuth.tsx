"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AuthStatus } from "@/const";
import { clearToken } from "@/store/slices/auth/reducer";
import { getAuthStatus } from "@/store/slices/auth/selectors";

const ButtonAuth = () => {
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const signoutClickHandler = () => {
    dispatch(clearToken());
  };

  if (authStatus === AuthStatus.NoAuth) {
    return <Link href="/login">Войти</Link>;
  }

  return (
    <Link href="#" onClick={signoutClickHandler}>
      Выйти
    </Link>
  );
};

export default ButtonAuth;
