AI Agents SDK
An interactive sandbox environment for testing various AI agent patterns using the AI SDK. This environment showcases different agent architectures including sequential processing, routing, parallel processing, orchestrator-worker, and evaluator-optimizer patterns.

Features
- Multiple agent architectures and patterns
- Interactive testing interface
- Real-time visualization of outputs
- Built-in rate limiting protection
- Responsive mobile design  
- Management of history and examples

Installation
npx create-next-app@latest my-app --template=next-app-router
cd my-app
npm install @ai-sdk/openai ai zod mathjs lucide-react @radix-ui/react-tabs @radix-ui/react-accordion @monaco-editor/react @upstash/redis @upstash/ratelimit

Environment Variables
Create a .env.local file in your project root and add:

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

Rate Limiting
The environment includes IP-based rate limiting via Upstash Redis for protection:

- 10 requests per 10 seconds per IP
- Graceful handling of errors with countdown
- Counter for remaining requests
- Rate limiting distributed across instances

To adjust rate limit configuration, modify lib/rate-limit.ts:

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"), // Modify these parameters as needed
  analytics: true,
  prefix: "@upstash/ratelimit",
});

Usage
1. Configure your environment variables
2. Import the agent playground component
3. Begin testing different agent patterns

import { AgentPlayground } from "./components/agent-playground";

export default function Page() {
  return <AgentPlayground />;
}

Agent Patterns
Sequential Processing
- Tasks processed step-by-step
- Results depend on previous steps

Routing
- Smart classification of requests
- Dynamic routing to specialized handlers

Parallel Processing
- Tasks executed concurrently
- Results aggregated and synthesized

Orchestrator-Worker
- Tasks broken down and delegated
- Results coordinated and assembled

Evaluator-Optimizer
- Quality assessment of outputs
- Progressive refinement

Security
- Rate limiting by IP
- Validation and sanitization of inputs
- Protected environment variables
- API key security