import { z } from "zod";

const ClientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("Snip & Style"),
});

const parsed = ClientEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
});

if (!parsed.success) {
  console.error(
    "Invalid public env:",
    z.flattenError(parsed.error).fieldErrors,
  );
  throw new Error("Invalid public environment variables");
}

export const env = parsed.data;
