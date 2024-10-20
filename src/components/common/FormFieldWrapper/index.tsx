import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import { Control, useFormContext } from "react-hook-form";

interface FormFieldWrapperProps {
  name: string;
  type?: string;
  fieldType?: "input" | "textarea" | "select";
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  name,
  type = "text",
  fieldType = "input",
  label,
  placeholder,
  required,
}) => {
  const { control } = useFormContext();

  const renderField = (field: any, fieldState: any) => {
    switch (fieldType) {
      case "input":
        return (
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            className={cn(`${fieldState.invalid && "border-red-500"} py-5`)}
          />
        );
      default:
        return null;
    }
  };
  return (
    <FormField
      control={control as Control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && (
            <Label>
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          )}

          <FormControl>{renderField(field, fieldState)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWrapper;
