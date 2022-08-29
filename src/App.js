import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  FirebaseAuthService.subscribeToAuthChange(setUser);
  return (
    <div className="App">
      <h1>Playground-firebase</h1>
      <LoginForm existingUser={user} />
    </div>
  );
}

export default App;
