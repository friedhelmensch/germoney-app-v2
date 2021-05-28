import React, { Component } from "react";
import Germoney from "./Germoney";

import { DrizzleContext } from "@drizzle/react-plugin";

class App extends Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            return "Loading...";
          }

          return <Germoney drizzle={drizzle} drizzleState={drizzleState} />;
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default App;
