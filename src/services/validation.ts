import { z } from 'zod';

const SignupSchema = z.object({
    username: z.string(),
    password: z.string()
        .min(8, "Password must contain at least 8 characters")
        .regex(/\d/, "Password must contain at least 1 number")
        .regex(/[@#$^&*]/, "Password must contain at least 1 specific character")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
        .regex(/[a-z]/, "Password must contain at least 1 lowercase letter"),
    passwordRepeat: z.string(),
    email: z.string().email("Invalid email address"),
    agreeTerms: z.boolean(),
}).refine(data => data.password === data.passwordRepeat, {
    message: "The passwords did not match",
    path: ['passwordRepeat'],
})

export default SignupSchema;