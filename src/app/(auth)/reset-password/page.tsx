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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ButtonLoader } from "@/components/common/loader/loader";
import { resetPassword } from "@/store/slices/auth/forgot-password.slice";

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { reset_token } = useSelector((state: RootState) => state.auth.forgot);
  const form = useForm<ResetPasswordFormData>({
    mode: "onTouched",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const {
    formState: { errors, isSubmitting },
    setError,
  } = form;
  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    if (!reset_token) {
      router.replace("/forgot-password");
      return;
    }

    try {
      await dispatch(resetPassword({ ...data, reset_token })).unwrap();
      router.replace("/login");
      toast.success("Password reset successfully! Login to Continue");
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message || "Failed to reset password.";
      toast.error(errorMessage);
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
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
                  name="new_password"
                  placeholder="New password"
                />
                <FormFieldWrapper
                  fieldType="input"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm new password"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full"
                >
                  {isSubmitting ? (
                    <ButtonLoader loadingText="Resetting Password..." />
                  ) : (
                    "Reset Password"
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

export default ResetPassword;
