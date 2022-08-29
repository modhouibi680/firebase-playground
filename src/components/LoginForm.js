import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

function LoginForm({ existingUser }) {
  console.log(existingUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await FirebaseAuthService.signInUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignout = () => FirebaseAuthService.signOutUser();

  const handleSendResetPasswordEmail = async () => {
    if (!username) {
      alert("no username");
      return;
    }
    try {
      await FirebaseAuthService.sendPasswordReset(username);
      alert("password reset sent");
    } catch (error) {
      alert(error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.signInWithGoogle();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          Hello, {existingUser.email}
          <button
            type="button"
            className="primary-button"
            onClick={handleSignout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Login</button>
            <button
              type="button"
              onClick={handleSendResetPasswordEmail}
              className="primary-button"
            >
              Reset Password
            </button>
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="primary-button"
            >
              login with google
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
