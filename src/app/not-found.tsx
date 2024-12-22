import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center text-gray-600">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-center text-gray-600">
            Don&apos;t worry, we&apos;re working on it and it will be coming
            soon!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/feed">Go back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
