export interface ThemeStyleController {
  id: string
  apply: () => void
  remove: () => void
  persistKey?: string
}


