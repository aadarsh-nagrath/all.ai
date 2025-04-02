"use client";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
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
import { Check, ImagePlus, X } from "lucide-react";
import { useId, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/data/countries"; // You'll need to create this

function EditProfileModal({ user, onSave }: { user: any, onSave: (data: FormData) => Promise<void> }) {
  const id = useId();
  const maxLength = 180;
  const [dob, setDob] = useState<Date | undefined>(user.dob ? new Date(user.dob) : undefined);
  const [country, setCountry] = useState(user.country || "");
  const [isSaving, setIsSaving] = useState(false);
  
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
    
    // Add dob and country to form data
    if (dob) formData.set("dob", dob.toISOString());
    formData.set("country", country);

    // Handle image uploads
    const imageFile = formData.get("image") as File;
    if (imageFile.size > 0) {
      const uploaded = await uploadProfileImage([imageFile]);
      if (uploaded?.[0]?.url) {
        formData.set("image", uploaded[0].url);
      }
    }

    const bgFile = formData.get("profileBg") as File;
    if (bgFile.size > 0) {
      const uploaded = await uploadProfileBg([bgFile]);
      if (uploaded?.[0]?.url) {
        formData.set("profileBg", uploaded[0].url);
      }
    }

    await onSave(formData);
    setIsSaving(false);
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
}

// Create a countries.ts file with this content:
/*
export const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  // Add all countries you need
];
*/