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

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormData>({
    mode: "onTouched",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    console.log(data);
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
                <Button type="submit" variant="primary" className="w-full">
                  Send OTP
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
