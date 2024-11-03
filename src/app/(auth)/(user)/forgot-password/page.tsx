"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/validations/auth.schema";
import { useRouter } from "next/navigation";
import { ButtonLoader } from "@/components/common/loader/loader";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/store/slices/auth/forgot-password.slice";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const form = useForm<ForgotPasswordFormData>({
    mode: "onTouched",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    formState: { isSubmitting, errors },
    setError,
  } = form;

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      const response = await dispatch(forgotPassword(data)).unwrap();
      toast.success(response.message || "Check your Mail");
      router.push("/otp-verification?type=forgot-password");
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          (error as { message?: string })?.message ||
          "Failed to send forgot password request.",
      });
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormFieldWrapper
                  fieldType="input"
                  name="email"
                  placeholder="Input your email"
                  label="Email"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ButtonLoader loadingText="Sending OTP" />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </div>
              {errors.root && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.root.message}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
