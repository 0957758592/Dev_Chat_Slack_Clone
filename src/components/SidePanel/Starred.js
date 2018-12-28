import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";
import { Menu, Icon } from "semantic-ui-react";

class Starred extends Component {
  state = {
    activeChannel: "",
    starredChannels: []
  };

  displayChannels = starredChannels =>
    starredChannels.length > 0 &&
    starredChannels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7, color: "#eee" }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  render() {
    const { starredChannels } = this.state;
    return (
      <div>
        <Menu.Menu className="menu">
          <Menu.Item style={{ color: "#eee" }}>
            <span>
              <Icon name="star" /> STARRED
            </span>{" "}
            ({starredChannels.length}){" "}
          </Menu.Item>
          {this.displayChannels(starredChannels)}
        </Menu.Menu>
      </div>
    );
  }
}

export default connect(
  null,
  { setCurrentChannel, setPrivateChannel }
)(Starred);
