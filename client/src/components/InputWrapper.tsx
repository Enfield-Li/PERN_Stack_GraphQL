import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputWrapperProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type?: "textarea" | "password" | "email";
};

const InputWrapper: React.FC<InputWrapperProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  //   console.log(field);
  //   console.log(props);

  return (
    <div className="mb-3">
      <label htmlFor={field.name} className="form-label">
        {label}
      </label>
      <input
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
