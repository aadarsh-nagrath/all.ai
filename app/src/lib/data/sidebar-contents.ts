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
        { title: "Plugins", url: "/#" },
        { title: "Theme", url: "/#" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        { title: "Text Generation", url: "#" },
        { title: "Image Generation", url: "#" },
      ],
    },
    {
      title: "AI Agents",
      url: "#",
      icon: Brain,
      items: [
        { title: "Browse Agents", url: "#" },
        { title: "Create Agents", url: "#" },
      ],
    },
    {
      title: "Prompt Library & Notes",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Get Started", url: "#" },
        { title: "Prompt Library", url: "#" },
        { title: "Notes", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Account", url: "#" },
        { title: "Billing", url: "#" },
        { title: "General Settings", url: "#" },
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
