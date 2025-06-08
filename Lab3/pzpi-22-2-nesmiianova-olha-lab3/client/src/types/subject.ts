export interface Subject {
  _id: string;
  title: string;
  name?: string;
  description?: string;
  teacherId?: string;
  students?: string[];
  credits?: number;
  semester?: number;
} 