/** Garage style configuration for the visualizer catalog */
export interface GarageStyle {
  id: string;
  image: string;
  style: "standard" | "cape-cod";
  wallColor: string;
  doorType: "open-bay" | "panel-white" | "panel-brown";
  label: string;
}

/** Data submitted through the quote form */
export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  projectLocation: string;
  selectedGarageId?: string;
}

/** Steps displayed in the process timeline */
export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

/** Server action response */
export interface ActionResponse {
  success: boolean;
  message: string;
}
