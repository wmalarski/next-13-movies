import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_TMDB_API_KEY: z.string(),
});

export const serverEnv = schema.parse(process.env);
