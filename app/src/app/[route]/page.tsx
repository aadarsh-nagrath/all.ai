import NotFoundPage from "@/pages/misc/404";
import LoginPage from "@/pages/auth-screen/auth";

export default async function DynamicRoute({ params }: { params: { route: string } }) {
  const { route } = await params;

  if (route === "login") {
    return <LoginPage />;
  }

  return <div><NotFoundPage/></div>;
}