import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(15, "Name must be no longer than 15 characters"),
  email: z.string().email("Please enter a valid email address").optional(), // 이메일 필드를 옵셔널로 설정
  phone: z
    .string()
    .optional() // 전화번호 필드를 옵셔널로 설정
    .refine(
      (val) => !val || val.length === 13, // 값이 없거나 13자여야 함
      "Phone number must be 13 digits if provided"
    ),
  weight: z.number().min(1, "Weight must be greater than 0"),
  height: z.number().min(1, "Height must be greater than 0"),
  age: z.number().min(14, "Age must be at least 14"),
  gender: z
    .enum(["MALE", "FEMALE"])
    .refine(
      (val) => val === "MALE" || val === "FEMALE",
      "Please select a valid gender"
    ),
  activityLevel: z
    .enum(["SEDENTARY", "LIGHT", "MODERATE", "VERY_ACTIVE", "EXTREMELY_ACTIVE"])
    .refine(
      (val) =>
        [
          "SEDENTARY",
          "LIGHT",
          "MODERATE",
          "VERY_ACTIVE",
          "EXTREMELY_ACTIVE",
        ].includes(val),
      "Please select a valid activity level"
    ),
  mealFrequency: z
    .number()
    .min(1, "Meal frequency must be at least 1")
    .max(10, "Meal frequency should not exceed 10 meals per day"),
  check: z.boolean().refine((val) => val === true, {
    message: "check must be true",
  }),
});
