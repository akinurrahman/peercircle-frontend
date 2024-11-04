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

import { toast } from "react-toastify";
import { ButtonLoader } from "@/components/common/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setToken } from "@/utils/token";
import { verifyOtp } from "@/store/slices/auth/signup.slice";
import { verifyForgotPasswordOTP } from "@/store/slices/auth/forgot-password.slice";
import { defaultFeedPath } from "@/constants/config.constant";

const OtpVerification = () => {
  const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "token";
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const email = useSelector((state: RootState) => state.auth.common.email);

  const { loading, error } = useSelector(
    (state: RootState) => state.auth.signup
  );
  const { loading: forgotLoading, error: forgotError } = useSelector(
    (state: RootState) => state.auth.forgot
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Redirecting...");
      router.replace("/signup");
      return;
    }

    try {
      let response;
      if (type === "signup") {
        response = await dispatch(
          verifyOtp({ user_email: email, otp })
        ).unwrap();
        setToken(TOKEN_NAME, response.token);
      } else if (type === "forgot-password") {
        response = await dispatch(
          verifyForgotPasswordOTP({ user_email: email, otp })
        ).unwrap();
      }

      toast.success(response.message);

      router.replace(type === "signup" ? defaultFeedPath : "/reset-password");
    } catch (error) {
      const errorMessage =
        (error as { message?: string }) || "Error verifying OTP";
      toast.error(`Error: ${errorMessage}`);
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
            {(error || forgotError) && (
              <p className="text-center text-red-500">{error || forgotError}</p>
            )}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className={`h-12 w-14 ${
                        error ? "border-red-500" : "border-gray-400"
                      }`}
                    />
                  ))}
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
              disabled={otp.length !== 6 || loading || forgotLoading}
            >
              {loading || forgotLoading ? (
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
