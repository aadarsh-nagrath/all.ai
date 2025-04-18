import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ExtensionsSettings = () => {
    const [extensionUrl, setExtensionUrl] = React.useState("");
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Extensions</CardTitle>
          <CardDescription>
            Extensions allow you to load custom JavaScript into the application. This can be useful for adding custom functionality or integrating with other services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Enter Extension URL</Label>
            <Input
              placeholder="Enter extension URL"
              value={extensionUrl}
              onChange={(e) => setExtensionUrl(e.target.value)}
            />
            <Button>Install</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Note</Label>
            <p className="text-sm text-muted-foreground">
              Extensions have full access to the application and can read and modify any data. Only install extensions from sources you trust.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  