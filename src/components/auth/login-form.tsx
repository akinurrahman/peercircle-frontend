import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonLoader } from "@/components/common/loader/loader";
import { loginSchema, LoginSchemaType } from "@/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { defaultFeedPath } from "@/constants/config.constant";
import { FormInput } from "../common/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loginUser } from "@/store/slices/auth.slice";

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
  const { handleSubmit } = form;

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      router.push(defaultFeedPath);
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
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <ButtonLoader loadingText="Logging in..." />
          ) : (
            " Login"
          )}
        </Button>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default LogInForm;
