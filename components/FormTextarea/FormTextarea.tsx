"use client";

import "./style.css";
import { ChangeEvent } from "react";

type FormTextareaProps = {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
};

const FormTextarea = (props: FormTextareaProps) => {
  const textareaChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(evt);
    }
  };

  const { value, onChange, disabled, placeholder, required } = props;

  return (
    <textarea
      disabled={disabled}
      className="textarea"
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={(evt) => textareaChangeHandler(evt)}
    />
  );
};

export default FormTextarea;
