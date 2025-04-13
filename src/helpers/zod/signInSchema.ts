import { z } from "zod";

const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Niepoprawny email" })
    .min(1, { message: "Email jest wymagany" }),
  password: z
    .string()
    .min(8, { message: "Hasło musi zawierać przynajmniej 8 znaków" })
    .max(20, { message: "Hasło musi zawierać maksymalnie 20 znaków" }),
});

export default SignInSchema;
