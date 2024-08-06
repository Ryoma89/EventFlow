"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getUser } from "@/lib/getUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUploader } from "@/components/shared/FileUploader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  username: z.string().min(1).max(50),
  photo: z.string(),
});

const Profile = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [user, setUser] = useState<any>(null)
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      photo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let uploadedImageUrl = values.photo;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    const payload = {
      ...values,
      photo: uploadedImageUrl,
      userId: user._id,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ user:payload }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result", result);
        setUser(result);
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `Failed to update profile: ${errorData.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: `An unexpected error occurred. Please try again later.`,
        variant: "destructive",
      });
    }
  }


  if (!user) {
    return <Skeleton className="mt-10 w-[300px] h-[250px]"/>
  }
  return (
    <div className="mt-10 max-w-96">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.photo || "https://github.com/shadcn.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{user.username}</p>
          </div>
          <div>
            email: <span>{user.email}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger className="w-full bg-main text-white py-2 rounded-lg">
              Edit Profile
            </DialogTrigger>
            <DialogContent className="w-4/5 rounded-lg">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile information here.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Photo</FormLabel>
                        <FormControl className="h-72">
                          <FileUploader
                            onFieldChange={field.onChange}
                            imageUrl={field.value}
                            setFiles={setFiles}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" variant={"main"}>
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
