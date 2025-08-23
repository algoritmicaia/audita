import React, { forwardRef } from "react";
import { Link } from "react-router";

const Button = forwardRef(
  (
    {
      variant = "primary",
      to,                 // si viene => navegamos
      href,               // opcional para enlaces externos
      className = "",
      disabled = false,
      type,               // solo aplica en <button>
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
    
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      warning: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      info: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
      light: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
      dark: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500",
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${disabledClasses} ${className}`.trim();

    // Link interno
    if (to) {
      if (disabled) {
        return (
          <span
            ref={ref}
            className={classes}
            aria-disabled="true"
            {...rest}
          >
            {children}
          </span>
        );
      }
      return (
        <Link
          ref={ref}
          to={to}
          className={classes}
          onClick={onClick}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    // <a> externo (opcional)
    if (href) {
      if (disabled) {
        return (
          <span
            ref={ref}
            className={classes}
            aria-disabled="true"
            {...rest}
          >
            {children}
          </span>
        );
      }
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          onClick={onClick}
          {...rest}
        >
          {children}
        </a>
      );
    }

    // Botón real (acción)
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
