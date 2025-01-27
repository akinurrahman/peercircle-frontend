import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignUpSchemaType } from "@/validations/auth.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "@/components/common/loader/loader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authApis } from "@/services/apis/auth/user.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FormInput } from "../common/FormInput";
import { setEmail } from "@/store/slices/auth.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

interface SignUpField {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  fieldType: "input";
}

const signUpFields: SignUpField[] = [
  {
    label: "Full Name",
    name: "fullName",
    placeholder: "Enter your full name",
    required: true,
    fieldType: "input",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    required: true,
    fieldType: "input",
  },

  {
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    required: true,
    type: "password",
    fieldType: "input",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Re-enter your password",
    required: true,
    type: "password",
    fieldType: "input",
  },
];

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
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
    try {
      const response = await authApis.register.create(data);
      toast.success(response.message);
      dispatch(setEmail(data.email));
      router.push("/otp-verification");
    } catch (error) {
      console.log(error, "error");
      setError("root", {
        type: "manual",
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          {signUpFields?.map((field, index) => (
            <div key={index}>
              <FormInput {...field} />
            </div>
          ))}
        </div>
        <Button
          variant="primary"
          type="submit"
          className="mt-6 w-full"
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
