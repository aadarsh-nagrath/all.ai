import {
  AudioWaveform,
  BookOpen,
  Bot,
  Brain,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const sidebarcontent = {
  user: {
    name: "Login",
    email: "anagrath1@gmail.com",
    avatar: "https://i.pinimg.com/736x/46/42/6d/46426d4d7b3f760caa2bde62dc8e8923.jpg",
  },
  models: [
    {
      name: "Gemini",
      logo: GalleryVerticalEnd,
      version: "Enterprise",
    },
    {
      name: "ChatGPT",
      logo: AudioWaveform,
      version: "Startup",
    },
    {
      name: "DeevSeek-r1",
      logo: Command,
      version: "Free",
    },
    {
      name: "Perplexity",
      logo: PieChart,
      version: "Free",
    },
  ],
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
          { title: "Browse Agents", url: "#", key: "browse-agents" },
          { title: "Create Agents", url: "#", key: "create-agents" },
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
          { title: "Account | Billing", url: "#", key: "account" },
          { title: "General Settings", url: "#", key: "general-settings" },
        ],
      },
    ],
  chatmod: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
};
