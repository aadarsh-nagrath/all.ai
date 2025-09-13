import { ThemeStyleController } from "./types"
import { DefaultThemeController } from "./default"
import { GradientSwiftThemeController } from "./gradient-swift"
import { UniversalThemeController } from "./universal"
import { SkyfallThemeController } from "./skyfall"
import { FlareThemeController } from "./flare"

const controllers: Record<string, ThemeStyleController> = {
  [DefaultThemeController.id]: DefaultThemeController,
  [GradientSwiftThemeController.id]: GradientSwiftThemeController,
  [UniversalThemeController.id]: UniversalThemeController,
  [SkyfallThemeController.id]: SkyfallThemeController,
  [FlareThemeController.id]: FlareThemeController,
}

export function getThemeStyleController(id: string): ThemeStyleController | undefined {
  return controllers[id]
}

export function initPersistedThemeStyle() {
  if (typeof window === 'undefined') return
  try {
    const v = window.localStorage.getItem('pluginThemeStyle')
    if (!v) {
      // No style persisted -> apply default
      const def = getThemeStyleController(DefaultThemeController.id)
      def?.apply()
      return
    }
    const controller = getThemeStyleController(v)
    if (controller) controller.apply()
  } catch {}
}

export function applyThemeStyle(themeId: string) {
  if (typeof window === 'undefined') return
  
  // Store the theme selection regardless of current page
  try {
    localStorage.setItem('pluginThemeStyle', themeId)
  } catch {}
  
  // Only apply theme if currently on workplace page
  const currentPath = window.location.pathname
  if (currentPath.includes('/workplace')) {
    // First, remove all existing theme classes and video elements
    const allClasses = ['gradient-swift-workspace-theme', 'universal-theme', 'skyfall-theme', 'flare-theme']
    allClasses.forEach(className => {
      document.body.classList.remove(className)
    })
    
    // Remove all video elements
    const videoIds = ['universal-bg-video', 'skyfall-bg-video', 'flare-bg-video']
    videoIds.forEach(id => {
      const video = document.getElementById(id)
      if (video) video.remove()
    })
    
    // Apply the new theme
    const controller = getThemeStyleController(themeId)
    if (controller) {
      controller.apply()
    }
  } else {
    // If not on workplace, remove all themes
    removeAllThemes()
  }
}

export function removeAllThemes() {
  if (typeof window === 'undefined') return
  
  // Remove all theme classes
  const allClasses = ['gradient-swift-workspace-theme', 'universal-theme', 'skyfall-theme', 'flare-theme']
  allClasses.forEach(className => {
    document.body.classList.remove(className)
  })
  
  // Remove all video elements
  const videoIds = ['universal-bg-video', 'skyfall-bg-video', 'flare-bg-video']
  videoIds.forEach(id => {
    const video = document.getElementById(id)
    if (video) video.remove()
  })
}


