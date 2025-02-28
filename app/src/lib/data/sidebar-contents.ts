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
      logo: "https://th.bing.com/th/id/OIP.Bqw6FHMHNiPMibmTbRm38AAAAA?w=133&h=159&c=7&r=0&o=5&dpr=1.4&pid=1.7",
      version: "Enterprise",
    },
    {
      name: "ChatGPT",
      logo: "https://th.bing.com/th/id/OIP.z1E8uxTDBci7RVDO5ZX6SQHaHa?w=171&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
      version: "Startup",
    },
    {
      name: "DeevSeek-r1",
      logo: "https://www.mx-xz.com/ai-xzs/data-images/deepseek.png",
      version: "Free",
    },
    {
      name: "Perplexity",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eO4Crj6yrRt9eT-3bFIzdd0ANK_KdbcCxBbiFAcGFtRnWxjZOqVJIXZY_RZTIA47bVE&usqp=CAU",
      version: "Free",
    },
    {
      name: "Grok",
      logo: "https://logosandtypes.com/wp-content/uploads/2025/02/Grok.png",
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
