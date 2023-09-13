"use client";

import "./style.css";
import { ChangeEvent } from "react";

const DEFAULT_MAX_SIZE_FILE = 5000;

type FormInputFileProps = {
  name?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  size?: number;
  accept?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
};

const FormInputFile = (props: FormInputFileProps) => {
  const {
    accept,
    onChange,
    name,
    disabled,
    required,
    size = DEFAULT_MAX_SIZE_FILE,
    value,
  } = props;

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(evt);
    }
  };

  return (
    <input
      name={name}
      size={size}
      value={value}
      disabled={disabled}
      required={required}
      type="file"
      accept={accept}
      onChange={(evt) => inputChangeHandler(evt)}
    />
  );
};

export default FormInputFile;
