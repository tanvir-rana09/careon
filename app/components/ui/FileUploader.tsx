import { Flex, Image } from "antd";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import React, { useState } from "react";
import { FilePond, FilePondProps, registerPlugin } from "react-filepond";

/**
 * Styles
 */
import { ActualFileObject } from "filepond";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FormLabel from "./FormLabel";
import HelperText from "./HelperText";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

type FileUploaderProps = FilePondProps & {
  attachments?: string | string[];
  uploadedHandler?: (data: string | string[], action: string) => void;
  label?: string;
  error?: boolean;
  required?: boolean;
  labelColor?: string;
  helperText?: string;
  helperTextColor?: string;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  labelColor = "black",
  error = false,
  required = false,
  helperText,
  helperTextColor = "red",
  attachments,
  uploadedHandler = () => {},
  allowMultiple = false,
  server = "/api/v1/media-files",
  acceptedFileTypes = ["image/png, image/jpeg, image/gif"],
  ...props
}) => {
  const [files, setFiles] = useState<ActualFileObject[]>([]);

  return (
    <Flex vertical gap="small">
      {label && (
        <FormLabel
          label={label}
          error={error}
          style={{ color: labelColor }}
          required={required}
        />
      )}
      {attachments && (
        <Flex gap={1}>
          {typeof attachments === "string" ? (
            <Image src={attachments} width={100} />
          ) : (
            attachments?.map((item, i) => (
              <Image src={item} key={i} width={100} />
            ))
          )}
        </Flex>
      )}

      <FilePond
        files={files}
        onupdatefiles={(fileItems) => {
          const items = fileItems.map((fileItem) => fileItem.file);
          setFiles(items);
        }}
        onprocessfile={(_, file) => {
          const res = JSON.parse(file.serverId);
          if (res?.status === "success") {
            uploadedHandler(res.data, "add");
            setFiles([]);
          }
        }}
        acceptedFileTypes={acceptedFileTypes}
        allowMultiple={allowMultiple}
        server={server}
        name="file"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        {...props}
      />

      {helperText && (
        <HelperText
          text={helperText}
          error={error}
          style={{ color: helperTextColor }}
        />
      )}
    </Flex>
  );
};

export default FileUploader;
