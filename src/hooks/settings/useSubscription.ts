import { useState } from "react";
import { paymentsData, currencies } from "@/data/paymentsData";
import type { AccountStatus } from "@/types/subscription";
import { useQueryClient } from "@tanstack/react-query";
import type { CreatorPlans } from "@/types/subscription";
import { enablePayment } from "@/lib/api/subscription";
import { useRouter } from "next/navigation";
import type { PaidPlan } from "@/types/subscription";


export default function useSubscription() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ severity: "", message: "" });
  const accountStatus = queryClient.getQueryData<AccountStatus>([
    "accountStatus",
  ])!;

  const [pledgeAmounts, setPledgeAmounts] = useState(
    accountStatus.plans.paid.plans ||
    paymentsData.pledges.plans
  );

  let creatorFreePlanBenefits = accountStatus.plans.free.benefits;
  creatorFreePlanBenefits = creatorFreePlanBenefits.length ? creatorFreePlanBenefits : [
    "Access to public strategies, market insights, and community discussions.",
    "Limited accees to my safe personalized AI"
  ]
  const [freePlanBenefits, setFreePlanBenefits] = useState(creatorFreePlanBenefits);

  const [paidPlanBenefits, setPaidPlanBenefits] = useState(
    accountStatus.plans.paid.benefits ||
    [
      "Exclusive frameworks, deep-dives, and private playbooks.",
      "Unlimited 24/7 strategic guidance via my Cortex AI—trained on my specific business logic.",
      "Use my AI to audit your decisions and adapt my frameworks to your data.",
  ],
  );

  const handleFreeBenefitChange = (index: number, value: string) => {
    setFreePlanBenefits((prev) => ({
      ...prev,
      benefits: prev.map((b, i) => (i === index ? value : b)),
    }));
  };

  const handlePaidBenefitChange = (index: number, value: string) => {
    setPaidPlanBenefits((prev) => ({
      ...prev,
      benefits: prev.map((b, i) => (i === index ? value : b)),
    }));
  };

  const handleAmountChange = (name: string, value: string) => {
    // console.log("name", name);
    const max = name.toLowerCase() == "monthly" ? 29 : 290;
    const numericValue = Math.max(max, Number(value) || max);

    setPledgeAmounts((prev) =>
      prev.map((plan) =>
        plan.name.toLowerCase() === name.toLowerCase()
          ? { ...plan, price: numericValue  }
          : plan
      )
    );
  };

  const handleCurrencyChange = (id: string, currency: string) => {
    setPledgeAmounts((prev) =>
      prev.map((amount) =>
        amount.id === id ? { ...amount, currency } : amount
      )
    );
  };

  const handleEnablePayment = async () => {
    const plans: CreatorPlans = {
      free: {
        benefits: freePlanBenefits, // List[str]
      },
      paid: {
        benefits: paidPlanBenefits, // List[str]
        plans: pledgeAmounts
      },
    };
    try {
      setLoading(true);
      const res = await enablePayment(plans);
      setResponse({
        severity: "success",
        message: "You successfully enabled paid subscription.",
      });
    } catch (err) {
      setResponse({
        severity: "error",
        message: typeof err == "object" ? JSON.stringify(err) : String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  

  return {
    response,
    setResponse,
    accountStatus,
    pledgeAmounts,
    handleAmountChange,
    handleCurrencyChange,
    freePlanBenefits,
    handleFreeBenefitChange,
    paidPlanBenefits,
    loading,
    handleEnablePayment,
    router,
    handlePaidBenefitChange,
  };
}
