import { ThemeStyleController } from "./types"

export const SkyfallThemeController: ThemeStyleController = {
  id: "skyfall",
  
  apply() {
    if (typeof document === 'undefined') return
    
    // Apply theme class
    document.body.classList.add('skyfall-theme')
    
    // Inject video element
    let video = document.getElementById('skyfall-bg-video') as HTMLVideoElement | null
    if (!video) {
      video = document.createElement('video')
      video.id = 'skyfall-bg-video'
      video.autoplay = true
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.preload = 'auto'
      video.crossOrigin = 'anonymous'
      
      const src = '/video-theme/skyfall.mp4'
      const source = document.createElement('source')
      source.src = src
      source.type = 'video/mp4'
      video.appendChild(source)
      
      // Fallback additional common paths
      const alt1 = document.createElement('source')
      alt1.src = '/videos/skyfall.mp4'
      alt1.type = 'video/mp4'
      video.appendChild(alt1)
      
      const alt2 = document.createElement('source')
      alt2.src = '/skyfall.mp4'
      alt2.type = 'video/mp4'
      video.appendChild(alt2)
      
      video.addEventListener('error', () => {
        console.error('[SkyfallTheme] Video failed to load. Check if skyfall.mp4 exists in public/video-theme/')
      })
      
      document.body.appendChild(video)
    }
    
    // Store selection
    try {
      localStorage.setItem('pluginThemeStyle', this.id)
    } catch {}
  },
  
  remove() {
    if (typeof document === 'undefined') return
    
    // Remove theme class
    document.body.classList.remove('skyfall-theme')
    
    // Remove video element
    const video = document.getElementById('skyfall-bg-video')
    if (video) {
      video.remove()
    }
    
    // Clear selection
    try {
      localStorage.removeItem('pluginThemeStyle')
    } catch {}
  }
}
