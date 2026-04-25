"use server";

import { z } from "zod";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { QuoteTemplate } from "@/emails/quote-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const quoteSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(30, "Phone number is too long"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  projectLocation: z
    .string()
    .min(2, "Please enter your project location")
    .max(200, "Location is too long"),
  selectedGarageId: z.string().nullish(),
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
    fullName: formData.get("fullName") || "",
    phone: formData.get("phone") || "",
    email: formData.get("email") || "",
    projectLocation: formData.get("projectLocation") || "",
    selectedGarageId: formData.get("selectedGarageId"),
  };

  const validated = quoteSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const emailHtml = await render(QuoteTemplate({
      ...validated.data,
      selectedGarageId: validated.data.selectedGarageId ?? undefined,
    }));
    
    const { data, error } = await resend.emails.send({
      from: "Amish Built Garages <onboarding@resend.dev>",
      to: ["azimbek_gulyamov@student.itpu.uz"],
      subject: `New Garage Quote Request: ${validated.data.fullName}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error details:", error);
      return {
        success: false,
        message: `Delivery failed: ${error.message || "Unknown API error"}`,
      };
    }
    
    console.log("Email sent successfully! ID:", data?.id);
  } catch (err) {
    console.error("Failed to render/send email:", err);
    return {
      success: false,
      message: "Something went wrong sending the email. Please try again or call us directly.",
    };
  }

  return {
    success: true,
    message:
      "Thank you! Your quote request has been submitted. We'll contact you within 24 hours.",
  };
}
