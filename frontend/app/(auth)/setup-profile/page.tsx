import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SetUpProfilePage = () => {
  return (
    <section className="my-20 mx-auto w-4/5 sm:my-20 md:my-28">
      <Card className="mx-auto max-w-4/5 max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Setup Profile</CardTitle>
          <CardDescription className="text-center">
            Please fill in your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <form className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="photo">Photo</Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                required
              />
            </div>
            <Button className="w-full bg-main mt-2">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SetUpProfilePage;
