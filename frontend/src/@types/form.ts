export interface ICollegeInfo {
  collegeId?: string;
  userId?: string;
  collegeName?: string;
  department?: string;
  enrollmentYear?: number;
  expectedGraduationYear?: number;
  enrollmentNumber?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ISubjectInfo {
  semester?: string;
  subjectCode?: string;
  subjectName?: string;
  grade?: string;
}

export interface ISPIS {
  semester?: string;
  spi?: number;
}
export interface IResultInfo {
  resultId?: string;
  userId?: string;
  currentSemester?: string;
  subjects?: ISubjectInfo[];
  spies?: ISPIS;
}
export enum EAttadance {
  One = "Always (90-100%)",
  Two = "Often (70-89%)",
  Three = "Sometimes (50-69%)",
}
export enum EParticipation {
  One = "Very Actively",
  Two = "Actively",
  Three = "Neutral",
}

export enum EAssignmentCompletion {
  One = "Always",
  Two = "Most of the time",
  Three = "Sometimes",
}

export enum EExamMotivation {
  One = "Highty Motivated",
  Two = "Moderately Motivated",
  Three = "Neutral",
}

export enum EPreferredMaterail {
  One = "Textbooks and Readings",
  Two = "Videos and Lectures",
  Three = "Interactive Simulations and Labs",
}

export interface IServay {
  surveyId?: string;
  userId?: string;
  attendace?: number;
  participation?: number;
  assignmentCompletion?: number;
  examMotivation?: number;
  preferredMaterial?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
