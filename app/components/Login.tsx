"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/stateful-button";
import { toast } from "sonner";

export function LoginForm() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,  // We handle redirect manually
    });

    if (result?.ok) {
      toast.success("Loggin Successful");
      router.push("/");
    }
    else {
      toast.error("Some thing went wrong whil logging in");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-4xl md:p-8 dark:bg-black border">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Login to Focuspluse
        </h2>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="text" onChange={(e)=> setEmail(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Password" type="password" onChange={(e)=> setPassword(e.target.value)}/>
          </LabelInputContainer>
          <div className="flex h-40 w-full items-center justify-center">
            <Button className="w-full bg-black" onClick={handleSubmit}>Login &rarr;</Button>
          </div>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
