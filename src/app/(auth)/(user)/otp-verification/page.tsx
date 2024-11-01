"use client";

import { Suspense, useState } from "react";
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
import {
  handleForgotPasswordOTPverification,
  handleOTPverification,
} from "@/actions/auth/otp_verification";
import { toast } from "react-toastify";
import { ButtonLoader } from "@/components/common/loader/loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { setToken } from "@/utils/token";

const OtpVerification = () => {
  const router = useRouter();
  const email = useSelector((state: RootState) => state.auth.email);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Redirecting...");
      router.push("/signup");
      return;
    }

    setIsSubmitting(true);
    const response =
      type === "signup"
        ? await handleOTPverification(email, otp)
        : await handleForgotPasswordOTPverification(email, otp);

    setIsSubmitting(false);

    if (response.success) {
      toast.success(response.data.message);
      if (type === "signup") setToken(response.data.token);
      router.push(type === "signup" ? "/feed" : "/reset-password");
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
            {type === "signup" && "Verify Your Account"}
            {type === "forgot-password" && "Reset Your Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {type === "signup" && (
              <>
                We&apos;ve sent a 6-digit verification code to your email (
                {email}). Enter it below to complete your registration.
              </>
            )}
            {type === "forgot-password" && (
              <>
                We&apos;ve sent a 6-digit verification code to your email (
                {email}). Enter it below to reset your password.
              </>
            )}
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

const SuspenseWrapper = () => {
  return (
    <Suspense>
      <OtpVerification />
    </Suspense>
  );
};

export default SuspenseWrapper;
