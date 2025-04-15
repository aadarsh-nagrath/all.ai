import NotFoundPage from "@/components/pages/misc/404";
import Workplace from "@/components/pages/workplace/workplace";
import Plugins from "@/components/pages/plugin-theme/plugins";
import Theme from "@/components/pages/plugin-theme/theme";
import TextGen from "@/components/pages/modals/text-generation";
import CreateAgents from "@/components/pages/ai-agents/create-agents";
import Notes from "@/components/pages/promptlib-notes/notes";
import PromptLib from "@/components/pages/promptlib-notes/prompt-lib";
import BrowseAgents from "@/components/pages/ai-agents/browse-agents";
import ImageGen from "@/components/pages/modals/image-generation";
import GetStarted from "@/components/pages/promptlib-notes/get-started";
import Account from "@/components/pages/settings/account-billing";
import GeneralSettings from "@/components/pages/settings/general-settings";
import SubsPage from "@/components/pages/pricing-page/plans";

const pageMap: Record<string, React.ReactNode> = {
  workplace: <Workplace />,
  plugins: <Plugins />,
  theme: <Theme />,
  "text-generation": <TextGen />,
  "create-agents": <CreateAgents />,
  "browse-agents": <BrowseAgents />,
  "image-generation": <ImageGen />,
  notes: <Notes />,
  "get-started": <GetStarted />,
  account: <Account />,
  "general-settings": <GeneralSettings />,
  "prompt-lib": <PromptLib />,
  "pricing-page": <SubsPage />,
};

export default async function DynamicRoute({ params }: { params: Promise<{ route: string }> }) {
  try {
    const { route } = await params;
    
    if (pageMap[route]) {
      return pageMap[route];
    }
    
    return <NotFoundPage />;
    
  } catch (error) {
    console.error("Error in DynamicRoute:", error);
    return <NotFoundPage />;
  }
}