import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>All AI</span>,
  project: {
    link: 'https://github.com/all-ai/documentation',
  },
  chat: {
    link: 'https://discord.gg/allai',
  },
  docsRepositoryBase: 'https://github.com/all-ai/documentation',
  footer: {
    text: '© 2025 All AI - Comprehensive Artificial Intelligence Platform',
  },
  head: (
    <>
      <meta name="description" content="All AI - Comprehensive documentation for artificial intelligence tools, models, and applications" />
      <meta name="og:title" content="All AI Documentation" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – All AI'
    }
  },
  primaryHue: 220,
  darkMode: true,
}

export default config
