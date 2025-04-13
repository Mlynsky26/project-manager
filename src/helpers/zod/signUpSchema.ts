import { z } from "zod";
export const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Wymagane minimum 2 znaki" })
    .max(20, { message: "Maksimum 20 znaków" }),
  email: z
    .string()
    .email({ message: "Niepoprawny email" })
    .min(1, { message: "Email jest wymagany" }),
  password: z
    .string()
    .min(8, { message: "Hasło musi zawierać przynajmniej 8 znaków" })
    .max(20, { message: "Hasło musi zawierać maksymalnie 20 znaków" }),
});
