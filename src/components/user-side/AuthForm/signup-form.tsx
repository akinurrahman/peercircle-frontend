import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignUpSchemaType } from "@/validations/auth.schema";
import { Form } from "@/components/ui/form";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "@/components/common/loader/loader";

interface SignUpField {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

const signUpFields: SignUpField[] = [
  {
    label: "Full Name",
    name: "fullName",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    placeholder: "enter your email",
    required: true,
  },

  {
    label: "Password",
    name: "password",
    placeholder: "enter your password",
    required: true,
    type: "password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Re-enter your password",
    required: true,
    type: "password",
  },
];

const SignUpForm = () => {
  const form = useForm<SignUpSchemaType>({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    await new Promise((res) => setTimeout(res, 5000));

    console.log("data", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          {signUpFields?.map((field, index) => (
            <div key={index}>
              <FormFieldWrapper {...field} />
            </div>
          ))}
        </div>
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ButtonLoader loadingText="Creating account..." />
          ) : (
            " Signup"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
