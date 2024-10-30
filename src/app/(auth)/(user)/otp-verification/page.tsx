"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Mail, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleOTPverification } from "@/actions/auth/otp_verification";
import { toast } from "react-toastify";
import { ButtonLoader } from "@/components/common/loader/loader";

const OtpVerification = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const email = searchParam.get("email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await handleOTPverification(email, otp);
    setIsSubmitting(false);
    if (response.success) {
      toast.success(response.data.message);
      router.push("/login");
    } else {
      setError(response.message);
      toast.error(`Error: ${response.message}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary">
            <Mail className="size-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a 6-digit verification code to your email
            (akinurrahman@gmail.com). Enter it below to complete your
            registration.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="text-center text-red-500">{error}</p>}{" "}
            {/* Error message display */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className={`h-12 w-14 ${error ? "border-red-500" : "border-gray-400"} `}
                  />
                  <InputOTPSlot
                    index={1}
                    className={`h-12 w-14 ${error ? "border-red-500" : "border-gray-400"} `}
                  />
                  <InputOTPSlot
                    index={2}
                    className={`h-12 w-14 ${error ? "border-red-500" : "border-gray-400"} `}
                  />
                  <InputOTPSlot
                    index={3}
                    className={`h-12 w-14 ${error ? "border-red-500" : "border-gray-400"} `}
                  />
                  <InputOTPSlot
                    index={4}
                    className={`h-12 w-14 ${error ? "border-red-500" : "border-gray-400"} `}
                  />
                  <InputOTPSlot
                    index={5}
                    className={`h-12 w-14 ${error ? "border-red-500" : "border-gray-400"} `}
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="text-center">
              <Button
                variant="link"
                type="button"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Didn&apos;t receive the code? Resend
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={otp.length !== 6 || isSubmitting}
            >
              {isSubmitting ? (
                <ButtonLoader loadingText="Verifying OTP..." />
              ) : (
                <>
                  Verify OTP
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OtpVerification;
