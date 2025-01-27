import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonLoader } from "@/components/common/loader/loader";
import { loginSchema, LoginSchemaType } from "@/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { FormInput } from "../common/FormInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setAccessToken, setUser } from "@/store/slices/auth.slice";
import { authApis } from "@/services/apis/auth/user.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

const LogInForm = () => {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const response = await authApis.login.create(data);
      dispatch(setUser(response.user));
      dispatch(setAccessToken(response.accessToken));
      router.push("/profile");
    } catch (error) {
      setError("root", {
        type: "manual",
        message: getErrorMessage(error),
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FormInput
          fieldType="input"
          label="Email"
          name="email"
          placeholder="Enter your email"
        />
        <FormInput
          fieldType="input"
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
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
