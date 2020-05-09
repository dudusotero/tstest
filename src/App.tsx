import React from "react";
import "./App.css";

const { REACT_APP_TWITCH_CLIENT_ID, REACT_APP_TWITCH_USERNAME } = process.env;
const twitchClientId: string = REACT_APP_TWITCH_CLIENT_ID || "";
const twitchUserName: string = REACT_APP_TWITCH_USERNAME || "";

function App() {
  const [isLive, setIsLive] = React.useState(false);
  const processTwitchStreamCallback = React.useCallback(
    processTwitchStream,
    []
  );

  function fetchTwitchData() {
    fetch(`https://api.twitch.tv/helix/streams?user_login=${twitchUserName}`, {
      headers: {
        "Client-ID": twitchClientId || "",
      },
    })
      .then(async (res) => {
        const response = await res.json();
        if (Boolean(response.data && response.data[0])) {
          setIsLive(true);
        }
      })
      .catch((err) => {
        console.log("Error fetching data from Twitch API: ", err);
      });
  }

  function processTwitchStream() {
    if (twitchClientId && twitchUserName) {
      fetchTwitchData();
    } else {
      console.error(
        "[react-livestream] Twitch support requires a twitchClientId and twitchUserName prop"
      );
    }
  }

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

  function OfflineComponent() {
    return (
      <div className="offline-wrapper">
        <div className="offline-frame">Currently OFFLINE</div>
      </div>
    );
  }

  React.useEffect(() => {
    processTwitchStreamCallback();
  }, [processTwitchStreamCallback]);

  return (
    <div className="App">
      {isLive ? <TwitchIframe /> : <OfflineComponent />}
    </div>
  );
}

export default App;
