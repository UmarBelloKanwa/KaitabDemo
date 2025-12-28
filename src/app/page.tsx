import { SiteHeader } from "@/components/ui/problems/site-header";
import { HeroSection } from "@/components/ui/problems/hero-section";
import { ProblemsSection } from "@/components/ui/problems/problems-section";
import { SolutionSection } from "@/components/ui/problems/solution-section";
import { CTASection } from "@/components/ui/problems/cta-section";
import Box from "@mui/material/Box";
import Footer from "@ui/common/Footer";

// import AboutPage from "@/app/(info)/about/page";
// import InfoLayout from "@/app/(info)/layout";

// export default async function LandingPage() {
//   return (
//     <InfoLayout>
//       <AboutPage />
//     </InfoLayout>
//   );
// }

export default function Page() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <SiteHeader />
      <Box component="main">
        <HeroSection />
        <ProblemsSection />
        <SolutionSection />
        <CTASection />
      </Box>
      <Footer />
    </Box>
  );
}
