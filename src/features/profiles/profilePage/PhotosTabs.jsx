import React, { useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from "../../../app/firestore/firestoreService";
import { useDispatch, useSelector } from "react-redux";

import { listenToUserPhotos } from "../profileActions";
import { toast } from "react-toastify";
import { deleteFromFirebaseStorage } from "../../../app/firestore/firebaseService";

const PhotosTab = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);

  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    dependencies: [dispatch, profile.id],
  });

  const handleSetMainPhoto = async (photo, target) => {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  };

  const handleDeletePhoto = async (photo, target) => {
    setDeleting({ isDeleting: true, target });

    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  };

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content={`Photo`} />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              size="small"
              content={editMode ? "Cancel" : "Add Photo"}
              icon={editMode ? "close" : "add"}
              color={editMode ? "red" : "teal"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id} style={{ minWidth: "100px" }}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group widths={2}>
                      <Button
                        name={photo.id}
                        onClick={(e) =>
                          handleSetMainPhoto(photo, e.target.name)
                        }
                        loading={
                          updating.isUpdating && updating.target === photo.id
                        }
                        disabled={photo.url === profile.photoURL}
                        style={{ width: "65%" }}
                        basic
                        color="green"
                        content="Main"
                      />

                      <Button
                        name={photo.id}
                        onClick={(e) => {
                          handleDeletePhoto(photo, e.target.name);
                        }}
                        loading={
                          deleting.isDeleting && deleting.target === photo.id
                        }
                        disabled={photo.url === profile.photoURL}
                        style={{ width: "35%" }}
                        basic
                        color="red"
                        icon="trash"
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default PhotosTab;
