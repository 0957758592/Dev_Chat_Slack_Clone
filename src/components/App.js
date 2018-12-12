import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { connect } from "react-redux";

// class App extends React.Component {
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

const App = ({ currentUser }) => (
  <Grid columns="equal" className="auth" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>
    <Grid.Column>
      <MetaPanel width={4} />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(App);
