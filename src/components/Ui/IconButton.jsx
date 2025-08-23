import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const iconMap = {
  delete: <FaTrash />,
  edit: <FaEdit />
};

const IconButton = forwardRef(
  (
    {
      icon,
      to,        // navegación interna
      href,      // enlace externo
      className = "",
      disabled = false,
      "aria-label": ariaLabel,
      onClick,
      ...rest
    },
    ref
  ) => {
    const baseClasses = "inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const iconClasses = {
      edit: "text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      delete: "text-red-500 hover:text-red-700 hover:bg-red-50 focus:ring-red-500"
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    const classes = `${baseClasses} ${iconClasses[icon] || iconClasses.edit} ${disabledClasses} ${className}`.trim();
    const content = iconMap[icon];

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
            {content}
          </span>
        );
      }
      return (
        <Link
          ref={ref}
          to={to}
          className={classes}
          aria-label={ariaLabel}
          onClick={onClick}
          {...rest}
        >
          {content}
        </Link>
      );
    }

    // Enlace externo
    if (href) {
      if (disabled) {
        return (
          <span
            ref={ref}
            className={classes}
            aria-disabled="true"
            {...rest}
          >
            {content}
          </span>
        );
      }
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          aria-label={ariaLabel}
          onClick={onClick}
          {...rest}
        >
          {content}
        </a>
      );
    }

    // Botón acción
    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={onClick}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

export default IconButton;
