import { z } from "zod";

// POST body
export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
});

// PATCH body
export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").optional(),
    completed: z.boolean().optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "No fields to update",
  });

// GET /api/tasks query
export const listTasksQuerySchema = z.object({
  search: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  completed: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});
