import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../helpers/firebase";
// import { connect } from "react-redux";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  };

  //   componentDidMount() {
  //     this.setState({ user: this.props.currentUser });
  //   }

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong> {this.state.user.displayName}</strong>
          {/* <strong>{this.state.user && this.state.user.displayName}</strong> */}
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignOut}>Sign Out</span>
    }
  ];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out"));
  };

  //   componentWillReceiveProps(nextProps){
  //       this.setState({user: nextProps.currentUser})
  //   }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Grid style={{ background: "#4c3c4c" }}>
          <Grid.Column>
            <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
              {/* App Header */}
              <Header inverted floated="left" as="h2">
                <Icon name="code" />
                <Header.Content>DevChat</Header.Content>
              </Header>
            </Grid.Row>
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser
// });

export default UserPanel;
// connect(
//   mapStateToProps,
//   null
// )(UserPanel);
