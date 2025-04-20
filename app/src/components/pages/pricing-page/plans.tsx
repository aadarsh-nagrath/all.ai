import PricingSection from "./pricing-section"

export const PAYMENT_FREQUENCIES = ["monthly", "yearly"]

export const TIERS = [
  {
    id: "basic",
    name: "Basic",
    price: 49,
    description: "For your basic ai chat needs",
    features: [
      "Remove Ads/Popups",
      "Basic Chat ",
      "30 image generation limit",
      "Unlock AI Agents",
      "Voice Input",
      "Share Chats",
      "Basic Themes",
    ],
    cta: "Get started",
  },
  {
    id: "standard",
    name: "Standard",
    price: 75,
    description: "Great for great features",
    features: [
      "500 Image Generation",
      "Web Search",
      "Text-to-Speech",
      "Vision / Images",
      "Upload Documents",
      "7 Amazing themes",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 99,
    description: "Great if need everything",
    features: [
      "Unlimited Plugins",
      "Notes",
      "Artifacts",
      "Free Updates",
      "More Theme Access",
    ],
    cta: "Get started",
  },
  {
    id: "custom",
    name: "Custom",
    price: "Custom",
    description: "For your custom preference",
    features: [
      "Personalized theme for your llm",
      "Personalized Features",
      "Personal consultation and support",
      "Priority Support"
    ],
    cta: "Contact Us",
    highlighted: true,
  },
]

export default function SubsPage() {
  return (
    <div className="relative flex justify-center items-center w-full mt-20 scale-90">
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>
        <PricingSection
          title="Simple Pricing"
          subtitle="Choose the best plan for your needs"
          tiers={TIERS}
        />
    </div>
  );
}