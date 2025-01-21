"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const handleConnect = () => {
    console.log("Connecting to wallet...");
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Connect with your wallet.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input placeholder="Enter VC" />
          <Button className="w-full" onClick={handleConnect}>
            Connect Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
