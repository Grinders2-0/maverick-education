import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerLabel from "../../../../components/Drawer/DrawerLabel";
import { images } from "../../../../util/constant/images";
import { colors } from "../../../../util/constant/colors";

// Define a type for the label data
interface Label {
  title: string;
  image: string;
  path?: string;
  external?: boolean;
}

// Define an array of labels with their properties
const labels: Label[] = [
  { title: "Dashboard", image: images.DashBoard1, path: "/home/dashboard" },
  { title: "Subjects", image: images.Subject, path: "/home/subject" },
  { title: "Courses", image: images.Course, path: "/home/course" },
  { title: "Request an Feature", image: images.RequestFeature, external: true },
  { title: "Report & Issue", image: images.ReportAnIssue, external: true },
  { title: "About", image: images.About, external: true },
  { title: "LogOut", image: images.LogOut, external: true },
];
type props = {
  selectedLabel?: string | undefined;
  setSelectedLabel?: (a: string) => void;
};
const Body = ({ selectedLabel, setSelectedLabel }: props) => {
  const navigate = useNavigate();

  const handleLabelClick = (label: Label) => {
    setSelectedLabel && setSelectedLabel(label.title);
    if (label.external) {
      // Open an external link (you can replace with actual URLs)
      window.open(
        "https://airtable.com/appJyDizwnhHgtfzi/shreRAjhOQg4gGNuT",
        "_blank"
      );
    } else if (label.path) {
      navigate(label.path);
    }
  };

  return (
    <div style={{ background: colors.accent }}>
      {labels.map((label) => (
        <DrawerLabel
          key={label.title}
          image={label.image}
          title={label.title}
          isSelected={selectedLabel === label.title}
          onClick={() => handleLabelClick(label)}
        />
      ))}
    </div>
  );
};

export default memo(Body);
