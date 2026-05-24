import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      icon,
      type = "text",
      id,
      containerClassName = "",
      inputClassName = "",
      required,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    // Toggle password visibility
    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    // Determine the actual input type
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={`flex flex-col w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            {label}
            {required && (
              <span className="text-rose-500" title="Required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center rounded-lg shadow-2xs group">
          {/* Left Icon (if provided) */}
          {icon && (
            <div className="absolute left-3.5 flex items-center justify-center text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none">
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={inputType}
            id={id}
            /* required is intentionally omitted here to avoid browser-native
               validation conflicting with Ant Design Form.Item validation.
               The `required` prop is still used above to render the * on the label. */
            className={`
              w-full px-3.5 py-2.5 rounded-lg border text-slate-800 text-sm font-normal bg-white
              placeholder:text-slate-400 placeholder:font-light outline-hidden
              transition-all duration-200
              ${icon ? "pl-11" : ""} 
              ${isPassword ? "pr-11" : ""}
              ${
                error
                  ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 focus:shadow-xs"
                  : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:shadow-xs"
              }
              disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed disabled:border-slate-200
              ${inputClassName}
            `}
            {...props}
          />

          {/* Toggle Password Visibility button (if password type) */}
          {isPassword && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-3.5 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer select-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-xs font-medium text-rose-500 mt-0.5 animate-fade-in flex items-center gap-1 select-none">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
