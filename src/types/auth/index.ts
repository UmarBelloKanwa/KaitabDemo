export interface Category {
  id: number;
  name: string;
}

export interface Topic {
  id: number;
  name: string;
  category_id: number;
  category: Category;
}

// export interface UseUserTopicsProps {
//     maxSelections?: number;
// }

// Grouped topics by category name
export type TopicMap = Record<string, Topic[]>;


// Define your signup steps
export type SignupStep = "interests" | "personalInfo" | "credentials" | "verify-otp";


export interface Interest {
  id: number;
  category_id: number;
}


// Data interfaces
export interface SignupData {
  interests: Interest[]; // selected topic ids
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  email: string;
  password: string;
  confirmPassword: string; // new field
  otpCode?: string;
}

export interface SignupContextType {
  currentStep: SignupStep;
  setStep: (step: SignupStep) => void;
  data: SignupData;
  updateData: (partial: Partial<SignupData>) => void;
  reset: () => void;
}

