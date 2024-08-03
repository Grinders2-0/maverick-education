import React, { CSSProperties, memo } from "react";

interface TextButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  style?: CSSProperties | undefined;
  textStyle?: CSSProperties | undefined;
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  onClick,
  className = "",
  isLoading = false,
  style,
  textStyle,
}) => {
  return (
    <div onClick={onClick} className={`text-button ${className}`} style={style}>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <label style={textStyle}>{text}</label>
      )}
    </div>
  );
};

export default memo(TextButton);
