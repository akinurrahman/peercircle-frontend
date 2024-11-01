import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignUpSchemaType } from "@/validations/auth.schema";
import { Form } from "@/components/ui/form";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "@/components/common/loader/loader";
import { handleSignUp } from "@/actions/auth/signup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setEmail } from "@/store/slices/auth.slice";
import { AppDispatch } from "@/store";

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
    placeholder: "Enter your email",
    required: true,
  },

  {
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
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
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    const res = await handleSignUp(data);
    if (res.success) {
      dispatch(setEmail(data.email));
      toast.success(res.data.message || `OTP has been sent to ${data?.email}`);
      router.push(`/otp-verification?type=signup`);
    } else {
      setError("root", {
        type: "manual",
        message: res.message,
      });
    }
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
            <ButtonLoader loadingText="Sending OTP..." />
          ) : (
            " Signup"
          )}
        </Button>
        {errors.root && (
          <p className="mt-2 text-sm text-red-500">{errors.root.message}</p>
        )}
      </form>
    </Form>
  );
};

export default SignUpForm;
