import React, { Component } from "react";
import AvatarEditor from "react-avatar-editor";
//prettier-ignore
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  Button
} from "semantic-ui-react";
import firebase from "../../helpers/firebase";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    previewImage: "",
    croppedImage: "",
    blob: ""
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong> {this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span onClick={this.openModal}>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignOut}>Sign Out</span>
    }
  ];

  handleChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out"));
  };

  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob
        });
      });
    }
  };

  render() {
    const { user, modal, previewImage, croppedImage } = this.state;
    const { primaryColor } = this.props;
    return (
      <div>
        <Grid style={{ background: primaryColor }}>
          <Grid.Column>
            <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
              {/* App Header */}
              <Header inverted floated="left" as="h2">
                <Icon name="code" />
                <Header.Content>DevChat</Header.Content>
              </Header>

              {/* User Dropdown */}

              <Header style={{ padding: "0.25em" }} as="h4" inverted>
                <Dropdown
                  trigger={
                    <span>
                      <Image src={user.photoURL} spaced="right" avatar />
                      {user.displayName}
                    </span>
                  }
                  options={this.dropdownOptions()}
                />
              </Header>
            </Grid.Row>

            {/* Change User Avatar Modal*/}

            <Modal basic open={modal} onClose={this.closeModal}>
              <Modal.Header>Change Avatar</Modal.Header>
              <Modal.Content>
                <Input
                  onChange={this.handleChange}
                  fluid
                  type="file"
                  label="New Avatar"
                  name="previewImage"
                />
                <Grid centered stackable columns={2}>
                  <Grid.Row centered>
                    <Grid.Column className="ui center aligned grid">
                      {previewImage && (
                        <AvatarEditor
                          ref={node => (this.avatarEditor = node)}
                          image={previewImage}
                          width={200}
                          heigh={200}
                          border={50}
                          scale={1.3}
                        />
                      )}
                    </Grid.Column>
                    <Grid.Column>
                      {croppedImage && (
                        <Image
                          style={{ margin: "3.5em auto" }}
                          width={100}
                          heigh={100}
                          src={croppedImage}
                        />
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
              <Modal.Actions>
                {croppedImage && (
                  <Button color="green" inverted>
                    <Icon name="save" /> Change Avatar
                  </Button>
                )}
                <Button color="blue" inverted onClick={this.handleCropImage}>
                  <Icon name="image" /> Preview
                </Button>
                <Button color="red" inverted onClick={this.closeModal}>
                  <Icon name="remove" /> Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserPanel;
