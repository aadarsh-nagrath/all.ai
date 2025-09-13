import { ThemeStyleController } from "./types"

const PERSIST_KEY = 'pluginThemeStyle'
const CLASS_NAME = 'gradient-swift-workspace-theme'

export const GradientSwiftThemeController: ThemeStyleController = {
  id: 'gradient-swift',
  persistKey: PERSIST_KEY,
  apply: () => {
    if (typeof document === 'undefined') return
    
    document.body.classList.remove('gradient-workspace-theme')
    document.body.classList.add(CLASS_NAME)
    try { window.localStorage.setItem(PERSIST_KEY, 'gradient-swift') } catch {}
  },
  remove: () => {
    if (typeof document === 'undefined') return
    document.body.classList.remove(CLASS_NAME)
    try {
      const v = window.localStorage.getItem(PERSIST_KEY)
      if (v === 'gradient-swift') window.localStorage.removeItem(PERSIST_KEY)
    } catch {}
  }
}


