import { RaisedButton } from "../components";
import { FirebaseContext } from "../firebase";
import { useContext, useState } from "react";

export default function Chat() {
  const { user, auth, firestore } = useContext(FirebaseContext);
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const sendMessage = e => {
    e.preventDefault();
    if (firestore.newMessage(message)) setMessage("");
  };

  return (
    <div className="chat container">
      <div className="sider">
        <div>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="sider-avatar"
          />
          <h2>{user.displayName}</h2>
          <h3>{user.email}</h3>
        </div>
        <RaisedButton onClick={auth.logout}>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
			{
				firestore.messages.map(message => {
					const createdAt = message.createdAt.toDate();
					return (
						<div className="message" key={message.id}>
							<img src={message.author.photoURL} alt={message.author.displayName} className="avatar" />
							<div>
							<h6>{message.message}</h6>
							<p>{createdAt.getHours()}h{createdAt.getMinutes().toString().padStart(2, 0)}</p>
							</div>
						</div>
					)
				})
			}
        </div>
        <form className="input-container" onSubmit={sendMessage}>
          <input value={message} onChange={handleChange} />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
