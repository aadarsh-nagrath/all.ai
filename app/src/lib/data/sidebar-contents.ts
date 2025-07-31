import {
  BookOpen,
  Bot,
  Brain,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const sidebarcontent = {
  user: {
    name: "Login",
    email: "v.0.0.1",
    avatar: "https://i.pinimg.com/736x/46/42/6d/46426d4d7b3f760caa2bde62dc8e8923.jpg",
  },
  navMain: [
    {
      title: "Plugins & Themes",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Plugins", url: "#", key: "plugins" },
        { title: "Theme", url: "#", key: "theme" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        { title: "Text Generation", url: "#", key: "text-generation" },
        { title: "Image Generation", url: "#", key: "image-generation" },
      ],
    },
    {
      title: "AI Agents",
      url: "#",
      icon: Brain,
      items: [
        { title: "Explore Agents", url: "#", key: "explore-agents" },
        { title: "Agent Kit", url: "#", key: "agent-kit" },
      ],
    },
    {
      title: "Prompt Library & Notes",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Get Started", url: "#", key: "get-started" },
        { title: "Prompt Library", url: "#", key: "prompt-lib" },
        { title: "Notes", url: "#", key: "notes" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Account & Billing", url: "#", key: "account" },
        { title: "General Settings", url: "#", key: "general-settings" },
      ],
    },
  ],
};
