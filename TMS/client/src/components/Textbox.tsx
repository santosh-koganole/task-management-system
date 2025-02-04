import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
interface ITextboxProps {
  placeholder?: string;
  type?: string;
  name: string;
  label?: string;
  className?: string;
  register?: UseFormRegisterReturn<string>;
  error?: string | undefined;
}

const Textbox = React.forwardRef<HTMLInputElement, ITextboxProps>(
  ({ placeholder, type, name, label, className, register, error }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-slate-800">
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...register}
          aria-invalid={error ? "true" : "false"}
          className={`bg-transparent px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus-ring2 ring-blue-300 ${className}`}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

Textbox.displayName = "Textbox";

export default Textbox;
