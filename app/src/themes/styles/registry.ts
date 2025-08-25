import { ThemeStyleController } from "./types"
import { GradientThemeController } from "./gradient"
import { DefaultThemeController } from "./default"

const controllers: Record<string, ThemeStyleController> = {
  [GradientThemeController.id]: GradientThemeController,
  [DefaultThemeController.id]: DefaultThemeController,
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


