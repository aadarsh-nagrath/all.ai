// src/pages/layout.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { name: "Workplace", path: "/workplace" },
  { name: "Accounts", path: "/accounts" },
  { name: "Billing", path: "/billing" },
  { name: "Plugins", path: "/plugins" },
  { name: "Settings", path: "/settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-100 p-4 min-h-screen">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => router.push(item.path)}
                className={`block w-full text-left px-4 py-2 rounded-md ${
                  pathname === item.path ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
