

type Currency = "USD" | "EUR" | "GBP" | string;


export type AccountStatus = {
  id: string;
  payoutsEnabled: boolean;
  chargesEnabled: boolean;
  detailsSubmitted: boolean;
  requirements: any[] | null;
  isActive: boolean;
  
  premium: boolean; // Have ever set subscription
  plans: CreatorPlans;

  monetization_enabled: boolean; 
};

export interface PlanSummary {
  benefits: string[];
  plans?: PaidPlan[]; // If is_paid
}

export interface PaidPlan {
  id: string;
  name: string; //"Monthly" | "Annual"
  price: number;
  currency: Currency;
  interval?: string; // optional if you want
}

export interface CreatorPlans {
  free: PlanSummary;
  paid: PlanSummary;
}
