import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PhotoWidgetCropper({ setImage, imagePreview }) {
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg");
  };

  return (
    <Cropper
      crop={onCrop}
      ref={cropperRef}
      src={imagePreview}
      style={{ height: "200", width: "200" }}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      view={1}
      dragMode="move"
      cropBoxMovable={true}
      cropBoxResizable={true}
    />
  );
}
