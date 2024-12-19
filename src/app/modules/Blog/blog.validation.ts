import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    content: z
      .string({
        required_error: 'content is required',
      })
      .min(100, {
        message: 'content must be at least 100 characters or above',
      }),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    content: z
      .string({
        required_error: 'content is required',
      })
      .min(100, {
        message: 'content must be at least 100 characters or above',
      })
      .optional(),
  }),
});
export const blogValidations = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
