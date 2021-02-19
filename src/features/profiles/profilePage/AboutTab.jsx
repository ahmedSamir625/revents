import { format } from "date-fns/esm";
import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import ProfileForm from "./ProfileForm";

const AboutTab = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              size="small"
              content={editMode ? "Cancel" : "Edit"}
              icon={editMode ? "close" : "edit"}
              color={editMode ? "red" : "teal"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>
                  Member Since: {format(profile.createdAt, "MMMM d, yyyy")}
                </strong>
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default AboutTab;
