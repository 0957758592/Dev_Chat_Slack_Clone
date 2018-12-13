import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { connect } from "react-redux";

// class Layout extends React.Component {
//   render() {
//     const { currentUser } = this.props;
//     return (
//       <Grid columns="equal" className="auth" style={{ background: "#eee" }}>
//         <ColorPanel />
//         <SidePanel currentUser={currentUser} />
//         <Grid.Column style={{ marginLeft: 320 }}>
//           <Messages />
//         </Grid.Column>
//         <Grid.Column>
//           <MetaPanel width={4} />
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }

const Layout = ({ currentUser, currentChannel }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </Grid.Column>
    <Grid.Column>
      <MetaPanel widths={4} />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
});

export default connect(mapStateToProps)(Layout);
