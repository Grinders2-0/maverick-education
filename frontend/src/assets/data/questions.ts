export const questions = [
  {
    question: "How often do you attend your classes?",
    options: ["Always (90-100%)", "Often (70-89%)", "Sometimes (50-69%)"],
  },
  {
    question:
      "How actively do you participate in class activities (e.g., discussions, group work)?",
    options: ["Very Actively", "Actively", "Neutral"],
  },
  {
    question: "How often do you complete your assignments on time?",
    options: ["Always", "Most of the time", "Sometimes"],
  },
  {
    question: "How do you feel about studying during exam periods?",
    options: ["Highly Motivated", "Moderately Motivated", "Neutral"],
  },
  {
    question: "Which type of learning material do you prefer?",
    options: [
      "Textbooks and Readings",
      "Videos and Lectures",
      "Interactive Simulations and Labs",
    ],
  },
];
export type quetionProps = {
  question: string;
  options: string[];
};
