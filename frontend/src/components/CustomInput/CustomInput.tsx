import React from "react";
import { colors } from "../../util/constant/colors";
import "./CustomInput.css";
interface CustomInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <div className="custom-input-container">
      <div className="custom-input-label">
        <label>{label}</label>
      </div>
      <div>
        <input
          className="custom-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          required={required}
        />
      </div>
    </div>
  );
};

export default CustomInput;
