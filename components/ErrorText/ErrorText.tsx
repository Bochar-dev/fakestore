"use client";

type ErrorTextProps = {
  message: string;
};

const ErrorText = ({ message }: ErrorTextProps) => {
  return <span>Произошла ошибка: {message}</span>;
};

export default ErrorText;
