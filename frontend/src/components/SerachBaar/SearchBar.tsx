import React, { memo } from "react";
import { colors } from "../../util/constant/colors";

type SearchBarProps = {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  onSearch: () => void;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
};

const SearchBar = ({
  value,
  setValue,
  placeholder = "Search...",
  onSearch,
  style,
  buttonStyle,
}: SearchBarProps) => {
  return (
    <div style={{ display: "flex", width: "100%", ...style }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          flexGrow: 1,
          padding: "10px",
          fontSize: "16px",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderWidth: 1,
          borderStyle: "solid",
          paddingLeft: 15,
        }}
      />
      <button
        onClick={onSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: colors.accent,
          color: colors.white,
          borderWidth: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          ...buttonStyle,
        }}
      >
        Search
      </button>
    </div>
  );
};

export default memo(SearchBar);
