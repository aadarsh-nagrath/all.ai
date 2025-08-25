import { ThemeStyleController } from "./types"

const PERSIST_KEY = 'pluginThemeStyle'
const CLASS_NAME = 'gradient-workspace-theme'

export const GradientThemeController: ThemeStyleController = {
  id: 'gradient',
  persistKey: PERSIST_KEY,
  apply: () => {
    if (typeof document === 'undefined') return
    document.body.classList.add(CLASS_NAME)
    try { window.localStorage.setItem(PERSIST_KEY, 'gradient') } catch {}
  },
  remove: () => {
    if (typeof document === 'undefined') return
    document.body.classList.remove(CLASS_NAME)
    try {
      const v = window.localStorage.getItem(PERSIST_KEY)
      if (v === 'gradient') window.localStorage.removeItem(PERSIST_KEY)
    } catch {}
  }
}


