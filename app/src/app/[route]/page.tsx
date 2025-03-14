import LoginPage from "../../pages/auth-screen/auth";

export default function DynamicRoute({ params }: { params: { route: string } }) {
  const { route } = params;

  if (route === "login") {
    return <LoginPage />;
  }

  return <div>404 - Page Not Found</div>;
}