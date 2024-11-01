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
import { handleForgotPassword } from "@/actions/auth/forgot-password";
import { useRouter } from "next/navigation";
import { ButtonLoader } from "@/components/common/loader/loader";
import { setEmail } from "@/store/slices/auth.slice";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
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
    const response = await handleForgotPassword(data);
    if (response.success) {
      dispatch(setEmail(data.email));
      router.push("/otp-verification?type=forgot-password");
    } else {
      setError("root", {
        type: "manual",
        message: response.message,
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
