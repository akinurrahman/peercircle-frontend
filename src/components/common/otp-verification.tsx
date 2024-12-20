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
import { Mail } from "lucide-react";
import { ButtonLoader } from "./loader/loader";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Cookies from "js-cookie";
import { authApis } from "@/services/apis/auth/auth.api";
import {
  accessTokenCookie,
  defaultAuthenticationPath,
  defaultFeedPath,
} from "@/constants/config.constant";
import { useRouter } from "next/navigation";

const OtpVarification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const email = Cookies.get("email");
  const [isSubmitting, setIsSumbitting] = useState(false);
  const hasToken = Cookies.get(accessTokenCookie) !== undefined;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSumbitting(true);
    try {
      await authApis.verifyOtp.create({ email, otp });
      if (hasToken) {
        router.push(defaultFeedPath);
      } else {
        router.push(defaultAuthenticationPath);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsSumbitting(false);
    }
  };

  return (
    <div className="glass-effect flex-center absolute inset-0">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary">
            <Mail className="size-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a 6-digit verification code to your email ({email}).
            Enter it below to complete your registration.
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
                <ButtonLoader loadingText="Verifying" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OtpVarification;
