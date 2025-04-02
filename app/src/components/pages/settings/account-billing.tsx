"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useUploadThing } from "@/lib/uploadthing";
import { useImageUpload } from "@/hooks/use-image-upload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ImagePlus, X, Calendar as CalendarIcon } from "lucide-react";
import { useId } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/data/countries";

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
  firstName: string;
  lastName: string;
  country?: string;
  dob?: Date;
  bio: string;
  email: string;
  image: string;
  profileBg?: string;
  active_subscription: Subscription;
  paymentHistory?: Payment[];
  apiKeys?: string[];
  __v: number;
};

const AccountAndBilling = () => {
  const { data: session, status, update } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
  }, [session, status]);

  const handleSaveProfile = async (formData: FormData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      
      await update({
        ...session,
        user: {
          ...session?.user,
          name: updatedUser.name,
          image: updatedUser.image
        }
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

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

  const EditProfileModal = () => {
    const id = useId();
    const maxLength = 180;
    const [dob, setDob] = useState<Date | undefined>(user.dob ? new Date(user.dob) : undefined);
    const [country, setCountry] = useState(user.country || "");
    
    const { startUpload: uploadProfileImage } = useUploadThing("profileImage");
    const { startUpload: uploadProfileBg } = useUploadThing("profileBackground");

    const {
      value: bioValue,
      characterCount,
      handleChange: handleBioChange,
      maxLength: limit,
    } = useCharacterLimit({
      maxLength,
      initialValue: user.bio || "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSaving(true);
      
      const formData = new FormData(e.currentTarget);
      
      if (dob) formData.set("dob", dob.toISOString());
      formData.set("country", country);

      const imageFile = formData.get("image") as File | null;
      if (imageFile && imageFile.size > 0) {
        const uploaded = await uploadProfileImage([imageFile]);
        if (uploaded?.[0]?.url) {
          formData.set("image", uploaded[0].url);
        }
      }

      const bgFile = formData.get("profileBg") as File | null;
      if (bgFile && bgFile.size > 0) {
        const uploaded = await uploadProfileBg([bgFile]);
        if (uploaded?.[0]?.url) {
          formData.set("profileBg", uploaded[0].url);
        }
      }

      await handleSaveProfile(formData);
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full hover:bg-primary/10">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b border-border px-6 py-4 text-base">
              Edit profile
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Make changes to your profile here.
          </DialogDescription>
          <div className="overflow-y-auto">
            <ProfileBg defaultImage={user.profileBg} />
            <Avatar defaultImage={user.image} />
            <div className="px-6 pb-6 pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`${id}-first-name`}>First name</Label>
                    <Input
                      id={`${id}-first-name`}
                      name="firstName"
                      placeholder="First name"
                      defaultValue={user.firstName || ""}
                      type="text"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`${id}-last-name`}>Last name</Label>
                    <Input
                      id={`${id}-last-name`}
                      name="lastName"
                      placeholder="Last name"
                      defaultValue={user.lastName || ""}
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dob && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dob}
                        onSelect={setDob}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${id}-country`}>Country</Label>
                  <select
                    id={`${id}-country`}
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select country</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${id}-bio`}>Biography</Label>
                  <Textarea
                    id={`${id}-bio`}
                    name="bio"
                    placeholder="Write a few sentences about yourself"
                    defaultValue={bioValue}
                    maxLength={maxLength}
                    onChange={handleBioChange}
                    aria-describedby={`${id}-description`}
                  />
                  <p
                    id={`${id}-description`}
                    className="mt-2 text-right text-xs text-muted-foreground"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="tabular-nums">{limit - characterCount}</span> characters left
                  </p>
                </div>
                <DialogFooter className="border-t border-border px-0 pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const ProfileBg = ({ defaultImage }: { defaultImage?: string }) => {
    const [hideDefault, setHideDefault] = useState(false);
    const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange, handleRemove } =
      useImageUpload();

    const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

    const handleImageRemove = () => {
      handleRemove();
      setHideDefault(true);
    };

    return (
      <div className="h-32">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
          {currentImage && (
            <img
              className="h-full w-full object-cover"
              src={currentImage}
              alt={previewUrl ? "Preview of uploaded image" : "Default profile background"}
              width={512}
              height={96}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
              onClick={handleThumbnailClick}
              aria-label={currentImage ? "Change image" : "Upload image"}
            >
              <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
            </button>
            {currentImage && (
              <button
                type="button"
                className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                onClick={handleImageRemove}
                aria-label="Remove image"
              >
                <X size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          name="profileBg"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload image file"
        />
      </div>
    );
  };

  const Avatar = ({ defaultImage }: { defaultImage?: string }) => {
    const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange } = useImageUpload();

    const currentImage = previewUrl || defaultImage;

    return (
      <div className="-mt-10 px-6">
        <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
          {currentImage && (
            <img
              src={currentImage}
              className="h-full w-full object-cover"
              width={80}
              height={80}
              alt="Profile image"
            />
          )}
          <button
            type="button"
            className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label="Change profile picture"
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            name="image"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            aria-label="Upload profile picture"
          />
        </div>
      </div>
    );
  };

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
                unoptimized={true} 
              />
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                {user.country && <p className="text-muted-foreground mt-1 text-sm">{user.country}</p>}
                {user.dob && <p className="text-muted-foreground mt-1 text-sm">DOB: {format(new Date(user.dob), "MMM d, yyyy")}</p>}
                {user.bio && <p className="text-muted-foreground mt-2 text-sm">{user.bio}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <EditProfileModal />
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