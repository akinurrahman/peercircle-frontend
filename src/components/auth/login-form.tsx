import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { ButtonLoader } from "@/components/common/loader/loader";
import { loginSchema, LoginSchemaType } from "@/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/token";

import { defaultFeedPath } from "@/constants/config.constant";
import { useDispatch } from "react-redux";
import { loginApi, resetError } from "@/store/slices/auth/login.slice";
import { AppDispatch } from "@/store";

const LogInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "token";
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
    dispatch(resetError());

    try {
      const response = await dispatch(loginApi(data)).unwrap();
      toast.success(response.message);
      setToken(TOKEN_NAME, response.token);
      router.push(defaultFeedPath);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: (err as string) || "Fail to login",
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
          placeholder="Enter your password"
          type="password"
          required
        />
        <button
          type="button"
          className="w-full text-right text-sm"
          onClick={() => router.push("/forgot-password")}
        >
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
