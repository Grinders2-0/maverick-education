import React, { memo } from "react";
import { colors } from "../../util/constant/colors";
import CircularProgress from "@mui/material/CircularProgress";
import "./CustomButton.css";
interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  showIcon?: boolean;
  iconSrc?: string;
  iconAlt?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  style,
  className,
  disabled = false,
  showIcon = false,
  iconSrc = "",
  iconAlt = "icon",
  isLoading = false,
}) => {
  const defaultStyles: React.CSSProperties = {
    backgroundColor: colors.primaryButtonBackground,
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "normal",
    transition: "background-color 0.3s, transform 0.3s",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: 0.5,
    minHeight: "45px",
  };

  const combinedStyles = { ...defaultStyles, ...style };

  const iconStyles: React.CSSProperties = {
    marginRight: "16px",
    width: "20px",
    height: "20px",
  };

  return (
    <button
      onClick={onClick}
      style={combinedStyles}
      className={className}
      disabled={disabled || isLoading} // Disable button if isLoading is true
    >
      {isLoading ? (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {showIcon && iconSrc && (
            <img src={iconSrc} alt={iconAlt} style={iconStyles} />
          )}
          {text}
        </>
      )}
    </button>
  );
};

export default memo(CustomButton);
