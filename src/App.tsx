import React from "react";
import "./App.css";

const { REACT_APP_TWITCH_CLIENT_ID, REACT_APP_TWITCH_USERNAME } = process.env;
const twitchUserName: string = REACT_APP_TWITCH_USERNAME || "";

function App() {
  function TwitchIframe() {
    return (
      <div className="iframe-wrapper">
        <iframe
          title="twitchIframe"
          allowFullScreen
          src={`https://player.twitch.tv/?channel=${twitchUserName}`}
          frameBorder="0"
        />
      </div>
    );
  }

  function ControlDeck() {
    function onClick() {
      console.log("Toggled");
    }

    return (
      <div className="controldeck-wrapper">
        <button type="button" onClick={onClick}>
          Toggle Layout
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <TwitchIframe />
      <ControlDeck />
    </div>
  );
}

export default App;
