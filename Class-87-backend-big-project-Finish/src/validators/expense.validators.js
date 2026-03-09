import { z } from 'zod';

const createIndividualExpenseSchema = z.object({
    amount: z.number(),
    description: z.string().optional(),
    category: z.string(),
    subcategory: z.string(),
    date: z.string() 
});

const updateIndividualExpenseSchema = z.object({
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description cannot be empty'),

  amount: z
    .number({ required_error: 'Amount is required' })
    .positive('Amount must be greater than 0'),

  category: z
    .string({ required_error: 'Category ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Category ID format'),

  subcategory: z
    .string({ required_error: 'Subcategory ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Subcategory ID format')
    .optional(),

  date: z
    .string({ required_error: 'Date is required' })
    .refine(val => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),

//   paidBy: z
//     .string({ required_error: 'PaidBy user ID is required' })
//     .regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID format'),

//   splitType: z
//     .enum(['EQUAL', 'PERCENTAGE', 'FIXED'], {
//       required_error: 'Split type is required',
//     })
//     .default('EQUAL'),

//   splits: z
//     .array(
//       z.object({
//         user: z
//           .string({ required_error: 'User ID in splits is required' })
//           .regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID format'),
//         amount: z.number({ required_error: 'Split amount is required' }),
//         paid: z.boolean().optional(),
//       })
//     )
//     .optional(),

//   groups: z
//     .string({ required_error: 'Group ID is required' })
//     .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Group ID format')
//     .optional(),
});

export { createIndividualExpenseSchema, updateIndividualExpenseSchema };

