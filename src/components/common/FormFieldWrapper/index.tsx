import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FormFieldWrapperProps {
  name: string;
  fieldType?: "text" | "textarea" | "radio";
  options?: { label: string; value: string }[];
  onChange?: (value: string) => void; 
}

const FormFieldWrapper = ({
  name,
  fieldType = "text",
  options,
  onChange,
}: FormFieldWrapperProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          field.onChange(e); 
          onChange?.(e.target.value); 
        };

        if (fieldType === "radio" && options) {
          return (
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              defaultValue={field.value}
              className="flex flex-row items-center space-x-3" 
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2" 
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          );
        }


        if (fieldType === "textarea") {
          return (
            <textarea
              {...field}
              onChange={handleChange}
              className="textarea-class" // Add appropriate styles
            />
          );
        }

        return (
          <Input
            {...field}
            onChange={handleChange}
            className="input-class" 
          />
        );
      }}
    />
  );
};

export default FormFieldWrapper;
