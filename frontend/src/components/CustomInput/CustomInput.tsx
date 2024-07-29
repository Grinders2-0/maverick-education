import React from "react";
import { colors } from "../../util/constant/colors";
import "./CustomInput.css";
import { EAttadance } from "../../@types/form";

interface CustomInputProps {
  label?: string | undefined;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  sideBySide?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  sideBySide = false,
}) => {
  return (
    <div
      className={`custom-input-container ${sideBySide ? "side-by-side" : ""}`}
    >
      {label && (
        <label className={`custom-input-label ${sideBySide ? "" : "not-side"}`}>
          {label}
        </label>
      )}
      <input
        className="custom-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
      />
    </div>
  );
};

export default CustomInput;
