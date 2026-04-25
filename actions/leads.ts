"use server";

import { z } from "zod";

const quoteSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  projectLocation: z
    .string()
    .min(2, "Please enter your project location")
    .max(200, "Location is too long"),
  selectedGarageId: z.string().optional(),
});

export type QuoteFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitQuote(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const rawData = {
    fullName: formData.get("fullName") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    projectLocation: formData.get("projectLocation") as string,
    selectedGarageId: formData.get("selectedGarageId") as string | undefined,
  };

  const validated = quoteSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // TODO: Integrate Resend email here
  // For now, log the data
  console.log("📧 New quote submission:", validated.data);

  // Simulate a small delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message:
      "Thank you! Your quote request has been submitted. We'll contact you within 24 hours.",
  };
}
