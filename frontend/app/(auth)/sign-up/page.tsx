import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <section className="my-20 mx-auto w-4/5 sm:my-20 md:my-28">
      <Card className="mx-auto max-w-4/5 max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                minLength={6}
                name="password"
                id="password"
                type="password"
                required
              />
            </div>
            <Button className="w-full bg-main mt-2">Login</Button>
          </form>
          <div className="flex justify-center items-center space-x-2 mt-2 text-sm">
            <div className="text-center">
              Already have an account? Then please <span> </span>
              <Link href="/sign-in" className="underline text-blue-600">
                <span className="hover:opacity-80">click here </span>
              </Link>
              to sign in.
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUpPage;
