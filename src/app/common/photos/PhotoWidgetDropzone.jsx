import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

export default function PhotoWidgetDropzone({ setFiles }) {
  const dropzoneStyle = {
    marginTop: "10px",
    border: "dashed 2px #aaa",
    borderRadius: "5%",
    paddingTop: "30px",
    textAlign: "center",
  };
  const dropzoneActiveStyle = {
    border: "dashed 2px #00b5ad",
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropzoneStyle, ...dropzoneActiveStyle }
          : dropzoneStyle
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" color={isDragActive ? "teal" : "grey"} />
      <Header
        sub
        content="Drop image here"
        color={isDragActive ? "teal" : "grey"}
      />
    </div>
  );
}
