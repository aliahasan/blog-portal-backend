import { z } from 'zod';

const blogValidationSchema = z.object({
  title: z.string({
    required_error: 'title is required',
  }),
  content: z
    .string({
      required_error: 'content is required',
    })
    .min(20, {
      message: 'content must be at least 100 characters or above',
    }),
});
const updateBlogValidationSchema = z.object({
  title: z
    .string({
      required_error: 'title is required',
    })
    .optional(),
  content: z
    .string({
      required_error: 'content is required',
    })
    .optional(),
});
export const blogValidations = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
