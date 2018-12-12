import React, { Component } from "react";
import firebase from "../../helpers/firebase";
import { Segment, Button, Input } from "semantic-ui-react";
import FileModal from "./FileModal";

export class MessageForm extends Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    isLoading: false,
    errors: [],
    modal: false
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  createdMessage = () => {
    const { message, user } = this.state;
    const createdMessages = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email
      },
      content: message
    };
    return createdMessages;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel, errors } = this.state;

    if (message) {
      this.setState({ isLoading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createdMessage())
        .then(() => {
          this.setState({
            isLoading: false,
            message: "",
            errors: []
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            isLoading: false,
            errors: errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: errors.concat({ message: "Add a message" })
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors, message, isLoading, modal } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message here"
          onChange={this.handleChange}
          value={message}
          className={
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            disabled={isLoading || !message.length}
            className={isLoading ? "loading" : ""}
          />
          <Button
            onClick={this.openModal}
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
          <FileModal modal={modal} closeModal={this.closeModal} />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
