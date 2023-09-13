"use client";

import "./style.css";
import { FormEvent, MouseEvent } from "react";
import Link from "next/link";

type ButtonProps = {
  type?: "button" | "reset" | "submit";
  className?: string;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  onSubmit?: (evt: FormEvent<HTMLButtonElement>) => void;
  variant?: "button" | "link";
  href?: string;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const {
    onClick,
    children,
    className,
    type = "button",
    onSubmit,
    variant = "button",
    href = "#",
    disabled,
  } = props;

  const buttonSubmitHandler = (evt: FormEvent<HTMLButtonElement>) => {
    if (onSubmit) {
      onSubmit(evt);
    }
  };

  const buttonClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(evt);
    }
  };

  if (variant === "link") {
    return (
      <Link href={href} className={`button ${className ? className : ""}`}>
        {children ? children : ""}
      </Link>
    );
  }

  return (
    <button
      className={`button ${className ? className : ""}`}
      type={type}
      onClick={(evt) => buttonClickHandler(evt)}
      onSubmit={(evt) => buttonSubmitHandler(evt)}
      disabled={disabled}
    >
      {children ? children : ""}
    </button>
  );
};

export default Button;
