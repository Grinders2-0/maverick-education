import React from "react";
import { colors } from "../../util/constant/colors";

interface SelectInputProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: 10,
          minHeight: 50,
          borderColor:colors.black7,
          color: value ? colors.black : colors.black8, // Changes color based on value


        }}
      >
        <option value="" disabled color="#fff" >
          Select {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
