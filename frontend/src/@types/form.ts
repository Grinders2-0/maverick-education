export interface IFromSlice {
  collegeDetail: ICollegeInfo;
  subjectDetail: ISubjectModel[];
  selectedSubjects: string[];
  surveyDetail: IServay;
  imageArray: File[];
  resultDetail: IStudentResult[];
  fullSubjectDetails: ISubjectModel[];
  courseDetail: ICourseDetail[];
}
interface IStudentGrade {
  subjectCode?: string;
  grade?: string;
  _id?: string;
}

export interface ICourseDetail {
  name?: string;
  url?: string;
  subjectName?: string;
  subjectUrl?: string;
  semester?: string;
}
export interface IStudentResult {
  _id?: string;
  userId?: string;
  grades?: IStudentGrade[];
  spi?: string;
  cgpa?: string;
  semester?: string;
  __v?: number;
}
export interface IStudentResults {
  results: IStudentResult[];
}
export interface ICollegeInfo {
  collegeId?: string;
  userId?: string;
  collegeName?: string;
  department?: string;
  enrollmentYear?: string;
  expectedGraduationYear?: string;
  enrollmentNumber?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  semester?: string;
}

export interface ISubjectModel {
  _id?: string;
  sname?: string;
  scode?: string;
  sem?: string;
  isDeleted?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ISPIS {
  semester?: string;
  spi?: number;
}
export interface IResultInfo {
  resultId?: string;
  userId?: string;
  currentSemester?: string;
  subjects?: number[];
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
