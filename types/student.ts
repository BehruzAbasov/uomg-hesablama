export interface Student {
  id: string;
  student_code: string;
  fullname: string;
  group_id: string;
}

export interface Submission {
  student_id: string;
  gpa: number;
}