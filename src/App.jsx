import React, { useState } from "react";
import artFox from "./assets/artFox.png";
import Value from "./apps/Value.jsx";
import LuminanceTrainer from "./apps/LuminanceTrainer.jsx";

import "./App.css";

function App() {
  const [app, setApp] = useState("Value");

  return (
    <div className="app">
      <header>
        <img
          src={artFox}
          className="logo"
          alt="artFox, but at it's core a very weird cat like me"
        />
        <h1>Welcome to WeirdCat´s art training website</h1>
      </header>

      <main>
        <p className="intro">
          I'm a software student that really likes art, but struggled to learn a
          cohesive theory of technique. My pursuit of art lead me to a pursuit
          of computer vision. This website is a place for me to train the skills
          that will be useful to develop visual comprehension and of art
          technique (outside of art meaning, technique as a series of tools for
          art) For now there is only a value trainer, enjoy
        </p>

        {/* Training App Window */}
        <div className="window">
          <div className="window-header">
            <button
              className={`value-trainer  ${app === "Value" ? "active" : ""}`}
              onClick={() => setApp("Value")}
            >
              Value Comparison
            </button>
            
          </div>
          <div className="app-container">
            {app === "Value" && <Value />}
            {app === "LuminanceTrainer" && <LuminanceTrainer />}
          </div>
        </div>
      </main>

      <footer>
        <p>
          Also, if you want to learn more about my projects, check out my github
          profile:{" "}
          <a href="https://github.com/WeirdCatAFK">
            https://github.com/WeirdCatAFK
          </a>
        </p>
        <p>
          And feel free to send me an email to{" "}
          <a href="mailto:dpineda.dev@gmail.com">dpineda.dev@gmail.com</a>,
          I'll be happy to chat about art, vision or computers!
        </p>
      </footer>
    </div>
  );
}

export default App;
