import { z } from 'zod';

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
    })
    .min(3, { message: 'Name must be at least 3 characters' }),
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'Invalid email address' }),
  password: z.string({
    required_error: 'password is required',
  }),
});

export const userValidations = {
  userValidationSchema,
  loginValidationSchema,
};
