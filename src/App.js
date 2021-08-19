import "./App.css";
import { Route, Switch } from "react-router-dom";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="container">
      <a
        href="https://joinneon.com"
        target="_blank"
        rel="noreferrer"
        style={{ width: "10%" }}
      >
        <img
          src="https://neon-core-api-static-assets.web.app/images/neon-logo.png"
          alt="logo"
          height="37px"
        />
      </a>
      <Switch>
        <Route exact path="/core/initiateNeon/:token" component={Modal} />
      </Switch>
    </div>
  );
}

export default App;
