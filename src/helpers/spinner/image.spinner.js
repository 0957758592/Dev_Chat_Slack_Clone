import React from "react";

import { Loader, Dimmer } from "semantic-ui-react";

export const ImageSpinner = () => (
  <Dimmer active>
    <Loader size="huge" content={"Changing Avatar..."} />
  </Dimmer>
);
