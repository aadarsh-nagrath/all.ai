"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Subscription = {
  plan: string;
  date: Date;
  status: boolean;
  _id: string;
};

type Payment = {
  id: string;
  date: string;
  amount: string;
  status: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  active_subscription: Subscription;
  paymentHistory?: Payment[];
  apiKeys?: string[];
  __v: number;
};

const AccountAndBilling = () => {
  const { data: session, status } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch(`/api/user`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data: User = await response.json();
          setUser(data);
        } catch (error) {
          setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]); // ✅ Only runs when session/status change

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-muted/20 to-background p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Account & Billing</h1>
          <p className="text-muted-foreground mt-2">
            Please log in to view your account details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-muted/20 to-background p-8">
      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Account & Billing</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings, subscription, and payment history.
        </p>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Details Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <Image
                src={user.image}
                alt="Profile Picture"
                width={32}
                height={32}
                className="w-16 h-16 rounded-full border-2 border-primary"
              />
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full hover:bg-primary/10">
              Edit Profile
            </Button>
          </CardFooter>
        </Card>

        {/* Subscription Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Plan</p>
                <p className="font-medium">{user.active_subscription.plan}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Next Billing</p>
                <p className="font-medium">{new Date(user.active_subscription.date).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Status</p>
                <div className="flex items-center space-x-2">
                  <Switch checked={isSubscribed} onCheckedChange={setIsSubscribed} />
                  <span>{isSubscribed ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-end space-x-4">
            <Button variant="outline" size="sm" className="hover:bg-primary/10">
              Upgrade Plan
            </Button>
            <Button variant="destructive" size="sm">
              Cancel Subscription
            </Button>
          </CardFooter>
        </Card>

        {/* API Keys Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage your API keys</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.apiKeys?.map((key: string, idx: number) => (
                <div key={idx} className="flex justify-between items-center">
                  <p className="text-muted-foreground">{key}</p>
                  <div className="space-x-4">
                    <Button variant="outline" size="sm" className="hover:bg-primary/10">
                      Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(key)}
                      className="hover:bg-primary/10"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full hover:bg-primary/10">
              Generate New Key
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card className="mt-10 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View your past transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(user.paymentHistory || []).map((payment: Payment) => (
                <TableRow key={payment.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell className="text-green-500 dark:text-green-400">{payment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountAndBilling;