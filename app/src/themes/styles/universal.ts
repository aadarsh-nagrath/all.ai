import { ThemeStyleController } from "./types"

const PERSIST_KEY = 'pluginThemeStyle'
const CLASS_NAME = 'universal-theme'

export const UniversalThemeController: ThemeStyleController = {
  id: 'universal',
  persistKey: PERSIST_KEY,
  apply: () => {
    if (typeof document === 'undefined') return
    
    const body = document.body
    // remove other theme classes
    body.classList.remove('gradient-workspace-theme', 'gradient-swift-workspace-theme', 'starry-night-theme')
    body.classList.add(CLASS_NAME)

    // ensure video exists
    let video = document.getElementById('universal-bg-video') as HTMLVideoElement | null
    if (!video) {
      video = document.createElement('video')
      video.id = 'universal-bg-video'
      video.autoplay = true
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.preload = 'auto'
      video.crossOrigin = 'anonymous'
      const stored = (() => { try { return window.localStorage.getItem('universalVideoSrc') } catch { return null } })()
      const src = stored || '/video-theme/starry-night.mp4'
      const source = document.createElement('source')
      source.src = src
      source.type = 'video/mp4'
      video.appendChild(source)
      // Fallback additional common paths
      if (!stored) {
        const alt1 = document.createElement('source')
        alt1.src = '/videos/starry-night.mp4'
        alt1.type = 'video/mp4'
        video.appendChild(alt1)
        const alt2 = document.createElement('source')
        alt2.src = '/starry-night.mp4'
        alt2.type = 'video/mp4'
        video.appendChild(alt2)
      }
      video.addEventListener('error', () => {
        console.error('[UniversalTheme] Video failed to load. Set localStorage.universalVideoSrc to a valid URL.')
      })
      document.body.appendChild(video)
    }
    try { video?.play() } catch {}
    try { window.localStorage.setItem(PERSIST_KEY, 'universal') } catch {}
  },
  remove: () => {
    if (typeof document === 'undefined') return
    document.body.classList.remove(CLASS_NAME)
    const video = document.getElementById('universal-bg-video') as HTMLVideoElement | null
    if (video && video.parentElement) video.parentElement.removeChild(video)
    try {
      const v = window.localStorage.getItem(PERSIST_KEY)
      if (v === 'universal') window.localStorage.removeItem(PERSIST_KEY)
    } catch {}
  }
}


