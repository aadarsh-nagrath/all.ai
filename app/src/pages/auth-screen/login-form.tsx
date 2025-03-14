"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession, signIn } from "next-auth/react";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { data: session } = useSession();

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        {/* Google Login Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: "/" })} // Directly call signIn("google")
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#4285F4"
              d="M23.494 12.272c0-.855-.07-1.49-.223-2.138H12v4.177h6.637c-.302 1.58-1.17 2.924-2.487 3.838v3.193h4.02c2.363-2.16 3.724-5.355 3.724-9.07z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.951-1.08 7.935-2.924l-4.02-3.193c-1.07.72-2.46 1.152-3.915 1.152-3.007 0-5.568-2.032-6.482-4.785H1.372v3.05C3.352 20.558 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.518 14.25c-.245-.72-.385-1.485-.385-2.25s.14-1.53.385-2.25V6.7H1.372A11.997 11.997 0 000 12c0 1.98.462 3.855 1.372 5.3l4.146-3.05z"
            />
            <path
              fill="#EA4335"
              d="M12 4.5c1.77 0 3.345.615 4.59 1.81l3.39-3.39C17.951 1.08 15.24 0 12 0 7.33 0 3.352 3.442 1.372 6.7L5.518 9.75c.914-2.753 3.475-5.25 6.482-5.25z"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}