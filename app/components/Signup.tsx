"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/stateful-button";

export function SignupForm() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [mobileNo, setMobileNo] = useState<string>();
  const [purpose, setPurpose] = useState<string>();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const userData = {name, email, password, mobile_no: mobileNo, purpose}
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/create/users`, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      router.push("/login");
    } catch (error) {
      console.error(error, "Error while creating user");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-black dark:via-zinc-900 dark:to-zinc-800 px-4">
      <div className="shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-4xl md:p-8 dark:bg-black border">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to PlanPing
        </h2>
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Tyler" type="text" onChange={(e)=> setName(e.target.value)}/>
            </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={(e)=> setEmail(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Password" type="password" onChange={(e)=> setPassword(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input id="confirm_password" placeholder="Confirm Password" type="password" onChange={(e)=> setConfirmPassword(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="mobile_no">Mobile No</Label>
            <Input id="mobile_no" placeholder="9999999999" type="text" onChange={(e)=> setMobileNo(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="purpose">Purpose</Label>
            <Input id="purpose" placeholder="Purpose" type="text" onChange={(e)=> setPurpose(e.target.value)}/>
          </LabelInputContainer>
          <div className="flex h-40 w-full items-center justify-center">
            <Button className="w-full bg-black" onClick={handleSubmit}>Sign up &rarr;</Button>
          </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

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
