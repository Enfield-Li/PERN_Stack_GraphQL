import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

export type InputWrapperProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type?: "password" | "email";
  textarea?: boolean;
};

const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  textarea,
  type,
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
        type={type ? type : "text"}
        className="form-control"
        id={field.name}
        {...field}
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
