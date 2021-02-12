import React from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";

const ProfileHeader = ({ profile, isCurrentUser }) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: "block", marginBottom: "10px" }}
                  content={profile?.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column
          width={4}
          verticalAlign="middle"
        >
          <Statistic.Group style={{ marginBottom: "10px", marginTop: "10px" }}>
            <Statistic label="Followers" value={10} />
            <Statistic label="Following" value={5} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider horizontal />
              <Reveal animated="move right">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button fluid color="teal" content="Folowing" />
                </Reveal.Content>

                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button fluid color="red" content="Unfollow" />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ProfileHeader;
