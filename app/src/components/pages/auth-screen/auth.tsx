import { GalleryVerticalEnd } from "lucide-react"
import Image from 'next/image'

import LoginForm  from "./login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-3 md:justify-start">
        <a
          href="#"
          className="flex items-center gap-3 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:text-primary"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-md text-white">
            <GalleryVerticalEnd className="size-5 animate-pulse" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 hover:from-blue-500 hover:to-purple-500">
            All in one
          </span>
        </a>
      </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/images/panda-login.jpg"
          alt="Image"
          width={500}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
