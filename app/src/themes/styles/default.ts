import { ThemeStyleController } from "./types"

const CLASS_NAMES = ['gradient-workspace-theme']
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
    try { window.localStorage.removeItem(PERSIST_KEY) } catch {}
  },
  remove: () => {
    removeAll()
  }
}

export { removeAll as removeAllPluginClasses }


