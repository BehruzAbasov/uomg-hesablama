export const PASS_THRESHOLD = 65;
export const FAIL_THRESHOLD = 65;

export const GRADE_SCALE = {
  A: { min: 90, max: 100, display: "A" },
  B: { min: 80, max: 89, display: "B" },
  C: { min: 70, max: 79, display: "C" },
  D: { min: 65, max: 69, display: "D" },
  F: { min: 0, max: 64, display: "F" },
} as const;

export const getGradeStatus = (grade: number): "passed" | "failed" => {
  return grade >= PASS_THRESHOLD ? "passed" : "failed";
};

export const getGradeLetter = (grade: number): string => {
  for (const [letter, range] of Object.entries(GRADE_SCALE)) {
    if (grade >= range.min && grade <= range.max) {
      return letter;
    }
  }
  return "N/A";
};
