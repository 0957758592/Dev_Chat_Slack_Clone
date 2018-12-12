import React, { Component } from "react";
import firebase from "../../helpers/firebase";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

export class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  closeModal = () => {
    this.setState({ modal: false });
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <div>
        <React.Fragment>
          <Menu.Menu style={{ paddingBottom: "2em" }}>
            <Menu.Item style={{ color: "#eee" }}>
              <span>
                <Icon name="exchange" /> CHANNELS
              </span>{" "}
              ({channels.length}){" "}
              <Icon
                style={{ cursor: "pointer" }}
                name="add"
                onClick={this.openModal}
              />
            </Menu.Item>
            {/* Channels */}
          </Menu.Menu>

          {/* Add Channel Modal */}
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Add Channel</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Input
                    fluid
                    label="Name of Channel"
                    name="channelName"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    label="About the Channel"
                    name="channelDetails"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted onClick={this.handleSubmit}>
                <Icon name="checkmark" /> Add
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

export default Channels;
