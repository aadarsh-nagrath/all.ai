import { ThemeStyleController } from "./types"

const CLASS_NAMES = ['gradient-swift-workspace-theme', 'universal-theme', 'skyfall-theme', 'flare-theme']
const PERSIST_KEY = 'pluginThemeStyle'

function removeAll() {
  if (typeof document === 'undefined') return
  CLASS_NAMES.forEach(c => document.body.classList.remove(c))
}

export const DefaultThemeController: ThemeStyleController = {
  id: '1', // maps to "Modern Minimal" in mockThemeStyles
  persistKey: PERSIST_KEY,
  apply: () => {
    removeAll()
    // Remove all video elements
    const videos = ['universal-bg-video', 'skyfall-bg-video', 'flare-bg-video']
    videos.forEach(id => {
      const video = document.getElementById(id) as HTMLVideoElement | null
      if (video && video.parentElement) video.parentElement.removeChild(video)
    })
    try { window.localStorage.removeItem(PERSIST_KEY) } catch {}
  },
  remove: () => {
    removeAll()
  }
}

export { removeAll as removeAllPluginClasses }


