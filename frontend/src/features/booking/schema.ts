import { z } from "zod";

export const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
] as const;

const phoneRegex = /^[+0-9()\-\s]{7,20}$/;

export const bookingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please share your full name")
    .max(80, "That's a bit long — keep it under 80 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "We need a phone number to confirm")
    .regex(phoneRegex, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  category: z.enum(["women", "men"], {
    message: "Pick a studio",
  }),
  serviceSlug: z.string().min(1, "Pick a service"),
  date: z
    .string()
    .min(1, "Choose a date")
    .refine((v) => {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d.getTime() >= today.getTime();
    }, "Date must be today or later"),
  time: z.enum(TIME_SLOTS, { message: "Pick a time" }),
  notes: z
    .string()
    .max(500, "Keep your note under 500 characters")
    .optional(),
});

export type BookingValues = z.infer<typeof bookingSchema>;
