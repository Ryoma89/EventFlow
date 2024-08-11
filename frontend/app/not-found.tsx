import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-center text-red-500 font-bold">Page Not Found</h1>
      <Image
        src="/not-found.jpeg"
        alt="not found"
        width={800}
        height={400}
        priority
      />
      <Link href="/">
        <Button variant={"main"} className="w-full">Back to Home</Button>
      </Link>
    </div>
  );
}