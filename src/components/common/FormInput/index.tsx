import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import FileUploadField from "./file-upload-field";

type BaseFieldProps = {
  name: string;
  label?: string;
  description?: string;
  onChange?: (value: any) => void;
};

type InputFieldProps = BaseFieldProps & {
  fieldType: "input";
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
};

type TextareaFieldProps = BaseFieldProps & {
  fieldType: "textarea";
  placeholder?: string;
};

type SelectFieldProps = BaseFieldProps & {
  fieldType: "select";
  options: Array<{ label: string; value: string }>;
};

type CheckboxFieldProps = BaseFieldProps & {
  fieldType: "checkbox";
};

type RadioFieldProps = BaseFieldProps & {
  fieldType: "radio";
  options: Array<{ label: string; value: string }>;
  radioLayout?: "row" | "column";
};

type SwitchFieldProps = BaseFieldProps & {
  fieldType: "switch";
};

type FileUploadFieldProps = BaseFieldProps & {
  fieldType: "file";
  accept?: string;
  multiple?: boolean;
};

type FormInputProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps
  | CheckboxFieldProps
  | RadioFieldProps
  | SwitchFieldProps
  | FileUploadFieldProps;

export const FormInput: React.FC<FormInputProps> = (props) => {
  const { control } = useFormContext();

  const renderField = (field: any) => {
    switch (props.fieldType) {
      case "input":
        return (
          <Input
            {...field}
            type={props.type}
            placeholder={props.placeholder}
            onChange={(e) => {
              field.onChange(e);
              if (props.onChange) props.onChange(e.target.value);
            }}
          />
        );
      case "textarea":
        return (
          <Textarea
            {...field}
            placeholder={props.placeholder}
            onChange={(e) => {
              field.onChange(e);
              if (props.onChange) props.onChange(e.target.value);
            }}
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (props.onChange) props.onChange(value);
            }}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <Checkbox
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              if (props.onChange) props.onChange(checked);
            }}
          />
        );
      case "radio":
        return (
          <RadioGroup
            onValueChange={(value) => {
              field.onChange(value);
              if (props.onChange) props.onChange(value);
            }}
            defaultValue={field.value}
            className={
              props.radioLayout === "row"
                ? "flex flex-row space-x-4"
                : "flex flex-col space-y-2"
            }
          >
            {props.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${props.name}-${option.value}`}
                />
                <FormLabel htmlFor={`${props.name}-${option.value}`}>
                  {option.label}
                </FormLabel>
              </div>
            ))}
          </RadioGroup>
        );
      case "switch":
        return (
          <Switch
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              if (props.onChange) props.onChange(checked);
            }}
          />
        );
      case "file":
        return (
          <FileUploadField
            field={field}
            accept={props.accept}
            multiple={props.multiple}
            onChange={props.onChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>{renderField(field)}</FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
