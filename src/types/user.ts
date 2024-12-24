export type Gender = "MALE" | "FEMALE";
export type ActivityLevel =
  | "SEDENTARY"
  | "LIGHT"
  | "MODERATE"
  | "VERY_ACTIVE"
  | "EXTREMELY_ACTIVE";

export interface CreateUserDto {
  name: string;
  email: string;
  phone?: string;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  mealFrequency: number;
}

export interface User {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
  name: string;
  email: string;
  phone?: string;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  mealFrequency: number;
  BMR: number | null;
  TDEE: number | null;
  stomachVolume: number | null;
  token: string;
}
