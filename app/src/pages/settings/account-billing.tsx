import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useState } from "react";

// Mock Data
const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  profilePicture: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
  apiKeys: ["key-1", "key-2"],
  subscription: {
    plan: "Pro",
    status: "Active",
    nextBillingDate: "March 15, 2025",
    amount: "$29.99/month"
  },
  paymentHistory: [
    { id: "#12345", date: "February 20, 2025", amount: "$29.99", status: "Paid" },
    { id: "#12346", date: "January 20, 2025", amount: "$29.99", status: "Paid" },
    { id: "#12347", date: "December 20, 2024", amount: "$29.99", status: "Paid" }
  ]
};

const AccountAndBilling = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);

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
              <img
                src={user.profilePicture}
                alt="Profile Picture"
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
                <p className="font-medium">{user.subscription.plan}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Next Billing</p>
                <p className="font-medium">{user.subscription.nextBillingDate}</p>
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
              {user.apiKeys.map((key, idx) => (
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
              {user.paymentHistory.map((payment) => (
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