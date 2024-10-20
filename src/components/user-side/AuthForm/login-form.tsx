import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { ButtonLoader } from "@/components/common/loader/loader";
import { loginSchema, LoginSchemaType } from "@/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const LogInForm = () => {
  const form = useForm<LoginSchemaType>({
    mode: "onTouched",
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    await new Promise((res) => setTimeout(res, 5000));
    console.log("data", data);
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormFieldWrapper
          label="Email or Username"
          name="usernameOrEmail"
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
      </form>
    </Form>
  );
};

export default LogInForm;
