"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetPassword = () => {
  const form = useForm<ResetPasswordFormData>({
    mode: "onTouched",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
    console.log(data);
  };
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormFieldWrapper
                  fieldType="input"
                  type="password"
                  name="password"
                  placeholder="New password"
                />
                <FormFieldWrapper
                  fieldType="input"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm new password"
                />

                <Button type="submit" variant="primary" className="w-full">
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
