// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
// import BitDisplay from "./BitDisplay";
// import BitDisplayWithNumIn from "./BitDisplayWithNumIn";
import BitDisplay from "./BitDispalyWithEndian";


function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <main className="container">
      <BitDisplay />
    </main>
    
  );
}

export default App;
