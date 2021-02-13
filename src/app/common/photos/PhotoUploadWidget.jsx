import cuid from "cuid";
import React, { useState } from "react";
import { Button, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

import { getFileExtention } from "../util/util";
import { uploadToFirebaseStorage } from "../../firestore/firebaseService";
import { toast } from "react-toastify";
import { updateUserProfilePhoto } from "../../firestore/firestoreService";

const PhotoUploadWidget = ({ setEditMode }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = () => {
    setLoading(true);
    const filename = cuid() + "." + getFileExtention(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + "% done");
      },
      (error) => {
        setLoading(false);
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              setLoading(false);
              toast.error(error.message);
            });
        });
      }
    );
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  return (
    <div
      style={{
        display: "flex",

        justifyContent: "space-evenly",

        flexWrap: "wrap",
      }}
    >
      <div style={{ margin: "10px 10px 20px 10px" }}>
        <Header color="teal" sub content="Step 1 - Add Photo" />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </div>

      <div style={{ margin: "10px 10px 20px 10px" }}>
        <Header color="teal" sub content="Step 2 - Resize" />
        {files.length > 0 && (
          <div style={{ maxWidth: "200px", maxHeight: "200px" }}>
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          </div>
        )}
      </div>

      <div style={{ margin: "10px 10px 20px 10px" }}>
        <Header color="teal" sub content="Step 3 - Preview & Upload" />
        {files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}
            />
            <Button.Group widths={2}>
              <Button
                loading={loading}
                onClick={handleUploadImage}
                style={{ width: 100 }}
                positive
                icon="check"
              />
              <Button
                disabled={loading}
                onClick={handleCancelCrop}
                style={{ width: 100 }}
                icon="close"
              />
            </Button.Group>
          </>
        )}
      </div>
    </div>
    // <Grid>
    //   <Grid.Column width={1} />
    //   <Grid.Column width={4} textAlign="center">
    //     <Header color="teal" sub content="Step 1 - Add Photo" />
    //     <PhotoWidgetDropzone setFiles={setFiles} />
    //   </Grid.Column>
    //   <Grid.Column width={1} />

    //   <Grid.Column width={4} textAlign="center">
    //     <Header color="teal" sub content="Step 2 - Resize" />
    //     {files.length > 0 && (
    //       <PhotoWidgetCropper
    //         setImage={setImage}
    //         imagePreview={files[0].preview}
    //       />
    //     )}
    //   </Grid.Column>
    //   <Grid.Column width={1} />

    //   <Grid.Column width={4} textAlign="center">
    //     <Header color="teal" sub content="Step 3 - Preview & Upload" />
    //     {files.length > 0 && (
    //       <>
    //         <div
    //           className="img-preview"
    //           style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}
    //         />
    //         <Button.Group widths={2}>
    //           <Button style={{ width: 100 }} positive icon="check" />
    //           <Button style={{ width: 100 }} icon="close" />
    //         </Button.Group>
    //       </>
    //     )}
    //   </Grid.Column>
    //   <Grid.Column width={1} />
    // </Grid>
  );
};

export default PhotoUploadWidget;
