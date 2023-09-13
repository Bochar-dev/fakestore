"use client";

import "./style.css";
import { ChangeEvent, useEffect } from "react";

type FormSelectProps = {
  options: string[];
  required?: boolean;
  size?: number;
  selected?: string;
  onChange?: (evt: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

const FormSelect = (props: FormSelectProps) => {
  const { options, selected, onChange, disabled, size, required } = props;

  const selectChangeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(evt);
    }
  };

  return (
    <select
      className="select"
      value={selected}
      onChange={(evt) => selectChangeHandler(evt)}
      size={size}
      required={required}
    >
      {options.map((option) => (
        <option
          className="select__option"
          value={option}
          key={option}
          disabled={disabled}
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
