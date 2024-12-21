import { z } from 'zod';

const updateUserSchema = z.object({
  isBlocked: z.boolean({
    required_error: 'update info is required',
    invalid_type_error: 'the update data must be a boolean',
  }),
});

export const authValidations = {
  updateUserSchema,
};
