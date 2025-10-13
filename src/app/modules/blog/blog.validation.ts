import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z.string().min(5, "Description must be at least 10 characters"),
  content: z.string().min(5, "Content must be at least 20 characters long"),
  thumbnail: z.string({ error: "Thumbnail must be string" }).optional(),
  tags: z.array(z.string({message: "Tags must be in string" })).optional(),
  featured: z.boolean().optional().default(false),
  author: z.string().min(3, "Author name is required"),
});
