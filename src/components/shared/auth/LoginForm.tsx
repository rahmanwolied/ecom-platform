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
import CreateConnectionForm from "./CreateConnection";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { requestNidProof } from "@/services/request-proof";

const formSchema = z.object({
  userType: z.enum(["buyer", "seller"]),
});

export function LoginForm() {
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [isSeller, setIsSeller] = useState(false);
  const [verified, setVerified] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: "buyer",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const connectionId =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("connectionId="))
        ?.split("=")[1] || "";
    const proof = await requestNidProof(values, connectionId, setVerified);
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Connect with your wallet.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <CreateConnectionForm
            setConnectionId={setConnectionId}
            connectionId={connectionId}
          />
        </div>
        {connectionId && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select
                      onValueChange={(value: string) => {
                        field.onChange(value);
                        setIsSeller(value === "seller");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {form.formState.isSubmitting
                  ? "Logging in..."
                  : isSeller
                  ? "Login as Seller"
                  : "Login as Buyer"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
