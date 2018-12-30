import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import firebase from "../../helpers/firebase";
import { Segment, Button, Input } from "semantic-ui-react";
import FileModal from "./FileModal";
import { ProgressBar } from "./ProgressBar";
import { Picker, emojiIndex } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export class MessageForm extends Component {
  state = {
    storageRef: firebase.storage().ref(),
    typingRef: firebase.database().ref("typing"),
    uploadTask: null,
    uploadState: "",
    percentUploaded: 0,
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    isLoading: false,
    errors: [],
    modal: false,
    emojiPicker: false
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  createMessage = (fileUrl = null) => {
    const { message, user } = this.state;
    const createdMessages = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email
      }
      // content: message
    };
    if (fileUrl !== null) {
      createdMessages["image"] = fileUrl;
    } else {
      createdMessages["content"] = message;
    }
    return createdMessages;
  };

  sendMessage = () => {
    const { getMessagesRef } = this.props;
    const { message, channel, errors, user, typingRef } = this.state;

    if (message) {
      this.setState({ isLoading: true });
      getMessagesRef()
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({
            isLoading: false,
            message: "",
            errors: []
          });
          typingRef
            .child(channel.id)
            .child(user.uid)
            .remove();
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

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.sendMessage();
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getPath = () => {
    if (this.props.isPrivateChannel) {
      return `chat/private-${this.state.channel.id}`;
    } else {
      return "chat/public";
    }
  };

  uploadFile = (file, metadata) => {
    const { storageRef, channel, errors } = this.state;
    const pathToUpload = channel.id;
    const ref = this.props.getMessagesRef();
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: storageRef.child(filePath).put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.props.isProgressBarVisible(percentUploaded);
            this.setState({ percentUploaded });
          },
          err => {
            console.log(err);
            this.setState({
              errors: errors.concat(err),
              uploadState: "error",
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => {
                this.sendFileMessage(downloadURL, ref, pathToUpload);
              })
              .catch(err => {
                console.log(err);
                this.setState({
                  errors: errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: "done" });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errors: this.state.errors.concat(err)
        });
      });
  };

  handleKeyDown = () => {
    const { message, typingRef, channel, user } = this.state;

    if (message) {
      typingRef
        .child(channel.id)
        .child(user.uid)
        .set(user.displayName);
    } else {
      typingRef
        .child(channel.id)
        .child(user.uid)
        .remove();
    }
  };

  handleTogglePicker = () => {
    this.setState({ emojiPicker: !this.state.emojiPicker });
  };

  handleAddEmoji = emoji => {
    const oldMessage = this.state.message;
    const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons}`);
    this.setState({ message: newMessage, emojiPicker: false });
    setTimeout(() => this.messageInputRef.focus(), 0);
  };

  colonToUnicode = message => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
      x = x.replace(/:/g, "");
      let emoji = emojiIndex.emojis[x];
      if (typeof emoji !== "undefined") {
        let unicode = emoji.native;
        if (typeof unicode !== "undefined") {
          return unicode;
        }
      }
      x = ":" + x + ":";
      return x;
    });
  };

  render() {
    //prettier-ignore
    const { errors, message, isLoading, modal, uploadState, percentUploaded, emojiPicker } = this.state;
    return (
      <Segment className="message__form">
        {emojiPicker && (
          <Picker
            set="apple"
            className="emojipicker"
            onSelect={this.handleAddEmoji}
            title="Pick your emoji"
            emoji="point_up"
          />
        )}
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button 
            icon={emojiPicker ? 'close' : 'add'}
            content={emojiPicker ? 'Close' : null} 
            onClick={this.handleTogglePicker} 
            />}
          labelPosition="left"
          placeholder="Write your message here"
          ref={node => (this.messageInputRef = node)}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
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
            disabled={uploadState === "uploading"}
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
        <FileModal
          modal={modal}
          closeModal={this.closeModal}
          uploadFile={this.uploadFile}
        />
        <ProgressBar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
      </Segment>
    );
  }
}

export default MessageForm;
