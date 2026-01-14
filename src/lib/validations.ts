import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const dashboardFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'pending', 'completed', 'cancelled']).optional(),
  priority: z.enum(['all', 'low', 'medium', 'high']).optional(),
  category: z.string().optional(),
  page: z.coerce.number().min(1).optional(),
  pageSize: z.coerce.number().min(5).max(100).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type DashboardFiltersFormData = z.infer<typeof dashboardFiltersSchema>;
