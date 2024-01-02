"use client";

import clsx from "clsx"; // clsx is a tiny utility for constructing className strings conditionally.
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  requiredMessage?: string;
  register: UseFormRegister<FieldValues>; // register is a function that registers inputs/selects and validates fields. It is a required function to be invoked during the onSubmit. By registering inputs/selects, their values will be included in the form data when calling handleSubmit.
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  // {} is destructuring
  label: label,
  id: id,
  type: type,
  required: required,
  requiredMessage,
  register: register,
  errors: errors,
  disabled: disabled,
}) => {
  // FC stands for Functional Component
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          autoComplete={id}
          required={required}
          disabled={disabled}
          {...register(id, { required: required })}
          className={clsx( // clsx is a tiny utility for constructing className strings conditionally.
            "form-input block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm", // form-input is a tailwind class that is used to style the input. It comes from the manually installed tailwindcss-forms plugin.
            errors[id] && "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500",
            disabled && "bg-gray-100 cursor-not-allowed"
            // errors[id]
            //   ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
            //   : "focus:ring-blue-500 focus:border-blue-500"
          )}
        />
        {errors[id] && (
          <p className="ml-1 mt-1 text-xs text-red-600" id={id}>
            {requiredMessage ?? `${label} is required`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
