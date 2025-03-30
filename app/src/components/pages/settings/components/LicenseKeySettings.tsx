import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const LicenseKeySettings = () => {
    const [licenseKey, setLicenseKey] = React.useState("");
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>License Key</CardTitle>
          <CardDescription>Activate or recover your license key.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Enter License Key</Label>
            <Input
              placeholder="Enter your license key"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
            />
            <Button>Activate License</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Buy / Upgrade License</Label>
            <Button variant="outline">Buy License</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Recover License Key</Label>
            <Button variant="outline">Recover License Key</Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  