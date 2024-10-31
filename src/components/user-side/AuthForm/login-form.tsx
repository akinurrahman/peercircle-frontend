import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { ButtonLoader } from "@/components/common/loader/loader";
import { loginSchema, LoginSchemaType } from "@/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { handleLogin } from "@/actions/auth/login";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LogInForm = () => {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    mode: "onTouched",
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    const response = await handleLogin(data);
    if (response.success) {
      toast.success(response.data.message);
      router.push("/feed");
    } else {
      setError("root", {
        type: "manual",
        message: response.message,
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormFieldWrapper
          label="Username or Email"
          name="identifier"
          placeholder="Enter your email or username"
          required
        />
        <FormFieldWrapper
          label="Password"
          name="password"
          placeholder="enter your password"
          type="password"
          required
        />
        <button type="button" className="w-full text-right text-sm">
          Forgot Password
        </button>
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ButtonLoader loadingText="Logging in..." />
          ) : (
            " Login"
          )}
        </Button>
        {errors.root && (
          <p className="mt-2 text-sm text-red-500">{errors.root.message}</p>
        )}
      </form>
    </Form>
  );
};

export default LogInForm;
