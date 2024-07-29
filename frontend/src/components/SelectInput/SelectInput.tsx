import React from "react";

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
    <div
      style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
    >
      <select
        value={value}
        onChange={onChange}
        style={{
          flexGrow: 1,
          padding: "0.5rem",
          borderRadius: 10,
          minHeight: 45,
          marginLeft: 15,
        }}
      >
        <option value="" disabled color="#fff">
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
