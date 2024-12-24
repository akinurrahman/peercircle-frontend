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
import FileUploadField from "./file-upload-field";

interface BaseFieldProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type: "input";
  inputType?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
  type: "textarea";
}

interface SelectFieldProps extends BaseFieldProps {
  type: "select";
  options: { value: string; label: string }[];
}

interface CheckboxFieldProps extends BaseFieldProps {
  type: "checkbox";
}

interface RadioFieldProps extends BaseFieldProps {
  type: "radio";
  options: { value: string; label: string }[];
  radioLayout?: "row" | "column";
}

interface FileFieldProps extends BaseFieldProps {
  type: "file";
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
  switch (props.type) {
    case "input":
      return (
        <Input
          type={props.inputType || "text"}
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
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
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
