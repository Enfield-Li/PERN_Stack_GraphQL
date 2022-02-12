import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

export type InputWrapperProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type?: "textarea" | "password" | "email";
  textarea?: boolean;
};

const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const InputType = textarea ? "textarea" : "input";
  return (
    <div className="mb-3">
      <label htmlFor={field.name} className="form-label">
        {label}
      </label>
      <InputType
        required={true}
        type="text"
        className="form-control"
        id={field.name}
        {...field}
        {...props}
        aria-describedby="textHelp"
      />
      {error && (
        <div className="text-danger" id="feedback">
          {error}
        </div>
      )}
    </div>
  );
};
export default InputWrapper;
