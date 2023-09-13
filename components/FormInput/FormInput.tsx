"use client";

import "./style.css";
import React, { ChangeEvent } from "react";

type FormInputProps = {
  value?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  type?:
    | "button"
    | "hidden"
    | "email"
    | "text"
    | "tel"
    | "search"
    | "password"
    | "number";
};

const FormInput = (props: FormInputProps) => {
  const {
    name,
    value,
    placeholder,
    disabled,
    onChange,
    required,
    className,
    type = "text",
  } = props;

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(evt);
    }
  };

  return (
    <input
      className={`input ${className ? className : ""}`}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={inputChangeHandler}
      required={required}
      type={type}
    />
  );
};

export default FormInput;
