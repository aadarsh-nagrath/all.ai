"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from "@/components/ui/code-block";
import { Check, Copy, Zap, Brain, Sparkles, Code, Palette, Cpu, Lock, Moon, Sun, BookOpen, Rocket, Shield, Layers, GitBranch, BarChart } from "lucide-react";
import { useTheme } from "next-themes";

const GetStartedPage = () => {
  const [copied, setCopied] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const [streamedJSX, setStreamedJSX] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const codeExample = `// Configure your LLM providers
const llm = new MultiLLM({
  providers: {
    openai: process.env.OPENAI_KEY,
    gemini: process.env.GEMINI_KEY,
    deepseek: process.env.DEEPSEEK_KEY,
    claude: process.env.CLAUDE_KEY,
    mistral: process.env.MISTRAL_KEY
  },
  theme: 'auto', // Automatically adapts to light/dark mode
  cache: true,   // Enable intelligent response caching
  fallback: {    // Automatic fallback configuration
    strategy: 'performance', // 'quality' or 'performance'
    order: ['gpt-4', 'claude-3', 'gemini-pro']
  }
});

// Query any model with consistent API
const response = await llm.query({
  model: 'gpt-4', // or 'gemini-pro', 'claude-3', etc.
  prompt: 'Explain quantum computing in simple terms',
  temperature: 0.7,
  max_tokens: 1000
});`;

  useEffect(() => {
    const jsxContent = `
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br dark:from-[#1e1e2e] dark:to-[#2e2e3e] from-[#f0f4ff] to-[#e0e8ff] shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="px-8 pb-8 pt-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full dark:bg-[#3a3a5d] bg-[#e0e8ff] p-3 animate-pulse">
            <Sparkles className="h-6 w-6 dark:text-purple-400 text-purple-600" />
          </div>
        </div>
        <h2 className="mb-3 text-xl font-semibold dark:text-white text-gray-900">Unified AI Platform</h2>
        <p className="mb-6 text-sm dark:text-[#ffffffaa] text-gray-600">
          Access ChatGPT, Gemini, DeepSeek and more in one place.
          <br />
          With stunning visual themes and powerful features.
        </p>
        <div className="flex gap-3 mb-4">
          <button className="flex-1 rounded-lg dark:bg-[#3a3a5d] bg-[#e0e8ff] dark:hover:bg-[#4a4a6d] hover:bg-[#d0d8ff] py-2 text-sm font-medium dark:text-white text-gray-900 transition-all duration-200 transform hover:-translate-y-0.5">
            Learn more
          </button>
          <button className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 py-2 text-sm font-medium text-white transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>Documentation</span>
          </div>
        </div>
      </div>
    </div>
    `;

    // Faster typewriter effect starting immediately
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < jsxContent.length) {
        setStreamedJSX(jsxContent.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 5); // Reduced from 10ms to 5ms for faster typing

    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      title: "Multiple AI Providers",
      description: "Seamlessly switch between ChatGPT, Gemini, DeepSeek, Claude, Mistral and more with a single API call. Compare outputs side-by-side or configure automatic fallback strategies.",
      icon: <Layers className="h-6 w-6" />,
      badge: "Integrated",
      stats: "10+ providers"
    },
    {
      title: "Visual Theme Engine",
      description: "Choose from 15+ beautiful themes or create your own. Our theme engine automatically adapts to light/dark mode and can be customized with CSS variables.",
      icon: <Palette className="h-6 w-6" />,
      badge: "Customizable",
      stats: "15+ themes"
    },
    {
      title: "TypeScript First",
      description: "Fully typed API with exhaustive documentation. Auto-complete and type checking out of the box. We generate TypeScript definitions for all responses.",
      icon: <Code className="h-6 w-6" />,
      badge: "Typed",
      stats: "100% coverage"
    },
    {
      title: "Performance Optimized",
      description: "Intelligent caching, parallel requests, and automatic retries. Built-in request deduplication and response streaming for maximum efficiency.",
      icon: <Cpu className="h-6 w-6" />,
      badge: "Fast",
      stats: "~200ms avg"
    },
    {
      title: "Enterprise Grade",
      description: "SOC 2 compliant infrastructure with audit logging. Role-based access control and data isolation. On-premise deployment options available.",
      icon: <Shield className="h-6 w-6" />,
      badge: "Secure",
      stats: "99.99% uptime"
    },
    {
      title: "Active Ecosystem",
      description: "Weekly updates with new models and features. Open-source community plugins and extensions. Commercial support available with SLAs.",
      icon: <GitBranch className="h-6 w-6" />,
      badge: "Growing",
      stats: "50+ plugins"
    },
    {
      title: "Analytics Dashboard",
      description: "Track usage, costs, and performance across all providers. Set budgets and receive alerts. Export data to your analytics platform.",
      icon: <BarChart className="h-6 w-6" />,
      badge: "Insights",
      stats: "Real-time"
    },
    {
      title: "Migration Tools",
      description: "Easy transition from single-provider implementations. Automatic API translation and compatibility layers. Side-by-side testing mode.",
      icon: <Rocket className="h-6 w-6" />,
      badge: "Easy Onboarding",
      stats: "1-day setup"
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-[#f9fafb] to-[#f0f4f8]">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.03] [background:radial-gradient(ellipse_at_center,var(--primary)_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }} // Faster animation
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium px-4 py-2 rounded-full inline-flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                Documentation
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Unified AI Platform
              </span>
            </h1>
            <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
              The most comprehensive toolkit for building with multiple LLMs. Access all major AI providers through a single, elegant API with built-in failover, analytics, and stunning visual themes.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }} // Faster animation
              className="flex-1 max-w-2xl"
            >
              <div dangerouslySetInnerHTML={{ __html: streamedJSX }} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }} // Faster animation with shorter delay
              className="flex-1 w-full max-w-xl"
            >
              <div className="mb-3 flex justify-start">
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  <span>Now with Claude 3.5 support!</span>
                </div>
              </div>
              <CodeBlock className="border dark:border-gray-700 border-gray-200 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CodeBlockGroup className="border-b dark:border-gray-700 border-gray-200 px-4 py-3 dark:bg-gray-800 bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                      TypeScript
                    </div>
                    <span className="dark:text-gray-400 text-gray-500 text-sm">Example: Multi-Provider Setup</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 dark:hover:bg-gray-700 hover:bg-gray-200 rounded-full"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CodeBlockGroup>
                <CodeBlockCode 
                  code={codeExample} 
                  language="typescript" 
                  theme={theme === "dark" ? "github-dark" : "github-light"}
                  className="dark:!bg-gray-900 !bg-white"
                />
              </CodeBlock>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 dark:bg-gray-900/50 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-lg dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, scale, and optimize AI applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border dark:border-gray-700 border-gray-200 dark:bg-gray-800/50 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br dark:from-purple-900/10 dark:to-blue-900/10 from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white p-3">
                      {feature.icon}
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">{feature.title}</h3>
                  <p className="dark:text-gray-300 text-gray-600 text-sm mb-3">{feature.description}</p>
                  <p className="text-xs font-medium dark:text-purple-400 text-purple-600">{feature.stats}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br dark:from-[#1e1e2e] dark:to-[#2e2e3e] from-purple-600 to-blue-600 text-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Join 10,000+ developers</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to supercharge your AI development?
            </h2>
            <p className="text-lg dark:text-gray-300 text-gray-100 max-w-3xl mx-auto mb-8">
              Get started in minutes with our comprehensive documentation and examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                <Rocket className="h-5 w-5 mr-2" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white group">
                <BookOpen className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedPage;