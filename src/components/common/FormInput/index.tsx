import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FileUploadField from "./file-upload-field";
import { ChevronDown } from "lucide-react";

interface BaseFieldProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
}

interface InputFieldProps extends BaseFieldProps {
  fieldType: "input";
  type?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
  fieldType: "textarea";
}

interface SelectFieldProps extends BaseFieldProps {
  fieldType: "select";
  options: { value: string; label: string }[];
}

interface CheckboxFieldProps extends BaseFieldProps {
  fieldType: "checkbox";
}

interface RadioFieldProps extends BaseFieldProps {
  fieldType: "radio";
  options: { value: string; label: string }[];
  radioLayout?: "row" | "column";
}

interface FileFieldProps extends BaseFieldProps {
  fieldType: "file";
  accept?: string;
  multiple?: boolean;
}

type FormInputProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps
  | CheckboxFieldProps
  | RadioFieldProps
  | FileFieldProps;

export function FormInput(props: FormInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>{renderFieldByType(props, field)}</FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function renderFieldByType(props: FormInputProps, field: any) {
  switch (props.fieldType) {
    case "input":
      return (
        <Input
          type={props.type || "text"}
          placeholder={props.placeholder}
          {...field}
        />
      );
    case "textarea":
      return (
        <Textarea
          placeholder={props.placeholder}
          className="resize-none"
          {...field}
        />
      );
    case "select":
      return (
        <div className="relative">
          <select
            {...field}
            className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm focus:border-ring focus:outline-none focus:ring-[.5px] focus:ring-ring"
          >
            <option
              value=""
              disabled
              selected
              hidden
              className="text-muted-foreground"
            >
              {props.placeholder}
            </option>
            {props.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="font-medium"
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDown className="size-4 text-muted-foreground" />
          </div>
        </div>
      );
    case "checkbox":
      return (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          {...field}
        />
      );
    case "radio":
      return (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className={`flex ${props.radioLayout === "row" ? "flex-row space-x-4" : "flex-col space-y-1"}`}
        >
          {props.options.map((option) => (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={option.value}
            >
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      );
    case "file":
      return (
        <FileUploadField
          field={field}
          accept={props.accept}
          multiple={props.multiple}
        />
      );
    default:
      return null;
  }
}
