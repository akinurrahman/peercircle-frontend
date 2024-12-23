import React, { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  X,
  FileIcon,
  FileImageIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FileAudioIcon,
  FileVideoIcon,
  FileArchiveIcon,
  Upload,
} from "lucide-react";

interface FileUploadFieldProps {
  field: any;
  accept?: string;
  multiple?: boolean;
  onChange?: (value: File[]) => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  field,
  accept,
  multiple,
  onChange,
}) => {
  const [previewFiles, setPreviewFiles] = useState<
    { file: File; preview: string | JSX.Element }[]
  >([]);

  useEffect(() => {
    // Cleanup function to revoke object URLs
    return () => {
      previewFiles.forEach((file) => {
        if (
          typeof file.preview === "string" &&
          file.preview.startsWith("blob:")
        ) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [previewFiles]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        const newFiles = Array.from(files);
        const existingFiles = Array.isArray(field.value) ? field.value : [];
        const allFiles = [...existingFiles, ...newFiles];

        const newPreviews = newFiles.map((file) => ({
          file,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : getFileTypeIcon(file.type, file.name),
        }));

        setPreviewFiles((prev) => [...prev, ...newPreviews]);
        field.onChange(allFiles);
        if (onChange) onChange(allFiles);
      }
    },
    [field, onChange]
  );

  const removeFile = useCallback(
    (indexToRemove: number) => {
      const updatedFiles = field.value.filter(
        (_: any, index: number) => index !== indexToRemove
      );
      field.onChange(updatedFiles);
      if (onChange) onChange(updatedFiles);
      setPreviewFiles((prev) => {
        const newPreviews = prev.filter((_, index) => index !== indexToRemove);
        const removedPreview = prev[indexToRemove];
        if (
          typeof removedPreview.preview === "string" &&
          removedPreview.preview.startsWith("blob:")
        ) {
          URL.revokeObjectURL(removedPreview.preview);
        }
        return newPreviews;
      });
    },
    [field, onChange]
  );

  const getFileTypeIcon = (mimeType: string, fileName: string): JSX.Element => {
    if (mimeType.startsWith("image/")) {
      return <FileImageIcon className="size-6 text-blue-500" />;
    } else if (mimeType.startsWith("video/")) {
      return <FileVideoIcon className="size-6 text-purple-500" />;
    } else if (mimeType.startsWith("audio/")) {
      return <FileAudioIcon className="size-6 text-green-500" />;
    } else if (
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(mimeType)
    ) {
      return <FileTextIcon className="size-6 text-red-500" />;
    } else if (
      [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(mimeType)
    ) {
      return <FileSpreadsheetIcon className="size-6 text-green-700" />;
    } else if (
      [
        "application/zip",
        "application/x-rar-compressed",
        "application/x-7z-compressed",
      ].includes(mimeType)
    ) {
      return <FileArchiveIcon className="size-6 text-yellow-500" />;
    } else {
      return <FileIcon className="size-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors duration-300"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Upload className="mb-3 size-10 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            {/* <p className="text-xs text-gray-500 dark:text-gray-400">
              Supported file types: Images, PDFs, DOCs, XLS, and more
            </p> */}
          </div>
          <Input
            id="dropzone-file"
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      {previewFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {previewFiles.map((file, index) => (
            <div key={index} className="group relative">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-colors duration-300 group-hover:border-blue-500">
                {typeof file.preview === "string" ? (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4">
                    {file.preview}
                    <span className="mt-2 break-all text-center text-xs text-gray-500">
                      {file.file.name.length > 20
                        ? file.file.name.substring(0, 20) + "..."
                        : file.file.name}
                    </span>
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -right-1 -top-1 size-5 rounded-full p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={() => removeFile(index)}
              >
                <X className="size-3" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadField;
