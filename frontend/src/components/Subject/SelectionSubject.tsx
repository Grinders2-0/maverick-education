import React, { memo } from "react";
import "./Subject.css"; // Import your CSS file for custom styles
import { images } from "../../util/constant/images";

type Props = {
  subjectName: string;
  subjectCode: string;
  isSelected: boolean;
  onSelect: () => void;
  style?: React.CSSProperties;
  className?: string;
};

const SelectionSubject: React.FC<Props> = ({
  subjectName,
  subjectCode,
  isSelected,
  onSelect,
  style,
  className = "",
}) => {
  return (
    <div
      className={`subject-container ${
        isSelected ? "selected" : ""
      } ${className}`}
      style={{
        backgroundImage: `url(${images.subjectBG})`,
        ...style,
      }}
      onClick={onSelect}
    >
      <div>
        <h2 className="subject-name">{subjectName}</h2>
      </div>
      <p className="subject-code">{subjectCode}</p>
    </div>
  );
};

export default memo(SelectionSubject);
