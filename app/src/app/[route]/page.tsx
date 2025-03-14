import NotFoundPage from "@/pages/misc/404";
import LoginPage from "@/pages/auth-screen/auth";

export default async function DynamicRoute({ params }: { params: Promise<{ route: string }> }) {
  const { route } = await params; // ✅ Explicitly await params inside function

  if (route === "login") {
    return <LoginPage />;
  }

  return <NotFoundPage />;
}
